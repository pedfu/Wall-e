/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
    },
    colors: {
      black: '#000000',
      darkGrey: '#121212',
      grey: '#2A2A2A',
      white: '#EAEAEA',
      fontGrey: '#767675',
      bgWhite: '#F9F9F9',
      red: '#ED4337',
      brown: '#8B6D37',
      success: '#38E54D',
      error: '#F96666',
      default: '#D0D4CA'
    },
  },
  plugins: [],
};