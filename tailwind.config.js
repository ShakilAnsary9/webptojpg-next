/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        current: "#f59e0b",
        primary: "#f59e0b",
        dark: "#94a3b8",
        light_dark: "#334155",
        salert: "#dcfce7",
      },
      fontFamily: {
        space: "'Space Grotesk', sans-serif",
      },
      width: {
        mbtn: "70%",
        lbtn: "23%",
      },
    },
  },
  plugins: [],
};
