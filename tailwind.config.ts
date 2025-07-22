import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom sidebar colors
        sidebar: {
          DEFAULT: "hsl(240 5.9% 10%)", // Dark background for sidebar
          foreground: "hsl(240 4.8% 95.9%)", // Light text for sidebar
          primary: "hsl(0 0% 98%)",
          "primary-foreground": "hsl(240 5.9% 10%)",
          accent: "hsl(240 3.7% 15.9%)",
          "accent-foreground": "hsl(240 4.8% 95.9%)",
          border: "hsl(240 3.7% 15.9%)",
          ring: "hsl(217.2 91.2% 59.8%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(1.2)", opacity: "0" },
        },
        "ping-medium": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%, 100%": { transform: "scale(1.4)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0px 0px rgba(59, 130, 246, 0.7)",
          },
          "50%": {
            boxShadow: "0 0 15px 5px rgba(59, 130, 246, 1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-medium": "ping-medium 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "pulse-glow": "pulse-glow 3s infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
