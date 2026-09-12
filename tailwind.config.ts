import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0F',
        surface: '#16161A',
        ink: '#F2F0EA',
        muted: '#8A8A93',
        accent: '#6E56CF',
        accent2: '#FFB86B'
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite'
      }
    }
  },
  plugins: []
};
export default config;
