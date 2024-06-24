/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#093A3F',
          },
          secondary: '#39D180',
        }
      }
  },
  plugins: [],
}