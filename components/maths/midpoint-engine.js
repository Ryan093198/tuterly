// Midpoint engine for MidpointCalc.jsx. Two jobs: the midpoint of two
// points, and the missing endpoint when you know one end and the midpoint.
// Exact arithmetic on the inputs (decimals become fractions), so halves
// never pick up rounding errors. Plain arithmetic, no AI. Kept free of
// imports so the logic can be tested on its own.

export const MODES = {
  mid: "The midpoint of two points",
  end: "A missing endpoint",
};

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

const add = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
const half = (a) => frac(a.n, a.d * 2n);
const dbl = (a) => frac(a.n * 2n, a.d);
const val = (a) => Number(a.n) / Number(a.d);

// Inputs are terminating decimals, and halving or doubling keeps them
// terminating, so every answer can be shown exactly as a decimal.
export function dec(a) {
  const x = val(a);
  const r = Math.round(x * 1e7) / 1e7;
  return String(Object.is(r, -0) ? 0 : r);
}
const br = (a) => (a.n < 0n ? `(${dec(a)})` : dec(a));
const pt = (x, y) => `(${dec(x)}, ${dec(y)})`;

// Returns { answer, steps, pts } or { error }.
// mode "mid": raws = [x1, y1, x2, y2]
// mode "end": raws = [x1, y1, mx, my]
export function solveMidpoint(mode, raws) {
  const nums = raws.map(parse);
  if (nums.some((v) => v === null)) return { error: "Fill in all four coordinates." };
  if (nums.some((v) => Number.isNaN(v))) return { error: "Enter numbers only, like 3, -2 or 1.5." };
  if (nums.some((v) => Math.abs(val(v)) > 1e9)) return { error: "Those numbers are too big for this calculator." };

  if (mode === "end") {
    const [x1, y1, mx, my] = nums;
    if (x1.n * mx.d === mx.n * x1.d && y1.n * my.d === my.n * y1.d) {
      return { error: "The endpoint and the midpoint are the same point, so the other endpoint is that point too. Enter a different midpoint." };
    }
    const x2 = sub(dbl(mx), x1);
    const y2 = sub(dbl(my), y1);
    const steps = [
      "The midpoint is the average of the endpoints, so each coordinate of the midpoint is halfway between the matching coordinates of $A$ and $B$.",
      `Known: $A = ${pt(x1, y1)}$ and $M = ${pt(mx, my)}$. Call the missing endpoint $B = (x_2, y_2)$.`,
      `$x$-coordinate: $\\dfrac{${dec(x1)} + x_2}{2} = ${dec(mx)}$, so $${dec(x1)} + x_2 = ${dec(dbl(mx))}$ and $x_2 = ${dec(dbl(mx))} - ${br(x1)} = ${dec(x2)}$`,
      `$y$-coordinate: $\\dfrac{${dec(y1)} + y_2}{2} = ${dec(my)}$, so $${dec(y1)} + y_2 = ${dec(dbl(my))}$ and $y_2 = ${dec(dbl(my))} - ${br(y1)} = ${dec(y2)}$`,
      `Check: the midpoint of $${pt(x1, y1)}$ and $${pt(x2, y2)}$ is $\\left(\\dfrac{${dec(x1)} + ${br(x2)}}{2}, \\dfrac{${dec(y1)} + ${br(y2)}}{2}\\right) = ${pt(half(add(x1, x2)), half(add(y1, y2)))}$ ✓`,
    ];
    return {
      answer: `B = ${pt(x2, y2)}`,
      steps,
      pts: { x1: val(x1), y1: val(y1), x2: val(x2), y2: val(y2), mx: val(mx), my: val(my), find: "B" },
    };
  }

  const [x1, y1, x2, y2] = nums;
  if (x1.n * x2.d === x2.n * x1.d && y1.n * y2.d === y2.n * y1.d) {
    return { error: "Those are the same point, so it is its own midpoint. Enter two different points." };
  }
  const sx = add(x1, x2);
  const sy = add(y1, y2);
  const mx = half(sx);
  const my = half(sy);
  const steps = [
    "Midpoint formula: $M = \\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)$. Each coordinate is the average of the two matching coordinates.",
    `Label the points: $(x_1, y_1) = ${pt(x1, y1)}$ and $(x_2, y_2) = ${pt(x2, y2)}$`,
    `Average the $x$-values: $\\dfrac{${dec(x1)} + ${br(x2)}}{2} = \\dfrac{${dec(sx)}}{2} = ${dec(mx)}$`,
    `Average the $y$-values: $\\dfrac{${dec(y1)} + ${br(y2)}}{2} = \\dfrac{${dec(sy)}}{2} = ${dec(my)}$`,
    `So the midpoint is $M = ${pt(mx, my)}$`,
  ];
  return {
    answer: `M = ${pt(mx, my)}`,
    steps,
    pts: { x1: val(x1), y1: val(y1), x2: val(x2), y2: val(y2), mx: val(mx), my: val(my), find: "M" },
  };
}
