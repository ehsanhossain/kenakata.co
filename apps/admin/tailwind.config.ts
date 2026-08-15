import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { charcoal: '#232A31', blue: '#1976D2', 'blue-hover': '#125FA9', 'blue-soft': '#E8F2FC' },
        neutral: { 0: '#FFFFFF', 50: '#F7F9FB', 100: '#EEF2F5', 200: '#DDE3E8', 300: '#C4CDD5', 500: '#66727E', 700: '#3E4852', 900: '#171C21' },
        semantic: { success: '#147D4A', 'success-soft': '#E6F5ED', warning: '#A45D00', 'warning-soft': '#FFF3D6', danger: '#C52A32', 'danger-soft': '#FDEBED' },
      },
      fontFamily: { latin: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
