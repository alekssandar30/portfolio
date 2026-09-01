import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        canvas: "oklch(15.5% 0.012 150)",
        surface: "oklch(19.5% 0.016 150)",
        ink: "oklch(94% 0.009 145)",
        muted: "oklch(71% 0.012 145)",
        faint: "oklch(56% 0.01 145)",
        signal: "oklch(70% 0.105 154)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [typography],
};
