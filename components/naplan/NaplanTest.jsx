"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { checkAnswer } from "@/lib/answer-check";
import { trackEvent } from "@/lib/analytics";
import { appCta } from "@/lib/study-app";
import NaplanCalculator from "./NaplanCalculator";

// The 20-question NAPLAN-style practice test. Questions, options and
// solutions arrive already rendered from the server (maths included).
// questions: [{ n, strand, skill, format, calculator, answerIndex, accept, q, opts, sol }]
//
// Years 7 and 9 run as a NAPLAN Online-style test (Ryan, 16 Nov 2026): one
// question at a time, a question map, flag for review, the non-calculator
// questions first and locked once the calculator section starts (as ACARA
// describes the real test), an on-screen calculator, a timer, and a review
// screen before marking. Years 3 and 5 keep the single-page list. All
// questions stay in the page for Google; only the current one shows.
export default function NaplanTest({ year, questions, appYears }) {
  const exam = year >= 7;
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(null); // { results: {n: true|false}, score, secs }
  const [phase, setPhase] = useState(exam ? "intro" : "list"); // intro | test | gate | review | list
  const [idx, setIdx] = useState(0);
  const [flags, setFlags] = useState({});
  const [ncLocked, setNcLocked] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [secs, setSecs] = useState(0);
  const [showTime, setShowTime] = useState(true);
  const started = useRef(false);
  const rootRef = useRef(null);
  const resultsRef = useRef(null);
  const cta = appCta();

  const total = questions.length;
  const ncCount = questions.filter((q) => !q.calculator).length;
  const isApp = appYears.includes(year);
  const running = exam && !marked && (phase === "test" || phase === "gate" || phase === "review");

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const top = () => requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  function begin() {
    if (!started.current) { started.current = true; trackEvent("naplan_start", { year, mode: "exam" }); }
    setPhase("test");
    setIdx(0);
    top();
  }

  function setAnswer(n, v) {
    if (!started.current) { started.current = true; trackEvent("naplan_start", { year, mode: exam ? "exam" : "list" }); }
    setAnswers((a) => ({ ...a, [n]: v }));
  }

  const isAnswered = (q) => answers[q.n] !== undefined && String(answers[q.n]).trim() !== "";
  const answered = questions.filter(isAnswered).length;

  function go(to) {
    if (to < 0 || to >= total) return;
    if (ncLocked && !questions[to].calculator) return;
    // Leaving the non-calculator section: confirm first, as the real test does.
    if (!ncLocked && !questions[idx].calculator && questions[to].calculator) { setPhase("gate"); top(); return; }
    setIdx(to);
    setPhase("test");
  }

  function next() {
    if (idx === total - 1) { setPhase("review"); top(); return; }
    go(idx + 1);
  }

  function enterCalcSection() {
    setNcLocked(true);
    setIdx(ncCount);
    setPhase("test");
    trackEvent("naplan_calc_section", { year });
    top();
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
    setMarked({ results, score, secs });
    setCalcOpen(false);
    setPhase("list");
    trackEvent("naplan_mark", { year, score, answered, secs: exam ? secs : undefined });
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function reset() {
    setAnswers({});
    setMarked(null);
    setFlags({});
    setNcLocked(false);
    setSecs(0);
    setIdx(0);
    setPhase(exam ? "intro" : "list");
    trackEvent("naplan_retry", { year });
    top();
  }

  const strands = [...new Set(questions.map((q) => q.strand))];
  const byStrand = marked
    ? strands.map((s) => {
        const qs = questions.filter((q) => q.strand === s);
        return { s, right: qs.filter((q) => marked.results[q.n]).length, total: qs.length };
      })
    : [];
  const wrongSkills = marked ? questions.filter((q) => !marked.results[q.n]).map((q) => q.skill) : [];
  const cur = questions[idx];
  const inTest = exam && phase === "test" && !marked;
  const unansweredNc = questions.filter((q) => !q.calculator && !isAnswered(q)).length;
  const flaggedList = questions.filter((q) => flags[q.n]);
  const unansweredList = questions.filter((q) => !isAnswered(q) && !(ncLocked && !q.calculator));

  return (
    <div className={`nt ${exam ? "nt--exam" : ""}`} ref={rootRef} style={{ scrollMarginTop: 90 }}>
      {marked && (
        <section ref={resultsRef} className="nt-results" aria-live="polite">
          <p className="nt-results__eyebrow">Your result</p>
          <p className="nt-results__score">
            {marked.score} <span>out of {total}</span>
          </p>
          <p className="nt-results__line">
            {scoreLine(marked.score, total)}
            {exam && marked.secs > 0 && <> Time taken: {clock(marked.secs)}.</>}
          </p>
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
                <p className="nt-next__title">Unlimited practice tests on every topic NAPLAN covers.</p>
                <p className="nt-next__text">
                  {marked.score >= total - 2
                    ? `This free test has 20 questions. In the Tuterly app, they can test any Year ${year} topic as often as they like, with harder questions as they improve, so strong students keep being stretched before NAPLAN and school tests.`
                    : `This free test has 20 questions. In the Tuterly app, they can test any Year ${year} topic as often as they like, and every question they get wrong comes back with a worked solution and fresh questions on the same skill until it's mastered.`}
                </p>
                <div className="nt-next__btns">
                  <Link href={cta.href} className="nt-btn" onClick={() => { trackEvent("naplan_cta_click", { year, to: "app", score: marked.score }); if (cta.live) trackEvent("begin_checkout", { item_id: "plus", source: "naplan" }); }}>{cta.label}</Link>
                  <Link href="/method#try" className="nt-link" onClick={() => trackEvent("naplan_cta_click", { year, to: "try", score: marked.score })}>Try it free on one question →</Link>
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

      {exam && phase === "intro" && !marked && (
        <div className="nx-card nx-intro">
          <p className="nx-intro__t">Year {year} NAPLAN-style numeracy practice test</p>
          <ul className="nx-intro__facts">
            <li><strong>{total} questions</strong> across every strand. Suggested time: about 30 minutes.</li>
            <li><strong>Questions 1 to {ncCount}: no calculator.</strong> Questions {ncCount + 1} to {total}: an on-screen calculator.</li>
            <li>Like the real test, you can&rsquo;t go back to the non-calculator questions once you start the calculator section.</li>
            <li>Flag any question to come back to. You&rsquo;ll see a review screen before it&rsquo;s marked.</li>
          </ul>
          <div className="nx-intro__btns">
            <button type="button" className="nt-btn nt-btn--big" onClick={begin}>Start the test</button>
            <label className="nx-toggle"><input type="checkbox" checked={showTime} onChange={(e) => setShowTime(e.target.checked)} /> Show the timer</label>
          </div>
        </div>
      )}

      {inTest && (
        <div className="nx-bar" role="group" aria-label="Test progress">
          <span className="nx-bar__q">Question {idx + 1} of {total}</span>
          <span className={`nx-bar__sec ${cur.calculator ? "is-calc" : ""}`}>{cur.calculator ? "Calculator section" : "Non-calculator section"}</span>
          {showTime && <span className="nx-bar__time" aria-label="Time elapsed">{clock(secs)}</span>}
          {cur.calculator && (
            <button type="button" className="nx-bar__calc" aria-expanded={calcOpen} onClick={() => setCalcOpen((o) => !o)}>
              {calcOpen ? "Hide calculator" : "Calculator"}
            </button>
          )}
        </div>
      )}

      {exam && phase === "gate" && !marked && (
        <div className="nx-card nx-gate" role="alertdialog" aria-labelledby="nx-gate-t">
          <p id="nx-gate-t" className="nx-gate__t">End of the non-calculator section</p>
          <p>
            You can&rsquo;t come back to questions 1 to {ncCount} once you move on.
            {unansweredNc > 0 ? ` You have ${unansweredNc} unanswered.` : " You've answered them all."}
          </p>
          <div className="nx-gate__btns">
            <button type="button" className="nt-btn" onClick={enterCalcSection}>Start the calculator section</button>
            <button type="button" className="nt-link" onClick={() => { setPhase("test"); setIdx(ncCount - 1); }}>Go back and check</button>
          </div>
        </div>
      )}

      {exam && phase === "review" && !marked && (
        <div className="nx-card nx-review">
          <p className="nx-gate__t">Review before marking</p>
          <p>
            {answered} of {total} answered.
            {unansweredList.length > 0 && ` Unanswered: ${unansweredList.map((q) => q.n).join(", ")}.`}
            {flaggedList.length > 0 && ` Flagged: ${flaggedList.map((q) => q.n).join(", ")}.`}
          </p>
          <div className="nx-gate__btns">
            <button type="button" className="nt-btn nt-btn--big" onClick={mark}>Mark my test</button>
            <button type="button" className="nt-link" onClick={() => { setPhase("test"); setIdx((flaggedList.find((q) => q.calculator || !ncLocked) || unansweredList[0] || questions[total - 1]).n - 1); }}>Keep working</button>
          </div>
        </div>
      )}

      {inTest && (
        <nav className="nx-map" aria-label="Question map">
          {questions.map((q, i) => {
            const locked = ncLocked && !q.calculator;
            return (
              <button
                key={q.n}
                type="button"
                className={`nx-map__b ${i === idx ? "is-on" : ""} ${isAnswered(q) ? "is-done" : ""} ${flags[q.n] ? "is-flag" : ""}`}
                disabled={locked}
                aria-current={i === idx ? "step" : undefined}
                aria-label={`Question ${q.n}${isAnswered(q) ? ", answered" : ""}${flags[q.n] ? ", flagged" : ""}${locked ? ", locked" : ""}`}
                onClick={() => go(i)}
              >
                {q.n}
              </button>
            );
          })}
        </nav>
      )}

      <ol className={`nt-list ${inTest ? "nt-list--one" : ""} ${exam && !marked && phase !== "test" ? "nt-list--hidden" : ""}`}>
        {questions.map((q, i) => {
          const r = marked ? marked.results[q.n] : null;
          const sectionStart = year >= 7 && (i === 0 || q.calculator !== questions[i - 1].calculator);
          const locked = !marked && exam && ncLocked && !q.calculator;
          return (
            <li key={q.n} className={`nt-q ${r === true ? "is-right" : r === false ? "is-wrong" : ""} ${inTest && i === idx ? "is-current" : ""}`}>
              {sectionStart && !inTest && (
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
                        <input type="radio" name={`q${q.n}`} value={j} checked={chosen} disabled={!!marked || locked} onChange={() => setAnswer(q.n, j)} />
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
                    disabled={!!marked || locked}
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

      {inTest && calcOpen && cur.calculator && <NaplanCalculator onClose={() => setCalcOpen(false)} />}

      {inTest && (
        <div className="nx-nav">
          <button type="button" className="nx-nav__b" onClick={() => go(idx - 1)} disabled={idx === 0 || (ncLocked && !questions[idx - 1]?.calculator)}>← Back</button>
          <button type="button" className={`nx-nav__flag ${flags[cur.n] ? "is-on" : ""}`} aria-pressed={!!flags[cur.n]} onClick={() => setFlags((f) => ({ ...f, [cur.n]: !f[cur.n] }))}>
            {flags[cur.n] ? "Flagged" : "Flag for review"}
          </button>
          <button type="button" className="nt-btn" onClick={next}>{idx === total - 1 ? "Finish" : "Next →"}</button>
        </div>
      )}

      {!exam && !marked && (
        <div className="nt-markbar">
          <p className="nt-markbar__count">{answered} of {total} answered</p>
          <button type="button" className="nt-btn nt-btn--big" onClick={mark} disabled={answered === 0}>Mark my test</button>
        </div>
      )}
    </div>
  );
}

function clock(s) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

function scoreLine(score, total) {
  const pct = score / total;
  if (pct >= 0.9) return "Excellent. That’s a very strong result on these questions.";
  if (pct >= 0.7) return "A solid result. The questions below marked ✗ are the ones to practise.";
  if (pct >= 0.5) return "Getting there. Work through the solutions for the ones marked ✗, then try again.";
  return "Plenty to practise. Start with the worked solutions below, one strand at a time.";
}
