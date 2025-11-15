"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import OrbitingIcons from './OrbitingIcons';

export default function Hero3D() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
        
        <Suspense fallback={null}>
          <OrbitingIcons />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Hero text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
            Full Link
          </h1>
          
          <p className="text-2xl md:text-4xl font-light mb-4 gradient-text">
            Connect Your World in One Link
          </p>
          
          <p className="text-2xl md:text-4xl font-light arabic glow-text">
            ربط عالمك برابط واحد
          </p>

          <div className="mt-12 flex gap-6 justify-center pointer-events-auto">
            <button className="px-8 py-4 bg-electric text-navy font-bold rounded-full hover:bg-electric-light transition-smooth neon-border">
              Get Started
            </button>
            <button className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-smooth border border-white/20">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-electric rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-electric rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
