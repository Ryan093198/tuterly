// Volume of a prism engine for PrismVolumeCalc.jsx. Five jobs: a
// rectangular prism (length × width × height), a triangular prism, a
// trapezoidal prism, any prism from its cross-section area, and working
// back to the length from the volume. Every one is V = A × l: the area of
// the cross-section times the length. Capacity in mL or L is added when
// the units are mm, cm or m. Plain arithmetic, no AI. Kept free of imports
// so the logic can be tested on its own.

export const MODES = {
  rect: { tab: "Rectangular", labels: ["Length (l)", "Width (w)", "Height (h)"], start: ["60", "30", "40"] },
  tri: { tab: "Triangular", labels: ["Triangle base (b)", "Triangle height (h)", "Prism length (l)"], start: ["3", "2", "4.5"] },
  trap: { tab: "Trapezoidal", labels: ["Parallel side (a)", "Parallel side (b)", "Trapezium height (h)", "Prism length (l)"], start: ["1", "2", "25", "10"] },
  area: { tab: "Any cross-section", labels: ["Cross-section area (A)", "Prism length (l)"], start: ["1800", "120"] },
  length: { tab: "Find the length", labels: ["Volume (V)", "Cross-section area (A)"], start: ["240", "16"] },
};

export function parseNum(v) {
  const s = String(v ?? "").trim().replace(/,/g, "");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// Up to dp decimal places, trailing zeros removed.
export function fmt(n, dp = 4) {
  const r = Math.round(n * 10 ** dp) / 10 ** dp;
  return String(Object.is(r, -0) ? 0 : r);
}
export function fixed(n, dp) {
  return (Math.round(n * 10 ** dp) / 10 ** dp).toFixed(dp);
}
const isExact = (x, dp) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-7;
// Thousands separated with commas: 375000 -> 375,000 (decimals kept).
function group(s) {
  const [i, d] = s.split(".");
  const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${g}.${d}` : g;
}
const num = (x) => group(fmt(x, 4)); // plain text
const tnum = (x) => group(fmt(x, 4)).replace(/,/g, "{,}"); // inside LaTeX
const val = (x) => (isExact(x, 4) ? `= ${tnum(x)}` : `\\approx ${group(fixed(x, 2)).replace(/,/g, "{,}")}`);
const valPlain = (x) => (isExact(x, 4) ? `= ${num(x)}` : `≈ ${group(fixed(x, 2))}`);

// Capacity for a volume in unit³: mm³, cm³ or m³.
export function capacity(V, unit) {
  const u = String(unit || "").trim().toLowerCase();
  if (u === "cm") return V >= 1000 ? { text: `${num(V / 1000)} L`, rule: "1000 cm³ = 1 L" } : { text: `${num(V)} mL`, rule: "1 cm³ = 1 mL" };
  if (u === "m") return { text: `${num(V * 1000)} L`, rule: "1 m³ = 1000 L" };
  if (u === "mm") return V >= 1e6 ? { text: `${num(V / 1e6)} L`, rule: "1,000,000 mm³ = 1 L" } : { text: `${num(V / 1000)} mL`, rule: "1000 mm³ = 1 mL" };
  return null;
}

export function solve(mode, raws, unitRaw = "") {
  const m = MODES[mode];
  if (!m) return { error: "Pick the kind of prism." };
  const nums = m.labels.map((_, i) => parseNum(raws[i]));
  if (nums.some((v) => v === null)) return { error: `Fill in all ${nums.length} numbers.` };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 5 or 7.5 (put the units in the units box)." };
  if (nums.some((v) => v <= 0)) return { error: "Lengths, areas and volumes have to be greater than 0." };
  if (nums.some((v) => v > 1e9)) return { error: "That number is too big for this calculator." };
  const unit = String(unitRaw).trim().slice(0, 6);
  const u = unit ? `\\text{ ${unit}}` : "";
  const u2 = unit ? `\\text{ ${unit}}^2` : "";
  const u3 = unit ? `\\text{ ${unit}}^3` : "";
  const uP = unit ? ` ${unit}` : "";
  const u3P = unit ? ` ${unit}³` : "";
  const steps = [];

  if (mode === "length") {
    const [V, A] = nums;
    const l = V / A;
    steps.push("Start from $V = A \\times l$ and divide both sides by $A$: $l = \\dfrac{V}{A}$");
    steps.push(`Substitute: $l = \\dfrac{${tnum(V)}}{${tnum(A)}} ${val(l)}${u}$`);
    const ok = isExact(l, 4);
    const lr = ok ? l : Number(fixed(l, 2));
    steps.push(`Check: $${tnum(A)} \\times ${ok ? tnum(l) : fixed(l, 2)} ${isExact(A * lr, 4) ? "=" : "\\approx"} ${tnum(A * lr)}$${ok ? " ✓" : ", close to the volume (the difference is rounding)."}`);
    return { answer: `l ${valPlain(l)}${uP}`, steps, l };
  }

  let A;
  let l;
  if (mode === "rect") {
    const [L, W, H] = nums;
    A = L * W;
    l = H;
    steps.push("For a rectangular prism the cross-section is a rectangle, so $V = l \\times w \\times h$");
    steps.push(`Area of the base: $${tnum(L)} \\times ${tnum(W)} ${val(A)}${u2}$`);
    steps.push(`Multiply by the height: $V = ${tnum(A)} \\times ${tnum(H)} ${val(A * H)}${u3}$`);
  } else if (mode === "tri") {
    const [b, h, len] = nums;
    A = 0.5 * b * h;
    l = len;
    steps.push("The cross-section is a triangle, so first find $A = \\dfrac{1}{2} \\times b \\times h$");
    steps.push(`$A = \\dfrac{1}{2} \\times ${tnum(b)} \\times ${tnum(h)} ${val(A)}${u2}$`);
    steps.push(`Multiply by the length of the prism: $V = ${tnum(A)} \\times ${tnum(len)} ${val(A * len)}${u3}$`);
  } else if (mode === "trap") {
    const [a, b, h, len] = nums;
    A = 0.5 * (a + b) * h;
    l = len;
    steps.push("The cross-section is a trapezium, so first find $A = \\dfrac{1}{2}(a + b) \\times h$");
    steps.push(`$A = \\dfrac{1}{2} \\times (${tnum(a)} + ${tnum(b)}) \\times ${tnum(h)} = \\dfrac{1}{2} \\times ${tnum(a + b)} \\times ${tnum(h)} ${val(A)}${u2}$`);
    steps.push(`Multiply by the length of the prism: $V = ${tnum(A)} \\times ${tnum(len)} ${val(A * len)}${u3}$`);
  } else {
    [A, l] = nums;
    steps.push("Every prism has $V = A \\times l$: the area of the cross-section times the length");
    steps.push(`$V = ${tnum(A)} \\times ${tnum(l)} ${val(A * l)}${u3}$`);
  }
  const V = A * l;
  const cap = capacity(V, unit);
  if (cap) steps.push(`Capacity: ${cap.rule}, so the prism holds ${isExact(V, 4) ? "" : "about "}${cap.text}.`);
  if (!isExact(V, 4)) steps.push("The volume is rounded to 2 decimal places.");
  return { answer: `V ${valPlain(V)}${u3P}${cap ? ` (${cap.text})` : ""}`, steps, V, A };
}
