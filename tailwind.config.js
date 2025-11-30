/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors: {
        colorfondo: "#E10600",
      },
      fontFamily: {
  "f1-bold": ["F1Bold", "sans-serif"],
  "f1-light": ["F1Light", "sans-serif"],
  "f1-title": ["F1Title", "sans-serif"],
},

    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
