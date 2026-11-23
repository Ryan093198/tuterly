// Interior angles of polygons engine for InteriorAnglesCalc.jsx. Five jobs:
// the interior angle sum from the number of sides, each interior and
// exterior angle of a regular polygon, the number of sides from an angle
// sum, the number of sides of a regular polygon from one interior angle,
// and a missing angle from the other angles of a polygon. Plain arithmetic,
// no AI. Kept free of imports so the logic can be tested on its own.

export const MODES = {
  sum: { tab: "Angle sum", labels: ["Number of sides (n)"], start: ["8"] },
  regular: { tab: "Regular polygon", labels: ["Number of sides (n)"], start: ["10"] },
  sidesFromSum: { tab: "Sides from angle sum", labels: ["Angle sum (degrees)"], start: ["1980"] },
  sidesFromAngle: { tab: "Sides from one angle", labels: ["Each interior angle (degrees)"], start: ["156"] },
  missing: { tab: "Missing angle", labels: ["Number of sides (n)", "Known angles, separated by commas"], start: ["5", "110, 95, 120, 105"] },
};

const NAMES = {
  3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon",
  9: "nonagon", 10: "decagon", 11: "hendecagon", 12: "dodecagon", 15: "pentadecagon", 20: "icosagon",
};
export const polygonName = (n) => NAMES[n] || `${n}-sided polygon`;
// "an octagon", "a hexagon", "an 11-sided polygon".
export const aName = (n, cap = false) => {
  const name = polygonName(n);
  const art = /^([aeiou]|8|11\b|11-|18)/.test(name) ? "an" : "a";
  return `${cap ? art[0].toUpperCase() + art.slice(1) : art} ${name}`;
};

export function parseNum(v) {
  const s = String(v ?? "").trim().replace(/°/g, "").replace(/,/g, "");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// Up to dp decimal places, trailing zeros removed.
export function fmt(n, dp = 2) {
  const r = Math.round(n * 10 ** dp) / 10 ** dp;
  return String(Object.is(r, -0) ? 0 : r);
}
const isWhole = (x) => Math.abs(x - Math.round(x)) < 1e-9;
const deg = (x) => `${fmt(x)}^\\circ`;
const degP = (x) => `${fmt(x)}°`;

function readSides(raw) {
  const n = parseNum(raw);
  if (n === null) return { error: "Enter the number of sides." };
  if (Number.isNaN(n)) return { error: "Enter the number of sides as a whole number, like 6." };
  if (!isWhole(n)) return { error: "A polygon has a whole number of sides, like 5 or 12." };
  if (n < 3) return { error: "A polygon needs at least 3 sides." };
  if (n > 1000) return { error: "Try a polygon with 1000 sides or fewer." };
  return { n: Math.round(n) };
}

export function solve(mode, raws) {
  if (!MODES[mode]) return { error: "Pick what you want to work out." };
  const steps = [];

  if (mode === "sum" || mode === "regular") {
    const { n, error } = readSides(raws[0]);
    if (error) return { error };
    const S = (n - 2) * 180;
    steps.push(`${aName(n, true)} has $n = ${n}$ sides. Lines from one vertex split it into $n - 2 = ${n - 2}$ triangle${n - 2 === 1 ? "" : "s"}.`);
    steps.push(`Each triangle has $180^\\circ$, so the angle sum is $S = (n - 2) \\times 180^\\circ = ${n - 2} \\times 180^\\circ = ${deg(S)}$`);
    if (mode === "sum") {
      return { answer: `Angle sum = ${degP(S)}`, steps, n, S };
    }
    const I = S / n;
    const E = 360 / n;
    steps.push(`In a regular polygon all ${n} angles are equal: each interior angle $= \\dfrac{${S}^\\circ}{${n}} ${isWhole(I * 100) ? "=" : "\\approx"} ${deg(I)}$`);
    steps.push(`Each exterior angle $= \\dfrac{360^\\circ}{${n}} ${isWhole(E * 100) ? "=" : "\\approx"} ${deg(E)}$`);
    steps.push(`Check: interior + exterior $= ${fmt(I)}^\\circ + ${fmt(E)}^\\circ = 180^\\circ$ (they sit on a straight line)`);
    const approx = !isWhole(I * 100);
    return { answer: `Each interior angle ${approx ? "≈" : "="} ${degP(I)}, each exterior angle ${!isWhole(E * 100) ? "≈" : "="} ${degP(E)}`, steps, n, S, I, E };
  }

  if (mode === "sidesFromSum") {
    const S = parseNum(raws[0]);
    if (S === null) return { error: "Enter the angle sum in degrees." };
    if (Number.isNaN(S)) return { error: "Enter a number of degrees, like 1440." };
    if (S < 180) return { error: "The smallest polygon, a triangle, has an angle sum of 180°, so the sum must be at least 180°." };
    const k = S / 180;
    steps.push(`Start from $(n - 2) \\times 180^\\circ = ${deg(S)}$`);
    steps.push(`Divide both sides by $180^\\circ$: $n - 2 = \\dfrac{${fmt(S)}}{180} ${isWhole(k) ? "=" : "\\approx"} ${fmt(k, 4)}$`);
    if (!isWhole(k)) {
      steps.push(`$${fmt(k, 4)}$ isn't a whole number, so no polygon has this angle sum. Every angle sum is a multiple of $180^\\circ$.`);
      return { answer: `No polygon has an angle sum of ${degP(S)}`, steps, n: null };
    }
    const n = Math.round(k) + 2;
    steps.push(`Add 2: $n = ${Math.round(k)} + 2 = ${n}$`);
    return { answer: `n = ${n} sides (${aName(n)})`, steps, n };
  }

  if (mode === "sidesFromAngle") {
    const I = parseNum(raws[0]);
    if (I === null) return { error: "Enter one interior angle in degrees." };
    if (Number.isNaN(I)) return { error: "Enter a number of degrees, like 135." };
    if (I < 60) return { error: "The smallest interior angle of a regular polygon is 60°, in an equilateral triangle." };
    if (I >= 180) return { error: "An interior angle of a regular polygon is always less than 180°." };
    const E = 180 - I;
    const n = 360 / E;
    steps.push(`Each exterior angle $= 180^\\circ - ${deg(I)} = ${deg(E)}$`);
    steps.push(`The exterior angles add to $360^\\circ$, so $n = \\dfrac{360^\\circ}{${deg(E)}} ${isWhole(n) ? "=" : "\\approx"} ${fmt(n, 4)}$`);
    if (!isWhole(n)) {
      steps.push(`$${fmt(n, 4)}$ isn't a whole number, so no regular polygon has interior angles of $${deg(I)}$.`);
      return { answer: `No regular polygon has interior angles of ${degP(I)}`, steps, n: null };
    }
    const N = Math.round(n);
    steps.push(`Check: $(${N} - 2) \\times 180^\\circ \\div ${N} = ${deg(((N - 2) * 180) / N)}$ ✓`);
    return { answer: `n = ${N} sides (a regular ${polygonName(N)})`, steps, n: N };
  }

  // missing angle
  const { n, error } = readSides(raws[0]);
  if (error) return { error };
  if (n > 50) return { error: "For a missing angle, use a polygon with 50 sides or fewer." };
  const parts = String(raws[1] ?? "").split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return { error: "Enter the angles you know, separated by commas." };
  const angles = parts.map(parseNum);
  if (angles.some((a) => Number.isNaN(a) || a === null)) return { error: "Enter the known angles as numbers separated by commas, like 110, 95, 120." };
  if (angles.some((a) => a <= 0 || a >= 360)) return { error: "Each angle must be more than 0° and less than 360°." };
  if (angles.length !== n - 1) {
    return { error: `${aName(n, true)} has ${n} angles, so enter ${n - 1} known angle${n - 1 === 1 ? "" : "s"} (you entered ${angles.length}).` };
  }
  const S = (n - 2) * 180;
  const known = angles.reduce((a, b) => a + b, 0);
  const x = S - known;
  steps.push(`Angle sum of ${aName(n)}: $(${n} - 2) \\times 180^\\circ = ${deg(S)}$`);
  steps.push(`Add the known angles: $${angles.map(fmt).join(" + ")} = ${deg(known)}$`);
  if (x <= 0 || x >= 360) {
    steps.push(`$${deg(S)} - ${deg(known)} = ${deg(x)}$, which can't be an angle of a polygon. Check the angles you entered.`);
    return { error: `Those angles add to ${degP(known)}, which leaves ${degP(x)} for the last angle. That can't be right, so check the numbers.` };
  }
  steps.push(`Missing angle $= ${deg(S)} - ${deg(known)} = ${deg(x)}$`);
  if (x > 180) steps.push(`It's more than $180^\\circ$, so this is a reflex angle and the polygon is not convex.`);
  return { answer: `Missing angle = ${degP(x)}`, steps, n, S, x };
}
