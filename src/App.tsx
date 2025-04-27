import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitcher } from './components/theme-switcher';
import { AnimatedBackground } from './components/ui/animated-gradient-background';
import PoemPlayer from './components/poem-player';
import KittyDecoration from './components/kitty-decoration';
import ErrorBoundary from './components/ErrorBoundary';
import { SplashScreen } from './components/ui/splash-screen';
import { Header } from './components/ui/header';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen />
        ) : (
          <AnimatedBackground>
            <motion.div
              key="main"
              className="min-h-screen relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative min-h-screen">
                <div className="absolute dark:text-white top-12 right-12">
                  <ThemeSwitcher />
                </div>

                <main className="container mx-auto px-4 pt-8 pb-20">
                  <Header />
                  <PoemPlayer />
                </main>

                <KittyDecoration />
              </div>
            </motion.div>
          </AnimatedBackground>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
