import { Md } from "@/lib/md-html";
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
      <Md className="qa-a" gfm={false} md={a} />
    </section>
  );
}
