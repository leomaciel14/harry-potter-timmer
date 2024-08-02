/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bluu-next': ['"BluuNext-Bold"', 'sans-serif'],
        'bluu-next-bolditalic': ['"BluuNext-Bolditalic"', 'sans-serif'],
        'bluu-next-titling': ['"BluuNext-Titling"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};