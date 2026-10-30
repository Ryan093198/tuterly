"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

// Ten scholarship-style numerical reasoning questions for the chosen
// level, marked on the page, then worked solutions, a skill-by-skill
// "practise at home" tip for anything missed, and the Tuterly Scholarship
// waitlist. Questions and solutions arrive already rendered.
//
// levels: [{ entry, year, label, sub }]
// sets: { [entry]: { questions: [{ n, topic, skill, home, answer, stim, q, opts: [{key, el}], sol }] } }
export default function SchPractice({ levels, sets, provider = null, sourcePage }) {
  const [entry, setEntry] = useState(7);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState(null);
  const started = useRef(false);
  const resultsRef = useRef(null);
  const questions = sets[entry]?.questions || [];
  const level = levels.find((l) => l.entry === entry);

  function pickLevel(e) {
    setEntry(e);
    setAnswers({});
    setMarked(null);
    trackEvent("sch_level", { entry: e, provider });
  }
  function choose(n, key) {
    if (marked) return;
    if (!started.current) { started.current = true; trackEvent("sch_start", { entry, provider }); }
    setAnswers((a) => ({ ...a, [n]: key }));
  }
  function mark() {
    const results = Object.fromEntries(questions.map((q) => [q.n, answers[q.n] === q.answer]));
    const score = Object.values(results).filter(Boolean).length;
    setMarked({ results, score });
    trackEvent("sch_mark", { entry, provider, score, answered: Object.keys(answers).length });
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
  function reset() {
    setAnswers({});
    setMarked(null);
    document.getElementById("sch-test")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const answered = Object.keys(answers).length;
  const total = questions.length;
  const missed = marked ? questions.filter((q) => !marked.results[q.n]) : [];
  const tips = [];
  for (const q of missed) if (!tips.find((t) => t.skill === q.skill)) tips.push(q);

  return (
    <div className="nt sch">
      <div className="sch-levels" role="radiogroup" aria-label="Your child's year now">
        <span className="sch-levels__label">My child is in</span>
        {levels.map((l) => (
          <button key={l.entry} type="button" role="radio" aria-checked={l.entry === entry}
            className={`sch-level ${l.entry === entry ? "is-on" : ""}`} onClick={() => pickLevel(l.entry)}>
            <strong>{l.label}</strong><small>{l.sub}</small>
          </button>
        ))}
      </div>

      {marked && (
        <section ref={resultsRef} className="nt-results" aria-live="polite">
          <p className="nt-results__eyebrow">Your result · {level.label}, {level.sub}</p>
          <p className="nt-results__score">{marked.score} <span>out of {total}</span></p>
          <p className="nt-results__line">{scoreLine(marked.score, total)}</p>
          {tips.length > 0 && (
            <div className="sch-tips">
              <p className="sch-tips__title">Skills to practise</p>
              <ul>
                {tips.slice(0, 4).map((t) => (
                  <li key={t.skill}><strong>{t.skill}</strong> ({t.topic}). {t.home}</li>
                ))}
              </ul>
            </div>
          )}
          <WaitlistBox entry={entry} year={level.year} provider={provider} score={marked.score} sourcePage={sourcePage} />
          <button type="button" className="nt-link nt-retry" onClick={reset}>Clear my answers and try again</button>
        </section>
      )}

      <ol className="nt-list">
        {questions.map((q, i) => {
          const r = marked ? marked.results[q.n] : null;
          const showStim = q.stim && (i === 0 || questions[i - 1].stim_id !== q.stim_id);
          return (
            <li key={`${entry}-${q.n}`} className={`nt-q ${r === true ? "is-right" : r === false ? "is-wrong" : ""}`}>
              {showStim && <div className="sch-stim">{q.stim}</div>}
              <div className="nt-q__head">
                <span className="nt-q__num">Question {q.n}</span>
                <span className="nt-q__strand">{q.topic}</span>
                {r !== null && <span className={`nt-q__mark ${r ? "is-right" : "is-wrong"}`}>{r ? "✓ Correct" : "✗ Not quite"}</span>}
              </div>
              {q.q}
              <div className="nt-opts" role="radiogroup" aria-label={`Question ${q.n} options`}>
                {q.opts.map((o) => {
                  const chosen = answers[q.n] === o.key;
                  const isAnswer = marked && o.key === q.answer;
                  return (
                    <label key={o.key} className={`nt-opt ${chosen ? "is-chosen" : ""} ${isAnswer ? "is-answer" : ""}`}>
                      <input type="radio" name={`sch-${entry}-${q.n}`} value={o.key} checked={chosen} disabled={!!marked} onChange={() => choose(q.n, o.key)} />
                      <span className="nt-opt__letter" aria-hidden="true">{o.key}</span>
                      <span className="nt-opt__text">{o.el}</span>
                    </label>
                  );
                })}
              </div>
              {marked && (
                <details className="nt-sol" open={r === false}>
                  <summary>{r ? "See the worked solution" : `See the worked solution (answer ${q.answer})`}</summary>
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
          <button type="button" className="nt-btn nt-btn--big" onClick={mark} disabled={answered === 0}>Mark my answers</button>
        </div>
      )}
    </div>
  );
}

export function WaitlistBox({ entry, year, provider, score, sourcePage }) {
  const [email, setEmail] = useState("");
  const [test, setTest] = useState(provider || "");
  const [hp, setHp] = useState("");
  const [state, setState] = useState("idle"); // idle | busy | done | error
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/scholarship-waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email, role: "parent", child_year: year, test_provider: test || "not_sure",
          practice_score: score, practice_level: entry, source_page: sourcePage, company_website: hp,
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d?.error || "Something went wrong. Try again.");
      setState("done");
      trackEvent("sch_waitlist", { entry, provider, score });
    } catch (err) {
      setMsg(err.message);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="sch-wl sch-wl--done">
        <p className="sch-wl__title">You&rsquo;re on the list.</p>
        <p className="sch-wl__text">We&rsquo;ll email you once, when Tuterly Scholarship is ready, and you&rsquo;ll get the launch discount.</p>
      </div>
    );
  }
  return (
    <form className="sch-wl" onSubmit={submit}>
      <p className="sch-wl__title">Want the full 40-question test, and practice on every question they miss?</p>
      <p className="sch-wl__text">
        Tuterly Scholarship is coming soon. It starts with a full numerical reasoning diagnostic, then has your child drill the exact questions they got wrong until each one is mastered. <strong>Sign up now to hear when it&rsquo;s ready and get the launch discount.</strong>
      </p>
      <div className="sch-wl__row">
        <input type="email" required autoComplete="email" placeholder="Parent's email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Parent's email" />
        <select value={test} onChange={(e) => setTest(e.target.value)} aria-label="Which test">
          <option value="">Which test?</option>
          <option value="acer">ACER</option>
          <option value="edutest">Edutest</option>
          <option value="aas">AAS</option>
          <option value="selective">Selective school test</option>
          <option value="not_sure">Not sure yet</option>
        </select>
        <button type="submit" className="nt-btn" disabled={state === "busy"}>{state === "busy" ? "One moment…" : "Notify me and get the discount"}</button>
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="sch-hp" aria-hidden="true" name="company_website" />
      {state === "error" && <p className="sch-wl__err" role="alert">{msg}</p>}
      <p className="sch-wl__small">One email when it launches. No spam, and you can ask to be removed any time.</p>
    </form>
  );
}

function scoreLine(score, total) {
  const pct = score / total;
  if (pct >= 0.9) return "Excellent. That’s a scholarship-ready result on these questions.";
  if (pct >= 0.7) return "A strong result. The ones marked ✗ show exactly what to practise next.";
  if (pct >= 0.5) return "A good start. Read the worked solutions for the ones marked ✗, then practise those skills.";
  return "Plenty to work on, which is normal this far out. Start with the worked solutions and the skills below.";
}
