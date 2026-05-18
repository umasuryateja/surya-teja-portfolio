import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050810',
        surface: '#0a0f1e',
        'surface-hover': '#0f1629',
        accent: '#22d3ee',
        'accent-glow': 'rgba(34,211,238,0.15)',
        'accent-dim': '#0891b2',
        'text-primary': '#f0f6fc',
        'text-muted': '#8b949e',
        border: 'rgba(34,211,238,0.12)',
        'border-hover': 'rgba(34,211,238,0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyan-gradient': 'linear-gradient(135deg, #22d3ee, #f0f6fc)',
        'card-gradient': 'linear-gradient(135deg, rgba(10,15,30,0.7), rgba(15,22,41,0.7))',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(34,211,238,0.3)', opacity: '1' },
          '50%': { boxShadow: '0 0 30px rgba(34,211,238,0.8)', opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(34,211,238,0.15)',
        'glow-md': '0 0 40px rgba(34,211,238,0.2)',
        'glow-lg': '0 0 60px rgba(34,211,238,0.25)',
        'card': '0 0 0 1px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.glow-cyan': {
          textShadow: '0 0 20px rgba(34,211,238,0.6)',
        },
        '.glow-card': {
          boxShadow: '0 0 40px rgba(34,211,238,0.08)',
        },
        '.glow-hover': {
          boxShadow: '0 0 60px rgba(34,211,238,0.15)',
        },
        '.glass': {
          background: 'rgba(10,15,30,0.7)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: '1px solid rgba(34,211,238,0.12)',
          borderRadius: '16px',
          boxShadow: '0 0 0 1px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #22d3ee 0%, #f0f6fc 60%, #22d3ee 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
      })
    }),
  ],
}

export default config
