import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to get adaptive theme colors based on dark mode
export const getAdaptiveThemeColors = (themeColors: any, isDarkMode: boolean) => {
  if (!isDarkMode) {
    return themeColors; // Return original colors for light mode
  }
  
  // Dark mode variants - ZESTY and ZINGY! Keep them super vibrant!
  const adaptedColors = {
    ...themeColors,
    primary: adjustColorForDarkMode(themeColors.primary, 0.95), // Keep 95% intensity - SUPER VIBRANT!
    secondary: adjustColorForDarkMode(themeColors.secondary, 0.9), // Keep 90% intensity 
    accent: adjustColorForDarkMode(themeColors.accent, 0.85), // Keep 85% intensity
    background: getDarkModeBackground(themeColors.background, themeColors.primary, themeColors.secondary),
    text: '#f8fafc', // Brighter text for better contrast
    card: 'rgba(51, 65, 85, 0.85)' // Lighter dark background - more zesty!
  };
  
  return adaptedColors;
};

// Helper function to adjust individual colors for dark mode - KEEP THEM ZINGY!
const adjustColorForDarkMode = (color: string, intensity: number = 0.95): string => {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Keep colors SUPER vibrant and zesty!
  const darkR = Math.max(60, Math.floor(r * intensity)); // Higher minimum for more vibrancy
  const darkG = Math.max(60, Math.floor(g * intensity));
  const darkB = Math.max(60, Math.floor(b * intensity));
  
  return `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
};

// Helper function to get ZESTY dark mode background
const getDarkModeBackground = (originalBackground: string, primary: string, secondary: string): string => {
  // Create a vibrant dark gradient that's still zesty!
  const zestyPrimary = adjustColorForDarkMode(primary, 0.6); // More vibrant base
  const zestySecondary = adjustColorForDarkMode(secondary, 0.7);
  
  return `linear-gradient(135deg, ${zestyPrimary}60 0%, ${zestySecondary}50 30%, #334155 70%, #1e293b 100%)`;
};

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