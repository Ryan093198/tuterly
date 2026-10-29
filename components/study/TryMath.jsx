"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Markdown + LaTeX for the Try it demo. Loaded only once a result shows,
// so KaTeX isn't in the home page's first load.
export default function TryMath({ md }) {
  return (
    <div className="tq-math">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {md || ""}
      </ReactMarkdown>
    </div>
  );
}
