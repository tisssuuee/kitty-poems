import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../data/poems';
import { FiMaximize2, FiHeart, FiPlay, FiPause, FiX, FiChevronDown } from 'react-icons/fi';
import { useState, useEffect, useRef, useCallback } from 'react';

// Fallback audio — the only file that actually exists in /public/audio
const FALLBACK_AUDIO = '/audio/tum-se-hi-jab-we-met-128-kbps_QF9o2eh4.mp3';

interface PoemCardProps {
  poem: Poem;
  isActive: boolean;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

// Heart burst particle component
const HeartBurstParticles = ({ show }: { show: boolean }) => {
  if (!show) return null;

  const particles = [
    { anim: 'heartBurst1', delay: '0s' },
    { anim: 'heartBurst2', delay: '0.05s' },
    { anim: 'heartBurst3', delay: '0.1s' },
    { anim: 'heartBurst4', delay: '0.08s' },
    { anim: 'heartBurst5', delay: '0.03s' },
    { anim: 'heartBurst6', delay: '0.12s' },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      {particles.map((p, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="var(--accent-hot)"
          className="absolute"
          style={{
            animation: `${p.anim} 0.6s ease-out ${p.delay} forwards`,
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
};

const PoemCard: React.FC<PoemCardProps> = ({
  poem,
  isActive = false,
  isExpanded,
  setIsExpanded,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const readMoreRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const check = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Create audio element — try poem-specific, fallback to global track
  useEffect(() => {
    setAudioReady(false);
    setIsPlaying(false);

    const src = poem.audio || FALLBACK_AUDIO;
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onReady = () => setAudioReady(true);
    const onError = () => {
      // If poem-specific fails, try fallback
      if (audio.src !== window.location.origin + FALLBACK_AUDIO) {
        audio.src = FALLBACK_AUDIO;
      }
    };

    audio.addEventListener('canplaythrough', onReady);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.src = src;

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', onReady);
      audio.removeEventListener('error', onError);
      audio.src = '';
      audioRef.current = null;
    };
  }, [poem.audio, poem.id]);

  // Stop audio when poem changes or card deactivates
  useEffect(() => {
    if (!isActive && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Clear heart burst after animation
  useEffect(() => {
    if (showHeartBurst) {
      const timer = setTimeout(() => setShowHeartBurst(false), 700);
      return () => clearTimeout(timer);
    }
  }, [showHeartBurst]);

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev);
    setShowHeartBurst(true);
  }, []);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audioReady) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying, audioReady]);

  // Magnetic hover effect for Read More button
  const handleReadMoreMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = readMoreRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;
  }, []);

  const handleReadMoreMouseLeave = useCallback(() => {
    const btn = readMoreRef.current;
    if (btn) btn.style.transform = 'translate(0, 0) scale(1)';
  }, []);

  const truncatedContent = poem.content.length > 180
    ? poem.content.substring(0, 180) + "..."
    : poem.content;

  // Poem lines for staggered reveal in modal
  const poemLines = poem.content.split('\n').filter(l => l.trim());

  return (
    <>
      {/* ═══════════════ EXPANDED MODAL ═══════════════ */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="poem-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,100,150,0.15) 0%, rgba(26,10,20,0.85) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="relative w-full mx-4 flex flex-col"
              style={{
                maxWidth: '600px',
                maxHeight: '85vh',
                borderRadius: 'var(--radius-modal)',
                overflow: 'hidden',
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(42, 16, 32, 0.95), rgba(26, 10, 20, 0.98))'
                  : 'linear-gradient(135deg, rgba(255, 240, 245, 0.97), rgba(255, 228, 240, 0.95))',
                border: '1px solid rgba(255, 182, 210, 0.3)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(24px)',
              }}
              initial={{ y: 60, scale: 0.96, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: 60, scale: 0.96, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button — frosted circle, rotates on hover */}
              <motion.button
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 182, 210, 0.2)',
                }}
                onClick={() => setIsExpanded(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              </motion.button>

              {/* Sticky header: image + title */}
              <div className="flex flex-col items-center pt-6 pb-4 px-6">
                {/* Image with blooming glow — clickable */}
                <motion.div
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    boxShadow: 'var(--shadow-bloom)',
                    border: '2px solid rgba(255, 182, 210, 0.3)',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  onClick={() => setIsImageExpanded(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={poem.image}
                    alt={poem.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* Modal title */}
                <motion.h2
                  className="mt-4 mb-1 text-center"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                    color: 'var(--text-primary)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {poem.title}
                </motion.h2>

                <motion.div
                  className="text-xs sakura-accent"
                  style={{ color: 'var(--text-muted)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {poem.theme.name} • with love
                </motion.div>
              </div>

              {/* Scrollable poem content — line-by-line staggered reveal */}
              <div className="flex-1 overflow-y-auto px-6 py-4" style={{ minHeight: 0 }}>
                {poemLines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="sakura-poem mb-2"
                    style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                      lineHeight: 1.9,
                      color: 'var(--text-secondary)',
                    }}
                    initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Floating island action bar */}
              <div className="px-6 py-4 flex-shrink-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
                <motion.div
                  className="sakura-glass-pill flex items-center justify-center gap-6 px-6 py-3 mx-auto"
                  style={{ maxWidth: '200px' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <motion.button
                    className="w-11 h-11 rounded-full flex items-center justify-center relative"
                    style={{
                      background: isLiked
                        ? 'linear-gradient(135deg, var(--accent-hot), #ff6b9d)'
                        : isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                    }}
                    onClick={handleLike}
                    whileTap={{ scale: 0.93 }}
                  >
                    <FiHeart
                      className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                      style={{ color: isLiked ? 'white' : 'var(--accent-hot)' }}
                    />
                    <HeartBurstParticles show={showHeartBurst} />
                  </motion.button>

                  {audioReady && (
                    <motion.button
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: isPlaying
                          ? 'linear-gradient(135deg, var(--accent-hot), #ff6b9d)'
                          : isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                      }}
                      onClick={handlePlayPause}
                      whileTap={{ scale: 0.93 }}
                    >
                      {isPlaying ? (
                        <FiPause className="w-5 h-5" style={{ color: isPlaying ? 'white' : 'var(--accent-hot)' }} />
                      ) : (
                        <FiPlay className="w-5 h-5 ml-0.5" style={{ color: 'var(--accent-hot)' }} />
                      )}
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ MAIN POEM CARD ═══════════════ */}
      <motion.div
        className={`
          group relative overflow-hidden mx-auto w-full
          max-w-sm md:max-w-md lg:max-w-lg
          transition-all duration-700 ease-out
        `}
        style={{
          borderRadius: 'var(--radius-card)',
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(255,182,210,0.08), rgba(255,100,150,0.04))'
            : 'linear-gradient(135deg, rgba(255,182,210,0.18), rgba(255,100,150,0.08))',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          border: '1px solid rgba(255, 182, 210, 0.25)',
          boxShadow: isActive
            ? '0 20px 60px rgba(255,59,122,0.15), 0 0 30px rgba(255,59,122,0.1)'
            : 'var(--shadow-card)',
          isolation: 'isolate',
        }}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        whileHover={{
          y: -4,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, { offset, velocity }) => {
          const threshold = 50;
          const velThreshold = 300;
          if (offset.x > threshold || velocity.x > velThreshold) onSwipeRight?.();
          else if (offset.x < -threshold || velocity.x < -velThreshold) onSwipeLeft?.();
        }}
        whileDrag={{ scale: 0.95 }}
        layout
      >
        {/* ─── Image Section ─── */}
        <div className="relative h-60 md:h-64 overflow-hidden" style={{ borderRadius: 'var(--radius-image) var(--radius-image) 0 0' }}>
          <motion.div
            className="absolute inset-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsImageExpanded(true)}
          >
            <img
              src={poem.image}
              alt={poem.title}
              className="w-full h-full object-cover"
              loading="lazy"
              style={{ borderRadius: 'var(--radius-image) var(--radius-image) 0 0' }}
            />

            {/* Gradient overlay fading to card bg */}
            <div
              className="absolute inset-0"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(to bottom, transparent 50%, rgba(26,10,20,0.6) 100%)'
                  : 'linear-gradient(to bottom, transparent 50%, rgba(255,240,245,0.6) 100%)',
              }}
            />

            {/* Shimmer sweep overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'shimmerSweep 2s ease-in-out',
              }}
            />
          </motion.div>

          {/* Frosted category tag over bottom-left of image */}
          <motion.div
            className="absolute bottom-3 left-3 z-10 sakura-glass-pill px-3 py-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span
              className="sakura-accent text-[10px] md:text-xs font-medium"
              style={{ color: isDarkMode ? 'var(--accent-sakura)' : 'var(--accent-hot)' }}
            >
              ✨ {poem.theme.name}
            </span>
          </motion.div>

          {/* Floating action buttons (top-right) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {/* Like button */}
            <motion.button
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center relative"
              style={{
                background: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,182,210,0.3)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
            >
              <FiHeart
                className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                style={{
                  color: 'var(--accent-hot)',
                  ...(isLiked ? { filter: 'drop-shadow(0 0 4px rgba(255,59,122,0.5))' } : {}),
                }}
              />
              {isLiked && (
                <div className="absolute inset-0 rounded-full sakura-pulse-ring" />
              )}
              <HeartBurstParticles show={showHeartBurst} />
            </motion.button>

            {/* Play/Pause button — only show if audio loaded */}
            {audioReady && (
              <motion.button
                className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                style={{
                  background: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,182,210,0.3)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
              >
                {isPlaying ? (
                  <div className="flex items-end gap-[2px] h-4">
                    <div className="w-[3px] bg-[var(--accent-hot)] rounded-full" style={{ animation: 'waveBar1 0.6s ease-in-out infinite' }} />
                    <div className="w-[3px] bg-[var(--accent-hot)] rounded-full" style={{ animation: 'waveBar2 0.5s ease-in-out infinite 0.1s' }} />
                    <div className="w-[3px] bg-[var(--accent-hot)] rounded-full" style={{ animation: 'waveBar3 0.7s ease-in-out infinite 0.2s' }} />
                  </div>
                ) : (
                  <FiPlay className="w-4 h-4 ml-0.5" style={{ color: 'var(--accent-hot)' }} />
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* ─── Content Section ─── */}
        <div className="relative p-5 md:p-6 flex flex-col gap-3">
          {/* Title — staggered reveal */}
          <motion.h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
          >
            {poem.title}
          </motion.h3>

          {/* Content preview */}
          <motion.p
            className="sakura-poem text-center"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              opacity: 0.75,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
          >
            {isContentExpanded ? poem.content : truncatedContent}
          </motion.p>

          {/* Action row */}
          <div className="flex items-center justify-between mt-1">
            {/* Read More — magnetic hover pill */}
            {poem.content.length > 180 && (
              <motion.button
                ref={readMoreRef}
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                onMouseMove={handleReadMoreMouseMove}
                onMouseLeave={handleReadMoreMouseLeave}
                className="relative overflow-hidden px-5 py-2 rounded-full text-white font-medium text-xs md:text-sm sakura-accent"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-hot), #ff6b9d)',
                  boxShadow: '0 4px 20px rgba(255,59,122,0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  willChange: 'transform',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {isContentExpanded ? 'Show Less' : 'Read More'}
                  <motion.span
                    animate={{ rotate: isContentExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </span>
              </motion.button>
            )}

            {/* Expand button — frosted glass circle with glow ring */}
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full ml-auto"
              style={{
                background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,59,122,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 182, 210, 0.3)',
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 0 4px rgba(255,59,122,0.2)',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FiMaximize2 className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--accent-hot)' }} />
            </motion.button>
          </div>
        </div>

        {/* ─── Expanded Image Overlay ─── */}
        <AnimatePresence>
          {isImageExpanded && (
            <motion.div
              key="image-fullscreen-overlay"
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              style={{
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageExpanded(false)}
            >
              <motion.button
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                onClick={() => setIsImageExpanded(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-6 h-6 text-white" />
              </motion.button>

              <motion.img
                src={poem.image}
                alt={poem.title}
                className="max-w-full max-h-full object-contain rounded-2xl"
                style={{ maxWidth: '95vw', maxHeight: '90vh' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default PoemCard;
