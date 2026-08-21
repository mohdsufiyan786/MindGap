import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090F",
          900: "#0B1020",
          800: "#10182A",
          700: "#172033",
          600: "#223049",
        },
        mist: {
          100: "#F4F7FB",
          200: "#D7E0EE",
          400: "#8B97AB",
          500: "#6B778C",
        },
        accent: {
          DEFAULT: "#5B8CFF",
          glow: "#7AA2FF",
        },
        mint: "#3EE0A2",
        amber: "#F5C14A",
        coral: "#FF6B7A",
        rose: "#FF5C8A",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(91, 140, 255, 0.18)",
        card: "0 20px 50px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
