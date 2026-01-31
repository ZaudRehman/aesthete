import { useState, useEffect } from 'react';
import { useAlgoStore } from '../store/useAlgoStore';

import { BubbleSort } from '../algorithms/tier1/BubbleSort';
import { SelectionSort } from '../algorithms/tier1/SelectionSort';
import { InsertionSort } from '../algorithms/tier1/InsertionSort';
import { BinarySearch } from '../algorithms/tier1/BinarySearch';
import { ReverseArray } from '../algorithms/tier1/ReverseArray';
import { TwoPointers } from '../algorithms/tier1/TwoPointers';
import { KadaneAlgo } from '../algorithms/tier1/KadaneAlgo';
import { DutchFlag } from '../algorithms/tier1/DutchFlag';
import { BoyerMoore } from '../algorithms/tier1/BoyerMoore';

import { QuickSort } from '../algorithms/tier2/QuickSort';
import { MergeSort } from '../algorithms/tier2/MergeSort';
import { BFS } from '../algorithms/tier2/BFS';
import { DFS } from '../algorithms/tier2/DFS';

import { DijkstraGrid } from '../algorithms/tier3/DijkstraGrid';
import { AStarGrid } from '../algorithms/tier3/AStarGrid';

export const NavigationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentAlgo } = useAlgoStore();

    // Flattened list for "Next/Prev" logic
    const allItems = [
        { name: "Bubble Sort", class: BubbleSort, id: 'bubble' },
        { name: "Selection Sort", class: SelectionSort, id: 'selection' },
        { name: "Insertion Sort", class: InsertionSort, id: 'insertion' },
        { name: "Quick Sort", class: QuickSort, id: 'quick' },
        { name: "Merge Sort", class: MergeSort, id: 'merge' },
        { name: "Binary Search", class: BinarySearch, id: 'binary' },
        { name: "Reverse Array", class: ReverseArray, id: 'reverse' },
        { name: "Two Pointers (Sum)", class: TwoPointers, id: 'twosum' },
        { name: "Kadane's Algo", class: KadaneAlgo, id: 'kadane' },
        { name: "Dutch National Flag", class: DutchFlag, id: 'dutch' },
        { name: "Boyer-Moore Voting", class: BoyerMoore, id: 'boyer' },
        { name: "Breadth First Search", class: BFS, id: 'bfs' },
        { name: "Depth First Search", class: DFS, id: 'dfs' },
        { name: "Dijkstra (Grid)", class: DijkstraGrid, id: 'dijkstra_grid' },
        { name: "A* Search", class: AStarGrid, id: 'astar' },
    ];

    const tiers = [
        { title: "Foundations", items: allItems.slice(0, 11) },
        { title: "Graph Theory", items: allItems.slice(11, 13) },
        { title: "Pathfinding", items: allItems.slice(13, 15) },
    ];

    const loadAlgo = (AlgoClass) => {
        if (!AlgoClass) return;
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('load-algo', { detail: AlgoClass }));
    };

    const handlePrev = () => {
        // Find index based on ID (safer than name) or fallback to name
        const idx = allItems.findIndex(i => 
            i.name === currentAlgo?.name || 
            (currentAlgo?.constructor && i.class === currentAlgo.constructor)
        );
        
        // If not found (idx -1), default to 0
        const currentIdx = idx === -1 ? 0 : idx;
        
        // Calculate Prev Index wrapping around
        const prevIdx = (currentIdx - 1 + allItems.length) % allItems.length;
        
        loadAlgo(allItems[prevIdx].class);
    };

    const handleNext = () => {
        const idx = allItems.findIndex(i => 
             i.name === currentAlgo?.name || 
            (currentAlgo?.constructor && i.class === currentAlgo.constructor)
        );
        const currentIdx = idx === -1 ? 0 : idx;
        const nextIdx = (currentIdx + 1) % allItems.length;
        
        loadAlgo(allItems[nextIdx].class);
    };


    // Keyboard Shortcuts
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [currentAlgo]);

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
                    <button onClick={handlePrev} className="group flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="font-display text-2xl">←</span>
                        <span className="font-mono text-[10px] tracking-widest uppercase hidden group-hover:block">Prev</span>
                    </button>
                    <button onClick={handleNext} className="group flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity">
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
                        
                        {/* Left: Watermark */}
                        <div className="hidden md:block">
                            <h2 className="font-display text-[12vw] leading-none text-gray-200 select-none">
                                INDEX
                            </h2>
                        </div>

                        {/* Right: The List */}
                        <div className="h-[70vh] overflow-y-auto pr-8 no-scrollbar">
                            {tiers.map((tier, idx) => (
                                <div key={idx} className="mb-16">
                                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-gray-200 pb-2">
                                        {tier.title}
                                    </h3>
                                    <div className="space-y-4">
                                        {tier.items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => loadAlgo(item.class)}
                                                className="group flex items-center w-full text-left cursor-pointer hover:translate-x-4 transition-transform duration-300"
                                            >
                                                <span className={`font-display text-4xl text-black group-hover:text-[#D4AF37]`}>
                                                    {item.name}
                                                </span>
                                                <span className="ml-4 opacity-0 group-hover:opacity-100 text-[#D4AF37] text-xl transition-opacity">→</span>
                                            </button>
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
