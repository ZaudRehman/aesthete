import { AlgorithmBase } from '../AlgorithmBase';

export class AStarGrid extends AlgorithmBase {
    constructor() {
        super();
        this.name = "A* Search";
        this.tier = 3;
        this.category = "Pathfinding";
        this.description = "An informed search algorithm that uses a heuristic to find the shortest path faster than Dijkstra.";
        
        this.details = {
            complexity: {
                time: "O(E)", // Depends heavily on heuristic
                space: "O(V)"
            },
            useCases: [
                "Video Game AI (Unit movement)",
                "Robotics path planning",
                "Traffic Navigation Systems"
            ],
            keyConcept: "Heuristics: f(n) = g(n) + h(n). Don't just look at how far you've come (g), but guess how far you have left to go (h)."
        };
        
        this.code = {
            python: `def a_star(grid, start, end):
    # Priority Queue stores (F-Cost, Node)
    # F = G (Distance from start) + H (Heuristic to end)
    pq = [(0, start)]
    g_score = {start: 0}
    
    while pq:
        f, curr = heapq.heappop(pq)
        
        if curr == end: return reconstruct_path(curr)
        
        for neighbor in get_neighbors(curr):
            tentative_g = g_score[curr] + weight(curr, neighbor)
            
            if tentative_g < g_score.get(neighbor, inf):
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor, end)
                heapq.heappush(pq, (f_score, neighbor))`,
            
            javascript: `function aStar(grid, start, end) {
    const openSet = new PriorityQueue();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(start, 0);
    fScore.set(start, heuristic(start, end));
    openSet.enqueue(start, fScore.get(start));

    while (!openSet.isEmpty()) {
        const current = openSet.dequeue();
        if (current === end) return reconstructPath(current);

        for (const neighbor of getNeighbors(current)) {
            const tentativeG = gScore.get(current) + 1;
            if (tentativeG < (gScore.get(neighbor) || Infinity)) {
                gScore.set(neighbor, tentativeG);
                const f = tentativeG + heuristic(neighbor, end);
                fScore.set(neighbor, f);
                openSet.enqueue(neighbor, f);
            }
        }
    }
}`,
            rust: `fn a_star(grid: &Grid, start: Point, end: Point) -> Option<Vec<Point>> {
    let mut open_set = BinaryHeap::new();
    let mut g_score = HashMap::new();

    g_score.insert(start, 0);
    open_set.push(Node { f: 0, pos: start });

    while let Some(Node { f, pos }) = open_set.pop() {
        if pos == end { return Some(reconstruct_path(pos)); }

        for neighbor in grid.neighbors(pos) {
            let tentative_g = g_score[&pos] + 1;
            if tentative_g < *g_score.get(&neighbor).unwrap_or(&i32::MAX) {
                g_score.insert(neighbor, tentative_g);
                let f = tentative_g + heuristic(neighbor, end);
                open_set.push(Node { f, pos: neighbor });
            }
        }
    }
    None
}`,
            cpp: `int aStar(vector<vector<int>>& grid, Point start, Point end) {
    priority_queue<Node, vector<Node>, greater<Node>> pq;
    vector<vector<int>> gScore(N, vector<int>(N, INF));

    gScore[start.x][start.y] = 0;
    pq.push({heuristic(start, end), start});

    while (!pq.empty()) {
        Node curr = pq.top(); pq.pop();
        if (curr.pos == end) return gScore[end.x][end.y];

        for (Point next : neighbors(curr.pos)) {
            int tentativeG = gScore[curr.pos.x][curr.pos.y] + 1;
            if (tentativeG < gScore[next.x][next.y]) {
                gScore[next.x][next.y] = tentativeG;
                int f = tentativeG + heuristic(next, end);
                pq.push({f, next});
            }
        }
    }
    return -1;
}`,
            go: `func aStar(grid [][]int, start, end Point) int {
    pq := make(PriorityQueue, 0)
    heap.Init(&pq)
    gScore := make(map[Point]int)

    gScore[start] = 0
    heap.Push(&pq, &Item{pos: start, f: heuristic(start, end)})

    for pq.Len() > 0 {
        curr := heap.Pop(&pq).(*Item).pos
        if curr == end { return gScore[end] }

        for _, neighbor := range getNeighbors(curr) {
            tentativeG := gScore[curr] + 1
            if oldG, exists := gScore[neighbor]; !exists || tentativeG < oldG {
                gScore[neighbor] = tentativeG
                f := tentativeG + heuristic(neighbor, end)
                heap.Push(&pq, &Item{pos: neighbor, f: f})
            }
        }
    }
    return -1
}`
        };
    }

    initialize() {
        // Create a 7x7 Grid (Larger to show A* efficiency)
        const size = 7;
        const nodes = [];
        
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                // A wall to force it to go around
                // Wall at x=3, blocking the middle, with a hole at z=1 and z=5
                const isWall = (x === 3 && z !== 1 && z !== 5);
                
                nodes.push({
                    id: `${x}-${z}`,
                    x, z,
                    isWall,
                    pos: [(x - 3) * 1.1, 0, (z - 3) * 1.1] 
                });
            }
        }
        
        return { 
            nodes,
            start: '0-3', // Left Middle
            end: '6-3'    // Right Middle
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
        const endNode = getNode(end);
        
        // Manhattan Heuristic
        const h = (node) => Math.abs(node.x - endNode.x) + Math.abs(node.z - endNode.z);

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

        const gScore = {}; // Cost from start
        const fScore = {}; // Cost from start + Heuristic
        const prev = {};
        const pq = [{ id: start, f: h(getNode(start)) }];
        
        nodes.forEach(n => {
            gScore[n.id] = Infinity;
            fScore[n.id] = Infinity;
        });
        
        gScore[start] = 0;
        fScore[start] = h(getNode(start));

        yield { type: 'update_tile', id: start, state: 'active', narrative: "Start Point: A* Engine Online" };
        yield { type: 'highlight_code', line: 7 };
        yield { type: 'update_tile', id: end, state: 'active', narrative: "Target Acquired" };
        yield { type: 'delay', duration: 500 };

        while (pq.length > 0) {
            // Sort by F-Score (Lowest F is best)
            pq.sort((a, b) => a.f - b.f);
            const { id: currId } = pq.shift();
            const currNode = getNode(currId);
            
            if (currId === end) {
                yield { type: 'complete', narrative: "Target Reached. Calculating Optimal Path..." };
                
                // Backtrack
                let temp = end;
                while (temp) {
                    yield { type: 'update_tile', id: temp, state: 'path' };
                    yield { type: 'delay', duration: 50 };
                    temp = prev[temp];
                }
                return;
            }

            if (currId !== start) {
                yield { type: 'update_tile', id: currId, state: 'visited' };
            }

            const neighbors = getNeighbors(currNode);
            for (const neighbor of neighbors) {
                const tentativeG = gScore[currId] + 1;
                
                if (tentativeG < gScore[neighbor.id]) {
                    prev[neighbor.id] = currId;
                    gScore[neighbor.id] = tentativeG;
                    
                    const heuristicCost = h(neighbor);
                    const totalF = tentativeG + heuristicCost;
                    fScore[neighbor.id] = totalF;
                    
                    // Add to PQ if not present or update priority
                    const existing = pq.find(p => p.id === neighbor.id);
                    if (!existing) {
                        pq.push({ id: neighbor.id, f: totalF });
                        if (neighbor.id !== end) {
                            yield { 
                                type: 'update_tile', 
                                id: neighbor.id, 
                                state: 'queue', 
                                narrative: `Analyzing Node (H=${heuristicCost}, F=${totalF})` 
                            };
                            yield { type: 'highlight_code', line: 16 }; // Heuristic calc
                        }
                    } else {
                        // Update existing priority
                        existing.f = totalF;
                    }
                }
            }
            
            yield { type: 'delay', duration: 150 }; // A bit faster than Dijkstra
        }
    }
}
