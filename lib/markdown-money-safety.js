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

  // First pass: strip over-escaped numeric lists. The model occasionally
  // misreads our "escape dollar amounts" rule as applying to any list of
  // numbers, emitting `\$8, 15, 10, 15, 12\$.` for a data set. Markdown
  // renders the escape sequences as literal `$` characters, so the user
  // sees stray dollar signs around plain numbers. Strip them when the
  // wrapped content is purely a comma-separated integer list (3+ items)
  // — that's never a valid money pattern (money would be written as
  // separate `\$N` items, not wrapped in a pair).
  md = md.replace(
    /\\\$(\d+(?:\s*,\s*\d+){2,})\\\$/g,
    "$1"
  );

  // Second pass: rescue math expressions whose closing $ was wrongly
  // escaped as \$. The model occasionally writes `$2^{4}\$ bacteria.`
  // intending "$2^{4}$ bacteria." — the escaped close lets the math span
  // extend to the next unescaped $ later in the paragraph, KaTeX gets
  // prose, and the whole thing renders in red. Detect by an opening $
  // followed by content containing a math-only character (^ _ { } \) and
  // a trailing \$ — convert that \$ back into a plain $.
  md = md.replace(
    /\$([^$\n]*?[\\^_{}][^$\n]*?)\\\$/g,
    "$$$1$$"
  );

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
//   - A parenthesised single letter like "(a)" "(b)" — enumeration prose.
//   - Multiple distinct *numbers* AND letters in a row, with no math
//     operators and no coordinate-style parens → list-of-money.
//   - Very long span (>40 chars) with no LaTeX commands → prose.
//
// Decimals (0.5), grouped numbers (1,000), coordinate pairs ((2, 3)), and
// short units (5 cm) are intentionally NOT flagged — those slipped past
// older heuristics as false positives.
function looksLikeProse(content) {
  if (!content) return false;
  if (content.includes("\\")) return false;
  if (PROSE_LETTER_RUN.test(content)) return true;
  // Parenthesised single letter — common enumeration tag inserted between
  // money values: "$40 (b) $40" → between-$ content is "40 (b) ".
  if (/\([a-z]\)/i.test(content)) return true;
  const letters = (content.match(/[a-zA-Z]/g) || []).length;
  const digits = (content.match(/\d/g) || []).length;
  if (letters > 4 && letters > digits) return true;
  // Multiple distinct numbers (treating 0.5 / 1,000 as a single number)
  // with no math operator and no coordinate-paren — likely a list of
  // money values. We exclude `(\d` (coordinate / function-call style)
  // so `(2, 3)` and `f(0)` stay as math.
  const numbers = content.match(/\d+(?:[.,]\d+)*/g) || [];
  const hasMathOp = /[+\-*/=^_{}]/.test(content);
  const hasCoordParen = /\(\s*-?\d/.test(content);
  if (numbers.length >= 2 && !hasMathOp && !hasCoordParen && letters > 0) {
    return true;
  }
  if (content.length > 40) return true;
  return false;
}
