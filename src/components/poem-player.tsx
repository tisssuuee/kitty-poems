import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { poems } from '../data/poems';
import PoemCard from './poem-card';
import PoemNavigation from './poem-navigation';
import { Confetti, type ConfettiRef } from './ui/confetti';
import { MagicalButton } from './ui/magical-button';
import { useMagicalSounds } from '../hooks/useMagicalSounds';
import useSound from 'use-sound';

const clickSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3';
const celebrationSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/269/269-preview.mp3';

interface PoemPlayerProps {
  onPoemChange: (index: number) => void;
}

const PoemPlayer: React.FC<PoemPlayerProps> = ({ onPoemChange }) => {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playClick] = useSound(clickSoundUrl, { volume: 0.3 });
  const [playCelebration] = useSound(celebrationSoundUrl, { volume: 0.4 });
  const confettiRef = useRef<ConfettiRef>(null);
  const currentPoem = poems[currentPoemIndex];
  
  // Magical sounds
  const { 
    playMagicalClick, 
    playMagicalSuccess, 
    playMagicalTransition,
    playMagicalSparkle 
  } = useMagicalSounds();

  const handleChangePoemIndex = (newIndex: number) => {
    playClick();
    playMagicalTransition();
    setCurrentPoemIndex(newIndex);
    onPoemChange(newIndex);
    
    // Add confetti celebration for poem transitions
    setTimeout(() => {
      playCelebration();
      playMagicalSuccess();
      confettiRef.current?.fire({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: currentPoem.theme.gradient
      });
    }, 200);
  }

  const handlePoemCardClick = () => {
    // Add subtle confetti when clicking on poem card
    playMagicalClick();
    playMagicalSparkle();
    confettiRef.current?.fire({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
      colors: currentPoem.theme.gradient.slice(0, 3)
    });
  }

  return (
    <motion.div 
      className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto relative px-2 sm:px-0"
      initial={{ 
        opacity: 0, 
        y: 30, 
        scale: 0.95,
        filter: "blur(8px)"
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)"
      }}
      transition={{ 
        duration: 0.8, 
        delay: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      {/* Confetti canvas */}
      <Confetti
        ref={confettiRef}
        className="absolute inset-0 pointer-events-none z-50"
        manualstart={true}
      />

      {/* Magical entrance sparkles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300 text-sm pointer-events-none select-none"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${15 + (i * 10)}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -30],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: 0.8 + (i * 0.1),
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>

      {currentPoem ? (
        <motion.div 
          onClick={handlePoemCardClick}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.7, 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
        >
          <PoemCard
            poem={currentPoem}
            isActive={true}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          No poem available
        </motion.p>
      )}

      {!isExpanded && (
        <motion.div 
          className='absolute w-full left-0 -bottom-24 md:-bottom-28 z-20 poem-navigation-wrapper'
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 1, 
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <PoemNavigation
            poems={poems}
            currentPoemIndex={currentPoemIndex}
            onChangePoemIndex={handleChangePoemIndex}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PoemPlayer;
