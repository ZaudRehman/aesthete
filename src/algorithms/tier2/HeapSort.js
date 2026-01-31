import { AlgorithmBase } from '../AlgorithmBase';

export class HeapSort extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Heap Sort";
        this.tier = 2;
        this.category = "Sorting (Heap-Based)";
        this.description = "Builds a max heap from the array, then repeatedly extracts the maximum element to build a sorted array. Combines the speed of Quick Sort with the guaranteed O(N log N) performance.";

        this.details = {
            complexity: {
                time: "O(N log N) guaranteed",
                space: "O(1) in-place"
            },
            useCases: [
                "Systems requiring guaranteed O(N log N) time with no worst-case degradation",
                "Priority queue implementations (insertion, deletion in O(log N))",
                "Finding k largest/smallest elements (Top-K problems)",
                "Embedded systems with limited memory (in-place, constant space)"
            ],
            keyConcept: "Heap Property: A binary tree where parent ≥ children. Array indices: parent at i, left child at 2i+1, right at 2i+2. Build heap bottom-up, then extract max repeatedly while maintaining the heap invariant."
        };
        
        this.code = {
            python: `def heap_sort(arr):
    n = len(arr)
    
    # Build max heap (rearrange array)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements one by one from heap
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # Move current root to end
        heapify(arr, i, 0)  # Heapify reduced heap

def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    left = 2 * i + 1
    right = 2 * i + 2
    
    # If left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # If right child exists and is greater than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)  # Recursively heapify affected sub-tree`,

            javascript: `function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];  // Move current root to end
        heapify(arr, i, 0);  // Heapify reduced heap
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;  // Initialize largest as root
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);  // Recursively heapify affected sub-tree
    }
}`,

            cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i;  // Initialize largest as root
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);  // Recursively heapify affected sub-tree
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements one by one from heap
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);  // Move current root to end
        heapify(arr, i, 0);  // Heapify reduced heap
    }
}`,

            rust: `fn heapify(arr: &mut [i32], n: usize, i: usize) {
    let mut largest = i;  // Initialize largest as root
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    // If left child is larger than root
    if left < n && arr[left] > arr[largest] {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if right < n && arr[right] > arr[largest] {
        largest = right;
    }
    
    // If largest is not root
    if largest != i {
        arr.swap(i, largest);
        heapify(arr, n, largest);  // Recursively heapify affected sub-tree
    }
}

fn heap_sort(arr: &mut [i32]) {
    let n = arr.len();
    
    // Build max heap (rearrange array)
    for i in (0..n/2).rev() {
        heapify(arr, n, i);
    }
    
    // Extract elements one by one from heap
    for i in (1..n).rev() {
        arr.swap(0, i);  // Move current root to end
        heapify(arr, i, 0);  // Heapify reduced heap
    }
}`,

            go: `func heapify(arr []int, n, i int) {
    largest := i  // Initialize largest as root
    left := 2*i + 1
    right := 2*i + 2
    
    // If left child is larger than root
    if left < n && arr[left] > arr[largest] {
        largest = left
    }
    
    // If right child is larger than largest so far
    if right < n && arr[right] > arr[largest] {
        largest = right
    }
    
    // If largest is not root
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)  // Recursively heapify affected sub-tree
    }
}

func heapSort(arr []int) {
    n := len(arr)
    
    // Build max heap (rearrange array)
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
    
    // Extract elements one by one from heap
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]  // Move current root to end
        heapify(arr, i, 0)  // Heapify reduced heap
    }
}`
        };
    }

    initialize() {
        const values = [10, 5, 4, 1, 3, 2, 13, 12, 7, 8, 6, 11, 9];
        return { type: 'array', values };
    }

    mapToVisual(data) {
        return data.values.map((val, idx) => ({
            id: idx,
            type: 'pillar',
            height: val,
            position: [idx * 1.1 - (data.values.length * 0.55), 0, 0],
            state: 'default',
            value: val
        }));
    }

    *execute(data) {
        const arr = [...data.values];
        const n = arr.length;
        
        // Helper to get parent/child indices for educational narrative
        const getParent = (i) => Math.floor((i - 1) / 2);
        const getLeft = (i) => 2 * i + 1;
        const getRight = (i) => 2 * i + 2;
        
        // Helper function for heapify with enhanced visuals
        function* heapify(arr, heapSize, rootIndex, phase = 'build') {
            let largest = rootIndex;
            const left = getLeft(rootIndex);
            const right = getRight(rootIndex);
            
            // Visual: Highlight the subtree being examined
            yield { 
                type: 'activate_pillar', 
                id: rootIndex, 
                state: 'active',
                narrative: `Examining node ${rootIndex} (value: ${arr[rootIndex]}) - Parent of indices ${left}, ${right}` 
            };
            yield { type: 'highlight_code', line: 13 };
            yield { type: 'delay', duration: 150 };
            
            // Check left child
            if (left < heapSize) {
                yield { 
                    type: 'activate_pillar', 
                    id: left, 
                    state: 'compare',
                    narrative: `Left child [${left}]: ${arr[left]}` 
                };
                yield { type: 'highlight_code', line: 17 };
                
                yield { 
                    type: 'compare', 
                    targets: [left, largest], 
                    narrative: `Is left child ${arr[left]} > parent ${arr[largest]}?` 
                };
                
                if (arr[left] > arr[largest]) {
                    largest = left;
                    yield { 
                        type: 'activate_pillar', 
                        id: left, 
                        state: 'left',
                        narrative: `Yes! Left child ${arr[left]} becomes new largest` 
                    };
                    yield { type: 'delay', duration: 100 };
                }
                
                yield { type: 'activate_pillar', id: left, state: 'default' };
            }
            
            // Check right child
            if (right < heapSize) {
                yield { 
                    type: 'activate_pillar', 
                    id: right, 
                    state: 'compare',
                    narrative: `Right child [${right}]: ${arr[right]}` 
                };
                yield { type: 'highlight_code', line: 21 };
                
                yield { 
                    type: 'compare', 
                    targets: [right, largest], 
                    narrative: `Is right child ${arr[right]} > current largest ${arr[largest]}?` 
                };
                
                if (arr[right] > arr[largest]) {
                    largest = right;
                    yield { 
                        type: 'activate_pillar', 
                        id: right, 
                        state: 'right',
                        narrative: `Yes! Right child ${arr[right]} becomes new largest` 
                    };
                    yield { type: 'delay', duration: 100 };
                }
                
                yield { type: 'activate_pillar', id: right, state: 'default' };
            }
            
            // If largest is not root, swap and continue heapifying
            if (largest !== rootIndex) {
                yield { type: 'highlight_code', line: 25 };
                yield { 
                    type: 'swap', 
                    targets: [rootIndex, largest], 
                    narrative: `Heap violation! Swapping parent ${arr[rootIndex]} with child ${arr[largest]} at index ${largest}` 
                };
                yield { type: 'highlight_code', line: 26 };
                
                [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
                yield { type: 'delay', duration: 200 };
                
                // Visual feedback: Show the swap happened
                yield { 
                    type: 'activate_pillar', 
                    id: largest, 
                    state: 'active',
                    narrative: `Recursively heapifying subtree at ${largest}` 
                };
                yield { type: 'highlight_code', line: 27 };
                yield { type: 'delay', duration: 100 };
                
                // Recursively heapify the affected subtree
                yield* heapify(arr, heapSize, largest, phase);
            } else {
                // Heap property satisfied
                yield { 
                    type: 'activate_pillar', 
                    id: rootIndex, 
                    state: phase === 'extract' ? 'visited' : 'default',
                    narrative: `Heap property satisfied at node ${rootIndex}` 
                };
            }
            
            // Reset root color
            yield { type: 'activate_pillar', id: rootIndex, state: phase === 'extract' ? 'visited' : 'default' };
        }
        
        yield { 
            type: 'delay', 
            duration: 1000, 
            narrative: "PHASE 1: Building Max Heap from bottom up..." 
        };
        yield { type: 'highlight_code', line: 4 };
        
        const lastParent = Math.floor(n / 2) - 1;
        yield { 
            type: 'delay', 
            duration: 600, 
            narrative: `Starting from last non-leaf node at index ${lastParent}. Leaves are already valid heaps!` 
        };
        
        for (let i = lastParent; i >= 0; i--) {
            yield { 
                type: 'delay', 
                duration: 300, 
                narrative: `Heapifying subtree rooted at index ${i}...` 
            };
            yield* heapify(arr, n, i, 'build');
        }
        
        yield { 
            type: 'delay', 
            duration: 700, 
            narrative: `Max Heap constructed! Root ${arr[0]} is the maximum element.` 
        };
        
        // Briefly highlight the root (max element)
        yield { type: 'activate_pillar', id: 0, state: 'active' };
        yield { type: 'delay', duration: 500 };
        yield { type: 'activate_pillar', id: 0, state: 'default' };
        
        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: "PHASE 2: Extracting maximum elements one by one..." 
        };
        yield { type: 'highlight_code', line: 8 };
        
        for (let i = n - 1; i > 0; i--) {
            yield { 
                type: 'activate_pillar', 
                id: 0, 
                state: 'active',
                narrative: `Extracting max: ${arr[0]} (root of heap)` 
            };
            yield { type: 'delay', duration: 300 };
            
            // Swap root with last element
            yield { type: 'highlight_code', line: 9 };
            yield { 
                type: 'swap', 
                targets: [0, i], 
                narrative: `Swapping root ${arr[0]} with last heap element ${arr[i]} at position ${i}` 
            };
            
            [arr[0], arr[i]] = [arr[i], arr[0]];
            yield { type: 'delay', duration: 250 };
            
            // Mark as sorted (final position)
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'sorted',
                narrative: `${arr[i]} locked at position ${i}. Heap size reduced to ${i}` 
            };
            
            // Heapify the reduced heap
            if (i > 1) {
                yield { 
                    type: 'delay', 
                    duration: 200, 
                    narrative: `Re-heapifying remaining ${i} elements...` 
                };
                yield { type: 'highlight_code', line: 10 };
                yield* heapify(arr, i, 0, 'extract');
            }
        }
        
        // Mark the last element (index 0) as sorted
        yield { 
            type: 'activate_pillar', 
            id: 0, 
            state: 'sorted',
            narrative: `Final element ${arr[0]} in place!` 
        };
        
        yield { type: 'delay', duration: 500 };
        yield { type: 'complete', narrative: "Heap Sort Complete! Array is fully sorted." };
        
        for (let k = 0; k < n; k++) {
            yield { type: 'celebrate', targets: [k] };
            if (k < n - 1) {
                yield { type: 'delay', duration: 30 };
            }
        }
    }
}
