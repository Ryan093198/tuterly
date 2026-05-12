// Defensive post-processor for generated worksheet / practice / report
// markdown. The model occasionally writes dollar amounts as `$120` instead
// of escaping them (`\$120`), so the markdown parser treats `$120 ... $80`
// as a single inline-math span and KaTeX renders the prose in italic math
// font with whitespace collapsed.
//
// We can't detect every misuse without a full markdown lexer, but two
// heuristics catch nearly all of the observed failures:
//
//   1. If an unescaped `$...$` span contains recognisable English prose
//      (3+ consecutive letters AND no LaTeX commands inside), escape both
//      ends so the markdown renderer treats them as plain text.
//   2. Display-math blocks (`$$...$$`) and code spans (`` `...` ``) are
//      passed through untouched.
//
// The model still has primary responsibility — the prompts now explicitly
// require `\$` for prose dollar amounts. This module is a safety net for
// when the model forgets anyway.

const PROSE_LETTER_RUN = /[a-zA-Z]{3,}/;

export function escapeProseDollars(md) {
  if (!md || typeof md !== "string") return md;

  const out = [];
  const n = md.length;
  let i = 0;

  while (i < n) {
    const ch = md[i];

    // Fenced code block ``` ```. Pass through verbatim.
    if (ch === "`" && md.startsWith("```", i)) {
      const end = md.indexOf("```", i + 3);
      const stop = end === -1 ? n : end + 3;
      out.push(md.slice(i, stop));
      i = stop;
      continue;
    }

    // Inline code span ` ... `. Pass through verbatim.
    if (ch === "`") {
      const end = md.indexOf("`", i + 1);
      const stop = end === -1 ? n : end + 1;
      out.push(md.slice(i, stop));
      i = stop;
      continue;
    }

    // Display math $$ ... $$ — robust to prose mistakes, pass through.
    if (ch === "$" && md[i + 1] === "$") {
      const end = md.indexOf("$$", i + 2);
      const stop = end === -1 ? n : end + 2;
      out.push(md.slice(i, stop));
      i = stop;
      continue;
    }

    // Unescaped single $ — look for the matching closing $ on the same line.
    if (ch === "$" && md[i - 1] !== "\\") {
      let j = i + 1;
      while (j < n) {
        const cj = md[j];
        if (cj === "\n") break;
        if (cj === "$" && md[j - 1] !== "\\" && md[j + 1] !== "$") break;
        j++;
      }
      if (j < n && md[j] === "$") {
        const content = md.slice(i + 1, j);
        if (looksLikeProse(content)) {
          out.push("\\$");
          out.push(content);
          out.push("\\$");
          i = j + 1;
          continue;
        }
      }
      // Not prose, or no matching close — let the markdown renderer handle it.
    }

    out.push(ch);
    i++;
  }

  return out.join("");
}

// A `$...$` span is "prose" when it almost certainly isn't math:
//   - Contains a backslash → LaTeX command present → treat as math.
//   - 3+ consecutive English letters (a word) → almost certainly prose.
//   - More letters than digits and >4 letters total → prose with embedded
//     numbers (money + words).
//   - Multiple digit groups separated only by non-operator characters
//     (e.g. "40 (b) 40", "120, 80") → likely list of money values.
//   - Starts with digits followed by space-then-non-operator (e.g.
//     "40 each", "5 dollars") → prose money.
//   - Very long span (>40 chars) with no LaTeX commands → prose.
function looksLikeProse(content) {
  if (!content) return false;
  if (content.includes("\\")) return false;
  if (PROSE_LETTER_RUN.test(content)) return true;
  const letters = (content.match(/[a-zA-Z]/g) || []).length;
  const digits = (content.match(/\d/g) || []).length;
  if (letters > 4 && letters > digits) return true;
  // Multiple digit groups (e.g. "40 (b) 40") without any math operator
  // between them — math would normally have +, -, *, /, =, ^, _, or {}.
  const digitGroups = content.match(/\d+/g) || [];
  if (digitGroups.length >= 2 && !/[+\-*/=^_{}]/.test(content)) return true;
  // Starts with digit-then-space, but the next non-space char isn't a math
  // operator — almost always money like "$5 each" or "$40 (b)".
  if (/^\d[\d,.]*\s/.test(content) && !/^\d[\d,.]*\s*[+\-*/=^_]/.test(content)) {
    return true;
  }
  if (content.length > 40) return true;
  return false;
}
