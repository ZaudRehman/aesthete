import { AlgorithmBase } from '../AlgorithmBase';

export class QuickSort extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Quick Sort";
        this.tier = 2;
        this.category = "Sorting";
        this.description = "Picks a pivot element and partitions the array such that smaller elements are left and larger are right.";
        
        this.details = {
            complexity: {
                time: "O(n log n) (avg)",
                space: "O(log n)"
            },
            useCases: [
                "General purpose sorting (standard in many libraries like C++ STL)",
                "Systems with good cache locality requirements",
                "Sorting primitive types (where stability isn't needed)"
            ],
            keyConcept: "Partitioning: The core magic is putting the 'Pivot' exactly where it belongs, ensuring everything to its left is smaller and everything to its right is larger."
        };
        
        this.code = {
            python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
            
            rust: `fn quick_sort(arr: &mut [i32], low: isize, high: isize) {
    if low < high {
        let p = partition(arr, low, high);
        quick_sort(arr, low, p - 1);
        quick_sort(arr, p + 1, high);
    }
}

fn partition(arr: &mut [i32], low: isize, high: isize) -> isize {
    let pivot = arr[high as usize];
    let mut i = low - 1;
    for j in low..high {
        if arr[j as usize] < pivot {
            i += 1;
            arr.swap(i as usize, j as usize);
        }
    }
    arr.swap((i + 1) as usize, high as usize);
    i + 1
}`,
            cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`,
            javascript: `function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
            go: `func partition(arr []int, low, high int) int {
    pivot := arr[high]
    i := low - 1
    for j := low; j < high; j++ {
        if arr[j] < pivot {
            i++
            arr[i], arr[j] = arr[j], arr[i]
        }
    }
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
}`
        };
    }

    initialize() {
        // Random array for sorting
        const values = Array.from({ length: 15 }, () => Math.floor(Math.random() * 8) + 2);
        return { type: 'array', values };
    }

    mapToVisual(data) {
        const spacing = 1.2; // Tighter spacing for more elements
        const totalWidth = data.values.length * spacing;
        const startX = -totalWidth / 2 + spacing / 2;

        return data.values.map((value, index) => ({
            id: `pillar-${index}`,
            type: 'pillar',
            value: value,
            position: [startX + index * spacing, 0, 0],
            state: 'default',
            height: value
        }));
    }

    *execute(data) {
        const arr = [...data.values];
        
        // Helper generator for recursion
        function* quickSort(low, high) {
            if (low < high) {
                yield { type: 'highlight_code', line: 2 }; // if low < high
                
                // Partitioning Step
                const pi = yield* partition(low, high);
                
                // Recursive Calls
                yield { type: 'highlight_code', line: 4 }; // quick_sort left
                yield* quickSort(low, pi - 1);
                
                yield { type: 'highlight_code', line: 5 }; // quick_sort right
                yield* quickSort(pi + 1, high);
            }
        }

        function* partition(low, high) {
            const pivot = arr[high];
            yield { 
                type: 'activate_pillar', // NEW EVENT
                id: high, 
                state: 'active', // Pivot becomes Gold
                narrative: `Pivot Selected: ${pivot}` 
            };
            yield { type: 'highlight_code', line: 9 };

            let i = low - 1;
            
            for (let j = low; j < high; j++) {
                yield { type: 'highlight_code', line: 11 }; // loop
                
                yield { 
                    type: 'compare', 
                    targets: [j, high], 
                    narrative: `Comparing ${arr[j]} < Pivot (${pivot})?` 
                };

                if (arr[j] < pivot) {
                    i++;
                    yield { type: 'highlight_code', line: 12 }; // swap logic
                    
                    if (i !== j) {
                        yield { 
                            type: 'swap', 
                            targets: [i, j], 
                            narrative: `Swapping ${arr[i]} and ${arr[j]}` 
                        };
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                }
            }

            yield { type: 'highlight_code', line: 15 }; // final swap
            if (i + 1 !== high) {
                yield { 
                    type: 'swap', 
                    targets: [i + 1, high], 
                    narrative: `Placing Pivot ${pivot} in position` 
                };
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            }
            
            // Mark Pivot as "Sorted" (Locked)
            yield { 
                type: 'activate_pillar', 
                id: i + 1, 
                state: 'sorted', 
                narrative: `Pivot ${pivot} Locked.` 
            };

            return i + 1;
        }

        yield { type: 'activate_node', id: 0, narrative: "Initializing Quick Sort" };
        yield* quickSort(0, arr.length - 1);
        
        yield { type: 'complete', narrative: "Quick Sort Complete." };
        
        // Celebration
        for (let k = 0; k < arr.length; k++) {
            yield { type: 'celebrate', targets: [k] };
        }
    }
}
