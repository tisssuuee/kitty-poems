import { motion } from "framer-motion"
import { TextShimmer } from "./text-shimmer"
import { Poem } from "../../data/poems"
import { getReadableTextColor } from "../../lib/utils"

interface HeaderProps {
  currentPoem?: Poem;
}

export const Header = ({ currentPoem }: HeaderProps) => {
  const primaryTextColor = currentPoem ? getReadableTextColor(currentPoem.theme, 'primary') : '#2d3748';
  const secondaryTextColor = currentPoem ? getReadableTextColor(currentPoem.theme, 'secondary') : '#4a5568';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="text-center mb-4 md:mb-6 px-4"
      >
        <motion.div
          className="text-sm md:text-base font-semibold font-inter tracking-wide"
          style={{ 
            color: primaryTextColor,
          }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Poems for my cutu patootie
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="text-center mb-6 md:mb-8 relative"
      >
        {/* Hello Kitty inspired decorative elements */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <motion.span 
            className="text-2xl md:text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎀
          </motion.span>
          <motion.span 
            className="text-xl md:text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
          <motion.span 
            className="text-2xl md:text-3xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            🌸
          </motion.span>
        </div>
        
        <div className="relative">
          <TextShimmer
            variant="magical"
            className="text-4xl md:text-6xl font-bold font-manrope tracking-wider intensive-shimmer kitty-title"
            duration={1.5}
            shimmerWidth={200}
            style={{
              background: 'linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4, #ffc0cb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 105, 180, 0.5)',
              filter: 'drop-shadow(0 4px 8px rgba(255, 105, 180, 0.3))'
            }}
          >
            💕 Riyuuuu 💕
          </TextShimmer>
          
          {/* Floating kitty elements */}
          <motion.div
            className="absolute -right-4 md:-right-8 top-0 text-2xl md:text-3xl"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            🐱
          </motion.div>
          
          <motion.div
            className="absolute -left-4 md:-left-8 bottom-0 text-xl md:text-2xl"
            animate={{ 
              y: [0, -8, 0],
              x: [0, 2, 0]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5 
            }}
          >
            💖
          </motion.div>
        </div>
        
        {/* Subtitle with Hello Kitty vibes */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="text-sm md:text-base font-funnel text-pink-600 dark:text-pink-400 font-medium">
            🌸 Poems for my cutu patootie 🌸
          </span>
        </motion.div>
      </motion.div>

      {/* Theme name indicator with better styling */}
      {currentPoem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mb-4"
        >
          <motion.div
            className="inline-block px-4 py-2 rounded-full backdrop-blur-sm border"
            style={{ 
              backgroundColor: `${currentPoem.theme.colors.primary}15`,
              borderColor: `${currentPoem.theme.colors.primary}30`,
              color: currentPoem.theme.colors.primary,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs md:text-sm font-funnel font-medium">
              {currentPoem.theme.name}
            </span>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
