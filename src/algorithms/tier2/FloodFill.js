import { AlgorithmBase } from '../AlgorithmBase';

export class FloodFill extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Flood Fill";
        this.tier = 2;
        this.category = "Graph / Matrix";
        this.description = "Fills a connected area of multi-dimensional array with a specific value. Similar to the bucket tool in paint programs.";

        this.details = {
            complexity: {
                time: "O(N)",
                space: "O(N)"
            },
            useCases: [
                "Image Editing (Paint Bucket Tool)",
                "Game Development (Map Generation, Area control)",
                "Solving Maze problems (Finding connected components)"
            ],
            keyConcept: "Connectivity: Recursively visit 4-directional neighbors (up, down, left, right) that share the same color and change them."
        };

        this.code = {
            python: `def flood_fill(image, sr, sc, new_color):
    rows, cols = len(image), len(image[0])
    color = image[sr][sc]
    if color == new_color: return image
    
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            image[r][c] != color):
            return
        
        image[r][c] = new_color
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
        
    dfs(sr, sc)
    return image`,
            javascript: `function floodFill(image, sr, sc, newColor) {
    const color = image[sr][sc];
    if (color === newColor) return image;
    
    function fill(r, c) {
        if (r < 0 || r >= image.length || c < 0 || 
            c >= image[0].length || image[r][c] !== color) {
            return;
        }
        
        image[r][c] = newColor;
        
        fill(r + 1, c);
        fill(r - 1, c);
        fill(r, c + 1);
        fill(r, c - 1);
    }
    
    fill(sr, sc);
    return image;
}`,
            cpp: `void dfs(vector<vector<int>>& image, int r, int c, int color, int newColor) {
    if (r < 0 || r >= image.size() || c < 0 || 
        c >= image[0].size() || image[r][c] != color) return;
        
    image[r][c] = newColor;
    
    dfs(image, r+1, c, color, newColor);
    dfs(image, r-1, c, color, newColor);
    dfs(image, r, c+1, color, newColor);
    dfs(image, r, c-1, color, newColor);
}

vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {
    if (image[sr][sc] != newColor)
        dfs(image, sr, sc, image[sr][sc], newColor);
    return image;
}`,
            go: `func floodFill(image [][]int, sr int, sc int, newColor int) [][]int {
    color := image[sr][sc]
    if color == newColor { return image }
    
    var dfs func(r, c int)
    dfs = func(r, c int) {
        if r < 0 || r >= len(image) || c < 0 || c >= len(image[0]) || image[r][c] != color {
            return
        }
        
        image[r][c] = newColor
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    }
    
    dfs(sr, sc)
    return image
}`,
            rust: `fn flood_fill(mut image: Vec<Vec<i32>>, sr: i32, sc: i32, new_color: i32) -> Vec<Vec<i32>> {
    let color = image[sr as usize][sc as usize];
    if color == new_color { return image; }
    
    fn dfs(image: &mut Vec<Vec<i32>>, r: i32, c: i32, color: i32, new_color: i32) {
        if r < 0 || c < 0 || r >= image.len() as i32 || c >= image[0].len() as i32 { return; }
        if image[r as usize][c as usize] != color { return; }
        
        image[r as usize][c as usize] = new_color;
        
        dfs(image, r + 1, c, color, new_color);
        dfs(image, r - 1, c, color, new_color);
        dfs(image, r, c + 1, color, new_color);
        dfs(image, r, c - 1, color, new_color);
    }
    
    dfs(&mut image, sr, sc, color, new_color);
    image
}`
        };
    }

    initialize() {
        // 0 = Water (Blue), 1 = Wall (Gray)
        // We create a "Bucket" shape to hold the liquid
        const grid = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        
        return { 
            grid, 
            start: [3, 3], // Start inside the little "room" in the center
            originalColor: 0,
            newColor: 2 
        };
    }

    // Explicitly map values to specific visual styles
    mapToVisual(data) {
        return data.grid.flatMap((row, r) => 
            row.map((val, c) => ({
                id: `tile-${r}-${c}`,
                type: 'tile', 
                position: [(c - 3) * 1.2, 0, (r - 3) * 1.2], 
                state: val === 1 ? 'obstacle' : 'default', 
                // FORCE THE WATER COLOR INITIALLY
                customColor: val === 1 ? '#0a0a0a' : '#06b6d4', // Obsidian vs Cyan
                label: ''
            }))
        );
    }

    *execute(data) {
        const grid = JSON.parse(JSON.stringify(data.grid));
        const rows = grid.length;
        const cols = grid[0].length;
        const [sr, sc] = data.start;
        const oldColor = grid[sr][sc]; 
        const newColor = data.newColor;

        if (oldColor === newColor) return;

        // Use BFS for a "Spread" visual effect (DFS looks like a snake, BFS looks like a pour)
        const queue = [[sr, sc]];
        
        // Initial Pout
        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: `Pouring Gold Paint at (${sr}, ${sc})...` 
        };

        // Mark start
        grid[sr][sc] = newColor;
        yield { 
            type: 'update_visual', // Force update
            id: `tile-${sr}-${sc}`, 
            state: 'success', 
            customColor: '#fbbf24', // GOLD
            narrative: `Start Node Filled` 
        };

        while (queue.length > 0) {
            const [r, c] = queue.shift();
            const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
            
            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    
                    // Visual: Briefly highlight "Inspecting"
                    if (grid[nr][nc] === oldColor) {
                        yield { 
                            type: 'update_visual', 
                            id: `tile-${nr}-${nc}`, 
                            state: 'active', // Yellow/Orange tint usually
                            narrative: `Spreading to (${nr},${nc})...` 
                        };
                        
                        yield { type: 'delay', duration: 100 }; // Speed of flow

                        // FILL
                        grid[nr][nc] = newColor;
                        queue.push([nr, nc]);

                        yield { 
                            type: 'update_visual', 
                            id: `tile-${nr}-${nc}`, 
                            state: 'success', // Should trigger success style
                            customColor: '#fbbf24', // Explicitly GOLD
                            narrative: `Filled (${nr},${nc})` 
                        };
                    } 
                }
            }
        }
        
        yield { type: 'complete', narrative: "Area completely filled!" };
    }
}
