/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Share Tech Mono', 'monospace'],
        display: ['Orbitron', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        cyber: {
          black: '#020408',
          dark: '#050d15',
          panel: '#0a1628',
          border: '#0d2137',
          cyan: '#00f5ff',
          blue: '#0099ff',
          purple: '#8b00ff',
          green: '#00ff88',
          red: '#ff003c',
          gold: '#ffd700',
          orange: '#ff6600',
        }
      },
      animation: {
        'scan-line': 'scanLine 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'rotate-hud': 'rotateHud 8s linear infinite',
        'data-stream': 'dataStream 3s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0,245,255,0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(0,245,255,0.8)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        rotateHud: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
