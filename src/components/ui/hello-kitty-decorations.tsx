'use client';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  duration: number;
}

export const HelloKittyDecorations = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  const emojis = ['🌸', '💖', '✨', '🎀', '🐱', '💕', '🌺', '🦋', '🌟', '💫'];

  useEffect(() => {
    // Create floating elements
    const createElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0.5 + Math.random() * 0.8,
          duration: 8 + Math.random() * 12,
        });
      }
      setElements(newElements);
    };

    createElements();
    const interval = setInterval(() => {
      createElements();
    }, 15000); // Refresh elements every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-2xl opacity-30"
          initial={{
            x: element.x,
            y: window.innerHeight + 50,
            scale: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: -100,
            scale: element.scale,
            rotate: 360,
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: element.duration,
            ease: "easeOut",
            times: [0, 0.1, 0.8, 1],
          }}
          style={{
            left: element.x,
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
      
      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 text-6xl opacity-20"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🌸
      </motion.div>
      
      <motion.div
        className="absolute top-8 right-8 text-5xl opacity-20"
        animate={{
          rotate: [0, -15, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        🎀
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 left-8 text-4xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        💖
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 right-8 text-5xl opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        🐱
      </motion.div>
    </div>
  );
};
