import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { poems } from '../data/poems';
import PoemCard from './PoemCard';
import PoemNavigation from './PoemNavigation';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useSound from 'use-sound';

// Import sound effects
const successSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
const clickSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3';

const PoemPlayer: React.FC = () => {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [recitationComplete, setRecitationComplete] = useState(false);
  const {
    isListening,
    spokenWords,
    startListening,
    stopListening,
    resetRecognition,
    error
  } = useSpeechRecognition();

  // Sound effects
  const [playSuccess] = useSound(successSoundUrl, { volume: 0.5 });
  const [playClick] = useSound(clickSoundUrl, { volume: 0.3 });

  // Get current poem
  const currentPoem = poems[currentPoemIndex];

  // Check if poem is complete
  useEffect(() => {
    if (isListening && !recitationComplete) {
      const poemWords = currentPoem.content.split(' ').map(word =>
        word.replace(/[.,!?;:]/, '').toLowerCase()
      );

      // Check if all words in the poem have been spoken
      const allWordsSpoken = poemWords.every(word =>
        spokenWords.includes(word)
      );

      if (allWordsSpoken) {
        setRecitationComplete(true);
        stopListening();
        playSuccess();
      }
    }
  }, [currentPoem, spokenWords, isListening, recitationComplete, stopListening, playSuccess]);

  // Handle poem change
  const handleChangePoemIndex = useCallback((newIndex: number) => {
    playClick();
    setCurrentPoemIndex(newIndex);
    setRecitationComplete(false);
    resetRecognition();
  }, [playClick, resetRecognition]);

  // Handle start recitation
  const handleStartRecitation = useCallback(() => {
    playClick();
    setRecitationComplete(false);
    resetRecognition();
    startListening();
  }, [playClick, resetRecognition, startListening]);

  // Handle stop recitation
  const handleStopRecitation = useCallback(() => {
    playClick();
    stopListening();
  }, [playClick, stopListening]);

  // Handle reset
  const handleReset = useCallback(() => {
    playClick();
    setRecitationComplete(false);
    resetRecognition();
  }, [playClick, resetRecognition]);

  return (
    <div className="poem-player">
      <PoemCard
        poem={currentPoem}
        isActive={true}
        spokenWords={spokenWords}
        recitationComplete={recitationComplete}
      />

      <div className="controls flex justify-center mt-6">
        <motion.div
          className="flex space-x-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {!isListening ? (
            <motion.button
              className="control-button bg-kitty-pink text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartRecitation}
              disabled={recitationComplete}
            >
              <span>Start Reciting</span>
            </motion.button>
          ) : (
            <motion.button
              className="control-button bg-kitty-red text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStopRecitation}
            >
              <span>Stop</span>
            </motion.button>
          )}

          <motion.button
            className="control-button bg-white text-kitty-pink-dark"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
          >
            <span>Reset</span>
          </motion.button>
        </motion.div>
      </div>

      {error && (
        <motion.div
          className="error-message text-center mt-4 text-kitty-red-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {recitationComplete && (
        <motion.div
          className="completion-message text-center mt-4 text-kitty-pink-dark"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-bold">Amazing job! Try another poem?</p>
        </motion.div>
      )}

      <PoemNavigation
        poems={poems}
        currentPoemIndex={currentPoemIndex}
        onChangePoemIndex={handleChangePoemIndex}
      />

      <motion.div
        className="poem-tips text-center mt-8 bg-white bg-opacity-60 p-4 rounded-xl max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-bold text-kitty-pink-dark mb-2">How to Play</h3>
        <p className="text-sm text-gray-700">
          Click "Start Reciting" and speak the words of the poem.
          Each word will highlight as you say it! When you finish the poem,
          you'll see a celebration!!
        </p>
      </motion.div>
    </div>
  );
};

export default PoemPlayer;
