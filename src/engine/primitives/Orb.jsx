import { useRef } from 'react';
import { MARBLE_MATERIAL, GOLD_MATERIAL } from '../Materials'; // We will override materials locally for fine-tuning
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Local Custom Materials for Orbs
const ORB_SHELL = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.6,  // More opaque than before
    thickness: 1.0,
    clearcoat: 1.0,
    side: THREE.DoubleSide
});

const ORB_CORE_DEFAULT = new THREE.MeshStandardMaterial({
    color: 0x222222, // Dark Grey (Visible against white)
    roughness: 0.5
});

const ORB_CORE_ACTIVE = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    emissive: 0xD4AF37,
    emissiveIntensity: 2.0,
    toneMapped: false
});

export const Orb = ({ position, label, state = 'default' }) => {
    const { scale } = useSpring({
        scale: state === 'visited' || state === 'active' ? 1.2 : 1,
        config: { tension: 200, friction: 15 }
    });

    const isActive = state === 'active' || state === 'visited';

    return (
        <animated.group position={position} scale={scale}>
            {/* Outer Glass Shell */}
            <mesh material={ORB_SHELL}>
                <sphereGeometry args={[0.5, 32, 32]} />
            </mesh>

            {/* Inner Core */}
            <mesh scale={0.4} material={isActive ? ORB_CORE_ACTIVE : ORB_CORE_DEFAULT}>
                <sphereGeometry args={[1, 16, 16]} />
            </mesh>
            
            {/* Label (Optional: Floating Number) */}
             <group position={[0, 0.8, 0]}>
                {/* 
                   We'll leave it blank or add a simple dot.
                */}
            </group>

        </animated.group>
    );
};
