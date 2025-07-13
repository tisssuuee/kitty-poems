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
        className="text-center mb-4 md:mb-6"
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
        className="text-center mb-6 md:mb-8"
      >
        <TextShimmer
          className="text-4xl md:text-6xl font-bold font-manrope tracking-wider"
          style={{ 
            color: currentPoem?.theme.colors.primary || '#f77fbe',
          }}
          duration={3}
          spread={3}
        >
          Riyuuuu
        </TextShimmer>
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
