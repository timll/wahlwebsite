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
      gray: {
        "200": "#F3F3F3", 
        "400": colors.trueGray["400"],
        "500": colors.trueGray["500"]
      },
      white: colors.white,
      purple: {
        DEFAULT: "#2E0091",
        light: "rgba(65, 0, 204, 0.2)",
        hover: "#EDEDFF"
      },
      yellow: {
        DEFAULT: "#FFF84F",
        normal: "#FCD34D",
        dark: "#FBBF24"
      },
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
      "serif": ["Amiri Regular", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"]
    },    
    container: {
      screens: {
         xl: "1024px",
         "2xl": "1024px",
      }
    },
    minHeight: {
      "1": "1rem",
      "2": "2rem",
      "3": "3rem",
      "4": "4rem",
      "8": "8rem",
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%'
    },
    maxHeight: {
      "8": "8rem",
      "16": "16rem",
      "1/2": "50%",
      "3/4": "75%",
      "full": "100%"
    },
    maxWidth: {
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
