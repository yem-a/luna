/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colors from your wireframe
        background: "#020617",
        panel: "#0f172a",
        secondary: "#1e293b",
        text: {
          primary: "#ffffff",
          secondary: "#94a3b8",
        },
        accent: "#60a5fa",
      },
    },
  },
  plugins: [],
};
