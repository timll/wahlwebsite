module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      purple: {
        DEFAULT: "#4100CC",
      },
      yellow: {
        DEFAULT: "#FFF500",
      },
      grey: {
        DEFAULT: "#DADADA",
      }
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
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
