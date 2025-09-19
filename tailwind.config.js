/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "Orbitron", "monospace"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
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
