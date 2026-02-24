import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rome: {
          gray: "#737373",
          darkGreen: "#607356",
          cream: "#F6F6E8",
          lightGreen: "#ABE188",
          mediumGreen: "#5f7255",
          mutedGreen: "#96a480",
        },
      },
      fontFamily: {
        sans: ["var(--font-gotham)", "Inter", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-adelphi)", "Georgia", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
