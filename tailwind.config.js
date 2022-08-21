/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      primary: "#2F80ED",
      disabled: "#D7E2E8",
      white: "#FFFFFF",
    },
    // extend: {},
  },
  plugins: [],
};
