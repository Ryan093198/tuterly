// Area of a trapezium engine for TrapeziumAreaCalc.jsx. Four jobs: the area
// from the two parallel sides and the height, the height from the area, the
// missing parallel side from the area, and the area of an isosceles
// trapezium when only the sloping sides are known (Pythagoras finds the
// height first). Every one is A = ½(a + b)h. Plain arithmetic, no AI. Kept
// free of imports so the logic can be tested on its own.

export const MODES = {
  area: { tab: "Area", labels: ["Parallel side (a)", "Parallel side (b)", "Height (h)"], start: ["6", "10", "4"] },
  height: { tab: "Find the height", labels: ["Area (A)", "Parallel side (a)", "Parallel side (b)"], start: ["63", "8", "10"] },
  side: { tab: "Find a parallel side", labels: ["Area (A)", "Known parallel side (a)", "Height (h)"], start: ["54", "7", "6"] },
  iso: { tab: "Isosceles, sloping sides", labels: ["Shorter parallel side (a)", "Longer parallel side (b)", "Sloping side"], start: ["10", "22", "10"] },
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
function group(s) {
  const [i, d] = s.split(".");
  const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${g}.${d}` : g;
}
const num = (x) => group(fmt(x, 4));
const tnum = (x) => group(fmt(x, 4)).replace(/,/g, "{,}");
const val = (x) => (isExact(x, 4) ? `= ${tnum(x)}` : `\\approx ${group(fixed(x, 2)).replace(/,/g, "{,}")}`);
const valPlain = (x) => (isExact(x, 4) ? `= ${num(x)}` : `≈ ${group(fixed(x, 2))}`);

export function solve(mode, raws, unitRaw = "") {
  const m = MODES[mode];
  if (!m) return { error: "Pick what you want to find." };
  const nums = m.labels.map((_, i) => parseNum(raws[i]));
  if (nums.some((v) => v === null)) return { error: `Fill in all ${nums.length} numbers.` };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 5 or 7.5 (put the units in the units box)." };
  if (nums.some((v) => v <= 0)) return { error: "Lengths and areas have to be greater than 0." };
  if (nums.some((v) => v > 1e9)) return { error: "That number is too big for this calculator." };
  const unit = String(unitRaw).trim().slice(0, 6);
  const u = unit ? `\\text{ ${unit}}` : "";
  const u2 = unit ? `\\text{ ${unit}}^2` : "";
  const uP = unit ? ` ${unit}` : "";
  const u2P = unit ? ` ${unit}²` : "";
  const steps = [];

  if (mode === "area") {
    const [a, b, h] = nums;
    const A = 0.5 * (a + b) * h;
    steps.push("Use $A = \\dfrac{1}{2}(a + b)h$, where $a$ and $b$ are the parallel sides and $h$ is the perpendicular height");
    steps.push(`Add the parallel sides: $${tnum(a)} + ${tnum(b)} = ${tnum(a + b)}$`);
    steps.push(`Halve and multiply by the height: $A = \\dfrac{1}{2} \\times ${tnum(a + b)} \\times ${tnum(h)} ${val(A)}${u2}$`);
    if (!isExact(A, 4)) steps.push("The area is rounded to 2 decimal places.");
    return { answer: `A ${valPlain(A)}${u2P}`, steps, A };
  }

  if (mode === "height") {
    const [A, a, b] = nums;
    const h = (2 * A) / (a + b);
    steps.push("Start from $A = \\dfrac{1}{2}(a + b)h$. Double both sides, then divide by $(a + b)$: $h = \\dfrac{2A}{a + b}$");
    steps.push(`Substitute: $h = \\dfrac{2 \\times ${tnum(A)}}{${tnum(a)} + ${tnum(b)}} = \\dfrac{${tnum(2 * A)}}{${tnum(a + b)}} ${val(h)}${u}$`);
    const hr = isExact(h, 4) ? h : Number(fixed(h, 2));
    const back = 0.5 * (a + b) * hr;
    steps.push(`Check: $\\dfrac{1}{2} \\times ${tnum(a + b)} \\times ${tnum(hr)} ${isExact(h, 4) ? "=" : "\\approx"} ${tnum(back)}$${isExact(h, 4) ? " ✓" : ", close to the area (the difference is rounding)."}`);
    return { answer: `h ${valPlain(h)}${uP}`, steps, h };
  }

  if (mode === "side") {
    const [A, a, h] = nums;
    const sum = (2 * A) / h;
    const b = sum - a;
    steps.push("Start from $A = \\dfrac{1}{2}(a + b)h$. Double both sides and divide by $h$: $a + b = \\dfrac{2A}{h}$");
    steps.push(`Substitute: $a + b = \\dfrac{2 \\times ${tnum(A)}}{${tnum(h)}} = \\dfrac{${tnum(2 * A)}}{${tnum(h)}} ${val(sum)}$`);
    if (b <= 1e-9) {
      return { error: `The two parallel sides would only add to ${num(sum)}, which isn't more than the side you know (${num(a)}). Check the area, the side and the height.` };
    }
    steps.push(`Subtract the side you know: $b = ${isExact(sum, 4) ? tnum(sum) : fixed(sum, 4)} - ${tnum(a)} ${val(b)}${u}$`);
    const br = isExact(b, 4) ? b : Number(fixed(b, 2));
    const back = 0.5 * (a + br) * h;
    steps.push(`Check: $\\dfrac{1}{2} \\times (${tnum(a)} + ${tnum(br)}) \\times ${tnum(h)} ${isExact(b, 4) ? "=" : "\\approx"} ${tnum(back)}$${isExact(b, 4) ? " ✓" : ", close to the area (the difference is rounding)."}`);
    return { answer: `b ${valPlain(b)}${uP}`, steps, b };
  }

  // Isosceles trapezium from the parallel sides and the equal sloping sides.
  let [a, b, s] = nums;
  if (a > b) [a, b] = [b, a];
  if (a === b) return { error: "If the parallel sides are equal, the shape is a rectangle or parallelogram, not a trapezium. Use two different lengths." };
  const over = (b - a) / 2;
  if (s <= over + 1e-12) {
    return { error: `Each sloping side has to be longer than ${num(over)} (half the difference between the parallel sides), or the shape can't close up.` };
  }
  const h = Math.sqrt(s * s - over * over);
  const A = 0.5 * (a + b) * h;
  steps.push(`Each end sticks out by half the difference of the parallel sides: $\\dfrac{${tnum(b)} - ${tnum(a)}}{2} = ${tnum(over)}${u}$`);
  steps.push(`The sloping side is the hypotenuse of a right-angled triangle, so by Pythagoras $h = \\sqrt{${tnum(s)}^2 - ${tnum(over)}^2} = \\sqrt{${tnum(s * s - over * over)}} ${val(h)}${u}$`);
  steps.push(`Now $A = \\dfrac{1}{2}(a + b)h = \\dfrac{1}{2} \\times ${tnum(a + b)} \\times ${isExact(h, 4) ? tnum(h) : fixed(h, 4)} ${val(A)}${u2}$`);
  if (!isExact(A, 4)) steps.push("The height and area are rounded to 2 decimal places. Keep the unrounded height in your calculator for the last step.");
  return { answer: `A ${valPlain(A)}${u2P} (height ${valPlain(h).replace(/^= /, "")}${uP})`, steps, A, h };
}
