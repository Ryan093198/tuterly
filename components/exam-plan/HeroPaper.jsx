import katex from "katex";

// The hero picture on /exam-plan: a marked class test on the desk (red pen
// crosses, a circled score) with the plan we'd make from it lying on top.
// Drawn in HTML and SVG so the maths is real KaTeX and it stays sharp on
// phones. The pen marks draw in once on load (CSS, off with reduced motion).

const m = (tex) => ({ __html: katex.renderToString(tex, { throwOnError: false }) });

const QUESTIONS = [
  { n: 1, text: "Simplify", tex: "a^5 \\times a^3", mark: "wrong" },
  { n: 2, text: "Expand", tex: "3(2x - 5)", mark: "right" },
  { n: 3, text: "Solve", tex: "\\dfrac{x}{4} + 3 = 7", mark: "wrong" },
  { n: 4, text: "Gradient of", tex: "y = 3x - 2", mark: "right" },
  { n: 5, text: "Factorise", tex: "x^2 + 5x + 6", mark: "wrong" },
];

function Cross() {
  return (
    <svg className="hp-mark hp-mark--x" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M8 9 L32 31" />
      <path d="M31 8 L9 32" />
    </svg>
  );
}
function Tick() {
  return (
    <svg className="hp-mark hp-mark--tick" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M7 21 L16 30 L34 9" />
    </svg>
  );
}

export default function HeroPaper() {
  return (
    <div className="hp" role="img" aria-label="A marked maths test with three questions crossed wrong, and the study plan made from it: 12 days to the exam, starting with index laws.">
      <div className="hp-paper" aria-hidden="true">
        <div className="hp-paper__head">
          <span>Year 9 Algebra test</span>
          <span className="hp-score">
            <svg viewBox="0 0 120 64"><path d="M14 34 C10 12 60 4 96 12 C116 18 114 46 84 54 C52 62 12 56 16 30" /></svg>
            <b>12/20</b>
          </span>
        </div>
        <ol className="hp-qs">
          {QUESTIONS.map((q) => (
            <li key={q.n}>
              <span className="hp-n">{q.n}.</span>
              <span className="hp-t">{q.text} <span dangerouslySetInnerHTML={m(q.tex)} /></span>
              {q.mark === "wrong" ? <Cross /> : <Tick />}
            </li>
          ))}
        </ol>
      </div>

      <div className="hp-plan" aria-hidden="true">
        <p className="hp-plan__k">Your plan</p>
        <p className="hp-plan__h">12 days to your exam</p>
        <ul>
          <li><span>Thu</span>Index laws</li>
          <li><span>Fri</span>Solving equations</li>
          <li><span>Sat</span>Factorising</li>
          <li className="is-test"><span>Sun</span>Your customised test</li>
        </ul>
      </div>
    </div>
  );
}
