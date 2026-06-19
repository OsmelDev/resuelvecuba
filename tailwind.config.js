/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        resuelve: {
          "azul-profundo": "#1E3A5F",
          "azul-brillante": "#3B82F6",
          naranja: "#F59E0B",
          "gris-suave": "#F3F4F6",
        },
      },
    },
  },
  plugins: [],
};
