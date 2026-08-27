/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Inter", "Noto Sans Myanmar", "sans-serif"],
        body: ["Inter", "Noto Sans Myanmar", "sans-serif"],
        myanmar: ["Noto Sans Myanmar", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        nest: "var(--radius-nest)",
      },
    },
  },
  plugins: [],
}
