/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a4d4d",
          dark: "#0f2e2e",
          light: "#2d7a7a",
        },
        secondary: {
          DEFAULT: "#5dd3d3",
          dark: "#3bb8b8",
          light: "#7ee0e0",
        },
        accent: {
          orange: "#e07856",
          teal: "#4dd3d3",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(93, 211, 211, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(93, 211, 211, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
