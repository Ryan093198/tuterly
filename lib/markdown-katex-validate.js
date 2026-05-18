import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import katex from "katex";

// Validate every math span in a markdown document by running it through the
// same KaTeX renderer that the browser uses. Returns the list of math blocks
// that won't render - the caller can ask the model to redo just those, or
// retry the whole generation.
//
// We parse the markdown to an mdast tree via remark-parse + remark-math,
// which uses the exact same micromark tokenizer as MarkdownReport's pipeline
// (see components/MarkdownReport.jsx). So a math span detected here IS the
// same math span the browser will try to render - no heuristic guessing,
// no string-position drift.
//
// Each failure includes the verbatim source (with $/$$ fences), the line
// number, the display-vs-inline flag, and the KaTeX error message. The
// failures array is empty when every math block renders cleanly.

const processor = unified().use(remarkParse).use(remarkMath);

/**
 * @param {string} markdown
 * @returns {Array<{
 *   source: string,
 *   value: string,
 *   displayMode: boolean,
 *   line: number,
 *   error: string,
 * }>}
 */
export function findKatexErrors(markdown) {
  if (!markdown || typeof markdown !== "string") return [];

  let tree;
  try {
    tree = processor.parse(markdown);
  } catch (e) {
    // remark-parse failing on the markdown itself is a separate problem;
    // return an empty list so the route falls through to its usual save.
    return [];
  }

  const errors = [];
  visit(tree, ["math", "inlineMath"], (node) => {
    const displayMode = node.type === "math";
    const fence = displayMode ? "$$" : "$";
    let katexError = null;
    try {
      katex.renderToString(node.value, {
        displayMode,
        throwOnError: true,
        strict: "ignore",
      });
    } catch (e) {
      katexError = e?.message || String(e);
    }

    // KaTeX-syntax check (LaTeX commands, balanced braces, etc).
    if (katexError) {
      errors.push({
        source: `${fence}${node.value}${fence}`,
        value: node.value,
        displayMode,
        line: node.position?.start?.line ?? 0,
        error: katexError,
      });
      return;
    }

    // Prose-in-math check. KaTeX happily renders "120 for pies and " as
    // italic math text, so syntax validation alone misses the case where
    // the model wrote a bare $120 dollar amount in a sentence and the
    // markdown parser stretched the math span to the next $. We flag any
    // span that contains a recognisable English word AND no LaTeX command
    // - that's almost always prose mis-parsed as math.
    if (looksLikeProseMath(node.value)) {
      errors.push({
        source: `${fence}${node.value}${fence}`,
        value: node.value,
        displayMode,
        line: node.position?.start?.line ?? 0,
        error:
          "Math span contains English words but no LaTeX commands - looks like prose mis-parsed as math. If you wrote a dollar amount in a sentence, escape it as \\$ instead.",
      });
    }
  });
  return errors;
}

const PROSE_WORD = /[a-zA-Z]{3,}/;

function looksLikeProseMath(value) {
  if (!value) return false;
  if (value.includes("\\")) return false; // LaTeX command present
  if (!PROSE_WORD.test(value)) return false;
  return true;
}

/**
 * Build a short, model-friendly summary of validation errors. Used as the
 * user-message body for the corrective retry.
 *
 * @param {ReturnType<typeof findKatexErrors>} errors
 */
export function formatErrorsForRetry(errors) {
  if (errors.length === 0) return "";
  const lines = errors.map((e, i) => {
    const kind = e.displayMode ? "display math ($$...$$)" : "inline math ($...$)";
    return `${i + 1}. ${kind} on or near line ${e.line}: \`${e.source}\` - KaTeX error: ${e.error}`;
  });
  return [
    "Your previous worksheet contained math blocks that KaTeX could not render. Each broken block is listed below with the exact KaTeX error.",
    "",
    "Re-emit the ENTIRE worksheet. Fix every listed math block by writing syntactically valid LaTeX. Remember:",
    "- Math expressions ALWAYS use bare $...$ on both ends - never escape the closing as \\$.",
    "- Prose dollar amounts use \\$NUMBER, never inside $...$.",
    "- Bare numbers in a sentence get NO dollar signs at all.",
    "- Display blocks need $$ on its own line at start AND end.",
    "",
    "Errors to fix:",
    ...lines,
  ].join("\n");
}
