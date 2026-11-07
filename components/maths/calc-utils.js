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

// ── Exact arithmetic (fractions and simplified surds) ─────────────────
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
export { gcd };

// A fraction n/d with integer parts, kept in lowest terms with d > 0.
export function frac(n, d = 1) {
  if (d === 0) throw new Error("divide by zero");
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
// Decimal input (like 1.5 or -0.25) to an exact fraction.
export function toFrac(x) {
  const s = String(x);
  if (!/[.eE]/.test(s)) return frac(Math.round(x), 1);
  const places = Math.min(10, (s.split(".")[1] || "").length);
  const scale = 10 ** places;
  return frac(Math.round(x * scale), scale);
}
export const fAdd = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
export const fSub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
export const fMul = (a, b) => frac(a.n * b.n, a.d * b.d);
export const fDiv = (a, b) => frac(a.n * b.d, a.d * b.n);
export const fVal = (a) => a.n / a.d;
export const fIsZero = (a) => a.n === 0;
// LaTeX for a fraction: 3, -2, \frac{2}{3}, -\frac{5}{4}.
export function fTex(a) {
  if (a.d === 1) return String(a.n);
  return `${a.n < 0 ? "-" : ""}\\frac{${Math.abs(a.n)}}{${a.d}}`;
}
// For substituting into an expression: wraps negatives in brackets.
export function fTexB(a) {
  const t = fTex(a);
  return a.n < 0 ? `\\left(${t}\\right)` : t;
}

// √n for a whole number n ≥ 0 as k√r with r square-free: √72 = 6√2.
export function simplifySurd(n) {
  let k = 1, r = n;
  for (let f = 2; f * f <= r; f++) {
    while (r % (f * f) === 0) { r /= f * f; k *= f; }
  }
  return { k, r };
}
export function surdTex({ k, r }) {
  if (r === 1) return String(k);
  return `${k === 1 ? "" : k}\\sqrt{${r}}`;
}
