/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    screens: {
      xxs: "375px",
      xs: "500px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "h1": "50px",
        "h2": "48px"
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      primary: "#58b5ac",
      light: {
        300: "#FAF3FC",
      },
      purple: {
        300: "#69d9ce",
        900: "#346c67",
      },
      gray: {
        50: "#F9FAFB",
        200: "#EAECF0",
        300: "#D0D5DD",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1D2939",
        900: "#101828",
      },
      gradient: {
        300: "#69d9ce",
        500: "#58b5ac",
        600: "#4fa29a",
      },
      red: "red",
      teal: "#58b5ac",
    },
  },
  plugins: [],
};
