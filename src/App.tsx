import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitcher } from './components/theme-switcher';
import { AnimatedBackground } from './components/ui/animated-gradient-background';
import PoemPlayer from './components/poem-player';
import KittyDecoration from './components/kitty-decoration';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5500); // 5.5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen"
          >
            <AnimatedBackground>
              <div className="flex justify-center items-center gap-x-4 dark:text-white h-full">
                <div className="font-funnel text-5xl">
                  <span className="mr-4">Hello cutieeee patootie</span>
                  <ThemeSwitcher />
                </div>
              </div>
            </AnimatedBackground>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedBackground>
              <div className="relative min-h-screen">
                {/* Theme Switcher in top-right corner */}
                <div className="absolute top-12 right-12">
                  <ThemeSwitcher />
                </div>

                <main className="container mx-auto px-4 pt-8 pb-20">
                  <motion.div
                    initial={{ opacity: 1, scale: 1}}
                    animate={{ opacity: 1, scale: 0.6 }}
                    transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
                    className="text-center mb-8"
                  >
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 font-funnel">
                      Poems for my cutu patootie
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ 
                      opacity: 1, 
                      x: [0, 20, 0, -20, 0] // Wiggle left to right
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 4, // Slow and graceful
                        ease: "easeInOut",
                      },
                      opacity: {
                        duration: 0.5,
                        delay: 1.5,
                      },
                    }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-6xl font-bold font-funnel" style={{ color: '#F77FBE' }}>
                      Riyuuuu
                    </h2>
                  </motion.div>

                  <PoemPlayer />
                </main>
                <KittyDecoration />
              </div>
            </AnimatedBackground>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;