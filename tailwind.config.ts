import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5f9e34',
          600: '#538c2c',
          700: '#41711f',
          deep: '#294a14',
          tint: '#eef5e6',
          'tint-2': '#e2efd4',
        },
        ink: {
          DEFAULT: '#15181c',
          2: '#2b3138',
          soft: '#5a626b',
          faint: '#8b929a',
        },
        bg: {
          DEFAULT: '#ffffff',
          soft: '#f6f8f3',
          'soft-2': '#eef1ea',
        },
        line: {
          DEFAULT: '#e5e9e0',
          2: '#d7dcd0',
        },
        ember: {
          DEFAULT: '#d2542b',
          tint: '#fbe9e2',
        },
        steel: {
          DEFAULT: '#3a6ea5',
          tint: '#e6eef7',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '14px',
        lg: '22px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(21,24,28,.06), 0 2px 6px rgba(21,24,28,.04)',
        DEFAULT: '0 6px 24px rgba(21,24,28,.08), 0 2px 6px rgba(21,24,28,.04)',
        lg: '0 24px 60px rgba(21,24,28,.14), 0 6px 16px rgba(21,24,28,.06)',
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
