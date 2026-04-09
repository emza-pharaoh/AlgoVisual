/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
       animation: {
        gradient: "gradientMove 10s ease infinite",
     },
     keyframes: {
      gradientMove: {
        "0%, 100%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
      },
    },
  },
  plugins: [],
}
}
