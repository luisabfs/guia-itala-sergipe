/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        playfair: ['var(--font-playfair)'],
      },
      colors: {
        primary: {
          DEFAULT: '#1C3D33',
          dark: '#0F2A22',
          light: '#2A5A4A',
        },
        secondary: {
          DEFAULT: '#F8F5F2',
          dark: '#E8E0D8',
          light: '#FDFCFA',
        },
        accent: {
          DEFAULT: '#2C5F5F',
          light: '#4A8A8A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C866',
        }
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1' }],
        'hero-sub': ['clamp(1.25rem, 3vw, 1.35rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

