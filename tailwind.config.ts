/** @type {import('tailwindcss').Config} */
import tailwindTypography from "@tailwindcss/typography";
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    // "./error.vue",

    // title-editor.vue
    "border-purple-600/80",
    "border-red-600/75",
  ],
  theme: {
    extend: {
      Zindex: {
        "-10": "-10",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        sans: ["Inter"],
        serif: ["Inter"],
        mono: ["Inter"],
        display: ["Inter"],
      },
    },
  },
  plugins: [tailwindTypography],
};
