import { AlgorithmBase } from '../AlgorithmBase';

export class SlidingWindowMax extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Sliding Window Maximum";
        this.tier = 1;
        this.category = "Arrays";
        this.description = "Finds the maximum element in every contiguous subarray (window) of size k.";

        this.details = {
            complexity: {
                time: "O(n)",
                space: "O(k)"
            },
            useCases: [
                "Real-time analytics (finding peak values in time series)",
                "Image processing (max pooling in CNNs)",
                "Stock market analysis (tracking highest price in rolling window)"
            ],
            keyConcept: "Monotonic Deque: Maintain a deque of indices where values are in decreasing order, ensuring the front always has the current maximum."
        };

        this.code = {
            python: `def max_sliding_window(nums, k):
    from collections import deque
    dq = deque()
    result = []
    
    for i in range(len(nums)):
        # Remove elements outside window
        if dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result`,
            javascript: `function maxSlidingWindow(nums, k) {
    const dq = [];
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        // Remove out of window
        if (dq.length && dq[0] < i - k + 1) {
            dq.shift();
        }
        
        // Remove smaller elements
        while (dq.length && nums[dq[dq.length - 1]] < nums[i]) {
            dq.pop();
        }
        
        dq.push(i);
        
        if (i >= k - 1) {
            result.push(nums[dq[0]]);
        }
    }
    return result;
}`,
            cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    
    for (int i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}`,
            go: `func maxSlidingWindow(nums []int, k int) []int {
    dq := make([]int, 0)
    result := make([]int, 0)
    
    for i := 0; i < len(nums); i++ {
        if len(dq) > 0 && dq[0] < i-k+1 {
            dq = dq[1:]
        }
        
        for len(dq) > 0 && nums[dq[len(dq)-1]] < nums[i] {
            dq = dq[:len(dq)-1]
        }
        
        dq = append(dq, i)
        
        if i >= k-1 {
            result = append(result, nums[dq[0]])
        }
    }
    return result
}`,
            rust: `fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
    use std::collections::VecDeque;
    let mut dq = VecDeque::new();
    let mut result = Vec::new();
    let k = k as usize;
    
    for i in 0..nums.len() {
        if let Some(&front) = dq.front() {
            if front < i - k + 1 {
                dq.pop_front();
            }
        }
        
        while let Some(&back) = dq.back() {
            if nums[back] < nums[i] {
                dq.pop_back();
            } else {
                break;
            }
        }
        
        dq.push_back(i);
        
        if i >= k - 1 {
            result.push(nums[*dq.front().unwrap()]);
        }
    }
    result
}`
        };
    }

    initialize() {
        const values = [1, 3, 1, 2, 5, 1, 3, 6, 1, 2, 4, 2];
        const k = 3;
        return { type: 'array', values, k };
    }

    mapToVisual(data) {
        const pillarGap = 1.5;
        const pillars = data.values.map((value, index) => ({
            id: `pillar-${index}`,
            type: 'pillar',
            value: value,
            position: [(index - 5.5) * pillarGap, 0, 0],
            state: 'default', // Start normal, not dark
            height: value
        }));

        const frameWidth = (data.k * pillarGap) + 0.5;
        const frame = {
            id: 'window-frame',
            type: 'window_frame',
            position: [(-5.5) * pillarGap, 0, 0], // Start at far left
            width: frameWidth,
            height: 7
        };

        return [...pillars, frame];
    }

    *execute(data) {
        const nums = data.values;
        const k = data.k;
        const dq = [];
        const result = [];
        const pillarGap = 1.5;

        const getFrameX = (rightEdge) => {
            const leftEdge = Math.max(0, rightEdge - k + 1);
            const center = (leftEdge + rightEdge) / 2;
            return (center - 5.5) * pillarGap;
        };

        yield { type: 'delay', duration: 800, narrative: `Sliding Window Maximum (k=${k})` };

        for (let i = 0; i < nums.length; i++) {
            
            // === STEP 1: SLIDE FRAME ===
            yield {
                type: 'move',
                id: 'window-frame',
                position: [getFrameX(i), 0, 0]
            };
            
            // === STEP 2: REMOVE OUT-OF-WINDOW FROM DEQUE ===
            if (dq.length && dq[0] < i - k + 1) {
                const oldIdx = dq.shift();
                yield {
                    type: 'activate_pillar',
                    id: `pillar-${oldIdx}`,
                    state: 'visited',
                    narrative: `${nums[oldIdx]} slides out of window`
                };
            }

            // === STEP 3: ELIMINATE SMALLER ELEMENTS (THE FIGHT) ===
            while (dq.length && nums[dq[dq.length - 1]] < nums[i]) {
                const loserIdx = dq.pop();
                yield {
                    type: 'activate_pillar',
                    id: `pillar-${loserIdx}`,
                    state: 'right', // RED - eliminated
                    narrative: `${nums[loserIdx]} eliminated by ${nums[i]}`
                };
                yield { type: 'delay', duration: 200 };
            }

            // === STEP 4: ADD CURRENT ELEMENT ===
            dq.push(i);
            yield {
                type: 'activate_pillar',
                id: `pillar-${i}`,
                state: 'active', // GOLD - New contender
                narrative: `${nums[i]} enters window`
            };
            yield { type: 'delay', duration: 300 };

            // === STEP 5: SHOW WINDOW STATE (if window is full) ===
            if (i >= k - 1) {
                const maxIdx = dq[0];
                result.push(nums[maxIdx]);

                // Paint the window
                const windowStart = i - k + 1;
                for (let w = windowStart; w <= i; w++) {
                    if (w === maxIdx) {
                        yield { type: 'activate_pillar', id: `pillar-${w}`, state: 'sorted' }; // GOLD MAX
                    } else if (dq.includes(w)) {
                        yield { type: 'activate_pillar', id: `pillar-${w}`, state: 'left' }; // CYAN (in deque)
                    } else {
                        yield { type: 'activate_pillar', id: `pillar-${w}`, state: 'visited' }; // GRAY (eliminated)
                    }
                }

                yield {
                    type: 'delay',
                    duration: 700,
                    narrative: `Window [${windowStart}..${i}]: Max = ${nums[maxIdx]}`
                };

                // Reset non-max pillars to default before next iteration
                for (let w = windowStart; w <= i; w++) {
                    if (w !== maxIdx && w < nums.length - 1) {
                        yield { type: 'activate_pillar', id: `pillar-${w}`, state: 'default' };
                    }
                }
            }
        }

        yield { type: 'complete', narrative: `Result: [${result.join(', ')}]` };
    }
}