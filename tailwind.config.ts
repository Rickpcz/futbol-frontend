// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#0D1A33',
        'fondo-claro': '#1C2B4A',
        texto: '#FFFFFF',
        verde: '#4CCC6C',
        azul: '#3791F0',
        dorado: '#B08D57',
        oscuro: '#121212',
      },
    },
  },
  plugins: [],
};

export default config;
