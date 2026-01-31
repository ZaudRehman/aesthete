import { AlgorithmBase } from '../AlgorithmBase';

export class BinarySearch extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Binary Search";
        this.tier = 1;
        this.category = "Search";
        this.description = "Efficiently finds an item from a sorted list by repeatedly dividing the search interval in half.";
        
        this.details = {
            complexity: {
                time: "O(log n)",
                space: "O(1)"
            },
            useCases: [
                "Searching in large, sorted datasets (e.g., databases)",
                "Finding range boundaries in sorted arrays",
                "Debugging optimization problems (Binary Search on Answer)"
            ],
            keyConcept: "Divide and Conquer: Discarding half the search space at every step guarantees logarithmic speed."
        };
        
        this.code = {
            python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
            javascript: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
            rust: `fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut left = 0;
    let mut right = arr.len() - 1;
    while left <= right {
        let mid = (left + right) / 2;
        if arr[mid] == target { return Some(mid); }
        if arr[mid] < target { left = mid + 1; }
        else { right = mid - 1; }
    }
    None
}`,
            go: `func binarySearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    for left <= right {
        mid := (left + right) / 2
        if arr[mid] == target {
            return mid
        }
        if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}`,
            cpp: `int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
        };
    }

    initialize() {
        const values = Array.from({ length: 15 }, (_, i) => i + 1); 
        const target = values[Math.floor(Math.random() * values.length)];
        return { type: 'array', values, target };
    }

    mapToVisual(data) {
        return data.values.map((value, index) => ({
            id: `sphere-${index}`,
            type: 'sphere',
            value: value,
            position: [(index - 7) * 1.5, 0, 0], // Wider spacing for spheres
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
            duration: 300, 
            narrative: `Target: ${target}` 
        };
        yield { type: 'highlight_code', line: 1 };

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            yield { type: 'highlight_code', line: 2 };
            
            // Dim spheres outside range
            for(let i = 0; i < arr.length; i++) {
                if (i < left || i > right) {
                    yield { type: 'activate_sphere', id: i, state: 'visited' }; 
                } else if (i !== mid) {
                    yield { type: 'activate_sphere', id: i, state: 'default' };
                }
            }

            // Highlight mid
            yield { 
                type: 'activate_sphere', 
                id: mid, 
                state: 'active', 
                narrative: `Mid Index: ${mid}` 
            };
            yield { type: 'highlight_code', line: 3 };

            yield { 
                type: 'compare', 
                targets: [mid], 
                narrative: `arr[${mid}] = ${arr[mid]} vs ${target}` 
            };
            yield { type: 'highlight_code', line: 4 };
            
            if (arr[mid] === target) {
                yield { 
                    type: 'activate_sphere', 
                    id: mid, 
                    state: 'sorted', 
                    narrative: `Found at Index ${mid}!` 
                };
                yield { type: 'highlight_code', line: 5 };
                yield { type: 'complete', narrative: "Search Complete" };
                yield { type: 'celebrate', targets: [mid] };
                return;
            }

            if (arr[mid] < target) {
                yield { 
                    type: 'delay', 
                    duration: 200, 
                    narrative: `${arr[mid]} < ${target}, search right →` 
                };
                yield { type: 'highlight_code', line: 7 };
                
                for(let i = left; i <= mid; i++) {
                    yield { type: 'activate_sphere', id: i, state: 'visited' };
                }
                
                left = mid + 1;
            } else {
                yield { 
                    type: 'delay', 
                    duration: 200, 
                    narrative: `${arr[mid]} > ${target}, search left ←` 
                };
                yield { type: 'highlight_code', line: 9 };
                
                for(let i = mid; i <= right; i++) {
                    yield { type: 'activate_sphere', id: i, state: 'visited' };
                }
                
                right = mid - 1;
            }

            yield { type: 'delay', duration: 300 };
        }
        
        yield { type: 'highlight_code', line: 11 };
        yield { type: 'complete', narrative: `${target} not found` };
    }
}
