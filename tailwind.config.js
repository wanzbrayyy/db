/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Pastikan ini ada
  theme: {
    extend: {
      // Font "Human-chosen" pairing
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'], // Font coding yg lebih estetik
      },
      colors: {
        // Base Backgrounds (Zinc - Lebih "Matte" daripada Slate)
        background: '#09090b', // Zinc 950 (Hampir hitam total)
        surface: '#18181b',    // Zinc 900 (Untuk Card)
        surfaceHighlight: '#27272a', // Zinc 800 (Hover state)
        
        // Borders (Sangat halus)
        border: '#27272a',     // Zinc 800
        borderLight: '#3f3f46', // Zinc 700
        
        // Typography (Kontras tinggi)
        textMain: '#fafafa',   // Zinc 50 (Putih tapi tidak menyilaukan)
        textMuted: '#a1a1aa',  // Zinc 400 (Abu-abu elegan)
        textDim: '#52525b',    // Zinc 600 (Untuk teks sangat tidak penting)

        // BRANDING: "Wanz Electric" (Bukan warna default Tailwind)
        primary: {
          DEFAULT: '#6366f1', // Indigo standar (fallback)
          glow: '#8b5cf6',    // Violet glow
          acid: '#d8b4fe',    // Purple pastel untuk highlight text
        },
        
        // Functional Colors (Desaturated - tidak norak)
        success: '#22c55e', // Green 500
        danger: '#ef4444',  // Red 500
        warning: '#f59e0b', // Amber 500
      },
      backgroundImage: {
        // ✨ RAHASIA AGAR TIDAK TERLIHAT AI: TEXTURE NOISE ✨
        // Ini memberikan efek "film grain" halus
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
        
        // Gradient Wanzdb
        'wanz-gradient': 'linear-gradient(to right, #4f46e5, #9333ea)', 
        'grid-pattern': "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px', // Ukuran kotak-kotak background
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(139, 92, 246, 0.3)', // Violet glow
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}