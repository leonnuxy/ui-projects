// Tailwind CSS Configuration for Bistro Luxe
const tailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        'gold': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        'dark': {
          50: '#f8f7f4',
          100: '#f1efea',
          200: '#e3dfd4',
          300: '#d0c8b8',
          400: '#b8ab95',
          500: '#a8997f',
          600: '#9b8a73',
          700: '#817261',
          800: '#6a5d52',
          900: '#564d44',
          950: '#171612',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'ripple': 'ripple 0.6s linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(234, 179, 8, 0.8)' },
        },
        ripple: {
          'to': { 
            transform: 'scale(4)', 
            opacity: '0' 
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'gold': '0 4px 15px rgba(234, 179, 8, 0.3)',
        'gold-lg': '0 6px 20px rgba(234, 179, 8, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    }
  },
  plugins: [],
};

// Apply configuration to Tailwind
if (typeof tailwind !== 'undefined') {
  tailwind.config = tailwindConfig;
}

// Export for potential use in build systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = tailwindConfig;
}
