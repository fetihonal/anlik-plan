/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  "paths": {
      "@/*": [
        "./src/*"
      ]
    },
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00', // Vibrant orange
        secondary: '#FFB800', // Warm yellow
        accent: '#0088CC', // Bright blue
        light: '#FFF9F0', // Light background
        dark: '#333333', // Dark text
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(rgba(255, 122, 0, 0.7), rgba(0, 136, 204, 0.7))",
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-light',
    'bg-dark',
    'text-primary',
    'text-secondary',
    'text-accent',
    'text-light',
    'text-dark',
  ],
}
