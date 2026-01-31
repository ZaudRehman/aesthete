import { useState } from 'react';
import { useAlgoStore } from '../store/useAlgoStore';
import { BubbleSort } from '../algorithms/tier1/BubbleSort';
import { BFS } from '../algorithms/tier2/BFS';
import { DFS } from '../algorithms/tier2/DFS';
import { DijkstraGrid } from '../algorithms/tier3/DijkstraGrid';
import { QuickSort } from '../algorithms/tier2/QuickSort';
import { MergeSort } from '../algorithms/tier2/MergeSort';

export const NavigationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setAlgorithm, reset } = useAlgoStore();

    // The Registry of Algorithms
    const tiers = [
        {
            title: "Series 01: Foundations",
            items: [
                { name: "Bubble Sort", class: BubbleSort, id: 'bubble' },
                { name: "Selection Sort", class: null, id: 'selection', locked: true },
                { name: "Binary Search", class: null, id: 'binary', locked: true },
                { name: "Quick Sort", class: QuickSort, id: 'quick' },
                { name: "Merge Sort", class: MergeSort, id: 'merge' },
                
            ]
        },
        {
            title: "Series 02: Graph Theory",
            items: [
                { name: "Breadth First Search", class: BFS, id: 'bfs' },
                { name: "Depth First Search", class: DFS, id: 'dfs' },
            ]
        },
        {
            title: "Series 03: Pathfinding",
            items: [
                { name: "Dijkstra's Shortest Path", class: DijkstraGrid, id: 'dijkstra_grid' },
            ]
        },
    ];

    const handleSelect = (AlgoClass) => {
        if (!AlgoClass) return;
        setIsOpen(false);
        
        window.dispatchEvent(new CustomEvent('load-algo', { detail: AlgoClass }));
    };

    return (
        <>
            {/* The Trigger Button (Top Right) */}
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed top-12 right-12 z-[9999] group flex items-center space-x-3 cursor-pointer"
            >
                <span className="font-display text-lg text-black group-hover:tracking-widest transition-all duration-300">
                    Index
                </span>
                <div className="w-8 h-8 border border-black flex items-center justify-center rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <span className="text-xs">☰</span>
                </div>
            </button>

            {/* The Overlay */}
            <div className={`fixed inset-0 z-[100] bg-[#f2f2f2] transition-transform duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                
                {/* Close Button */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-12 right-12 font-display text-4xl hover:rotate-90 transition-transform duration-500"
                >
                    ×
                </button>

                <div className="container mx-auto h-full flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-24 w-full max-w-6xl px-12">
                        
                        {/* Left: Watermark */}
                        <div className="hidden md:block">
                            <h2 className="font-display text-[12vw] leading-none text-gray-200 select-none">
                                INDEX
                            </h2>
                        </div>

                        {/* Right: The List */}
                        <div className="h-[70vh] overflow-y-auto pr-8">
                            {tiers.map((tier, idx) => (
                                <div key={idx} className="mb-16">
                                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-gray-200 pb-2">
                                        {tier.title}
                                    </h3>
                                    <div className="space-y-4">
                                        {tier.items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => !item.locked && handleSelect(item.class)}
                                                disabled={item.locked}
                                                className={`group flex items-center w-full text-left transition-all duration-300
                                                    ${item.locked ? 'opacity-30 cursor-not-allowed' : 'hover:translate-x-4 cursor-pointer'}
                                                `}
                                            >
                                                <span className={`font-display text-4xl ${item.locked ? 'text-gray-400' : 'text-black group-hover:text-[#D4AF37]'}`}>
                                                    {item.name}
                                                </span>
                                                {!item.locked && (
                                                    <span className="ml-4 opacity-0 group-hover:opacity-100 text-[#D4AF37] text-xl">→</span>
                                                )}
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
