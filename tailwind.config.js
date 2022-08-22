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
    extend: {
      colors: {
        primary: {
          100: "#6da6f2",
          200: "#5999f1",
          300: "#448def",
          400: "#2f80ed",
          500: "#2f80ed",
          600: "#2a73d5",
          700: "#2666be",
          800: "#215aa6",
          900: "#1c4d8e",
        },
        darkBlue: "#05195b",
        disabled: "#D7E2E8",
        white: "#FFFFFF",
        borderGray: "#9D9D9C",
        red: "#D80B16",
      },
    },
  },
  plugins: [],
};
