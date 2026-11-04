/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2-rgb) / <alpha-value>)',
        'ink-3': 'rgb(var(--ink-3-rgb) / <alpha-value>)',
        rule: 'rgb(var(--rule-rgb) / <alpha-value>)',
        deep: 'rgb(var(--deep-rgb) / <alpha-value>)',
        'deep-2': 'rgb(var(--deep-2-rgb) / <alpha-value>)',
        flag: 'rgb(var(--flag-rgb) / <alpha-value>)',
        'flag-ink': 'rgb(var(--flag-ink-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
