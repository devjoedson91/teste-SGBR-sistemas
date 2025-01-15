/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mainBlue: "#0062fe",
        darkBlue: "#00071a",
        lightBlue: "#0092fd",
      },
    },
  },
  plugins: [],
};
