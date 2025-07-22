import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../data/poems';
import { TextShimmer } from './ui/text-shimmer';
import { MagicalButton } from './ui/magical-button';
import { FiMaximize2, FiHeart, FiPlay, FiPause, FiMinimize2, FiX, FiChevronDown } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getReadableTextColor, getAdaptiveThemeColors } from '../lib/utils';

interface PoemCardProps {
  poem: Poem;
  isActive: boolean;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const PoemCard: React.FC<PoemCardProps> = ({
  poem,
  isActive = false,
  isExpanded,
  setIsExpanded,
}) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = poem.theme;
  const primaryTextColor = getReadableTextColor(theme, 'primary');
  const adaptiveTheme = getAdaptiveThemeColors(theme.colors, isDarkMode);
  
  const getCardBackground = () => {
    return isDarkMode ? adaptiveTheme.card : 'rgba(255, 255, 255, 0.95)';
  };
  
  const getTextColor = () => {
    return isDarkMode ? adaptiveTheme.text : '#1f2937';
  };
  
  const getTitleColor = () => {
    return isDarkMode ? '#ffffff' : '#1f2937';
  };

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setShowHeart(true);
  };

  const truncatedContent = poem.content.length > 180 
    ? poem.content.substring(0, 180) + "..." 
    : poem.content;

  return (
    <AnimatePresence mode="wait">
      {/* Expanded Lyrics View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="relative w-full max-w-lg md:max-w-xl mx-4 md:mx-auto rounded-3xl shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh] overflow-hidden"
              style={{ 
                backgroundColor: getCardBackground(),
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
              }}
              initial={{ y: 60, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 60, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 shadow-xl flex items-center justify-center border-2 border-white/40"
                onClick={() => setIsExpanded(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMinimize2 className="w-6 h-6 text-white drop-shadow-sm" />
              </motion.button>

              {/* Sticky header with image/title/meta */}
              <div 
                className="sticky top-0 z-10 border-b flex flex-col items-center pt-6 pb-4 px-6 rounded-t-3xl"
                style={{ 
                  backgroundColor: getCardBackground(),
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <motion.div 
                  className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-neutral-100 flex items-center justify-center mx-auto cursor-zoom-in" 
                  onClick={handleImageClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {poem.image ? (
                    <img
                      src={poem.image}
                      alt={poem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-neutral-400">🖼️</span>
                  )}
                </motion.div>
                
                <TextShimmer 
                  className="kitty-title mt-4 mb-2 text-center"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    lineHeight: '1.3',
                    fontWeight: '800',
                    color: getTitleColor()
                  }}
                  shimmerWidth={120}
                  duration={2}
                >
                  {poem.title}
                </TextShimmer>
                
                <div 
                  className="text-xs md:text-sm font-inter opacity-70 text-center"
                  style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
                >
                  {theme.name} • Tissue <span className="ml-1">❤️</span>
                </div>
              </div>

              {/* Scrollable poem body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <pre 
                  className="whitespace-pre-wrap font-inter text-[clamp(1rem,2vw,1.1rem)] leading-relaxed text-left"
                  style={{ color: getTextColor() }}
                >
                  {poem.content}
                </pre>
              </div>

              {/* Bottom action bar */}
              <div 
                className="sticky bottom-0 border-t px-6 py-4 rounded-b-3xl"
                style={{ 
                  backgroundColor: getCardBackground(),
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center justify-center space-x-8">
                  <motion.button
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 shadow-xl border-2 border-white/40"
                    onClick={handleLike}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <FiHeart className={`w-6 h-6 ${isLiked ? 'text-white fill-current drop-shadow-sm' : 'text-white/90'}`} />
                    </motion.div>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-xl border-2 border-white/40"
                    onClick={handlePlayPause}
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                    >
                      {isPlaying ? (
                        <FiPause className="w-6 h-6 text-white drop-shadow-sm" />
                      ) : (
                        <FiPlay className="w-6 h-6 text-white drop-shadow-sm ml-0.5" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Poem Card */}
      <motion.div
        className={`
          group relative overflow-hidden rounded-3xl mx-auto w-full max-w-sm h-[500px] 
          transition-all duration-700 ease-out kitty-card
          ${isActive 
            ? 'scale-[1.02] shadow-2xl shadow-pink-500/30 ring-2 ring-pink-300' 
            : 'hover:scale-[1.01] hover:shadow-xl shadow-lg'
          }
        `}
        style={{ background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)` }}
        whileHover={{ 
          y: -4,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        layout
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none" />
        
        {/* Floating heart animation */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl">❤️</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0 cursor-zoom-in"
            onClick={handleImageClick}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {poem.image ? (
              <img
                src={poem.image}
                alt={poem.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <span className="text-6xl opacity-50">🖼️</span>
              </div>
            )}
            
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {/* Floating action buttons */}
            <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col space-y-2 md:space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <motion.button
                className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-xl flex items-center justify-center backdrop-blur-sm border border-white/40"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.85 }}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}90, ${theme.colors.secondary || theme.colors.primary}90)`,
                  boxShadow: `0 4px 15px ${theme.colors.primary}40, 0 0 10px ${theme.colors.primary}20`
                }}
              >
                <motion.div
                  animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <FiHeart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'text-white fill-current drop-shadow-sm' : 'text-white/90'}`} />
                </motion.div>
              </motion.button>
              
              <motion.button
                className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-xl flex items-center justify-center backdrop-blur-sm border border-white/40"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.85 }}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.secondary || theme.colors.primary}90, ${theme.colors.primary}90)`,
                  boxShadow: `0 4px 15px ${theme.colors.primary}40, 0 0 10px ${theme.colors.primary}20`
                }}
              >
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                >
                  {isPlaying ? (
                    <FiPause className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-sm" />
                  ) : (
                    <FiPlay className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-sm ml-0.5" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative p-6 h-[236px] flex flex-col">
          {/* Title */}
          <TextShimmer 
            className="kitty-title mb-3 line-clamp-2 text-center" 
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              lineHeight: '1.3',
              fontWeight: '800',
              color: isDarkMode ? '#ffffff' : '#1f2937',
              textShadow: isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.8)' : '0 1px 2px rgba(255, 255, 255, 0.8)'
            }}
            shimmerWidth={120}
            duration={2}
          >
            {poem.title}
          </TextShimmer>

          {/* Theme indicator */}
          <div className="flex items-center justify-center mb-4">
            <motion.span 
              className="text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/30"
              style={{ 
                color: 'white',
                background: `linear-gradient(135deg, ${theme.colors.primary}90, ${theme.colors.secondary}90)`,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ✨ {theme.name} • Tissue 💖 ✨
            </motion.span>
          </div>

          {/* Content preview */}
          <div className="flex-1 mb-4 overflow-hidden">
            <p 
              className="text-sm leading-relaxed line-clamp-4 font-medium text-center"
              style={{ 
                color: isDarkMode ? '#e2e8f0' : '#475569',
                textShadow: isDarkMode ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none'
              }}
            >
              {isContentExpanded ? poem.content : truncatedContent}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center">
              {poem.content.length > 180 && (
                <MagicalButton
                  onClick={() => setIsContentExpanded(!isContentExpanded)}
                  variant="magical"
                  size="sm"
                  className="px-3 md:px-6 py-2 md:py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border border-white/30"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}90, ${theme.colors.secondary || theme.colors.primary}90, ${theme.colors.primary}90)`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 4px 20px ${theme.colors.primary}30, 0 0 15px ${theme.colors.primary}20`
                  }}
                  ripple={true}
                  sparkles={true}
                >
                  <span className="flex items-center space-x-1 md:space-x-2">
                    <span className="text-xs md:text-sm font-bold">
                      {isContentExpanded ? 'Show Less' : 'Read More'}
                    </span>
                    <motion.div
                      animate={{ rotate: isContentExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>
                  </span>
                </MagicalButton>
              )}
            </div>
            
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl border border-white/40 backdrop-blur-sm"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              style={{ 
                background: `linear-gradient(135deg, ${theme.colors.primary}80, ${theme.colors.secondary || theme.colors.primary}80)`,
                borderColor: `${primaryTextColor}30`,
                boxShadow: `0 4px 15px ${theme.colors.primary}40, 0 0 10px ${theme.colors.primary}20`
              }}
            >
              <FiMaximize2 className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-sm" />
            </motion.button>
          </div>
        </div>

        {/* Expanded image overlay */}
        <AnimatePresence>
          {isImageExpanded && (
            <motion.div
              className="fixed inset-0 z-[60] backdrop-blur-md flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageExpanded(false)}
            >
              {/* Close button for image */}
              <motion.button
                className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 shadow-2xl flex items-center justify-center border-2 border-white/50"
                onClick={() => setIsImageExpanded(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-7 h-7 text-white drop-shadow-lg" />
              </motion.button>

              <motion.div
                className="relative max-w-[90vw] max-h-[90vh]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {poem.image ? (
                  <img
                    src={poem.image}
                    alt={poem.title}
                    className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="w-96 h-96 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center rounded-2xl shadow-2xl">
                    <span className="text-8xl opacity-50">🖼️</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default PoemCard;
