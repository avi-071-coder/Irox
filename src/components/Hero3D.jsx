import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural Compute Cluster using InstancedMesh for extreme performance
export default function Hero3D() {
  const meshRef = useRef();
  const { viewport } = useThree();
  const [scrollY, setScrollY] = useState(0);
  
  const NODE_COUNT = 300;
  
  // Pre-calculate positions for the architecture
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nodeData = useMemo(() => {
    const data = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // Create a structured cylindrical matrix
      const radius = 2 + Math.random() * 2;
      const theta = (i / NODE_COUNT) * Math.PI * 10;
      const y = (Math.random() - 0.5) * 8;
      
      data.push({
        baseX: radius * Math.cos(theta),
        baseY: y,
        baseZ: radius * Math.sin(theta),
        speed: 0.1 + Math.random() * 0.3,
        scaleOffset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Mouse Interaction
    const mouseX = (state.pointer.x * Math.PI) / 8;
    const mouseY = -(state.pointer.y * Math.PI) / 8;
    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.05);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.05);

    // Scroll Physics: Expand and tokenize the cluster as user scrolls
    const scrollExpansion = Math.min(scrollY * 0.005, 5); 
    const scrollTwist = scrollY * 0.001;

    // Evolve the entire cluster
    meshRef.current.rotation.x = targetRotation.current.x + scrollTwist;
    meshRef.current.rotation.y = (time * 0.05) + targetRotation.current.y + (scrollTwist * 1.5);
    meshRef.current.position.y = scrollY * 0.002;

    // Animate individual nodes in the InstancedMesh
    nodeData.forEach((node, i) => {
      // Nodes expand outward based on scroll depth
      const expansionFactor = 1 + scrollExpansion;
      
      dummy.position.set(
        node.baseX * expansionFactor,
        node.baseY,
        node.baseZ * expansionFactor
      );
      
      // Procedural pulsing scale
      const s = 0.5 + Math.sin(time * node.speed + node.scaleOffset) * 0.3;
      dummy.scale.set(s, s, s);
      
      // All nodes orient to face the center of the cylinder to look mechanical
      dummy.lookAt(0, dummy.position.y, 0);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const clusterScale = useMemo(() => Math.min(viewport.width * 0.15, 2.5), [viewport.width]);

  return (
    <group position={[viewport.width > 10 ? viewport.width * 0.25 : 0, 0, -5]}>
      <ambientLight intensity={1.5} color="#114C5A" />
      <directionalLight position={[10, 10, 5]} intensity={3.5} color="#FFC801" />
      <directionalLight position={[-10, -10, -5]} intensity={2.0} color="#D1EBE2" />

      {/* Autonomous Compute Cluster (InstancedMesh) */}
      <instancedMesh ref={meshRef} args={[null, null, NODE_COUNT]} scale={clusterScale}>
        <boxGeometry args={[0.3, 0.1, 0.5]} />
        <meshPhysicalMaterial 
          color="#172B36"
          emissive="#114C5A"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
          transmission={0.4} 
          thickness={0.5}
          ior={1.5}
          transparent={true}
          opacity={0.8}
        />
      </instancedMesh>
    </group>
  );
}
