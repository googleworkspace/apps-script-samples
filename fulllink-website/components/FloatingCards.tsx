"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

function Card({ title, description, icon, delay }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        className="absolute inset-0 bg-gradient-radial from-electric/30 to-transparent"
      />

      {/* Icon */}
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl mb-4"
      >
        {icon}
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3 gradient-text">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>

      {/* Animated border */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        className="absolute inset-0 rounded-2xl border-2 border-electric pointer-events-none"
      />
    </motion.div>
  );
}

export default function FloatingCards() {
  const cards = [
    {
      title: "One Link",
      description: "Combine all your social media, websites, and contact information into a single, powerful link.",
      icon: "🔗",
    },
    {
      title: "Customizable",
      description: "Design your page to match your brand with custom themes, colors, and layouts.",
      icon: "🎨",
    },
    {
      title: "Analytics",
      description: "Track clicks, views, and engagement with detailed analytics and insights.",
      icon: "📊",
    },
    {
      title: "Fast & Secure",
      description: "Lightning-fast loading times with enterprise-grade security for your data.",
      icon: "⚡",
    },
    {
      title: "Mobile First",
      description: "Optimized for mobile devices to ensure the best experience for your audience.",
      icon: "📱",
    },
    {
      title: "Easy Setup",
      description: "Get started in minutes with our intuitive interface and simple setup process.",
      icon: "✨",
    },
  ];

  return (
    <section className="min-h-screen py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
            Why Choose Full Link?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to create a powerful digital presence in one place
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
