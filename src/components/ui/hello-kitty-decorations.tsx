'use client';
import { useEffect, useState, useMemo } from "react";

interface SakuraPetal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  variant: 'a' | 'b';
}

// Inline SVG petal path — no emojis, pure CSS SVG shapes
const PetalSVG = ({ size, variant }: { size: number; variant: 'a' | 'b' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 2px 4px rgba(255,183,213,0.3))' }}
  >
    {variant === 'a' ? (
      <path
        d="M15 2C15 2 8 6 6 12C4 18 8 24 15 28C22 24 26 18 24 12C22 6 15 2 15 2Z"
        fill="var(--accent-sakura)"
        fillOpacity="0.7"
      />
    ) : (
      <path
        d="M15 3C12 5 6 10 7 16C8 22 13 26 15 27C17 26 22 22 23 16C24 10 18 5 15 3Z"
        fill="var(--accent-sakura)"
        fillOpacity="0.5"
      />
    )}
  </svg>
);

export const HelloKittyDecorations = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay slightly to avoid hydration issues
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate 16 petals with varying properties, memoized for performance
  const petals: SakuraPetal[] = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: (i * 6.25) + Math.random() * 5, // Spread across viewport width
      size: 12 + Math.random() * 14, // 12-26px
      delay: Math.random() * 12, // Random start delay
      duration: 8 + Math.random() * 7, // 8-15s fall time
      rotation: Math.random() * 360,
      variant: (Math.random() > 0.5 ? 'a' : 'b') as 'a' | 'b',
    }));
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.left}%`,
            top: '-30px',
            animation: `${petal.variant === 'a' ? 'sakuraDrift' : 'sakuraDriftAlt'} ${petal.duration}s linear ${petal.delay}s infinite`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          <div
            style={{
              animation: `sakuraSway ${3 + Math.random() * 2}s ease-in-out ${petal.delay}s infinite`,
            }}
          >
            <PetalSVG size={petal.size} variant={petal.variant} />
          </div>
        </div>
      ))}
    </div>
  );
};
