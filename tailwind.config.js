/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        biruNeon: "#00C6FF",
        biruTua: "#0072FF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

