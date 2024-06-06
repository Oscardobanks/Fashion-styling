/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'pinkish': {
          100: '#df4adf',
          200: '#c03cc0',
          300: '#bb42eb'
        },
        'brown': {
          100: '#444',
          200: '#666',
        },
        'creamwhite': '#f0f0f0',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

