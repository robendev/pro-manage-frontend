/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'azul-brillante': '#007BFF',
        'azul-oscuro': '#0056b3',
        'azul-claro': '#e0f7fa',
        'gris-oscuro': '#495057',
      },
      screens: {
        'sm-500': '500px',
      }
    },
  },
  plugins: [],
};
