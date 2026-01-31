import { AlgorithmBase } from '../AlgorithmBase';

export class DijkstraGrid extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Dijkstra (Grid)";
        this.tier = 3;
        this.category = "Pathfinding";
        this.description = "Finds the shortest path in a weighted graph (or grid).";
        
        this.code = {
            python: `def dijkstra(grid, start, end):
    pq = [(0, start)]
    dist = {start: 0}
    
    while pq:
        d, curr = heapq.heappop(pq)
        
        if curr == end: return dist[end]
        
        for neighbor in get_neighbors(curr):
            new_dist = d + weight(curr, neighbor)
            if new_dist < dist.get(neighbor, inf):
                dist[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))`,
            
            rust: `fn dijkstra(grid: &Grid, start: Point, end: Point) -> Option<i32> {
    let mut pq = BinaryHeap::new();
    let mut dist = HashMap::new();
    
    dist.insert(start, 0);
    pq.push(State { cost: 0, pos: start });

    while let Some(State { cost, pos }) = pq.pop() {
        if pos == end { return Some(cost); }
        if cost > *dist.get(&pos).unwrap_or(&i32::MAX) { continue; }

        for neighbor in grid.neighbors(pos) {
            let next_cost = cost + 1;
            if next_cost < *dist.get(&neighbor).unwrap_or(&i32::MAX) {
                dist.insert(neighbor, next_cost);
                pq.push(State { cost: next_cost, pos: neighbor });
            }
        }
    }
    None
}`,
            cpp: `int dijkstra(vector<vector<int>>& grid, Point start, Point end) {
    priority_queue<Node, vector<Node>, greater<Node>> pq;
    vector<vector<int>> dist(N, vector<int>(N, INF));

    dist[start.x][start.y] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        Node curr = pq.top(); pq.pop();
        if (curr.pos == end) return curr.cost;

        for (Point next : neighbors(curr.pos)) {
            if (dist[next.x][next.y] > curr.cost + 1) {
                dist[next.x][next.y] = curr.cost + 1;
                pq.push({dist[next.x][next.y], next});
            }
        }
    }
    return -1;
}`,
            javascript: `function dijkstra(grid, start, end) {
    const pq = new PriorityQueue();
    const dist = new Map();
    
    dist.set(start, 0);
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const curr = pq.dequeue();
        if (curr === end) return dist.get(end);

        for (const neighbor of getNeighbors(curr)) {
            const newDist = dist.get(curr) + 1;
            if (newDist < (dist.get(neighbor) || Infinity)) {
                dist.set(neighbor, newDist);
                pq.enqueue(neighbor, newDist);
            }
        }
    }
}`,
            go: `func dijkstra(grid [][]int, start Point, end Point) int {
    pq := make(PriorityQueue, 0)
    heap.Init(&pq)
    
    dist := make(map[Point]int)
    dist[start] = 0
    heap.Push(&pq, &Item{value: start, priority: 0})

    for pq.Len() > 0 {
        curr := heap.Pop(&pq).(*Item).value
        
        if curr == end { return dist[end] }

        for _, neighbor := range getNeighbors(curr) {
            newDist := dist[curr] + 1
            if d, ok := dist[neighbor]; !ok || newDist < d {
                dist[neighbor] = newDist
                heap.Push(&pq, &Item{value: neighbor, priority: newDist})
            }
        }
    }
    return -1
}`
        };
    }

    initialize() {
        // Create a 5x5 Grid with walls
        const size = 5;
        const nodes = [];
        
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                // Strategic walls to force pathing around
                const isWall = (x === 2 && z === 1) || (x === 2 && z === 2) || (x === 1 && z === 3);
                nodes.push({
                    id: `${x}-${z}`,
                    x, z,
                    isWall,
                    // Center the 5x5 grid (offset by 2) and spread out by 1.1 units
                    pos: [(x - 2) * 1.1, 0, (z - 2) * 1.1] 
                });
            }
        }
        
        return { 
            nodes,
            start: '0-0',
            end: '4-4'
        };
    }

    mapToVisual(data) {
        return data.nodes.map(n => ({
            id: `tile-${n.id}`,
            type: 'tile',
            position: n.pos,
            state: n.isWall ? 'wall' : 'default',
            label: ''
        }));
    }

    *execute(data) {
        const { nodes, start, end } = data;
        const getNode = (id) => nodes.find(n => n.id === id);
        
        const getNeighbors = (node) => {
            const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            const res = [];
            dirs.forEach(([dx, dz]) => {
                const nx = node.x + dx;
                const nz = node.z + dz;
                const neighbor = nodes.find(n => n.x === nx && n.z === nz);
                if (neighbor && !neighbor.isWall) res.push(neighbor);
            });
            return res;
        };

        const dist = {};
        const prev = {};
        const pq = [{ id: start, d: 0 }];
        
        nodes.forEach(n => dist[n.id] = Infinity);
        dist[start] = 0;

        yield { type: 'update_tile', id: start, state: 'active', narrative: "Start Point Initialized" };
        yield { type: 'highlight_code', line: 2 };
        yield { type: 'delay', duration: 400 };

        yield { type: 'update_tile', id: end, state: 'active', narrative: "Target Point Locked" };
        yield { type: 'delay', duration: 400 };

        while (pq.length > 0) {
            pq.sort((a, b) => a.d - b.d);
            const { id: currId, d } = pq.shift();
            
            const currNode = getNode(currId);
            
            // Goal Check
            if (currId === end) {
                yield { type: 'complete', narrative: "Shortest Path Found." };
                
                // Backtrack visualization
                let temp = end;
                while (temp) {
                    yield { type: 'update_tile', id: temp, state: 'path' };
                    yield { type: 'delay', duration: 100 };
                    temp = prev[temp];
                }
                return;
            }

            // Mark visited
            if (currId !== start) {
                yield { type: 'update_tile', id: currId, state: 'visited' };
                yield { type: 'highlight_code', line: 5 }; // pop
            }

            const neighbors = getNeighbors(currNode);
            for (const neighbor of neighbors) {
                const newDist = d + 1;
                
                if (newDist < dist[neighbor.id]) {
                    dist[neighbor.id] = newDist;
                    prev[neighbor.id] = currId;
                    pq.push({ id: neighbor.id, d: newDist });
                    
                    if (neighbor.id !== end) {
                        yield { type: 'update_tile', id: neighbor.id, state: 'queue', narrative: `Scanning Neighbor ${neighbor.id}` };
                        yield { type: 'highlight_code', line: 12 }; // push to pq
                    }
                }
            }
            
            yield { type: 'delay', duration: 200 };
        }
    }
}
