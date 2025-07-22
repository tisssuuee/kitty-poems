import { useState, useEffect, useCallback } from 'react';
import { poems } from '../data/poems';

export interface ThemeState {
  currentTheme: any;
  isTransitioning: boolean;
  previousTheme: any | null;
}

export const useThemeSystem = (currentPoemIndex: number) => {
  const [themeState, setThemeState] = useState<ThemeState>({
    currentTheme: poems[0].theme,
    isTransitioning: false,
    previousTheme: null
  });

  const transitionToTheme = useCallback((newPoemIndex: number) => {
    const newTheme = poems[newPoemIndex].theme;
    
    if (newTheme.name !== themeState.currentTheme.name) {
      setThemeState(prev => ({
        currentTheme: prev.currentTheme,
        isTransitioning: true,
        previousTheme: prev.currentTheme
      }));

      // Smooth transition with magic timing
      setTimeout(() => {
        setThemeState({
          currentTheme: newTheme,
          isTransitioning: false,
          previousTheme: null
        });
      }, 300);
    }
  }, [themeState.currentTheme.name]);

  useEffect(() => {
    transitionToTheme(currentPoemIndex);
  }, [currentPoemIndex, transitionToTheme]);

  // Generate CSS custom properties for the current theme
  const getThemeCSS = useCallback(() => {
    const theme = themeState.currentTheme;
    return {
      '--theme-primary': theme.colors.primary,
      '--theme-secondary': theme.colors.secondary,
      '--theme-accent': theme.colors.accent,
      '--theme-text': theme.colors.text,
      '--theme-background': theme.colors.background,
      '--theme-card': theme.colors.card,
      '--theme-gradient-0': theme.gradient[0],
      '--theme-gradient-1': theme.gradient[1],
      '--theme-gradient-2': theme.gradient[2],
      '--theme-gradient-3': theme.gradient[3] || theme.gradient[0],
      '--theme-shadow': `0 8px 32px ${theme.colors.primary}15`,
      '--theme-glow': `0 0 30px ${theme.colors.primary}25`,
    } as React.CSSProperties;
  }, [themeState.currentTheme]);

  return {
    ...themeState,
    getThemeCSS,
    transitionToTheme
  };
};
