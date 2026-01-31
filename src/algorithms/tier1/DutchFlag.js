import { AlgorithmBase } from '../AlgorithmBase';

export class DutchFlag extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Dutch National Flag";
        this.tier = 1;
        this.category = "Arrays";
        this.description = "Sorts an array of 0s, 1s, and 2s in one pass (O(n)) using three pointers.";
        
        this.details = {
            complexity: {
                time: "O(n)",
                space: "O(1)"
            },
            useCases: [
                "Sorting colors (Red, White, Blue) in graphics",
                "Partitioning elements around a pivot (used in Quick Sort 3-way partition)",
                "Segregating low, medium, and high priority tasks"
            ],
            keyConcept: "Three-Way Partitioning: Maintain three regions (Less than, Equal to, Greater than) and shrink the 'Unknown' region."
        };
        
        this.code = {
            python: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`,
            javascript: `function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++; mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}`,
            cpp: `void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high]);
            high--;
        }
    }
}`,
            go: `func sortColors(nums []int) {
    low, mid, high := 0, 0, len(nums)-1
    for mid <= high {
        if nums[mid] == 0 {
            nums[low], nums[mid] = nums[mid], nums[low]
            low++; mid++
        } else if nums[mid] == 1 {
            mid++
        } else {
            nums[mid], nums[high] = nums[high], nums[mid]
            high--
        }
    }
}`,
            rust: `fn sort_colors(nums: &mut [i32]) {
    let (mut low, mut mid, mut high) = (0, 0, nums.len() - 1);
    while mid <= high {
        if nums[mid] == 0 {
            nums.swap(low, mid);
            low += 1;
            mid += 1;
        } else if nums[mid] == 1 {
            mid += 1;
        } else {
            nums.swap(mid, high);
            if high == 0 { break; } // safety check for usize
            high -= 1;
        }
    }
}`
        };
    }

    initialize() {
        // Generate random 0s, 1s, and 2s
        const values = Array.from({ length: 15 }, () => Math.floor(Math.random() * 3));
        return { type: 'array', values };
    }

    mapToVisual(data) {
        return data.values.map((value, index) => ({
            id: `pillar-${index}`,
            type: 'pillar',
            value: value,
            position: [(index - 7) * 1.2, 0, 0], 
            state: 'default',
            // Visually distinguish the 3 types by height
            height: value === 0 ? 1 : value === 1 ? 2.5 : 4 
        }));
    }

    *execute(data) {
        const arr = [...data.values];
        let low = 0;
        let mid = 0;
        let high = arr.length - 1;

        yield { type: 'delay', duration: 500, narrative: "Goal: Move 0s Left, 1s Middle, 2s Right" };

        while (mid <= high) {
            // Highlight Pointers
            // Low = Cyan (Left boundary of 1s)
            // Mid = Gold (Current element)
            // High = Orange (Left boundary of 2s)
            
            yield { 
                type: 'activate_pillar', 
                id: mid, 
                state: 'active', 
                narrative: `Inspecting Index ${mid}: Value is ${arr[mid]}` 
            };
            
            if (arr[mid] === 0) {
                yield { type: 'highlight_code', line: 4 };
                yield { 
                    type: 'compare', 
                    targets: [low, mid], 
                    narrative: `Found 0 (Small) → Swap to Low Position ${low}` 
                };
                
                yield { type: 'swap', targets: [low, mid] };
                [arr[low], arr[mid]] = [arr[mid], arr[low]];
                
                // Mark the placed 0 as sorted/left-side
                yield { type: 'activate_pillar', id: low, state: 'left' }; 
                
                low++;
                mid++;
                yield { type: 'highlight_code', line: 6 };

            } else if (arr[mid] === 1) {
                yield { type: 'highlight_code', line: 8 };
                yield { 
                    type: 'activate_pillar', 
                    id: mid, 
                    state: 'default', // Leave it alone, it's in the middle
                    narrative: `Found 1 (Medium) → Leave in Middle, Advance Mid` 
                };
                mid++;
                yield { type: 'highlight_code', line: 9 };

            } else { // arr[mid] === 2
                yield { type: 'highlight_code', line: 11 };
                yield { 
                    type: 'compare', 
                    targets: [mid, high], 
                    narrative: `Found 2 (Large) → Swap to High Position ${high}` 
                };
                
                yield { type: 'swap', targets: [mid, high] };
                [arr[mid], arr[high]] = [arr[high], arr[mid]];
                
                // Mark the placed 2 as sorted/right-side
                yield { type: 'activate_pillar', id: high, state: 'right' };
                
                high--;
                yield { type: 'highlight_code', line: 13 };
            }
            
            yield { type: 'delay', duration: 400 };
        }
        
        yield { type: 'complete', narrative: "Sorting Complete: 0s | 1s | 2s" };
        for (let k = 0; k < arr.length; k++) yield { type: 'celebrate', targets: [k] };
    }
}
