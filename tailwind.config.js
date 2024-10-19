/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myoffwhite: "#EFEFEF",
        mymint: "#D3E5DF",
        mylightblue: "#4F7AC3",
        mydarkblue: "#073589",
        mybrown: "#332521",
        myblack: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
