import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0d110d",
        surface: "#131813",
        ink: "#edf2ea",
        body: "#b6bfb3",
        muted: "#97a295",
        faint: "#5d675c",
        accent: "#d7f755",
      },
      fontFamily: {
        sans: ["Archivo", "Segoe UI", "system-ui", "sans-serif"],
        display: ["Archivo", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        DEFAULT: "3px",
      },
    },
  },
  plugins: [typography],
};
