"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { trackEvent } from "@/lib/analytics";
import { fixDollars } from "@/lib/md-dollars";
import { appCta } from "@/lib/study-app";

// The student side of a Teacher Zone paper (/paper/[id]). Answers are kept
// in this browser until submitted, then marked by /api/papers/[id]/mark,
// which sends back the answers and worked solutions.

function Md({ children }) {
  return (
    <div className="eg-md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {fixDollars(children)}
      </ReactMarkdown>
    </div>
  );
}

const store = {
  get(k) { try { return window.localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { window.localStorage.setItem(k, v); } catch {} },
};

export default function PaperClient({ paper }) {
  const draftKey = `tuterly:paper:${paper.id}`;
  const questions = useMemo(() => paper.sections.flatMap((s) => s.questions), [paper]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [confirmBlank, setConfirmBlank] = useState(false);
  const topRef = useRef(null);
  const cta = appCta();

  useEffect(() => {
    try {
      const d = JSON.parse(store.get(draftKey) || "null");
      if (d?.result) setResult(d.result);
      if (d?.answers) setAnswers(d.answers);
    } catch {}
  }, [draftKey]);

  function setPart(n, i, v) {
    setAnswers((a) => {
      const next = { ...a, [n]: Object.assign([], a[n] || [], { [i]: v }) };
      store.set(draftKey, JSON.stringify({ answers: next }));
      return next;
    });
    setConfirmBlank(false);
  }

  const blanks = questions.reduce((c, q) => c + q.parts.filter((_, i) => !String(answers[q.n]?.[i] || "").trim()).length, 0);

  async function submit() {
    if (blanks && !confirmBlank) { setConfirmBlank(true); return; }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/papers/${paper.id}/mark`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Something went wrong. Try again.");
      setResult(data);
      store.set(draftKey, JSON.stringify({ answers, result: data }));
      trackEvent("paper_submit", { year: paper.year, score: data.score, total: data.total, questions: data.questions });
      requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  const byN = result ? Object.fromEntries(result.results.map((r) => [r.n, r])) : {};
  const pct = result ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <>
      <header className="sh-hero pp-hero" ref={topRef}>
        <p className="sh-eyebrow">{paper.year} maths · Practice test</p>
        <h1>{paper.title}</h1>
        <p className="sh-lead"><strong>Topics:</strong> {paper.topics.join(", ")}</p>
        <p className="pp-meta">{paper.questionCount} questions · {paper.totalMarks} marks · about {paper.minutes} minutes</p>
        {!result && <p className="pp-inst">Work each question out on paper, then type your answer in the box. When you&rsquo;ve finished, press <strong>Mark my test</strong> to get your mark and the worked solutions.</p>}
      </header>

      {result && (
        <section className="sh-wrap pp-score" aria-live="polite">
          <div className="pp-score__card">
            <p className="pp-score__big">{result.score} / {result.total}</p>
            <p className="pp-score__sub">{pct}% · {result.correct} of {result.questions} questions fully right</p>
            <p className="pp-score__msg">{pct >= 85 ? "Excellent work. Check the worked solutions for anything you missed." : pct >= 60 ? "Good effort. Go through the worked solutions for the ones you missed, then try those topics again." : "Have a look at the worked solutions below, then practise the topics you found hard."}</p>
          </div>
          <div className="pp-cta">
            <p className="pp-cta__t">Keep going with unlimited practice</p>
            <p className="pp-cta__x">The Tuterly app writes fresh questions on exactly what you got wrong, with a worked solution for each one, on every Years 7 to 10 topic. All aligned to the Victorian Curriculum.</p>
            <Link href={cta.href} className="tb-btn tb-btn--primary" onClick={() => trackEvent("paper_cta_click", { to: "app", from: "score", live: cta.live })}>{cta.live ? "Try Tuterly free" : cta.label}</Link>
          </div>
        </section>
      )}

      <main className="sh-wrap pp-wrap">
        {paper.sections.map((s) => (
          <section key={s.title} className="pp-sec">
            <h2 className="eg-sec__title">{s.title}</h2>
            <ol className="pp-qs">
              {s.questions.map((q) => {
                const r = byN[q.n];
                return (
                  <li key={q.n} className={`pp-q ${r ? (r.correct ? "is-right" : r.got > 0 ? "is-part" : "is-wrong") : ""}`}>
                    <div className="eg-q__head">
                      <span className="eg-q__n">Question {q.n}</span>
                      <span className="eg-q__marks">{r ? `${r.got} / ${q.marks}` : `${q.marks} mark${q.marks === 1 ? "" : "s"}`}</span>
                    </div>
                    <Md>{q.question}</Md>
                    <div className="pp-parts">
                      {q.parts.map((p, i) => {
                        const id = `q${q.n}-${i}`;
                        const ok = r?.parts?.[i];
                        return (
                          <div key={i} className={`pp-part ${r ? (ok ? "is-right" : "is-wrong") : ""}`}>
                            <label htmlFor={id} className="pp-part__label">{p.label ? `(${p.label})` : "Answer"}</label>
                            <div className="pp-part__box">
                              {p.unit === "$" && <span className="pp-part__unit">$</span>}
                              <input
                                id={id}
                                type="text"
                                inputMode="text"
                                autoComplete="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                value={answers[q.n]?.[i] || ""}
                                onChange={(e) => setPart(q.n, i, e.target.value)}
                                disabled={!!result}
                                aria-describedby={`${id}-h`}
                              />
                              {p.unit && p.unit !== "$" && <span className="pp-part__unit">{p.unit}</span>}
                              {r && <span className="pp-part__mark" aria-label={ok ? "Correct" : "Not correct"}>{ok ? "✓" : "✗"}</span>}
                            </div>
                            <span id={`${id}-h`} className="pp-part__hint">{p.hint}</span>
                          </div>
                        );
                      })}
                    </div>
                    {r && (
                      <div className="pp-fb">
                        <div className="pp-fb__ans"><strong>Answer:</strong> <Md>{r.answer}</Md></div>
                        {r.solution && (
                          <details className="pp-fb__sol" open={!r.correct}>
                            <summary>Worked solution</summary>
                            <Md>{r.solution}</Md>
                          </details>
                        )}
                        {!r.correct && r.slug && <p className="pp-fb__more"><Link href={`/worksheets/${r.slug}`}>More practice on {r.topic.toLowerCase()} →</Link></p>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        {!result && (
          <div className="pp-submit">
            {confirmBlank && <p className="pp-submit__warn" role="alert">You&rsquo;ve left {blanks} answer box{blanks === 1 ? "" : "es"} empty. Press the button again to mark your test anyway.</p>}
            {error && <p className="pp-submit__warn" role="alert">{error}</p>}
            <button type="button" className="tb-btn tb-btn--primary pp-submit__btn" disabled={busy} onClick={submit}>
              {busy ? "Marking…" : confirmBlank ? "Mark it anyway" : "Mark my test"}
            </button>
            <p className="pp-submit__note">Your answers are saved on this device as you go.</p>
          </div>
        )}

        {result && (
          <div className="pp-cta pp-cta--end">
            <p className="pp-cta__t">Want more questions like these?</p>
            <p className="pp-cta__x">Try Tuterly for unlimited worksheets and practice tests on every topic, aligned to the Victorian Curriculum. Snap any question you get wrong and get the worked solution, then fresh questions until you&rsquo;ve got it.</p>
            <Link href={cta.href} className="tb-btn tb-btn--primary" onClick={() => trackEvent("paper_cta_click", { to: "app", from: "end", live: cta.live })}>{cta.live ? "Try Tuterly free" : cta.label}</Link>
          </div>
        )}
      </main>
    </>
  );
}
