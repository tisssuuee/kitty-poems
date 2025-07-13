import React from 'react';
import { motion } from 'framer-motion';
import { Poem } from '../data/poems';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getReadableTextColor } from '../lib/utils';

interface PoemNavigationProps {
  poems: Poem[];
  currentPoemIndex: number;
  onChangePoemIndex: (index: number) => void;
}

const PoemNavigation: React.FC<PoemNavigationProps> = ({
  poems,
  currentPoemIndex,
  onChangePoemIndex
}) => {
  const currentPoem = poems[currentPoemIndex];
  const textColor = getReadableTextColor(currentPoem.theme, 'primary');

  // Responsive check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handlePrevious = () => {
    if (currentPoemIndex > 0) {
      onChangePoemIndex(currentPoemIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPoemIndex < poems.length - 1) {
      onChangePoemIndex(currentPoemIndex + 1);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center mt-6">
      {/* Floating left arrow */}
      <button
        className={`absolute left-2 md:-left-12 top-1/2 md:top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-lg border border-neutral-200 rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 ${currentPoemIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-pink-100'}`}
        style={{ color: currentPoem.theme.colors.primary }}
        onClick={handlePrevious}
        disabled={currentPoemIndex === 0}
        aria-label="Previous Poem"
      >
        <FiChevronLeft size={28} />
      </button>
      {/* Floating right arrow */}
      <button
        className={`absolute right-2 md:-right-12 top-1/2 md:top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-lg border border-neutral-200 rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 ${currentPoemIndex === poems.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-pink-100'}`}
        style={{ color: currentPoem.theme.colors.primary }}
        onClick={handleNext}
        disabled={currentPoemIndex === poems.length - 1}
        aria-label="Next Poem"
      >
        <FiChevronRight size={28} />
      </button>
      {/* Modern poem dots indicator */}
      <div className="flex items-center justify-center space-x-2 mt-16 md:mt-0 mb-2">
        {poems.map((poem, index) => (
          <button
            key={poem.id}
            className={`relative rounded-full transition-all duration-300 w-3 h-3 ${currentPoemIndex === index ? 'bg-pink-400 shadow-lg scale-110' : 'bg-pink-200 hover:bg-pink-300'}`}
            onClick={() => onChangePoemIndex(index)}
            aria-label={`Go to poem ${index + 1}`}
          >
            {currentPoemIndex === index && (
              <span className="absolute inset-0 rounded-full bg-pink-400 opacity-30 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PoemNavigation;
