import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeSwitcherProps {
  currentPoemIndex: number;
  onPoemChange: (index: number) => void;
}

export const ThemeSwitcher = ({ currentPoemIndex, onPoemChange }: ThemeSwitcherProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDark = (typeof localStorage !== 'undefined' && localStorage.theme === "dark") ||
      (typeof localStorage !== 'undefined' && !("theme" in localStorage) &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#1a0a14";
      document.body.style.color = "#f8e8f0";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#fff0f5";
      document.body.style.color = "#2d1f2b";
    }
  };

  const toggleTheme = () => {
    if (typeof window === 'undefined') return;
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    if (typeof localStorage !== 'undefined') {
      localStorage.theme = newIsDark ? "dark" : "light";
    }
    applyTheme(newIsDark);
  };

  return (
    <div className="fixed top-4 md:top-6 right-4 md:right-6 z-50">
      {/* Frosted pill toggle */}
      <motion.button
        onClick={toggleTheme}
        className="relative flex items-center overflow-hidden"
        style={{
          width: '72px',
          height: '36px',
          borderRadius: '100px',
          background: isDarkMode
            ? 'rgba(255, 182, 210, 0.1)'
            : 'rgba(255, 182, 210, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 182, 210, 0.25)',
          boxShadow: isDarkMode
            ? '0 4px 24px rgba(255, 59, 122, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 24px rgba(255, 59, 122, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
          cursor: 'pointer',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        type="button"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {/* Sliding indicator */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '28px',
            height: '28px',
            top: '3px',
            background: 'linear-gradient(135deg, var(--accent-hot), #ff6b9d)',
            boxShadow: '0 2px 8px rgba(255, 59, 122, 0.4)',
          }}
          animate={{
            left: isDarkMode ? '40px' : '4px',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />

        {/* Sun icon */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
          }}
        >
          <FiSun
            size={14}
            style={{
              color: isDarkMode ? 'var(--text-muted)' : '#fff',
              transition: 'color 0.3s ease',
            }}
          />
        </div>

        {/* Moon icon */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
          }}
        >
          <FiMoon
            size={14}
            style={{
              color: isDarkMode ? '#fff' : 'var(--text-muted)',
              transition: 'color 0.3s ease',
            }}
          />
        </div>
      </motion.button>
    </div>
  );
};
