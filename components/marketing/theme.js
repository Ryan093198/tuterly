// Shared colour palette and Google Font import for the marketing
// pages (/parents, /centres, /tutors, /tutoring/*). These pages use
// inline styles instead of Tailwind so their visual language can be
// tuned independently from the in-app dashboard styling.

export const c = {
  teal: "#0ABAB5",
  tealLight: "#2DD4BF",
  tealDark: "#0D9488",
  tealPale: "#F0FDFA",
  navy: "#0F172A",
  navyMid: "#1E293B",
  navyLight: "#334155",
  text: "#1E293B",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  cream: "#FFFBF5",
  border: "#E2E8F0",
  success: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
};

// Drop once per page (inside a <style> block). Loads the marketing
// fonts via @import — pragmatic given each marketing page is
// self-contained inline styles.
export const MARKETING_FONTS_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&family=Space+Grotesk:wght@400;500;600;700&display=swap');`;
