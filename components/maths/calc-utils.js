import katex from "katex";

// Number formatting and step rendering shared by the calculators.
export function parseNum(v) {
  const s = String(v ?? "").trim().replace(/,/g, "");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// Up to `dp` decimal places, trailing zeros removed (so 10, 6.25, 10.82).
export function fmt(n, dp = 4) {
  if (!Number.isFinite(n)) return "";
  const r = Math.round(n * 10 ** dp) / 10 ** dp;
  return String(Object.is(r, -0) ? 0 : r);
}

// Exactly `dp` decimal places (answers rounded for school).
export function fixed(n, dp) {
  return (Math.round(n * 10 ** dp) / 10 ** dp).toFixed(dp);
}

export const isWhole = (n) => Math.abs(n - Math.round(n)) < 1e-9;

// A step line with $...$ maths, rendered to HTML with KaTeX.
export function stepHtml(text) {
  return text
    .split(/(\$[^$]+\$)/g)
    .map((part) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        try {
          return katex.renderToString(part.slice(1, -1), { throwOnError: false });
        } catch {
          return part;
        }
      }
      return part.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    })
    .join("");
}
