"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { appCta } from "@/lib/study-app";

// A saved maths exam study plan (/plan/[id]). Nights tick off on the
// server, so a student and parent sharing the link see the same progress.

const fmt = (iso, opts) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", { timeZone: "UTC", ...opts });
const dayLabel = (iso) => fmt(iso, { weekday: "short", day: "numeric", month: "short" });

export default function PlanView({ id, plan, initialDone, role, today, checkIns }) {
  const [done, setDone] = useState(initialDone || {});
  const [view, setView] = useState(role === "parent" ? "parent" : "student");
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState(null);
  const cta = appCta();

  const total = plan.nights.length;
  const count = plan.nights.filter((n) => done[n.key]).length;
  const nextKey = useMemo(() => plan.nights.find((n) => !done[n.key] && n.date >= today)?.key, [plan, done, today]);
  const daysToExam = Math.round((Date.parse(`${plan.examDate}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);

  async function toggle(n) {
    const next = !done[n.key];
    setSaving(n.key);
    setError(null);
    setDone((d) => {
      const c = { ...d };
      if (next) c[n.key] = new Date().toISOString();
      else delete c[n.key];
      return c;
    });
    try {
      const res = await fetch(`/api/study-plan/${id}/tick`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key: n.key, done: next }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Couldn't save that. Try again.");
      setDone(data.done || {});
      if (next) trackEvent("plan_night_done", { year: plan.year, kind: n.kind });
    } catch (e) {
      setError(e.message);
      setDone((d) => {
        const c = { ...d };
        if (next) delete c[n.key];
        else c[n.key] = true;
        return c;
      });
    } finally {
      setSaving(null);
    }
  }

  return (
    <>
      <header className="sh-hero pl-hero">
        <p className="sh-eyebrow">{plan.year} maths exam plan</p>
        <h1>{daysToExam > 0 ? `${daysToExam} day${daysToExam === 1 ? "" : "s"} to the exam` : daysToExam === 0 ? "Exam day. Good luck!" : "Exam done"}</h1>
        <p className="sh-lead">
          Exam on {fmt(plan.examDate, { weekday: "long", day: "numeric", month: "long" })}. Topics: {plan.chapters.map((c) => c.name).join("; ")}.
        </p>
        <div className="pl-progress" role="img" aria-label={`${count} of ${total} nights done`}>
          <div className="pl-progress__bar"><span style={{ width: `${total ? (count / total) * 100 : 0}%` }} /></div>
          <p className="pl-progress__t"><strong>{count} of {total}</strong> nights done</p>
        </div>
        <div className="pl-tabs" role="tablist" aria-label="View">
          <button type="button" role="tab" aria-selected={view === "student"} className={view === "student" ? "is-on" : ""} onClick={() => setView("student")}>The plan</button>
          <button type="button" role="tab" aria-selected={view === "parent"} className={view === "parent" ? "is-on" : ""} onClick={() => setView("parent")}>For parents</button>
          <button type="button" className="pl-print" onClick={() => window.print()}>Print</button>
        </div>
      </header>

      <main className="sh-wrap pl-wrap">
        {error && <p className="pl-error" role="alert">{error}</p>}

        {view === "parent" && (
          <section className="pl-parent" aria-labelledby="pl-parent-h">
            <h2 id="pl-parent-h">Your part: a quick check-in each week</h2>
            <p className="pl-parent__lead">You don&rsquo;t need to remember the maths. The plan tells them what to do each night, and you can see every night they tick off here. These are the moments worth a word:</p>
            <ol className="pl-weeks">
              {checkIns.map((w) => (
                <li key={w.week}>
                  <p className="pl-weeks__h">Week {w.week} <span>from {dayLabel(w.from)}</span></p>
                  <ul>{w.tips.map((t) => <li key={t}>{t}</li>)}</ul>
                </li>
              ))}
            </ol>
          </section>
        )}

        <ol className="pl-nights">
          {plan.nights.map((n) => {
            const isDone = !!done[n.key];
            const past = n.date < today;
            return (
              <li key={n.key} className={`pl-night pl-night--${n.kind} ${isDone ? "is-done" : ""} ${n.key === nextKey ? "is-next" : ""} ${past && !isDone ? "is-missed" : ""}`}>
                <div className="pl-night__head">
                  <span className="pl-night__date">{n.date === today ? "Tonight" : dayLabel(n.date)}</span>
                  <h3 className="pl-night__title">{n.title}</h3>
                </div>
                <ul className="pl-tasks">
                  {n.tasks.map((t, i) => (
                    <li key={i} className={t.app ? "is-app" : ""}>
                      {t.href ? <Link href={t.href}>{t.text}</Link> : <span>{t.text}</span>}
                      {t.app && <Link className="pl-app" href={cta.href} onClick={() => trackEvent("plan_app_click", { kind: n.kind, live: cta.live })}>{cta.live ? "Open Tuterly" : cta.label}</Link>}
                    </li>
                  ))}
                </ul>
                <label className="pl-check">
                  <input type="checkbox" checked={isDone} disabled={saving === n.key} onChange={() => toggle(n)} />
                  <span>{isDone ? "Done" : "Mark this night done"}</span>
                </label>
              </li>
            );
          })}
        </ol>

        <p className="pl-foot">
          Plans change. If the exam date or topics move, <Link href="/study-planner">make a new plan</Link> and it&rsquo;ll be emailed to you.
        </p>
      </main>
    </>
  );
}
