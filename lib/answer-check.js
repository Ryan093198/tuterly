// Marks a typed maths answer against an `accept` spec (from the topic
// pages' "Your turn" questions and the NAPLAN sample tests).
//   kind "number":     accept.value, accept.tol (0 = exact), accept.unit
//   kind "values":     accept.values (any order), accept.tol
//   kind "expression": accept.expr (calculator syntax), accept.vars
//   kind "choice":     accept.value is the index of the right option
// mathjs is passed in by the caller (loaded with a dynamic import, so it
// only downloads when someone checks an answer).

// Turn what a student types into something mathjs can read.
export function tidy(input, { units = true } = {}) {
  let s = String(input || "").trim();
  s = s.replace(/^[a-zA-Z]\s*=\s*/, ""); // "x = 4" -> "4"
  s = s.replace(/\$|aud|dollars?/gi, "");
  s = s.replace(/[×✕✖·]/g, "*").replace(/÷/g, "/").replace(/[−–—]/g, "-");
  s = s.replace(/π/g, "pi").replace(/√\s*\(/g, "sqrt(").replace(/√\s*([0-9.]+)/g, "sqrt($1)");
  s = s.replace(/°|degrees?/gi, "");
  // 3.2 x 10^5, 3.2x10^5 -> 3.2*10^5
  s = s.replace(/(\d)\s*[xX]\s*10\s*\^/g, "$1*10^");
  // thousands separators: 12,500 -> 12500 (only digit,3 digits)
  s = s.replace(/(\d),(?=\d{3}(\D|$))/g, "$1");
  // trailing units like "m", "cm2", "km/h", "kg", "%", "mL"
  if (units) s = s.replace(/\s*(km\/h|m\/s|cm\^?[23]?|mm\^?[23]?|km\^?2?|m\^?[23]?|ml|l|kg|g|mg|s|min|h|hours?|minutes?|seconds?|metres?|meters?|units?|%)\s*$/i, "");
  return s.trim();
}

const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function evalNumber(math, s, unit) {
  let t = String(s).trim();
  if (unit) t = t.replace(new RegExp("\\s*" + escapeRe(unit) + "\\s*$", "i"), "");
  let v;
  try {
    v = math.evaluate(tidy(t));
  } catch {
    // "28 m²", "14.5 years": drop trailing words and symbols, then retry.
    v = math.evaluate(tidy(t.replace(/[\sa-zA-Z²³°%/]+$/u, "")));
  }
  const n = typeof v === "number" ? v : Number(v?.valueOf?.() ?? v);
  if (!Number.isFinite(n)) throw new Error("not a number");
  return n;
}

const close = (a, b, tol) => Math.abs(a - b) <= Math.max(tol || 0, 1e-9 * Math.max(1, Math.abs(b))) + 1e-12;

// Returns { ok: true|false } or { ok: null, reason } when the input can't be read.
export function checkAnswer(math, kind, accept, input) {
  const raw = String(input || "").trim();
  if (!raw) return { ok: null, reason: "empty" };
  try {
    if (kind === "choice") return { ok: Number(raw) === Number(accept.value) };
    if (kind === "number") {
      return { ok: close(evalNumber(math, raw, accept.unit), Number(accept.value), Number(accept.tol) || 0) };
    }
    if (kind === "values") {
      const parts = raw.split(/,|;|\bor\b|\band\b/i).map((p) => p.trim()).filter(Boolean);
      const mine = parts.map((p) => evalNumber(math, p, accept.unit)).sort((a, b) => a - b);
      const want = [...(accept.values || [])].map(Number).sort((a, b) => a - b);
      if (mine.length !== want.length) return { ok: false, reason: mine.length < want.length ? "fewer" : "more" };
      return { ok: want.every((w, i) => close(mine[i], w, Number(accept.tol) || 0)) };
    }
    if (kind === "expression") {
      const vars = accept.vars?.length ? accept.vars : ["x"];
      const f = math.compile(String(accept.expr));
      const g = math.compile(tidy(raw, { units: false }).replace(/^[a-zA-Z]+\s*=\s*/, ""));
      for (let i = 0; i < 6; i++) {
        const scope = Object.fromEntries(vars.map((v, j) => [v, 0.41 + i * 1.07 + j * 0.53]));
        const a = f.evaluate(scope);
        const b = g.evaluate(scope);
        if (!(typeof b === "number" && close(b, a, 1e-6 * Math.max(1, Math.abs(a))))) return { ok: false };
      }
      return { ok: true };
    }
  } catch {
    return { ok: null, reason: "unreadable" };
  }
  return { ok: null, reason: "unknown" };
}
