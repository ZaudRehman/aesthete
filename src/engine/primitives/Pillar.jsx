// src/engine/primitives/Pillar.jsx
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { MARBLE_MATERIAL, GOLD_MATERIAL, ROSE_GOLD_MATERIAL } from '../Materials';

export const Pillar = ({ height, position, state = 'default', id }) => {
    
    // Fallback height to prevent crash
    const safeHeight = height || 2;

    // Make them sleeker: Width 0.8 instead of 1.2
    const WIDTH = 0.8; 
    const DEPTH = 0.8;

    const { pos } = useSpring({
        pos: position,
        config: { mass: 1, tension: 170, friction: 26 }
    });

    let activeMaterial = MARBLE_MATERIAL;
    if (state === 'compare') activeMaterial = GOLD_MATERIAL;
    if (state === 'swap') activeMaterial = ROSE_GOLD_MATERIAL;
    if (state === 'active') activeMaterial = GOLD_MATERIAL;
    if (state === 'sorted') activeMaterial = GOLD_MATERIAL;

    return (
        <animated.group position={pos}>
            {/* Main Body */}
            <mesh 
                castShadow 
                receiveShadow 
                position={[0, safeHeight / 2, 0]} 
                material={activeMaterial}
            >
                <boxGeometry args={[WIDTH, safeHeight, DEPTH]} />
            </mesh>

            {/* Gold Cap */}
            <mesh 
                castShadow 
                position={[0, safeHeight + 0.05, 0]} 
                material={GOLD_MATERIAL}
            >
                <boxGeometry args={[WIDTH + 0.05, 0.1, DEPTH + 0.05]} />
            </mesh>
            
            {/* Gold Base */}
            <mesh 
                receiveShadow 
                position={[0, 0.1, 0]} 
                material={GOLD_MATERIAL}
            >
                <boxGeometry args={[WIDTH + 0.1, 0.2, DEPTH + 0.1]} />
            </mesh>
        </animated.group>
    );
};
