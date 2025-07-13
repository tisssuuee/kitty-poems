import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Clean contrast system for maximum readability without heavy shadows
export const getContrastColor = (backgroundColor: string, primaryColor: string, fallbackColor: string) => {
  // Theme-specific color mappings with high contrast
  const themeColorMapping = {
    // Light themes - use very dark text
    white: '#000000',
    light: '#000000', 
    pink: '#1a1a1a',
    lavender: '#1a1a1a',
    spring: '#000000',
    cherry: '#2d1b1b',
    sunflower: '#2d2d00',
    desert: '#3d2d00',
    
    // Dark themes - use very light text
    black: '#ffffff',
    dark: '#ffffff',
    purple: '#ffffff',
    blue: '#ffffff', 
    night: '#ffffff',
    ocean: '#ffffff',
    royal: '#ffffff',
    
    // Colorful themes - use contrasting colors
    orange: '#1a1a1a',
    red: '#ffffff',
    green: '#ffffff',
    matcha: '#1a1a1a',
    neon: '#000000',
    cyber: '#00ff88',
    gold: '#1a1a1a',
  };
  
  // Check if we have a specific mapping for this background
  const lowerBg = backgroundColor.toLowerCase();
  for (const [key, value] of Object.entries(themeColorMapping)) {
    if (lowerBg.includes(key)) {
      return value;
    }
  }
  
  // Fallback to high contrast black or white
  return '#000000'; // Default to black for better readability
};

// Minimal text shadow for clean readability
export const getTextShadow = (backgroundColor: string, primaryColor: string) => {
  const lowerBg = backgroundColor.toLowerCase();
  
  // Light backgrounds - minimal dark shadow only if needed
  if (lowerBg.includes('white') || lowerBg.includes('light') || lowerBg.includes('spring') || lowerBg.includes('sunflower')) {
    return 'none'; // No shadow for clean look
  }
  
  // Dark backgrounds - minimal light shadow only if needed
  if (lowerBg.includes('black') || lowerBg.includes('dark') || lowerBg.includes('purple') || lowerBg.includes('blue') || lowerBg.includes('ocean') || lowerBg.includes('royal')) {
    return 'none'; // No shadow for clean look
  }
  
  // For colorful backgrounds, very minimal shadow
  return '0 1px 2px rgba(0,0,0,0.1)';
};

// Generate theme-aware opacity values
export const getThemeOpacity = (backgroundColor: string, baseOpacity: number) => {
  const lowerBg = backgroundColor.toLowerCase();
  
  // Light backgrounds need higher opacity for visibility
  if (lowerBg.includes('white') || lowerBg.includes('light') || lowerBg.includes('spring') || lowerBg.includes('sunflower')) {
    return Math.min(baseOpacity + 0.2, 1);
  }
  
  // Dark backgrounds can use lower opacity
  if (lowerBg.includes('black') || lowerBg.includes('dark') || lowerBg.includes('night')) {
    return Math.max(baseOpacity - 0.05, 0.4);
  }
  
  return baseOpacity;
};

// Get readable color for different text types with maximum contrast
export const getReadableTextColor = (theme: any, textType: 'primary' | 'secondary' | 'accent' = 'primary') => {
  const baseColor = getContrastColor(theme.colors.background, theme.colors.primary, theme.colors.text);
  
  switch (textType) {
    case 'primary':
      return baseColor;
    case 'secondary':
      // For secondary text, use slightly less opacity but still readable
      return baseColor === '#000000' ? '#444444' : '#bbbbbb';
    case 'accent':
      return theme.colors.primary; // Use theme primary for accents
    default:
      return baseColor;
  }
};

// Enhanced button styling based on theme
export const getButtonStyles = (theme: any, variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const baseColor = getContrastColor(theme.colors.background, theme.colors.primary, theme.colors.text);
  
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: `${theme.colors.primary}25`,
        borderColor: `${theme.colors.primary}50`,
        color: theme.colors.primary,
      };
    case 'secondary':
      return {
        backgroundColor: `${theme.colors.primary}15`,
        borderColor: `${theme.colors.primary}30`,
        color: baseColor,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: `${theme.colors.primary}25`,
        color: baseColor,
      };
    default:
      return {
        backgroundColor: `${theme.colors.primary}25`,
        borderColor: `${theme.colors.primary}50`,
        color: theme.colors.primary,
      };
  }
};