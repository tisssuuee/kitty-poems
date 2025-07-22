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
    <div className="relative w-full flex flex-col items-center mt-8 md:mt-12 px-4 pointer-events-auto poem-navigation-container">
      {/* Modern Navigation Layout */}
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Elegant Poem Dots Indicator - Top Position */}
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <motion.div 
            className="flex items-center space-x-1.5 md:space-x-2 p-2 md:p-3 rounded-xl md:rounded-2xl backdrop-blur-xl border shadow-xl"
            style={{
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              boxShadow: isDarkMode 
                ? '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1)' 
                : '0 8px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.05)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            {poems.map((poem, index) => (
              <motion.button
                key={poem.id}
                className={`relative transition-all duration-300 rounded-lg md:rounded-xl ${
                  currentPoemIndex === index 
                    ? 'w-6 md:w-8 h-2.5 md:h-3 shadow-lg' 
                    : 'w-2 md:w-3 h-2 md:h-3 hover:scale-125 hover:w-3 md:hover:w-5'
                }`}
                style={{
                  background: currentPoemIndex === index 
                    ? `linear-gradient(135deg, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.secondary || currentPoem.theme.colors.primary})`
                    : `${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}40`,
                  boxShadow: currentPoemIndex === index 
                    ? `0 0 15px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}50, 0 2px 10px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}30`
                    : 'none'
                }}
                onClick={() => onChangePoemIndex(index)}
                aria-label={`Go to poem ${index + 1}: ${poem.title}`}
                whileHover={{ scale: currentPoemIndex === index ? 1.05 : 1.2, y: -1 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentPoemIndex === index && (
                  <>
                    {/* Active indicator sparkly glow */}
                    <motion.span 
                      className="absolute inset-0 rounded-lg md:rounded-xl opacity-30" 
                      style={{ 
                        background: `radial-gradient(circle, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}60, transparent)`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Sparkly pulse ring */}
                    <motion.span 
                      className="absolute inset-[-1px] md:inset-[-2px] rounded-lg md:rounded-xl border opacity-40" 
                      style={{ 
                        borderColor: isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary,
                        borderImage: `linear-gradient(45deg, ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}, transparent) 1`
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Modern Navigation Buttons - Always Visible */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          {/* Previous Button */}
          <motion.button
            className={`group relative flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
              currentPoemIndex === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: currentPoemIndex === 0 
                ? isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                : `${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}60`,
              color: isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary,
              boxShadow: currentPoemIndex !== 0 
                ? `0 4px 20px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}20`
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
              <FiChevronLeft size={16} className="md:w-5 md:h-5" />
            </motion.div>
            
            {/* Highlight text on hover */}
            <motion.span 
              className="hidden sm:block text-xs md:text-sm font-medium relative z-10"
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

          {/* Poem Counter */}
          <div className="flex flex-col items-center px-2 md:px-4">
            <motion.div 
              className="text-center"
              key={currentPoemIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs opacity-60 font-medium">Poem</div>
              <div 
                className="text-base md:text-lg font-bold"
                style={{ 
                  color: isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary,
                  textShadow: `0 0 10px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}30`
                }}
              >
                {currentPoemIndex + 1}
              </div>
              <div className="text-xs opacity-60">of {poems.length}</div>
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            className={`group relative flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
              currentPoemIndex === poems.length - 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            }`}
            style={{ 
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: currentPoemIndex === poems.length - 1 
                ? isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                : `${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}60`,
              color: isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary,
              boxShadow: currentPoemIndex !== poems.length - 1 
                ? `0 4px 20px ${isDarkMode ? adaptiveTheme.primary : currentPoem.theme.colors.primary}20`
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
            
            {/* Highlight text on hover */}
            <motion.span 
              className="hidden sm:block text-xs md:text-sm font-medium relative z-10"
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
              <FiChevronRight size={16} className="md:w-5 md:h-5" />
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
