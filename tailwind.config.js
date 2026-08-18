/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        navy: {
          DEFAULT: "#071F55",
          50: "#F7FAFF",
          100: "#EAF2FF",
          800: "#0A326F",
          900: "#071F55",
        },
        primary: {
          DEFAULT: "#006EDB",
          50: "#EAF6FF",
          100: "#D5EBFF",
          200: "#A9D6FF",
          300: "#72BBFF",
          400: "#2F9BFA",
          500: "#0077E5",
          600: "#006EDB",
          700: "#0052B8",
        },
        surface: {
          light: "#F7FAFF",
          blue: "#EEF6FF",
        },
        border: "#D9E2EF",
        muted: "#64748B",
        secondary: "#43536A",
        orange: {
          DEFAULT: "#F97316",
          50: "#FFF7ED",
          600: "#EA580C",
        }
      },
      fontFamily: {
        heading: ["Manrope", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 3.625rem)", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 4vw, 2.625rem)", { lineHeight: "1.12", fontWeight: "650" }],
        "display-md": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.25", fontWeight: "600" }],
      },
      maxWidth: {
        "container-xl": "1240px",
        "content-wide": "1040px",
        "content-reading": "760px",
        "content-narrow": "620px",
      },
      boxShadow: {
        card: "none",
        "card-hover": "0 10px 30px rgba(7, 31, 85, 0.08)",
        header: "0 8px 28px rgba(7, 31, 85, 0.08)",
        modal: "0 24px 64px rgba(7, 31, 85, 0.2)",
      },
      borderRadius: {
        card: "10px",
        panel: "12px",
        btn: "8px",
        input: "8px",
        pill: "999px",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.25s ease-out",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "marquee-reverse": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideDown: { "0%": { opacity: "0", transform: "translateY(-8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      screens: {
        xs: "375px",
        sm: "430px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
