const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    // enabled: true,
    content: [
    './src/**/*.html',
    './src/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      purple: {
        DEFAULT: "#4100CC",
        light: "rgba(65, 0, 204, 0.2)"
      },
      yellow: {
        DEFAULT: "#FFF500",
        normal: "#FCD34D",
        dark: "#FBBF24"
      },
      gray: colors.trueGray,
      white: colors.white,
      green: {
        DEFAULT: "#22C55E",
        dark: "#16A34A"
      },
      red: {
        DEFAULT: "#EF4444",
        dark: "#DC2626"
      },
      transparent: "rgba(0,0,0,0)"
    },
    flexGrow: {
      "0": 0,
      DEFAULT: 1,
      "2": 2,
      "3": 3,
      "7": 7,
      "8": 8,
      "10": 10,
    },
    fontFamily: {
      "sans": ["Meera Inimai", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
    },    
    container: {
      screens: {
         xl: "1024px",
         "2xl": "1024px",
      }
    },
    maxHeight: {
      "1/2": "50%",
      "3/4": "75%",
      "full": "100%"
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
     '3': '3px',
      '4': '4px',
     '6': '6px',
     '8': '8px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
