/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        rustico: {
          50: '#faf7f2',
          100: '#f3ede3',
          200: '#e6d9c4',
          300: '#d4bf9e',
          400: '#b8956a',
          500: '#9a7349',
          600: '#7d5a38',
          700: '#65462e',
          800: '#533a29',
          900: '#463124',
        },
        oliva: {
          500: '#6b7c4c',
          600: '#556339',
          700: '#434d2e',
        },
        terracota: {
          500: '#c17a4a',
          600: '#a8653a',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
