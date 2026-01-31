import { AlgorithmBase } from '../AlgorithmBase';

export class Knapsack extends AlgorithmBase {
    constructor() {
        super();
        this.name = "0/1 Knapsack Problem";
        this.tier = 2;
        this.category = "Dynamic Programming";
        this.description = "Given items with weights and values, and a knapsack with capacity W, find the maximum value you can carry. Each item can only be taken once (0 or 1). The foundation of resource allocation algorithms.";

        this.details = {
            complexity: {
                time: "O(N × W) where N = items, W = capacity",
                space: "O(N × W) for DP table"
            },
            useCases: [
                "Resource allocation (budget optimization)",
                "Portfolio optimization (investment selection)",
                "Cargo loading (maximize profit)",
                "Memory management (cache optimization)"
            ],
            keyConcept: "2D DP Grid: For each item and weight, decide: Take it (add value + check remaining capacity) OR Skip it (keep previous best). Formula: dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])"
        };
        
        this.code = {
            python: `def knapsack(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Option 1: Don't take item i-1
            dp[i][w] = dp[i - 1][w]
            
            # Option 2: Take item i-1 (if it fits)
            if weights[i - 1] <= w:
                take_value = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                dp[i][w] = max(dp[i][w], take_value)
    
    return dp[n][capacity]`,

            javascript: `function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // Skip item
            dp[i][w] = dp[i - 1][w];
            
            // Take item if it fits
            if (weights[i - 1] <= w) {
                const takeValue = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                dp[i][w] = Math.max(dp[i][w], takeValue);
            }
        }
    }
    
    return dp[n][capacity];
}`,

            cpp: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];
            
            if (weights[i - 1] <= w) {
                int takeValue = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                dp[i][w] = max(dp[i][w], takeValue);
            }
        }
    }
    
    return dp[n][capacity];
}`,

            rust: `fn knapsack(weights: Vec<i32>, values: Vec<i32>, capacity: i32) -> i32 {
    let n = weights.len();
    let cap = capacity as usize;
    let mut dp = vec![vec![0; cap + 1]; n + 1];
    
    for i in 1..=n {
        for w in 0..=cap {
            dp[i][w] = dp[i - 1][w];
            
            if weights[i - 1] as usize <= w {
                let take_value = values[i - 1] + dp[i - 1][w - weights[i - 1] as usize];
                dp[i][w] = dp[i][w].max(take_value);
            }
        }
    }
    
    dp[n][cap]
}`,

            go: `func knapsack(weights []int, values []int, capacity int) int {
    n := len(weights)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, capacity+1)
    }
    
    for i := 1; i <= n; i++ {
        for w := 0; w <= capacity; w++ {
            dp[i][w] = dp[i-1][w]
            
            if weights[i-1] <= w {
                takeValue := values[i-1] + dp[i-1][w-weights[i-1]]
                dp[i][w] = max(dp[i][w], takeValue)
            }
        }
    }
    
    return dp[n][capacity]
}`
        };
    }

    initialize() {
        const weights = [2, 3, 4, 5];
        const values = [3, 4, 5, 6];
        const capacity = 8;
        return { weights, values, capacity };
    }

    mapToVisual(data) {
        const { weights, values, capacity } = data;
        const n = weights.length;
        const entities = [];

        const gridCenterX = capacity * 1.2 / 2;
        const gridCenterZ = n * 1.5 / 2;

        // 1. Item Orbs (Left side - showing weights and values)
        for (let i = 0; i < n; i++) {
            entities.push({
                id: `item-${i}`,
                type: 'orb',
                position: [-4, 1, i * 1.5 - gridCenterZ + 0.75],
                state: 'default',
                label: `W:${weights[i]} V:${values[i]}`
            });
        }

        // 2. Capacity Labels (Top - showing weight capacity)
        for (let w = 0; w <= capacity; w++) {
            if (w % 2 === 0 || w === capacity) { // Show every 2nd for clarity
                entities.push({
                    id: `cap-${w}`,
                    type: 'orb',
                    position: [w * 1.2 - gridCenterX, 1, -3],
                    state: 'visited',
                    label: `${w}`
                });
            }
        }

        // 3. DP Grid (Pillars)
        for (let i = 0; i <= n; i++) {
            for (let w = 0; w <= capacity; w++) {
                entities.push({
                    id: `cell-${i}-${w}`,
                    type: 'pillar',
                    position: [
                        w * 1.2 - gridCenterX,
                        0,
                        i * 1.5 - gridCenterZ
                    ],
                    height: 0.05,
                    state: (i === 0) ? 'visited' : 'default',
                    value: 0
                });
            }
        }
        
        return entities;
    }

    *execute(data) {
        const { weights, values, capacity } = data;
        const n = weights.length;
        
        const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

        yield { 
            type: 'delay', 
            duration: 1200, 
            narrative: `0/1 Knapsack: ${n} items, capacity ${capacity}` 
        };

        const itemDesc = weights.map((w, i) => `Item ${i+1}: W=${w}, V=${values[i]}`).join(' | ');
        yield { 
            type: 'delay', 
            duration: 1000, 
            narrative: itemDesc 
        };
        
        yield { 
            type: 'delay', 
            duration: 900, 
            narrative: `Goal: Maximize value without exceeding capacity` 
        };

        yield { 
            type: 'delay', 
            duration: 700, 
            narrative: `Base Case: 0 items = 0 value (first row)` 
        };
        yield { type: 'highlight_code', line: 4 };

        yield { 
            type: 'delay', 
            duration: 900, 
            narrative: `Building DP table: For each item, try all capacities...` 
        };
        yield { type: 'highlight_code', line: 6 };

        for (let i = 1; i <= n; i++) {
            const itemWeight = weights[i - 1];
            const itemValue = values[i - 1];

            yield { 
                type: 'activate_orb', 
                id: `item-${i-1}`, 
                state: 'active',
                narrative: `Processing Item ${i}: Weight=${itemWeight}, Value=${itemValue}` 
            };
            yield { type: 'delay', duration: 600 };

            for (let w = 0; w <= capacity; w++) {
                // Highlight current cell
                yield { 
                    type: 'activate_pillar', 
                    id: `cell-${i}-${w}`, 
                    state: 'active'
                };

                // Option 1: Skip this item
                const skipValue = dp[i - 1][w];
                yield { 
                    type: 'activate_pillar', 
                    id: `cell-${i-1}-${w}`, 
                    state: 'compare',
                    narrative: `Capacity ${w}: Option 1 - Skip item ${i} (keep ${skipValue})` 
                };
                yield { type: 'highlight_code', line: 9 };
                yield { type: 'delay', duration: 200 };

                dp[i][w] = skipValue;
                let tookItem = false;

                // Option 2: Take this item (if it fits)
                if (itemWeight <= w) {
                    const remainingCapacity = w - itemWeight;
                    const takeValue = itemValue + dp[i - 1][remainingCapacity];

                    yield { 
                        type: 'activate_pillar', 
                        id: `cell-${i-1}-${remainingCapacity}`, 
                        state: 'compare',
                        narrative: `Option 2 - Take item ${i}: ${itemValue} + dp[${i-1}][${remainingCapacity}] = ${takeValue}` 
                    };
                    yield { type: 'highlight_code', line: 12 };
                    yield { type: 'delay', duration: 300 };

                    if (takeValue > skipValue) {
                        dp[i][w] = takeValue;
                        tookItem = true;
                        yield { 
                            type: 'delay', 
                            duration: 100, 
                            narrative: `Taking item ${i} is better! (${takeValue} > ${skipValue})` 
                        };
                    } else {
                        yield { 
                            type: 'delay', 
                            duration: 100, 
                            narrative: `Skipping is better (${skipValue} ≥ ${takeValue})` 
                        };
                    }

                    yield { type: 'activate_pillar', id: `cell-${i-1}-${remainingCapacity}`, state: 'default' };
                } else {
                    yield { 
                        type: 'delay', 
                        duration: 150, 
                        narrative: `Item ${i} too heavy for capacity ${w}` 
                    };
                }

                // Update height
                yield { 
                    type: 'update_height', 
                    id: `cell-${i}-${w}`, 
                    height: 0.1 + (dp[i][w] * 0.3)
                };

                yield { 
                    type: 'activate_pillar', 
                    id: `cell-${i}-${w}`, 
                    state: tookItem ? 'sorted' : 'visited'
                };

                yield { type: 'activate_pillar', id: `cell-${i-1}-${w}`, state: 'default' };
                yield { type: 'delay', duration: 80 };
            }

            yield { type: 'activate_orb', id: `item-${i-1}`, state: 'default' };
        }

        yield { type: 'delay', duration: 700 };
        
        const maxValue = dp[n][capacity];

        yield { 
            type: 'activate_pillar', 
            id: `cell-${n}-${capacity}`, 
            state: 'active',
            narrative: `Maximum Value: ${maxValue}` 
        };
        yield { type: 'highlight_code', line: 16 };
        yield { type: 'delay', duration: 1000 };

        yield { 
            type: 'delay', 
            duration: 600, 
            narrative: `Backtracking to find selected items...` 
        };

        // Backtracking
        let i = n, w = capacity;
        const selectedItems = [];

        while (i > 0 && w > 0) {
            yield { 
                type: 'activate_pillar', 
                id: `cell-${i}-${w}`, 
                state: 'active'
            };
            yield { type: 'delay', duration: 300 };

            // Check if item was taken
            if (dp[i][w] !== dp[i - 1][w]) {
                selectedItems.unshift(i - 1);
                
                yield { 
                    type: 'activate_orb', 
                    id: `item-${i-1}`, 
                    state: 'sorted',
                    narrative: `Item ${i} was selected! (W=${weights[i-1]}, V=${values[i-1]})` 
                };
                yield { type: 'delay', duration: 500 };
                
                w -= weights[i - 1];
            }
            i--;
        }

        const totalWeight = selectedItems.reduce((sum, idx) => sum + weights[idx], 0);
        
        yield { 
            type: 'complete', 
            narrative: `Selected Items: [${selectedItems.map(idx => idx + 1).join(', ')}] | Total Weight: ${totalWeight}/${capacity} | Total Value: ${maxValue}` 
        };
    }
}
