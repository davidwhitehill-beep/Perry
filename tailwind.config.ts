import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4eddc",
        "paper-deep": "#e9dcc5",
        ink: "#1d2520",
        route: "#c24b36",
        sea: "#1f6f78",
        moss: "#61744b",
        ochre: "#d8a646"
      },
      fontFamily: {
        sans: ["var(--font-ui)", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
