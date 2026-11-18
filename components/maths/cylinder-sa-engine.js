// Surface area of a cylinder engine for CylinderSACalc.jsx. Five jobs:
// total surface area from the radius or the diameter, the curved surface
// only (a label or an open pipe), a cylinder with one open end (a bucket or
// a tank with no lid), and working back to the height from the total surface
// area. Exact answers in terms of π where they're tidy, decimals rounded to
// 2 decimal places using the calculator value of π. Plain arithmetic, no AI.
// Kept free of imports so the logic can be tested on its own.

const PI = Math.PI;

export const MODES = {
  totalR: { tab: "Total (radius)", labels: ["Radius (r)", "Height (h)"], start: ["3", "8"] },
  totalD: { tab: "Total (diameter)", labels: ["Diameter (d)", "Height (h)"], start: ["10", "12"] },
  curved: { tab: "Curved surface only", labels: ["Radius (r)", "Height (h)"], start: ["3.7", "11"] },
  open: { tab: "Open at one end", labels: ["Radius (r)", "Height (h)"], start: ["0.8", "1.5"] },
  height: { tab: "Find the height", labels: ["Surface area (SA)", "Radius (r)"], start: ["300", "4"] },
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
const dec = (x) => (isExact(x, 2) ? `= ${fmt(x, 2)}` : `\\approx ${fixed(x, 2)}`);
const decPlain = (x) => (isExact(x, 2) ? `= ${fmt(x, 2)}` : `≈ ${fixed(x, 2)}`);
// k as a multiple of π (k π), only when k has at most 4 decimal places.
const piTex = (k) => (isExact(k, 4) ? (fmt(k, 4) === "1" ? "\\pi" : `${fmt(k, 4)}\\pi`) : `${fmt(k, 4)}\\pi`);
const piPlain = (k) => (isExact(k, 4) ? (fmt(k, 4) === "1" ? "π" : `${fmt(k, 4)}π`) : null);

export function solve(mode, raws, unitRaw = "") {
  if (!MODES[mode]) return { error: "Pick what you want to work out." };
  const nums = raws.map(parseNum);
  if (nums.some((v) => v === null)) return { error: "Fill in both numbers." };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 5 or 7.5 (put the units in the units box)." };
  if (nums.some((v) => v <= 0)) return { error: "Lengths and areas have to be greater than 0." };
  if (nums.some((v) => v > 1e9)) return { error: "That number is too big for this calculator." };
  const unit = String(unitRaw).trim().slice(0, 6);
  const u = unit ? `\\text{ ${unit}}` : "";
  const u2 = unit ? `\\text{ ${unit}}^2` : "";
  const uP = unit ? ` ${unit}` : "";
  const u2P = unit ? ` ${unit}²` : "";
  const steps = [];

  if (mode === "height") {
    const [SA, r] = nums;
    const endsK = 2 * r * r; // two ends = endsK × π
    const ends = PI * endsK;
    if (ends >= SA) {
      return { error: `With radius ${fmt(r, 4)}, the two circular ends alone have area ${fixed(ends, 2)}, which is already more than ${fmt(SA, 4)}. Check the numbers.` };
    }
    const curved = SA - ends;
    const h = curved / (2 * PI * r);
    steps.push("Start from $SA = 2\\pi r^2 + 2\\pi r h$");
    steps.push(`Area of the two ends: $2\\pi r^2 = 2\\pi \\times ${fmt(r, 4)}^2 = ${piTex(endsK)} ${dec(ends)}${u2}$`);
    steps.push(`Subtract to get the curved surface: $2\\pi r h = ${fmt(SA, 4)} - ${piTex(endsK)} ${dec(curved)}${u2}$`);
    steps.push(`Divide by $2\\pi r = ${piTex(2 * r)}$: $h = \\dfrac{${fixed(curved, 4)}}{${piTex(2 * r)}} ${dec(h)}${u}$`);
    const back = 2 * PI * r * r + 2 * PI * r * Number(fixed(h, 2));
    steps.push(`Check: $2\\pi \\times ${fmt(r, 4)}^2 + 2\\pi \\times ${fmt(r, 4)} \\times ${fixed(h, 2)} \\approx ${fixed(back, 2)}$, close to $${fmt(SA, 4)}$ (the small difference is rounding).`);
    steps.push("Decimals are rounded to 2 decimal places using the π button.");
    return { answer: `h ${decPlain(h)}${uP}`, steps, r, h, SA };
  }

  let [r, h] = nums;
  if (mode === "totalD") {
    const d = nums[0];
    r = d / 2;
    steps.push(`Halve the diameter to get the radius: $r = \\dfrac{${fmt(d, 4)}}{2} = ${fmt(r, 4)}${u}$`);
  }
  const circleK = r * r; // one end = circleK × π
  const curvedK = 2 * r * h; // curved surface = curvedK × π
  const nEnds = mode === "curved" ? 0 : mode === "open" ? 1 : 2;
  const totalK = nEnds * circleK + curvedK;
  const SA = PI * totalK;

  if (mode === "curved") {
    steps.push("Curved surface area: $A = 2\\pi r h$ (the rectangle you get when you unroll the side)");
  } else if (mode === "open") {
    steps.push("One end is open, so count only one circle: $SA = \\pi r^2 + 2\\pi r h$");
  } else {
    steps.push("Total surface area: $SA = 2\\pi r^2 + 2\\pi r h$ (two circles plus the curved side)");
  }
  if (nEnds > 0) {
    const endsK = nEnds * circleK;
    steps.push(
      nEnds === 2
        ? `Two circular ends: $2\\pi r^2 = 2 \\times \\pi \\times ${fmt(r, 4)}^2 = ${piTex(endsK)} ${dec(PI * endsK)}${u2}$`
        : `One circular end: $\\pi r^2 = \\pi \\times ${fmt(r, 4)}^2 = ${piTex(endsK)} ${dec(PI * endsK)}${u2}$`
    );
  }
  steps.push(`Curved side: $2\\pi r h = 2 \\times \\pi \\times ${fmt(r, 4)} \\times ${fmt(h, 4)} = ${piTex(curvedK)} ${dec(PI * curvedK)}${u2}$`);
  if (nEnds > 0) {
    steps.push(`Add them: $SA = ${piTex(nEnds * circleK)} + ${piTex(curvedK)} = ${piTex(totalK)} ${dec(SA)}${u2}$`);
  }
  steps.push("Decimals are rounded to 2 decimal places using the π button. If your teacher says to use 3.14, your answer may be slightly different.");
  const exact = piPlain(totalK);
  const label = mode === "curved" ? "Curved SA" : "SA";
  return { answer: `${label} ${exact ? `= ${exact} ` : ""}${decPlain(SA)}${u2P}`, steps, r, h, SA };
}
