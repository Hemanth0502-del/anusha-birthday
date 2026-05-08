import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#e8a9b5",
        lavender: "#d8b6ad",
        cream: "#fff2ea",
        berry: "#8a4f57",
        petal: "#fbe1e4",
        mint: "#dbc2b8",
        sunshine: "#f2cdbf"
      },
      boxShadow: {
        pastel: "0 24px 70px rgba(138, 79, 87, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
