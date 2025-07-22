import { useCallback, useRef } from 'react';

interface SoundConfig {
  volume?: number;
  playbackRate?: number;
  loop?: boolean;
}

export const useMagicalSounds = () => {
  const audioContext = useRef<AudioContext | null>(null);

  // Initialize audio context
  const initAudioContext = useCallback(() => {
    if (!audioContext.current && typeof window !== 'undefined') {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  }, []);

  // Create magical sound effects
  const createBeep = useCallback((frequency: number, duration: number, config: SoundConfig = {}) => {
    const ctx = initAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(config.volume || 0.1, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [initAudioContext]);

  // Magical sound effects
  const playMagicalClick = useCallback(() => {
    createBeep(800, 0.1, { volume: 0.1 });
    setTimeout(() => createBeep(1200, 0.05, { volume: 0.05 }), 50);
  }, [createBeep]);

  const playMagicalHover = useCallback(() => {
    createBeep(600, 0.08, { volume: 0.05 });
  }, [createBeep]);

  const playMagicalSuccess = useCallback(() => {
    const notes = [523.25, 659.25, 783.99]; // C, E, G
    notes.forEach((note, index) => {
      setTimeout(() => {
        createBeep(note, 0.2, { volume: 0.08 });
      }, index * 100);
    });
  }, [createBeep]);

  const playMagicalTransition = useCallback(() => {
    // Ascending magical scale
    const frequencies = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        createBeep(freq, 0.15, { volume: 0.06 });
      }, index * 80);
    });
  }, [createBeep]);

  const playMagicalError = useCallback(() => {
    createBeep(220, 0.3, { volume: 0.1 });
    setTimeout(() => createBeep(196, 0.3, { volume: 0.1 }), 150);
  }, [createBeep]);

  const playMagicalSparkle = useCallback(() => {
    // Random high frequency sparkle sounds
    const frequencies = [1500, 1800, 2100, 2400];
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
    createBeep(randomFreq, 0.05, { volume: 0.03 });
  }, [createBeep]);

  const playMagicalWhoosh = useCallback(() => {
    const ctx = initAudioContext();
    if (!ctx) return;

    // Create noise for whoosh effect
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }

    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    source.start();
  }, [initAudioContext]);

  return {
    playMagicalClick,
    playMagicalHover,
    playMagicalSuccess,
    playMagicalTransition,
    playMagicalError,
    playMagicalSparkle,
    playMagicalWhoosh,
  };
};
