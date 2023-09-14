/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#2871ff',
        'neutral': '#7facf0',
        'neutral-dark': '#5580c2',
        'neutral-light': '#bddfff',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      }
    },

  },
  plugins: []
}
