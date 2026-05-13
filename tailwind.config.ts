import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: ["selector", "[data-theme='dark']"],

  theme: {
    extend: {
      colors: {
        surface: {
          light: "var(--surface-light)",
          dark: "var(--surface-dark)",
        },
        light: "#f3f4f6",
        dark: "#030712",
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        bangla: ["var(--font-hind)", "sans-serif"],
      },

      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-left": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-right": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-down": "fade-down 0.5s ease-out both",
        "fade-left": "fade-left 0.5s ease-out both",
        "fade-right": "fade-right 0.5s ease-out both",
        "scale-in": "scale-in 0.3s ease-out both",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out both",
        "fade-up-1": "fade-up 0.5s 0.1s ease-out both",
        "fade-up-2": "fade-up 0.5s 0.2s ease-out both",
        "fade-up-3": "fade-up 0.5s 0.3s ease-out both",
        "fade-up-4": "fade-up 0.5s 0.4s ease-out both",
      },

      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        glow: "0 0 20px rgb(59 130 246 / 0.3)",
        "glow-lg": "0 0 40px rgb(59 130 246 / 0.4)",
      },

      borderRadius: {
        "4xl": "2rem",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },

  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#3b82f6",
              foreground: "#f3f4f6",
              50: "#eff6ff",
              100: "#dbeafe",
              200: "#bfdbfe",
              300: "#93c5fd",
              400: "#60a5fa",
              500: "#3b82f6",
              600: "#2563eb",
              700: "#1d4ed8",
              800: "#1e40af",
              900: "#1e3a8a",
            },
            secondary: {
              DEFAULT: "#93c5fd",
              foreground: "#1e3a8a",
            },
            success: { DEFAULT: "#22c55e", foreground: "#f0fdf4" },
            warning: { DEFAULT: "#f59e0b", foreground: "#fffbeb" },
            danger: { DEFAULT: "#ef4444", foreground: "#fef2f2" },
            background: "#f3f4f6",
            foreground: "#030712",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#3b82f6",
              foreground: "#f3f4f6",
              50: "#1e3a8a",
              100: "#1e40af",
              200: "#1d4ed8",
              300: "#2563eb",
              400: "#3b82f6",
              500: "#60a5fa",
              600: "#93c5fd",
              700: "#bfdbfe",
              800: "#dbeafe",
              900: "#eff6ff",
            },
            secondary: {
              DEFAULT: "#93c5fd",
              foreground: "#1e3a8a",
            },
            success: { DEFAULT: "#22c55e", foreground: "#f0fdf4" },
            warning: { DEFAULT: "#f59e0b", foreground: "#fffbeb" },
            danger: { DEFAULT: "#ef4444", foreground: "#fef2f2" },
            background: "#030712",
            foreground: "#f3f4f6",
          },
        },
      },
    }),
  ],
};

export default config;
