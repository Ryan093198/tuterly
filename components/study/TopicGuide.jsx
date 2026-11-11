import { Md } from "@/lib/md-html";
import "katex/dist/katex.min.css";
import { cleanMathText } from "@/lib/math-text-fixes";
import "./topic-guide.css";

// A written explainer and quick check for a topic page (lib/topic-guides.js).
// Server-rendered; answers sit in <details> so students try first.
const M = ({ md }) => (
  <Md className="tg-md" tableClass="tg-table" md={cleanMathText(md.replace(/\n(\$\$[^\n]+\$\$)(?=\n|$)/g, "\n\n$1\n"))} />
);

export default function TopicGuide({ guide, id = "guide" }) {
  if (!guide) return null;
  return (
    <section className="tg" aria-labelledby={id}>
      <div className="tg-wrap">
        <p className="tg-eyebrow">Topic guide</p>
        <h2 id={id} className="tg-title">{guide.title}</h2>
        {guide.lead && <p className="tg-lead">{guide.lead}</p>}
        {guide.sections.map((s) => (
          <div key={s.h} className="tg-sec">
            <h3 className="tg-h">{s.h}</h3>
            <M md={s.md} />
          </div>
        ))}
        {guide.quiz?.length > 0 && (
          <div className="tg-quiz">
            <h3 className="tg-h">Quick check: {guide.quiz.length} questions</h3>
            <p className="tg-sub">Try each one, then open the answer.</p>
            <ol className="tg-qlist">
              {guide.quiz.map((q, i) => (
                <li key={i} className="tg-q">
                  <M md={q.q} />
                  <details>
                    <summary>Answer</summary>
                    <M md={q.a} />
                  </details>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
