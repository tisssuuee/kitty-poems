import React from 'react';
import { motion } from 'framer-motion';

const KittyDecoration: React.FC = () => {
  return (
    <>
      {/* Top left decoration */}
      <motion.div 
        className="absolute top-32 left-4 md:left-12 w-16 h-16 opacity-70 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <img 
          src="https://i.pinimg.com/736x/1b/3f/56/1b3f565f8ee06950aef43794d34fc3bc.jpg" 
          alt="Hello Kitty" 
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      {/* Bottom right decoration */}
      <motion.div 
        className="absolute bottom-24 right-4 md:right-12 w-20 h-20 opacity-70 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
      >
        <img 
          src="https://i.pinimg.com/736x/c4/7f/ce/c47fce031435eb17607f70c462a3193e.jpg" 
          alt="Hello Kitty" 
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      {/* Floating hearts */}
      <motion.div 
        className="absolute top-52 right-20 text-3xl opacity-70 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        ❤️
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 left-16 text-3xl opacity-70 pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.7 }}
      >
        💖
      </motion.div>
    </>
  );
};

export default KittyDecoration;