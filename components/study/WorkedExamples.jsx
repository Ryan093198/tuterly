import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./worked-examples.css";
import { mathToReadable } from "@/lib/try-email";

// Worked examples, common mistakes and "try one yourself" for a topic page.
// Rendered on the server (no JavaScript); solutions sit in <details> so
// students can have a go first, and the text is still there for search.
const M = ({ md }) => (
  <div className="wx-md">
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}
      components={{ table: ({ node, ...p }) => <div className="wx-table"><table {...p} /></div> }}>
      {md}
    </ReactMarkdown>
  </div>
);

export default function WorkedExamples({ data, topic, yearLevel }) {
  if (!data) return null;
  const { examples, mistakes, practice } = data;
  return (
    <div className="wx">
      <section className="wx-sec" aria-labelledby="wx-examples">
        <p className="wx-eyebrow">Worked examples</p>
        <h2 id="wx-examples" className="wx-h2">{yearLevel} {topic.toLowerCase()}: worked examples</h2>
        <p className="wx-lead">Three examples, from a standard question to a worded problem. Have a go at each one before you open the solution.</p>
        <ol className="wx-list">
          {examples.map((e, i) => (
            <li key={i} className="wx-card">
              <p className="wx-num">Example {i + 1} · {mathToReadable(e.title)}</p>
              <M md={e.question} />
              <details className="wx-sol">
                <summary>Show worked solution</summary>
                <M md={e.solution} />
              </details>
            </li>
          ))}
        </ol>
      </section>

      {mistakes.length > 0 && (
        <section className="wx-sec" aria-labelledby="wx-mistakes">
          <p className="wx-eyebrow">Common mistakes</p>
          <h2 id="wx-mistakes" className="wx-h2">Where students usually lose marks</h2>
          <div className="wx-grid">
            {mistakes.map((m, i) => (
              <div key={i} className="wx-card wx-mistake">
                <h3 className="wx-h3">{mathToReadable(m.title)}</h3>
                <div className="wx-wrong"><span className="wx-x" aria-hidden="true">✗</span><M md={m.wrong} /></div>
                <M md={m.fix} />
              </div>
            ))}
          </div>
        </section>
      )}

      {practice && (
        <section className="wx-sec" aria-labelledby="wx-try">
          <p className="wx-eyebrow">Try one yourself</p>
          <h2 id="wx-try" className="wx-h2">Your turn</h2>
          <div className="wx-card wx-practice">
            <M md={practice.question} />
            <details className="wx-sol">
              <summary>Check your answer</summary>
              <M md={`**Answer:** ${practice.answer}`} />
              <M md={practice.solution} />
            </details>
          </div>
          <p className="wx-tryline">
            Got a different {topic.toLowerCase()} question wrong? <Link href="/try">Upload it to Tuterly</Link> and get the worked solution and a fresh one to practise, free.
          </p>
        </section>
      )}
    </div>
  );
}
