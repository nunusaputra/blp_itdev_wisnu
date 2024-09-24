const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#674EFF",
        secondary: "#000",
        third: "#c3231c",
      },
    },
  },
  plugins: [],
});
