/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: '#D9D9D9',
        notSelected: '#fff',
        barDownBackground: '#7C768D',
        selected: '#E3010F',
        titleColor: '#FFFFFF',
        menuBackground: '#00072D',
        buttonBackground: '#D8101D',
        appBackground: '#65655E',
        editButton: '#ACBFA4',
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
}