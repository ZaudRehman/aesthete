import { Environment, SoftShadows } from '@react-three/drei';

export const StudioScene = () => {
    return (
        <>
            <SoftShadows size={15} samples={16} focus={0.5} />

            {/* 1. Stronger Ambient Base */}
            <ambientLight intensity={1.5} color="#ffffff" />

            {/* 2. Key Light */}
            <directionalLight 
                castShadow 
                position={[10, 20, 10]} 
                intensity={2.5} 
                color="#fff0dd"
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.001}
            >
                <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
            </directionalLight>

            {/* 3. Fill Light */}
            <directionalLight position={[-10, 10, -5]} intensity={1.5} color="#eef4ff" />

            {/* 4. Floor Shadow Catcher */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.1} />
            </mesh>

            {/* 5. Simpler Environment (Studio) */}
            <Environment preset="studio" blur={1} intensity={1} />
        </>
    );
};
