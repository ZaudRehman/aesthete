import { AlgorithmBase } from '../AlgorithmBase';

export class TwoPointers extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Two Sum (Sorted)";
        this.tier = 1;
        this.category = "Arrays";
        this.description = "Finds two numbers in a sorted array that add up to a target.";
        
        this.details = {
            complexity: {
                time: "O(n)",
                space: "O(1)"
            },
            useCases: [
                "Finding pairs with a specific sum in sorted data",
                "Checking for palindromes",
                "Container With Most Water problem"
            ],
            keyConcept: "Squeezing: Since the array is sorted, we can shrink the search space from both ends based on whether the current sum is too small or too large."
        };
        
        this.code = {
            python: `def two_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
            javascript: `function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return [];
}`,
            cpp: `vector<int> twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return {left, right};
        if (sum < target) left++;
        else right--;
    }
    return {};
}`,
            go: `func twoSum(arr []int, target int) []int {
    left, right := 0, len(arr)-1
    for left < right {
        sum := arr[left] + arr[right]
        if sum == target {
            return []int{left, right}
        }
        if sum < target {
            left++
        } else {
            right--
        }
    }
    return nil
}`,
rust: `fn two_sum(arr: &[i32], target: i32) -> Option<(usize, usize)> {
    let mut left = 0;
    let mut right = arr.len() - 1;
    while left < right {
        let sum = arr[left] + arr[right];
        if sum == target {
            return Some((left, right));
        }
        if sum < target {
            left += 1;
        } else {
            right -= 1;
        }
    }
    None
}`
        };
    }

    initialize() {
        const values = [1, 2, 3, 5, 7, 10, 13, 17, 20, 24, 28, 32, 36, 40, 45];
        const idx1 = Math.floor(Math.random() * 5);
        const idx2 = 10 + Math.floor(Math.random() * 5);
        const target = values[idx1] + values[idx2];
        
        return { type: 'array', values, target };
    }

    mapToVisual(data) {
        return data.values.map((value, index) => ({
            id: `sphere-${index}`,
            type: 'sphere',
            value: value,
            position: [(index - 7) * 1.5, 0, 0],
            state: 'default',
        }));
    }

    *execute(data) {
        const arr = data.values;
        const target = data.target;
        let left = 0;
        let right = arr.length - 1;

        yield { 
            type: 'delay', 
            duration: 500, 
            narrative: `Target Sum: ${target}` 
        };

        while (left < right) {
            const sum = arr[left] + arr[right];

            yield { type: 'activate_sphere', id: left, state: 'left', narrative: `Left: ${arr[left]}` };
            yield { type: 'activate_sphere', id: right, state: 'right', narrative: `Right: ${arr[right]}` };
            
            yield { 
                type: 'compare', 
                targets: [left, right], 
                narrative: `${arr[left]} + ${arr[right]} = ${sum}` 
            };
            yield { type: 'highlight_code', line: 3 };

            if (sum === target) {
                yield { type: 'activate_sphere', id: left, state: 'sorted', narrative: `Found Pair!` };
                yield { type: 'activate_sphere', id: right, state: 'sorted' };
                yield { type: 'highlight_code', line: 5 };
                yield { type: 'complete', narrative: "Solution Found" };
                yield { type: 'celebrate', targets: [left, right] };
                return;
            }

            if (sum < target) {
                yield { type: 'activate_sphere', id: left, state: 'visited', narrative: `${sum} < ${target} → Move Left` };
                yield { type: 'highlight_code', line: 7 };
                left++;
            } else {
                yield { type: 'activate_sphere', id: right, state: 'visited', narrative: `${sum} > ${target} → Move Right` };
                yield { type: 'highlight_code', line: 9 };
                right--;
            }
            
            yield { type: 'delay', duration: 400 };
        }
        
        yield { type: 'complete', narrative: "No Pair Found" };
    }
}
