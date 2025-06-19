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
        primary: '#3ECF8E', // Supabase green
        secondary: '#24B47E', // Darker green
        accent: '#6366F1', // Indigo accent
        light: '#F8FAFC', // Light background
        dark: '#1A1A1A', // Rich black text
        gray: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        emerald: '#10B981', // Emerald green
        indigo: '#4F46E5', // Indigo
        violet: '#7C3AED', // Violet
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(rgba(62, 207, 142, 0.7), rgba(99, 102, 241, 0.7))",
        'gradient-dark': "linear-gradient(to right, #0F172A, #1E293B)",
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
    'bg-emerald',
    'bg-indigo',
    'bg-violet',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    'text-primary',
    'text-secondary',
    'text-accent',
    'text-light',
    'text-dark',
    'text-emerald',
    'text-indigo',
    'text-violet',
    'text-gray-100',
    'text-gray-200',
    'text-gray-300',
    'text-gray-400',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'text-gray-900',
    'border-primary',
    'border-secondary',
    'border-accent',
    'border-emerald',
    'border-indigo',
    'border-violet',
    'border-gray-200',
    'border-gray-300',
    'border-gray-800',
  ],
}
