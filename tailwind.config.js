/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9' },
        accent:  { DEFAULT: '#06b6d4' },
        bg:      { DEFAULT: '#050510', 2: '#0a0a1a', 3: '#0f0f24' },
        card:    { DEFAULT: '#12122a', hover: '#181835' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'blob-float': 'blobFloat 8s ease-in-out infinite',
        'pulse-dot':  'pulseDot 2s infinite',
        'blink':      'blink 1s infinite',
        'bounce-y':   'bounceY 2s infinite',
        'spin-slow':  'spin 0.8s linear infinite',
      },
      keyframes: {
        blobFloat: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(30px,-30px) scale(1.05)' } },
        pulseDot:  { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.6, transform: 'scale(1.3)' } },
        blink:     { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        bounceY:   { '0%,100%': { transform: 'translateX(-50%) translateY(0)' }, '50%': { transform: 'translateX(-50%) translateY(8px)' } },
      }
    }
  },
  plugins: []
};
