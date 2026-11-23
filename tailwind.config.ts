import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const collegeSeraTypography = plugin(({ addUtilities }) => {
  addUtilities({
    ".typography-hero-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "36px",
      fontWeight: "800",
      lineHeight: "1.08",
    },
    ".typography-page-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "28px",
      fontWeight: "700",
      lineHeight: "1.15",
    },
    ".typography-section-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1.25",
    },
    ".typography-subsection-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "20px",
      fontWeight: "650",
      lineHeight: "1.3",
    },
    ".typography-card-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.4",
    },
    ".typography-small-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "1.45",
    },
    ".typography-nav-link": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "14px",
      fontWeight: "600",
    },
    ".typography-dropdown-link": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "14px",
      fontWeight: "500",
    },
    ".typography-dropdown-section-title": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "13px",
      fontWeight: "700",
    },
    ".typography-mega-description": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "13px",
      fontWeight: "400",
    },
    ".typography-description, .typography-description :where(p, li)": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.65",
    },
    ".typography-secondary-description": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.6",
    },
    ".typography-small-description": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "13px",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    ".typography-breadcrumb": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "13px",
      fontWeight: "500",
    },
    ".typography-search-placeholder, .typography-input-placeholder": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "14px",
      fontWeight: "400",
    },
    ".typography-search-placeholder::placeholder, .typography-input-placeholder::placeholder":
      {
        fontFamily: 'var(--font-inter), "Inter", sans-serif',
        fontSize: "14px",
        fontWeight: "400",
      },
    ".typography-search-result": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "14px",
      fontWeight: "500",
    },
    ".typography-input-label": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "13px",
      fontWeight: "600",
    },
    ".typography-primary-button": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "14px",
      fontWeight: "600",
    },
    ".typography-secondary-button": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "13px",
      fontWeight: "600",
    },
    ".typography-badge": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    ".typography-statistic": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1.15",
    },
    ".typography-footer-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "15px",
      fontWeight: "700",
    },
    ".typography-footer-link, .typography-footer-description": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "13px",
      fontWeight: "400",
    },
    ".typography-tooltip": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "12px",
      fontWeight: "400",
    },
    ".typography-table-header": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "13px",
      fontWeight: "600",
    },
    ".typography-table-content": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "14px",
      fontWeight: "400",
    },
    ".typography-pagination": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "13px",
      fontWeight: "600",
    },
    ".typography-tab": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "14px",
      fontWeight: "600",
    },
    ".typography-modal-heading": {
      fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
      fontSize: "22px",
      fontWeight: "700",
      lineHeight: "1.3",
    },
    ".typography-modal-description": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.6",
    },
    ".typography-card-description": {
      fontFamily: 'var(--font-inter), "Inter", sans-serif',
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.6",
    },
  });
});

export default {
  darkMode: ["class"],
  content: ["./src/app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    collegeSeraTypography,
  ],
} satisfies Config;
