"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { trackEvent } from "@/lib/analytics";
import { fixDollars } from "@/lib/md-dollars";
import { appCta } from "@/lib/study-app";
import ResultsProof from "@/components/study/ResultsProof";
import { WeeklyOptInCard, WeeklyOptInBox, isWeeklySubscribedHere, markWeeklySubscribedHere } from "@/components/study/WeeklyOptIn";
import "./exam.css";

// Free practice exam generator. Pick a year, tick topics (a main topic
// ticks all of its subtopics), and get an exam built from the checked
// questions on the topic pages. Email unlock (shared with the worksheet
// generator) and one exam a day, enforced by /api/exam/generate.
const EMAIL_KEY = "tuterly:worksheet_email";
const YEAR_KEY = "tuterly:worksheet_year";
const LAST_KEY = "tuterly:last_exam";
const MAX_Q = 20;

const store = {
  get(k) { try { return window.localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { window.localStorage.setItem(k, v); } catch {} },
};

function Md({ children }) {
  return (
    <div className="eg-md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {fixDollars(children)}
      </ReactMarkdown>
    </div>
  );
}

export default function ExamGenerator({ catalogue, placement = "exam_generator", initialYear = "Year 7" }) {
  const years = Object.keys(catalogue);
  const [year, setYear] = useState(years.includes(initialYear) ? initialYear : years[0]);
  const [picked, setPicked] = useState(() => new Set());
  const [email, setEmail] = useState("");
  const [gate, setGate] = useState(false);
  const [gateEmail, setGateEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(false);
  // Weekly worksheet email (Ryan, 9 Nov 2026): subscribers get two exams a
  // day; the card after the exam and at the limit asks again.
  const [weekly, setWeekly] = useState(false);
  const [limitSubscribed, setLimitSubscribed] = useState(null);
  const [justSubscribed, setJustSubscribed] = useState(null);
  const [exam, setExam] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [printing, setPrinting] = useState(false);
  const paperRef = useRef(null);
  const cta = appCta();
  const trackCta = (name, params) => { trackEvent(name, params); if (cta.live) trackEvent("begin_checkout", { item_id: "plus", source: "exam_generator" }); };

  useEffect(() => {
    const e = store.get(EMAIL_KEY);
    if (e) setEmail(e);
    if (isWeeklySubscribedHere()) setWeekly(true);
    const y = store.get(YEAR_KEY);
    if (y && catalogue[y]) setYear(y);
    // A chapter page can open the generator with its topics ticked:
    // /exam-generator?year=Year%209&topics=year-9-3a,year-9-3b#build
    try {
      const q = new URLSearchParams(window.location.search);
      const qy = q.get("year");
      if (qy && catalogue[qy]) {
        const valid = new Set(catalogue[qy].flatMap((g) => g.topics.map((t) => t.slug)));
        const want = (q.get("topics") || "").split(",").filter((t) => valid.has(t));
        setYear(qy);
        if (want.length) {
          setPicked(new Set(want));
          setExam(null);
          return;
        }
      }
    } catch {}
    const last = store.get(LAST_KEY);
    if (last) {
      try {
        const d = JSON.parse(last);
        if (d?.exam && Date.now() - d.at < 7 * 24 * 3600 * 1000) setExam(d.exam);
      } catch {}
    }
  }, [catalogue]);

  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(false);
    window.addEventListener("afterprint", done);
    const t = setTimeout(() => window.print(), 50);
    return () => { clearTimeout(t); window.removeEventListener("afterprint", done); };
  }, [printing]);

  const groups = catalogue[year] || [];
  const allTopics = useMemo(() => groups.flatMap((g) => g.topics), [groups]);
  const chosen = allTopics.filter((t) => picked.has(t.slug));
  const estQuestions = Math.min(MAX_Q, chosen.reduce((s, t) => s + t.count, 0));

  function changeYear(y) {
    setYear(y);
    setPicked(new Set());
    setError(null);
  }
  function toggleTopic(slug) {
    setPicked((p) => {
      const n = new Set(p);
      n.has(slug) ? n.delete(slug) : n.add(slug);
      return n;
    });
  }
  function toggleGroup(g) {
    const all = g.topics.every((t) => picked.has(t.slug));
    setPicked((p) => {
      const n = new Set(p);
      for (const t of g.topics) all ? n.delete(t.slug) : n.add(t.slug);
      return n;
    });
  }
  function toggleEverything() {
    const all = allTopics.every((t) => picked.has(t.slug));
    setPicked(all ? new Set() : new Set(allTopics.map((t) => t.slug)));
  }

  async function generate(withEmail) {
    const em = withEmail || email;
    setError(null);
    setLimit(false);
    if (!chosen.length) { setError("Tick at least one topic."); return; }
    if (!em) { setGate(true); setGateEmail(""); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/exam/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ year, topics: chosen.map((t) => t.slug), email: em }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 402 || data?.need_email) { setGate(true); return; }
      if (res.status === 429 || data?.limit) {
        setLimit(true);
        setLimitSubscribed(typeof data?.subscribed === "boolean" ? data.subscribed : null);
        setError(data?.error || "That’s your free practice exam for today.");
        trackEvent("exam_limit", { year });
        return;
      }
      if (!res.ok || !data?.exam) throw new Error(data?.error || "Something went wrong. Try again.");
      setExam(data.exam);
      setShowAnswers(false);
      store.set(LAST_KEY, JSON.stringify({ at: Date.now(), exam: data.exam }));
      trackEvent("exam_generate", { year, topics: chosen.length, questions: data.exam.questionCount, placement });
      requestAnimationFrame(() => paperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (e) {
      setError(e.message || "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitGate(e) {
    e.preventDefault();
    const em = gateEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { setError("Enter a valid email address."); return; }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/worksheets/email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: em, year_level: year, marketing_opt_in: optIn, weekly_opt_in: optIn, source: "exam_generator", source_page: typeof window !== "undefined" ? window.location.pathname : null, weekly_source: "exam_gate" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not save your email. Try again.");
      store.set(EMAIL_KEY, em);
      store.set(YEAR_KEY, year);
      if (optIn) {
        markWeeklySubscribedHere();
        setWeekly(true);
        trackEvent("weekly_opt_in", { source: "gate", year, kind: "exam" });
      }
      setEmail(em);
      trackEvent("generate_lead", { lead_type: "exam_unlock", source: placement });
      setGate(false);
      trackEvent("exam_email_unlock", { year, placement });
    } catch (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    setBusy(false);
    generate(em);
  }

  function print(withAnswers) {
    setShowAnswers(withAnswers);
    trackEvent("exam_print", { year: exam?.year, answers: withAnswers });
    setPrinting(true);
  }

  return (
    <div className="eg">
      <div className="eg-card">
        <h2 className="eg-title">Build a Maths practice exam, Years 7 to 10</h2>
        <p className="eg-lead">Pick a year, tick the topics, and get an exam with marks, a time and answers to every question.</p>

        <p className="eg-label" id="eg-year-l">1. Year level</p>
        <div className="eg-years" role="radiogroup" aria-labelledby="eg-year-l">
          {years.map((y) => (
            <button key={y} type="button" role="radio" aria-checked={y === year} className={`eg-chip ${y === year ? "is-on" : ""}`} onClick={() => changeYear(y)}>
              {y}
            </button>
          ))}
        </div>

        <div className="eg-topics-head">
          <p className="eg-label">2. Topics</p>
          <button type="button" className="eg-linkbtn" onClick={toggleEverything}>
            {allTopics.length && allTopics.every((t) => picked.has(t.slug)) ? "Clear all" : `Select all ${year} topics`}
          </button>
        </div>
        <div className="eg-groups">
          {groups.map((g) => {
            const on = g.topics.filter((t) => picked.has(t.slug)).length;
            return (
              <fieldset key={g.key} className="eg-group">
                <legend className="eg-group__legend">
                  <label className="eg-check eg-check--main">
                    <input
                      type="checkbox"
                      checked={on === g.topics.length}
                      ref={(el) => { if (el) el.indeterminate = on > 0 && on < g.topics.length; }}
                      onChange={() => toggleGroup(g)}
                    />
                    <span>{g.name}</span>
                    <small>{on ? `${on} of ${g.topics.length}` : `${g.topics.length} topics`}</small>
                  </label>
                </legend>
                <div className="eg-subs">
                  {g.topics.map((t) => (
                    <label key={t.slug} className="eg-check">
                      <input type="checkbox" checked={picked.has(t.slug)} onChange={() => toggleTopic(t.slug)} />
                      <span>{t.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>

        <div className="eg-bar">
          <p className="eg-bar__sum" aria-live="polite">
            {chosen.length
              ? <><strong>{chosen.length} topic{chosen.length === 1 ? "" : "s"}</strong> · {estQuestions} questions{estQuestions === MAX_Q && chosen.reduce((s, t) => s + t.count, 0) > MAX_Q ? " (mixed from all of them)" : ""}</>
              : "Tick a chapter to include all of its topics, or pick them one by one."}
          </p>
          <button type="button" className="eg-btn" disabled={busy || !chosen.length} onClick={() => generate()}>
            {busy ? "Building your exam…" : "Generate my exam"}
          </button>
        </div>

        {gate && (
          <form className="eg-gate" onSubmit={submitGate}>
            <p className="eg-gate__title">Unlock your free practice exam</p>
            <p className="eg-gate__text">Your email, so we can unlock it (the same unlock as the free worksheet generator). Free, no card needed.</p>
            <div style={{ margin: "12px 0" }}>
              <WeeklyOptInBox yearLevel={year} kind="exam" checked={optIn} onChange={setOptIn} disabled={busy} />
            </div>
            <div className="eg-gate__row">
              <input type="email" required autoComplete="email" placeholder="Your email" value={gateEmail} onChange={(e) => setGateEmail(e.target.value)} aria-label="Email" />
              <button type="submit" className="eg-btn" disabled={busy}>{busy ? "One moment…" : "Unlock my exam"}</button>
            </div>
          </form>
        )}

        {/* At the limit and not on the weekly email: signing up unlocks a
            second exam today. */}
        {limit && limitSubscribed === false && !weekly && email && (
          <WeeklyOptInCard
            email={email}
            yearLevel={year}
            kind="exam"
            placement="limit"
            onSubscribed={() => {
              setWeekly(true);
              setJustSubscribed("limit");
              setLimit(false);
              setLimitSubscribed(null);
              setError(null);
            }}
          />
        )}
        {justSubscribed === "limit" && !busy && (
          <p className="eg-msg eg-msg--limit" role="status" style={{ marginTop: 16 }}>
            You&rsquo;re in. Press <strong>Generate my exam</strong> for your second one today.
          </p>
        )}

        {error && (
          <div className={`eg-msg ${limit ? "eg-msg--limit" : ""}`} role="alert">
            <p>{error}</p>
            {limit && (
              <div className="eg-msg__btns">
                <Link href={cta.href} className="eg-btn eg-btn--sm" onClick={() => trackCta("exam_cta_click", { to: "app", from: "limit" })}>{cta.label}</Link>
                <Link href="/worksheets" className="eg-linkbtn">Or make a free worksheet</Link>
              </div>
            )}
          </div>
        )}
      </div>

      {exam && (
        <div ref={paperRef} className="eg-result">
          <div className="eg-tools">
            <button type="button" className="eg-btn" onClick={() => print(false)}>Print or save as PDF</button>
            <button type="button" className="eg-btn eg-btn--ghost" onClick={() => print(true)}>Print with answers</button>
            <button type="button" className="eg-btn eg-btn--ghost" onClick={() => { setShowAnswers((s) => !s); trackEvent("exam_answers", { year: exam.year }); }}>
              {showAnswers ? "Hide answers" : "Show answers and solutions"}
            </button>
          </div>
          <ExamPaper exam={exam} showAnswers={showAnswers} />
          {(!weekly || justSubscribed === "result") && email && (
            <WeeklyOptInCard
              email={email}
              yearLevel={exam.year || year}
              kind="exam"
              placement="exam_result"
              style={{ marginTop: 0 }}
              onSubscribed={() => {
                setWeekly(true);
                setJustSubscribed("result");
              }}
            />
          )}
          <div className="eg-next">
            <p className="eg-next__title">Marked it? Turn the wrong answers into marks.</p>
            <p className="eg-next__text">Snap the questions they got wrong in the Tuterly app. They get the worked solution, then fresh questions on the same idea until each one is mastered, and Topic check builds a new test whenever they want one.</p>
            <ResultsProof compact />
            <div className="eg-next__btns">
              <Link href={cta.href} className="eg-btn" onClick={() => trackCta("exam_cta_click", { to: "app", from: "result" })}>{cta.label}</Link>
              <Link href="/try" className="eg-linkbtn" onClick={() => trackEvent("exam_cta_click", { to: "try", from: "result" })}>Try it free on a question they got wrong →</Link>
            </div>
          </div>
        </div>
      )}

      {printing && exam && typeof document !== "undefined" &&
        createPortal(
          <div className="eg-print-root">
            <ExamPaper exam={exam} showAnswers={showAnswers} forPrint />
          </div>,
          document.body
        )}
    </div>
  );
}

// collapsedAnswers: when the answers aren't shown, keep them on the page in
// a closed <details> (the ready-made exams on the exam preparation pages,
// so "with answers" is true for readers and for Google).
export function ExamPaper({ exam, showAnswers, forPrint = false, collapsedAnswers = false }) {
  const all = exam.sections.flatMap((s) => s.questions);
  const answers = (
        <section className="eg-ans">
          <h4 className="eg-sec__title">Answers</h4>
          {all.map((q) => (
            <div key={q.n} className="eg-ans__item">
              <p className="eg-ans__head">
                <strong>Question {q.n}</strong> <span>{q.topic}</span>
              </p>
              <div className="eg-ans__answer"><strong>Answer:</strong> <Md>{q.answer}</Md></div>
              {!q.solution ? (
                !forPrint && q.slug ? <p className="eg-ans__more"><Link href={`/worksheets/${q.slug}`}>More practice on {q.topic.toLowerCase()} →</Link></p> : null
              ) : forPrint ? (
                <Md>{q.solution}</Md>
              ) : (
                <details className="eg-ans__sol">
                  <summary>Worked solution</summary>
                  <Md>{q.solution}</Md>
                  {q.slug && <p className="eg-ans__more"><Link href={`/worksheets/${q.slug}`}>More practice on {q.topic.toLowerCase()} →</Link></p>}
                </details>
              )}
            </div>
          ))}
        </section>
  );
  return (
    <article className={`eg-paper ${forPrint ? "is-print" : ""}`}>
      <header className="eg-paper__head">
        <p className="eg-paper__brand">Tuterly · Practice exam</p>
        <h3 className="eg-paper__title">{exam.title}</h3>
        <p className="eg-paper__topics"><strong>Topics:</strong> {exam.topics.join(", ")}</p>
        <dl className="eg-paper__meta">
          <div><dt>Questions</dt><dd>{exam.questionCount}</dd></div>
          <div><dt>Total marks</dt><dd>{exam.totalMarks}</dd></div>
          <div><dt>Suggested time</dt><dd>{exam.minutes} minutes</dd></div>
        </dl>
        <p className="eg-paper__inst">Answer every question and show your working. Marks are given for working, not just the final answer.</p>
        <div className="eg-paper__name"><span>Name</span><span>Date</span><span>Mark ____ / {exam.totalMarks}</span></div>
      </header>

      {exam.sections.map((s) => (
        <section key={s.title} className="eg-sec">
          <h4 className="eg-sec__title">{s.title}</h4>
          <ol className="eg-qs">
            {s.questions.map((q) => (
              <li key={q.n} className="eg-q">
                <div className="eg-q__head">
                  <span className="eg-q__n">Question {q.n}</span>
                  <span className="eg-q__marks">{q.marks} mark{q.marks === 1 ? "" : "s"}</span>
                </div>
                <Md>{q.question}</Md>
                <div className="eg-q__space" aria-hidden="true" style={{ minHeight: `${2 + q.marks * 1.6}cm` }} />
              </li>
            ))}
          </ol>
        </section>
      ))}

      {showAnswers && answers}
      {!showAnswers && collapsedAnswers && (
        <details className="eg-ans-toggle">
          <summary>Show the answers and worked solutions</summary>
          {answers}
        </details>
      )}
      <p className="eg-paper__foot">tuterly.com.au · Free practice exam · Questions from Tuterly&rsquo;s topic pages and topic tests, every answer checked.</p>
    </article>
  );
}
