import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        headingXL: ["136px", "120%"],
        headingL: ["88px", "120%"],
        headingM: ["48px", "120%"],
        headingS: ["32px", "120%"],
        body: ["26px", "120%"],
      },
      textColor: {
        blue: "#2463ff",
        darkNay: "#261676",
        pink: "#FE71FE",
        lightBlue: "#7199FF",
      },
    },
  },
  plugins: [],
};
export default config;
