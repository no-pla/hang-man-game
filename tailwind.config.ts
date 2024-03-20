import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "3sm": { max: "320px" },
      "2sm": { max: "375px" },
      sm: { max: "640px" },
      md: { max: "768px" },
      lg: { max: "1024px" },
      xl: { max: "1280px" },
      "2xl": { max: "1440px" },
    },
    extend: {
      colors: {
        bgGradientStart: "rgb(52, 74, 186)",
        bgGradientEnd: "rgba(0, 20, 121, 0.82)",
      },
      fontSize: {
        headingXL: ["136px", "120%"],
        headingL: ["88px", "120%"],
        headingM: ["48px", "120%"],
        headingS: ["32px", "120%"],
        body: ["26px", "120%"],
        bodyM: ["16px", "120%"],
        bodyS: ["12px", "120%"],
      },
      textColor: {
        blue: "#2463FF",
        darkNay: "#261676",
        pink: "#FE71FE",
        lightBlue: "#7199FF",
      },
      backgroundColor: {
        blue: "#2463FF",
        darkNay: "#261676",
        pink: "#FE71FE",
        lightBlue: "#7199FF",
      },
      boxShadow: {
        buttonShadow: "inset 0 -2px 0 3px #140e66, inset 0 1px 0 6px #3C74FF",
        hoverButtonShadow:
          "inset 0 -2px 0 3px #140e66, inset 0 1px 0 6px #3C74FF, inset 0 0 0 1000px rgba(255, 255, 255, 0.25)",
        containerShadow:
          "inset 0 -8px 0 4px #140e66, inset 0 6px 0 8px #2463ff",
      },
    },
  },
  plugins: [],
};
export default config;
