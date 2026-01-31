import { AlgorithmBase } from '../AlgorithmBase';

export class LongestIncreasingSubsequence extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Longest Increasing Subsequence";
        this.tier = 2;
        this.category = "Dynamic Programming";
        this.description = "Find the longest subsequence in an array where elements are in strictly increasing order. Not required to be contiguous. Classic DP problem demonstrating optimal substructure.";

        this.details = {
            complexity: {
                time: "O(N²) for DP approach, O(N log N) with Binary Search",
                space: "O(N) for DP array"
            },
            useCases: [
                "Patience sorting (card game strategy)",
                "Version control (finding longest chain of commits)",
                "Bioinformatics (DNA sequence alignment)",
                "Stock market analysis (longest upward trend)"
            ],
            keyConcept: "DP State: dp[i] = length of LIS ending at index i. For each element, look back at all smaller elements and extend their LIS by 1. Formula: dp[i] = max(dp[j] + 1) where j < i and arr[j] < arr[i]"
        };
        
        this.code = {
            python: `def length_of_LIS(nums):
    if not nums:
        return 0
    
    n = len(nums)
    # dp[i] = length of LIS ending at index i
    dp = [1] * n  # Every element is an LIS of length 1
    
    for i in range(1, n):
        for j in range(i):
            # If nums[j] < nums[i], we can extend dp[j]
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)  # Return the maximum LIS length`,

            javascript: `function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const n = nums.length;
    // dp[i] = length of LIS ending at index i
    const dp = Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // If nums[j] < nums[i], extend the subsequence
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}`,

            cpp: `int lengthOfLIS(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    
    vector<int> dp(n, 1);
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return *max_element(dp.begin(), dp.end());
}`,

            rust: `fn length_of_lis(nums: Vec<i32>) -> i32 {
    let n = nums.len();
    if n == 0 { return 0; }
    
    let mut dp = vec![1; n];
    
    for i in 1..n {
        for j in 0..i {
            if nums[j] < nums[i] {
                dp[i] = dp[i].max(dp[j] + 1);
            }
        }
    }
    
    *dp.iter().max().unwrap()
}`,

            go: `func lengthOfLIS(nums []int) int {
    n := len(nums)
    if n == 0 { return 0 }
    
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }
    
    maxLen := 1
    for i := 1; i < n; i++ {
        for j := 0; j < i; j++ {
            if nums[j] < nums[i] {
                dp[i] = max(dp[i], dp[j] + 1)
            }
        }
        if dp[i] > maxLen {
            maxLen = dp[i]
        }
    }
    
    return maxLen
}

func max(a, b int) int {
    if a > b { return a }
    return b
}`
        };
    }

    initialize() {
        const nums = [10, 9, 2, 5, 3, 7, 101, 18];
        return { nums };
    }

    mapToVisual(data) {
        const { nums } = data;
        
        return nums.map((val, idx) => ({
            id: idx,
            type: 'pillar',
            height: val / 10, // Scale down for better visualization
            position: [idx * 1.5 - (nums.length * 0.75), 0, 0],
            state: 'default',
            value: val,
            label: `${val}`
        }));
    }

    *execute(data) {
        const { nums } = data;
        const n = nums.length;
        
        if (n === 0) {
            yield { type: 'complete', narrative: 'Empty array!' };
            return;
        }

        const dp = Array(n).fill(1);

        yield { 
            type: 'delay', 
            duration: 1000, 
            narrative: `Longest Increasing Subsequence: Array [${nums.join(', ')}]` 
        };
        
        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: `Goal: Find longest subsequence where each element is greater than the previous` 
        };

        yield { 
            type: 'delay', 
            duration: 700, 
            narrative: `Base Case: Every element is an LIS of length 1 (itself)` 
        };
        yield { type: 'highlight_code', line: 7 };
        
        for (let i = 0; i < n; i++) {
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'sorted',
                narrative: `dp[${i}] = 1 (element ${nums[i]} alone)` 
            };
            yield { type: 'delay', duration: 200 };
            yield { type: 'activate_pillar', id: i, state: 'default' };
        }

        yield { 
            type: 'delay', 
            duration: 900, 
            narrative: `Building LIS by checking all previous elements...` 
        };
        yield { type: 'highlight_code', line: 9 };

        for (let i = 1; i < n; i++) {
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'active',
                narrative: `Processing element ${nums[i]} at index ${i}...` 
            };
            yield { type: 'delay', duration: 400 };

            let foundExtension = false;

            // Look back at all previous elements
            for (let j = 0; j < i; j++) {
                yield { 
                    type: 'activate_pillar', 
                    id: j, 
                    state: 'compare',
                    narrative: `Checking: Can we extend from ${nums[j]} to ${nums[i]}?` 
                };
                yield { type: 'highlight_code', line: 11 };
                yield { type: 'delay', duration: 300 };

                if (nums[j] < nums[i]) {
                    const newLength = dp[j] + 1;
                    
                    yield { 
                        type: 'delay', 
                        duration: 200, 
                        narrative: `Yes! ${nums[j]} < ${nums[i]}. Potential LIS length: ${newLength}` 
                    };
                    yield { type: 'highlight_code', line: 12 };

                    if (newLength > dp[i]) {
                        dp[i] = newLength;
                        foundExtension = true;
                        
                        yield { 
                            type: 'overwrite', 
                            index: i, 
                            value: dp[i],
                            narrative: `Updated dp[${i}] = ${dp[i]}` 
                        };
                        yield { type: 'delay', duration: 400 };
                    }
                } else {
                    yield { 
                        type: 'delay', 
                        duration: 150, 
                        narrative: `No. ${nums[j]} ≥ ${nums[i]}, cannot extend` 
                    };
                }

                yield { type: 'activate_pillar', id: j, state: 'default' };
            }

            // Mark as completed
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'sorted',
                narrative: `Finished index ${i}: LIS ending here has length ${dp[i]}` 
            };
            yield { type: 'delay', duration: 300 };
        }

        yield { type: 'delay', duration: 600 };
        yield { type: 'highlight_code', line: 15 };
        
        const maxLIS = Math.max(...dp);
        const maxIndex = dp.indexOf(maxLIS);

        yield { 
            type: 'activate_pillar', 
            id: maxIndex, 
            state: 'active',
            narrative: `Maximum LIS length found: ${maxLIS} (ending at index ${maxIndex})` 
        };
        yield { type: 'delay', duration: 800 };

        yield { 
            type: 'complete', 
            narrative: `Longest Increasing Subsequence length: ${maxLIS}` 
        };

        // Victory animation
        for (let k = 0; k < n; k++) {
            if (dp[k] === maxLIS) {
                yield { type: 'celebrate', targets: [k] };
            }
        }
    }
}
