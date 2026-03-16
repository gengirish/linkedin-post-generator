import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "if-purple": "#7c3aed",
        "if-cyan": "#00d4ff",
        "if-dark": "#030014",
      },
    },
  },
  plugins: [],
};
export default config;
