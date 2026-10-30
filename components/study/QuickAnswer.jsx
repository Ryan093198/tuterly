import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./worked-examples.css";

// The short direct answer at the top of a topic page: the question people
// search for and a 40 to 60 word answer, written to be quoted by search
// engines and AI answers. Also listed in the page's FAQPage schema.
export default function QuickAnswer({ q, a }) {
  if (!q || !a) return null;
  return (
    <section className="qa-box" aria-labelledby="qa-title">
      <p className="qa-eyebrow">Quick answer</p>
      <h2 id="qa-title" className="qa-q">{q}</h2>
      <div className="qa-a">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{a}</ReactMarkdown>
      </div>
    </section>
  );
}
