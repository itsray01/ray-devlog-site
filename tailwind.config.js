export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        violet: {
          500: '#8b5cf6',
          600: '#8a2be2',
        },
        cyan: {
          500: '#06b6d4',
        },
        amber: {
          500: '#f59e0b',
        },
        pink: {
          500: '#ec4899',
        },
      },
    },
  },
  plugins: [require('@tremor/react/plugin')],
}

