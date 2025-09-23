import type { Config } from "tailwindcss";

const config: Config = {
  // Removed aggressive !important strategy in favor of CSS Layers approach
  // See src/styles/layers.css for the new layered styling strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "var(--font-mono)",
          "Orbitron",
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      colors: {
        // KEK Terminal colors
        "kek-green": "#00FF37",
        "kek-blue": "#00E0D0",
        "kek-yellow": "#FEE107",
        "kek-red": "#FF0000",
        // Background colors
        "bg-main": "#0A0A0A",
        "bg-card": "#1B1B1B",
        "bg-border": "#3C3C3C",
        // Extended color palette for easier Tailwind usage
        "green-400": "#00FF37",
        "cyan-400": "#00E0D0",
        "yellow-400": "#FEE107",
        "red-500": "#FF0000",
        // Proper purple colors matching Tailwind defaults
        "purple-100": "#f3e8ff", // Tailwind purple-100
        "purple-200": "#e9d5ff", // Tailwind purple-200
      },
      // Force generation of text utilities for custom colors
      textColor: {
        "kek-green": "#00FF37",
        "kek-blue": "#00E0D0",
        "kek-yellow": "#FEE107",
        "kek-red": "#FF0000",
      },
      animation: {
        gradient: "gradient 3s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
