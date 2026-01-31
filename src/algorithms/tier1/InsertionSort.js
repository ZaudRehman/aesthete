import { AlgorithmBase } from '../AlgorithmBase';

export class InsertionSort extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Insertion Sort";
        this.tier = 1;
        this.category = "Sorting";
        this.description = "Builds the sorted array one item at a time by shifting elements.";
        
        this.details = {
            complexity: {
                time: "O(n²)",
                space: "O(1)"
            },
            useCases: [
                "Small datasets (very fast for n < 20)",
                "Online algorithms (sorting data as it arrives)",
                "Almost sorted data (runs in O(n) time)"
            ],
            keyConcept: "Incremental Build: Maintain a 'sorted' sublist and insert new elements into their correct position within it."
        };
        
        this.code = {
            python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
            javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
            rust: `fn insertion_sort(arr: &mut [i32]) {
    for i in 1..arr.len() {
        let mut j = i;
        while j > 0 && arr[j - 1] > arr[j] {
            arr.swap(j - 1, j);
            j -= 1;
        }
    }
}`,
            go: `func insertionSort(arr []int) {
    for i := 1; i < len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}`,
            cpp: `void insertionSort(std::vector<int>& arr) {
    for (size_t i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
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
        
        // Initial State: First element is trivially sorted
        yield { type: 'activate_pillar', id: 0, state: 'sorted', narrative: 'First element is considered sorted.' };

        for (let i = 1; i < arr.length; i++) {
            const key = arr[i];
            let j = i - 1;
            
            // Highlight the "Key" we are trying to insert
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'active', 
                narrative: `Picking up Key: ${key}` 
            };
            yield { type: 'highlight_code', line: 2 };
            
            let tempJ = j;
            let tempI = i; // This tracks where our 'key' currently is

            // Check if we need to enter the loop
            if (tempJ >= 0 && arr[tempJ] <= arr[tempI]) {
                 yield { type: 'compare', targets: [tempJ, tempI], narrative: `${arr[tempJ]} <= ${key}. No shift needed.` };
            }

            while (tempJ >= 0 && arr[tempJ] > arr[tempI]) { 
                yield { type: 'highlight_code', line: 4 };
                yield { 
                    type: 'compare', 
                    targets: [tempJ, tempI], 
                    narrative: `${arr[tempJ]} > ${arr[tempI]}. Shift ${arr[tempJ]} right.` 
                };
                
                yield { type: 'swap', targets: [tempJ, tempI] };
                [arr[tempJ], arr[tempI]] = [arr[tempI], arr[tempJ]];
                
                // Move indices back to follow the bubble
                tempI--;
                tempJ--;
                
                yield { type: 'highlight_code', line: 5 }; // The shift action
                yield { type: 'delay', duration: 150 };
            }
            
            // Placement Finalized
            yield { type: 'highlight_code', line: 8 };
            yield { 
                type: 'activate_pillar', 
                id: tempI, 
                state: 'sorted', 
                narrative: `Inserted ${key} at position ${tempI}` 
            };

            // Ensure the entire sorted portion is marked 'sorted' (green)
            for(let x=0; x<=i; x++) {
                yield { type: 'activate_pillar', id: x, state: 'sorted' };
            }
        }
        
        yield { type: 'complete', narrative: "Sorting Complete" };
        for (let k = 0; k < arr.length; k++) yield { type: 'celebrate', targets: [k] };
    }
}
