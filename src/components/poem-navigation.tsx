import React from 'react';
import { motion } from 'framer-motion';
import { Poem } from '../data/poems';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PoemNavigationProps {
  poems: Poem[];
  currentPoemIndex: number;
  onChangePoemIndex: (index: number) => void;
}

const PoemNavigation: React.FC<PoemNavigationProps> = ({
  poems,
  currentPoemIndex,
  onChangePoemIndex
}) => {
  const handlePrevious = () => {
    if (currentPoemIndex > 0) {
      onChangePoemIndex(currentPoemIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPoemIndex < poems.length - 1) {
      onChangePoemIndex(currentPoemIndex + 1);
    }
  };

  return (
    <div className="flex items-center justify-between max-w-md mx-auto mt-8">
      <motion.button
        className={`p-2 rounded bg-white bg-opacity-80 shadow-kitty text-kitty-pink-dark
                   ${currentPoemIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-kitty-pink-light'}`}
        onClick={handlePrevious}
        disabled={currentPoemIndex === 0}
      >
        <IoIosArrowBack />
      </motion.button>

      <div className="flex space-x-2">
        {poems.map((poem, index) => (
          <motion.button
            key={poem.id}
            className={`w-3 h-3 rounded-full ${currentPoemIndex === index ? `bg-[#f77fbe] ` : 'bg-white bg-opacity-50'}`}
            onClick={() => onChangePoemIndex(index)}
          />
        ))}
      </div>

      <motion.button
        className={`p-2 rounded bg-white bg-opacity-80  shadow-kitty text-kitty-pink-dark
                   ${currentPoemIndex === poems.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-kitty-pink-light'}`}
        onClick={handleNext}
        disabled={currentPoemIndex === poems.length - 1}
      >
        <IoIosArrowForward />
      </motion.button>
    </div>
  );
};

export default PoemNavigation;
