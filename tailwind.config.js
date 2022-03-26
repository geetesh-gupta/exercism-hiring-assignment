const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      gridTemplateColumns: ({ theme }) => ({
        testimonial: `${theme("width.8")} ${theme(
          "width.11"
        )} minmax(320px, 2fr) minmax(70ch, 3fr) minmax(120px, 1fr) ${theme(
          "width.2"
        )}`,
      }),
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
