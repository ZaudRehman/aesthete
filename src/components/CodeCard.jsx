import { useAlgoStore } from '../store/useAlgoStore';
import { useEffect, useState, useRef } from 'react';

export const CodeCard = () => {
    const { currentAlgo, visualState, language, setLanguage } = useAlgoStore();
    const [codeLines, setCodeLines] = useState([]);
    const scrollRef = useRef(null);

    // Available languages list
    const languages = ['rust', 'python', 'cpp', 'go', 'javascript'];

    useEffect(() => {
        if (currentAlgo?.code) {
            // Check if we have code for the selected language, else fallback
            const snippet = currentAlgo.code[language] || currentAlgo.code['rust'] || "Code unavailable";
            setCodeLines(snippet.split('\n'));
        }
    }, [currentAlgo, language]);

    // Auto-scroll logic (keep existing)
    useEffect(() => {
        if (visualState.highlightedCode && scrollRef.current) {
            const activeEl = scrollRef.current.children[visualState.highlightedCode - 1];
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [visualState.highlightedCode]);

    return (
        <div className="w-96 text-right animate-enter">
            {/* Header / Language Switcher */}
            <div className="mb-6 border-b border-black/10 pb-2 flex justify-end items-baseline space-x-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mr-auto">
                    Algorithmic Logic
                </span>
                
                {languages.map(lang => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`font-mono text-[9px] uppercase tracking-wider transition-colors 
                            ${language === lang ? 'text-black font-bold border-b border-black' : 'text-gray-300 hover:text-gray-500'}`}
                    >
                        {lang === 'cpp' ? 'C++' : lang}
                    </button>
                ))}
            </div>
            
            {/* Code Display */}
            <div className="h-[50vh] overflow-y-auto pr-2" ref={scrollRef}>
                <div className="font-mono text-xs leading-loose text-gray-500 whitespace-pre">
                    {codeLines.map((line, idx) => (
                        <div 
                            key={idx}
                            className={`code-line ${visualState.highlightedCode === idx + 1 ? 'code-active' : ''}`}
                        >
                            {line || ' '}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
