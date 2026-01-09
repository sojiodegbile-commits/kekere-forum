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
          500: '#E86A33',
          600: '#D55E2A',
        },
        teal: {
          600: '#2D9596',
          700: '#267C7D',
        },
        cream: {
          50: '#FBF8F3',
          100: '#F5EFE7',
        }
      }
    },
  },
  plugins: [],
};
export default config;