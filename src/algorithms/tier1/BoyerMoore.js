import { AlgorithmBase } from '../AlgorithmBase';

export class BoyerMoore extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Boyer-Moore Voting";
        this.tier = 1;
        this.category = "Arrays";
        this.description = "Finds the majority element (> n/2) in O(n) time and O(1) space.";
        
        this.details = {
            complexity: {
                time: "O(n)",
                space: "O(1)"
            },
            useCases: [
                "Finding consensus in distributed systems (Leader Election)",
                "Stream processing (finding heavy hitters in one pass)",
                "Data cleaning (identifying dominant signals vs noise)"
            ],
            keyConcept: "Pairwise Cancellation: Non-majority elements 'cancel out' the majority. If a majority exists, it will survive the battle."
        };
        
        this.code = {
            python: `def majority_element(nums):
    candidate = None
    count = 0
    
    for num in nums:
        if count == 0:
            candidate = num
        count += (1 if num == candidate else -1)
        
    return candidate`,
            javascript: `function majorityElement(nums) {
    let candidate = null;
    let count = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    return candidate;
}`,
            cpp: `int majorityElement(vector<int>& nums) {
    int candidate = 0;
    int count = 0;
    
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`,
            go: `func majorityElement(nums []int) int {
    candidate := 0
    count := 0
    
    for _, num := range nums {
        if count == 0 {
            candidate = num
        }
        if num == candidate {
            count++
        } else {
            count--
        }
    }
    return candidate
}`,
            rust: `fn majority_element(nums: &[i32]) -> i32 {
    let mut candidate = 0;
    let mut count = 0;
    
    for &num in nums {
        if count == 0 {
            candidate = num;
        }
        if num == candidate {
            count += 1;
        } else {
            count -= 1;
        }
    }
    candidate
}`
        };
    }

    initialize() {
        // We need a clear majority. Let's use 1s as the majority (Red) and others as noise.
        // Array length 15. We need at least 8 of the same number.
        const majorityVal = 1;
        const noiseVals = [2, 3, 4];
        
        const values = Array.from({ length: 15 }, (_, i) => {
            // Force random distribution but ensure >50% are majorityVal
            if (i % 2 === 0 || Math.random() > 0.6) return majorityVal;
            return noiseVals[Math.floor(Math.random() * noiseVals.length)];
        });
        
        return { type: 'array', values };
    }

    mapToVisual(data) {
        return data.values.map((value, index) => ({
            id: `pillar-${index}`,
            type: 'pillar',
            value: value,
            position: [(index - 7) * 1.2, 0, 0], 
            state: 'default',
            height: value * 1.5 // Height distinguishes the "factions"
        }));
    }

    *execute(data) {
        const nums = data.values;
        let candidate = null;
        let count = 0;

        yield { type: 'delay', duration: 500, narrative: "Goal: Find the element appearing > 50% of the time." };

        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];

            // Highlight current inspection
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'active', 
                narrative: `Inspecting ${num} | Current Candidate: ${candidate ?? 'None'} (Votes: ${count})` 
            };

            if (count === 0) {
                yield { type: 'highlight_code', line: 5 };
                candidate = num;
                count = 1;
                
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'sorted', // Green/Gold for "New King"
                    narrative: `Count is 0. New Candidate Declared: ${candidate}` 
                };
            } else if (num === candidate) {
                yield { type: 'highlight_code', line: 7 };
                count++;
                
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'left', // Cyan for "Support"
                    narrative: `Same as Candidate. Vote UP. (Count: ${count})` 
                };
            } else {
                yield { type: 'highlight_code', line: 7 }; // The else/-1 part
                count--;
                
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'right', // Orange for "Attack"
                    narrative: `Different from Candidate. Vote DOWN. (Count: ${count})` 
                };
            }
            
            yield { type: 'delay', duration: 400 };
            
            // Dim the pillar to show it's processed
            if (i < nums.length - 1) {
                 yield { type: 'activate_pillar', id: i, state: 'visited' };
            }
        }
        
        yield { type: 'complete', narrative: `Majority Element is ${candidate}` };
        
        // Final celebration: Highlight all instances of the winner
        for (let k = 0; k < nums.length; k++) {
            if (nums[k] === candidate) {
                yield { type: 'activate_pillar', id: k, state: 'sorted' };
            }
        }
    }
}
