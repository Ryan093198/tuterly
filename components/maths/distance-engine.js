// Distance between two points engine for DistanceCalc.jsx. Exact arithmetic
// on the inputs (decimals become fractions), so the answer is a simplified
// surd when the inputs are whole numbers, plus a value rounded to 2 decimal
// places. Plain arithmetic, no AI. Kept free of imports so the logic can be
// tested on its own.

// Exact fractions with BigInt parts, so squaring large or very precise
// inputs never loses accuracy.
const gcd = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a || 1n;
};

function frac(n, d = 1n) {
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

// "1.5" to 3/2, "-4" to -4/1. Up to 6 decimal places.
function parse(v) {
  const s = String(v ?? "").trim().replace(/,/g, "").replace(/−/g, "-");
  if (!s) return null;
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return NaN;
  const neg = s.startsWith("-");
  const body = s.replace(/^[-+]/, "");
  const [whole, part = ""] = body.split(".");
  const places = part.slice(0, 6);
  const n = BigInt((whole || "0") + places);
  return frac(neg ? -n : n, 10n ** BigInt(places.length));
}

const sub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
const add = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const sq = (a) => frac(a.n * a.n, a.d * a.d);
const val = (a) => Number(a.n) / Number(a.d);

// A fraction from decimal inputs always has a terminating decimal, so show
// it as a decimal: 5/2 to 2.5.
export function dec(a) {
  const x = val(a);
  const r = Math.round(x * 1e6) / 1e6;
  return String(Object.is(r, -0) ? 0 : r);
}
const br = (a) => (a.n < 0n ? `(${dec(a)})` : dec(a));

function isqrt(n) {
  if (n < 2n) return n;
  let x = BigInt(Math.floor(Math.sqrt(Number(n))));
  while (x * x > n) x -= 1n;
  while ((x + 1n) * (x + 1n) <= n) x += 1n;
  return x;
}
const isSquare = (n) => n >= 0n && isqrt(n) ** 2n === n;

// √n for a whole number n as k√r with r square-free: √80 = 4√5. Only tries
// small factors, so very large n may come back partly simplified (still exact).
export function simplifySurd(n) {
  let k = 1n;
  let r = BigInt(n);
  for (let f = 2n; f * f <= r && f < 100000n; f++) {
    while (r % (f * f) === 0n) {
      r /= f * f;
      k *= f;
    }
  }
  return { k, r };
}

const fixed2 = (x) => (Math.round(x * 100) / 100).toFixed(2);

// Returns { answer, steps, d, exactTex, pts } or { error }.
export function solveDistance(raws, unitRaw = "") {
  const nums = raws.map(parse);
  if (nums.some((v) => v === null)) return { error: "Fill in both coordinates of both points." };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 3, -2 or 1.5." };
  if (nums.some((v) => Math.abs(val(v)) > 1e9)) return { error: "Those numbers are too big for this calculator." };
  const [x1, y1, x2, y2] = nums;
  const unit = String(unitRaw || "").trim().slice(0, 8);
  const uTex = unit ? `\\text{ ${unit}}` : "\\text{ units}";
  const uPlain = unit ? ` ${unit}` : " units";

  const run = sub(x2, x1);
  const rise = sub(y2, y1);
  if (run.n === 0n && rise.n === 0n) return { error: "Those are the same point, so the distance is 0. Enter two different points." };

  const run2 = sq(run);
  const rise2 = sq(rise);
  const s = add(run2, rise2);
  const d = Math.sqrt(val(s));

  const steps = [
    "Distance formula: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. It is Pythagoras' theorem, with the horizontal and vertical changes as the two shorter sides.",
    `Label the points: $(x_1, y_1) = (${dec(x1)}, ${dec(y1)})$ and $(x_2, y_2) = (${dec(x2)}, ${dec(y2)})$`,
    `Horizontal change (the run): $x_2 - x_1 = ${dec(x2)} - ${br(x1)} = ${dec(run)}$`,
    `Vertical change (the rise): $y_2 - y_1 = ${dec(y2)} - ${br(y1)} = ${dec(rise)}$`,
    `Square each one and add: $${br(run)}^2 + ${br(rise)}^2 = ${dec(run2)} + ${dec(rise2)} = ${dec(s)}$`,
  ];

  let exactTex = null;
  let exactPlain = null;
  if (s.d === 1n && s.n < 10n ** 15n) {
    const { k, r } = simplifySurd(s.n);
    if (r === 1n) {
      exactTex = String(k);
      exactPlain = String(k);
    } else {
      exactTex = `${k === 1n ? "" : k}\\sqrt{${r}}`;
      exactPlain = `${k === 1n ? "" : k}√${r}`;
    }
    if (r === 1n) {
      steps.push(`Take the square root: $d = \\sqrt{${s.n}} = ${k}${uTex}$`);
    } else if (k === 1n) {
      steps.push(`Take the square root: $d = \\sqrt{${s.n}} \\approx ${fixed2(d)}${uTex}$ ($${s.n}$ has no square factor, so $\\sqrt{${s.n}}$ is already simplified)`);
    } else {
      steps.push(`Take the square root and simplify the surd: $d = \\sqrt{${s.n}} = \\sqrt{${k * k} \\times ${r}} = ${exactTex} \\approx ${fixed2(d)}${uTex}$`);
    }
  } else if (isSquare(s.n) && isSquare(s.d)) {
    exactTex = dec(frac(isqrt(s.n), isqrt(s.d)));
    exactPlain = exactTex;
    steps.push(`Take the square root: $d = \\sqrt{${dec(s)}} = ${exactTex}${uTex}$`);
  } else {
    steps.push(`Take the square root: $d = \\sqrt{${dec(s)}} \\approx ${fixed2(d)}${uTex}$`);
  }

  if (rise.n === 0n) steps.push(`Shortcut: the points have the same $y$-value, so they sit on a horizontal line and the distance is just the difference in $x$: $|${dec(run)}| = ${dec({ n: run.n < 0n ? -run.n : run.n, d: run.d })}$`);
  else if (run.n === 0n) steps.push(`Shortcut: the points have the same $x$-value, so they sit on a vertical line and the distance is just the difference in $y$: $|${dec(rise)}| = ${dec({ n: rise.n < 0n ? -rise.n : rise.n, d: rise.d })}$`);

  const exactIsWhole = exactPlain !== null && !exactPlain.includes("√");
  const answer = exactIsWhole
    ? `d = ${exactPlain}${uPlain}`
    : exactPlain
      ? `d = ${exactPlain} ≈ ${fixed2(d)}${uPlain}`
      : `d ≈ ${fixed2(d)}${uPlain}`;

  return {
    answer,
    steps,
    d,
    exactTex,
    pts: { x1: val(x1), y1: val(y1), x2: val(x2), y2: val(y2), run: dec(run), rise: dec(rise) },
  };
}
