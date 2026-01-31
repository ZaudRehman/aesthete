import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StudioScene } from './core/StudioScene';
import { Pillar } from './engine/primitives/Pillar';
import { Orb } from './engine/primitives/Orb';
import { GlassTile } from './engine/primitives/GlassTile';
import { CodeCard } from './components/CodeCard';
import { NarrativeLog } from './components/NarrativeLog';
import { PlaybackControls } from './components/PlaybackControls';
import { useAlgoStore } from './store/useAlgoStore';
import { AlgorithmController } from './core/AlgorithmController';
import { BubbleSort } from './algorithms/tier1/BubbleSort';
import { useEffect, useRef } from 'react';
import { NavigationMenu } from './components/NavigationMenu';
import { Line } from '@react-three/drei'; 

function App() {
  const { visualState, currentAlgo } = useAlgoStore(); // Get currentAlgo for dynamic title
  const controllerRef = useRef(new AlgorithmController());

  useEffect(() => {
    controllerRef.current.loadAlgorithm(BubbleSort);

    const handleLoadAlgo = (e) => {
        const AlgoClass = e.detail;
        controllerRef.current.reset(); // Stop current
        setTimeout(() => {
            controllerRef.current.loadAlgorithm(AlgoClass);
        }, 100);
    };

    window.addEventListener('load-algo', handleLoadAlgo);
    return () => window.removeEventListener('load-algo', handleLoadAlgo);
  }, []);

  return (
    <div className="w-screen h-screen relative bg-[#f2f2f2] overflow-hidden">
      
      <NavigationMenu />
      
      {/* 1. Background Watermark (Dynamic) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <h1 className="font-display text-[25vw] text-black leading-none select-none uppercase truncate max-w-full text-center">
          {currentAlgo?.category ? currentAlgo.category.split(' ')[0] : 'SORT'}
        </h1>
      </div>

      {/* 2. 3D Layer (Full Screen) */}
      <div className="absolute inset-0 z-10">
        <Canvas shadows camera={{ position: [0, 8, 35], fov: 30 }} dpr={[1, 2]}>
          <StudioScene />
          
          <group position={[0, -2, 0]}>
            {visualState.entities.map((entity) => {
                // Conditional Rendering based on Entity Type
                if (entity.type === 'pillar') {
                    return (
                        <Pillar 
                            key={entity.id}
                            id={entity.id}
                            height={entity.height}
                            position={entity.position}
                            state={entity.state}
                        />
                    );
                }
                if (entity.type === 'orb') {
                    return (
                        <Orb 
                            key={entity.id}
                            position={entity.position}
                            state={entity.state}
                            label={entity.label}
                        />
                    );
                }
                if (entity.type === 'edge') {
                    return (
                        <Line 
                            key={entity.id}
                            points={entity.points}
                            color={entity.active ? "#D4AF37" : "#cccccc"}
                            lineWidth={2}
                            transparent
                            opacity={0.5}
                        />
                    );
                }
                if (entity.type === 'tile') {
                    return <GlassTile key={entity.id} {...entity} />;
                }
                return null;
            })}
          </group>
          
          <OrbitControls 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2 - 0.1} 
            minDistance={10}
            maxDistance={50}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* 3. UI Layer (On Top) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* Top Left: Title (Dynamic) */}
        <div className="absolute top-12 left-12">
          <h2 className="font-display text-6xl text-black">
            Aesthete<span className="text-[#D4AF37]">.</span>
          </h2>
          <div className="flex items-center space-x-4 mt-2">
            <div className="h-[1px] w-16 bg-black"></div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Figure {currentAlgo ? currentAlgo.tier.toString().padStart(2, '0') : '00'}: {currentAlgo?.name || 'Loading...'}
            </p>
          </div>
        </div>

        {/* Right Side: Code Card */}
        <div className="absolute top-1/2 right-12 transform -translate-y-1/2 pointer-events-auto">
           <CodeCard />
        </div>

        {/* Bottom Left: Log */}
        <div className="absolute bottom-12 left-12 pointer-events-auto">
          <NarrativeLog />
        </div>

        {/* Bottom Right: Controls */}
        <div className="absolute bottom-12 right-12 pointer-events-auto">
          <PlaybackControls controller={controllerRef.current} />
        </div>

      </div>

    </div>
  );
}

export default App;
