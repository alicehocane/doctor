
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-gray': '#F5F5F7',
        'apple-text': '#1D1D1F',
        'apple-subtext': '#86868B',
      }
    },
  },
  plugins: [],
}
