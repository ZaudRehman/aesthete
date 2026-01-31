import { AlgorithmBase } from '../AlgorithmBase';

export class CoinChange extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Coin Change";
        this.tier = 2;
        this.category = "Dynamic Programming";
        this.description = "Finds the minimum number of coins needed to make a given amount. Classic DP problem that demonstrates optimal substructure (building up from smaller amounts).";

        this.details = {
            complexity: {
                time: "O(A × C) where A=Amount, C=Coins",
                space: "O(A) for DP array"
            },
            useCases: [
                "Cash register systems (making change efficiently)",
                "Resource allocation (minimizing waste)",
                "Understanding DP fundamentals (bottom-up approach)",
                "Standard Interview Question (Meta, Amazon, Google)"
            ],
            keyConcept: "Bottom-Up DP: Solve for amount 0, then 1, then 2... reusing previous answers. Formula: dp[i] = min(dp[i], dp[i - coin] + 1)"
        };
        
        this.code = {
            python: `def coin_change(coins, amount):
    # dp[i] = minimum coins to make amount i
    # Initialize with infinity (unreachable)
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins for amount 0
    
    # Build up solutions for all amounts from 1 to target
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                # Can we make amount 'i' using this coin?
                # Check previous sub-problem (i - coin)
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,

            javascript: `function coinChange(coins, amount) {
    // dp[i] = minimum coins to make amount i
    // Initialize with Infinity
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;  // Base case
    
    // Build solutions bottom-up
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                // If I use this coin, I need 1 + dp[i - coin] coins
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,

            cpp: `int coinChange(vector<int>& coins, int amount) {
    // dp[i] = min coins for amount i
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,

            rust: `fn coin_change(coins: &[i32], amount: i32) -> i32 {
    let amount = amount as usize;
    let mut dp = vec![i32::MAX; amount + 1];
    dp[0] = 0;
    
    for i in 1..=amount {
        for &coin in coins {
            let coin = coin as usize;
            if coin <= i && dp[i - coin] != i32::MAX {
                dp[i] = dp[i].min(dp[i - coin] + 1);
            }
        }
    }
    
    if dp[amount] == i32::MAX { -1 } else { dp[amount] }
}`,

            go: `func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    // Initialize with a value > amount (representing infinity)
    for i := range dp { dp[i] = amount + 1 }
    dp[0] = 0
    
    for i := 1; i <= amount; i++ {
        for _, coin := range coins {
            if coin <= i {
                if dp[i-coin]+1 < dp[i] {
                    dp[i] = dp[i-coin] + 1
                }
            }
        }
    }
    
    if dp[amount] > amount { return -1 }
    return dp[amount]
}`
        };
    }

    initialize() {
        const coins = [1, 2, 5];
        const amount = 11;
        return { coins, amount };
    }

    mapToVisual(data) {
        const { coins, amount } = data;
        
        // Create pillars for DP array (amount + 1 positions)
        const dpPillars = Array.from({ length: amount + 1 }, (_, i) => ({
            id: i,
            type: 'pillar',
            height: i === 0 ? 1 : 0.5, 
            position: [i * 1.2 - (amount * 0.6), 0, 0], // Centered with wider gaps
            state: i === 0 ? 'sorted' : 'default',
            value: i === 0 ? 0 : Infinity,
            label: `${i}`
        }));
        
        // Create coin spheres (above the DP array for reference)
        const coinSpheres = coins.map((coin, idx) => ({
            id: `coin-${idx}`,
            type: 'sphere',
            position: [idx * 2.5 - 2.5, 5, 0], // Higher up and centered
            state: 'default',
            value: coin,
            radius: 0.4 + (coin * 0.05)
        }));
        
        return [...dpPillars, ...coinSpheres];
    }

    *execute(data) {
        const { coins, amount } = data;
        const dp = Array(amount + 1).fill(Infinity);
        dp[0] = 0;

        yield { 
            type: 'delay', 
            duration: 1000, 
            narrative: `Goal: Make amount ${amount} using coins [${coins.join(', ')}]` 
        };
        
        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: `Base Case: dp[0] = 0 (It takes 0 coins to make amount 0)` 
        };
        yield { type: 'highlight_code', line: 4 };
        
        // Show available coins
        for (let i = 0; i < coins.length; i++) {
            yield { 
                type: 'activate_sphere', 
                id: `coin-${i}`, 
                state: 'active',
                narrative: `Available Denomination: ${coins[i]}` 
            };
            yield { type: 'delay', duration: 300 };
            yield { type: 'activate_sphere', id: `coin-${i}`, state: 'default' };
        }

        yield { 
            type: 'delay', 
            duration: 1000, 
            narrative: "Starting Bottom-Up Construction..." 
        };
        yield { type: 'highlight_code', line: 7 };
        
        for (let i = 1; i <= amount; i++) {
            yield { 
                type: 'activate_pillar', 
                id: i, 
                state: 'active',
                narrative: `Calculating min coins for Amount ${i}...` 
            };
            yield { type: 'delay', duration: 400 };
            
            let foundBetter = false;
            
            // Try every coin denomination
            for (let coinIdx = 0; coinIdx < coins.length; coinIdx++) {
                const coin = coins[coinIdx];
                
                // Highlight the coin being considered
                yield { 
                    type: 'activate_sphere', 
                    id: `coin-${coinIdx}`, 
                    state: 'active',
                    narrative: `Can we use coin ${coin}?` 
                };
                yield { type: 'highlight_code', line: 9 };
                
                if (coin <= i) {
                    const prevAmount = i - coin;
                    
                    // Highlight the sub-problem we are looking back at
                    yield { 
                        type: 'activate_pillar', 
                        id: prevAmount, 
                        state: 'compare',
                        narrative: `Check sub-problem dp[${i} - ${coin}] = dp[${prevAmount}]` 
                    };
                    yield { type: 'highlight_code', line: 11 };
                    yield { type: 'delay', duration: 400 };
                    
                    if (dp[prevAmount] !== Infinity) {
                        const potentialNewVal = dp[prevAmount] + 1;
                        
                        if (potentialNewVal < dp[i]) {
                            dp[i] = potentialNewVal;
                            foundBetter = true;
                            
                            yield { 
                                type: 'overwrite', 
                                index: i, 
                                value: potentialNewVal,
                                narrative: `New Best: 1 coin (${coin}) + dp[${prevAmount}] (${dp[prevAmount]}) = ${potentialNewVal} coins` 
                            };
                            yield { type: 'delay', duration: 500 };
                        } else {
                            yield { 
                                type: 'delay', 
                                duration: 200, 
                                narrative: `Skipping: ${potentialNewVal} is not better than current ${dp[i]}` 
                            };
                        }
                    } else {
                        yield { 
                            type: 'delay', 
                            duration: 200, 
                            narrative: `Impossible: dp[${prevAmount}] was unreachable (∞)` 
                        };
                    }
                    
                    // Reset sub-problem visual
                    yield { type: 'activate_pillar', id: prevAmount, state: dp[prevAmount] === Infinity ? 'default' : 'sorted' };
                } else {
                    yield { 
                        type: 'delay', 
                        duration: 150, 
                        narrative: `Coin ${coin} is too large for amount ${i}. Skip.` 
                    };
                }
                
                // Reset coin highlight
                yield { type: 'activate_sphere', id: `coin-${coinIdx}`, state: 'default' };
            }
            
            // Finalize state for this amount
            if (dp[i] !== Infinity) {
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'sorted',
                    narrative: `dp[${i}] solved: ${dp[i]} coins.` 
                };
            } else {
                yield { 
                    type: 'activate_pillar', 
                    id: i, 
                    state: 'visited', // Use 'visited' to show processed but unsolved
                    narrative: `dp[${i}] is unreachable.` 
                };
            }
            
            yield { type: 'delay', duration: 200 };
        }

        yield { type: 'delay', duration: 600 };
        
        if (dp[amount] !== Infinity) {
            yield { 
                type: 'activate_pillar', 
                id: amount, 
                state: 'active',
                narrative: `Final Result: Minimum ${dp[amount]} coins needed for amount ${amount}.` 
            };
            yield { type: 'delay', duration: 800 };
            
            yield { 
                type: 'complete', 
                narrative: `Optimal Solution Found: ${dp[amount]} coins.` 
            };
            
            // Victory Lap: Pulse all reachable states
            for (let k = 0; k <= amount; k++) {
                if (dp[k] !== Infinity) {
                    yield { type: 'celebrate', targets: [k] };
                }
            }
        } else {
            yield { 
                type: 'complete', 
                narrative: `No solution possible for amount ${amount}.` 
            };
        }
    }
}
