// Ratio engine for RatioCalc.jsx. Three jobs: simplify a ratio (whole
// numbers, decimals or fractions, two to four parts), divide an amount in a
// ratio, and find the other shares and the total when one share is known.
// Exact fraction arithmetic throughout, plain code, no AI.

export const MAX = 1000000;

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const lcm = (a, b) => (a / gcd(a, b)) * b;

function fr(n, d = 1) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}
const mul = (a, b) => fr(a.n * b.n, a.d * b.d);
const div = (a, b) => fr(a.n * b.d, a.d * b.n);

// "12.5" -> 25/2, "3/4" -> 3/4, "8" -> 8/1. Returns null if unreadable.
function readNumber(raw) {
  const s = String(raw ?? "").trim().replace(/,/g, "").replace(/^\$/, "");
  if (/^\d+$/.test(s)) return { f: fr(Number(s), 1), kind: "int", text: s };
  if (/^\d*\.\d+$/.test(s)) {
    const places = s.split(".")[1].length;
    if (places > 4) return { error: `Use at most 4 decimal places (“${s}”).` };
    return { f: fr(Math.round(Number(s) * 10 ** places), 10 ** places), kind: "dec", places, text: s };
  }
  const m = s.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (m) {
    const d = Number(m[2]);
    if (d === 0) return { error: `“${s}” has a denominator of 0.` };
    if (d > 1000) return { error: "Keep fraction denominators to 1000 or less." };
    return { f: fr(Number(m[1]), d), kind: "frac", text: `${m[1]}/${m[2]}` };
  }
  return null;
}

const partTex = (p) => (p.kind === "frac" ? `\\tfrac{${p.text.split("/")[0]}}{${p.text.split("/")[1]}}` : p.text);
const join = (xs) => xs.join(" : ");

export function parseRatio(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return { error: "Type a ratio, like 12 : 18 or 0.5 : 2 or 1/2 : 3/4." };
  const bits = s.split(":").map((b) => b.trim());
  if (bits.length < 2) return { error: "Separate the parts of the ratio with a colon, like 12 : 18." };
  if (bits.length > 4) return { error: "This calculator takes ratios with two, three or four parts." };
  const parts = [];
  for (const b of bits) {
    if (!b) return { error: "One of the parts is empty. Check there's a number on each side of every colon." };
    const p = readNumber(b);
    if (!p) return { error: `“${b}” isn't a number this calculator can read. Use whole numbers, decimals or fractions like 3/4, with no units.` };
    if (p.error) return { error: p.error };
    if (p.f.n === 0) return { error: "Every part of a ratio needs to be more than 0." };
    if (p.f.n / p.f.d > MAX) return { error: "Keep each part to 1 000 000 or less." };
    parts.push(p);
  }
  return { parts };
}

// Turn the parts into whole numbers with no common factor, recording steps.
export function simplifyParts(parts) {
  const steps = [];
  let fs = parts.map((p) => p.f);
  const hasFrac = parts.some((p) => p.kind === "frac");
  const hasDec = parts.some((p) => p.kind === "dec");
  if (hasFrac) {
    const L = fs.reduce((a, f) => lcm(a, f.d), 1);
    if (hasDec) steps.push(`Write the decimals as fractions: $${join(parts.map((p) => (p.kind === "dec" ? `\\tfrac{${p.f.n}}{${p.f.d}}` : partTex(p))))}$`);
    fs = fs.map((f) => mul(f, fr(L, 1)));
    steps.push(`Multiply every part by $${L}$, the lowest common denominator, to clear the fractions. This gives $${join(fs.map((f) => f.n))}$`);
  } else if (hasDec) {
    const k = Math.max(...parts.map((p) => p.places || 0));
    fs = fs.map((f) => mul(f, fr(10 ** k, 1)));
    steps.push(`Multiply every part by $${10 ** k}$ to make them whole numbers. This gives $${join(fs.map((f) => f.n))}$`);
  }
  let ints = fs.map((f) => f.n);
  const g = ints.reduce((a, b) => gcd(a, b));
  if (g > 1) {
    ints = ints.map((x) => x / g);
    steps.push(`The highest common factor of $${join(fs.map((f) => f.n)).replace(/ : /g, ", ")}$ is $${g}$, so divide every part by $${g}$ to get $${join(ints)}$`);
  } else {
    steps.push(`The only common factor of $${fs.map((f) => f.n).join(", ")}$ is $1$, so $${join(ints)}$ can't be simplified any further.`);
  }
  return { ints, steps };
}

// Exact value as text: a terminating decimal if it has one (up to 6 dp),
// otherwise rounded to 2 dp with ≈.
export function show(f) {
  let d = f.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  const v = f.n / f.d;
  if (d === 1) {
    const s = String(Math.round(v * 1e6) / 1e6);
    if ((s.split(".")[1] || "").length <= 6) return { text: s, exact: true };
  }
  return { text: (Math.round(v * 100) / 100).toFixed(2), exact: false };
}
const eq = (f) => { const s = show(f); return (s.exact ? "= " : "\\approx ") + s.text; };
const val = (f) => show(f).text;

export const MODES = {
  simplify: { tab: "Simplify a ratio", labels: ["Ratio"], start: ["24 : 36"] },
  divide: { tab: "Divide an amount", labels: ["Amount to share", "In the ratio"], start: ["180", "2 : 3 : 4"] },
  share: { tab: "Know one share", labels: ["Ratio", "Which part is known? (1, 2, ...)", "Size of that share"], start: ["3 : 5", "1", "42"] },
};

export function solve(mode, vals) {
  const r = parseRatio(vals[mode === "simplify" ? 0 : mode === "divide" ? 1 : 0]);
  if (r.error) return { error: r.error };
  const { parts } = r;
  const { ints, steps } = simplifyParts(parts);
  const S = ints.reduce((a, b) => a + b, 0);

  if (mode === "simplify") {
    if (ints.length === 2 && ints[0] !== 1) {
      steps.push(`As a unit ratio (first part $1$), divide both parts by $${ints[0]}$ to get $1 : ${val(fr(ints[1], ints[0]))}$`);
    }
    return { answer: `Simplest form: ${join(ints)}`, steps, ints };
  }

  // For sharing, only show simplifying steps when the ratio actually changed.
  if (steps.length === 1 && steps[0].startsWith("The only common factor")) steps.length = 0;
  else steps.unshift("Simplify the ratio first (this doesn't change the shares, it just makes the numbers smaller).");

  if (mode === "divide") {
    const a = readNumber(vals[0]);
    if (!a || a.error || a.kind === "frac") return { error: a?.error || "Type the amount to share as a number, like 180 or 45.50." };
    if (a.f.n === 0) return { error: "The amount to share needs to be more than 0." };
    if (a.f.n / a.f.d > 1e9) return { error: "Keep the amount to 1 000 000 000 or less." };
    const T = a.f;
    const one = div(T, fr(S, 1));
    const shares = ints.map((k) => mul(one, fr(k, 1)));
    steps.push(`Add the parts to find the total number of parts: $${ints.join(" + ")} = ${S}$`);
    steps.push(`Find one part: $${val(T)} \\div ${S} ${eq(one)}$`);
    ints.forEach((k, i) => steps.push(`Share ${i + 1}: $${k} \\times ${show(one).exact ? val(one) : `\\tfrac{${val(T)}}{${S}}`} ${eq(shares[i])}$`));
    const allExact = shares.every((f) => show(f).exact);
    steps.push(allExact
      ? `Check: $${shares.map(val).join(" + ")} = ${val(T)}$ ✓`
      : `Check: the exact shares add to $${val(T)}$. The rounded values may be a cent or so out because of rounding.`);
    return { answer: `Shares: ${shares.map(val).join(", ")}`, steps, shares, ints };
  }

  // mode === "share"
  const idx = Number(String(vals[1] ?? "").trim());
  if (!Number.isInteger(idx) || idx < 1 || idx > ints.length) return { error: `Type which part you know, a whole number from 1 to ${ints.length}.` };
  const v = readNumber(vals[2]);
  if (!v || v.error || v.kind === "frac") return { error: v?.error || "Type the size of the known share as a number, like 42 or 7.5." };
  if (v.f.n === 0) return { error: "The known share needs to be more than 0." };
  const known = ints[idx - 1];
  const one = div(v.f, fr(known, 1));
  const shares = ints.map((k) => mul(one, fr(k, 1)));
  const total = mul(one, fr(S, 1));
  steps.push(`Part ${idx} is $${known}$ part${known === 1 ? "" : "s"} and is worth $${val(v.f)}$, so one part is $${val(v.f)} \\div ${known} ${eq(one)}$`);
  ints.forEach((k, i) => { if (i !== idx - 1) steps.push(`Share ${i + 1}: $${k} \\times ${show(one).exact ? val(one) : `\\tfrac{${val(v.f)}}{${known}}`} ${eq(shares[i])}$`); });
  steps.push(`Total: $${S}$ parts, so $${S} \\times ${show(one).exact ? val(one) : `\\tfrac{${val(v.f)}}{${known}}`} ${eq(total)}$`);
  return { answer: `Shares: ${shares.map(val).join(", ")} (total ${val(total)})`, steps, shares, total, ints };
}
