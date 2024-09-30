/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ['Raleway', 'sans-serif'],
        Arthemis: ['Arthemis', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'very-dark-purple': '#4A3576',
        'dark-purple': '#614499',
        'light-purple': '#7A59BD',
        'cream-bg': '#F4F2EE',
      },
    },
  },
  plugins: [],
};
