import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

export const GlassTile = ({ position, state = 'default', customColor, label }) => {
    
    // Aesthetic Color Palette
    const getColor = (s) => {
        // Priority 1: Direct override (used by Flood Fill for Water/Gold)
        if (customColor) return customColor;

        // Priority 2: State-based theme
        switch(s) {
            case 'wall': 
            case 'obstacle': return '#0a0a0a';    // Obsidian Wall
            case 'active': return '#D4AF37';      // Gold (Processing)
            case 'path': return '#B76E79';        // Rose Gold (Result)
            case 'visited': return '#4a5568';     // Dark Slate (Processed)
            case 'queue': return '#a0aec0';       // Light Grey (Discovered)
            case 'success': 
            case 'sorted': return '#10b981';      // Emerald (Generic Success)
            default: return '#e2e8f0';            // Default (Frosted White)
        }
    };

    const getEmissive = (s) => {
        // If it's a "glowing" state with a custom color, use that color for emission
        if (customColor && (s === 'active' || s === 'success' || s === 'sorted')) {
            return customColor;
        }

        switch(s) {
            case 'active': return '#D4AF37';
            case 'path': return '#B76E79';
            case 'success':
            case 'sorted': return '#10b981';
            default: return '#000000';
        }
    };

    // Define which states should glow
    const isGlowing = ['active', 'path', 'success', 'sorted'].includes(state);
    const isWall = state === 'wall' || state === 'obstacle';

    const { color, emissive, scale, yPos } = useSpring({
        color: getColor(state),
        emissive: getEmissive(state),
        scale: isGlowing ? 1.1 : 1,
        yPos: isWall ? 0.25 : 0.05, // Walls stick up higher
        config: { mass: 1, tension: 200, friction: 20 }
    });

    return (
        <animated.group position={position} scale={scale}>
            
            {/* The Main Slab */}
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
                    emissiveIntensity={isGlowing ? 0.5 : 0}
                    metalness={0.1}
                    roughness={0.1}
                    transmission={isWall ? 0 : 0.6} // Glassy for non-walls
                    thickness={1.0}
                    clearcoat={1.0}
                />
            </animated.mesh>

            {/* Inner "Core" for Walls (to make them solid black) */}
            {isWall && (
                <mesh position-y={0.25}>
                    <boxGeometry args={[0.9, 0.4, 0.9]} />
                    <meshStandardMaterial color="#000" roughness={0.9} />
                </mesh>
            )}

        </animated.group>
    );
};
