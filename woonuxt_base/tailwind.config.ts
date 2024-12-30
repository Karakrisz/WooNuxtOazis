/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'digital-seed': '#1AC78D',

        'dark-green': '#1C362B',
        'light-green': '#4B6752',
        'light-pastel-green': '#B0BBA2',
        'light-yellow': '#FBFADD',
        'light-pastel': '#F8FAEE',
        'no-stock': '#D47D7D',

        'primary': '#1C362B',
        'primary-dark': '#11241c',
        'secondary': '#4B6752',
        'secondary-dark': '#405a47',
        'disabled': '#B5B5B5',
        'dark': '#0A1310',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

