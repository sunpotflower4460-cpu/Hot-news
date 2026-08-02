import type { Config } from 'tailwindcss';

const opacityScale = Object.fromEntries(
  Array.from({ length: 101 }, (_, value) => [String(value), String(value / 100)]),
);

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
        'accent-strong': 'hsl(var(--accent-strong) / <alpha-value>)',
        'accent-soft': 'hsl(var(--accent-soft) / <alpha-value>)',
        line: 'hsl(var(--line) / <alpha-value>)',
      },
      opacity: opacityScale,
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        rounded: ['var(--font-rounded)', 'var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        display: ['2rem', { lineHeight: '1.38', letterSpacing: '0.005em' }],
        h1: ['1.55rem', { lineHeight: '1.48', letterSpacing: '0.005em' }],
        h2: ['1.22rem', { lineHeight: '1.55', letterSpacing: '0.005em' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.95' }],
        body: ['0.9375rem', { lineHeight: '1.82' }],
        caption: ['0.8125rem', { lineHeight: '1.65' }],
      },
      borderRadius: {
        card: '1.8rem',
        panel: '2.35rem',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 12px 34px -18px hsl(var(--shadow) / 0.2)',
        'soft-lg': '0 24px 64px -24px hsl(var(--shadow) / 0.28)',
        float:
          '0 18px 50px -24px hsl(var(--shadow) / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.45)',
        glow:
          '0 0 0 1px hsl(var(--accent) / 0.12), 0 14px 42px -20px hsl(var(--accent) / 0.42)',
        'inner-light': 'inset 0 1px 0 hsl(0 0% 100% / 0.55)',
      },
      maxWidth: {
        phone: '30rem',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        drift: {
          '0%': { transform: 'translate3d(-5%, 0, 0)' },
          '50%': { transform: 'translate3d(2%, -4px, 0)' },
          '100%': { transform: 'translate3d(7%, 2px, 0)' },
        },
        'drift-reverse': {
          '0%': { transform: 'translate3d(5%, 0, 0)' },
          '50%': { transform: 'translate3d(-1%, 5px, 0)' },
          '100%': { transform: 'translate3d(-7%, -2px, 0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.85)' },
          '50%': { opacity: '0.9', transform: 'scale(1.12)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(0.96)', opacity: '0.72' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-130%) rotate(12deg)' },
          '100%': { transform: 'translateX(230%) rotate(12deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.65s var(--ease, cubic-bezier(0.22,1,0.36,1)) both',
        drift: 'drift 24s ease-in-out infinite alternate',
        'drift-reverse': 'drift-reverse 29s ease-in-out infinite alternate',
        twinkle: 'twinkle 4.8s ease-in-out infinite',
        breathe: 'breathe 7s ease-in-out infinite',
        float: 'float 6.5s ease-in-out infinite',
        shimmer: 'shimmer 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
