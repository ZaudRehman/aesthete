import { AlgorithmBase } from '../AlgorithmBase';

export class MergeSort extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Merge Sort";
        this.tier = 2;
        this.category = "Sorting";
        this.description = "Divide and conquer algorithm that splits arrays and merges them in sorted order.";
        
        this.code = {
            python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1`,
             rust: `fn merge_sort(arr: &mut [i32]) {
    let mid = arr.len() / 2;
    if mid == 0 { return; }

    let (left, right) = arr.split_at_mut(mid);
    merge_sort(left);
    merge_sort(right);

    // Merge logic omitted for brevity
}`,
            cpp: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
            javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}`,
             go: `func mergeSort(items []int) []int {
    if len(items) < 2 { return items }
    first := mergeSort(items[:len(items)/2])
    second := mergeSort(items[len(items)/2:])
    return merge(first, second)
}`
        };
    }

    initialize() {
        const values = Array.from({ length: 16 }, () => Math.floor(Math.random() * 8) + 2);
        return { type: 'array', values };
    }

    mapToVisual(data) {
        const spacing = 1.0; 
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
        // We simulate the recursive Merge Sort on the main array
        // We will highlight the range [left, right] currently being merged
        
        const arr = [...data.values];
        const auxiliaryArray = [...arr];

        function* doMerge(mainArray, startIdx, endIdx, auxiliaryArray) {
            if (startIdx === endIdx) return;
            
            const middleIdx = Math.floor((startIdx + endIdx) / 2);
            
            yield* doMerge(auxiliaryArray, startIdx, middleIdx, mainArray);
            yield* doMerge(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
            
            yield* merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
        }

        function* merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
            let k = startIdx;
            let i = startIdx;
            let j = middleIdx + 1;
            
            yield { type: 'highlight_code', line: 8 }; // merge call
            
            while (i <= middleIdx && j <= endIdx) {
                // Visual: Highlight the two being compared
                yield { 
                    type: 'compare', 
                    targets: [i, j], 
                    narrative: `Merging range [${startIdx}-${endIdx}]: ${auxiliaryArray[i]} vs ${auxiliaryArray[j]}` 
                };

                if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                    // Overwrite value in main array (Visual update)
                    mainArray[k] = auxiliaryArray[i];
                    yield { 
                        type: 'overwrite', // NEW EVENT
                        index: k, 
                        value: auxiliaryArray[i],
                        narrative: `Setting index ${k} to ${auxiliaryArray[i]}`
                    };
                    i++;
                } else {
                    mainArray[k] = auxiliaryArray[j];
                     yield { 
                        type: 'overwrite', 
                        index: k, 
                        value: auxiliaryArray[j],
                         narrative: `Setting index ${k} to ${auxiliaryArray[j]}`
                    };
                    j++;
                }
                k++;
            }
            
            while (i <= middleIdx) {
                mainArray[k] = auxiliaryArray[i];
                yield { type: 'overwrite', index: k, value: auxiliaryArray[i] };
                i++;
                k++;
            }
            while (j <= endIdx) {
                mainArray[k] = auxiliaryArray[j];
                yield { type: 'overwrite', index: k, value: auxiliaryArray[j] };
                j++;
                k++;
            }
        }

        yield* doMerge(arr, 0, arr.length - 1, auxiliaryArray);
        yield { type: 'complete', narrative: "Merge Sort Complete." };
        
         for (let k = 0; k < arr.length; k++) {
            yield { type: 'celebrate', targets: [k] };
        }
    }
}
