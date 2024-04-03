/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {    
      colors: {
        palette: {
          light: '#F5F3FF',
          primary: '#7C3AED',
          dark: '#6D28D9',
        },
      },
      fontFamily: {
        primary: ['Poppins'],
        secondary: ['Open Sans'],
        saira: ['Saira'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
  ],
}

