import { sanitizeGenerated } from "./sanitize-generated.js";

// Clean-up for AI-written maths shown on the site (the Try it demo and the
// topic pages' worked examples). Each fixes something that passes the
// KaTeX checker but renders wrong, or breaks the house style.
export const dashes = (s) => (typeof s === "string" ? s.replace(/\s*[–—]\s*/g, ", ") : s);
// Money written as maths ($\$120$) or with a stray $ breaks the maths
// renderer; normalise it to prose money (\$120), as the worksheets do.
export const fixMoney = (s) =>
  typeof s === "string"
    ? s.replace(/\$\\\$\$\s*(?=\d)/g, "\\$").replace(/\\\s+\$(?=\d)/g, "\\$").replace(/\$\\\$\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*\$/g, "\\$$$1").replace(/\$\\text\{\\\$\}\s*([0-9][0-9,]*(?:\.[0-9]+)?)\$/g, "\\$$$1")
    : s;
// Other things that look fine to the maths checker but render wrong:
//  - % inside $...$ is a LaTeX comment, so "$20%$" shows as "20".
//  - | inside $...$ on a table row (|x|) splits the table cell.
//  - 3*4 outside maths turns into italics.
export const fixMathSpans = (s, fn) => s.replace(/(?<!\\)\$\$[\s\S]+?\$\$|(?<!\\)\$(?:\\.|[^$\\\n])+\$/g, fn);
export const fixRender = (s) => {
  if (typeof s !== "string") return s;
  let out = fixMathSpans(s, (m) => m.replace(/(^|[^\\])%/g, "$1\\%"));
  out = out
    .split("\n")
    .map((line) => (line.trim().startsWith("|") ? fixMathSpans(line, (m) => m.replace(/(?<!\\)\|/g, "\\vert ")) : line))
    .join("\n");
  out = out.replace(/(\d)\s*\*\s*(?=\d)/g, "$1 × ");
  return out;
};

export const cleanMathText = (s) => dashes(sanitizeGenerated(fixRender(fixMoney(String(s || "").trim()))));
