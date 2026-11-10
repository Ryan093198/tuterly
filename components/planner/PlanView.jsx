"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { appCta } from "@/lib/study-app";
import { Quinn } from "@/components/brand";

// A saved maths exam study plan (/plan/[id]), redesigned 10 Nov 2026 (Ryan:
// make it enjoyable, and make each ticked night feel like an achievement).
// The plan is a trail of stops ending at exam day. The next stop is open;
// done stops get a stamp; ticking one fires a small burst and a message.
// Ticks are saved on the server, so a student and parent sharing the link
// see the same progress.

const fmt = (iso, opts) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", { timeZone: "UTC", ...opts });
const dayLabel = (iso) => fmt(iso, { weekday: "short", day: "numeric", month: "short" });
// When a night was ticked, in Melbourne time.
const tickedLabel = (ts) => {
  const d = new Date(ts);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-AU", { timeZone: "Australia/Melbourne", weekday: "short", day: "numeric", month: "short" });
};

// What each task is, for its icon.
function taskKind(t) {
  if (t.app) return "snap";
  const x = t.text.toLowerCase();
  if (x.includes("mind map")) return "map";
  if (x.includes("practice exam") || x.includes("practice test") || x.includes("timed")) return "timer";
  if (x.includes("formula")) return "sheet";
  if (x.includes("mark it")) return "tick";
  if (x.includes("sleep") || x.includes("pack")) return "moon";
  return "book";
}

// Which step of the Tuterly Method (Snap. Fix. Ace.) a task is, for its
// label. Worked out from the task, so plans saved earlier get it too.
function methodStep(t) {
  const x = t.text.toLowerCase();
  if (x.includes("redo the questions you snapped")) return "fix";
  if (t.app) return "snap";
  if (x.includes("practice exam") || x.includes("practice test")) return "test";
  if (x.includes("practice set") || x.includes("worked solutions") || x.includes("redo anything")) return "fix";
  return null;
}
const STEP_LABEL = { snap: "Snap", fix: "Fix", test: "Ace" };

function Glyph({ kind }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (kind) {
    case "snap":
      return <svg {...p}><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>;
    case "map":
      return <svg {...p}><circle cx="12" cy="12" r="2.5" /><circle cx="5" cy="6" r="1.8" /><circle cx="19" cy="6" r="1.8" /><circle cx="6" cy="19" r="1.8" /><circle cx="18" cy="18" r="1.8" /><path d="M10 10.5 6.4 7.2M14 10.5l3.6-3.3M10.2 13.8 7.3 17.6M13.9 13.7l2.7 3" /></svg>;
    case "timer":
      return <svg {...p}><circle cx="12" cy="13.5" r="7" /><path d="M12 13.5V10M9.5 3h5M12 3v3.5" /></svg>;
    case "sheet":
      return <svg {...p}><path d="M6 3h9l4 4v14H6z" /><path d="M9 11h6M9 15h6M9 7h3" /></svg>;
    case "tick":
      return <svg {...p}><path d="M5 12.5l4.5 4.5L19 7" /></svg>;
    case "moon":
      return <svg {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>;
    default:
      return <svg {...p}><path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5V19c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z" /><path d="M12 6v13.5" /></svg>;
  }
}

// The marker on the trail for each kind of night.
function Marker({ n, index, done }) {
  if (done) {
    return (
      <span className="pv-node pv-node--done" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
      </span>
    );
  }
  if (n.kind === "practice_exam") {
    return (
      <span className="pv-node pv-node--exam" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" /></svg>
      </span>
    );
  }
  if (n.kind === "review") {
    return (
      <span className="pv-node pv-node--review" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
      </span>
    );
  }
  return <span className="pv-node" aria-hidden="true">{index + 1}</span>;
}

// A short burst of confetti from the button that was pressed.
function Burst({ id }) {
  const bits = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      a: (i / 16) * 360 + (i % 3) * 7,
      d: 46 + (i % 4) * 14,
      c: ["var(--pv-teal)", "var(--pv-sun)", "var(--pv-violet)", "var(--pv-coral)"][i % 4],
      s: i % 2 ? "pv-bit--sq" : "",
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );
  return (
    <span className="pv-burst" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} className={`pv-bit ${b.s}`} style={{ "--a": `${b.a}deg`, "--d": `${b.d}px`, background: b.c }} />
      ))}
    </span>
  );
}

function cheer(count, total, kind) {
  if (count === total) return "Every night done. You’re ready for this.";
  const left = total - count;
  if (kind === "practice_exam") return `Practice exam done. That’s the hardest night. ${left} to go.`;
  if (count === Math.ceil(total / 2)) return `Halfway to exam day. ${left} to go.`;
  if (count === 1) return "First night done. That’s the hardest one to start.";
  if (left === 1) return "One night left.";
  return `${count} down, ${left} to go.`;
}

export default function PlanView({ id, plan, initialDone, role, today, checkIns }) {
  const [done, setDone] = useState(initialDone || {});
  const [view, setView] = useState(role === "parent" ? "parent" : "plan");
  const [open, setOpen] = useState({});
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [burst, setBurst] = useState(null);
  const toastTimer = useRef(null);
  const cta = appCta();

  const total = plan.nights.length;
  const count = plan.nights.filter((n) => done[n.key]).length;
  const nextKey = useMemo(() => plan.nights.find((n) => !done[n.key])?.key, [plan, done]);
  const daysToExam = Math.round((Date.parse(`${plan.examDate}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);
  const allDone = total > 0 && count === total;

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  async function toggle(n) {
    const next = !done[n.key];
    setSaving(n.key);
    setError(null);
    const before = done;
    const optimistic = { ...done };
    if (next) optimistic[n.key] = new Date().toISOString();
    else delete optimistic[n.key];
    setDone(optimistic);
    if (next) {
      const c = plan.nights.filter((x) => optimistic[x.key]).length;
      setBurst({ key: n.key, id: Date.now() });
      setToast(cheer(c, total, n.kind));
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 3600);
    }
    try {
      const res = await fetch(`/api/study-plan/${id}/tick`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key: n.key, done: next }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "That didn’t save. Check your connection and try again.");
      setDone(data.done || {});
      if (next) trackEvent("plan_night_done", { year: plan.year, kind: n.kind });
    } catch (e) {
      setError(e.message);
      setDone(before);
      setToast(null);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="pv">
      <header className="pv-top">
        <div className="pv-ticket" aria-label={`${plan.year} maths exam on ${fmt(plan.examDate, { weekday: "long", day: "numeric", month: "long" })}`}>
          <div className="pv-ticket__main">
            <p className="pv-ticket__k">{plan.year} maths exam</p>
            <p className="pv-ticket__date">{fmt(plan.examDate, { weekday: "long", day: "numeric", month: "long" })}</p>
            <p className="pv-ticket__topics">{plan.chapters.map((c) => c.name).join("; ")}</p>
          </div>
          <div className="pv-ticket__stub">
            {daysToExam > 0 ? (
              <>
                <span className="pv-ticket__n">{daysToExam}</span>
                <span className="pv-ticket__u">{daysToExam === 1 ? "day to go" : "days to go"}</span>
              </>
            ) : (
              <span className="pv-ticket__u pv-ticket__u--big">{daysToExam === 0 ? "Today. You’ve got this." : "Exam done"}</span>
            )}
          </div>
        </div>

        <div className="pv-beads" role="img" aria-label={`${count} of ${total} nights done`}>
          {plan.nights.map((n) => (
            <span key={n.key} className={`pv-bead ${done[n.key] ? "is-done" : ""} ${n.key === nextKey ? "is-next" : ""} pv-bead--${n.kind}`} />
          ))}
        </div>
        <p className="pv-count"><strong>{count} of {total}</strong> nights done</p>

        <div className="pv-switch" role="tablist" aria-label="Show">
          <button type="button" role="tab" aria-selected={view === "plan"} className={view === "plan" ? "is-on" : ""} onClick={() => setView("plan")}>The plan</button>
          <button type="button" role="tab" aria-selected={view === "parent"} className={view === "parent" ? "is-on" : ""} onClick={() => setView("parent")}>Parent notes</button>
          <button type="button" className="pv-print" onClick={() => window.print()}>Print</button>
        </div>
      </header>

      {error && <p className="pv-error" role="alert">{error}</p>}

      {view === "parent" && (
        <section className="pv-parent" aria-labelledby="pv-parent-h">
          <h2 id="pv-parent-h">Your part takes a minute a week</h2>
          <p>You don&rsquo;t need to remember the maths. The plan tells them what to do, and every night they finish shows up here. These are the moments worth a word:</p>
          <ol className="pv-weeks">
            {checkIns.map((w) => (
              <li key={w.week}>
                <p className="pv-weeks__h">Week {w.week}, from {dayLabel(w.from)}</p>
                <ul>{w.tips.map((t) => <li key={t}>{t}</li>)}</ul>
              </li>
            ))}
          </ol>
        </section>
      )}

      <ol className="pv-trail">
        {plan.nights.map((n, i) => {
          const isDone = !!done[n.key];
          const isNext = n.key === nextKey;
          const missed = !isDone && n.date < today;
          const expanded = isNext || open[n.key];
          const prevDone = i === 0 ? true : !!done[plan.nights[i - 1].key];
          return (
            <Fragment key={n.key}>
            <li
              className={`pv-stop pv-stop--${n.kind} ${isDone ? "is-done" : ""} ${isNext ? "is-next" : ""} ${prevDone ? "is-reached" : ""}`}
            >
              <Marker n={n} index={i} done={isDone} />
              <div className="pv-card">
                <div className="pv-card__head">
                  <p className="pv-when">
                    {n.date === today ? <span className="pv-tonight">Tonight</span> : dayLabel(n.date)}
                    {missed && <span className="pv-catch">Catch up</span>}
                  </p>
                  <h3 className="pv-title">{n.title}</h3>
                  {isDone && (
                    <span className="pv-stamp" aria-label="Done">
                      <span>Done</span>
                      <small>{tickedLabel(done[n.key])}</small>
                    </span>
                  )}
                </div>

                {!isDone && n.topics?.length > 0 && (
                  <ul className={`pv-topics ${expanded ? "" : "is-collapsed"}`} aria-label="Tonight's topics">
                    {n.topics.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}

                {!isDone && (
                  <ul className={`pv-tasks ${expanded ? "" : "is-collapsed"}`}>
                    {n.tasks.map((t, k) => (
                      <li key={k} className={`pv-task pv-task--${taskKind(t)}`}>
                        <span className="pv-task__i"><Glyph kind={taskKind(t)} /></span>
                        <span className="pv-task__t">
                          {methodStep(t) && <span className={`pv-step pv-step--${methodStep(t)}`}>{STEP_LABEL[methodStep(t)]}</span>}
                          {t.href ? <Link href={t.href}>{t.text}</Link> : t.text}
                          {t.app && (
                            <Link className="pv-app" href={cta.href} onClick={() => trackEvent("plan_app_click", { kind: n.kind, live: cta.live })}>
                              {cta.live ? "Open Tuterly" : "Get Tuterly"}
                            </Link>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pv-actions">
                  {!isDone && (
                    <button type="button" className="pv-done-btn" disabled={saving === n.key} onClick={() => toggle(n)}>
                      {!isNext ? "Mark done" : n.kind === "practice_exam" ? "Practice exam done" : n.kind === "review" ? "Ready for tomorrow" : "Done for tonight"}
                      {burst?.key === n.key && <Burst id={burst.id} />}
                    </button>
                  )}
                  {isDone && (
                    <button type="button" className="pv-undo" disabled={saving === n.key} onClick={() => toggle(n)}>Undo</button>
                  )}
                  {!isDone && !isNext && (
                    <button type="button" className="pv-peek" aria-expanded={!!open[n.key]} onClick={() => setOpen((o) => ({ ...o, [n.key]: !o[n.key] }))}>
                      {open[n.key] ? "Hide the tasks" : "See the tasks"}
                    </button>
                  )}
                </div>
              </div>
            </li>
            {isNext && (
              <li className="pv-aside" aria-label="What the Tuterly app adds">
                <div className="pv-aside__card">
                  <p className="pv-aside__t">The plan gets you through the topics. Tuterly makes the mistakes stick.</p>
                  <p className="pv-aside__m">Every night follows <Link href="/method">Snap. Fix. Ace.</Link> Snap what you got wrong, fix it, then ace a practice test.</p>
                  <ul className="pv-aside__list">
                    <li><strong>Free here:</strong> one practice set and one practice exam a day, with answers.</li>
                    <li><strong>In Tuterly:</strong> unlimited questions on exactly what you got wrong, each with a worked solution, until you&rsquo;ve mastered it.</li>
                    <li><strong>Exam Zone:</strong> upload your test outline and past papers, and get practice exams in your school&rsquo;s style.</li>
                  </ul>
                  <Link className="pv-aside__btn" href={cta.href} onClick={() => trackEvent("plan_app_click", { kind: "aside", live: cta.live })}>
                    {cta.live ? "Try Tuterly free" : cta.label}
                  </Link>
                </div>
              </li>
            )}
            </Fragment>
          );
        })}

        <li className={`pv-stop pv-stop--finish ${allDone ? "is-reached is-done" : ""}`}>
          <span className="pv-node pv-node--flag" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4" /><path d="M5 4h12l-2.5 4L17 12H5" fill="currentColor" /></svg>
          </span>
          <div className="pv-finish">
            <div>
              <p className="pv-when">{dayLabel(plan.examDate)}</p>
              <h3 className="pv-title">Exam day</h3>
              <p className="pv-finish__x">{allDone ? "Every night ticked off. Walk in knowing you’ve done the work." : "Get here with every night ticked off, and you’ll walk in ready."}</p>
            </div>
            {allDone && <Quinn pose="celebrate" size={96} className="pv-quinn" />}
          </div>
        </li>
      </ol>

      <p className="pv-foot">
        Date or topics changed? <Link href="/study-planner">Make a new plan</Link> and we&rsquo;ll email you the new link.
      </p>

      <div className={`pv-toast ${toast ? "is-on" : ""}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}
