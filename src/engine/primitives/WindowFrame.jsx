import { useSpring, animated } from '@react-spring/three';
import { useMemo } from 'react';

export const WindowFrame = ({ position, width, height = 5 }) => {
    const springs = useSpring({
        position: position,
        config: { tension: 120, friction: 14 }
    });

    // Create a subtle pulsing effect for the frame
    const { glowIntensity } = useSpring({
        from: { glowIntensity: 0.3 },
        to: { glowIntensity: 0.6 },
        loop: { reverse: true },
        config: { duration: 1500 }
    });

    return (
        <animated.group position={springs.position}>
            {/* Main Glass Box */}
            <mesh position-y={height / 2}>
                <boxGeometry args={[width, height, 1.2]} />
                <meshStandardMaterial 
                    color="#06b6d4"
                    transparent 
                    opacity={0.12} 
                    roughness={0.05}
                    metalness={0.3}
                    envMapIntensity={1.5}
                />
            </mesh>
            
            {/* Glowing Edge Frame (Top & Bottom) */}
            <mesh position={[0, height, 0]}>
                <boxGeometry args={[width + 0.1, 0.08, 1.3]} />
                <animated.meshBasicMaterial 
                    color="#06b6d4"
                    transparent
                    opacity={glowIntensity}
                />
            </mesh>
            
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[width + 0.1, 0.08, 1.3]} />
                <animated.meshBasicMaterial 
                    color="#06b6d4"
                    transparent
                    opacity={glowIntensity}
                />
            </mesh>

            {/* Left & Right Edge Bars */}
            <mesh position={[-width / 2, height / 2, 0]}>
                <boxGeometry args={[0.08, height, 1.3]} />
                <animated.meshBasicMaterial 
                    color="#06b6d4"
                    transparent
                    opacity={glowIntensity}
                />
            </mesh>

            <mesh position={[width / 2, height / 2, 0]}>
                <boxGeometry args={[0.08, height, 1.3]} />
                <animated.meshBasicMaterial 
                    color="#06b6d4"
                    transparent
                    opacity={glowIntensity}
                />
            </mesh>
            
            {/* Subtle Wireframe for Depth */}
            <mesh position-y={height / 2}>
                <boxGeometry args={[width, height, 1.2]} /> 
                <meshBasicMaterial 
                    wireframe 
                    color="#22d3ee" 
                    opacity={0.3} 
                    transparent 
                />
            </mesh>
        </animated.group>
    );
};
