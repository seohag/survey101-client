/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xxs: "344px",
      // => @media (min-width: 344px) {... }

      xs: "375px",
      // => @media (min-width: 375px) {... }

      xr: "414px",
      // => @media (min-width: 414px) {... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      smmd: "641px",
      // => @media (min-width: 641px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      md860: "860px",
      // => @media (min-width: 860px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      animation: {
        "slide-in": "slide-in 0.5s ease-in-out forwards",
        "slide-out": "slide-out 0.5s ease-in-out forwards",
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        "fade-out": "fade-out 0.5s ease-in-out forwards",
        "zoom-in": "zoom-in 0.5s ease-in-out forwards",
        "zoom-out": "zoom-out 0.5s ease-in-out forwards",
        resizeThumb: "resizeThumn 1s linear infinite",
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
        resizeThumb: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1.5)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
/* eslint-enable global-require */
