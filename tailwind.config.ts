import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Sage Green + Warm Beige theme
        'sage': {
          light: '#E8F0E5',
          DEFAULT: '#8B9D83',
          dark: '#6B7D63',
        },
        'warm-beige': {
          light: '#FDF8F3',
          DEFAULT: '#E8B4A8',
          dark: '#D49B8E',
        },
        'cream': {
          light: '#FFFBF7',
          DEFAULT: '#FAF8F5',
        },
        // Keep orange as accent
        'orange': {
          light: '#FFE5D9',
          DEFAULT: '#F97316',
          dark: '#EA580C',
        },
        'teal': {
          light: '#D1FAE5',
          DEFAULT: '#10B981',
          dark: '#059669',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;