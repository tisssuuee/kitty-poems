import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../data/poems';
import { TextShimmer } from './ui/text-shimmer';
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
              </div>
              {/* Sticky footer with Show less and icons */}
              <div className="sticky bottom-0 z-10 bg-white/95 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center w-full gap-4 px-6 md:px-10 py-4 rounded-b-3xl">
                <button
                  className="text-sm font-semibold px-6 py-2 rounded-full bg-gradient-to-r from-pink-400/80 to-yellow-300/80 text-white shadow-md hover:from-pink-500 hover:to-yellow-400 transition border-none w-full md:w-auto"
                  onClick={() => setIsExpanded(false)}
                >
                  Show less
                </button>
                <div className="flex gap-3 mt-2 md:mt-0">
                  <button className="p-2 rounded-full bg-pink-100 shadow hover:bg-pink-200 transition" style={{ color: isLiked ? '#ff1493' : '#e11d48' }} onClick={handleLike}><FiHeart size={20} fill={isLiked ? '#ff1493' : 'none'} /></button>
                  {poem.audio && (
                    <button className="p-2 rounded-full bg-yellow-100 shadow hover:bg-yellow-200 transition" style={{ color: '#eab308' }} onClick={handlePlayPause}>{isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}</button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Default Card View (not expanded) */}
      {!isExpanded && (
        <motion.div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-md shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.card} 0%, ${theme.colors.card} 100%)`,
            border: `1px solid ${theme.colors.primary}20`,
          }}
          animate={{
            boxShadow: isHovered 
              ? `0 20px 40px ${theme.colors.primary}15, 0 0 0 1px ${theme.colors.primary}10` 
              : `0 8px 20px ${theme.colors.primary}08`,
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0px)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Mobile layout - Spotify-like */}
          <div className="md:hidden">
            {/* Mobile Header */}
            <div className="p-5 pb-3">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="relative w-14 h-14 rounded-xl overflow-hidden cursor-pointer shadow-lg"
                    onClick={handleImageClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={poem.image}
                      alt={poem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-manrope font-semibold text-lg leading-tight truncate"
                      style={{ color: primaryTextColor }}
                    >
                      {poem.title}
                    </h3>
                    <p 
                      className="font-inter text-sm mt-1 opacity-80 flex items-center gap-1"
                      style={{ color: secondaryTextColor }}
                    >
                      <span>{theme.name}</span>
                      <span className="text-xs">•</span>
                      <span>Tissue ❤️</span>
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={handleLike}
                    className="p-1.5 rounded-full transition-colors"
                    style={{ 
                      color: isLiked ? '#ff1493' : `${theme.colors.primary}80`,
                      backgroundColor: `${theme.colors.primary}10`
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiHeart size={14} fill={isLiked ? '#ff1493' : 'none'} />
                  </motion.button>
                  {poem.audio && (
                    <motion.button
                      onClick={handlePlayPause}
                      className="p-1.5 rounded-full transition-colors"
                      style={{ 
                        color: theme.colors.primary,
                        backgroundColor: `${theme.colors.primary}20`
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </div>
            {/* Mobile Content */}
            <div className="px-5 pb-5">
              <motion.div
                className="rounded-2xl p-4 backdrop-blur-sm"
                style={{ 
                  backgroundColor: `${theme.colors.primary}08`,
                  border: `1px solid ${theme.colors.primary}15`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: primaryTextColor }}
                >
                  <pre 
                    className="whitespace-pre-wrap font-inter overflow-hidden"
                    style={{
                      maxHeight: isContentExpanded ? 'none' : '120px',
                      transition: 'max-height 0.3s ease',
                      color: primaryTextColor,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {isContentExpanded ? poem.content : truncatedContent}
                  </pre>
                </motion.div>
                {poem.content.length > 180 && !isContentExpanded && (
                  <motion.button
                    className="mt-3 font-inter text-sm font-medium px-4 py-2 rounded-full transition-all"
                    style={{ 
                      color: theme.colors.primary,
                      backgroundColor: `${theme.colors.primary}12`,
                      border: `1px solid ${theme.colors.primary}25`
                    }}
                    onClick={() => setIsExpanded(true)}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: `${theme.colors.primary}20`
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read more
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>
          {/* Desktop layout - Enhanced Spotify-like */}
          <div className="hidden md:flex min-h-[320px]">
            {/* Desktop image section */}
            <motion.div
              className="relative w-80 lg:w-96 flex-shrink-0 cursor-pointer group"
              onClick={handleImageClick}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="absolute inset-0 rounded-l-3xl overflow-hidden">
                <img
                  src={poem.image}
                  alt={poem.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiMaximize2 className="text-white" size={24} />
                  </motion.div>
                </motion.div>
              </div>
              {/* Heart overlay */}
              <AnimatePresence>
                {showHeart && (
                  <motion.div
                    className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-l-3xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="text-white text-3xl"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      💕
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {/* Desktop content section */}
            <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <motion.h2
                      className="font-manrope font-bold text-2xl lg:text-3xl leading-tight mb-2"
                      style={{ color: primaryTextColor }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {poem.title}
                    </motion.h2>
                    <motion.p
                      className="font-inter text-base flex items-center gap-3 opacity-90"
                      style={{ color: secondaryTextColor }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="font-medium">{theme.name}</span>
                      <span className="text-sm">•</span>
                      <span className="font-medium">Tissue ❤️</span>
                    </motion.p>
                  </div>
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      onClick={handleLike}
                      className="p-1.5 rounded-full transition-colors"
                      style={{ 
                        color: isLiked ? '#ff1493' : `${theme.colors.primary}80`,
                        backgroundColor: `${theme.colors.primary}10`
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiHeart size={14} fill={isLiked ? '#ff1493' : 'none'} />
                    </motion.button>
                    {poem.audio && (
                      <motion.button
                        onClick={handlePlayPause}
                        className="p-1.5 rounded-full transition-colors"
                        style={{ 
                          color: theme.colors.primary,
                          backgroundColor: `${theme.colors.primary}20`
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </div>
              {/* Content */}
              <div className="flex-1">
                <motion.div
                  className="font-inter text-sm leading-relaxed"
                  style={{ color: primaryTextColor }}
                >
                  <pre 
                    className="whitespace-pre-wrap font-inter overflow-hidden"
                    style={{
                      maxHeight: isContentExpanded ? 'none' : '120px',
                      transition: 'max-height 0.3s ease',
                      color: primaryTextColor,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {isContentExpanded ? poem.content : truncatedContent}
                  </pre>
                </motion.div>
                {poem.content.length > 180 && !isContentExpanded && (
                  <motion.button
                    className="mt-3 font-inter text-sm font-medium px-4 py-2 rounded-full transition-all"
                    style={{ 
                      color: theme.colors.primary,
                      backgroundColor: `${theme.colors.primary}12`,
                      border: `1px solid ${theme.colors.primary}25`
                    }}
                    onClick={() => setIsExpanded(true)}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: `${theme.colors.primary}20`
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read more
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageExpanded(false)}
          >
            <motion.img
              src={poem.image}
              alt={poem.title}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default PoemCard;
