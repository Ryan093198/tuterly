// Probability engine for ProbabilityCalc.jsx. Three jobs: the probability
// of one event from counts of outcomes (with its complement), the chance of
// two independent events both happening (and of at least one), and the
// expected number of times an event happens in a number of trials. Exact
// fractions throughout, plain arithmetic, no AI. Kept free of imports so the
// logic can be tested on its own.

export const MODES = {
  single: { tab: "One event", labels: ["Favourable outcomes", "Total outcomes"], start: ["2", "6"] },
  both: { tab: "Two independent events", labels: ["P(A)", "P(B)"], start: ["1/2", "1/6"] },
  expected: { tab: "Expected number", labels: ["Probability", "Number of trials"], start: ["1/4", "200"] },
};

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
function frac(n, d = 1) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
const mul = (a, b) => frac(a.n * b.n, a.d * b.d);
const add = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
const value = (a) => a.n / a.d;

// "3/8", "0.375", "37.5%" or "1" to an exact fraction. Returns null if empty,
// NaN if it can't be read.
export function parseProb(raw) {
  const s = String(raw ?? "").trim().replace(/\s+/g, "");
  if (!s) return null;
  let m = s.match(/^(\d+)\/(\d+)$/);
  if (m) {
    const d = Number(m[2]);
    if (d === 0) return NaN;
    return frac(Number(m[1]), d);
  }
  m = s.match(/^(\d*\.?\d+)(%?)$/);
  if (!m) return NaN;
  const places = (m[1].split(".")[1] || "").length;
  if (places > 8) return NaN;
  const scale = 10 ** places;
  const f = frac(Math.round(Number(m[1]) * scale), scale);
  return m[2] ? frac(f.n, f.d * 100) : f;
}

function parseCount(raw) {
  const s = String(raw ?? "").trim().replace(/,/g, "");
  if (!s) return null;
  if (!/^\d+$/.test(s)) return NaN;
  return Number(s);
}

const tex = (a) => (a.d === 1 ? String(a.n) : `\\dfrac{${a.n}}{${a.d}}`);
const plain = (a) => (a.d === 1 ? String(a.n) : `${a.n}/${a.d}`);
const exact = (x, dp) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-9;
function dec(x, dp = 4) {
  const r = Math.round(x * 10 ** dp) / 10 ** dp;
  return String(Object.is(r, -0) ? 0 : r);
}
// "= 0.25" when exact to 4 dp, otherwise "≈ 0.3333".
const decEq = (x) => (exact(x, 4) ? `= ${dec(x)}` : `≈ ${x.toFixed(4)}`);
const pctEq = (x) => (exact(x * 100, 2) ? `= ${dec(x * 100, 2)}%` : `≈ ${(x * 100).toFixed(2)}%`);
const texEq = (s) => s.replace("≈", "\\approx").replace("%", "\\%");

// Fraction, decimal and percentage in one line, for the steps.
const allForms = (p) => (p.d === 1 ? `$${p.n} = ${p.n * 100}\\%$` : `$${tex(p)} ${texEq(decEq(value(p)))} ${texEq(pctEq(value(p)))}$`);
// The answer line: "1/4 = 0.25 = 25%", or "1 = 100%" for a whole number.
const answerForms = (p, withPct = true) => (p.d === 1 ? `${p.n}${withPct ? ` = ${p.n * 100}%` : ""}` : `${plain(p)} ${decEq(value(p))}${withPct ? ` ${pctEq(value(p))}` : ""}`);

function describe(p) {
  const v = value(p);
  if (v === 0) return "impossible";
  if (v === 1) return "certain";
  if (v < 0.5) return "unlikely";
  if (v === 0.5) return "an even chance";
  return "likely";
}

export function solve(mode, raws) {
  const m = MODES[mode];
  if (!m) return { error: "Pick what you want to find." };
  const steps = [];

  if (mode === "single") {
    const [fav, tot] = raws.map(parseCount);
    if (fav === null || tot === null) return { error: "Fill in both numbers." };
    if (Number.isNaN(fav) || Number.isNaN(tot)) return { error: "Outcomes are counted, so enter whole numbers like 3 or 12." };
    if (tot === 0) return { error: "The total number of outcomes has to be at least 1." };
    if (fav > tot) return { error: "The favourable outcomes are part of the total, so there can't be more of them than the total." };
    if (tot > 1e9) return { error: "That number is too big for this calculator." };
    const p = frac(fav, tot);
    const q = sub(frac(1), p);
    steps.push("Use $P(\\text{event}) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}$. This only works when every outcome is equally likely.");
    steps.push(`Substitute: $P = \\dfrac{${fav}}{${tot}}$`);
    if (p.d !== tot && fav > 0) steps.push(`Simplify by dividing top and bottom by $${gcd(fav, tot)}$: $P = ${tex(p)}$`);
    steps.push(`As a fraction, decimal and percentage: ${allForms(p)}`);
    steps.push(`The chance it does not happen: $P(\\text{not}) = 1 - ${tex(p)} = ${tex(q)}$, which is ${tot - fav} of the ${tot} outcomes.`);
    steps.push(`On the scale from 0 (impossible) to 1 (certain), this event is ${describe(p)}.`);
    return { answer: `P = ${answerForms(p)}`, steps, p, q };
  }

  if (mode === "both") {
    const [a, b] = raws.map(parseProb);
    if (a === null || b === null) return { error: "Fill in both probabilities." };
    if (Number.isNaN(a) || Number.isNaN(b)) return { error: "Enter each probability as a fraction (1/6), a decimal (0.25) or a percentage (40%)." };
    if (value(a) > 1 || value(b) > 1) return { error: "A probability can't be more than 1 (or 100%)." };
    const ab = mul(a, b);
    const either = sub(add(a, b), ab);
    const neither = mul(sub(frac(1), a), sub(frac(1), b));
    steps.push("Independent means one event has no effect on the other, like two coin tosses or a die and a spinner.");
    steps.push(`Both happen: multiply. $P(A \\text{ and } B) = ${tex(a)} \\times ${tex(b)} = ${tex(ab)}$`);
    steps.push(`As a decimal and percentage: ${allForms(ab)}`);
    steps.push(`Neither happens: $(1 - ${tex(a)}) \\times (1 - ${tex(b)}) = ${tex(sub(frac(1), a))} \\times ${tex(sub(frac(1), b))} = ${tex(neither)}$`);
    steps.push(`At least one happens: $1 - ${tex(neither)} = ${tex(either)}$, the same as $P(A) + P(B) - P(A \\text{ and } B)$`);
    return { answer: `P(A and B) = ${answerForms(ab, false)}`, steps, ab, either, neither };
  }

  if (mode === "expected") {
    const p = parseProb(raws[0]);
    const n = parseCount(raws[1]);
    if (p === null || n === null) return { error: "Fill in the probability and the number of trials." };
    if (Number.isNaN(p)) return { error: "Enter the probability as a fraction (1/4), a decimal (0.25) or a percentage (25%)." };
    if (Number.isNaN(n)) return { error: "The number of trials is a count, so enter a whole number like 200." };
    if (value(p) > 1) return { error: "A probability can't be more than 1 (or 100%)." };
    if (n > 1e9) return { error: "That number is too big for this calculator." };
    const e = mul(p, frac(n));
    const ev = value(e);
    steps.push("Expected number $=$ probability $\\times$ number of trials");
    steps.push(`$${tex(p)} \\times ${n} = ${tex(e)}${e.d === 1 ? "" : ` ${texEq(decEq(ev))}`}$`);
    steps.push(`This is a long-run average, not a promise: in ${n} real trials you will usually get close to ${e.d === 1 ? e.n : dec(ev, 2)}, not always exactly that.`);
    return { answer: `Expected number ${e.d === 1 ? `= ${e.n}` : decEq(ev)}`, steps, e };
  }
  return { error: "Pick what you want to find." };
}
