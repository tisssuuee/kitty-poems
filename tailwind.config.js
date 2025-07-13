/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/components/ui/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Modern Spotify-like fonts
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'manrope': ['Manrope', 'system-ui', 'sans-serif'],
        // Original fonts for fallback
        funnel: ['"Funnel Display"', 'sans-serif'],
        borel: ['"Borel"', 'cursive'],
        // Default system fonts
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'meteor-effect': 'meteor 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
        },
      },
      colors: {
        'kitty-pink': {
          light: '#ffc0cb',
          DEFAULT: '#f77fbe',
          dark: '#e91e63',
        },
      },
      boxShadow: {
        'kitty': '0 4px 14px 0 rgba(247, 127, 190, 0.39)',
        'glow': '0 0 20px rgba(247, 127, 190, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(247, 127, 190, 0.2)',
      },
    }
  },
  plugins: [],
};
