/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#090909',
        panel: '#111111',
        panel2: '#161616',
        line: 'rgba(255,255,255,0.08)',
        bone: '#ededed',
        dim: '#8a8a8a',
        accent: {
          DEFAULT: '#1fa2ff',
          bright: '#5cc0ff',
          deep: '#0a4f8a',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        script: ['var(--font-caveat)', 'cursive'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
