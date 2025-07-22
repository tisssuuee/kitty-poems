import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Poem } from '../data/poems';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getAdaptiveThemeColors } from '../lib/utils';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const adaptiveTheme = getAdaptiveThemeColors(currentPoem.theme.colors, isDarkMode);

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
        <div className="relative w-full flex flex-col items-center mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4 md:px-6 pointer-events-auto poem-navigation-container">
      {/* Simplified Navigation Layout - Just Buttons and Counter */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        
        {/* Enhanced Navigation Buttons - More Visible in All Views */}
        <div className="flex items-center justify-between w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
          {/* Previous Button */}
          <motion.button
            className={`group relative flex items-center space-x-1 sm:space-x-2 md:space-x-3 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
              currentPoemIndex === 0 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: currentPoemIndex === 0 
                ? isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                : `${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}80`,
              color: isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary,
              boxShadow: currentPoemIndex !== 0 
                ? `0 4px 20px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}25`
                : 'none'
            }}
            onClick={handlePrevious}
            disabled={currentPoemIndex === 0}
            aria-label="Previous Poem"
            whileHover={currentPoemIndex !== 0 ? { scale: 1.05, x: -3 } : {}}
            whileTap={currentPoemIndex !== 0 ? { scale: 0.95 } : {}}
          >
            {/* Sparkly fill-up animation background */}
            {currentPoemIndex !== 0 && (
              <motion.div
                className="absolute inset-0 rounded-xl md:rounded-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}15, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}25)`,
                  opacity: 0
                }}
                whileHover={{
                  opacity: 1,
                  background: `linear-gradient(135deg, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}20, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}40)`,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                initial={{ scale: 0, opacity: 0 }}
              />
            )}
            
            <motion.div
              className="relative z-10"
              whileHover={currentPoemIndex !== 0 ? {
                x: -2,
                transition: { duration: 0.2 }
              } : {}}
            >
              <FiChevronLeft size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.div>
            
            {/* Always visible text */}
            <motion.span 
              className="text-xs sm:text-sm md:text-base font-semibold relative z-10"
              whileHover={currentPoemIndex !== 0 ? {
                color: isDarkMode ? '#ffffff' : currentPoem.theme.colors.primary,
                textShadow: `0 0 8px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}50`,
                transition: { duration: 0.2 }
              } : {}}
            >
              Previous
            </motion.span>
            
            {/* Sparkly pulse effect */}
            {currentPoemIndex !== 0 && (
              <motion.div
                className="absolute inset-0 rounded-xl md:rounded-2xl opacity-10"
                style={{ 
                  background: `radial-gradient(circle, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}30, transparent)`
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.button>

          {/* Poem Counter - Compact */}
          <div className="flex flex-col items-center px-2 sm:px-3 md:px-4">
            <motion.div 
              className="text-center"
              key={currentPoemIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs opacity-60 font-medium">Poem</div>
              <div 
                className="text-sm sm:text-base md:text-lg font-bold"
                style={{ 
                  color: isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary,
                  textShadow: `0 0 8px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}25`
                }}
              >
                {currentPoemIndex + 1}
              </div>
              <div className="text-xs opacity-60">of {poems.length}</div>
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            className={`group relative flex items-center space-x-1 sm:space-x-2 md:space-x-3 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
              currentPoemIndex === poems.length - 1 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: currentPoemIndex === poems.length - 1 
                ? isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                : `${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}80`,
              color: isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary,
              boxShadow: currentPoemIndex !== poems.length - 1 
                ? `0 4px 20px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}25`
                : 'none'
            }}
            onClick={handleNext}
            disabled={currentPoemIndex === poems.length - 1}
            aria-label="Next Poem"
            whileHover={currentPoemIndex !== poems.length - 1 ? { scale: 1.05, x: 3 } : {}}
            whileTap={currentPoemIndex !== poems.length - 1 ? { scale: 0.95 } : {}}
          >
            {/* Sparkly fill-up animation background */}
            {currentPoemIndex !== poems.length - 1 && (
              <motion.div
                className="absolute inset-0 rounded-xl md:rounded-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}15, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}25)`,
                  opacity: 0
                }}
                whileHover={{
                  opacity: 1,
                  background: `linear-gradient(135deg, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}20, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}40)`,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                initial={{ scale: 0, opacity: 0 }}
              />
            )}
            
            {/* Always visible text */}
            <motion.span 
              className="text-xs sm:text-sm md:text-base font-semibold relative z-10"
              whileHover={currentPoemIndex !== poems.length - 1 ? {
                color: isDarkMode ? '#ffffff' : currentPoem.theme.colors.primary,
                textShadow: `0 0 8px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}50`,
                transition: { duration: 0.2 }
              } : {}}
            >
              Next
            </motion.span>
            
            <motion.div
              className="relative z-10"
              whileHover={currentPoemIndex !== poems.length - 1 ? {
                x: 2,
                transition: { duration: 0.2 }
              } : {}}
            >
              <FiChevronRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.div>
            
            {/* Sparkly pulse effect */}
            {currentPoemIndex !== poems.length - 1 && (
              <motion.div
                className="absolute inset-0 rounded-xl md:rounded-2xl opacity-10"
                style={{ 
                  background: `radial-gradient(circle, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}30, transparent)`
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PoemNavigation;
