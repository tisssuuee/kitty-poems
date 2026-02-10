import { motion } from 'framer-motion';

interface SplashScreenProps {
  isTransitioning?: boolean;
  onSkip?: () => void;
}

// Sakura petal shape for splash
const SplashPetal = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: '-20px' }}
    animate={{
      y: ['0vh', '105vh'],
      x: [0, Math.sin(x) * 40, -Math.sin(x) * 30, 0],
      rotate: [0, 360],
      opacity: [0, 0.7, 0.5, 0],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      delay,
      ease: 'linear',
    }}
  >
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 2C15 2 8 6 6 12C4 18 8 24 15 28C22 24 26 18 24 12C22 6 15 2 15 2Z"
        fill="rgba(255,183,213,0.5)"
      />
    </svg>
  </motion.div>
);

export const SplashScreen = ({ isTransitioning = false, onSkip }: SplashScreenProps) => {
  const handleClick = () => {
    if (onSkip && !isTransitioning) {
      onSkip();
    }
  };

  // Generate 12 sakura petals
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i * 8.3) + Math.random() * 5,
    size: 14 + Math.random() * 12,
    delay: Math.random() * 6,
  }));

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(12px)",
      }}
      transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="h-screen w-screen fixed inset-0 overflow-hidden cursor-pointer flex items-center justify-center"
      onClick={handleClick}
      style={{
        background: 'radial-gradient(ellipse at 40% 40%, #2a1020 0%, #1a0a14 50%, #120810 100%)',
      }}
    >
      {/* Soft atmospheric bokeh blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,59,122,0.12) 0%, transparent 70%)',
          top: '15%',
          left: '10%',
          filter: 'blur(60px)',
          animation: 'bokehFloat 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,183,213,0.1) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%',
          filter: 'blur(50px)',
          animation: 'bokehFloat 10s ease-in-out infinite 3s',
        }}
      />

      {/* Sakura petals floating down */}
      {petals.map(p => (
        <SplashPetal key={p.id} delay={p.delay} x={p.x} size={p.size} />
      ))}

      {/* Main content */}
      <div className="relative text-center z-10 px-6">
        {/* Decorative line above */}
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[var(--accent-sakura,#ffb7d5)]" />
          <span className="mx-3 text-lg">🌸</span>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[var(--accent-sakura,#ffb7d5)]" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 10vw, 5rem)',
            lineHeight: 1.1,
            background: 'linear-gradient(90deg, #ff3b7a, #ffb7d5, #ffffff, #ffb7d5, #ff3b7a)',
            backgroundSize: '400% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmerSweep 3s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 20px rgba(255,59,122,0.3))',
          }}
        >
          Hello, Cutie Patootie
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: 'rgba(255,183,213,0.7)',
            letterSpacing: '0.1em',
          }}
          className="mb-8"
        >
          ✨ Welcome to your magical poetry collection ✨
        </motion.p>

        {/* Floating emojis */}
        <motion.div
          className="flex justify-center items-center gap-4 md:gap-6 text-2xl md:text-3xl mb-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {['💕', '🌸', '✨', '🎀', '💖'].map((emoji, index) => (
            <motion.span
              key={index}
              animate={{
                y: [0, -12, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.3,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Tap to enter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            className="inline-block px-6 py-2.5 rounded-full"
            style={{
              background: 'rgba(255,183,213,0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,183,213,0.2)',
            }}
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: ['0 0 15px rgba(255,59,122,0.1)', '0 0 25px rgba(255,59,122,0.2)', '0 0 15px rgba(255,59,122,0.1)'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem',
                color: 'rgba(255,183,213,0.8)',
                letterSpacing: '0.1em',
              }}
            >
              tap anywhere to enter 🌸
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
