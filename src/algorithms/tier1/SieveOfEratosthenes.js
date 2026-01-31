import { AlgorithmBase } from '../AlgorithmBase';

export class SieveOfEratosthenes extends AlgorithmBase {
    constructor() {
        super();
        this.name = "Sieve of Eratosthenes";
        this.tier = 1;
        this.category = "Math";
        this.description = "Efficiently finds all prime numbers up to a specified limit by iteratively marking multiples.";

        this.details = {
            complexity: {
                time: "O(n log log n)",
                space: "O(n)"
            },
            useCases: [
                "Cryptography (RSA Key Generation)",
                "Number Theory problems",
                "Generating prime number datasets efficiently"
            ],
            keyConcept: "Elimination: Instead of checking if each number is prime (slow), we assume all are prime and eliminate the ones we know are not (multiples)."
        };

        this.code = {
            python: `def sieve(n):
    primes = [True for _ in range(n + 1)]
    p = 2
    while (p * p <= n):
        if primes[p]:
            for i in range(p * p, n + 1, p):
                primes[i] = False
        p += 1
    return primes`,
            javascript: `function sieve(n) {
    const primes = new Array(n + 1).fill(true);
    let p = 2;
    while (p * p <= n) {
        if (primes[p]) {
            for (let i = p * p; i <= n; i += p) {
                primes[i] = false;
            }
        }
        p++;
    }
    return primes;
}`,
            cpp: `void sieve(int n) {
    vector<bool> prime(n + 1, true);
    for (int p = 2; p * p <= n; p++) {
        if (prime[p]) {
            for (int i = p * p; i <= n; i += p)
                prime[i] = false;
        }
    }
}`,
            go: `func sieve(n int) []bool {
    primes := make([]bool, n+1)
    for i := range primes { primes[i] = true }
    
    for p := 2; p*p <= n; p++ {
        if primes[p] {
            for i := p * p; i <= n; i += p {
                primes[i] = false
            }
        }
    }
    return primes
}`,
            rust: `fn sieve(n: usize) -> Vec<bool> {
    let mut primes = vec![true; n + 1];
    let mut p = 2;
    while p * p <= n {
        if primes[p] {
            let mut i = p * p;
            while i <= n {
                primes[i] = false;
                i += p;
            }
        }
        p += 1;
    }
    primes
}`
        };
    }

    initialize() {
        // Grid 1 to 50
        const limit = 50;
        const values = Array.from({ length: limit }, (_, i) => i + 1);
        return { type: 'grid_values', values };
    }

    mapToVisual(data) {
        // 10x5 Grid of Spheres
        return data.values.map((value, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            return {
                id: `sphere-${value}`,
                type: 'sphere',
                value: value,
                position: [(col - 4.5) * 2.2, (4 - row) * 2.2, 0], 
                state: 'default',
            };
        });
    }

    *execute(data) {
        const n = data.values.length; // 50
        const isPrime = new Array(n + 1).fill(true);
        isPrime[0] = false;
        isPrime[1] = false;

        yield { type: 'delay', duration: 1000, narrative: "Sieve of Eratosthenes: Find primes up to 50" };

        // Mark 1 as not prime
        yield { 
            type: 'activate_sphere', 
            id: `sphere-1`,  // ← Full ID
            state: 'visited', 
            narrative: "1 is not prime by definition." 
        };

        // Phase 1: Sieving
        for (let p = 2; p * p <= n; p++) {
            
            if (isPrime[p]) {
                yield { 
                    type: 'activate_sphere', 
                    id: `sphere-${p}`,  // ← Full ID
                    state: 'active',
                    narrative: `Found Prime: ${p}. Eliminating its multiples...` 
                };
                yield { type: 'highlight_code', line: 4 };
                yield { type: 'delay', duration: 500 };

                // Mark multiples
                for (let i = p * p; i <= n; i += p) {
                    if (isPrime[i]) {
                        isPrime[i] = false;
                        
                        yield { 
                            type: 'activate_sphere', 
                            id: `sphere-${i}`,  // ← Full ID
                            state: 'right',
                            narrative: `${i} is a multiple of ${p}` 
                        };
                        yield { type: 'highlight_code', line: 6 };
                        yield { type: 'delay', duration: 80 };
                        
                        yield { type: 'activate_sphere', id: `sphere-${i}`, state: 'visited' };
                    }
                }
                
                yield { 
                    type: 'activate_sphere', 
                    id: `sphere-${p}`,  // ← Full ID
                    state: 'sorted',
                    narrative: `${p} is Prime.` 
                };
            }
        }

        // Phase 2: Reveal remaining primes
        yield { 
            type: 'delay', 
            duration: 800, 
            narrative: "All multiples eliminated. Revealing remaining primes..." 
        };

        for (let i = 2; i <= n; i++) {
            if (isPrime[i]) {
                if (i * i > n) {
                    yield { 
                        type: 'activate_sphere', 
                        id: `sphere-${i}`,  // ← Full ID
                        state: 'active',
                        narrative: `Discovered Prime: ${i}` 
                    };
                    yield { type: 'delay', duration: 150 };
                }
                
                yield { type: 'activate_sphere', id: `sphere-${i}`, state: 'sorted' };
                yield { type: 'celebrate', targets: [`sphere-${i}`] };  // ← Full ID in array
                yield { type: 'delay', duration: 50 };
            }
        }
        
        yield { type: 'complete', narrative: `Found all primes up to ${n}` };
    }
}
