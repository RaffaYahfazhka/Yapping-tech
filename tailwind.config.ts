import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        dmserif: ["var(--font-dm-serif)", "Georgia", "serif"],
        jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        shimmer: {
          "0%": { transform: "translate3d(-100%, 0, 0)" },
          "100%": { transform: "translate3d(100%, 0, 0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "crystal-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)" },
          "33%": { transform: "translate3d(30px, -20px, 0) scale(1.08) rotate(4deg)" },
          "66%": { transform: "translate3d(-25px, 25px, 0) scale(0.95) rotate(-3deg)" },
        },
        "crystal-reverse": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)" },
          "33%": { transform: "translate3d(-35px, 20px, 0) scale(1.06) rotate(-5deg)" },
          "66%": { transform: "translate3d(25px, -30px, 0) scale(0.94) rotate(4deg)" },
        },
        "aurora-pulse": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.12)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        progress: "progress 5.5s linear forwards",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "crystal-slow": "crystal-slow 16s ease-in-out infinite",
        "crystal-reverse": "crystal-reverse 20s ease-in-out infinite",
        "aurora-pulse": "aurora-pulse 10s ease-in-out infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
