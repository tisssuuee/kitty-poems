import { motion } from 'framer-motion';
import { AnimatedBackground } from './animated-gradient-background';
import { Meteors } from './meteors';
import { TextShimmer } from './text-shimmer';

interface SplashScreenProps {
  isTransitioning?: boolean;
  onSkip?: () => void;
}

export const SplashScreen = ({ isTransitioning = false, onSkip }: SplashScreenProps) => {
  const phrase = "HELLOO CUTIEE PATOOTIEE"
  
  // SUPER ZESTY and ZINGY rainbow colors - more vibrant!
  const rainbowColors = [
    '#ff6b9d', '#ff8c42', '#ffd93d', '#6bcf7f', 
    '#4dabf7', '#9775fa', '#f06292', '#ff7043',
    '#26c6da', '#ab47bc', '#66bb6a', '#ffca28',
    '#ef5350', '#5c6bc0', '#42a5f5', '#29b6f6',
    '#26a69a', '#9ccc65', '#d4e157', '#ffee58'
  ];

  // More fun and zesty sparkle symbols!
  const sparkleSymbols = ['✨', '💫', '⭐', '🌟', '💖', '🦋', '🌸', '🌺', '🌈', '💎', '🎀', '🌼', '🦄', '💝', '🌙', '☀️', '🎉', '🎊'];

  const sparkles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: 0.5 + Math.random() * 1.5, // Bigger sparkles!
    delay: Math.random() * 8,
    color: rainbowColors[Math.floor(Math.random() * rainbowColors.length)],
    symbol: sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)],
  }));

  // More floating geometric elements for extra zestiness!
  const geometricElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    scale: 0.4 + Math.random() * 0.8,
    delay: Math.random() * 6,
    rotation: Math.random() * 360,
  }));

  const handleClick = () => {
    if (onSkip && !isTransitioning) {
      onSkip();
    }
  };

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: "blur(8px)",
      }}
      transition={{ 
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="h-screen w-screen fixed inset-0 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Enhanced rainbow flowing background with multiple layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255,153,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(153,255,255,0.3) 0%, transparent 50%),
            linear-gradient(45deg, 
              #ff9999, #ffb366, #ffff99, #99ff99, 
              #9999ff, #cc99ff, #ff99ff, #ff99cc,
              #99ffff, #ffb3e6, #b3ffb3, #ffe066,
              #ffcce6, #e6ccff, #ccffcc, #fff0cc,
              #ff9999
            )`,
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Soft breathing overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent bg-gradient-radial from-center opacity-20" 
             style={{
               background: 'radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.1) 100%)'
             }} />
      </motion.div>

      {/* Floating geometric elements */}
      {geometricElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -60, 0], // More dramatic movement!
            x: [0, Math.sin(element.id) * 50, 0], // Wider movement
            rotate: [element.rotation, element.rotation + 720], // Double rotation!
            opacity: [0.3, 0.8, 0.3], // More visible
            scale: [element.scale, element.scale * 1.6, element.scale], // Bigger scaling
          }}
          transition={{
            duration: 8 + Math.random() * 4, // Faster animations
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-8 h-8 rounded-full" // Bigger geometric elements
            style={{
              background: `linear-gradient(45deg, ${rainbowColors[element.id % rainbowColors.length]}, ${rainbowColors[(element.id + 1) % rainbowColors.length]})`,
              filter: 'blur(0.5px) drop-shadow(0 0 12px currentColor)', // More glow!
              boxShadow: `0 0 20px ${rainbowColors[element.id % rainbowColors.length]}40`,
            }}
          />
        </motion.div>
      ))}

      {/* Enhanced rainbow meteors */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{
          opacity: isTransitioning ? 0.3 : 0.7,
          scale: isTransitioning ? 1.2 : 1,
        }}
        transition={{ duration: 0.8 }}
      >
        <Meteors number={35} />
      </motion.div>

      {/* Enhanced sparkles with varied symbols */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-3xl md:text-4xl pointer-events-none" // Bigger sparkles!
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            color: sparkle.color,
            filter: 'drop-shadow(0 0 12px currentColor) drop-shadow(0 0 20px currentColor)', // Double glow!
            textShadow: `0 0 20px ${sparkle.color}, 0 0 40px ${sparkle.color}`, // Extra sparkle!
          }}
          animate={{
            y: [0, -50, 0], // More dramatic movement
            x: [0, Math.sin(sparkle.id) * 40, 0], // Wider range
            opacity: [0.4, 1, 0.4], // Full opacity at peak
            scale: [sparkle.scale, sparkle.scale * 2, sparkle.scale], // Bigger scaling
            rotate: [0, 360, 720, 1080], // Triple rotation!
          }}
          transition={{
            duration: 5 + Math.random() * 3, // Faster and more varied
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          {sparkle.symbol}
        </motion.div>
      ))}

      {/* Main content - perfectly centered with enhanced layout */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center relative">
          {/* Decorative frame */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-white/20"
            style={{
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%',
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent)',
            }}
            animate={{
              borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)'],
              boxShadow: ['0 0 20px rgba(255,255,255,0.1)', '0 0 40px rgba(255,255,255,0.2)', '0 0 20px rgba(255,255,255,0.1)'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Main rainbow flowing title with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 2,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="mb-8 relative"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-manrope tracking-wide leading-tight"
              style={{
                background: `
                  linear-gradient(90deg, 
                    #ff9999, #ffb366, #ffff99, #99ff99, 
                    #9999ff, #cc99ff, #ff99ff, #ff99cc,
                    #99ffff, #ffb3e6, #b3ffb3, #ffe066,
                    #ffcce6, #e6ccff, #ccffcc, #fff0cc,
                    #ff9999
                  )`,
                backgroundSize: '400% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.4))',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                scale: [1, 1.02, 1],
              }}
              transition={{
                backgroundPosition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
                  >
              {phrase}
            </motion.h1>
          </motion.div>

          {/* Enhanced subtitle with elegant styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="mb-16"
          >
            <motion.p
              className="text-lg md:text-2xl font-funnel font-medium px-4"
              style={{
                background: `
                  linear-gradient(45deg, 
                    #ffffff, #f8f8f8, #ffffff, #f0f0f0, #ffffff
                  )`,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                },
                opacity: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              ✨ Welcome to your magical poetry collection ✨
            </motion.p>
          </motion.div>

          {/* Enhanced floating emojis in a more organic layout */}
          <motion.div
            className="flex justify-center items-center space-x-4 md:space-x-8 text-3xl md:text-4xl mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            {['🌈', '💕', '✨', '🌸', '💫', '🦋', '🌺'].map((emoji, index) => (
              <motion.span
                key={index}
                className="relative"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.6))',
                }}
              >
                {emoji}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                  }}
                />
                  </motion.span>
            ))}
          </motion.div>

          {/* Enhanced call-to-action with better positioning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: ['0 0 20px rgba(255,255,255,0.2)', '0 0 30px rgba(255,255,255,0.4)', '0 0 20px rgba(255,255,255,0.2)'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.p
                className="text-white font-inter font-medium text-base md:text-lg"
                style={{ 
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Tap anywhere to enter 🚀
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
