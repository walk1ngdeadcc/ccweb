/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'page-bg': 'var(--page-bg)',
        'text-main': 'var(--text-main)',
        'text-secondary': 'var(--text-secondary)',
        'text-weak': 'var(--text-weak)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'card-bg': 'var(--card-bg)',
        'card-border': 'var(--card-border)',
        'binary': 'var(--binary-color)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"SFMono-Regular"', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [],
};
