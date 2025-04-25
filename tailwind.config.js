/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/components/ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lavender': '#E6E6FA',
        'matcha-green': '#D4E9D7',
        background: {
          base: 'var(--background-base)',
          highlight: 'var(--background-highlight)',
          press: 'var(--background-press)',
          elevated: {
            base: 'var(--background-elevated-base)',
            highlight: 'var(--background-elevated-highlight)',
            press: 'var(--background-elevated-press)',
          },
          tinted: {
            base: 'var(--background-tinted-base)',
            highlight: 'var(--background-tinted-highlight)',
            press: 'var(--background-tinted-press)',
          },
        },
        text: {
          base: 'var(--text-base)',
          subdued: 'var(--text-subdued)',
          'bright-accent': 'var(--text-bright-accent)',
          negative: 'var(--text-negative)',
          warning: 'var(--text-warning)',
          positive: 'var(--text-positive)',
          announcement: 'var(--text-announcement)',
        },
      },
      fontFamily: {
        sans: ['CircularSp', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 0 60px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};