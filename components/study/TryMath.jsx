"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Markdown + LaTeX (and tables) for the Try it demo. Loaded only once a
// result shows, so KaTeX isn't in the home page's first load. Tables sit
// in a scroll box so a wide one never pushes the page sideways.
const components = {
  table: ({ node, ...props }) => (
    <div className="tq-table">
      <table {...props} />
    </div>
  ),
};

export default function TryMath({ md, inline = false }) {
  return (
    <div className={inline ? "tq-math tq-math--inline" : "tq-math"}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={components}>
        {md || ""}
      </ReactMarkdown>
    </div>
  );
}
