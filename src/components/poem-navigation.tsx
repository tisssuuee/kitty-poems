import React from 'react';
import { motion } from 'framer-motion';
import { Poem } from '../data/poems';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getReadableTextColor } from '../lib/utils';

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
  const currentPoem = poems[currentPoemIndex];
  const textColor = getReadableTextColor(currentPoem.theme, 'primary');

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
    <div className="flex flex-col items-center space-y-3 mt-6">
      {/* Main navigation */}
      <motion.div 
        className="flex items-center justify-center space-x-8 w-full max-w-xs"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      >
        {/* Previous Button */}
        <motion.button
          className={`relative p-2 rounded-full border transition-all duration-200 ${
            currentPoemIndex === 0 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:scale-105 active:scale-95'
          }`}
          style={{
            backgroundColor: `${currentPoem.theme.colors.primary}15`,
            borderColor: `${currentPoem.theme.colors.primary}30`,
            color: currentPoem.theme.colors.primary,
          }}
          onClick={handlePrevious}
          disabled={currentPoemIndex === 0}
          whileHover={{ scale: currentPoemIndex === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentPoemIndex === 0 ? 1 : 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <FiChevronLeft size={18} />
        </motion.button>

        {/* Poem counter */}
        <motion.div
          className="flex items-center space-x-2 px-4 py-2 rounded-full border"
          style={{
            backgroundColor: `${currentPoem.theme.colors.primary}10`,
            borderColor: `${currentPoem.theme.colors.primary}20`,
            color: textColor,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <span className="text-sm font-semibold">
            {currentPoemIndex + 1}
          </span>
          <div className="flex space-x-1">
            <motion.div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: currentPoem.theme.colors.primary }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </div>
          <span className="text-sm font-semibold">
            {poems.length}
          </span>
        </motion.div>

        {/* Next Button */}
        <motion.button
          className={`relative p-2 rounded-full border transition-all duration-200 ${
            currentPoemIndex === poems.length - 1 
              ? 'opacity-40 cursor-not-allowed' 
              : 'hover:scale-105 active:scale-95'
          }`}
          style={{
            backgroundColor: `${currentPoem.theme.colors.primary}15`,
            borderColor: `${currentPoem.theme.colors.primary}30`,
            color: currentPoem.theme.colors.primary,
          }}
          onClick={handleNext}
          disabled={currentPoemIndex === poems.length - 1}
          whileHover={{ scale: currentPoemIndex === poems.length - 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentPoemIndex === poems.length - 1 ? 1 : 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <FiChevronRight size={18} />
        </motion.button>
      </motion.div>

      {/* Poem dots indicator */}
      <motion.div 
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full"
        style={{
          backgroundColor: `${currentPoem.theme.colors.primary}8`,
          border: `1px solid ${currentPoem.theme.colors.primary}15`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        {poems.map((poem, index) => (
          <motion.button
            key={poem.id}
            className={`relative w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              currentPoemIndex === index 
                ? 'scale-125' 
                : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: currentPoemIndex === index 
                ? currentPoem.theme.colors.primary 
                : `${currentPoem.theme.colors.primary}30`,
            }}
            onClick={() => onChangePoemIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: currentPoemIndex === index ? 1.25 : 1 }}
            transition={{ 
              delay: 0.7 + (index * 0.02),
              duration: 0.15,
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            {/* Active glow effect */}
            {currentPoemIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ 
                  backgroundColor: currentPoem.theme.colors.primary,
                  filter: 'blur(2px)',
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default PoemNavigation;
