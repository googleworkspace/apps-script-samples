"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FlowingLine({ start, end, color, delay }: { start: THREE.Vector3; end: THREE.Vector3; color: string; delay: number }) {
  const lineRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      const opacity = (Math.sin(state.clock.getElapsedTime() * 2 + delay) + 1) / 2;
      materialRef.current.opacity = opacity * 0.8;
    }
  });

  const points = [];
  const segments = 20;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = start.x + (end.x - start.x) * t;
    const y = start.y + (end.y - start.y) * t + Math.sin(t * Math.PI) * 0.5;
    const z = start.z + (end.z - start.z) * t;
    points.push(new THREE.Vector3(x, y, z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.8}
        linewidth={2}
      />
    </line>
  );
}

function Node({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        metalness={0.8}
        roughness={0.2}
      />
      <pointLight color={color} intensity={2} distance={2} />
    </mesh>
  );
}

export default function ConnectionFlow() {
  const nodes = [
    { pos: [-3, 2, 0] as [number, number, number], color: '#E4405F' },
    { pos: [-2, -1, 0] as [number, number, number], color: '#25D366' },
    { pos: [0, 2.5, 0] as [number, number, number], color: '#0A66C2' },
    { pos: [2, -1, 0] as [number, number, number], color: '#FF0000' },
    { pos: [3, 1.5, 0] as [number, number, number], color: '#1DA1F2' },
    { pos: [0, 0, 0] as [number, number, number], color: '#00D4FF' },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={1} />

      {/* Nodes */}
      {nodes.map((node, index) => (
        <Node key={index} position={node.pos} color={node.color} />
      ))}

      {/* Connecting lines to center */}
      {nodes.slice(0, -1).map((node, index) => (
        <FlowingLine
          key={index}
          start={new THREE.Vector3(...node.pos)}
          end={new THREE.Vector3(0, 0, 0)}
          color={node.color}
          delay={index * 0.5}
        />
      ))}
    </>
  );
}
