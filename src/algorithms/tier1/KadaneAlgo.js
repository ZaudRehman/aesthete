import { AlgorithmBase } from '../AlgorithmBase';

export class KadaneAlgo extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Kadane's Algorithm";
        this.tier = 1;
        this.category = "Arrays";
        this.description = "Finds the contiguous subarray with the largest sum in O(n) time.";
        
        this.details = {
            complexity: {
                time: "O(n)",
                space: "O(1)"
            },
            useCases: [
                "Stock market analysis (best time to buy and sell)",
                "Computer Vision (Maximum brightness area detection)",
                "Genomic sequence analysis (finding high-scoring segments)"
            ],
            keyConcept: "Dynamic Decisions: At each step, decide whether to extend the existing subarray or discard it and start a new one based on whether the previous sum is positive or negative."
        };
        
        this.code = {
            python: `def max_sub_array(nums):
    max_so_far = nums[0]
    current_max = nums[0]
    
    for i in range(1, len(nums)):
        current_max = max(nums[i], current_max + nums[i])
        max_so_far = max(max_so_far, current_max)
        
    return max_so_far`,
            javascript: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    
    return maxSoFar;
}`,
            cpp: `int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0];
    int currentMax = nums[0];
    
    for (size_t i = 1; i < nums.size(); i++) {
        currentMax = max(nums[i], currentMax + nums[i]);
        maxSoFar = max(maxSoFar, currentMax);
    }
    return maxSoFar;
}`,
            go: `func maxSubArray(nums []int) int {
    maxSoFar := nums[0]
    currentMax := nums[0]
    
    for i := 1; i < len(nums); i++ {
        if currentMax + nums[i] > nums[i] {
            currentMax += nums[i]
        } else {
            currentMax = nums[i]
        }
        if currentMax > maxSoFar {
            maxSoFar = currentMax
        }
    }
    return maxSoFar
}`,
            rust: `fn max_sub_array(nums: &[i32]) -> i32 {
    let mut max_so_far = nums[0];
    let mut current_max = nums[0];
    
    for &x in nums.iter().skip(1) {
        current_max = x.max(current_max + x);
        max_so_far = max_so_far.max(current_max);
    }
    max_so_far
}`
        };
    }

    initialize() {
        // Mix of positive and negative numbers is crucial for Kadane's
        const values = [ -2, 1, -3, 4, -1, 2, 1, -5, 4 ];
        return { type: 'array', values };
    }

    mapToVisual(data) {
        return data.values.map((value, index) => ({
            id: `pillar-${index}`,
            type: 'pillar',
            value: value,
            // Spaced out, centered. 
            // NOTE: Pillars with negative height need to be handled by the Pillar component 
            // or we shift the baseline. For simplicity, we just pass the raw value.
            position: [(index - 4) * 1.5, 0, 0], 
            state: 'default',
            height: Math.abs(value) // Visual height is always positive
        }));
    }

        *execute(data) {
        const nums = data.values;
        let maxSoFar = nums[0];
        let currentMax = nums[0];
        let start = 0, end = 0, s = 0;

        // Visual State: Keep track of original heights to restore them later if needed
        // For now, we just modify them live.

        yield { type: 'activate_pillar', id: 0, state: 'active', narrative: `Start: Current Sum is ${nums[0]}` };
        yield { type: 'highlight_code', line: 2 };

        for (let i = 1; i < nums.length; i++) {
            const x = nums[i];
            
            yield { type: 'activate_pillar', id: i, state: 'active', narrative: `Inspecting ${x}` };
            
            // DECISION: Start Fresh or Join?
            if (currentMax + x < x) {
                // Case 1: Start Fresh (The past was negative/burden)
                currentMax = x;
                s = i;
                yield { type: 'highlight_code', line: 5 };
                
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'left', 
                    narrative: `Past is negative (${currentMax-x}). Starting fresh at ${x}.` 
                };
            } else {
                // Case 2: Join (The past was positive/helpful)
                currentMax += x;
                yield { type: 'highlight_code', line: 5 };
                
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'right', 
                    narrative: `Past is positive. Extending sum to ${currentMax}.` 
                };

                // VISUAL TRICK: Grow this pillar to show the accumulated strength!
                // We use 'overwrite' to change its height to the Current Max Sum
                yield { 
                    type: 'overwrite', 
                    index: i, 
                    value: currentMax, 
                    narrative: `Visualizing Accumulated Sum: ${currentMax}` 
                };
            }

            // Check Global Max
            if (currentMax > maxSoFar) {
                maxSoFar = currentMax;
                start = s;
                end = i;
                yield { type: 'highlight_code', line: 6 };
                yield { type: 'celebrate', targets: [i], narrative: `New Global Max Found: ${maxSoFar}!` };
            }
            
            yield { type: 'delay', duration: 500 };
            
            // Clean up previous pillars (dim them)
            if (i > 0) {
                 yield { type: 'activate_pillar', id: i-1, state: 'visited' };
            }
        }
        
        yield { type: 'complete', narrative: `Max Contiguous Sum: ${maxSoFar}` };
        
        // Final Reveal: Highlight the winning range
        for (let k = start; k <= end; k++) {
            // Restore original values? Or just highlight the path?
            // Let's highlight the path in Green
            yield { type: 'activate_pillar', id: k, state: 'sorted' };
        }
    }
}
