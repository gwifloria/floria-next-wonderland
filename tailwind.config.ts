import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          "50": "#f6f7f6",
          "100": "#e1e6e2",
          "200": "#c2cdc5",
          "300": "#91a496",
          "400": "#768b7c",
          "500": "#5c7062",
          "600": "#48594d",
          "700": "#3c4940",
          "800": "#333c37",
          "900": "#2d3430",
          "950": "#171c19",
        },
        ginger: {
          "50": "#fbfaeb",
          "100": "#f2edb5",
          "200": "#eee49a",
          "300": "#e4cf60",
          "400": "#dbb934",
          "500": "#cba327",
          "600": "#af801f",
          "700": "#8c5e1c",
          "800": "#754c1e",
          "900": "#64401f",
          "950": "#3a210e",
        },
        nepal: {
          "50": "#f3f7f8",
          "100": "#e1e9ec",
          "200": "#c6d5db",
          "300": "#91aeba",
          "400": "#6f92a1",
          "500": "#537687",
          "600": "#486372",
          "700": "#3f525f",
          "800": "#394751",
          "900": "#333e46",
          "950": "#1f272d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
