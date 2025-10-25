import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Replace with tokens extracted from keephearing.org once finalized
        brand: {
          primary: "#0052cc",
          accent: "#00c896",
          warning: "#ffb700"
        },
        card: "#f5f5f5"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
} satisfies Config;
