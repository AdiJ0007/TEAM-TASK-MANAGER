/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg-main) / <alpha-value>)',
        surface: 'rgb(var(--bg-surface) / <alpha-value>)',
        primary: '#6366f1',      // Indigo/Purple
        secondary: '#06b6d4',    // Cyan
        accent: '#8b5cf6',       // Violet
        danger: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b',
        textMain: 'rgb(var(--text-main) / <alpha-value>)',
        textMuted: 'rgb(var(--text-muted) / <alpha-value>)',
        // Neon accent palette
        'neon-purple': '#a855f7',
        'neon-cyan': '#22d3ee',
        'neon-pink': '#ec4899',
        'neon-green': '#4ade80',
        'neon-orange': '#fb923c',
        'neon-yellow': '#facc15',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        brand: ['Orbitron', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        badge: ['Rajdhani', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glow-pulse-cyan': 'glow-pulse-cyan 3s ease-in-out infinite',
        'glow-pulse-pink': 'glow-pulse-pink 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'scan-line': 'scan-line 4s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.4), 0 0 10px rgba(99, 102, 241, 0.2)' },
          '50%': { boxShadow: '0 0 15px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.4), 0 0 60px rgba(99, 102, 241, 0.1)' },
        },
        'glow-pulse-cyan': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.4), 0 0 10px rgba(6, 182, 212, 0.2)' },
          '50%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.4)' },
        },
        'glow-pulse-pink': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(236, 72, 153, 0.4), 0 0 10px rgba(236, 72, 153, 0.2)' },
          '50%': { boxShadow: '0 0 15px rgba(236, 72, 153, 0.8), 0 0 30px rgba(236, 72, 153, 0.4)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'border-glow': {
          '0%': { borderColor: 'rgba(99, 102, 241, 0.5)' },
          '100%': { borderColor: 'rgba(168, 85, 247, 0.9)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
