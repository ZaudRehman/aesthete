import { AlgorithmBase } from '../AlgorithmBase';

export class BFS extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Breadth First Search";
        this.tier = 2;
        this.category = "Graph Theory";
        this.description = "Explores a graph layer by layer, starting from a source node.";
        
        this.details = {
            complexity: {
                time: "O(V + E)",
                space: "O(V)"
            },
            useCases: [
                "Shortest Path in unweighted graphs (GPS navigation)",
                "Social Network Analysis (Finding 'degrees of separation')",
                "Web Crawlers (Exploring links level by level)"
            ],
            keyConcept: "Level-Order Traversal: BFS visits neighbors before neighbors' neighbors, spreading like a ripple in water."
        };
        
        this.code = {
            rust: `fn bfs(graph: &Graph, start: usize) {
    let mut queue = VecDeque::new();
    let mut visited = HashSet::new();
    
    queue.push_back(start);
    visited.insert(start);

    while let Some(node) = queue.pop_front() {
        for &neighbor in &graph[node] {
            if visited.insert(neighbor) {
                queue.push_back(neighbor);
            }
        }
    }
}`,
            cpp: `void bfs(vector<vector<int>>& adj, int start) {
    queue<int> q;
    vector<bool> visited(adj.size(), false);

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
            go: `func bfs(graph [][]int, start int) {
    queue := []int{start}
    visited := make(map[int]bool)
    visited[start] = true

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]

        for _, neighbor := range graph[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }
}`,
            javascript: `function bfs(graph, start) {
    const queue = [start];
    const visited = new Set([start]);

    while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`,
            python: `def bfs(graph, start):
    queue = [start]
    visited = {start}
    while queue:
        vertex = queue.pop(0)
        for neighbour in graph[vertex]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)`
        };
    }

    initialize() {
        // Define a simple binary tree-like graph for visualization
        // Nodes: 0 (Root), 1, 2 (Children of 0), etc.
        return {
            nodes: [
                { id: 0, pos: [0, 2, 0] },
                { id: 1, pos: [-2, 0, 0] },
                { id: 2, pos: [2, 0, 0] },
                { id: 3, pos: [-3, -2, 0] },
                { id: 4, pos: [-1, -2, 0] },
                { id: 5, pos: [1, -2, 0] },
                { id: 6, pos: [3, -2, 0] },
            ],
            edges: [
                [0, 1], [0, 2],
                [1, 3], [1, 4],
                [2, 5], [2, 6]
            ],
            adj: {
                0: [1, 2], 1: [3, 4], 2: [5, 6], 
                3: [], 4: [], 5: [], 6: []
            }
        };
    }

    mapToVisual(data) {
        // Map nodes to "Orb" entities
        const nodeEntities = data.nodes.map(n => ({
            id: `node-${n.id}`,
            type: 'orb',
            position: n.pos,
            state: 'default',
            label: n.id.toString()
        }));

        // Create Lines for Edges
        // We use simple line segments for visualization
        const edgeEntities = [];
        data.edges.forEach((edge, idx) => {
            const startNode = data.nodes.find(n => n.id === edge[0]);
            const endNode = data.nodes.find(n => n.id === edge[1]);
            
            edgeEntities.push({
                id: `edge-${edge[0]}-${edge[1]}`,
                type: 'edge',
                points: [startNode.pos, endNode.pos],
                active: false
            });
        });

        return [...nodeEntities, ...edgeEntities];
    }

    *execute(data) {
        const queue = [0];
        const visited = new Set([0]);

        // Init: Push Start
        yield { 
            type: 'activate_node', 
            id: 0, 
            narrative: "Initializing Search at Root Node 0" 
        };
        yield { type: 'highlight_code', line: 4 }; // visited.insert(start)
        yield { type: 'delay', duration: 500 };

        while (queue.length > 0) {
            yield { type: 'highlight_code', line: 6 }; // while let Some(node)
            
            const current = queue.shift();
            
            yield { 
                type: 'visit_node', 
                id: current, 
                narrative: `Visiting Node ${current}` 
            };
            
            yield { type: 'highlight_code', line: 7 }; // for neighbor loop

            const neighbors = data.adj[current];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    yield { type: 'highlight_code', line: 8 }; // if visited.insert
                    
                    visited.add(neighbor);
                    queue.push(neighbor);
                    
                    // Visualize Edge Traversal
                    yield { 
                        type: 'highlight_edge', 
                        from: current, 
                        to: neighbor, 
                        narrative: `Discovering Neighbor ${neighbor}` 
                    };
                    
                    // Activate the new node
                    yield { 
                        type: 'activate_node', 
                        id: neighbor, 
                        narrative: `Adding Node ${neighbor} to Queue` 
                    };
                    
                    yield { type: 'highlight_code', line: 9 }; // queue.push_back
                }
            }
        }

        yield { type: 'complete', narrative: "Graph Traversal Complete." };
    }
}
