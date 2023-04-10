/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-dark-1': '#69665C',
        'custom-yellow': '#fff9de',
        'custom-blue': '#3faefc',
      },
    },
  },
  plugins: [],
};
