/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // --- BASE COLORS (HITAM PEKAT) ---
        background: '#09090b', // Zinc 950
        surface: '#18181b',    // Zinc 900
        surfaceLight: '#27272a', // Zinc 800
        
        // --- BORDERS ---
        border: '#27272a',     // Zinc 800
        borderHighlight: '#3f3f46', // Zinc 700
        
        // --- TYPOGRAPHY ---
        textMain: '#ffffff',   // Putih Bersih
        textMuted: '#a1a1aa',  // Abu-abu
        
        // --- AKSEN BARU (NO PURPLE) ---
        // Kita pakai Cyan/Sky Blue untuk kesan "Tech/Database"
        primary: {
          DEFAULT: '#ffffff', // Primary button warna putih (Stealth)
          accent: '#0ea5e9',  // Sky 500 (Biru Langit Terang)
          glow: '#38bdf8',    // Sky 400 (Glow Effect)
          dim: '#0369a1',     // Sky 700
        }
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}