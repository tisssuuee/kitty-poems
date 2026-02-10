import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { poems } from '../data/poems';
import PoemCard from './poem-card';
import PoemNavigation from './poem-navigation';
import { Confetti, type ConfettiRef } from './ui/confetti';
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

  const handleSwipeLeft = () => {
    const nextIndex = (currentPoemIndex + 1) % poems.length;
    handleChangePoemIndex(nextIndex);
  }

  const handleSwipeRight = () => {
    const prevIndex = currentPoemIndex === 0 ? poems.length - 1 : currentPoemIndex - 1;
    handleChangePoemIndex(prevIndex);
  }

  const handlePoemCardClick = () => {
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
      className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto relative px-2 sm:px-4 md:px-6"
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
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
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

      {/* Navigation — always visible below the card */}
      {!isExpanded && (
        <motion.div
          className='w-full z-20 poem-navigation-wrapper'
          initial={{ y: 30, opacity: 0 }}
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
