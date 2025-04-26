import { motion } from "framer-motion"

export const Header = () => {
  return (
    <>
      <motion.div
        initial={{ fontSize: "1.7rem" }}
        animate={{ fontSize: "1.4rem" }}
        transition={{ duration: 2, delay: 3, ease: "easeOut" }}
        className="text-center mb-8"
        style={{ willChange: 'transform' }}
      >
        <h1 className="font-bold text-gray-800 dark:text-gray-200 font-funnel">
          Poems for my cutu patootie
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: 1,
          x: [20, -20]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2,
            ease: "linear",
          },
          opacity: {
            duration: 0.5,
            delay: 1,
          },
        }}
        className="text-center mb-12"
        style={{ willChange: 'transform' }}
      >
        <h2 className="text-6xl font-bold font-funnel" style={{ color: '#F77FBE' }}>
          Riyuuuu
        </h2>
      </motion.div>
    </>
  )
}
