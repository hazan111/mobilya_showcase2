/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Cormorant Garamond', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          550: '#57534e',
          600: '#44403c',
          700: '#292524',
          800: '#1c1917',
          900: '#0c0a09',
        },
        ink: {
          DEFAULT: '#0c0a09',
          light: '#1c1917',
          border: '#292524',
        },
        surface: {
          DEFAULT: '#ebeae8',
          elevated: '#ffffff',
          muted: '#e7e6e3',
        },
      },
      borderRadius: {
        'card': '0.75rem',
        'card-lg': '1rem',
        'button': '0.5rem',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 12px -2px rgba(0,0,0,0.04)',
        'card': '0 1px 3px 0 rgba(0,0,0,0.05), 0 6px 20px -4px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px -2px rgba(0,0,0,0.06), 0 12px 28px -6px rgba(0,0,0,0.08)',
        'elegant': '0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px -2px rgba(0,0,0,0.04)',
        'header': '0 1px 0 0 rgba(0,0,0,0.06)',
      },
      letterSpacing: {
        'overline': '0.1em',
        'tight': '-0.02em',
      },
      transitionDuration: {
        'smooth': '200ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
