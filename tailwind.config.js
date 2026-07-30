module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6BB24E",
          dark: "#4f8a3b",
        },
      },
      fontFamily: {
        serif: [
          "Playfair Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
