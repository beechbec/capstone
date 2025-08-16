/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#4056A1',
        gold: '#D79922',
        cream: '#EFE2BA',
        red: '#F13C20',
        lavender: '#C5CBE3',
      },
      fontFamily: {
        heading: [
          'var(--font-fraunces)',
          'serif'
        ],
        body: [
          'var(--font-space-grotesk)',
          'sans-serif'
        ]
      },
      width: {
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
      },
      gridTemplateColumns: {
        'sidebar-content': '20rem 1fr',
        'sidebar-content-xl': '22rem 1fr',
      }
    },
  },
  plugins: [],
}
