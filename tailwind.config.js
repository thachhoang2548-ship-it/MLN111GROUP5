/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soviet: {
          red: '#c21807',
          darkred: '#800000',
          gold: '#ffd700',
          lightgold: '#ffea70',
          beige: '#f5f5dc',
          darkbeige: '#d2b48c',
          dark: '#0f0f12',
          card: '#1a1a24',
          border: '#3a3a4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'Playfair Display', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
