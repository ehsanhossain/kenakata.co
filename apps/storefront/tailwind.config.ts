import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-bg-canvas)',
        surface: {
          subtle: 'var(--color-bg-subtle)',
          muted: 'var(--color-bg-muted)',
          elevated: 'var(--color-bg-elevated)',
          inverse: 'var(--color-bg-inverse)',
          brand: 'var(--color-surface-brand)',
          'brand-subtle': 'var(--color-surface-brand-subtle)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          inverse: 'var(--color-text-inverse)',
          brand: 'var(--color-text-brand)',
          'on-brand': 'var(--color-text-on-brand)',
          'on-brand-large': 'var(--color-text-on-brand-large)',
        },
        icon: {
          primary: 'var(--color-icon-primary)',
          secondary: 'var(--color-icon-secondary)',
          brand: 'var(--color-icon-brand)',
          inverse: 'var(--color-icon-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          brand: 'var(--color-border-brand)',
          focus: 'var(--color-border-focus)',
        },
        action: {
          primary: 'var(--color-action-primary-bg)',
          'primary-hover': 'var(--color-action-primary-hover)',
          'primary-text': 'var(--color-action-primary-text)',
          secondary: 'var(--color-action-secondary-bg)',
          'secondary-text': 'var(--color-action-secondary-text)',
          'secondary-border': 'var(--color-action-secondary-border)',
          'ghost-hover': 'var(--color-action-ghost-hover)',
          disabled: 'var(--color-action-disabled-bg)',
          'disabled-text': 'var(--color-action-disabled-text)',
        },
        selection: {
          bg: 'var(--color-selection-bg)',
          border: 'var(--color-selection-border)',
        },
        success: 'var(--color-success)',
        'success-surface': 'var(--color-success-surface)',
        warning: 'var(--color-warning)',
        'warning-surface': 'var(--color-warning-surface)',
        danger: 'var(--color-danger)',
        'danger-surface': 'var(--color-danger-surface)',
        info: 'var(--color-info)',
        'info-surface': 'var(--color-info-surface)',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        bengali: ['Noto Sans Bengali', 'Manrope', 'sans-serif'],
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
        sm: '0 1px 2px rgb(33 42 51 / 0.06)',
        md: '0 8px 24px rgb(33 42 51 / 0.08)',
        focus: '0 0 0 3px rgba(20, 108, 197, 0.28)',
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
