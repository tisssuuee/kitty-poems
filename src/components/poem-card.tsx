import { motion, AnimatePresence } from 'framer-motion';
import { Poem } from '../data/poems';
import { FiVolume2 } from 'react-icons/fi';

interface PoemCardProps {
  poem: Poem;
  isActive: boolean;
}

const PoemCard: React.FC<PoemCardProps> = ({
  poem,
  isActive = false,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="poem-card relative p-4 rounded-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          scale: isActive ? 1.1 : 0.95,
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 20,
        }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <div className="card-inner-shadow absolute inset-0 rounded-lg pointer-events-none" />

        <div className="flex items-start gap-3 relative z-10">
          <motion.div
            className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 relative group cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={poem.image}
              alt={poem.title}
              className="w-full h-full object-cover"
              onError={(e) => console.log('Image load error in PoemCard:', e)}
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h2
              className="text-lg font-bold font-funnel text-white truncate"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {poem.title}
            </motion.h2>
            <motion.p
              className="text-sm text-neutral-900 font-borel dark:text-neutral-300"
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
            >
              <FiVolume2 size={20} />
            </motion.button>
          )}
        </div>

        <motion.div
          className="mt-4 bg-white/20 dark:bg-black/20  backdrop-blur-sm  rounded-md p-3 relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            // backgroundImage: `url(${poem.image})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'overlay',
          }}
        >
          <pre
            className="font-borel py-2 text-xl dark:text-white drop-shadow-sm"
            style={{
              lineHeight: '1.6',
              letterSpacing: '0.01em',
              wordSpacing: '0.05em',
            }}
          >
            {poem.content}
          </pre>
          <motion.div
            className="flex justify-center mt-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <span className="text-md">✨🎀✨</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PoemCard;
