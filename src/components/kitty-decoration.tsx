import React from 'react';
import { motion } from 'framer-motion';
import { Poem } from '../data/poems';

interface KittyDecorationProps {
  currentPoem?: Poem;
}

const KittyDecoration: React.FC<KittyDecorationProps> = ({ currentPoem }) => {
  const theme = currentPoem?.theme;
  
  const decorativeElements = theme?.emojis || ['💖', '✨', '🌸', '💫'];
  
  return (
    <>
      {/* Enhanced Kitty decorations with better animations - mobile optimized */}
      <motion.div
        className="absolute top-4 md:top-32 left-2 md:left-12 w-10 h-10 md:w-16 md:h-16 opacity-70 md:opacity-80 pointer-events-none"
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut",
          rotate: { duration: 4 }
        }}
        whileHover={{ scale: 1.2 }}
      >
        <img
          src="https://i.pinimg.com/736x/1b/3f/56/1b3f565f8ee06950aef43794d34fc3bc.jpg"
          alt="Hello Kitty"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 md:bottom-24 right-2 md:right-12 w-12 h-12 md:w-20 md:h-20 opacity-70 md:opacity-80 pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3.5, 
          ease: "easeInOut",
          delay: 0.5,
          rotate: { duration: 4.5 }
        }}
        whileHover={{ scale: 1.2 }}
      >
        <img
          src="https://i.pinimg.com/736x/c4/7f/ce/c47fce031435eb17607f70c462a3193e.jpg"
          alt="Hello Kitty"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Theme-based floating elements - mobile optimized */}
      {decorativeElements.slice(0, 4).map((element, index) => {
        const positions = [
          { x: 'left-2 md:left-16', y: 'top-16 md:top-52' },
          { x: 'right-4 md:right-20', y: 'top-12 md:top-40' },
          { x: 'left-4 md:left-32', y: 'bottom-40 md:bottom-32' },
          { x: 'right-2 md:right-8', y: 'bottom-44 md:bottom-48' },
        ];
        
        return (
          <motion.div
            key={`${element}-${index}`}
            className={`absolute ${positions[index]?.x} ${positions[index]?.y} text-sm md:text-2xl pointer-events-none select-none`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              y: [0, -15, 0],
              rotate: [0, 15, -15, 0],
              scale: [0.6, 1.0, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4 + (index * 0.5), 
              ease: "easeInOut",
              delay: index * 0.3,
              opacity: { duration: 3 },
              rotate: { duration: 6 }
            }}
            style={{
              color: theme?.colors.primary || '#ff69b4',
              filter: `drop-shadow(0 0 8px ${theme?.colors.primary || '#ff69b4'}20)`,
            }}
          >
            {element}
          </motion.div>
        );
      })}

      {/* Flowing themed elements that move across the screen - mobile optimized */}
      <motion.div
        className="absolute top-1/4 -left-8 text-sm md:text-xl pointer-events-none select-none opacity-60 md:opacity-100"
        style={{ color: theme?.colors.secondary || '#ffb6c1' }}
        animate={{
          x: ['0vw', '100vw'],
          y: [0, -15, 0, -8, 0],
          rotate: [0, 360],
          scale: [0.3, 0.8, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
          delay: 2,
        }}
      >
        {decorativeElements[0]}
      </motion.div>

      <motion.div
        className="absolute top-3/4 -right-8 text-xs md:text-lg pointer-events-none select-none opacity-60 md:opacity-100"
        style={{ color: theme?.colors.accent || '#ff1493' }}
        animate={{
          x: ['0vw', '-100vw'],
          y: [0, -12, 0, -3, 0],
          rotate: [0, -360],
          scale: [0.2, 0.6, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "linear",
          delay: 10,
        }}
      >
        {decorativeElements[1]}
      </motion.div>

      {/* Corner decorative elements with theme colors */}
      <motion.div
        className="absolute top-2 md:top-8 left-2 md:left-8 text-xs md:text-sm pointer-events-none select-none"
        style={{ color: theme?.colors.secondary || '#ffb6c1' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      >
        🌙
      </motion.div>

      <motion.div
        className="absolute bottom-2 md:bottom-8 right-2 md:right-8 text-xs md:text-sm pointer-events-none select-none"
        style={{ color: theme?.colors.accent || '#ff1493' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.9, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        ⭐
      </motion.div>
    </>
  );
};

export default KittyDecoration;
