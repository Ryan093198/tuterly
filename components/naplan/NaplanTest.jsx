"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { checkAnswer } from "@/lib/answer-check";
import { trackEvent } from "@/lib/analytics";

// The 20-question NAPLAN-style practice test. Questions, options and
// solutions arrive already rendered from the server (maths included).
// questions: [{ n, strand, skill, format, calculator, answerIndex, accept, q, opts, sol }]
export default function NaplanTest({ year, questions, appYears }) {
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(null); // { results: {n: true|false}, score }
  const started = useRef(false);
  const resultsRef = useRef(null);

  function setAnswer(n, v) {
    if (!started.current) { started.current = true; trackEvent("naplan_start", { year }); }
    setAnswers((a) => ({ ...a, [n]: v }));
  }

  async function mark() {
    const math = await import("mathjs");
    const results = {};
    for (const q of questions) {
      const a = answers[q.n];
      if (q.format === "choice") results[q.n] = a !== undefined && Number(a) === q.answerIndex;
      else results[q.n] = checkAnswer(math, "number", q.accept || {}, a ?? "").ok === true;
    }
    const score = Object.values(results).filter(Boolean).length;
    setMarked({ results, score });
    trackEvent("naplan_mark", { year, score, answered: Object.keys(answers).length });
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function reset() {
    setAnswers({});
    setMarked(null);
    trackEvent("naplan_retry", { year });
    document.getElementById("naplan-test")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const answered = Object.values(answers).filter((v) => String(v).trim() !== "").length;
  const strands = [...new Set(questions.map((q) => q.strand))];
  const byStrand = marked
    ? strands.map((s) => {
        const qs = questions.filter((q) => q.strand === s);
        return { s, right: qs.filter((q) => marked.results[q.n]).length, total: qs.length };
      })
    : [];
  const wrongSkills = marked ? questions.filter((q) => !marked.results[q.n]).map((q) => q.skill) : [];
  const total = questions.length;
  const isApp = appYears.includes(year);

  return (
    <div className="nt">
      {marked && (
        <section ref={resultsRef} className="nt-results" aria-live="polite">
          <p className="nt-results__eyebrow">Your result</p>
          <p className="nt-results__score">
            {marked.score} <span>out of {total}</span>
          </p>
          <p className="nt-results__line">{scoreLine(marked.score, total)}</p>
          <div className="nt-strands" role="table" aria-label="Result by strand">
            {byStrand.map((b) => (
              <div key={b.s} className="nt-strand" role="row">
                <span role="cell" className="nt-strand__name">{b.s}</span>
                <span role="cell" className="nt-strand__bar" aria-hidden="true"><i style={{ width: `${(b.right / b.total) * 100}%` }} /></span>
                <span role="cell" className="nt-strand__n">{b.right}/{b.total}</span>
              </div>
            ))}
          </div>
          {wrongSkills.length > 0 && (
            <p className="nt-results__skills"><strong>To work on:</strong> {wrongSkills.join(", ")}.</p>
          )}
          <div className="nt-next">
            {isApp ? (
              <>
                <p className="nt-next__title">
                  {marked.score >= total - 2 ? "Ready for harder questions?" : `Turn the ${total - marked.score} you got wrong into marks.`}
                </p>
                <p className="nt-next__text">
                  {marked.score >= total - 2
                    ? "In the Tuterly app, every question they master unlocks a harder one, and Test any topic covers every part of a topic, so strong students keep being stretched before NAPLAN and school tests."
                    : "Snap the questions they got wrong in the Tuterly app. They get the worked solution, then fresh questions on the same idea until each one is mastered. Built for Years 7 to 10 and the Victorian Curriculum."}
                </p>
                <div className="nt-next__btns">
                  <Link href="/#get-app" className="nt-btn" onClick={() => trackEvent("naplan_cta_click", { year, to: "app", score: marked.score })}>Sign up early for 50% off</Link>
                  <Link href="/try" className="nt-link" onClick={() => trackEvent("naplan_cta_click", { year, to: "try", score: marked.score })}>Try it free on one question →</Link>
                </div>
              </>
            ) : (
              <>
                <p className="nt-next__title">Practise the topics they missed.</p>
                <p className="nt-next__text">
                  Make a free Year {year} worksheet on any topic, with six new questions and fully worked solutions, as many times as you like.
                </p>
                <div className="nt-next__btns">
                  <Link href="/worksheets" className="nt-btn" onClick={() => trackEvent("naplan_cta_click", { year, to: "worksheets", score: marked.score })}>Make a free Year {year} worksheet</Link>
                </div>
              </>
            )}
          </div>
          <button type="button" className="nt-link nt-retry" onClick={reset}>Clear my answers and try again</button>
        </section>
      )}

      <ol className="nt-list">
        {questions.map((q, i) => {
          const r = marked ? marked.results[q.n] : null;
          const sectionStart = year >= 7 && (i === 0 || q.calculator !== questions[i - 1].calculator);
          return (
            <li key={q.n} className={`nt-q ${r === true ? "is-right" : r === false ? "is-wrong" : ""}`}>
              {sectionStart && (
                <p className="nt-section">{q.calculator ? "Calculator allowed" : "Non-calculator section: no calculator for these questions"}</p>
              )}
              <div className="nt-q__head">
                <span className="nt-q__num">Question {q.n}</span>
                <span className="nt-q__strand">{q.strand}</span>
                {r !== null && <span className={`nt-q__mark ${r ? "is-right" : "is-wrong"}`}>{r ? "✓ Correct" : "✗ Not quite"}</span>}
              </div>
              {q.q}
              {q.format === "choice" ? (
                <div className="nt-opts" role="radiogroup" aria-label={`Question ${q.n} options`}>
                  {q.opts.map((o, j) => {
                    const chosen = Number(answers[q.n]) === j && answers[q.n] !== undefined;
                    const isAnswer = marked && j === q.answerIndex;
                    return (
                      <label key={j} className={`nt-opt ${chosen ? "is-chosen" : ""} ${isAnswer ? "is-answer" : ""}`}>
                        <input type="radio" name={`q${q.n}`} value={j} checked={chosen} disabled={!!marked} onChange={() => setAnswer(q.n, j)} />
                        <span className="nt-opt__letter" aria-hidden="true">{"ABCD"[j]}</span>
                        <span className="nt-opt__text">{o}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="nt-num">
                  <input
                    className="nt-num__input"
                    inputMode="decimal"
                    autoComplete="off"
                    aria-label={`Answer to question ${q.n}`}
                    placeholder="Type your answer"
                    value={answers[q.n] ?? ""}
                    disabled={!!marked}
                    onChange={(e) => setAnswer(q.n, e.target.value)}
                  />
                  {q.accept?.unit ? <span className="nt-num__unit">{q.accept.unit}</span> : null}
                </div>
              )}
              {marked && (
                <details className="nt-sol" open={r === false}>
                  <summary>{r ? "See the worked solution" : "See where it went wrong"}</summary>
                  {q.sol}
                </details>
              )}
            </li>
          );
        })}
      </ol>

      {!marked && (
        <div className="nt-markbar">
          <p className="nt-markbar__count">{answered} of {total} answered</p>
          <button type="button" className="nt-btn nt-btn--big" onClick={mark} disabled={answered === 0}>Mark my test</button>
        </div>
      )}
    </div>
  );
}

function scoreLine(score, total) {
  const pct = score / total;
  if (pct >= 0.9) return "Excellent. That’s a very strong result on these questions.";
  if (pct >= 0.7) return "A solid result. The questions below marked ✗ are the ones to practise.";
  if (pct >= 0.5) return "Getting there. Work through the solutions for the ones marked ✗, then try again.";
  return "Plenty to practise. Start with the worked solutions below, one strand at a time.";
}
