import { useState, useEffect } from 'react';
import { useAlgoStore } from '../store/useAlgoStore';

// TIER 1 IMPORTS
import { BubbleSort } from '../algorithms/tier1/BubbleSort';
import { SelectionSort } from '../algorithms/tier1/SelectionSort';
import { InsertionSort } from '../algorithms/tier1/InsertionSort';
import { BinarySearch } from '../algorithms/tier1/BinarySearch';
import { ReverseArray } from '../algorithms/tier1/ReverseArray';
import { TwoPointers } from '../algorithms/tier1/TwoPointers';
import { SlidingWindowMax } from '../algorithms/tier1/SlidingWindowMax';
import { KadaneAlgo } from '../algorithms/tier1/KadaneAlgo';
import { DutchFlag } from '../algorithms/tier1/DutchFlag';
import { BoyerMoore } from '../algorithms/tier1/BoyerMoore';
import { SieveOfEratosthenes } from '../algorithms/tier1/SieveOfEratosthenes';

// TIER 2 IMPORTS
import { QuickSort } from '../algorithms/tier2/QuickSort';
import { MergeSort } from '../algorithms/tier2/MergeSort';
import { HeapSort } from '../algorithms/tier2/HeapSort';
import { BFS } from '../algorithms/tier2/BFS';
import { DFS } from '../algorithms/tier2/DFS';
import { FloodFill } from '../algorithms/tier2/FloodFill';
import { TopologicalSort } from '../algorithms/tier2/TopologicalSort';
import { HouseRobber } from '../algorithms/tier2/HouseRobber';
import { CoinChange } from '../algorithms/tier2/CoinChange';
import { LongestIncreasingSubsequence } from '../algorithms/tier2/LongestIncreasingSubsequence';
import { LongestCommonSubsequence } from '../algorithms/tier2/LongestCommonSubsequence';
import { Knapsack } from '../algorithms/tier2/Knapsack';

// TIER 3 IMPORTS
import { DijkstraGrid } from '../algorithms/tier3/DijkstraGrid';
import { AStarGrid } from '../algorithms/tier3/AStarGrid';

// ALGORITHM REGISTRY (Structured by Tier → Category → Algorithms)
const ALGORITHM_CATALOG = {
    tier1: {
        title: "Tier 1: Essentials",
        subtitle: "The Foundations",
        categories: {
            arrays: {
                title: "Arrays & Strings",
                algorithms: [
                    { name: "Binary Search", class: BinarySearch, id: 'binary' },
                    { name: "Reverse Array", class: ReverseArray, id: 'reverse' },
                    { name: "Two Pointers", class: TwoPointers, id: 'twopointers' },
                    { name: "Sliding Window", class: SlidingWindowMax, id: 'sliding' },
                    { name: "Kadane's Algorithm", class: KadaneAlgo, id: 'kadane' },
                    { name: "Dutch Flag", class: DutchFlag, id: 'dutch' },
                    { name: "Boyer-Moore Voting", class: BoyerMoore, id: 'boyer' },
                    { name: "Sieve of Eratosthenes", class: SieveOfEratosthenes, id: 'sieve' },
                ]
            },
            sorting: {
                title: "Basic Sorting",
                algorithms: [
                    { name: "Bubble Sort", class: BubbleSort, id: 'bubble' },
                    { name: "Selection Sort", class: SelectionSort, id: 'selection' },
                    { name: "Insertion Sort", class: InsertionSort, id: 'insertion' },
                ]
            }
        }
    },
    tier2: {
        title: (
            <>
                Tier 2:<br/>The Core
            </>
        ),
        subtitle: "Interview Standards",
        categories: {
            advancedSorting: {
                title: "Advanced Sorting",
                algorithms: [
                    { name: "Merge Sort", class: MergeSort, id: 'merge' },
                    { name: "Quick Sort", class: QuickSort, id: 'quick' },
                    { name: "Heap Sort", class: HeapSort, id: 'heap' },
                ]
            },
            graphs: {
                title: "Graph Theory",
                algorithms: [
                    { name: "Breadth-First Search", class: BFS, id: 'bfs' },
                    { name: "Depth-First Search", class: DFS, id: 'dfs' },
                    { name: "Flood Fill", class: FloodFill, id: 'flood' },
                    { name: "Topological Sort (Kahn's Algorithm)", class: TopologicalSort, id: 'topo' },
                ]
            },
            dp: {
                title: "Dynamic Programming",
                algorithms: [
                    { name: "House Robber", class: HouseRobber, id: 'house' },
                    { name: "Coin Change", class: CoinChange, id: 'coin' },
                    { name: "Longest Increasing Subsequence", class: LongestIncreasingSubsequence, id: 'lis' },
                    { name: "Longest Common Subsequence", class: LongestCommonSubsequence, id: 'lcs' },
                    { name: "0/1 Knapsack Problem", class: Knapsack, id: 'knapsack' },
                ]
            }
        }
    },
    tier3: {
        title: "Tier 3: Specialist",
        subtitle: "High Performance",
        categories: {
            pathfinding: {
                title: "Pathfinding",
                algorithms: [
                    { name: "Dijkstra (Grid)", class: DijkstraGrid, id: 'dijkstra' },
                    { name: "A* Search", class: AStarGrid, id: 'astar' },
                ]
            }
        }
    }
};

// Helper to flatten all algorithms for next/prev navigation
const getAllAlgorithms = () => {
    const all = [];
    Object.values(ALGORITHM_CATALOG).forEach(tier => {
        Object.values(tier.categories).forEach(category => {
            all.push(...category.algorithms);
        });
    });
    return all;
};

// MAIN NAVIGATION MENU
export const NavigationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentAlgo } = useAlgoStore();
    
    const allAlgorithms = getAllAlgorithms();
    
    const loadAlgo = (AlgoClass) => {
        if (!AlgoClass) return;
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('load-algo', { detail: AlgoClass }));
    };
    
    const handleNav = (direction) => {
        const idx = allAlgorithms.findIndex(
            a => a.name === currentAlgo?.name || (currentAlgo?.constructor && a.class === currentAlgo.constructor)
        );
        const currentIdx = idx === -1 ? 0 : idx;
        const nextIdx = direction === 'next' 
            ? (currentIdx + 1) % allAlgorithms.length
            : (currentIdx - 1 + allAlgorithms.length) % allAlgorithms.length;
        loadAlgo(allAlgorithms[nextIdx].class);
    };
    
    // Keyboard Shortcuts
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') handleNav('next');
            if (e.key === 'ArrowLeft') handleNav('prev');
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key === 'i' && e.ctrlKey) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [currentAlgo, isOpen]);
    
    return (
        <>
            {/* 1. Main Trigger Button (Only visible when menu is CLOSED) */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed top-12 right-12 z-[50] group flex items-center space-x-3 cursor-pointer transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <span className="font-display text-lg text-black group-hover:tracking-widest transition-all duration-300">
                    Index
                </span>
                <div className="w-8 h-8 border border-black flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <span className="text-xs">☰</span>
                </div>
            </button>

            {/* 2. Quick Nav Arrows (Bottom Center) */}
            {!isOpen && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-12 z-[40]">
                    <button onClick={() => handleNav('prev')} className="group flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="font-display text-2xl">←</span>
                        <span className="font-mono text-[10px] tracking-widest uppercase hidden group-hover:block">Prev</span>
                    </button>
                    <button onClick={() => handleNav('next')} className="group flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="font-display text-2xl">→</span>
                        <span className="font-mono text-[10px] tracking-widest uppercase hidden group-hover:block">Next</span>
                    </button>
                </div>
            )}

            {/* 3. The Full Screen Menu Overlay */}
            <div className={`fixed inset-0 z-[100] bg-[#f2f2f2] transition-transform duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}`}>
                
                {/* Close Button (Absolute Top Right of Overlay) */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-12 right-12 font-display text-lg flex items-center space-x-3 group cursor-pointer"
                >
                    <span className="group-hover:tracking-widest transition-all">Close</span>
                    <div className="w-8 h-8 border border-black flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-all">
                        <span className="text-xl leading-none mb-1">×</span>
                    </div>
                </button>

                <div className="container mx-auto h-full flex items-center justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 w-full max-w-6xl px-12">
                        
                        {/* Left: Watermark (Current Selection) */}
                        <div className="hidden md:flex flex-col justify-center">
                            <h2 className="font-display text-[12vw] leading-none text-gray-200 select-none opacity-50">
                                INDEX
                            </h2>
                            <p className="font-mono text-sm tracking-widest text-gray-400 mt-8 uppercase">
                                {allAlgorithms.length} Algorithms Available
                            </p>
                        </div>

                        {/* Right: The List */}
                        <div className="h-[70vh] overflow-y-auto pr-8 no-scrollbar pb-32">
                            {Object.entries(ALGORITHM_CATALOG).map(([key, tier]) => (
                                <div key={key} className="mb-32 last:mb-0">
                                    
                                    {/* TIER HEADER - High Contrast & Sticky */}
                                    <div className="sticky top-0 bg-[#f2f2f2] z-10 py-6 border-b-2 border-black mb-12">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                                            <div className="flex items-baseline gap-4">
                                                <span className="font-mono text-xl text-[#D4AF37] font-bold">
                                                    {tier.id}.
                                                </span>
                                                <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-black">
                                                    {tier.title}
                                                </h3>
                                            </div>
                                            <span className="font-mono text-xs tracking-[0.15em] uppercase text-gray-500 pb-1">
                                                {tier.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* CATEGORIES LOOP */}
                                    <div className="space-y-16 pl-2 md:pl-12"> {/* Indent content for hierarchy */}
                                        {Object.entries(tier.categories).map(([catKey, category]) => (
                                            <div key={catKey}>
                                                {/* Category Subheader */}
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="h-px w-8 bg-gray-300"></div>
                                                    <h4 className="font-mono text-sm font-bold uppercase tracking-widest text-gray-400">
                                                        {category.title}
                                                    </h4>
                                                </div>
                                                
                                                {/* Algorithms List */}
                                                <div className="space-y-3 pl-12 border-l border-gray-200">
                                                    {category.algorithms.map((algo) => (
                                                        <button
                                                            key={algo.id}
                                                            onClick={() => loadAlgo(algo.class)}
                                                            className="group block w-full text-left py-1"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className={`font-display text-2xl md:text-3xl transition-all duration-300 ${
                                                                    currentAlgo?.name === algo.name 
                                                                        ? 'text-black translate-x-2 font-bold' 
                                                                        : 'text-gray-500 group-hover:text-black group-hover:translate-x-2'
                                                                }`}>
                                                                    {algo.name}
                                                                </span>
                                                                
                                                                {/* Hover Indicator */}
                                                                <span className={`text-xl text-[#D4AF37] transition-opacity duration-300 ${
                                                                    currentAlgo?.name === algo.name
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0 group-hover:opacity-100'
                                                                }`}>
                                                                    ←
                                                                </span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
