/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2871ff',
        'primary-light': '#357aff',
        'neutral-blue': '#7facf0',
        'neutral-dark': '#5580c2',
        'neutral-light': '#e9f4ff',
        'blue-dark': '#232323',
        'blue-light': '#bddfff',
        'gray-neutral': '#f5f7f9',
        'gray-dark': '#d3d3d3'
      },
      boxShadow: {
        bottom: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
        'bottom-pressed': '0 2px 4px 0 rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}
