/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    // "./index.html",
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gold': 'rgba(213, 243, 101, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
})
