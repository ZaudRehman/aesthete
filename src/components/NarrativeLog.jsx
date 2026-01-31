import { useAlgoStore } from '../store/useAlgoStore';

export const NarrativeLog = () => {
    const { visualState } = useAlgoStore();

    return (
        <div className="flex flex-col items-start">
            <span className="font-tech text-[9px] uppercase tracking-widest text-gray-400 mb-2">
                System Status
            </span>
            <div className="font-tech text-xs text-black border-l border-[#D4AF37] pl-3 h-12 flex items-center max-w-md">
                {visualState.narrative || "Ready."}
            </div>
        </div>
    );
};
