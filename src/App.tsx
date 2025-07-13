import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitcher } from './components/theme-switcher';
import { AnimatedBackground } from './components/ui/animated-gradient-background';
import { Meteors } from './components/ui/meteors';
import PoemPlayer from './components/poem-player';
import KittyDecoration from './components/kitty-decoration';
import ErrorBoundary from './components/ErrorBoundary';
import { SplashScreen } from './components/ui/splash-screen';
import { Header } from './components/ui/header';
import { poems } from './data/poems';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  
  const currentPoem = poems[currentPoemIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      // Delay the actual content switch for smoother transition
      setTimeout(() => {
        setShowSplash(false);
      }, 800); // Give time for exit animation
    }, 5000); // Changed to 5 seconds for the mesmerizing experience

    return () => clearTimeout(timer);
  }, []);

  const handlePoemChange = (newIndex: number) => {
    setCurrentPoemIndex(newIndex);
  };

  const handleSkipSplash = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowSplash(false);
      }, 800);
    }
  };

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen 
            key="splash" 
            isTransitioning={isTransitioning} 
            onSkip={handleSkipSplash}
          />
        ) : (
          <motion.div
            key="main-app"
            initial={{ 
              opacity: 0,
              scale: 0.8,
              filter: "blur(10px)",
              rotateY: -15
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              rotateY: 0
            }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1
            }}
          >
            <AnimatedBackground currentPoem={currentPoem}>
              <motion.div
                className="min-h-screen relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Magical meteors for ambient effect - themed colors */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <Meteors number={15} />
                </motion.div>

                <div className="relative min-h-screen z-10">
                  <motion.main 
                    className="container mx-auto relative px-4 pt-6 md:pt-8 pb-24 md:pb-20 z-10"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <Header currentPoem={currentPoem} />
                    <PoemPlayer onPoemChange={handlePoemChange} />
                  </motion.main>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8, type: "spring" }}
                  >
                    <KittyDecoration currentPoem={currentPoem} />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedBackground>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Fixed theme switcher - only show when not in splash screen */}
      {!showSplash && <ThemeSwitcher currentPoemIndex={currentPoemIndex} onPoemChange={handlePoemChange} />}
    </ErrorBoundary>
  );
}

export default App;
