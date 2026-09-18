/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#6CBF3D',
          'green-dark': '#4F9A2C',
          'green-light': '#86DB56',
          navy: '#0F1B2E',
          'navy-dark': '#09101C',
          'navy-light': '#1A2942',
          slate: '#3E7C8C',
          canvas: '#F6F8F7',
          border: '#E4E7EB'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
