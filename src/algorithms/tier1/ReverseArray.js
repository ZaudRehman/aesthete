import { AlgorithmBase } from '../AlgorithmBase';

export class ReverseArray extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Reverse Array";
        this.tier = 1;
        this.category = "Arrays";
        this.description = "Reverses the elements of an array in-place using two pointers.";
        
        this.details = {
            complexity: {
                time: "O(n)",
                space: "O(1)"
            },
            useCases: [
                "Checking for palindromes",
                "Reversing strings for display or processing",
                "Implementation step in rotating arrays (Reverse method)"
            ],
            keyConcept: "Two Pointers: Swap elements at start and end pointers, then move pointers inward until they meet."
        };
        
        this.code = {
            python: `def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
            javascript: `function reverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}`,
            cpp: `void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}`,
            go: `func reverseArray(arr []int) {
    left, right := 0, len(arr)-1
    for left < right {
        arr[left], arr[right] = arr[right], arr[left]
        left++
        right--
    }
}`,
            rust: `fn reverse_array(arr: &mut [i32]) {
    let mut left = 0;
    let mut right = arr.len() - 1;
    while left < right {
        arr.swap(left, right);
        left += 1;
        right -= 1;
    }
}`
        };
    }

    initialize() {
        // Simple 1-10 array to make the reversal obvious
        const values = Array.from({ length: 11 }, (_, i) => i + 1); // [1, 2, ... 11]
        return { type: 'array', values };
    }

    mapToVisual(data) {
        return data.values.map((value, index) => ({
            id: `sphere-${index}`,
            type: 'sphere',
            value: value,
            // Centered layout, raised to y=3 to match your camera fix
            position: [(index - 5) * 1.5, 3, 0], 
            state: 'default',
        }));
    }

    *execute(data) {
        const arr = [...data.values];
        let left = 0;
        let right = arr.length - 1;

        yield { 
            type: 'delay', 
            duration: 500, 
            narrative: `Initial Array` 
        };

        while (left < right) {
            // 1. Highlight Pointers
            yield { type: 'activate_sphere', id: left, state: 'left', narrative: `Left Pointer: Index ${left}` };
            yield { type: 'activate_sphere', id: right, state: 'right', narrative: `Right Pointer: Index ${right}` };
            yield { type: 'highlight_code', line: 3 }; // while left < right

            // 2. Swap Action
            yield { 
                type: 'swap', 
                targets: [left, right], 
                narrative: `Swap ${arr[left]} and ${arr[right]}` 
            };
            
            // Perform actual data swap
            [arr[left], arr[right]] = [arr[right], arr[left]];
            
            yield { type: 'highlight_code', line: 4 };

            // 3. Mark as "Sorted/Processed" temporarily or just visited
            // For visual clarity, we turn them green to show they are done
            yield { type: 'activate_sphere', id: left, state: 'sorted' };
            yield { type: 'activate_sphere', id: right, state: 'sorted' };

            // 4. Move Pointers
            left++;
            right--;
            yield { type: 'highlight_code', line: 5 }; // left++, right--
            yield { type: 'delay', duration: 300 };
        }
        
        // Final celebration of the middle element if odd length
        if (left === right) {
             yield { type: 'activate_sphere', id: left, state: 'sorted', narrative: "Middle element reached" };
        }

        yield { type: 'complete', narrative: "Array Reversal Complete" };
    }
}
