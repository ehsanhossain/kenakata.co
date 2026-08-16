import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: '#232A31',
          blue: '#1976D2',
          'blue-hover': '#125FA9',
          'blue-soft': '#E8F2FC',
          emerald: '#059669',
          'emerald-hover': '#047857',
          'emerald-soft': '#ECFDF5',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#F7F9FB',
          100: '#EEF2F5',
          200: '#DDE3E8',
          300: '#C4CDD5',
          500: '#66727E',
          700: '#3E4852',
          900: '#171C21',
        },
        semantic: {
          success: '#147D4A',
          'success-soft': '#E6F5ED',
          warning: '#A45D00',
          'warning-soft': '#FFF3D6',
          danger: '#C52A32',
          'danger-soft': '#FDEBED',
          info: '#1976D2',
        },
      },
      fontFamily: {
        latin: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        bengali: ['Noto Sans Bengali Variable', 'Noto Sans Bengali', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.625rem',
        lg: '0.875rem',
        xl: '1.25rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgb(23 28 33 / 0.08)',
        md: '0 8px 24px rgb(23 28 33 / 0.10)',
        focus: '0 0 0 3px rgb(25 118 210 / 0.28)',
      },
      maxWidth: {
        content: '90rem',
        reading: '48rem',
      },
      spacing: {
        sidebar: '16.5rem',
      },
      transitionDuration: {
        fast: '120ms',
        normal: '180ms',
        slow: '240ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'count-down': {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s cubic-bezier(0.2, 0, 0, 1)',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.2, 0, 0, 1)',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.2, 0, 0, 1)',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.2, 0, 0, 1)',
        shimmer: 'shimmer 2s infinite linear',
        'pulse-soft': 'pulse-soft 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
