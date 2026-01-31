import { AlgorithmBase } from '../AlgorithmBase';

export class DFS extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Depth First Search";
        this.tier = 2;
        this.category = "Graph Theory";
        this.description = "Explores as far as possible along each branch before backtracking.";
        
        this.details = {
            complexity: {
                time: "O(V + E)",
                space: "O(V) (Recursion Stack)"
            },
            useCases: [
                "Maze Solving (finding any path to exit)",
                "Topological Sorting (Dependency resolution)",
                "Detecting Cycles in a graph"
            ],
            keyConcept: "Backtracking: Dive deep into a path until you hit a dead end, then step back and try the next available path."
        };
        
        this.code = {
            rust: `fn dfs(graph: &Graph, start: usize, visited: &mut HashSet<usize>) {
    visited.insert(start);
    
    for &neighbor in &graph[start] {
        if !visited.contains(&neighbor) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
            cpp: `void dfs(vector<vector<int>>& adj, int u, vector<bool>& visited) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(adj, v, visited);
        }
    }
}`,
            python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)

    for next in graph[start] - visited:
        dfs(graph, next, visited)
    return visited`,
            
            javascript: `function dfs(graph, node, visited = new Set()) {
    visited.add(node);
    
    for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
            go: `func dfs(graph [][]int, node int, visited map[int]bool) {
    visited[node] = true
    
    for _, neighbor := range graph[node] {
        if !visited[neighbor] {
            dfs(graph, neighbor, visited)
        }
    }
}`
        };
    }

    initialize() {
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
        const nodeEntities = data.nodes.map(n => ({
            id: `node-${n.id}`,
            type: 'orb',
            position: n.pos,
            state: 'default',
            label: n.id.toString()
        }));

        const edgeEntities = [];
        data.edges.forEach((edge) => {
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
        const visited = new Set();
        
        // We define a recursive generator function
        function* traverse(node) {
            if (visited.has(node)) return;
            
            visited.add(node);
            yield { type: 'visit_node', id: node, narrative: `Visiting Node ${node}` };
            yield { type: 'highlight_code', line: 2 };

            // For recursion, we just iterate normally [1, 2] -> Visit 1 then Visit 2
            const neighbors = data.adj[node]; 
            
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    yield { type: 'highlight_edge', from: node, to: neighbor, narrative: `Branching to ${neighbor}` };
                    yield { type: 'highlight_code', line: 6 };
                    
                    // Delegate to the recursive call
                    yield* traverse(neighbor);
                }
            }
        }

        yield { type: 'activate_node', id: 0, narrative: "Starting Recursive DFS" };
        yield* traverse(0);
        yield { type: 'complete', narrative: "DFS Complete." };
    }
}
