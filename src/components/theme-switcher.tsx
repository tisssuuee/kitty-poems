import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiSettings } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { poems } from "../data/poems";

interface ThemeSwitcherProps {
  currentPoemIndex: number;
  onPoemChange: (index: number) => void;
}

export const ThemeSwitcher = ({ currentPoemIndex, onPoemChange }: ThemeSwitcherProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  useEffect(() => {
    const isDark = localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    localStorage.theme = newIsDark ? "dark" : "light";
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleThemeSelect = (index: number) => {
    onPoemChange(index);
    setShowThemeSelector(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
      {/* Theme Selector */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className="relative p-3 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
            color: poems[currentPoemIndex].theme.colors.primary,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <FiSettings size={20} />
          
          {/* Theme indicator glow */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundColor: poems[currentPoemIndex].theme.colors.primary,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>

        {/* Theme selector dropdown */}
        <AnimatePresence>
          {showThemeSelector && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 p-2 rounded-lg border backdrop-blur-md shadow-lg"
              style={{
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                maxHeight: '300px',
                overflowY: 'auto',
                width: '200px',
              }}
            >
              <div className="grid grid-cols-4 gap-2">
                {poems.map((poem, index) => (
                  <motion.button
                    key={poem.id}
                    onClick={() => handleThemeSelect(index)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      currentPoemIndex === index ? 'scale-110' : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: poem.theme.colors.primary,
                      borderColor: currentPoemIndex === index 
                        ? (isDarkMode ? '#ffffff' : '#000000')
                        : 'transparent',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={poem.theme.name}
                  >
                    {currentPoemIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: poem.theme.colors.primary }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dark/Light Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.button
          onClick={toggleTheme}
          className="relative p-3 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
            color: isDarkMode ? '#fbbf24' : '#6366f1',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          {/* Icon container */}
          <motion.div
            className="relative z-10"
            animate={{
              rotate: isDarkMode ? 0 : 180,
            }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            {isDarkMode ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiSun size={20} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiMoon size={20} />
              </motion.div>
            )}
          </motion.div>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundColor: isDarkMode ? '#fbbf24' : '#6366f1',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};
