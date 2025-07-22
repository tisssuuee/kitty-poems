import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorTrailPoint {
  x: number;
  y: number;
  id: number;
}

export const MagicalCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trailPoints, setTrailPoints] = useState<CursorTrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simplified mobile detection - only hide on very small screens with touch
    const checkMobile = () => {
      const isVerySmallScreen = window.innerWidth < 640;
      const isTouchDevice = 'ontouchstart' in window;
      setIsMobile(isVerySmallScreen && isTouchDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Always show cursor unless it's a very small touch device
    if (isMobile) {
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }

    let animationFrameId: number;

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      const newPoint: CursorTrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      };
      
      setTrailPoints(prev => {
        const newTrail = [newPoint, ...prev].slice(0, 15);
        return newTrail;
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], .cursor-magical')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], .cursor-magical')) {
        setIsHovering(false);
      }
    };

    const animate = () => {
      setTrailPoints(prev => 
        prev.filter((_, index) => index < 10).map((point) => ({
          ...point,
          x: point.x + (Math.random() - 0.5) * 0.5,
          y: point.y + (Math.random() - 0.5) * 0.5,
        }))
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    animate();

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', checkMobile);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);

  // Only hide on very small touch devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor - more visible with shimmer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
        }}
      >
        {/* Outer glow ring - much brighter */}
        <div 
          className="absolute inset-0 w-4 h-4 rounded-full animate-ping"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.9) 0%, rgba(236, 72, 153, 0.7) 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
            animation: 'magical-pulse 1.5s ease-in-out infinite',
            boxShadow: '0 0 30px rgba(147, 51, 234, 0.8), 0 0 60px rgba(236, 72, 153, 0.6)',
          }}
        />
        
        {/* Secondary glow layer */}
        <div 
          className="absolute inset-0 w-6 h-6 -translate-x-1 -translate-y-1 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, transparent 30%, rgba(255, 255, 255, 0.4) 50%, rgba(147, 51, 234, 0.3) 80%)',
            filter: 'blur(2px)',
            animation: 'magical-pulse 2s ease-in-out infinite reverse',
          }}
        />
        
        {/* Main cursor dot with ultra-enhanced shimmer */}
        <div 
          className="relative w-4 h-4 rounded-full overflow-hidden cursor-shimmer"
          style={{
            background: 'linear-gradient(45deg, #ffffff, #fbbf24, #a855f7, #ec4899, #ffffff)',
            boxShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(236, 72, 153, 0.6)',
            border: '2px solid rgba(255,255,255,0.9)',
            filter: 'brightness(1.5) saturate(1.3)',
          }}
        >
          {/* Ultra-bright shimmer overlay */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(45deg, transparent 20%, rgba(255,255,255,1) 50%, transparent 80%)',
              backgroundSize: '200% 200%',
              filter: 'brightness(2)',
            }}
            animate={{
              backgroundPosition: ['-200% -200%', '200% 200%'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Additional sparkle effect */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Enhanced magical shimmer trail */}
      {trailPoints.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          initial={{
            x: point.x - 3,
            y: point.y - 3,
            opacity: 0.8,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        >
          <div 
            className="relative w-2 h-2 rounded-full overflow-hidden"
            style={{
              background: `linear-gradient(45deg, hsl(${(index * 60) % 360}, 80%, 70%), hsl(${(index * 60 + 30) % 360}, 80%, 60%))`,
              boxShadow: `0 0 8px hsl(${(index * 60) % 360}, 80%, 70%), 0 0 16px hsl(${(index * 60) % 360}, 60%, 50%)`,
            }}
          >
            {/* Individual trail shimmer */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.6), transparent)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['-100% -100%', '100% 100%'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Enhanced hover shimmer effect */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        >
          <div 
            className="relative w-8 h-8 rounded-full overflow-hidden"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            {/* Rotating shimmer ring */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.6), transparent, rgba(255,255,255,0.6), transparent)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};
