import React from 'react';
import { motion } from 'framer-motion';
import { Poem } from '../../data/poems';
import './index.css';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  currentPoem?: Poem;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, currentPoem }) => {
  const theme = currentPoem?.theme;
  
  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: theme?.colors.background || 'linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffcce5 100%)',
      }}
      animate={{
        background: theme?.colors.background || 'linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffcce5 100%)',
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut"
      }}
    >
      {/* Dynamic floating orbs based on theme */}
      {theme && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${40 + i * 15}px`,
            height: `${40 + i * 15}px`,
            background: `radial-gradient(circle, ${theme.gradient[0]}30 0%, ${theme.gradient[1]}20 50%, transparent 100%)`,
            left: `${5 + i * 12}%`,
            top: `${10 + i * 10}%`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.2, 0.3],
          }}
          transition={{
            duration: 12 + i * 3,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 1.2,
          }}
        />
      ))}
      
      {/* Theme-based decorative elements */}
      {theme && theme.emojis.map((emoji, i) => (
        <motion.div
          key={`${emoji}-${i}`}
          className="absolute text-2xl md:text-3xl pointer-events-none select-none opacity-60"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Subtle breathing gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme?.colors.primary}10 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      
      {/* Animated grain texture for organic feel */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'var(--grain)',
          backgroundSize: '200px 200px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '200px 200px'],
        }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      
      {children}
    </motion.div>
  );
};
