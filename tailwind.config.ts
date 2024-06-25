import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        title: "2.50rem",
        subtitle: "1.875rem",
        text: "1.5rem",
      },
      fontFamily: {
        cal: ["var(--font-cal)", ...fontFamily.sans],
      },
      maxWidth: {
        small: "320px", // min-w-small
        medium: "480px", // min-w-medium
        large: "640px", // min-w-large
      },
      minWidth: {
        small: "320px", // min-w-small
        medium: "480px", // min-w-medium
        large: "640px", // min-w-large
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
