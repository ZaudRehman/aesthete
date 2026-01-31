import { AlgorithmBase } from '../AlgorithmBase';

export class TopologicalSort extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Topological Sort (Kahn's)";
        this.tier = 2;
        this.category = "Graph (Directed Acyclic Graph)";
        this.description = "Orders nodes in a directed graph such that for every edge u→v, u comes before v. Detects cycles in directed graphs. Used in scheduling, dependency resolution, and build systems.";

        this.details = {
            complexity: {
                time: "O(V + E)",
                space: "O(V)"
            },
            useCases: [
                "Package dependency resolution (npm, pip, cargo)",
                "Build order determination (Makefiles, Gradle)",
                "Course prerequisite scheduling",
                "Detecting circular dependencies in modules"
            ],
            keyConcept: "In-Degree: Count of incoming edges. Nodes with 0 in-degree have no dependencies. Process them first, remove their edges, and repeat. If all nodes are processed, the graph is acyclic (DAG)."
        };
        
        this.code = {
            python: `from collections import deque

def topological_sort(graph, n):
    in_degree = [0] * n
    
    # Calculate in-degrees
    for u in range(n):
        for v in graph[u]:
            in_degree[v] += 1
    
    # Queue nodes with in-degree 0
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []
    
    while queue:
        u = queue.popleft()
        result.append(u)
        
        # Remove edges from u
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    # If result doesn't contain all nodes, there's a cycle
    return result if len(result) == n else None`,

            javascript: `function topologicalSort(graph, n) {
    const inDegree = Array(n).fill(0);
    
    // Calculate in-degrees
    for (let u = 0; u < n; u++) {
        for (const v of graph[u]) {
            inDegree[v]++;
        }
    }
    
    // Queue nodes with in-degree 0
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        
        // Remove edges from u
        for (const v of graph[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) {
                queue.push(v);
            }
        }
    }
    
    // If result doesn't contain all nodes, there's a cycle
    return result.length === n ? result : null;
}`,

            cpp: `vector<int> topologicalSort(vector<vector<int>>& graph, int n) {
    vector<int> inDegree(n, 0);
    
    // Calculate in-degrees
    for (int u = 0; u < n; u++) {
        for (int v : graph[u]) {
            inDegree[v]++;
        }
    }
    
    // Queue nodes with in-degree 0
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }
    
    vector<int> result;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        // Remove edges from u
        for (int v : graph[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    // If result doesn't contain all nodes, there's a cycle
    return result.size() == n ? result : vector<int>();
}`,

            rust: `use std::collections::VecDeque;

fn topological_sort(graph: &Vec<Vec<usize>>, n: usize) -> Option<Vec<usize>> {
    let mut in_degree = vec![0; n];
    
    // Calculate in-degrees
    for u in 0..n {
        for &v in &graph[u] {
            in_degree[v] += 1;
        }
    }
    
    // Queue nodes with in-degree 0
    let mut queue: VecDeque<usize> = (0..n)
        .filter(|&i| in_degree[i] == 0)
        .collect();
    
    let mut result = Vec::new();
    
    while let Some(u) = queue.pop_front() {
        result.push(u);
        
        // Remove edges from u
        for &v in &graph[u] {
            in_degree[v] -= 1;
            if in_degree[v] == 0 {
                queue.push_back(v);
            }
        }
    }
    
    // If result doesn't contain all nodes, there's a cycle
    if result.len() == n {
        Some(result)
    } else {
        None
    }
}`,

            go: `func topologicalSort(graph [][]int, n int) []int {
    inDegree := make([]int, n)
    
    // Calculate in-degrees
    for u := 0; u < n; u++ {
        for _, v := range graph[u] {
            inDegree[v]++
        }
    }
    
    // Queue nodes with in-degree 0
    queue := []int{}
    for i := 0; i < n; i++ {
        if inDegree[i] == 0 {
            queue = append(queue, i)
        }
    }
    
    result := []int{}
    
    for len(queue) > 0 {
        u := queue[0]
        queue = queue[1:]
        result = append(result, u)
        
        // Remove edges from u
        for _, v := range graph[u] {
            inDegree[v]--
            if inDegree[v] == 0 {
                queue = append(queue, v)
            }
        }
    }
    
    // If result doesn't contain all nodes, there's a cycle
    if len(result) == n {
        return result
    }
    return nil
}`
        };
    }

    initialize() {
        // DAG representing: 0→2, 0→3, 1→3, 1→4, 2→5, 3→5, 4→5
        // Visual: Course prerequisites
        // 0: Intro CS, 1: Intro Math
        // 2: Data Structures, 3: Algorithms, 4: Discrete Math
        // 5: Advanced Algorithms
        
        const nodes = [
            { id: 0, label: 'CS101', pos: [-4, 2, 0] },
            { id: 1, label: 'Math101', pos: [4, 2, 0] },
            { id: 2, label: 'DS', pos: [-4, 0, 0] },
            { id: 3, label: 'Algo', pos: [0, 0, 0] },
            { id: 4, label: 'DiscMath', pos: [4, 0, 0] },
            { id: 5, label: 'AdvAlgo', pos: [0, -2, 0] }
        ];
        
        const edges = [
            [0, 2], [0, 3],
            [1, 3], [1, 4],
            [2, 5], [3, 5], [4, 5]
        ];
        
        const adj = {
            0: [2, 3],
            1: [3, 4],
            2: [5],
            3: [5],
            4: [5],
            5: []
        };
        
        return { nodes, edges, adj };
    }

    mapToVisual(data) {
        const nodeEntities = data.nodes.map(n => ({
            id: `node-${n.id}`,
            type: 'orb',
            position: n.pos,
            state: 'default',
            label: n.label
        }));
        
        const edgeEntities = data.edges.map(([from, to]) => {
            const startNode = data.nodes.find(n => n.id === from);
            const endNode = data.nodes.find(n => n.id === to);
            return {
                id: `edge-${from}-${to}`,
                type: 'edge',
                points: [startNode.pos, endNode.pos],
                active: false
            };
        });
        
        return [...nodeEntities, ...edgeEntities];
    }

    *execute(data) {
        const { nodes, adj } = data;
        const n = nodes.length;
        const inDegree = Array(n).fill(0);
        
        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: "Step 1: Calculating in-degrees (dependency counts)..." 
        };
        yield { type: 'highlight_code', line: 6 };
        
        for (let u = 0; u < n; u++) {
            for (const v of adj[u]) {
                inDegree[v]++;
                
                yield { 
                    type: 'highlight_edge', 
                    from: u, 
                    to: v, 
                    narrative: `Edge ${nodes[u].label}→${nodes[v].label}: in-degree[${nodes[v].label}] = ${inDegree[v]}` 
                };
                yield { type: 'delay', duration: 200 };
            }
        }

        yield { 
            type: 'delay', 
            duration: 600, 
            narrative: "Step 2: Finding nodes with no dependencies (in-degree = 0)..." 
        };
        yield { type: 'highlight_code', line: 11 };
        
        const queue = [];
        for (let i = 0; i < n; i++) {
            if (inDegree[i] === 0) {
                queue.push(i);
                yield { 
                    type: 'visit_node', 
                    id: i, 
                    narrative: `${nodes[i].label} has no prerequisites! Adding to queue.` 
                };
                yield { type: 'delay', duration: 300 };
            }
        }
        
        const result = [];
        
        yield { 
            type: 'delay', 
            duration: 700, 
            narrative: "Step 3: Processing nodes in dependency order..." 
        };
        yield { type: 'highlight_code', line: 16 };
        
        while (queue.length > 0) {
            const u = queue.shift();
            result.push(u);
            
            yield { 
                type: 'activate_node', 
                id: u, 
                narrative: `Processing ${nodes[u].label} (position ${result.length} in order)` 
            };
            yield { type: 'highlight_code', line: 18 };
            yield { type: 'delay', duration: 400 };
            
            // "Remove" edges from u by decrementing in-degrees
            for (const v of adj[u]) {
                yield { 
                    type: 'highlight_edge', 
                    from: u, 
                    to: v, 
                    narrative: `Removing edge ${nodes[u].label}→${nodes[v].label}` 
                };
                yield { type: 'highlight_code', line: 21 };
                
                inDegree[v]--;
                
                yield { 
                    type: 'delay', 
                    duration: 200, 
                    narrative: `${nodes[v].label} in-degree reduced to ${inDegree[v]}` 
                };
                
                if (inDegree[v] === 0) {
                    queue.push(v);
                    yield { 
                        type: 'visit_node', 
                        id: v, 
                        narrative: `${nodes[v].label} now has 0 dependencies! Adding to queue.` 
                    };
                    yield { type: 'highlight_code', line: 23 };
                    yield { type: 'delay', duration: 300 };
                }
            }
            
            // Mark as fully processed
            yield { 
                type: 'visit_node', 
                id: u, 
                narrative: `${nodes[u].label} fully processed` 
            };
        }
        
        if (result.length === n) {
            const order = result.map(id => nodes[id].label).join(' → ');
            yield { 
                type: 'complete', 
                narrative: `Valid topological order: ${order}` 
            };
        } else {
            yield { 
                type: 'complete', 
                narrative: `Cycle detected! Only ${result.length}/${n} nodes processed.` 
            };
        }
    }
}
