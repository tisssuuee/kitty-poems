import { motion } from "framer-motion"
import { Poem } from "../../data/poems"

interface HeaderProps {
  currentPoem?: Poem;
}

// Small inline rose SVG for decorative framing
const RoseSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mx-2">
    <path d="M12 2C12 2 9 5 9 8C9 9.5 9.8 10.8 11 11.5V14H10C8 14 6 16 6 18C6 20 8 22 12 22C16 22 18 20 18 18C18 16 16 14 14 14H13V11.5C14.2 10.8 15 9.5 15 8C15 5 12 2 12 2Z"
      fill="var(--accent-hot)" fillOpacity="0.6" />
    <path d="M12 6C11 7 10 8 10 9C10 10.1 10.9 11 12 11C13.1 11 14 10.1 14 9C14 8 13 7 12 6Z"
      fill="var(--accent-sakura)" />
  </svg>
);

export const Header = ({ currentPoem }: HeaderProps) => {
  return (
    <>
      {/* Subtitle above title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="text-center mb-2 md:mb-3 px-4"
      >
        <span
          className="sakura-subheading text-sm md:text-base tracking-widest uppercase"
          style={{
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
          }}
        >
          Poems for my cutu patootie
        </span>
      </motion.div>

      {/* Main Title: Riyuuuu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="text-center mb-3 md:mb-5 relative"
      >
        <h1
          className="sakura-shimmer-text"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Riyuuuu
        </h1>

        {/* Decorative framing line with rose */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center mt-3 md:mt-4 px-8"
        >
          <div
            className="flex-1 max-w-[80px] md:max-w-[120px] h-px"
            style={{ background: 'linear-gradient(to right, transparent, var(--accent-sakura))' }}
          />
          <RoseSVG />
          <div
            className="flex-1 max-w-[80px] md:max-w-[120px] h-px"
            style={{ background: 'linear-gradient(to left, transparent, var(--accent-sakura))' }}
          />
        </motion.div>

        {/* Subtitle below decorative line */}
        <motion.div
          className="mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span
            className="sakura-subheading text-sm md:text-base"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              letterSpacing: '0.05em',
            }}
          >
            🌸 a collection of love & memories 🌸
          </span>
        </motion.div>
      </motion.div>

      {/* Category pill - glassmorphism */}
      {currentPoem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center mb-4 md:mb-6"
        >
          <motion.div
            className="sakura-glass-pill inline-block px-5 py-2 md:px-6 md:py-2.5 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'translateX(-100%)',
              }}
              whileHover={{
                transform: 'translateX(100%)',
                transition: { duration: 0.6 }
              }}
            />
            <span
              className="sakura-accent text-xs md:text-sm font-medium relative z-10"
              style={{ color: 'var(--accent-hot)' }}
            >
              ✨ {currentPoem.theme.name}
            </span>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
