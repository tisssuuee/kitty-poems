import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import PoemPlayer from './components/PoemPlayer';
import KittyDecoration from './components/KittyDecoration';

function App() {
  return (
    <motion.div 
      className="min-h-screen pb-20 relative bg-lavender"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main className="container mx-auto px-4 pt-8">
        <motion.div
          initial={{ y: 0, scale: 1 }}
          animate={{ y: -100, scale: 0.5 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800">Poems for my cutu patootie</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold" style={{ color: '#FF69B4' }}>Riyuuuu</h2>
        </motion.div>

        <div className="flex justify-between items-center mb-12">
          <motion.img
            src="https://i.pinimg.com/736x/d6/fe/93/d6fe93c164eecbf9857982aa7d309ab3.jpg"
            alt="Hello Kitty"
            className="w-32 h-32 object-contain"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          />
          <motion.img
            src="https://i.pinimg.com/736x/d6/fe/93/d6fe93c164eecbf9857982aa7d309ab3.jpg"
            alt="Hello Kitty"
            className="w-32 h-32 object-contain"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          />
        </div>

        <PoemPlayer />
      </main>
      
      <KittyDecoration />
    </motion.div>
  );
}

export default App;