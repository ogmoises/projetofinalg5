import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        jersey: ['"Jersey 10"', 'cursive'],
        nunito: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        verde: {
          DEFAULT: '#10b981',
          escuro: '#059669',
        },
        roxo: {
          DEFAULT: '#8b5cf6',
        },
        preto: {
          DEFAULT: '#1f2937',
        },
        branco: {
          DEFAULT: '#f9fafb',
        },
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;