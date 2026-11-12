import { frac, toFrac, fAdd, fSub, fMul, fDiv, fTex } from "./calc-utils";

// Order of operations (BODMAS) step-by-step evaluator. Pure functions, no
// React, so it can be tested on its own. Works with exact fractions, so
// 1 ÷ 3 × 3 is exactly 1. One operation per step, in the order taught in
// class: innermost brackets first; inside any group, powers (right to left),
// then × and ÷ from left to right, then + and − from left to right.
//
// Tokens: { t: "num", v: {n, d} } | { t: "op", v: "+-*/^" } | { t: "neg" }
//         | { t: "(" } | { t: ")" }

const MAX_STEPS = 60;
const BIG = 1e12;

const OP_TEX = { "+": "+", "-": "-", "*": "\\times", "/": "\\div", "^": "^" };

export function tokenize(raw) {
  const s = String(raw ?? "")
    .replace(/[×xX]/g, "*")
    .replace(/[÷:]/g, "/")
    .replace(/[−–—]/g, "-")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/[[{]/g, "(")
    .replace(/[\]}]/g, ")")
    .replace(/\s+/g, "");
  if (!s) return { error: "Type a calculation, like 3 + 4 × 2." };
  if (s.length > 120) return { error: "That calculation is too long for this checker. Try a shorter one." };
  const out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const lit = s.slice(i, j);
      if (!/^(\d+\.?\d*|\.\d+)$/.test(lit)) return { error: `“${lit}” isn’t a number I can read.` };
      const prev = out[out.length - 1];
      if (prev && (prev.t === "num" || prev.t === ")")) return { error: "Put an operation between those two numbers." };
      out.push({ t: "num", v: toFrac(Number(lit)) });
      i = j;
      continue;
    }
    if ("+-*/^".includes(c)) {
      const prev = out[out.length - 1];
      const unary = !prev || prev.t === "op" || prev.t === "(" || prev.t === "neg";
      if (unary) {
        if (c === "-") out.push({ t: "neg" });
        else if (c !== "+") return { error: `A “${c === "*" ? "×" : c === "/" ? "÷" : c}” needs a number before it.` };
      } else {
        if (c === "^" && out[out.length - 2]?.t === "op" && out[out.length - 2].v === "^") {
          return { error: "Two powers in a row are ambiguous. Use brackets to show which to do first, like 2^(3^2)." };
        }
        out.push({ t: "op", v: c });
      }
      i++;
      continue;
    }
    if (c === "(") {
      const prev = out[out.length - 1];
      // 2(3 + 4) and (1 + 2)(3 + 4) mean multiply: write the × in.
      if (prev && (prev.t === "num" || prev.t === ")")) out.push({ t: "op", v: "*", implied: true });
      out.push({ t: "(" });
      i++;
      continue;
    }
    if (c === ")") {
      const prev = out[out.length - 1];
      if (!prev || prev.t === "(") return { error: "There’s an empty pair of brackets." };
      if (prev.t === "op" || prev.t === "neg") return { error: "Something’s missing before a closing bracket." };
      out.push({ t: ")" });
      i++;
      continue;
    }
    return { error: `I can’t read “${c}”. Use numbers, + − × ÷, ^ for powers and brackets.` };
  }
  let depth = 0;
  for (const tk of out) {
    if (tk.t === "(") depth++;
    if (tk.t === ")") depth--;
    if (depth < 0) return { error: "There’s a closing bracket without an opening one." };
  }
  if (depth !== 0) return { error: "The brackets don’t match. Check every ( has a )." };
  const last = out[out.length - 1];
  if (last.t === "op" || last.t === "neg") return { error: "The calculation ends with an operation. Add the last number." };
  return { tokens: out };
}

// ── Display ───────────────────────────────────────────────────────────
const isDecimal = (f) => {
  let d = f.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1;
};
export function numTex(f) {
  if (f.d === 1) return String(f.n);
  if (isDecimal(f)) return String(Number((f.n / f.d).toFixed(10)));
  return fTex(f);
}
export function numPlain(f) {
  if (f.d === 1) return String(f.n);
  if (isDecimal(f)) return String(Number((f.n / f.d).toFixed(10)));
  return `${f.n}/${f.d}`;
}

export function toTex(tokens) {
  let s = "";
  for (let k = 0; k < tokens.length; k++) {
    const tk = tokens[k];
    const prev = tokens[k - 1];
    if (tk.t === "num") {
      // A negative number straight after an operation is written in brackets: 4 × (−3).
      const wrap = tk.v.n < 0 && prev && (prev.t === "op" || prev.t === "neg");
      s += wrap ? `(${numTex(tk.v)})` : numTex(tk.v);
    } else if (tk.t === "op" && tk.v === "^") {
      // The exponent goes in braces: a number, or a whole bracket group.
      const nx = tokens[k + 1];
      if (nx && nx.t === "num") {
        s += `^{${numTex(nx.v)}}`;
        k++;
      } else if (nx && nx.t === "(") {
        let depth = 0, j = k + 1;
        for (; j < tokens.length; j++) {
          if (tokens[j].t === "(") depth++;
          if (tokens[j].t === ")") depth--;
          if (depth === 0) break;
        }
        s += `^{${toTex(tokens.slice(k + 1, j + 1))}}`;
        k = j;
      } else if (nx && nx.t === "neg") {
        s += "^{-";
        let j = k + 2;
        if (tokens[j] && tokens[j].t === "num") { s += `${numTex(tokens[j].v)}}`; k = j; }
        else { s += "}"; k = k + 1; }
      } else s += "^";
    } else if (tk.t === "op") s += ` ${OP_TEX[tk.v]} `;
    else if (tk.t === "neg") s += "-";
    else if (tk.t === "(") s += "(";
    else s += ")";
  }
  return s;
}

// ── One step ──────────────────────────────────────────────────────────
function applyOp(a, op, b) {
  if (op === "+") return fAdd(a, b);
  if (op === "-") return fSub(a, b);
  if (op === "*") return fMul(a, b);
  if (op === "/") {
    if (b.n === 0) throw new Error("You can’t divide by 0, so this calculation has no answer.");
    return fDiv(a, b);
  }
  if (b.d !== 1) throw new Error("This checker only does whole-number powers, like 2^3.");
  if (Math.abs(b.n) > 30) throw new Error("That power is too big for this checker.");
  if (a.n === 0 && b.n < 0) throw new Error("0 to a negative power has no answer.");
  let r = frac(1, 1);
  for (let k = 0; k < Math.abs(b.n); k++) r = fMul(r, a);
  return b.n < 0 ? fDiv(frac(1, 1), r) : r;
}

// Fold a "neg" sign into the number after it (−3 → the number −3), except
// when that number is about to be raised to a power: −3² means −(3²) = −9.
function foldNegs(tokens) {
  const out = [];
  for (let k = 0; k < tokens.length; k++) {
    const tk = tokens[k];
    const nx = tokens[k + 1];
    const after = tokens[k + 2];
    if (tk.t === "neg" && nx && nx.t === "num" && !(after && after.t === "op" && after.v === "^")) {
      out.push({ t: "num", v: frac(-nx.v.n, nx.v.d) });
      k++;
    } else out.push(tk);
  }
  // −(−3) style double negatives fold too.
  return out.length !== tokens.length ? foldNegs(out) : out;
}

// Drop brackets round a single number, unless it's negative and raised to a
// power, where the brackets matter: (−3)² = 9.
function dropSingleBrackets(tokens) {
  for (let k = 0; k + 2 < tokens.length; k++) {
    if (tokens[k].t === "(" && tokens[k + 1].t === "num" && tokens[k + 2].t === ")") {
      const nx = tokens[k + 3];
      if (tokens[k + 1].v.n < 0 && nx && nx.t === "op" && nx.v === "^") continue;
      return dropSingleBrackets([...tokens.slice(0, k), tokens[k + 1], ...tokens.slice(k + 3)]);
    }
  }
  return tokens;
}

function tidy(tokens) {
  let cur = tokens;
  for (;;) {
    const next = foldNegs(dropSingleBrackets(foldNegs(cur)));
    if (next.length === cur.length) return next;
    cur = next;
  }
}

// The innermost bracket group that still has work to do, or the whole thing.
function findGroup(tokens) {
  let best = null;
  const stack = [];
  for (let k = 0; k < tokens.length; k++) {
    if (tokens[k].t === "(") stack.push(k);
    else if (tokens[k].t === ")") {
      const open = stack.pop();
      const inner = tokens.slice(open + 1, k);
      const hasWork = inner.some((t) => t.t === "op" || t.t === "neg");
      const hasInner = inner.some((t) => t.t === "(");
      if (hasWork && !hasInner && best === null) best = [open + 1, k];
    }
  }
  return best || [0, tokens.length];
}

function stepOnce(tokens) {
  const [lo, hi] = findGroup(tokens);
  const inBrackets = lo > 0 || hi < tokens.length;
  const seg = tokens.slice(lo, hi);
  let at = -1;
  let kind = "";
  // Powers, rightmost first (2^3^2 = 2^9).
  let baseLen = 1;
  for (let k = seg.length - 2; k > 0; k--) {
    if (!(seg[k].t === "op" && seg[k].v === "^" && seg[k + 1].t === "num")) continue;
    if (seg[k - 1].t === "num") { at = k; kind = "pow"; break; }
    // A bracketed negative base: (−3)^2.
    if (k >= 3 && seg[k - 1].t === ")" && seg[k - 2].t === "num" && seg[k - 3].t === "(") { at = k; kind = "pow"; baseLen = 3; break; }
  }
  // A minus sign in front of a power that's been worked out: −9.
  if (at < 0) {
    for (let k = 0; k < seg.length - 1; k++) {
      if (seg[k].t === "neg" && seg[k + 1].t === "num") { at = k; kind = "neg"; break; }
    }
  }
  if (at < 0) {
    for (let k = 1; k < seg.length - 1; k++) {
      if (seg[k].t === "op" && (seg[k].v === "*" || seg[k].v === "/") && seg[k - 1].t === "num" && seg[k + 1].t === "num") { at = k; kind = "md"; break; }
    }
  }
  if (at < 0) {
    for (let k = 1; k < seg.length - 1; k++) {
      if (seg[k].t === "op" && (seg[k].v === "+" || seg[k].v === "-") && seg[k - 1].t === "num" && seg[k + 1].t === "num") { at = k; kind = "as"; break; }
    }
  }
  if (at < 0) throw new Error("I couldn’t work out the next step. Check the calculation is written correctly.");

  let a, op, b, result, calcTex, newSeg;
  if (kind === "neg") {
    b = seg[at + 1].v;
    result = frac(-b.n, b.d);
    calcTex = `-${numTex(b)} = ${numTex(result)}`;
    newSeg = [...seg.slice(0, at), { t: "num", v: result }, ...seg.slice(at + 2)];
  } else {
    a = baseLen === 3 ? seg[at - 2].v : seg[at - 1].v;
    op = seg[at].v;
    b = seg[at + 1].v;
    result = applyOp(a, op, b);
    const aTex = a.n < 0 ? `(${numTex(a)})` : numTex(a);
    const bTex = b.n < 0 ? `(${numTex(b)})` : numTex(b);
    calcTex = op === "^" ? `${aTex}^{${numTex(b)}} = ${numTex(result)}` : `${aTex} ${OP_TEX[op]} ${bTex} = ${numTex(result)}`;
    newSeg = [...seg.slice(0, at - baseLen), { t: "num", v: result }, ...seg.slice(at + 2)];
  }
  if (Math.abs(result.n) > BIG || result.d > BIG) throw new Error("The numbers got too big for this checker.");

  const name = {
    pow: "Powers (indices)",
    neg: "Apply the minus sign (after the power)",
    md: op === "/" ? "Division (× and ÷ from left to right)" : "Multiplication (× and ÷ from left to right)",
    as: op === "-" ? "Subtraction (+ and − from left to right)" : "Addition (+ and − from left to right)",
  }[kind];
  const why = inBrackets ? `Brackets first. Inside them: ${name.charAt(0).toLowerCase()}${name.slice(1)}` : name;
  const next = tidy([...tokens.slice(0, lo), ...newSeg, ...tokens.slice(hi)]);
  return { why, calcTex, next };
}

/** Work out a calculation one step at a time. */
export function solveSteps(raw) {
  const t = tokenize(raw);
  if (t.error) return { error: t.error };
  let tokens = tidy(t.tokens);
  const start = toTex(t.tokens);
  const implied = t.tokens.some((tk) => tk.implied);
  const steps = [];
  try {
    while (!(tokens.length === 1 && tokens[0].t === "num")) {
      if (steps.length >= MAX_STEPS) return { error: "That takes too many steps for this checker. Try a shorter calculation." };
      const s = stepOnce(tokens);
      steps.push({ why: s.why, calc: s.calcTex, expr: toTex(s.next) });
      tokens = s.next;
    }
  } catch (e) {
    return { error: e.message };
  }
  const value = tokens[0].v;
  return { start, implied, steps, value, answerTex: numTex(value), answerPlain: numPlain(value) };
}

/** Is a typed answer equal to the value? Accepts 7, -2.5, 3/4. */
export function sameAnswer(typed, value) {
  const s = String(typed ?? "").trim().replace(/[−–]/g, "-").replace(/\s+/g, "");
  if (!s) return null;
  const m = s.match(/^(-?\d+(?:\.\d+)?)(?:\/(-?\d+(?:\.\d+)?))?$/);
  if (!m) return null;
  let f = toFrac(Number(m[1]));
  if (m[2] !== undefined) {
    const d = toFrac(Number(m[2]));
    if (d.n === 0) return null;
    f = fDiv(f, d);
  }
  return f.n === value.n && f.d === value.d;
}
