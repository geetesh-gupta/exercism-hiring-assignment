const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: "13px",
        sm: "14px",
        md: "15px",
        lg: "16px",
        h1: "32px",
      },
      lineHeight: {
        xs: "19.5px",
        sm: "21px",
        md: "22.5px",
        lg: "24px",
        xl: "25.5px",
        h1: "43px",
      },
      textColor: {
        labelDefault: "#130B43",
        labelSecondary: "#5C5589",
        labelTertiary: "#76709F",
        default: "#3F3A5A",
        secondary: "#3D3B45",
        link: "#2E57E8",
        contrast: "#FFFFFF",
      },
      backgroundColor: {
        labelDefault: "#130B43",
        default: "#FFFFFF",
        defaultHover: "#F4F7FD",
        secondaryHover: "#F0F3F9",
        input: "#F0F3F9",
        inputFocus: "#FFFFFF",
        paginationCurrent: "#E1EBFF",
        modal: "rgba(251, 252, 254, 0.7)",
        disabled: "#E0E0ED",
        alert: "#D85050",
        notification: "#FFF4E3",
      },
      borderColor: {
        input: "#8480A0",
        inputFocus: "#2E57E8",
        tabSelected: "#A7B7D6",
        paginationCurrent: "#6E82AA",
        button: "#D5D8E4",
      },
      dropShadow: {
        sm: "0px 4px 16px rgba(79, 114, 205, 0.1)",
        md: "0px 4px 24px rgba(79, 114, 205, 0.15)",
        lg: "0px 4px 42px rgba(79, 114, 205, 0.15)",
        notification: "0px 4px 24px rgba(156, 130, 38, 0.4)",
      },
      boxShadow: {
        input: "0px 0px 2px 2px rgba(46, 87, 232, 0.25)",
        button: "0px 1px 0px 1px rgba(203, 201, 217, 0.6)",
      },
      padding: {
        sm: "2px 12px",
        md: "8px 16px",
        lg: "12px 21px",
        xl: "14px 32px",
      },
      margin: {
        button: "0px 10px",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
