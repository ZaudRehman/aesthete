// src/engine/primitives/Pillar.jsx
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { MARBLE_MATERIAL, GOLD_MATERIAL, ROSE_GOLD_MATERIAL, LEFT_MATERIAL, RIGHT_MATERIAL } from '../Materials';
import * as THREE from 'three';

// Create a specific Red Material for negative values
const NEGATIVE_MATERIAL = new THREE.MeshStandardMaterial({
    color: '#ef4444', // Red-500
    roughness: 0.2,
    metalness: 0.1,
});

const VISITED_MATERIAL = new THREE.MeshStandardMaterial({
    color: '#60a5fa', // Blue-400
    roughness: 0.4,
    metalness: 0.2,
});

export const Pillar = ({ height, position, state = 'default', id, value }) => {
    
    // Fallback height to prevent crash
    const safeHeight = height ? Math.abs(height) : 2;
    const isNegative = value < 0; // Use the value prop to check sign

    // Make them sleeker: Width 0.8 instead of 1.2
    const WIDTH = 0.8; 
    const DEPTH = 0.8;

    const { pos, h } = useSpring({
        pos: position,
        h: safeHeight,
        config: { mass: 1, tension: 120, friction: 16 }
    });

    // Material Logic
    let activeMaterial = MARBLE_MATERIAL;
    
    if (isNegative) activeMaterial = NEGATIVE_MATERIAL;
    
    // State overrides
    if (state === 'compare') activeMaterial = GOLD_MATERIAL;
    if (state === 'swap') activeMaterial = ROSE_GOLD_MATERIAL;
    if (state === 'active') activeMaterial = GOLD_MATERIAL;
    if (state === 'sorted') activeMaterial = GOLD_MATERIAL;
    if (state === 'left') activeMaterial = LEFT_MATERIAL;
    if (state === 'right') activeMaterial = RIGHT_MATERIAL;
    if (state === 'visited') activeMaterial = VISITED_MATERIAL;

    // Calculate Y-offset:
    // If Positive: Center is at h/2
    // If Negative: Center is at -h/2
    const yCenter = val => isNegative ? -val / 2 : val / 2;
    
    // Cap Position:
    // If Positive: h + 0.05
    // If Negative: -h - 0.05
    const capY = val => isNegative ? -val - 0.05 : val + 0.05;

    return (
        <animated.group position={pos}>
            {/* Main Body */}
            <animated.mesh 
                castShadow 
                receiveShadow 
                position-y={h.to(yCenter)} 
                scale-y={h}
                material={activeMaterial}
            >
                <boxGeometry args={[WIDTH, 1, DEPTH]} />
            </animated.mesh>

            {/* Cap (Rides on top/bottom) */}
            <animated.mesh 
                position-y={h.to(capY)} 
                material={isNegative ? NEGATIVE_MATERIAL : GOLD_MATERIAL}
                castShadow
            >
                <boxGeometry args={[WIDTH + 0.05, 0.1, DEPTH + 0.05]} />
            </animated.mesh>
            
            {/* Base (Static at origin) */}
            <mesh 
                receiveShadow 
                position-y={0} 
                material={GOLD_MATERIAL}
            >
                <boxGeometry args={[WIDTH + 0.1, 0.1, DEPTH + 0.1]} />
            </mesh>

        </animated.group>
    );
};
