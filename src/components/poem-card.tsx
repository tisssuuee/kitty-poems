import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../data/poems';
import useSound from 'use-sound';

interface PoemCardProps {
  poem: Poem;
  isActive: boolean;
  spokenWords: string[];
  recitationComplete: boolean;
}

const PoemCard: React.FC<PoemCardProps> = ({
  poem,
  isActive,
  spokenWords,
  recitationComplete
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [play, { stop }] = useSound(poem.audio || '', {
    onend: () => setIsPlaying(false)
  });

  const handlePlayback = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="poem-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          scale: isActive ? 1 : 0.95,
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 20
        }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1]
        }}
      >
        <div className="card-inner-shadow absolute inset-0 rounded-lg pointer-events-none" />

        <div className="flex items-start gap-3 relative z-10">
          <motion.div
            className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={handlePlayback}
          >
            <img
              src={poem.image}
              alt={poem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {isPlaying ? (
                <span>Pause</span>
              ) : (
                <span>Play</span>
              )}
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h2
              className="text-lg font-bold text-white truncate"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {poem.title}
            </motion.h2>
            <motion.p
              className="text-sm text-gray-400 mt-0.5"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {poem.author || 'Tissue <3'}
            </motion.p>
          </div>

          {poem.audio && (
            <motion.button
              className="text-white/70 hover:text-white transition-colors"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handlePlayback}
            >
              <Volume2 size={16} />
            </motion.button>
          )}
        </div>

        <motion.div
          className="mt-4 bg-black/30 backdrop-blur-sm rounded-md p-4 relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {recitationComplete ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <p className="poem-text whitespace-pre-line">
                {poem.content.split(' ').map((word, index) => {
                  const cleanWord = word.replace(/[.,!?;:]/, '').toLowerCase();
                  const isSpoken = spokenWords.includes(cleanWord);
                  const isCurrentWord = isActive && cleanWord === spokenWords[spokenWords.length - 1];

                  return (
                    <span
                      key={index}
                      className={`
                        inline-block
                        ${isSpoken ? 'spoken' : ''}
                        ${isCurrentWord ? 'highlighted' : ''}
                      `}
                    >
                      {word}
                      {index < poem.content.split(' ').length - 1 ? ' ' : ''}
                    </span>
                  );
                })}
              </p>
              <motion.div
                className="flex justify-center mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <span className="text-2xl">✨🎀✨</span>
              </motion.div>
            </motion.div>
          ) : (
            <p className="poem-text">
              {poem.content.split(' ').map((word, index) => {
                const cleanWord = word.replace(/[.,!?;:]/, '').toLowerCase();
                const isSpoken = spokenWords.includes(cleanWord);
                const isCurrentWord = isActive && cleanWord === spokenWords[spokenWords.length - 1];

                return (
                  <span
                    key={index}
                    className={`
                      inline-block
                      ${isSpoken ? 'spoken' : ''}
                      ${isCurrentWord ? 'highlighted' : ''}
                    `}
                  >
                    {word}
                    {index < poem.content.split(' ').length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </p>
          )}
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isPlaying ? 1 : spokenWords.length / poem.content.split(' ').length,
          }}
          transition={isPlaying ? { duration: 3 } : undefined}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PoemCard;
