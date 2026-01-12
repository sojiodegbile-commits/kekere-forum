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
        orange: {
          DEFAULT: '#E86A33',
          light: '#F08B5C',
          dark: '#D55E2A',
        },
        teal: {
          DEFAULT: '#2D9596',
          light: '#5AB5B6',
          dark: '#267C7D',
        },
        cream: {
          DEFAULT: '#FBF8F3',
          light: '#FBF8F3',
          dark: '#F5EFE7',
        }
      }
    },
  },
  plugins: [],
};

export default config;