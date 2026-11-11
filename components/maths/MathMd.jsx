import { Md } from "@/lib/md-html";
import { fixDollars } from "@/lib/md-dollars";
import "katex/dist/katex.min.css";
import "./maths.css";

// Markdown with LaTeX, rendered on the server (no JavaScript), for the
// maths concept pages. Tables sit in a scroll box.
// A line that is only $$...$$ becomes its own display block, so each line
// of working sits on its own line (markdown otherwise joins them).

function blocks(md) {
  return fixDollars(md)
    .split("\n")
    .map((l) => {
      const t = l.trim();
      return /^\$\$.+\$\$$/.test(t) ? `\n$$\n${t.slice(2, -2)}\n$$\n` : l;
    })
    .join("\n");
}

export default function MathMd({ md, className = "" }) {
  return (
    <Md className={`mx-md ${className}`} tableClass="mx-table" md={blocks(md)} />
  );
}
