import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Poem } from '../data/poems';

interface PoemNavigationProps {
  poems: Poem[];
  currentPoemIndex: number;
  onChangePoemIndex: (index: number) => void;
}

const PoemNavigation: React.FC<PoemNavigationProps> = ({
  poems,
  currentPoemIndex,
  onChangePoemIndex,
}) => {
  const totalPoems = poems.length;

  const progressPercent = useMemo(
    () => ((currentPoemIndex + 1) / totalPoems) * 100,
    [currentPoemIndex, totalPoems]
  );

  const handlePrevious = () => {
    if (currentPoemIndex > 0) {
      onChangePoemIndex(currentPoemIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPoemIndex < totalPoems - 1) {
      onChangePoemIndex(currentPoemIndex + 1);
    }
  };

  return (
    <div className="poem-navigation-container flex flex-col items-center gap-3 mt-4 md:mt-6 pb-4">
      {/* Dot indicators */}
      <div className="flex items-center gap-1 md:gap-1.5 flex-wrap justify-center max-w-[280px]">
        {poems.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => onChangePoemIndex(i)}
            className="rounded-full cursor-pointer"
            style={{
              width: currentPoemIndex === i ? '16px' : '6px',
              height: '6px',
              background: currentPoemIndex === i
                ? 'var(--accent-hot)'
                : 'rgba(255, 182, 210, 0.3)',
              borderRadius: '100px',
              transition: 'all 0.3s ease',
              border: 'none',
              padding: 0,
              ...(currentPoemIndex === i
                ? { boxShadow: '0 0 8px rgba(255,59,122,0.4)' }
                : {}),
            }}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.8 }}
            layout
          />
        ))}
      </div>

      {/* Navigation row */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Previous button — glassmorphism pill */}
        <motion.button
          onClick={handlePrevious}
          disabled={currentPoemIndex === 0}
          className="sakura-glass-pill flex items-center gap-1.5 px-4 py-2.5 md:px-5 md:py-3 relative overflow-hidden group"
          style={{
            opacity: currentPoemIndex === 0 ? 0.4 : 1,
            cursor: currentPoemIndex === 0 ? 'not-allowed' : 'pointer',
          }}
          whileHover={currentPoemIndex > 0 ? {
            scale: 1.05,
            boxShadow: '-6px 0 20px rgba(255,59,122,0.2)',
          } : {}}
          whileTap={currentPoemIndex > 0 ? { scale: 0.95 } : {}}
        >
          <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--accent-hot)' }} />
          <span
            className="sakura-accent text-xs md:text-sm font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Prev
          </span>
          {/* Directional glow */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, rgba(255,59,122,0.1), transparent)',
            }}
          />
        </motion.button>

        {/* Progress capsule */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Counter */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentPoemIndex}
              className="sakura-glass-pill px-4 py-1.5"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="sakura-accent text-xs md:text-sm font-semibold tracking-wide"
                style={{ color: 'var(--text-primary)' }}
              >
                <span style={{ color: 'var(--accent-hot)' }}>{currentPoemIndex + 1}</span>
                <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>/</span>
                <span>{totalPoems}</span>
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{
              height: '3px',
              minWidth: '60px',
              maxWidth: '80px',
              background: 'rgba(255, 182, 210, 0.15)',
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--accent-hot), var(--accent-sakura))',
                width: `${progressPercent}%`,
              }}
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>

        {/* Next button — glassmorphism pill */}
        <motion.button
          onClick={handleNext}
          disabled={currentPoemIndex === totalPoems - 1}
          className="sakura-glass-pill flex items-center gap-1.5 px-4 py-2.5 md:px-5 md:py-3 relative overflow-hidden group"
          style={{
            opacity: currentPoemIndex === totalPoems - 1 ? 0.4 : 1,
            cursor: currentPoemIndex === totalPoems - 1 ? 'not-allowed' : 'pointer',
          }}
          whileHover={currentPoemIndex < totalPoems - 1 ? {
            scale: 1.05,
            boxShadow: '6px 0 20px rgba(255,59,122,0.2)',
          } : {}}
          whileTap={currentPoemIndex < totalPoems - 1 ? { scale: 0.95 } : {}}
        >
          <span
            className="sakura-accent text-xs md:text-sm font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Next
          </span>
          <FiChevronRight className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--accent-hot)' }} />
          {/* Directional glow */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(-90deg, rgba(255,59,122,0.1), transparent)',
            }}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default PoemNavigation;
