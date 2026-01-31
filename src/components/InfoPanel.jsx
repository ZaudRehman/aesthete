export const InfoPanel = ({ algorithm, onClose }) => {
    if (!algorithm) return null;

    const { name, description, details } = algorithm;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose}></div>
            
            <div className="bg-[#f2f2f2] w-full max-w-2xl shadow-2xl border border-white/50 p-8 relative z-10 animate-in zoom-in-95 duration-300">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="font-display text-4xl mb-2 text-black">{name}</h2>
                        <p className="font-sans text-gray-600 text-lg leading-relaxed max-w-lg">
                            {description}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer group"
                        title="Close"
                    >
                        <span className="text-2xl font-mono text-gray-400 group-hover:text-black transition-colors">×</span>
                    </button>
                </div>

                {details ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left Column: Stats */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">Complexity</h3>
                                <div className="flex space-x-4">
                                    <div className="bg-white px-4 py-2 border border-gray-200 flex-1">
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Time</span>
                                        <span className="font-mono text-lg text-black">{details.complexity?.time || "N/A"}</span>
                                    </div>
                                    <div className="bg-white px-4 py-2 border border-gray-200 flex-1">
                                        <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-1">Space</span>
                                        <span className="font-mono text-lg text-black">{details.complexity?.space || "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">Key Concept</h3>
                                <div className="font-sans text-gray-800 bg-[#fffdf0] p-4 border-l-2 border-[#D4AF37] text-sm leading-relaxed">
                                    {details.keyConcept}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Use Cases */}
                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">Real-World Utility</h3>
                            <ul className="space-y-3">
                                {details.useCases?.map((useCase, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-600">
                                        <span className="text-[#D4AF37] mr-3 mt-1">→</span>
                                        <span className="leading-snug">{useCase}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-400 italic text-center py-8 bg-gray-50 border border-gray-100 rounded-lg">
                        Detailed analysis coming soon.
                    </div>
                )}
            </div>
        </div>
    );
};
