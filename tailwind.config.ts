import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-2': 'hsl(var(--surface-2) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-soft': 'hsl(var(--accent-soft) / <alpha-value>)',
        line: 'hsl(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        rounded: ['var(--font-rounded)', 'var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        display: ['1.875rem', { lineHeight: '1.45', letterSpacing: '0.01em' }],
        h1: ['1.5rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        h2: ['1.25rem', { lineHeight: '1.5' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.9' }],
        body: ['0.9375rem', { lineHeight: '1.8' }],
        caption: ['0.8125rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        card: '1.5rem',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 8px 30px -12px hsl(var(--shadow) / 0.18)',
        'soft-lg': '0 18px 50px -16px hsl(var(--shadow) / 0.24)',
        glow: '0 0 0 1px hsl(var(--accent) / 0.15), 0 8px 30px -12px hsl(var(--accent) / 0.3)',
      },
      maxWidth: {
        phone: '30rem',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%': { transform: 'translateX(-4%)' },
          '100%': { transform: 'translateX(4%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
        drift: 'drift 18s ease-in-out infinite alternate',
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
