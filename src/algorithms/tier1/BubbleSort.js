import { AlgorithmBase } from '../AlgorithmBase';

export class BubbleSort extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Bubble Sort";
        this.tier = 1;
        this.category = "Sorting";
        this.description = "Repeatedly steps through the list...";
        
        // Changed: 'code' is now an object map
        this.code = {
            rust: `fn bubble_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n {
        for j in 0..n-i-1 {
            if arr[j] > arr[j+1] {
                arr.swap(j, j+1);
            }
        }
    }
}`,
            python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`,
            
            cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                std::swap(arr[j], arr[j+1]);
            }
        }
    }
}`,
            javascript: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}`,
            go: `func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}`
        };
        
        this.currentLanguage = 'rust';
    }

    initialize() {
        // Generate random array
        const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 9) + 2);
        return { type: 'array', values };
    }

    *execute(data) {
        const arr = [...data.values];
        const n = arr.length;

        yield { type: 'highlight_code', line: 1, narrative: "Initializing Bubble Sort" };
        yield { type: 'delay', duration: 500 };

        for (let i = 0; i < n; i++) {
            yield { type: 'highlight_code', line: 3 };
            
            for (let j = 0; j < n - i - 1; j++) {
                yield { type: 'highlight_code', line: 4 };
                
                // Compare
                yield { 
                    type: 'compare', 
                    targets: [j, j + 1],
                    narrative: `Evaluating Symmetry: ${arr[j]} vs ${arr[j + 1]}`
                };

                yield { type: 'highlight_code', line: 6 };
                
                if (arr[j] > arr[j + 1]) {
                    yield { type: 'highlight_code', line: 7 };
                    
                    // Swap
                    yield { 
                        type: 'swap', 
                        targets: [j, j + 1],
                        narrative: `Harmonic Realignment: Index ${j} ↔ ${j + 1}`
                    };
                    
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }

        yield { 
            type: 'complete', 
            narrative: "Sequence Perfected. Golden Ratio Achieved."
        };

        // Victory Animation
        for (let k = 0; k < n; k++) {
            yield { type: 'celebrate', targets: [k] };
        }
    }

    mapToVisual(data) {
        const spacing = 1.5; // Reduced from 2.2
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
}
