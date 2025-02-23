/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'translateX(-50%) rotate(0deg)' },
          '100%': { transform: 'translateX(-50%) rotate(360deg)' }
        }
      },
      animation: {
        spin: 'spin 10s linear infinite'
      }
    }
  },
  plugins: [],
}