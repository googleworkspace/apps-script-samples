"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface IconProps {
  position: [number, number, number];
  color: string;
  label: string;
  delay: number;
}

function SocialIcon({ position, color, label, delay }: IconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      
      // Orbital rotation
      groupRef.current.position.x = Math.cos(time * 0.5) * 3;
      groupRef.current.position.z = Math.sin(time * 0.5) * 3;
      groupRef.current.position.y = Math.sin(time * 0.3) * 1.5;
      
      // Self rotation
      groupRef.current.rotation.y = time * 0.5;
    }

    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2 + delay) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox
        ref={meshRef}
        args={[0.8, 0.8, 0.2]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Glow effect */}
      <pointLight color={color} intensity={2} distance={3} />
      
      {/* Icon label */}
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
      >
        {label}
      </Text>
    </group>
  );
}

function CentralHub() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
    }

    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Main hub */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={1}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Central light */}
      <pointLight color="#00D4FF" intensity={5} distance={10} />
    </group>
  );
}

export default function OrbitingIcons() {
  const socialIcons = useMemo(() => [
    { label: 'IG', color: '#E4405F', delay: 0 },
    { label: 'WA', color: '#25D366', delay: 1 },
    { label: 'TT', color: '#000000', delay: 2 },
    { label: 'LI', color: '#0A66C2', delay: 3 },
    { label: 'YT', color: '#FF0000', delay: 4 },
    { label: 'TW', color: '#1DA1F2', delay: 5 },
  ], []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Central hub */}
      <CentralHub />
      
      {/* Orbiting social icons */}
      {socialIcons.map((icon, index) => (
        <SocialIcon
          key={index}
          position={[0, 0, 0]}
          color={icon.color}
          label={icon.label}
          delay={icon.delay}
        />
      ))}

      {/* Particle field */}
      <Stars />
    </>
  );
}

function Stars() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00D4FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
