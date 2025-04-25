import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-opacity-80 backdrop-blur-md shadow-lg py-6 sticky top-0 z-10"
      style={{ backgroundColor: '#e6e6fa' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart size={24} fill="#FF91A4" className="text-pink-500" />
          <h1 className="text-2xl font-bold text-pink-500">Hello Kitty Poetry</h1>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-pink-700 hover:text-pink-500 transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="text-pink-700 hover:text-pink-500 transition-colors">Poems</a>
            </li>
            <li>
              <a href="#" className="text-pink-700 hover:text-pink-500 transition-colors relative group">
                About
                <div className="absolute hidden group-hover:block bg-matcha-green p-4 rounded-lg shadow-lg -left-20 mt-2 w-64">
                  <p className="text-gray-800 italic">
                    "with love alwayssss ~ Tissuee"
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;