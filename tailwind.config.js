/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in": "slide-in 0.5s ease-in-out forwards",
        "slide-out": "slide-out 0.5s ease-in-out forwards",
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        "fade-out": "fade-out 0.5s ease-in-out forwards",
        "zoom-in": "zoom-in 0.5s ease-in-out forwards",
        "zoom-out": "zoom-out 0.5s ease-in-out forwards",
      },
      keyframes: {
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "zoom-in": {
          from: { transform: "scale(0.5)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
        "zoom-out": {
          from: { transform: "scale(1)", opacity: 1 },
          to: { transform: "scale(0.5)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
