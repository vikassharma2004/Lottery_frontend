/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan all files inside app/ and components/ recursively
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
