import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagicalCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  glow?: boolean;
  floating?: boolean;
  tilt?: boolean;
  gradient?: string[];
  shimmer?: boolean;
  children?: React.ReactNode;
}

const MagicalCard = forwardRef<HTMLDivElement, MagicalCardProps>(
  ({ className, glow = false, floating = false, tilt = false, gradient, shimmer = false, children, ...props }, ref) => {
    const gradientBg = gradient 
      ? `linear-gradient(135deg, ${gradient.join(', ')})` 
      : undefined;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl backdrop-blur-md border border-white/20",
          "shadow-lg transition-all duration-500",
          glow && "shadow-[0_0_30px_rgba(147,51,234,0.3)]",
          floating && "hover:translate-y-[-8px]",
          shimmer && "overflow-hidden",
          className
        )}
        style={{
          background: gradientBg || "rgba(255, 255, 255, 0.1)",
        }}
        whileHover={tilt ? { 
          rotateY: 5, 
          rotateX: 5,
          scale: 1.02,
          transition: { duration: 0.3 }
        } : floating ? {
          y: -8,
          transition: { duration: 0.3 }
        } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...props}
      >
        {/* Shimmer effect */}
        {shimmer && (
          <div className="absolute inset-0 -top-px overflow-hidden rounded-2xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear"
              }}
            />
          </div>
        )}
        
        {/* Glow border effect */}
        {glow && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-md -z-10" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Magic corners */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-60" />
      </motion.div>
    );
  }
);

MagicalCard.displayName = "MagicalCard";

export { MagicalCard };
