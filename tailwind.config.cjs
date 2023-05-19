/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a237e",
        secondary: "#8d6dc4",
        "light-white": "rgba(255,255,255,0.17)",
        "light-primary": "#2775FE",
      },
    },
  },
  plugins: [],
};
