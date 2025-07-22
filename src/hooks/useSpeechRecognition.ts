import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  spokenWords: string[];
  startListening: () => void;
  stopListening: () => void;
  resetRecognition: () => void;
  error: string | null;
}

const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [spokenWords, setSpokenWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window === 'undefined' || (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window))) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    recognitionInstance.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.trim().toLowerCase();
          const words = transcript.split(' ');
          
          setSpokenWords(prev => {
            const newSpokenWords = [...prev];
            words.forEach(word => {
              const cleanWord = word.replace(/[.,!?;:]/, '').toLowerCase();
              if (!newSpokenWords.includes(cleanWord)) {
                newSpokenWords.push(cleanWord);
              }
            });
            return newSpokenWords;
          });
        }
      }
    };
    
    recognitionInstance.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };
    
    recognitionInstance.onend = () => {
      if (isListening) {
        recognitionInstance.start();
      }
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [isListening]);

  const startListening = useCallback(() => {
    setError(null);
    setIsListening(true);
    if (recognition) {
      try {
        recognition.start();
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const resetRecognition = useCallback(() => {
    setSpokenWords([]);
    setIsListening(false);
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  return {
    isListening,
    spokenWords,
    startListening,
    stopListening,
    resetRecognition,
    error
  };
};

export default useSpeechRecognition;