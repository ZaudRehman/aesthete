import { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

export const Sphere = ({ position, value, state }) => {
    const meshRef = useRef();

    const stateColors = {
        default: '#e5e5e5',
        active: '#D4AF37',
        left: '#06b6d4',
        right: '#f97316',
        visited: '#555555', // Darker for visibility
        sorted: '#4ade80',
    };

    const stateScales = {
        default: 1.5, // Increased base scale (was 1)
        active: 2.0,  // Bigger pop
        left: 2.0,
        right: 2.0,
        visited: 1.0,
        sorted: 1.8,
    };

    const springs = useSpring({
        position: position,
        scale: stateScales[state] || 1.5,
        color: stateColors[state] || '#e5e5e5',
        emissiveIntensity: ['active', 'left', 'right', 'sorted'].includes(state) ? 0.6 : 0,
        config: { tension: 180, friction: 20 },
    });

    return (
        <animated.group position={springs.position} scale={springs.scale}>
            <animated.mesh ref={meshRef}>
                {/* Increased geometry radius from 0.35 to 0.5 */}
                <sphereGeometry args={[0.5, 32, 32]} />
                <animated.meshStandardMaterial 
                    color={springs.color}
                    emissive={springs.color}
                    emissiveIntensity={springs.emissiveIntensity}
                    roughness={0.2} // Shinier
                    metalness={0.8} // More metallic
                />
            </animated.mesh>
            
            <Text 
                position={[0, 0.9, 0]} // Moved text up slightly
                fontSize={0.6}         // Larger text
                color="#000000"
                anchorX="center"
                anchorY="middle"
            >
                {value}
            </Text>
        </animated.group>
    );
};
