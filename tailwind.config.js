/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    // "./error.vue",
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
  plugins: [],
};
