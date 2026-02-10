import { useState, useEffect, useCallback } from 'react';
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

  // Mouse parallax — track mouse position as CSS custom properties
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = ((e.clientX / window.innerWidth) * 100).toFixed(1);
    const y = ((e.clientY / window.innerHeight) * 100).toFixed(1);
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowSplash(false);
      }, 800);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePoemChange = (newIndex: number) => {
    setCurrentPoemIndex(newIndex);
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
        className="min-h-screen w-full overflow-x-hidden sakura-grain sakura-bokeh"
      >
        {/* Mouse parallax atmospheric layer */}
        {!showSplash && <div className="sakura-parallax-layer" />}

        {/* Sakura petal decorations */}
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
                scale: 0.95,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <AnimatedBackground currentPoem={currentPoem}>
                <motion.div
                  className="min-h-screen relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {/* Ambient meteors */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <Meteors number={10} />
                  </motion.div>

                  <div className="relative min-h-screen z-10">
                    <motion.main
                      className="container mx-auto relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 md:pt-8 pb-32 md:pb-20 z-10 max-w-full overflow-hidden"
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

        {/* Theme toggle — only when not in splash */}
        {!showSplash && (
          <ThemeSwitcher
            currentPoemIndex={currentPoemIndex}
            onPoemChange={handlePoemChange}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
