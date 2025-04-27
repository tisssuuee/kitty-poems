import { motion } from 'framer-motion';
import { AnimatedBackground } from './animated-gradient-background';
import { ThemeSwitcher } from '../theme-switcher';

export const SplashScreen = () => {
  const phrase = "Hello cutieee patootie"
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen"
    >
      <AnimatedBackground>
        <div className="flex justify-center items-center gap-x-4 dark:text-white h-full">
          <div className="font-funnel text-5xl whitespace-pre">
            <div className="mr-4 inline">
              {phrase.split('').map((letter, key) => {
                return (
                  <motion.span
                    key={key}
                    initial={{ y: 0 }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      delay: key * 0.1,
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className='inline-block'
                  >
                    {letter}
                  </motion.span>
                )
              })}
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </AnimatedBackground>
    </motion.div>
  )
}
