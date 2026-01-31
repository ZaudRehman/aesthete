import { AlgorithmBase } from '../AlgorithmBase';

export class SelectionSort extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Selection Sort";
        this.tier = 1;
        this.category = "Sorting";
        this.description = "Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.";
        
        this.details = {
            complexity: {
                time: "O(n²)",
                space: "O(1)"
            },
            useCases: [
                "Writing data to Flash memory (minimizes writes, O(n) swaps)",
                "Small arrays where memory is extremely constrained",
                "Simple implementation where stability doesn't matter"
            ],
            keyConcept: "Greedy Selection: Scan the entire unsorted list to find the absolute smallest item and lock it into place."
        };
        
        this.code = {
            python: `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
            javascript: `function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
}`,
            rust: `fn selection_sort(arr: &mut [i32]) {
    for i in 0..arr.len() {
        let mut min_idx = i;
        for j in (i + 1)..arr.len() {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        arr.swap(i, min_idx);
    }
}`,
            go: `func selectionSort(arr []int) {
    for i := 0; i < len(arr); i++ {
        minIdx := i
        for j := i + 1; j < len(arr); j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
}`,
            cpp: `void selectionSort(std::vector<int>& arr) {
    for (size_t i = 0; i < arr.size(); i++) {
        size_t min_idx = i;
        for (size_t j = i + 1; j < arr.size(); j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        std::swap(arr[i], arr[min_idx]);
    }
}`
        };
    }

    initialize() {
        const values = Array.from({ length: 15 }, () => Math.floor(Math.random() * 8) + 2);
        return { type: 'array', values };
    }

    mapToVisual(data) {
        return data.values.map((value, index) => ({
            id: `pillar-${index}`,
            type: 'pillar',
            value: value,
            position: [(index - 7) * 1.2, 0, 0],
            state: 'default',
            height: value
        }));
    }

    *execute(data) {
        const arr = [...data.values];
        
        for (let i = 0; i < arr.length; i++) {
            let minIdx = i;
            // Highlight the initial candidate for minimum
            yield { type: 'activate_pillar', id: minIdx, state: 'left', narrative: `Current Minimum: ${arr[minIdx]}` }; // Cyan
            yield { type: 'highlight_code', line: 3 };

            for (let j = i + 1; j < arr.length; j++) {
                yield { type: 'compare', targets: [j, minIdx], narrative: `Checking ${arr[j]} vs Min ${arr[minIdx]}` };
                yield { type: 'highlight_code', line: 4 };

                if (arr[j] < arr[minIdx]) {
                    // Revert old min to default (unless it's i, which is our sorted boundary)
                    if (minIdx !== i) {
                        yield { type: 'activate_pillar', id: minIdx, state: 'default' };
                    }
                    
                    minIdx = j;
                    yield { type: 'activate_pillar', id: minIdx, state: 'left', narrative: `New Minimum Found: ${arr[minIdx]}` }; // Cyan
                    yield { type: 'highlight_code', line: 6 };
                }
            }

            // Only swap if the minimum isn't already in place
            if (minIdx !== i) {
                yield { type: 'swap', targets: [i, minIdx], narrative: `Moving ${arr[minIdx]} to sorted position ${i}` };
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                yield { type: 'highlight_code', line: 7 };
            }
            
            // Mark i as sorted (green)
            yield { type: 'activate_pillar', id: i, state: 'sorted', narrative: `${arr[i]} is now in its correct position.` };
        }
        
        yield { type: 'complete', narrative: "Sorting Complete" };
        for (let k = 0; k < arr.length; k++) yield { type: 'celebrate', targets: [k] };
    }
}
