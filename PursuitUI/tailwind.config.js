/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'backgroud': "url('/public/backdrop.jpeg')",
      }
    },
  },
  plugins: [],
}
