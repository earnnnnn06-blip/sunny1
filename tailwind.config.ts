import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  corePlugins: { preflight: false }, // base reset lives in globals.css
  theme: {
    extend: {
      colors: { gold: '#D9A441', cream: '#FFF8F0', beige: '#F5EFE8', brown: '#3A2E2A' },
      fontFamily: { serif: ['var(--f-serif)', 'Georgia', 'serif'], sans: ['var(--f-sans)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
