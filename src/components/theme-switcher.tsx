import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleTheme() {
    const toggledTheme = !isDarkMode;
    setIsDarkMode(toggledTheme);
    localStorage.theme = toggledTheme ? "dark" : "light";
    document.documentElement.classList.toggle("dark", toggledTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded"
      type="button"
    >
      {isDarkMode ? (
        <FiSun size={25} />
      ) : (
        <FiMoon size={25} />
      )}
    </button>
  );
};
