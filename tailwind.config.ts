import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xs": { max: "320px" },
      xs: { min: "321px", max: "375px" },
      sm: { min: "376px", max: "640px" },
      md: { min: "641px", max: "768px" },
      lg: { min: "769px", max: "1024px" },
      xl: { min: "1025px", max: "1280px" },
      "2xl": { min: "1281px", max: "1440px" },
    },
    extend: {
      colors: {
        bgGradientStart: "rgb(52, 74, 186)",
        bgGradientEnd: "rgba(0, 20, 121, 0.82)",
        warning: "#ff3333",
        blue: "#2463FF",
        darkNavy: "#261676",
        pink: "#FE71FE",
        lightBlue: "#7199FF",
        navy: "#140e66",
        mediumBlue: "#3C74FF",
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
      boxShadow: {
        buttonShadow: "0 2px 0 3px navy, inset 0 6px 0 1px #3C74FF",
        hoverButtonShadow:
          "0 2px 0 3px navy, inset 0 6px 0 1px #2463FF, inset 0 0 0 1000px rgba(255, 255, 255, 0.25)",
        containerShadow:
          "inset 0 -8px 0 4px lightBlue, inset 0 6px 0 8px #2463ff",
      },
    },
  },
  plugins: [],
};
export default config;
