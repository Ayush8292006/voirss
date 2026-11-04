/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          bg: '#F5F5F3',
          card: '#FFFFFF',
          studio: '#EDEDEB',
          black: '#0A0A0A',
          secondary: '#6B6B6B',
          muted: '#A8A8A8',
          border: '#E2E2E0',
          sale: '#B91C1C',
          lavender: '#C9A7F5',
          lavenderLight: '#E3C9FF',
        }
      },
      fontFamily: {
        heading: ['"Archivo"', '"Inter Tight"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace', 'sans-serif'],
      },
      backgroundImage: {
        'chrome-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #BDBDBD 30%, #6E6E6E 50%, #E8E8E8 70%, #9A9A9A 100%)',
        'lavender-gradient': 'linear-gradient(135deg, #C9A7F5 0%, #E3C9FF 100%)',
      },
      letterSpacing: {
        label: '0.15em',
        widestBrand: '0.25em',
        wideSerif: '0.2em',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(255,255,255,1))' },
        }
      },
      animation: {
        shine: 'shine 3s infinite',
        marquee: 'marquee 25s linear infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

