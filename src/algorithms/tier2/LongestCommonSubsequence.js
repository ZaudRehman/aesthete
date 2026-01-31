import { AlgorithmBase } from '../AlgorithmBase';

export class LongestCommonSubsequence extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Longest Common Subsequence";
        this.tier = 2;
        this.category = "Dynamic Programming";
        this.description = "Find the longest subsequence present in both strings (not necessarily contiguous). This is the algorithm powering Git Diff, DNA alignment, and plagiarism detection.";

        this.details = {
            complexity: {
                time: "O(M × N) - Every cell computed once",
                space: "O(M × N) - 2D DP table"
            },
            useCases: [
                "Git Diff (file comparison, shows additions/deletions)",
                "Bioinformatics (DNA/protein sequence alignment)",
                "Plagiarism detection (document similarity)",
                "Spell checkers (fuzzy string matching)"
            ],
            keyConcept: "2D Grid DP: If characters match, inherit diagonal + 1 (extend the match). If not, inherit max from Top or Left (carry forward the best result so far)."
        };
        
        this.code = {
            python: `def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    # dp[i][j] = LCS length for text1[0..i-1] and text2[0..j-1]
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                # Characters match: Extend diagonal
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # No match: Take best from Top or Left
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]`,

            javascript: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // Match: Extend from diagonal
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // No match: Inherit best
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}`,

            cpp: `int longestCommonSubsequence(string text1, string text2) {
    int m = text1.length(), n = text2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}`,

            rust: `fn longest_common_subsequence(text1: String, text2: String) -> i32 {
    let (m, n) = (text1.len(), text2.len());
    let mut dp = vec![vec![0; n + 1]; m + 1];
    let t1: Vec<char> = text1.chars().collect();
    let t2: Vec<char> = text2.chars().collect();
    
    for i in 1..=m {
        for j in 1..=n {
            if t1[i - 1] == t2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = dp[i - 1][j].max(dp[i][j - 1]);
            }
        }
    }
    dp[m][n]
}`,

            go: `func longestCommonSubsequence(text1 string, text2 string) int {
    m, n := len(text1), len(text2)
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1) }
    
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text1[i-1] == text2[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n]
}`
        };
    }

    initialize() {
        const text1 = "ABCBDAB";
        const text2 = "BDCABA";
        return { text1, text2 };
    }

    mapToVisual(data) {
        const { text1, text2 } = data;
        const m = text1.length;
        const n = text2.length;
        const entities = [];

        // Calculate grid center for better positioning
        const gridCenterX = (n - 1) * 1.5 / 2;
        const gridCenterZ = (m - 1) * 1.5 / 2;

        // 1. Orbs for String 1 (Rows - Z axis)
        for (let i = 0; i < m; i++) {
            entities.push({
                id: `label-row-${i}`,
                type: 'orb',
                position: [-3, 0.8, i * 1.5 - gridCenterZ],
                state: 'default',
                label: text1[i]
            });
        }

        // 2. Orbs for String 2 (Columns - X axis)
        for (let j = 0; j < n; j++) {
            entities.push({
                id: `label-col-${j}`,
                type: 'orb',
                position: [j * 1.5 - gridCenterX, 0.8, -3],
                state: 'default',
                label: text2[j]
            });
        }

        // 3. DP Grid (Pillars)
        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                entities.push({
                    id: `cell-${i}-${j}`,
                    type: 'pillar',
                    position: [
                        j * 1.5 - gridCenterX,
                        0,
                        i * 1.5 - gridCenterZ
                    ],
                    height: (i === 0 || j === 0) ? 0.05 : 0.1, // Base row/col very flat
                    state: (i === 0 || j === 0) ? 'visited' : 'default',
                    value: 0
                });
            }
        }
        
        return entities;
    }

    *execute(data) {
        const { text1, text2 } = data;
        const m = text1.length;
        const n = text2.length;
        
        const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

        yield { 
            type: 'delay', 
            duration: 1200, 
            narrative: `Longest Common Subsequence: Finding matches between "${text1}" and "${text2}"` 
        };
        
        yield { 
            type: 'delay', 
            duration: 900, 
            narrative: `Concept: Each cell compares one character from each string. Height = longest match found.` 
        };

        yield { 
            type: 'delay', 
            duration: 700, 
            narrative: `Base Case: Empty strings have LCS of 0 (first row & column)` 
        };
        yield { type: 'highlight_code', line: 4 };

        yield { 
            type: 'delay', 
            duration: 900, 
            narrative: `Building DP grid row by row...` 
        };
        yield { type: 'highlight_code', line: 6 };

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const char1 = text1[i - 1];
                const char2 = text2[j - 1];

                // Highlight current comparison
                yield { 
                    type: 'activate_pillar', 
                    id: `cell-${i}-${j}`, 
                    state: 'active'
                };
                yield { 
                    type: 'activate_orb', 
                    id: `label-row-${i-1}`, 
                    state: 'active'
                };
                yield { 
                    type: 'activate_orb', 
                    id: `label-col-${j-1}`, 
                    state: 'active',
                    narrative: `Comparing '${char1}' (row ${i}) with '${char2}' (col ${j})` 
                };
                yield { type: 'delay', duration: 350 };

                if (char1 === char2) {
                    // MATCH CASE
                    const prevVal = dp[i - 1][j - 1];
                    const newVal = prevVal + 1;
                    dp[i][j] = newVal;

                    yield { 
                        type: 'activate_pillar', 
                        id: `cell-${i-1}-${j-1}`, 
                        state: 'compare',
                        narrative: `MATCH! '${char1}' == '${char2}'. Extending diagonal: ${prevVal} + 1` 
                    };
                    yield { type: 'highlight_code', line: 9 };
                    yield { type: 'delay', duration: 450 };

                    // Grow the pillar dramatically
                    yield { 
                        type: 'update_height', 
                        id: `cell-${i}-${j}`, 
                        height: 0.3 + (newVal * 0.8), // Dramatic growth
                        narrative: `New LCS length: ${newVal}` 
                    };
                    
                    yield { 
                        type: 'activate_pillar', 
                        id: `cell-${i}-${j}`, 
                        state: 'sorted' // Green for matches
                    };

                    // Reset diagonal
                    yield { type: 'activate_pillar', id: `cell-${i-1}-${j-1}`, state: (i-1===0 || j-1===0) ? 'visited' : 'sorted' };

                } else {
                    // NO MATCH CASE
                    const topVal = dp[i - 1][j];
                    const leftVal = dp[i][j - 1];
                    const newVal = Math.max(topVal, leftVal);
                    dp[i][j] = newVal;

                    // Show top neighbor
                    yield { 
                        type: 'activate_pillar', 
                        id: `cell-${i-1}-${j}`, 
                        state: 'compare',
                        narrative: `No match. Checking Top: ${topVal}` 
                    };
                    yield { type: 'delay', duration: 250 };

                    // Show left neighbor
                    yield { 
                        type: 'activate_pillar', 
                        id: `cell-${i}-${j-1}`, 
                        state: 'compare',
                        narrative: `Checking Left: ${leftVal}` 
                    };
                    yield { type: 'highlight_code', line: 12 };
                    yield { type: 'delay', duration: 250 };

                    // Inherit max value
                    yield { 
                        type: 'update_height', 
                        id: `cell-${i}-${j}`, 
                        height: 0.3 + (newVal * 0.8),
                        narrative: `Inheriting max(${topVal}, ${leftVal}) = ${newVal}` 
                    };

                    yield { 
                        type: 'activate_pillar', 
                        id: `cell-${i}-${j}`, 
                        state: 'visited' // Gray/Blue for inherited
                    };

                    // Reset neighbors
                    yield { type: 'activate_pillar', id: `cell-${i-1}-${j}`, state: (i-1===0) ? 'visited' : 'default' };
                    yield { type: 'activate_pillar', id: `cell-${i}-${j-1}`, state: (j-1===0) ? 'visited' : 'default' };
                }

                // Reset label highlights
                yield { type: 'activate_orb', id: `label-row-${i-1}`, state: 'default' };
                yield { type: 'activate_orb', id: `label-col-${j-1}`, state: 'default' };
                
                yield { type: 'delay', duration: 100 };
            }
        }

        yield { type: 'delay', duration: 700 };
        
        const lcsLen = dp[m][n];

        yield { 
            type: 'activate_pillar', 
            id: `cell-${m}-${n}`, 
            state: 'active',
            narrative: `DP table complete! LCS Length: ${lcsLen}` 
        };
        yield { type: 'highlight_code', line: 14 };
        yield { type: 'delay', duration: 1000 };

        yield { 
            type: 'delay', 
            duration: 600, 
            narrative: `Backtracking to reconstruct the actual string...` 
        };

        // Backtracking
        let i = m, j = n;
        const path = [];
        const pathCells = [];

        while (i > 0 && j > 0) {
            pathCells.push(`cell-${i}-${j}`);
            
            yield { 
                type: 'activate_pillar', 
                id: `cell-${i}-${j}`, 
                state: 'active'
            };
            yield { type: 'delay', duration: 300 };

            if (text1[i - 1] === text2[j - 1]) {
                // This was a match
                path.unshift(text1[i - 1]);
                
                yield { 
                    type: 'activate_orb', 
                    id: `label-row-${i-1}`, 
                    state: 'sorted',
                    narrative: `Found '${text1[i-1]}' in the LCS!` 
                };
                yield { type: 'delay', duration: 400 };
                
                // Move diagonal
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                // Came from top
                i--;
            } else {
                // Came from left
                j--;
            }
        }

        yield { 
            type: 'complete', 
            narrative: `LCS Found: "${path.join('')}" (Length: ${path.length})` 
        };

        // Celebrate the path
        for (const cellId of pathCells) {
            yield { type: 'celebrate', targets: [cellId] };
        }
    }
}
