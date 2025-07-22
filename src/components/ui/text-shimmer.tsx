'use client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
  duration?: number;
  variant?: 'default' | 'rainbow' | 'cosmic' | 'gold' | 'magical';
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const TextShimmer = ({ 
  children, 
  className, 
  shimmerWidth = 100, 
  duration = 2.5,
  variant = 'default',
  disabled = false,
  style
}: TextShimmerProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'rainbow':
        return 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500';
      case 'cosmic':
        return 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600';
      case 'magical':
        return 'bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 brightness-200 saturate-150';
      default:
        return 'bg-gradient-to-r from-transparent via-white via-gray-100 to-transparent brightness-200';
    }
  };

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={cn(
        "relative inline-block overflow-hidden",
        className
      )}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className={cn(
          "absolute inset-0 -top-1 -bottom-1",
          getVariantClasses(),
          "bg-clip-text text-transparent mix-blend-difference"
        )}
        style={{
          backgroundSize: `${shimmerWidth}% 100%`,
        }}
        animate={{
          backgroundPosition: ['-300% 0%', '300% 0%'],
        }}
        transition={{
          duration: duration * 0.7,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.span>
      
      {/* Additional sparkle effects for magical variant */}
      {variant === 'magical' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-yellow-300 text-xs"
              style={{
                left: `${20 + i * 30}%`,
                top: "10%",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              ✨
            </motion.span>
          ))}
        </div>
      )}
    </motion.span>
  );
};