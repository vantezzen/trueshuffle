/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "slide-in-up":
          "slide-in-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
      },
      keyframes: {
        "slide-in-up": {
          "0%": {
            transform: "translateY(100%)",
            visibility: "visible",
          },
          "100%": {
            transform: "translateY(0)",
            visibility: "visible",
          },
        },
      },
    },
  },
  plugins: [],
};
