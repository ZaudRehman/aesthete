import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

export const GlassTile = ({ position, state = 'default', label }) => {
    
    // Aesthetic Color Palette
    const getColor = (s) => {
        switch(s) {
            case 'wall': return '#0a0a0a';    // Obsidian Wall
            case 'active': return '#D4AF37';  // Gold (Processing)
            case 'path': return '#B76E79';    // Rose Gold (Result)
            case 'visited': return '#4a5568'; // Dark Slate (Processed)
            case 'queue': return '#a0aec0';   // Light Grey (Discovered)
            default: return '#e2e8f0';        // Default (Frosted White)
        }
    };

    const getEmissive = (s) => {
        switch(s) {
            case 'active': return '#D4AF37';
            case 'path': return '#B76E79';
            default: return '#000000';
        }
    };

    const { color, emissive, scale, yPos } = useSpring({
        color: getColor(state),
        emissive: getEmissive(state),
        scale: state === 'active' || state === 'path' ? 1.1 : 1,
        yPos: state === 'wall' ? 0.25 : 0.05, // Walls stick up higher
        config: { mass: 1, tension: 200, friction: 20 }
    });

    return (
        <animated.group position={position} scale={scale}>
            
            {/* The Main Slab (Box instead of Plane) */}
            <animated.mesh 
                position-y={yPos} 
                castShadow 
                receiveShadow
            >
                {/* Width, Height (Thickness), Depth */}
                <boxGeometry args={[0.95, 0.1, 0.95]} />
                
                <animated.meshPhysicalMaterial 
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={state === 'active' || state === 'path' ? 0.5 : 0}
                    metalness={0.1}
                    roughness={0.1}
                    transmission={state === 'wall' ? 0 : 0.6} // Glassy for non-walls
                    thickness={1.0}
                    clearcoat={1.0}
                />
            </animated.mesh>

            {/* Inner "Core" for Walls (to make them solid black) */}
            {state === 'wall' && (
                <mesh position-y={0.25}>
                    <boxGeometry args={[0.9, 0.4, 0.9]} />
                    <meshStandardMaterial color="#000" roughness={0.9} />
                </mesh>
            )}

        </animated.group>
    );
};
