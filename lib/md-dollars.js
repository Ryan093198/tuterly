// Money in maths markdown. remark-math ends a formula at any "$", even an
// escaped one, so "$-\$85$" breaks. This walks the text once:
//   - "\$" outside a formula becomes "&#36;" (a plain dollar sign);
//   - "\$" inside a formula becomes "\text{\textdollar}" (KaTeX's dollar).
// Unescaped "$" and "$$" still open and close formulas as before.
export function fixDollars(md) {
  const s = String(md || "");
  if (!s.includes("\\$")) return s;
  let out = "";
  let math = null; // null, "$" or "$$"
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\\" && s[i + 1] === "$") {
      out += math ? "\\text{\\textdollar}" : "&#36;";
      i++;
      continue;
    }
    if (ch === "\\" && i + 1 < s.length) {
      out += ch + s[i + 1];
      i++;
      continue;
    }
    if (ch === "$") {
      const dbl = s[i + 1] === "$";
      const tok = dbl ? "$$" : "$";
      if (!math) math = tok;
      else if (math === tok) math = null;
      out += tok;
      if (dbl) i++;
      continue;
    }
    out += ch;
  }
  return out;
}
