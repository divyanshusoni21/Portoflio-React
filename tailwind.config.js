/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: "#FFFFFF",
          surface: "#F8FAFC",
          green: "#0D9488",
          greenDark: "#0F766E",
          greenSoft: "#CCFBF1",
          ink: "#0F172A",
          muted: "#475569",
          faint: "#94A3B8",
          border: "#E2E8F0",
          link: "#2563EB",
          linkHover: "#1D4ED8",
        },
      },
      fontFamily: {
        sans: ["Raleway", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
