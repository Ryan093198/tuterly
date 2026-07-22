// Best-effort downgrade of LaTeX math (as produced by the report prompt) to
// plain Unicode for the PDF, where we can't render real LaTeX. Handles the
// patterns the model is told to use: \frac, \sqrt, ^, _, common operators,
// Greek letters, and the trig/log functions.
//
// This is *not* a full LaTeX parser. Nested \frac{\frac{...}{...}}{...} or
// arbitrary macros may pass through with stray braces. The rule is: produce
// something readable, never silently lose content.

const COMMON_FRACTIONS = {
  "1/2": "½", "1/3": "⅓", "2/3": "⅔",
  "1/4": "¼", "3/4": "¾",
  "1/5": "⅕", "2/5": "⅖", "3/5": "⅗", "4/5": "⅘",
  "1/6": "⅙", "5/6": "⅚",
  "1/8": "⅛", "3/8": "⅜", "5/8": "⅝", "7/8": "⅞",
};

const SUPERSCRIPT = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ",
  h: "ʰ", i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ",
  o: "ᵒ", p: "ᵖ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ",
  w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
};

const SUBSCRIPT = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
  "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
  a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ",
  l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ",
  s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ",
};

const GREEK = {
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε",
  zeta: "ζ", eta: "η", theta: "θ", iota: "ι", kappa: "κ",
  lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", pi: "π",
  rho: "ρ", sigma: "σ", tau: "τ", upsilon: "υ", phi: "φ",
  chi: "χ", psi: "ψ", omega: "ω",
  Alpha: "Α", Beta: "Β", Gamma: "Γ", Delta: "Δ", Epsilon: "Ε",
  Zeta: "Ζ", Eta: "Η", Theta: "Θ", Iota: "Ι", Kappa: "Κ",
  Lambda: "Λ", Mu: "Μ", Nu: "Ν", Xi: "Ξ", Pi: "Π",
  Rho: "Ρ", Sigma: "Σ", Tau: "Τ", Upsilon: "Υ", Phi: "Φ",
  Chi: "Χ", Psi: "Ψ", Omega: "Ω",
  infty: "∞",
};

const OPERATORS = {
  times: "×", div: "÷", cdot: "·",
  pm: "±", mp: "∓",
  le: "≤", leq: "≤", ge: "≥", geq: "≥",
  ne: "≠", neq: "≠", approx: "≈", equiv: "≡", sim: "∼",
  to: "→", rightarrow: "→", leftarrow: "←", Rightarrow: "⇒", Leftarrow: "⇐",
  sum: "Σ", prod: "∏", int: "∫",
  cup: "∪", cap: "∩", subset: "⊂", supset: "⊃", in: "∈", notin: "∉",
  sqrt: "√", // bare \sqrt without arg, rare
  degree: "°", deg: "°",
  ldots: "…", dots: "…", cdots: "⋯",
  partial: "∂", nabla: "∇",
  forall: "∀", exists: "∃",
};

// Functions that should keep their name but lose the backslash.
const FUNCTIONS = new Set([
  "sin", "cos", "tan", "csc", "sec", "cot",
  "arcsin", "arccos", "arctan",
  "sinh", "cosh", "tanh",
  "log", "ln", "exp", "lg",
  "min", "max", "lim", "det", "gcd", "lcm",
  "mod",
]);

function strBraced(input, pos) {
  // Returns [content, endIndex] for `{...}` starting at pos. Handles nested braces.
  if (input[pos] !== "{") return [null, pos];
  let depth = 1;
  let i = pos + 1;
  while (i < input.length && depth > 0) {
    if (input[i] === "{") depth++;
    else if (input[i] === "}") depth--;
    if (depth === 0) break;
    i++;
  }
  return [input.slice(pos + 1, i), i + 1];
}

function applySuperscript(s) {
  let out = "";
  for (const ch of s) {
    if (ch in SUPERSCRIPT) out += SUPERSCRIPT[ch];
    else return null; // not all chars supported - caller falls back
  }
  return out;
}

function applySubscript(s) {
  let out = "";
  for (const ch of s) {
    if (ch in SUBSCRIPT) out += SUBSCRIPT[ch];
    else return null;
  }
  return out;
}

// Convert one math expression (without surrounding $...$) to plain Unicode.
function convertMathInner(expr) {
  let out = "";
  let i = 0;

  while (i < expr.length) {
    const ch = expr[i];

    // \frac{a}{b}
    if (expr.startsWith("\\frac", i) || expr.startsWith("\\dfrac", i) || expr.startsWith("\\tfrac", i)) {
      const cmdLen = expr.startsWith("\\dfrac", i) || expr.startsWith("\\tfrac", i) ? 6 : 5;
      let j = i + cmdLen;
      // Skip whitespace
      while (j < expr.length && /\s/.test(expr[j])) j++;
      const [num, after1] = strBraced(expr, j);
      let k = after1;
      while (k < expr.length && /\s/.test(expr[k])) k++;
      const [den, after2] = strBraced(expr, k);
      if (num !== null && den !== null) {
        const n = convertMathInner(num).trim();
        const d = convertMathInner(den).trim();
        const key = `${n}/${d}`;
        if (COMMON_FRACTIONS[key]) {
          out += COMMON_FRACTIONS[key];
        } else if (/^-?\w+$/.test(n) && /^-?\w+$/.test(d)) {
          out += `${n}/${d}`;
        } else {
          out += `(${n})/(${d})`;
        }
        i = after2;
        continue;
      }
    }

    // \sqrt[n]{x} or \sqrt{x}
    if (expr.startsWith("\\sqrt", i)) {
      let j = i + 5;
      // Optional [...]
      let rootIndex = "";
      if (expr[j] === "[") {
        const close = expr.indexOf("]", j);
        if (close > -1) {
          rootIndex = convertMathInner(expr.slice(j + 1, close).trim());
          j = close + 1;
        }
      }
      while (j < expr.length && /\s/.test(expr[j])) j++;
      const [arg, after] = strBraced(expr, j);
      if (arg !== null) {
        const inner = convertMathInner(arg).trim();
        const wrapped = inner.length === 1 ? inner : `(${inner})`;
        if (rootIndex === "" || rootIndex === "2") {
          out += `√${wrapped}`;
        } else if (rootIndex === "3") {
          out += `∛${wrapped}`;
        } else if (rootIndex === "4") {
          out += `∜${wrapped}`;
        } else {
          // Generic: prefix as superscript if possible
          const sup = applySuperscript(rootIndex);
          out += `${sup ?? `^(${rootIndex})`}√${wrapped}`;
        }
        i = after;
        continue;
      }
    }

    // \text{...}
    if (expr.startsWith("\\text", i) || expr.startsWith("\\mathrm", i)) {
      const cmdLen = expr.startsWith("\\mathrm", i) ? 7 : 5;
      let j = i + cmdLen;
      while (j < expr.length && /\s/.test(expr[j])) j++;
      const [arg, after] = strBraced(expr, j);
      if (arg !== null) {
        out += arg;
        i = after;
        continue;
      }
    }

    // Bracket-sizing modifiers - drop them, keep the bracket char.
    // \left( \right) plus the explicit-size family \big \Big \bigg
    // \Bigg with optional l/r/m suffix (\bigl \bigr \biggm etc).
    // Without these, the PDF downgrade keeps the command name as text
    // ("bigl[" instead of "[").
    if (expr.startsWith("\\left", i)) { i += 5; continue; }
    if (expr.startsWith("\\right", i)) { i += 6; continue; }
    {
      const sizingMatch = expr.slice(i).match(/^\\(?:Bigg|bigg|Big|big)[lrm]?(?![A-Za-z])/);
      if (sizingMatch) { i += sizingMatch[0].length; continue; }
    }

    // Math environments: \begin{aligned}...\end{aligned}, array, cases, split,
    // gathered, etc. KaTeX renders these on the website; for the PDF we strip
    // the \begin/\end wrappers (and any column spec) and keep the inner rows.
    // The \\ row separators become newlines and & alignment tabs are dropped
    // below, so a multi-step derivation reads as an equation chain instead of
    // dumping raw "beginaligned ... endaligned" text.
    if (expr.startsWith("\\begin", i)) {
      let j = i + 6;
      if (expr[j] === "{") { const [, after] = strBraced(expr, j); j = after; }
      while (j < expr.length && /\s/.test(expr[j])) j++;
      if (expr[j] === "{") { const [, after] = strBraced(expr, j); j = after; }
      i = j;
      continue;
    }
    if (expr.startsWith("\\end", i)) {
      let j = i + 4;
      if (expr[j] === "{") { const [, after] = strBraced(expr, j); j = after; }
      i = j;
      continue;
    }
    // Alignment tab inside an environment - drop it.
    if (ch === "&") { i++; continue; }

    // Backslash command (Greek letters, operators, functions)
    if (ch === "\\") {
      const m = expr.slice(i + 1).match(/^([A-Za-z]+)/);
      if (m) {
        const cmd = m[1];
        if (cmd in GREEK) { out += GREEK[cmd]; i += 1 + cmd.length; continue; }
        if (cmd in OPERATORS) { out += OPERATORS[cmd]; i += 1 + cmd.length; continue; }
        if (FUNCTIONS.has(cmd)) { out += cmd; i += 1 + cmd.length; continue; }
        // Unknown command - drop the backslash, keep the name
        out += cmd;
        i += 1 + cmd.length;
        continue;
      }
      // \\ → newline; \$ → $; \{ → {; \} → }
      const next = expr[i + 1];
      if (next === "\\") { out += "\n"; i += 2; continue; }
      if (next === "$" || next === "{" || next === "}" || next === "%" || next === "&" || next === "_" || next === "#") {
        out += next;
        i += 2;
        continue;
      }
      // Bare backslash; drop it
      i++;
      continue;
    }

    // Superscript: x^... or x^{...}
    if (ch === "^") {
      const j = i + 1;
      if (expr[j] === "{") {
        const [arg, after] = strBraced(expr, j);
        const inner = convertMathInner(arg ?? "");
        const sup = applySuperscript(inner);
        out += sup ?? `^(${inner})`;
        i = after;
        continue;
      }
      const single = expr[j];
      if (single !== undefined) {
        const sup = applySuperscript(single);
        out += sup ?? `^${single}`;
        i = j + 1;
        continue;
      }
    }

    // Subscript: x_... or x_{...}
    if (ch === "_") {
      const j = i + 1;
      if (expr[j] === "{") {
        const [arg, after] = strBraced(expr, j);
        const inner = convertMathInner(arg ?? "");
        const sub = applySubscript(inner);
        out += sub ?? `_(${inner})`;
        i = after;
        continue;
      }
      const single = expr[j];
      if (single !== undefined) {
        const sub = applySubscript(single);
        out += sub ?? `_${single}`;
        i = j + 1;
        continue;
      }
    }

    // Drop bare braces (after we've consumed any commands that needed them)
    if (ch === "{" || ch === "}") {
      i++;
      continue;
    }

    out += ch;
    i++;
  }

  return out;
}

// Replace $...$ and $$...$$ blocks in a markdown string with their plain
// Unicode equivalent. Escapes \$ are preserved.
export function downgradeLatexToUnicode(markdown) {
  if (!markdown) return markdown;

  // 1) Display math $$...$$ (must come before single-$ rule).
  let out = markdown.replace(
    /(^|[^\\])\$\$([\s\S]+?)\$\$/g,
    (_, lead, inner) => `${lead}${convertMathInner(inner)}`
  );

  // 2) Inline $...$ - single-line, non-greedy. A paired $...$ is math, so we
  //    always convert it (this is what fixes bare answers like "$1$" leaking
  //    their dollar signs). Real prose money is written "\$5" by the prompt,
  //    which the leading [^\\] guard skips, and the tidy step below unescapes.
  out = out.replace(
    /(^|[^\\])\$([^\n$]+?)\$/g,
    (whole, lead, inner) => `${lead}${convertMathInner(inner).trim()}`
  );

  // 3) Tidy: turn any remaining escaped dollar (prose money like "\$5") into a
  //    literal $, so the backslash doesn't show in the PDF.
  out = out.replace(/\\\$/g, "$");

  return out;
}
