import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ea",
        oat: "#f3e3c7",
        almond: "#dfc29c",
        caramel: "#b97836",
        cocoa: "#432719",
        espresso: "#2a1710",
        sage: "#788568",
        rose: "#b46858"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 55px rgba(67, 39, 25, 0.13)",
        glow: "0 26px 80px rgba(185, 120, 54, 0.22)"
      }
    }
  },
  plugins: [forms]
};

export default config;
