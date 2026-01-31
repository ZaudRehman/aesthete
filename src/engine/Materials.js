import * as THREE from 'three';

// 1. Polished Marble (Adjusted for visibility)
export const MARBLE_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.2, // Increased from 0.1 so it catches diffuse light
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide
});

// 2. Brushed Gold (Adjusted)
export const GOLD_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    metalness: 0.8, // Reduced from 1.0
    roughness: 0.3, // Increased from 0.15
    emissive: 0xD4AF37,
    emissiveIntensity: 0.1 // Slight glow to ensure visibility
});

// 3. Rose Gold (Adjusted)
export const ROSE_GOLD_MATERIAL = new THREE.MeshStandardMaterial({
    color: 0xB76E79,
    metalness: 0.8,
    roughness: 0.3,
    emissive: 0xB76E79,
    emissiveIntensity: 0.1
});
