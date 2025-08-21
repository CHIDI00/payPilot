/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#F8F8FB",
          text: "#000000",
          gray: "#ffffff",
          gray100: "#e5e7eb",
        },
      },
    },
  },
  plugins: [],
};
