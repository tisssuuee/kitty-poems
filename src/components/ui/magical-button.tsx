import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const magicalButtonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        magical: [
          "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500",
          "text-white shadow-lg hover:shadow-xl",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
          "after:absolute after:inset-0 after:bg-gradient-to-r after:from-purple-600/50 after:to-pink-600/50 after:opacity-0 hover:after:opacity-100 after:transition-opacity"
        ],
        sparkle: [
          "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400",
          "text-white shadow-lg hover:shadow-2xl",
          "hover:scale-105 active:scale-95",
          "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        ],
        ethereal: [
          "bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400",
          "text-white shadow-lg backdrop-blur-sm",
          "border border-white/20",
          "hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
          "transition-all duration-500"
        ],
        ghost: [
          "bg-transparent border-2 border-dashed border-purple-400/50",
          "text-purple-600 hover:text-white",
          "hover:bg-gradient-to-r hover:from-purple-500/80 hover:to-pink-500/80",
          "hover:border-solid hover:border-purple-400",
          "backdrop-blur-sm"
        ],
        neon: [
          "bg-black border-2 border-cyan-400",
          "text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
          "hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]",
          "hover:text-white hover:bg-cyan-400/10",
          "transition-all duration-300"
        ]
      },
      size: {
        sm: "h-8 rounded-lg px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "magical",
      size: "default",
    },
  }
);

export interface MagicalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof magicalButtonVariants> {
  asChild?: boolean;
  ripple?: boolean;
  sparkles?: boolean;
}

const MagicalButton = forwardRef<HTMLButtonElement, MagicalButtonProps>(
  ({ className, variant, size, asChild = false, ripple = true, sparkles = false, children, onClick, ...props }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        
        setRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }
      
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      
      onClick?.(e);
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative"
      >
        <Comp
          className={cn(magicalButtonVariants({ variant, size, className }))}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {/* Ripple effect */}
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
          
          {/* Sparkle effects */}
          {sparkles && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-300 text-xs"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: "50%",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Content with press animation */}
          <motion.span
            animate={{ scale: isPressed ? 0.95 : 1 }}
            transition={{ duration: 0.1 }}
            className="relative z-10"
          >
            {children}
          </motion.span>
        </Comp>
      </motion.div>
    );
  }
);

MagicalButton.displayName = "MagicalButton";

export { MagicalButton, magicalButtonVariants };
