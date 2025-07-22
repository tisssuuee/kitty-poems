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
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;
    
    const isDark = (typeof localStorage !== 'undefined' && localStorage.theme === "dark") ||
      (typeof localStorage !== 'undefined' && !("theme" in localStorage) &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f8fafc";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === 'undefined') return;
    
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    
    if (typeof localStorage !== 'undefined') {
      localStorage.theme = newIsDark ? "dark" : "light";
    }
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f8fafc";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  };

  const handleThemeSelect = (index: number) => {
    onPoemChange(index);
    setShowThemeSelector(false);
  };

  return (
    <div className="fixed top-4 md:top-6 right-4 md:right-6 z-50 flex items-center space-x-2 md:space-x-3">
      {/* Theme Selector */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className="relative p-2.5 md:p-3 rounded-lg md:rounded-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 active:scale-95 group overflow-hidden"
          style={{
            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
            color: poems[currentPoemIndex].theme.colors.primary,
            boxShadow: isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.1)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <FiSettings size={16} className="md:w-[18px] md:h-[18px]" />
          
          {/* Sparkly hover fill animation */}
          <motion.div
            className="absolute inset-0 rounded-lg md:rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${poems[currentPoemIndex].theme.colors.primary}20, ${poems[currentPoemIndex].theme.colors.secondary || poems[currentPoemIndex].theme.colors.primary}20)`,
              opacity: 0
            }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 }
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
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="absolute top-full right-0 mt-2 md:mt-3 p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-xl shadow-2xl border min-w-[180px] md:min-w-[200px]"
              style={{
                backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                maxHeight: '280px md:320px',
                overflowY: 'auto',
                boxShadow: isDarkMode 
                  ? '0 15px 50px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 255, 255, 0.1)' 
                  : '0 15px 50px rgba(0, 0, 0, 0.15), 0 0 25px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h3 className="text-xs md:text-sm font-medium mb-2 md:mb-3 opacity-80">Choose Theme</h3>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {poems.map((poem, index) => (
                  <motion.button
                    key={poem.id}
                    onClick={() => handleThemeSelect(index)}
                    className={`relative w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl border transition-all duration-300 group overflow-hidden ${
                      currentPoemIndex === index ? 'scale-110 shadow-lg' : 'hover:scale-105'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${poem.theme.colors.primary}, ${poem.theme.colors.secondary || poem.theme.colors.primary})`,
                      borderColor: currentPoemIndex === index 
                        ? (isDarkMode ? '#ffffff' : '#000000')
                        : 'rgba(255, 255, 255, 0.3)',
                      boxShadow: currentPoemIndex === index 
                        ? `0 4px 15px ${poem.theme.colors.primary}40` 
                        : 'none'
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={poem.theme.name}
                  >
                    {currentPoemIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-lg md:rounded-xl"
                        style={{ 
                          background: `radial-gradient(circle, ${poem.theme.colors.primary}60, transparent)`
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
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
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={toggleTheme}
          className="relative p-3 md:p-4 rounded-lg md:rounded-xl backdrop-blur-lg transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
          style={{
            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
            color: isDarkMode ? '#fbbf24' : '#6366f1',
            boxShadow: isDarkMode 
              ? '0 6px 25px rgba(251, 191, 36, 0.3), 0 0 15px rgba(251, 191, 36, 0.2)' 
              : '0 6px 25px rgba(99, 102, 241, 0.3), 0 0 15px rgba(99, 102, 241, 0.2)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: isDarkMode ? 15 : -15,
            y: -3,
            boxShadow: isDarkMode 
              ? '0 10px 35px rgba(251, 191, 36, 0.4), 0 0 20px rgba(251, 191, 36, 0.3)' 
              : '0 10px 35px rgba(99, 102, 241, 0.4), 0 0 20px rgba(99, 102, 241, 0.3)'
          }}
          whileTap={{ scale: 0.9 }}
          type="button"
        >
          {/* Icon container */}
          <motion.div
            className="relative z-10"
            animate={{
              rotate: isDarkMode ? 0 : 180,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            {isDarkMode ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <FiSun size={20} className="md:w-[22px] md:h-[22px]" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <FiMoon size={20} className="md:w-[22px] md:h-[22px]" />
              </motion.div>
            )}
          </motion.div>

          {/* Sparkly hover fill animation */}
          <motion.div
            className="absolute inset-0 rounded-lg md:rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${isDarkMode ? '#fbbf24' : '#6366f1'}20, ${isDarkMode ? '#fbbf24' : '#6366f1'}30)`,
              opacity: 0
            }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Enhanced sparkly pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-lg md:rounded-xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${isDarkMode ? '#fbbf24' : '#6366f1'}40, transparent)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
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
