import { AlgorithmBase } from '../AlgorithmBase';

export class HouseRobber extends AlgorithmBase {
    constructor() {
        super();
        this.name = "House Robber";
        this.tier = 2;
        this.category = "Dynamic Programming";
        this.description = "You are a robber planning to rob houses along a street. Each house has money, but you cannot rob two adjacent houses (alarm will trigger). Find the maximum amount you can rob.";

        this.details = {
            complexity: {
                time: "O(N) where N = number of houses",
                space: "O(N) for DP array (can be optimized to O(1))"
            },
            useCases: [
                "Resource allocation with conflict constraints",
                "Understanding DP state transitions (take vs skip)",
                "Job scheduling with gaps",
                "Classic Interview Problem (Amazon, Microsoft, Bloomberg)"
            ],
            keyConcept: "Decision DP: At each house, choose max of (rob this + dp[i-2]) OR (skip this + dp[i-1]). Formula: dp[i] = max(nums[i] + dp[i-2], dp[i-1])"
        };
        
        this.code = {
            python: `def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    # dp[i] = max money robbing up to house i
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        # Either rob this house + skip previous
        # Or skip this house + take previous max
        dp[i] = max(nums[i] + dp[i-2], dp[i-1])
    
    return dp[-1]`,

            javascript: `function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    // dp[i] = max money up to house i
    const dp = Array(nums.length).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        // Rob this house + dp[i-2] OR skip + dp[i-1]
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
    }
    
    return dp[dp.length - 1];
}`,

            cpp: `int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    vector<int> dp(n);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);
    
    for (int i = 2; i < n; i++) {
        dp[i] = max(nums[i] + dp[i - 2], dp[i - 1]);
    }
    
    return dp[n - 1];
}`,

            rust: `fn rob(nums: Vec<i32>) -> i32 {
    let n = nums.len();
    if n == 0 { return 0; }
    if n == 1 { return nums[0]; }
    
    let mut dp = vec![0; n];
    dp[0] = nums[0];
    dp[1] = nums[0].max(nums[1]);
    
    for i in 2..n {
        dp[i] = (nums[i] + dp[i - 2]).max(dp[i - 1]);
    }
    
    dp[n - 1]
}`,

            go: `func rob(nums []int) int {
    n := len(nums)
    if n == 0 { return 0 }
    if n == 1 { return nums[0] }
    
    dp := make([]int, n)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i := 2; i < n; i++ {
        dp[i] = max(nums[i] + dp[i-2], dp[i-1])
    }
    
    return dp[n-1]
}

func max(a, b int) int {
    if a > b { return a }
    return b
}`
        };
    }

    initialize() {
        const houses = [2, 7, 9, 3, 1, 8, 5];
        return { houses };
    }

    mapToVisual(data) {
        const { houses } = data;
        
        // Represent houses as pillars
        return houses.map((money, idx) => ({
            id: idx,
            type: 'pillar',
            height: money,
            position: [idx * 2 - (houses.length - 1), 0, 0],
            state: 'default',
            value: money,
            label: `$${money}`
        }));
    }

    *execute(data) {
        const { houses } = data;
        const n = houses.length;
        
        if (n === 0) {
            yield { type: 'complete', narrative: 'No houses to rob!' };
            return;
        }

        const dp = Array(n).fill(0);

        yield { 
            type: 'delay', 
            duration: 1000, 
            narrative: `House Robber Problem: ${n} houses with money [${houses.map(h => '$' + h).join(', ')}]` 
        };
        
        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: `Rule: Cannot rob two adjacent houses (alarms will trigger!)` 
        };

        yield { 
            type: 'delay', 
            duration: 700, 
            narrative: `Base Case: Rob house 0 (${houses[0]} dollars)` 
        };
        yield { type: 'highlight_code', line: 8 };
        
        dp[0] = houses[0];
        yield { 
            type: 'activate_pillar', 
            id: 0, 
            state: 'sorted',
            narrative: `dp[0] = $${dp[0]} (robbed!)` 
        };
        yield { type: 'delay', duration: 500 };

        if (n > 1) {
            yield { 
                type: 'delay', 
                duration: 600, 
                narrative: `House 1: Choose max of robbing house 0 ($${houses[0]}) OR house 1 ($${houses[1]})` 
            };
            yield { type: 'highlight_code', line: 9 };
            
            dp[1] = Math.max(houses[0], houses[1]);
            
            if (dp[1] === houses[1]) {
                yield { 
                    type: 'activate_pillar', 
                    id: 1, 
                    state: 'sorted',
                    narrative: `dp[1] = $${dp[1]} (rob house 1, skip house 0)` 
                };
                yield { type: 'activate_pillar', id: 0, state: 'visited' };
            } else {
                yield { 
                    type: 'activate_pillar', 
                    id: 1, 
                    state: 'visited',
                    narrative: `dp[1] = $${dp[1]} (keep house 0, skip house 1)` 
                };
            }
            yield { type: 'delay', duration: 500 };
        }

        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: `Building DP solution for remaining houses...` 
        };
        yield { type: 'highlight_code', line: 11 };

        for (let i = 2; i < n; i++) {
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'active',
                narrative: `House ${i}: Deciding whether to rob ($${houses[i]})...` 
            };
            yield { type: 'delay', duration: 400 };

            // Option 1: Rob this house
            const robCurrent = houses[i] + dp[i - 2];
            yield { 
                type: 'activate_pillar', 
                id: i - 2, 
                state: 'compare',
                narrative: `Option 1: Rob house ${i} ($${houses[i]}) + dp[${i-2}] ($${dp[i-2]}) = $${robCurrent}` 
            };
            yield { type: 'delay', duration: 500 };
            yield { type: 'activate_pillar', id: i - 2, state: 'sorted' };

            // Option 2: Skip this house
            const skipCurrent = dp[i - 1];
            yield { 
                type: 'activate_pillar', 
                id: i - 1, 
                state: 'compare',
                narrative: `Option 2: Skip house ${i}, keep dp[${i-1}] = $${skipCurrent}` 
            };
            yield { type: 'delay', duration: 500 };
            yield { type: 'activate_pillar', id: i - 1, state: 'sorted' };

            // Make decision
            dp[i] = Math.max(robCurrent, skipCurrent);
            yield { type: 'highlight_code', line: 14 };

            if (dp[i] === robCurrent) {
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'sorted',
                    narrative: `Rob house ${i}! dp[${i}] = $${dp[i]}` 
                };
            } else {
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'visited',
                    narrative: `Skip house ${i}. dp[${i}] = $${dp[i]}` 
                };
            }
            yield { type: 'delay', duration: 400 };
        }

        yield { type: 'delay', duration: 600 };
        
        yield { 
            type: 'complete', 
            narrative: `Maximum robbery: $${dp[n - 1]}` 
        };

        // Victory animation
        for (let k = 0; k < n; k++) {
            yield { type: 'celebrate', targets: [k] };
        }
    }
}