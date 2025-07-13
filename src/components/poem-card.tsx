import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../data/poems';
import { TextShimmer } from './ui/text-shimmer';
import { FiVolume2, FiMaximize2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getReadableTextColor } from '../lib/utils';

interface PoemCardProps {
  poem: Poem;
  isActive: boolean;
}

const PoemCard: React.FC<PoemCardProps> = ({
  poem,
  isActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const theme = poem.theme;
  const primaryTextColor = getReadableTextColor(theme, 'primary');
  const secondaryTextColor = getReadableTextColor(theme, 'secondary');

  useEffect(() => {
    if (showHeart) {
      const timer = setTimeout(() => {
        setShowHeart(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showHeart]);

  const handleImageClick = () => {
    setIsImageExpanded(!isImageExpanded);
    setShowHeart(true);
  };

  const truncatedContent = poem.content.length > 200 
    ? poem.content.substring(0, 200) + "..." 
    : poem.content;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative w-full max-w-sm md:max-w-4xl mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isActive ? 1 : 0.95,
          opacity: isActive ? 1 : 0,
        }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Spotify-style card container */}
        <motion.div
          className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg backdrop-blur-md"
          style={{
            background: theme.colors.card,
            border: `1px solid ${theme.colors.primary}25`,
          }}
          animate={{
            boxShadow: isHovered 
              ? `0 12px 24px ${theme.colors.primary}15` 
              : `0 6px 16px ${theme.colors.primary}10`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Mobile layout */}
          <div className="md:hidden p-4">
            <div className="flex items-start gap-3">
              {/* Mobile image */}
              <motion.div
                className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={handleImageClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={poem.image}
                  alt={poem.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Heart overlay for mobile */}
                <AnimatePresence>
                  {showHeart && (
                    <motion.div
                      className="absolute inset-0 bg-black/20 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        className="text-white text-lg"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        💕
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile content */}
              <div className="flex-1 min-w-0">
                <div 
                  className="text-sm font-bold font-funnel truncate"
                  style={{ 
                    color: primaryTextColor,
                  }}
                >
                  {poem.title}
                </div>
                <p 
                  className="text-xs mt-1 font-medium"
                  style={{ 
                    color: secondaryTextColor,
                  }}
                >
                  {theme.name} • Tissue ❤️
                </p>
              </div>

              {poem.audio && (
                <motion.button
                  className="p-2 rounded-full"
                  style={{ 
                    color: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}20`
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiVolume2 size={16} />
                </motion.button>
              )}
            </div>

            {/* Mobile poem content */}
            <motion.div
              className="mt-3 p-3 rounded-lg"
              style={{ 
                backgroundColor: `${theme.colors.primary}12`,
                border: `1px solid ${theme.colors.primary}20`
              }}
            >
              <motion.div
                className="text-sm leading-relaxed"
                style={{ color: primaryTextColor }}
              >
                <pre 
                  className="whitespace-pre-wrap font-sans overflow-hidden"
                  style={{
                    maxHeight: isContentExpanded ? 'none' : '80px',
                    transition: 'max-height 0.3s ease',
                    color: primaryTextColor
                  }}
                >
                  {isContentExpanded ? poem.content : truncatedContent}
                </pre>
              </motion.div>
              
              {poem.content.length > 200 && (
                <motion.button
                  className="mt-2 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ 
                    color: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}15`,
                    border: `1px solid ${theme.colors.primary}30`
                  }}
                  onClick={() => setIsContentExpanded(!isContentExpanded)}
                  whileHover={{ scale: 1.05 }}
                >
                  {isContentExpanded ? 'Show less' : 'Read more'}
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex">
            {/* Desktop image section */}
            <motion.div
              className="relative w-48 lg:w-64 h-48 lg:h-64 flex-shrink-0 cursor-pointer group"
              onClick={handleImageClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={poem.image}
                alt={poem.title}
                className="w-full h-full object-cover rounded-l-xl transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Desktop image overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <motion.div
                    className="text-white text-xs bg-black/50 px-2 py-1 rounded font-medium"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Click to expand
                  </motion.div>
                  <FiMaximize2 className="text-white" size={16} />
                </div>
              </motion.div>

              {/* Heart overlay for desktop */}
              <AnimatePresence>
                {showHeart && (
                  <motion.div
                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="text-white text-2xl"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      💕
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Desktop content section */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div 
                    className="text-xl lg:text-2xl font-bold font-funnel"
                    style={{ 
                      color: primaryTextColor,
                    }}
                  >
                    {poem.title}
                  </div>
                  <motion.p
                    className="text-sm mt-1 flex items-center gap-2 font-medium"
                    style={{ 
                      color: secondaryTextColor,
                    }}
                  >
                    <span>{theme.name}</span>
                    <span className="text-xs">•</span>
                    <span>Tissue ❤️</span>
                  </motion.p>
                </div>

                {poem.audio && (
                  <motion.button
                    className="p-3 rounded-full"
                    style={{ 
                      color: theme.colors.primary,
                      backgroundColor: `${theme.colors.primary}20`
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiVolume2 size={20} />
                  </motion.button>
                )}
              </div>

              {/* Desktop poem content */}
              <motion.div
                className="flex-1 min-h-0"
                style={{
                  maxHeight: isContentExpanded ? 'none' : '200px',
                  transition: 'max-height 0.4s ease',
                }}
              >
                <motion.pre
                  className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap font-sans overflow-hidden"
                  style={{ 
                    color: primaryTextColor,
                  }}
                  animate={{
                    scale: isHovered ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isContentExpanded ? poem.content : truncatedContent}
                </motion.pre>
              </motion.div>

              {/* Read more button for desktop */}
              {poem.content.length > 200 && (
                <motion.button
                  className="mt-4 text-sm font-semibold self-start px-4 py-2 rounded-lg"
                  style={{ 
                    color: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}15`,
                    border: `1px solid ${theme.colors.primary}30`
                  }}
                  onClick={() => setIsContentExpanded(!isContentExpanded)}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: `${theme.colors.primary}25`
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {isContentExpanded ? 'Show less' : 'Read more'}
                </motion.button>
              )}

              {/* Bottom decorations */}
              <motion.div
                className="flex justify-center mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <span className="text-sm opacity-70 font-medium">
                  {theme.emojis.join(' ')}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Expanded image modal */}
        <AnimatePresence>
          {isImageExpanded && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageExpanded(false)}
            >
              <motion.img
                src={poem.image}
                alt={poem.title}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default PoemCard;
