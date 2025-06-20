// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#0D1A33',           // fondo principal
        'fondo-claro': '#1C2B4A',   // tarjetas, cajas
        texto: '#FFFFFF',           // texto normal
        verde: '#4CCC6C',           // verde del logo
        azul: '#3791F0',            // azul del logo
        dorado: '#B08D57',          // dorado del logo
        oscuro: '#121212',          // fondo más oscuro
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
