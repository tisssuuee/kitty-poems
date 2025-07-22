import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../data/poems';
import { TextShimmer } from './ui/text-shimmer';
import { MagicalCard } from './ui/magical-card';
import { MagicalButton } from './ui/magical-button';
import { FiVolume2, FiMaximize2, FiHeart, FiPlay, FiPause } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { getReadableTextColor } from '../lib/utils';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="relative w-full max-w-lg md:max-w-xl mx-2 md:mx-auto rounded-3xl shadow-2xl bg-white/95 border border-neutral-200 flex flex-col max-h-[90vh] overflow-y-auto"
              initial={{ y: 60, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 60, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Sticky header with image/title/meta */}
              <div className="sticky top-0 z-10 bg-white/95 border-b border-neutral-100 flex flex-col items-center pt-6 pb-2 px-4 rounded-t-3xl">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-neutral-100 flex items-center justify-center mx-auto cursor-zoom-in" onClick={() => setIsImageExpanded(true)}>
                  {poem.image ? (
                    <img
                      src={poem.image}
                      alt={poem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-neutral-400">🖼️</span>
                  )}
                </div>
                <h3 className="font-manrope font-extrabold text-xl md:text-2xl mt-4 mb-1 tracking-tight text-neutral-900 text-center w-full">{poem.title}</h3>
                <div className="text-xs md:text-sm font-inter opacity-70 mb-1 text-neutral-500 text-center w-full">{theme.name} • Tissue <span className="ml-1">❤️</span></div>
              </div>
              {/* Scrollable poem body */}
              <div className="px-4 py-4 md:px-8 md:py-8">
                <pre className="whitespace-pre-wrap font-inter text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-left text-neutral-900">
                  {poem.content}
                </pre>
                <div className="flex items-center justify-between space-x-4 mt-6 pt-4 border-t border-neutral-200">
                  <motion.button
                    className="flex items-center justify-center w-12 h-12 rounded-full kitty-button"
                    onClick={handleLike}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiHeart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </motion.button>
                  <motion.button
                    className="flex items-center justify-center w-12 h-12 rounded-full kitty-button"
                    onClick={handlePlayPause}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? <FiPause className="w-5 h-5 text-gray-600" /> : <FiPlay className="w-5 h-5 text-gray-600" />}
                  </motion.button>
                  <motion.button
                    className="flex items-center justify-center w-12 h-12 rounded-full kitty-button"
                    onClick={() => setIsExpanded(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiMaximize2 className="w-5 h-5 text-gray-600" />
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
        style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center kitty-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </motion.button>
              
              <motion.button
                className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center kitty-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <FiPause className="w-4 h-4 text-gray-600" /> : <FiPlay className="w-4 h-4 text-gray-600" />}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative p-6 h-[236px] flex flex-col">
          {/* Title */}
          <TextShimmer 
            className="kitty-title mb-3 line-clamp-2" 
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              lineHeight: '1.3',
              fontWeight: '800',
              color: primaryTextColor,
              textAlign: 'center'
            }}
            shimmerWidth={120}
            duration={2}
            spread={30}
          >
            {poem.title}
          </TextShimmer>

          {/* Theme indicator */}
          <div className="flex items-center justify-center mb-4">
            <span 
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ 
                color: secondaryTextColor,
                backgroundColor: `${primaryTextColor}20`,
                border: `1px solid ${primaryTextColor}30`
              }}
            >
              {theme.name} • Tissue ❤️
            </span>
          </div>

          {/* Content preview */}
          <div className="flex-1 mb-4">
            <p 
              className="text-sm leading-relaxed line-clamp-4 font-medium"
              style={{ color: secondaryTextColor }}
            >
              {isContentExpanded ? poem.content : truncatedContent}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-auto">
            {poem.content.length > 180 && (
              <MagicalButton
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                className="text-xs px-4 py-2 kitty-button"
                style={{ color: primaryTextColor }}
              >
                {isContentExpanded ? 'Show Less' : 'Read More'}
              </MagicalButton>
            )}
            
            <MagicalButton
              onClick={() => setIsExpanded(true)}
              className="text-xs px-4 py-2 ml-auto kitty-button"
              style={{ color: primaryTextColor }}
            >
              <FiMaximize2 className="w-4 h-4" />
            </MagicalButton>
          </div>
        </div>

        {/* Expanded image overlay */}
        <AnimatePresence>
          {isImageExpanded && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageExpanded(false)}
            >
              <motion.img
                src={poem.image}
                alt={poem.title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default PoemCard;
