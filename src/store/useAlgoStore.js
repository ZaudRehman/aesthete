import { create } from 'zustand';

export const useAlgoStore = create((set, get) => ({
    // Current Algorithm
    currentAlgo: null,
    
    // Playback State
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    
    // Animation Control
    speed: 1.0, // 0.25x to 2x
    currentStep: 0,
    totalSteps: 0,
    
    // Visual State (The "Frame Buffer")
    visualState: {
        entities: [], // Array of { id, type, position, state, value }
        activeIndices: [],
        highlightedCode: null,
        narrative: "System Initialized"
    },

    // Language State
    language: 'rust',
    
    // Actions
    setAlgorithm: (algo) => set({ currentAlgo: algo }),

    setLanguage: (lang) => set({ language: lang }),
    
    play: () => set({ isPlaying: true, isPaused: false }),
    pause: () => set({ isPlaying: false, isPaused: true }),
    reset: () => set({ 
        isPlaying: false, 
        isPaused: false, 
        isComplete: false,
        currentStep: 0,
        visualState: { entities: [], activeIndices: [], highlightedCode: null, narrative: "Reset" }
    }),
    
    setSpeed: (speed) => set({ speed }),
    
    updateVisualState: (newState) => set({ 
        visualState: { ...get().visualState, ...newState }
    }),
    
    nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, state.totalSteps)
    })),
    
    setTotalSteps: (total) => set({ totalSteps: total }),
    setComplete: () => set({ isComplete: true, isPlaying: false })
}));
