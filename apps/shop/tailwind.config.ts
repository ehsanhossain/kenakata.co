import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
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
          'ghost-hover': 'var(--color-action-ghost-hover)',
          disabled: 'var(--color-action-disabled-bg)',
          'disabled-text': 'var(--color-action-disabled-text)',
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
      },
    },
  },
  plugins: [],
};
export default config;
