// Rearranging formulas engine for RearrangeCalc.jsx. For a set of common
// school formulas it holds the worked steps to make each letter the
// subject, and it checks a student's own rearrangement by substituting
// random values: pick values for the free letters, work out the remaining
// one from the original formula, then see whether the student's expression
// gives back the right value every time.

import { fmt } from "./calc-utils";

// Each formula: tex, free letters with integer ranges, a forward function
// that fills in the dependent letter, and the subjects we have steps for.
export const FORMULAS = [
  {
    id: "suvat",
    label: "v = u + at",
    tex: "v = u + at",
    context: "Final velocity",
    free: { u: [1, 20], a: [1, 9], t: [1, 12] },
    forward: (x) => ({ ...x, v: x.u + x.a * x.t }),
    subjects: {
      u: { answer: "u = v - at", steps: ["Start with $v = u + at$.", "Subtract $at$ from both sides: $v - at = u$.", "So $u = v - at$."] },
      a: { answer: "a = \\dfrac{v - u}{t}", steps: ["Start with $v = u + at$.", "Subtract $u$ from both sides: $v - u = at$.", "Divide both sides by $t$: $\\dfrac{v - u}{t} = a$.", "So $a = \\dfrac{v - u}{t}$."] },
      t: { answer: "t = \\dfrac{v - u}{a}", steps: ["Start with $v = u + at$.", "Subtract $u$ from both sides: $v - u = at$.", "Divide both sides by $a$: $\\dfrac{v - u}{a} = t$.", "So $t = \\dfrac{v - u}{a}$."] },
    },
  },
  {
    id: "line",
    label: "y = mx + c",
    tex: "y = mx + c",
    context: "Straight line",
    free: { m: [1, 9], x: [1, 12], c: [-10, 10] },
    forward: (v) => ({ ...v, y: v.m * v.x + v.c }),
    subjects: {
      x: { answer: "x = \\dfrac{y - c}{m}", steps: ["Start with $y = mx + c$.", "Subtract $c$ from both sides: $y - c = mx$.", "Divide both sides by $m$: $\\dfrac{y - c}{m} = x$.", "So $x = \\dfrac{y - c}{m}$."] },
      m: { answer: "m = \\dfrac{y - c}{x}", steps: ["Start with $y = mx + c$.", "Subtract $c$ from both sides: $y - c = mx$.", "Divide both sides by $x$: $\\dfrac{y - c}{x} = m$.", "So $m = \\dfrac{y - c}{x}$."] },
      c: { answer: "c = y - mx", steps: ["Start with $y = mx + c$.", "Subtract $mx$ from both sides: $y - mx = c$.", "So $c = y - mx$."] },
    },
  },
  {
    id: "perimeter",
    label: "P = 2(l + w)",
    tex: "P = 2(l + w)",
    context: "Perimeter of a rectangle",
    free: { l: [2, 30], w: [1, 20] },
    forward: (v) => ({ ...v, P: 2 * (v.l + v.w) }),
    subjects: {
      l: { answer: "l = \\dfrac{P}{2} - w", steps: ["Start with $P = 2(l + w)$.", "Divide both sides by $2$: $\\dfrac{P}{2} = l + w$.", "Subtract $w$ from both sides: $\\dfrac{P}{2} - w = l$.", "So $l = \\dfrac{P}{2} - w$, which is the same as $l = \\dfrac{P - 2w}{2}$."] },
      w: { answer: "w = \\dfrac{P}{2} - l", steps: ["Start with $P = 2(l + w)$.", "Divide both sides by $2$: $\\dfrac{P}{2} = l + w$.", "Subtract $l$ from both sides: $\\dfrac{P}{2} - l = w$.", "So $w = \\dfrac{P}{2} - l$, which is the same as $w = \\dfrac{P - 2l}{2}$."] },
    },
  },
  {
    id: "circle",
    label: "A = πr²",
    tex: "A = \\pi r^2",
    context: "Area of a circle",
    free: { r: [1, 20] },
    forward: (v) => ({ ...v, A: Math.PI * v.r ** 2 }),
    subjects: {
      r: { answer: "r = \\sqrt{\\dfrac{A}{\\pi}}", steps: ["Start with $A = \\pi r^2$.", "Divide both sides by $\\pi$: $\\dfrac{A}{\\pi} = r^2$.", "Take the square root of both sides. A radius is a length, so take the positive root: $\\sqrt{\\dfrac{A}{\\pi}} = r$.", "So $r = \\sqrt{\\dfrac{A}{\\pi}}$."] },
    },
  },
  {
    id: "cylinder",
    label: "V = πr²h",
    tex: "V = \\pi r^2 h",
    context: "Volume of a cylinder",
    free: { r: [1, 15], h: [1, 30] },
    forward: (v) => ({ ...v, V: Math.PI * v.r ** 2 * v.h }),
    subjects: {
      h: { answer: "h = \\dfrac{V}{\\pi r^2}", steps: ["Start with $V = \\pi r^2 h$.", "$h$ is multiplied by $\\pi r^2$, so divide both sides by $\\pi r^2$: $\\dfrac{V}{\\pi r^2} = h$.", "So $h = \\dfrac{V}{\\pi r^2}$."] },
      r: { answer: "r = \\sqrt{\\dfrac{V}{\\pi h}}", steps: ["Start with $V = \\pi r^2 h$.", "Divide both sides by $\\pi h$: $\\dfrac{V}{\\pi h} = r^2$.", "Take the positive square root of both sides: $\\sqrt{\\dfrac{V}{\\pi h}} = r$.", "So $r = \\sqrt{\\dfrac{V}{\\pi h}}$."] },
    },
  },
  {
    id: "trapezium",
    label: "A = ½(a + b)h",
    tex: "A = \\dfrac{1}{2}(a + b)h",
    context: "Area of a trapezium",
    free: { a: [1, 20], b: [1, 20], h: [1, 15] },
    forward: (v) => ({ ...v, A: 0.5 * (v.a + v.b) * v.h }),
    subjects: {
      h: { answer: "h = \\dfrac{2A}{a + b}", steps: ["Start with $A = \\dfrac{1}{2}(a + b)h$.", "Multiply both sides by $2$: $2A = (a + b)h$.", "Divide both sides by $(a + b)$: $\\dfrac{2A}{a + b} = h$.", "So $h = \\dfrac{2A}{a + b}$."] },
      a: { answer: "a = \\dfrac{2A}{h} - b", steps: ["Start with $A = \\dfrac{1}{2}(a + b)h$.", "Multiply both sides by $2$: $2A = (a + b)h$.", "Divide both sides by $h$: $\\dfrac{2A}{h} = a + b$.", "Subtract $b$ from both sides: $\\dfrac{2A}{h} - b = a$.", "So $a = \\dfrac{2A}{h} - b$."] },
    },
  },
  {
    id: "temp",
    label: "C = 5(F − 32) ÷ 9",
    tex: "C = \\dfrac{5(F - 32)}{9}",
    context: "Fahrenheit to Celsius",
    free: { F: [-40, 212] },
    forward: (v) => ({ ...v, C: (5 * (v.F - 32)) / 9 }),
    subjects: {
      F: { answer: "F = \\dfrac{9C}{5} + 32", steps: ["Start with $C = \\dfrac{5(F - 32)}{9}$.", "Multiply both sides by $9$: $9C = 5(F - 32)$.", "Divide both sides by $5$: $\\dfrac{9C}{5} = F - 32$.", "Add $32$ to both sides: $\\dfrac{9C}{5} + 32 = F$.", "So $F = \\dfrac{9C}{5} + 32$."] },
    },
  },
  {
    id: "interest",
    label: "I = Prt",
    tex: "I = Prt",
    context: "Simple interest",
    free: { P: [100, 9000], r: [1, 9], t: [1, 10] },
    forward: (v) => ({ ...v, I: v.P * v.r * v.t }),
    subjects: {
      P: { answer: "P = \\dfrac{I}{rt}", steps: ["Start with $I = Prt$.", "$P$ is multiplied by $rt$, so divide both sides by $rt$: $\\dfrac{I}{rt} = P$.", "So $P = \\dfrac{I}{rt}$."] },
      r: { answer: "r = \\dfrac{I}{Pt}", steps: ["Start with $I = Prt$.", "$r$ is multiplied by $Pt$, so divide both sides by $Pt$: $\\dfrac{I}{Pt} = r$.", "So $r = \\dfrac{I}{Pt}$."] },
      t: { answer: "t = \\dfrac{I}{Pr}", steps: ["Start with $I = Prt$.", "$t$ is multiplied by $Pr$, so divide both sides by $Pr$: $\\dfrac{I}{Pr} = t$.", "So $t = \\dfrac{I}{Pr}$."] },
    },
  },
  {
    id: "kinetic",
    label: "E = ½mv²",
    tex: "E = \\dfrac{1}{2}mv^2",
    context: "Kinetic energy",
    free: { m: [1, 80], v: [1, 30] },
    forward: (x) => ({ ...x, E: 0.5 * x.m * x.v ** 2 }),
    subjects: {
      m: { answer: "m = \\dfrac{2E}{v^2}", steps: ["Start with $E = \\dfrac{1}{2}mv^2$.", "Multiply both sides by $2$: $2E = mv^2$.", "Divide both sides by $v^2$: $\\dfrac{2E}{v^2} = m$.", "So $m = \\dfrac{2E}{v^2}$."] },
      v: { answer: "v = \\sqrt{\\dfrac{2E}{m}}", steps: ["Start with $E = \\dfrac{1}{2}mv^2$.", "Multiply both sides by $2$: $2E = mv^2$.", "Divide both sides by $m$: $\\dfrac{2E}{m} = v^2$.", "Take the square root of both sides (positive for a speed): $\\sqrt{\\dfrac{2E}{m}} = v$.", "So $v = \\sqrt{\\dfrac{2E}{m}}$."] },
    },
  },
  {
    id: "pythagoras",
    label: "c² = a² + b²",
    tex: "c^2 = a^2 + b^2",
    context: "Pythagoras’ theorem",
    free: { a: [1, 20], b: [1, 20] },
    forward: (v) => ({ ...v, c: Math.sqrt(v.a ** 2 + v.b ** 2) }),
    subjects: {
      c: { answer: "c = \\sqrt{a^2 + b^2}", steps: ["Start with $c^2 = a^2 + b^2$.", "Take the positive square root of both sides: $c = \\sqrt{a^2 + b^2}$.", "Don't split the root: $\\sqrt{a^2 + b^2}$ is not $a + b$."] },
      a: { answer: "a = \\sqrt{c^2 - b^2}", steps: ["Start with $c^2 = a^2 + b^2$.", "Subtract $b^2$ from both sides: $c^2 - b^2 = a^2$.", "Take the positive square root of both sides: $\\sqrt{c^2 - b^2} = a$.", "So $a = \\sqrt{c^2 - b^2}$, which is not the same as $c - b$."] },
    },
  },
  {
    id: "pendulum",
    label: "T = 2π√(L ÷ g)",
    tex: "T = 2\\pi\\sqrt{\\dfrac{L}{g}}",
    context: "Pendulum, Year 10A",
    free: { L: [1, 20], g: [5, 15] },
    forward: (v) => ({ ...v, T: 2 * Math.PI * Math.sqrt(v.L / v.g) }),
    subjects: {
      L: { answer: "L = \\dfrac{gT^2}{4\\pi^2}", steps: ["Start with $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$.", "Divide both sides by $2\\pi$: $\\dfrac{T}{2\\pi} = \\sqrt{\\dfrac{L}{g}}$.", "Square both sides: $\\dfrac{T^2}{4\\pi^2} = \\dfrac{L}{g}$.", "Multiply both sides by $g$: $\\dfrac{gT^2}{4\\pi^2} = L$.", "So $L = \\dfrac{gT^2}{4\\pi^2}$."] },
      g: { answer: "g = \\dfrac{4\\pi^2 L}{T^2}", steps: ["Start with $T = 2\\pi\\sqrt{\\dfrac{L}{g}}$.", "Divide both sides by $2\\pi$ and square: $\\dfrac{T^2}{4\\pi^2} = \\dfrac{L}{g}$.", "Multiply both sides by $g$: $\\dfrac{gT^2}{4\\pi^2} = L$.", "Multiply both sides by $4\\pi^2$ and divide by $T^2$: $g = \\dfrac{4\\pi^2 L}{T^2}$."] },
    },
  },
];

export const getFormula = (id) => FORMULAS.find((f) => f.id === id);

// ── A small expression parser for student answers ──────────────────────
// Single-letter variables (case sensitive), numbers, + - * / ^, brackets,
// sqrt(...) or √, pi or π, and implied multiplication (2A, a(b + c), πr^2).

function tokenise(src) {
  const s = String(src)
    .replace(/[×·]/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–]/g, "-")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/[[{]/g, "(")
    .replace(/[\]}]/g, ")");
  const out = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) { i++; continue; }
    const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (num) { out.push({ t: "num", v: Number(num[1]) }); i += num[1].length; continue; }
    if (s.startsWith("sqrt", i)) { out.push({ t: "sqrt" }); i += 4; continue; }
    if (ch === "√") { out.push({ t: "sqrt" }); i++; continue; }
    if (s.startsWith("pi", i)) { out.push({ t: "num", v: Math.PI, pi: true }); i += 2; continue; }
    if (ch === "π") { out.push({ t: "num", v: Math.PI, pi: true }); i++; continue; }
    if (/[A-Za-z]/.test(ch)) { out.push({ t: "var", v: ch }); i++; continue; }
    if ("+-*/^()".includes(ch)) { out.push({ t: ch }); i++; continue; }
    throw new Error(`I can't read “${ch}”. Use letters, numbers, + − × ÷ ^, brackets and sqrt( ).`);
  }
  return out;
}

// Returns { fn(vars) => number, vars: Set }.
export function parseExpr(src) {
  const toks = tokenise(src);
  if (!toks.length) throw new Error("Type an expression first.");
  let p = 0;
  const vars = new Set();
  const peek = () => toks[p];
  const take = (t) => {
    if (!toks[p] || toks[p].t !== t) throw new Error(t === ")" ? "A bracket isn't closed." : "That expression isn't complete.");
    return toks[p++];
  };
  const startsPrimary = (tk) => tk && (tk.t === "num" || tk.t === "var" || tk.t === "sqrt" || tk.t === "(");

  function expr() {
    let left = term();
    while (peek() && (peek().t === "+" || peek().t === "-")) {
      const op = toks[p++].t;
      const l = left, r = term();
      left = op === "+" ? (x) => l(x) + r(x) : (x) => l(x) - r(x);
    }
    return left;
  }
  function term() {
    let left = unary();
    for (;;) {
      const tk = peek();
      if (tk && (tk.t === "*" || tk.t === "/")) {
        p++;
        const l = left, r = unary();
        left = tk.t === "*" ? (x) => l(x) * r(x) : (x) => l(x) / r(x);
      } else if (startsPrimary(tk)) {
        const l = left, r = power();
        left = (x) => l(x) * r(x);
      } else break;
    }
    return left;
  }
  function unary() {
    const tk = peek();
    if (tk && tk.t === "-") { p++; const u = unary(); return (x) => -u(x); }
    if (tk && tk.t === "+") { p++; return unary(); }
    return power();
  }
  function power() {
    const base = primary();
    if (peek() && peek().t === "^") {
      p++;
      const e = unary();
      return (x) => Math.pow(base(x), e(x));
    }
    return base;
  }
  function primary() {
    const tk = peek();
    if (!tk) throw new Error("That expression isn't complete.");
    if (tk.t === "num") { p++; const v = tk.v; return () => v; }
    if (tk.t === "var") { p++; vars.add(tk.v); const k = tk.v; return (x) => x[k]; }
    if (tk.t === "(") { p++; const e = expr(); take(")"); return e; }
    if (tk.t === "sqrt") {
      p++;
      const arg = power();
      return (x) => Math.sqrt(arg(x));
    }
    throw new Error("That expression isn't complete.");
  }

  const fn = expr();
  if (p < toks.length) throw new Error(toks[p].t === ")" ? "There's an extra closing bracket." : "I couldn't read the whole expression.");
  return { fn, vars };
}

// Letters used in a formula (all free letters plus the dependent one).
export function lettersOf(f) {
  const sample = f.forward(Object.fromEntries(Object.keys(f.free).map((k) => [k, 1])));
  return Object.keys(sample);
}

const randInt = ([lo, hi]) => lo + Math.floor(Math.random() * (hi - lo + 1));

// Check a student's expression for `subject` in formula `id`.
// `rand` can be passed for testing (a function returning the free values).
export function checkAnswer(id, subject, input, rand) {
  const f = getFormula(id);
  if (!f || !f.subjects[subject]) return { ok: false, error: "Pick a formula and a letter first." };
  let src = String(input ?? "").trim();
  if (!src) return { ok: false, error: `Type your expression for ${subject}, for example the right-hand side of ${subject} = ...` };
  if (src.includes("=")) {
    const parts = src.split("=").map((x) => x.trim());
    if (parts.length !== 2) return { ok: false, error: "Use at most one equals sign." };
    if (parts[0] === subject) src = parts[1];
    else if (parts[1] === subject) src = parts[0];
    else return { ok: false, error: `Make ${subject} the subject: type ${subject} = ... or just the expression.` };
  }
  let parsed;
  try { parsed = parseExpr(src); } catch (e) { return { ok: false, error: e.message }; }
  const letters = lettersOf(f);
  if (parsed.vars.has(subject)) return { ok: false, verdict: "subject", message: `Your answer still has ${subject} in it. The subject should appear only on the left: ${subject} = (an expression without ${subject}).` };
  for (const v of parsed.vars) {
    if (!letters.includes(v)) {
      const other = letters.find((l) => l.toLowerCase() === v.toLowerCase());
      return { ok: false, verdict: "letter", message: other ? `There's no ${v} in this formula. Letters are case sensitive: did you mean ${other}?` : `There's no ${v} in this formula. Use only ${letters.filter((l) => l !== subject).join(", ")}.` };
    }
  }
  let firstFail = null;
  let signFlip = true;
  for (let i = 0; i < 8; i++) {
    const free = rand ? rand(i) : Object.fromEntries(Object.entries(f.free).map(([k, r]) => [k, randInt(r)]));
    const vals = f.forward(free);
    const want = vals[subject];
    const env = { ...vals };
    delete env[subject];
    const got = parsed.fn(env);
    const close = Number.isFinite(got) && Math.abs(got - want) <= 1e-6 * Math.max(1, Math.abs(want));
    if (!(Number.isFinite(got) && Math.abs(got + want) <= 1e-6 * Math.max(1, Math.abs(want)))) signFlip = false;
    if (!close && !firstFail) firstFail = { vals, got, want };
  }
  if (!firstFail) return { ok: true, message: `Correct. Your expression gives the right value of ${subject} every time we test it.` };
  const shown = Object.entries(firstFail.vals)
    .filter(([k]) => k !== subject)
    .map(([k, v]) => `$${k} = ${fmt(v, 4)}$`)
    .join(", ");
  const gotTxt = Number.isFinite(firstFail.got) ? `$${fmt(firstFail.got, 4)}$` : "no real value";
  const lead = signFlip ? "Close, but the sign is wrong everywhere. Check which side you subtracted from." : "Not quite.";
  return {
    ok: false,
    verdict: "wrong",
    message: `${lead} Test it with numbers: when ${shown}, ${subject} should be $${fmt(firstFail.want, 4)}$, but your expression gives ${gotTxt}.`,
  };
}
