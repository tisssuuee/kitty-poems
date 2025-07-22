import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitcher } from './components/theme-switcher';
import { AnimatedBackground } from './components/ui/animated-gradient-background';
import { Meteors } from './components/ui/meteors';
import { MagicalCursor } from './components/ui/magical-cursor';
import { HelloKittyDecorations } from './components/ui/hello-kitty-decorations';
import PoemPlayer from './components/poem-player';
import KittyDecoration from './components/kitty-decoration';
import ErrorBoundary from './components/ErrorBoundary';
import { SplashScreen } from './components/ui/splash-screen';
import { Header } from './components/ui/header';
import { poems } from './data/poems';
import { useThemeSystem } from './hooks/useThemeSystem';
import { useMagicalParticles } from './hooks/useMagicalParticles';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  
  const currentPoem = poems[currentPoemIndex];
  const { currentTheme, getThemeCSS } = useThemeSystem(currentPoemIndex);
  const { canvasRef, addBurstParticles } = useMagicalParticles(!showSplash, currentTheme);

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
    
    // Add magical particle burst on poem change
    setTimeout(() => {
      if (addBurstParticles) {
        addBurstParticles(window.innerWidth / 2, window.innerHeight / 2, 15);
      }
    }, 100);
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
      <div 
        style={getThemeCSS()}
        className="min-h-screen w-full overflow-x-hidden"
      >
        {/* Hello Kitty Decorations */}
        {!showSplash && <HelloKittyDecorations />}
        
        {/* Magical cursor */}
        <MagicalCursor />
        
        {/* Magical particle canvas */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-40"
          style={{ mixBlendMode: 'screen' }}
        />
        
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
                    className="container mx-auto relative px-6 sm:px-8 pt-6 md:pt-8 pb-32 md:pb-20 z-10 max-w-full overflow-hidden"
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
      </div>
    </ErrorBoundary>
  );
}

export default App;
