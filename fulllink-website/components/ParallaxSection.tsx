"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ConnectionFlow from './ConnectionFlow';

interface SectionProps {
  title: string;
  description: string;
  features: string[];
  index: number;
}

function FeatureSection({ title, description, features, index }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold gradient-text"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-2 h-2 bg-electric rounded-full group-hover:scale-150 transition-smooth"></div>
                <span className="text-lg text-gray-200 group-hover:text-electric transition-smooth">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3D Visualization */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`h-96 glass rounded-2xl overflow-hidden ${index % 2 === 1 ? 'md:order-1' : ''}`}
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <Suspense fallback={null}>
              <ConnectionFlow />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ParallaxSections() {
  const sections = [
    {
      title: "For Businesses",
      description: "Streamline your digital presence and make it easy for customers to find everything they need in one place.",
      features: [
        "Centralize all business links",
        "Track engagement analytics",
        "Custom branding options",
        "QR code generation"
      ]
    },
    {
      title: "For Influencers",
      description: "Maximize your reach by connecting all your social platforms and content in a single, shareable link.",
      features: [
        "Multi-platform integration",
        "Monetization tools",
        "Audience insights",
        "Content scheduling"
      ]
    },
    {
      title: "For Creators",
      description: "Showcase your portfolio, products, and services with a beautiful, customizable landing page.",
      features: [
        "Portfolio showcase",
        "E-commerce integration",
        "Booking system",
        "Media gallery"
      ]
    }
  ];

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <FeatureSection
          key={index}
          title={section.title}
          description={section.description}
          features={section.features}
          index={index}
        />
      ))}
    </div>
  );
}
