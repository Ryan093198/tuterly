// Shared colour palette for the inline-styled marketing pages
// (/tutoring/*, best-of, comparison, prices, learn, tutor pages...).
// Every value points at the Tuterly Study app tokens in app/globals.css,
// so these pages follow the app's colours and switch with dark mode.
//
// Mapping notes:
//   teal -> brand-deep (#0A7F99): the app's deeper teal, so teal text on
//           white and white text on teal buttons both pass WCAG AA.
//   navy / white swap in dark mode (navy = text colour, white = card), so
//           a "navy button with white text" stays readable in both themes.
//   Don't append hex alpha to these (e.g. `${c.teal}20`): they're CSS
//   variables. Use color-mix() or a *Soft token instead.

export const c = {
  teal: "var(--brand-deep)",
  tealLight: "var(--brand)",
  tealDark: "var(--brand-deep)",
  tealPale: "var(--brand-soft)",
  navy: "var(--foreground)",
  navyMid: "var(--foreground)",
  navyLight: "var(--muted)",
  text: "var(--foreground)",
  textLight: "var(--muted)",
  textMuted: "var(--muted)",
  white: "var(--card)",
  offWhite: "var(--background)",
  cream: "var(--background)",
  border: "var(--border)",
  success: "var(--success)",
  amber: "var(--xp)",
  rose: "var(--danger)",
};

// The marketing pages used to @import DM Sans / DM Serif Display / Space
// Grotesk here. The site now uses Nunito (loaded once via next/font in
// app/layout.js), so this is empty and kept only so existing imports work.
export const MARKETING_FONTS_IMPORT = "";

// Font family for inline styles.
export const FONT = "var(--font-display)";
