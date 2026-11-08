import { parse as mathParse } from "mathjs";

// Auto-marking for the Teacher Zone online papers (Ryan, 8 Nov 2026:
// "auto-mark only"). Each bank answer is turned into a marking key at build
// time; a question goes on an online paper only when every part of its
// answer has a key a computer can check:
//   num:  a number (integer, decimal, fraction, percent, money, a value
//         with a unit). Decimals given to n places accept the student's
//         answer rounded to the same places.
//   set:  several numbers in any order (x = 5 or x = -3).
//   list: several numbers in order (a sequence, a coordinate pair).
//   expr: an algebraic expression, checked by evaluating both at random
//         values, with the form checked when the question asks for one
//         (factorise, expand, simplify).
// Anything else (explanations, tables, diagrams, inequalities, surds left
// in exact form) makes the question paper-only.

const UNITS = [
  "mm²", "cm²", "m²", "km²", "mm³", "cm³", "m³", "mm", "cm", "km", "m", "kg", "mg", "g", "mL", "ml", "kL", "L",
  "seconds", "second", "s", "minutes", "minute", "min", "hours", "hour", "h", "hrs", "days", "day", "weeks", "week",
  "years", "year", "months", "month", "km/h", "m/s", "degrees", "units", "square units", "cubic units",
  "people", "students", "cents", "c", "dollars",
];
const UNIT_RE = new RegExp(`^(?:${UNITS.sort((a, b) => b.length - a.length).map((u) => u.replace(/[/^]/g, "\\$&")).join("|")})$`, "i");

// ---------- LaTeX answer text -> plain maths ----------

function stripParentheticals(s) {
  // Remove "(...)" groups at the top level that hold working or notes,
  // e.g. "$52$ cm ($\sqrt{2704}$)" or "(accept 63.63)". Keeps groups that
  // are part of the maths (inside $...$).
  let out = "", depth = 0, inMath = false, buf = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "$" && s[i - 1] !== "\\") inMath = !inMath;
    if (!inMath && depth === 0 && ch === "(") { depth = 1; buf = ""; continue; }
    if (depth > 0) {
      if (ch === "(") depth++;
      else if (ch === ")") { depth--; if (depth === 0) continue; }
      buf += ch;
      continue;
    }
    out += ch;
  }
  return depth > 0 ? s : out;
}

function texToPlain(t) {
  let s = t.replace(/(\d)\s*\\d?frac\{(\d+)\}\{(\d+)\}/g, "($1+$2/$3)");
  for (let k = 0; k < 4; k++) s = s.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, "(($1)/($2))");
  s = s
    .replace(/\\left|\\right/g, "")
    .replace(/\\text\{\s*([^{}]*)\}/g, " $1 ")
    .replace(/\\mathrm\{([^{}]*)\}/g, " $1 ")
    .replace(/\^\{?\\circ\}?|°/g, " ° ")
    .replace(/\\%/g, " % ")
    .replace(/\\\$/g, " $$ ")
    .replace(/\\times|×/g, "*")
    .replace(/\\cdot|·/g, "*")
    .replace(/\\div|÷/g, "/")
    .replace(/(\d)\\,(\d{3})/g, "$1$2")
    .replace(/(\d),(\d{3})(?!\d)/g, "$1$2")
    .replace(/\\[,;:! ]|\\quad|~/g, " ")
    .replace(/\\approx|≈/g, " ≈ ")
    .replace(/−/g, "-")
    .replace(/\\pi/g, "pi")
    .replace(/\\sqrt\{([^{}]*)\}/g, "sqrt($1)")
    .replace(/\^\{([^{}]*)\}/g, "^($1)")
    .replace(/[{}]/g, "")
    .replace(/\$/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // "$ $" used for money became "$$" above; restore a single marker.
  return s.replace(/\$\$/g, "$");
}

// The value of a plain number string like "12", "-3.5", "((3)/(4))", "5*10^(-4)".
const NUM_ONLY = /^[-+]?[\d.\s()*/^+-]+$/;
function evalNumber(s) {
  const t = s.replace(/\s+/g, "");
  if (!t || !NUM_ONLY.test(t) || !/\d/.test(t)) return null;
  try {
    const v = mathParse(t).evaluate();
    return typeof v === "number" && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

function decimalsOf(s) {
  const m = s.match(/\d\.(\d+)(?!.*\d\.\d)/);
  return m ? m[1].length : 0;
}

// One value: number (with unit/percent/money) -> { v, dp, unit } or null.
function parseNumberValue(plain) {
  let s = plain.trim();
  let unit = null, money = false, pct = false;
  if (s.startsWith("$")) { money = true; s = s.slice(1).trim(); }
  if (/^-\s*\$/.test(s)) { money = true; s = "-" + s.replace(/^-\s*\$/, ""); }
  if (/%$/.test(s)) { pct = true; s = s.replace(/%$/, "").trim(); }
  if (/°$/.test(s)) { unit = "°"; s = s.replace(/°$/, "").trim(); }
  const um = s.match(/^(.*?\d[)\s]*)\s*([A-Za-z²³/^()\d ]+)$/);
  if (um && /^[A-Za-z]/.test(um[2].trim())) {
    const u = um[2].trim().replace(/\^\(?([23])\)?/, (m, d) => (d === "2" ? "²" : "³"));
    // A unit, or one or two plain words naming what is counted ("29 tables").
    if (UNIT_RE.test(u) || /^[A-Za-z]{2,12}( [A-Za-z]{2,12})?$/.test(u)) { unit = u; s = um[1].trim(); }
  }
  if (/^[$]/.test(s)) { money = true; s = s.slice(1); }
  const v = evalNumber(s);
  if (v === null) return null;
  const simpleDecimal = /^[-+]?\d+\.\d+$/.test(s.replace(/\s/g, ""));
  return { v, dp: simpleDecimal ? decimalsOf(s) : null, unit, money, pct };
}

// Letters that can be variables in an answer expression.
const VAR_RE = /[a-zA-Z]/g;

function parseExpr(plain) {
  const s = plain.replace(/\s+/g, " ").trim();
  if (!s || /[=<>≤≥≈:]/.test(s) || /[A-Za-z]{2,}/.test(s.replace(/sqrt|pi/g, ""))) return null;
  try {
    const node = mathParse(prepExpr(s));
    const vars = [...new Set((prepExpr(s).replace(/sqrt|pi/g, "").match(VAR_RE) || []))];
    if (!vars.length) return null;
    return { expr: node.toString(), vars };
  } catch {
    return null;
  }
}

const rhs0 = (p) => p.replace(/^[A-Za-z]\s*=\s*/, "");

// ---------- answer -> key ----------

function splitParts(answer) {
  const s = answer.trim();
  const re = /(^|\s)\(([a-h])\)\s/g;
  const marks = [];
  let m;
  while ((m = re.exec(s))) marks.push({ i: m.index + m[1].length, label: m[2], end: re.lastIndex });
  if (!marks.length || marks[0].i !== 0) return [{ label: null, text: s }];
  return marks.map((mk, k) => ({ label: mk.label, text: s.slice(mk.end, k + 1 < marks.length ? marks[k + 1].i : s.length).trim().replace(/[;,.]\s*$/, "") }));
}

const FORM = (q) => {
  const t = q.toLowerCase();
  if (/factori[sz]e/.test(t)) return "factorised";
  if (/\bexpand\b/.test(t)) return "expanded";
  if (/simplif/.test(t)) return "simplified";
  return null;
};

function keyForPart(text, question) {
  let s = stripParentheticals(text).replace(/\s+/g, " ").trim().replace(/[.;,]$/, "");
  if (!s) return null;
  // Answers that are words or sentences can't be auto-marked.
  const outsideMath = s.replace(/\$[^$]*\$/g, " ").replace(/\\\$/g, "").trim();
  const words = outsideMath.replace(/[()\d.,;:=\-+%°/]/g, " ").trim().split(/\s+/).filter(Boolean);
  const unitWords = words.filter((w) => !UNIT_RE.test(w) && !/^(or|and)$/i.test(w));
  if (unitWords.length > 2) return null;

  let plain = texToPlain(s);
  if (/≈/.test(plain)) plain = plain.split("≈").pop().trim();

  // "x = 5 or x = -3" / "x = -1/2 or x = -3"
  if (/\bor\b/.test(plain)) {
    const vals = plain.split(/\bor\b/).map((p) => parseNumberValue(p.replace(/^[a-z]\s*=\s*/, "")));
    if (vals.length >= 2 && vals.every(Boolean)) return { type: "set", values: vals.map((x) => x.v), dps: vals.map((x) => x.dp) };
    return null;
  }
  // "x = 5", "y = 12"
  const eq = plain.match(/^([A-Za-z])\s*=\s*(.+)$/);

  // A ratio "1 : 200", marked as numbers in order.
  if (/^[\d.\s]+(:[\d.\s]+)+$/.test(rhs0(plain))) {
    const vals = plain.split(":").map((p) => evalNumber(p));
    if (vals.every((v) => v !== null)) return { type: "ratio", values: vals };
    return null;
  }
  const rhs = eq ? eq[2] : plain;

  // An ordered list or coordinate pair: "(0, 5), (1, 8)" or "3, 6, 9".
  if (/,/.test(rhs)) {
    const items = rhs.replace(/[()]/g, " ").split(",").map((p) => parseNumberValue(p));
    if (items.length >= 2 && items.length <= 8 && items.every(Boolean)) return { type: "list", values: items.map((x) => x.v), dps: items.map((x) => x.dp) };
    return null;
  }

  const n = parseNumberValue(rhs);
  if (n) {
    if (/sqrt|pi/.test(rhs)) return null; // exact surd or pi form: paper only
    return { type: "num", value: n.v, dp: n.dp, unit: n.unit, money: n.money, pct: n.pct, ...(eq ? { var: eq[1] } : {}) };
  }
  if (eq && /[A-Za-z]/.test(eq[2])) {
    const e = parseExpr(eq[2]);
    return e ? { type: "expr", ...e, lhs: eq[1], form: FORM(question) } : null;
  }
  const e = parseExpr(rhs);
  return e ? { type: "expr", ...e, form: FORM(question) } : null;
}

// A suggested marking key for one question, or null. Used offline only, as
// a starting point for the reviewed keys in content/automark (the site never
// marks with an unreviewed key).
export function suggestKey(question, answer) {
  if (!answer || /\\begin|\|/.test(answer)) return null;
  const parts = splitParts(answer);
  // The question must have the same parts, (a), (b), ...
  const qParts = new Set((question.match(/(^|\s)\(([a-h])\)\s/g) || []).map((x) => x.trim()));
  if (parts[0].label && qParts.size && qParts.size !== parts.length) return null;
  const keys = [];
  for (const p of parts) {
    const k = keyForPart(p.text, question);
    if (!k) return null;
    keys.push({ label: p.label, ...k });
  }
  return keys.length ? keys : null;
}

// ---------- marking a student's answer ----------

function studentNumber(raw) {
  if (raw == null) return null;
  let s = String(raw).trim().toLowerCase()
    .replace(/[−–]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/^[a-z]\s*=\s*/, "")
    .replace(/^\$\s*/, "").replace(/^-\s*\$/, "-")
    .replace(/(\d),(\d{3})(?!\d)/g, "$1$2")
    .replace(/[%]/g, "").replace(/°\s*[cf]?(?![a-z])/gi, "")
    .replace(/×|x(?=\s*10)/g, "*")
    .replace(/(\d)e([-+]?\d+)$/, "$1*10^($2)")
    .trim()
    // A unit or a word after the number ("12 cm", "5 bags", "-4 C", "1.5 L").
    .replace(/^(.*?[\d)])\s*[a-z][a-z²³/ ]*\.?$/i, "$1")
    .trim();
  // Mixed number "1 1/2"
  const mixed = s.match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return (mixed[1] ? -1 : 1) * (Number(mixed[2]) + Number(mixed[3]) / Number(mixed[4]));
  s = s.replace(/\s+/g, "");
  if (!/^[-+]?[\d.()*/^+-]+$/.test(s)) return null;
  try {
    const v = mathParse(s).evaluate();
    return typeof v === "number" && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

// a × 10^n with 1 <= a < 10, typed as 4.5x10^4, 4.5 × 10^(-3), 4.5*10^4 or 4.5e4.
const SCI_RE = /^-?[1-9](\.\d+)?((×|x|\*)10\^\(?[-+]?\d+\)?|e[-+]?\d+)([a-zA-Z°]*)$/i;

function sameNumber(got, want, dp) {
  if (got === null || got === undefined) return false;
  if (dp != null && dp > 0) return Math.abs(got - want) <= 0.5 * 10 ** -dp + 1e-9;
  return Math.abs(got - want) <= Math.max(1e-12, Math.abs(want) * 1e-6);
}

function prepExpr(raw) {
  return String(raw).toLowerCase()
    .replace(/[−–]/g, "-").replace(/×/g, "*").replace(/÷/g, "/").replace(/²/g, "^2").replace(/³/g, "^3")
    .replace(/√\s*\(?([a-z0-9]+)\)?/g, "sqrt($1)")
    .replace(/^[a-z]\s*=\s*/, "")
    // Letters written together are one product, so "v/lw" is v/(l*w) and
    // "ab^2" is a*b^2.
    .replace(/([a-z]{2,})(\^(?:\([^()]*\)|[\d.]+))?/g, (m, run, exp = "") => (/sqrt|pi/.test(run) ? m : `(${run.split("").join("*")}${exp})`))
    .replace(/(\d)\s*([a-z(])/g, "$1*$2")
    .replace(/\)\s*\(/g, ")*(")
    .replace(/([a-z])\s*\(/g, (m, v, off, str) => (str.slice(Math.max(0, off - 3), off + 1) === "sqrt" ? m : `${v}*(`))
    .replace(/([a-z])\s+([a-z])/g, "$1*$2")
    .replace(/([a-z])\s+([a-z])/g, "$1*$2")
    .replace(/\)\s*([a-z0-9])/g, ")*$1")
    .trim();
}

function equivalent(aStr, bStr, vars) {
  let a, b;
  try { a = mathParse(aStr).compile(); b = mathParse(bStr).compile(); } catch { return false; }
  const real = (v) => typeof v === "number" && Number.isFinite(v);
  let checked = 0;
  for (let t = 0; t < 16 && checked < 8; t++) {
    const scope = Object.fromEntries(vars.map((v, i) => [v, 1.3 + ((t * 7 + i * 3) % 11) * 0.37 - (t % 2) * 2.1]));
    let x, y;
    try { x = a.evaluate(scope); } catch { x = NaN; }
    try { y = b.evaluate(scope); } catch { y = NaN; }
    // Points where neither is a real number (a square root of a negative)
    // are skipped; if only one is real, they are different.
    if (!real(x) && !real(y)) continue;
    if (!real(x) || !real(y)) return false;
    if (Math.abs(x - y) > 1e-6 * Math.max(1, Math.abs(y))) return false;
    checked++;
  }
  return checked >= 4;
}

// Additive terms at the top level ("3a + 5a - 2" has 3).
function termCount(node) {
  const n = node.type === "ParenthesisNode" ? node.content : node;
  if (n.type === "OperatorNode" && (n.op === "+" || n.op === "-") && n.args.length === 2) return termCount(n.args[0]) + termCount(n.args[1]);
  return 1;
}

// Integer coefficient of one term, or null.
function coeff(n) {
  if (n.type === "ConstantNode") return Number.isInteger(n.value) ? Math.abs(n.value) : null;
  if (n.type === "OperatorNode" && n.fn === "unaryMinus") return coeff(n.args[0]);
  if (n.type === "OperatorNode" && n.op === "*" && n.args[0].type === "ConstantNode") return coeff(n.args[0]);
  if (n.type === "SymbolNode" || (n.type === "OperatorNode" && (n.op === "^" || n.op === "*"))) return 1;
  return null;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
function terms(node, out = []) {
  const n = node.type === "ParenthesisNode" ? node.content : node;
  if (n.type === "OperatorNode" && (n.op === "+" || n.op === "-") && n.args.length === 2) { terms(n.args[0], out); terms(n.args[1], out); }
  else out.push(n);
  return out;
}

function formOk(input, form, keyExpr, raw = input) {
  const s = input.replace(/\s+/g, "");
  let n;
  try { n = mathParse(s); } catch { return false; }
  if (form === "factorised") {
    const top = n.type === "ParenthesisNode" ? n.content : n;
    const product = top.type === "OperatorNode" && (top.op === "*" || top.op === "^" || top.fn === "unaryMinus");
    if (!product) return false;
    // Fully factorised: no bracket still has a common factor, as in 2(6x + 9).
    let full = true;
    top.traverse((x) => {
      if (x.type !== "ParenthesisNode") return;
      const ts = terms(x.content);
      if (ts.length < 2) return;
      const cs = ts.map(coeff);
      if (cs.every((c) => c !== null && c > 0) && cs.reduce(gcd) > 1) full = false;
    });
    return full;
  }
  if (form === "expanded" || form === "simplified") {
    // Brackets the student typed (not the ones added for "ab" style products).
    // A bracket around a single term, as in (7x)/12, is fine; one holding a
    // sum or difference, as in 3(x + 2), is not expanded or simplified.
    if (/\([^()]*[\w)\]]\s*[+-][^()]*\)/.test(String(raw).replace(/sqrt\s*\(([^()]*)\)/gi, "s"))) return false;
    // No more terms than the answer, so like terms are collected.
    try { return termCount(n) <= termCount(mathParse(prepExpr(keyExpr))); } catch { return true; }
  }
  return true;
}

function markPart(key, raw) {
  const input = String(raw ?? "").trim();
  if (!input) return false;
  if (key.type === "num") {
    // form "sci": the answer must be written in scientific notation.
    if (key.form === "sci" && !SCI_RE.test(input.replace(/\s+/g, "").replace(/[−–]/g, "-"))) return false;
    const got = studentNumber(input);
    return sameNumber(got, key.value, key.dp) || (key.accept || []).some((a) => sameNumber(got, a, key.dp));
  }
  if (key.type === "ratio") {
    const got = input.split(":").map(studentNumber);
    return got.length === key.values.length && key.values.every((v, i) => sameNumber(got[i], v));
  }
  if (key.type === "set" || key.type === "list") {
    const got = input.replace(/\bor\b|\band\b|;/gi, ",").replace(/[()]/g, " ").split(",").map((x) => x.trim()).filter(Boolean).map(studentNumber);
    if (got.length !== key.values.length || got.some((g) => g === null)) return false;
    if (key.type === "list") return key.values.every((v, i) => sameNumber(got[i], v, key.dps?.[i]));
    const left = [...got];
    return key.values.every((v, i) => {
      const j = left.findIndex((g) => sameNumber(g, v, key.dps?.[i]));
      if (j < 0) return false;
      left.splice(j, 1);
      return true;
    });
  }
  if (key.type === "expr") {
    const s = prepExpr(input);
    return equivalent(s, prepExpr(key.expr), key.vars.map((v) => v.toLowerCase())) && formOk(s, key.form, key.expr, input);
  }
  return false;
}

const TYPES = new Set(["num", "set", "list", "ratio", "expr"]);
// Problems with a key, as strings (empty when the key is sound): the shape,
// then a self-check that the key's own answer is marked right and a nearby
// wrong answer is marked wrong.
export function keyProblems(keys) {
  const out = [];
  if (!Array.isArray(keys) || !keys.length) return ["key must be a non-empty array of parts"];
  keys.forEach((k, i) => {
    const at = `part ${k?.label || i + 1}`;
    if (!k || !TYPES.has(k.type)) return out.push(`${at}: unknown type ${k?.type}`);
    const fmt = (v, dp) => (dp ? Number(v).toFixed(dp) : String(+Number(v).toPrecision(12)));
    let right, wrong;
    if (k.type === "num") {
      if (typeof k.value !== "number" || !Number.isFinite(k.value)) return out.push(`${at}: value must be a number`);
      right = k.form === "sci" ? Number(k.value).toExponential().replace(/e\+?/, "x10^") : fmt(k.value, k.dp);
      wrong = k.form === "sci" ? fmt(k.value, k.dp) : fmt(k.value + (k.dp ? 3 * 10 ** -k.dp : Math.max(1, Math.abs(k.value) * 0.1)), k.dp);
    } else if (k.type === "expr") {
      if (typeof k.expr !== "string" || !Array.isArray(k.vars) || !k.vars.length) return out.push(`${at}: expr needs expr and vars`);
      try { mathParse(prepExpr(k.expr)); } catch { return out.push(`${at}: expr does not parse: ${k.expr}`); }
      if (k.form && !["factorised", "expanded", "simplified"].includes(k.form)) out.push(`${at}: unknown form ${k.form}`);
      right = k.expr;
      wrong = `${k.expr} + 1`;
    } else {
      if (!Array.isArray(k.values) || k.values.length < 2 || !k.values.every((v) => typeof v === "number" && Number.isFinite(v))) return out.push(`${at}: values must be 2+ numbers`);
      const sep = k.type === "ratio" ? " : " : ", ";
      right = k.values.map((v, j) => fmt(v, k.dps?.[j])).join(sep);
      wrong = k.values.map((v, j) => fmt(j === 0 ? v + 1 : v, k.dps?.[j])).join(sep);
    }
    if (!markPart(k, right)) out.push(`${at}: its own answer "${right}" is marked wrong`);
    if (markPart(k, wrong)) out.push(`${at}: a wrong answer "${wrong}" is marked right`);
  });
  return out;
}

// answers: array of strings, one per key part. Returns { parts: [bool], correct }.
export function markQuestion(keys, answers) {
  const parts = keys.map((k, i) => markPart(k, answers?.[i]));
  return { parts, correct: parts.every(Boolean) };
}

// What the answer box should hint, per key type.
export function inputHint(key) {
  if (key.type === "ratio") return "Ratio, e.g. 2 : 3";
  if (key.type === "set") return "All values, separated by commas";
  if (key.type === "list") return "Values in order, separated by commas";
  if (key.type === "expr") return key.form === "factorised" ? "Factorised form, e.g. (x+2)(x+3)" : "Expression, e.g. 3x^2 + 2y";
  if (key.form === "sci") return "Scientific notation, e.g. 4.5 x 10^3";
  if (key.dp) return `Number, to ${key.dp} decimal place${key.dp === 1 ? "" : "s"}`;
  if (key.money) return "Amount in dollars";
  return key.unit && key.unit !== "°" ? `Number (${key.unit})` : "Number or fraction";
}
