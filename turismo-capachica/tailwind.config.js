/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ importante
  content: [
    "./src/**/*.{html,ts}",
    './src/**/*.component.html',   // ✅ Plantillas externas si tienes
    './src/**/*.component.ts',
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 0.3s ease-in-out',
        'fade-in-out': 'fadeInOut 3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInOut: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '10%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateY(10px)' },
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
