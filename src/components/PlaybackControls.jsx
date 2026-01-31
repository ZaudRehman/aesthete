import { useAlgoStore } from '../store/useAlgoStore';

export const PlaybackControls = ({ controller }) => {
    const { isPlaying, isPaused, speed, setSpeed } = useAlgoStore();

    return (
        <div className="flex flex-col items-end space-y-4">
            {/* Speed Dial */}
            <div className="flex space-x-4 font-tech text-[9px] uppercase tracking-widest text-gray-400">
                {[0.5, 1.0, 2.0].map(s => (
                    <button 
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={`hover:text-black transition-colors ${speed === s ? 'text-black border-b border-black' : ''}`}
                    >
                        {s}x
                    </button>
                ))}
            </div>

            {/* Main Controls */}
            <div className="flex items-center space-x-8">
                <button 
                    onClick={() => controller.reset()}
                    className="font-display text-lg text-gray-400 hover:text-black transition-colors italic"
                >
                    Reset
                </button>

                <button 
                    onClick={isPlaying && !isPaused ? () => controller.pause() : () => controller.play()}
                    className="font-display text-2xl text-black hover:text-[#D4AF37] transition-colors"
                >
                    {isPlaying && !isPaused ? "Pause" : "Initiate"}
                </button>
            </div>
        </div>
    );
};
