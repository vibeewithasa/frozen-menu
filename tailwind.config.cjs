/***************************************************
 * Tailwind Config — Helados Gourmet Leal
 * Light-first. Tokens del sistema de diseño "Sabor Pop Studio".
 ***************************************************/
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Se mantiene en "class" para neutralizar cualquier variante dark: residual
  // (la app es light-first y no monta la clase `dark`).
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base premium neutra
        cream: {
          DEFAULT: "#FBF7EF",
          50: "#FFFDF9",
          100: "#FBF7EF",
          200: "#F4ECDD",
          300: "#EADDC6",
        },
        // Tinta chocolate (texto / jerarquía)
        ink: {
          DEFAULT: "#2A1D18",
          soft: "#5A4A42",
          muted: "#7A6A61",
        },
        // Acento coral (escala real — corrige el bug text-accent-900)
        coral: {
          50: "#FFF1F1",
          100: "#FFE0E0",
          200: "#FFC5C5",
          300: "#FF9E9E",
          400: "#FF8181",
          500: "#FF6B6B",
          600: "#F04D4D",
          700: "#D63838",
          800: "#B02B2B",
          900: "#8A2323",
        },
        // Alias de compatibilidad
        accent: "#FF6B6B",
        // Colores de sabor (para chips estáticos y decoración)
        flavors: {
          vainilla: "#F5E6C8",
          fresa: "#FAD1D8",
          pistacho: "#CDE3C1",
          chocolate: "#5A3E36",
          matcha: "#A3C686",
          coral: "#FF6B6B",
          cielo: "#BFE3F0",
        },
        // Tema reactivo: consume las CSS custom properties definidas en runtime
        // vía style={{ '--flavor': ... }}. NO se construyen clases dinámicas.
        flavor: "var(--flavor, #FF6B6B)",
        "flavor-tint": "var(--flavor-tint, #FFE0E0)",
        "flavor-ink": "var(--flavor-ink, #2A1D18)",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala editorial expresiva
        "display-xl": ["clamp(2.75rem, 8vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 6vw, 4rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(42,29,24,0.08)",
        card: "0 10px 40px -12px rgba(42,29,24,0.18)",
        pop: "0 20px 60px -18px rgba(42,29,24,0.28)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
