"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

// The maths exam study planner form (/study-planner). The plan is built on
// the server and emailed as a private link (Ryan, 9 Nov 2026).

const YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];
const DAYS = [
  [1, "Mon"], [2, "Tue"], [3, "Wed"], [4, "Thu"], [5, "Fri"], [6, "Sat"], [0, "Sun"],
];
const EMAIL_KEY = "tuterly:worksheet_email";

const iso = (d) => d.toISOString().slice(0, 10);
const plusDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return iso(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())));
};

export default function StudyPlannerForm({ chaptersByYear }) {
  const [role, setRole] = useState("student");
  const [year, setYear] = useState("Year 9");
  const [chapters, setChapters] = useState([]);
  const [examDate, setExamDate] = useState("");
  const [weekdays, setWeekdays] = useState([1, 2, 3, 4, 0]);
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(null);

  useEffect(() => {
    try {
      const e = window.localStorage.getItem(EMAIL_KEY);
      if (e) setEmail(e);
    } catch {}
  }, []);

  const list = useMemo(() => chaptersByYear[year] || [], [chaptersByYear, year]);
  useEffect(() => setChapters([]), [year]);

  const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (!chapters.length) return setError("Tick at least one topic that's on the test.");
    if (!examDate) return setError("Choose the exam date.");
    if (!weekdays.length) return setError("Choose at least one night a week.");
    setBusy(true);
    try {
      const res = await fetch("/api/study-plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, role, year, examDate, chapters, weekdays, marketing_opt_in: optIn }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Try again.");
      try { window.localStorage.setItem(EMAIL_KEY, email.trim().toLowerCase()); } catch {}
      setSent({ email: email.trim(), nights: data.nights });
      trackEvent("study_plan_created", { role, year, topics: chapters.length, nights: data.nights, opt_in: optIn });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="sp-done" role="status">
        <h3>Check your inbox</h3>
        <p>
          We&rsquo;ve emailed {role === "parent" ? "your child's" : "your"} {sent.nights}-night plan to <strong>{sent.email}</strong>. Open the link in the email to see the plan and tick off each night.
        </p>
        <p>Can&rsquo;t see it? Check your spam or promotions folder, or <button type="button" className="tb-link" onClick={() => setSent(null)} style={{ font: "inherit", fontWeight: 800, color: "var(--brand-text)", background: "none", border: 0, padding: 0, textDecoration: "underline", cursor: "pointer" }}>try again</button>.</p>
      </div>
    );
  }

  return (
    <form className="sp-form" onSubmit={submit} noValidate>
      <div className="sp-field">
        <p>Who&rsquo;s making the plan?</p>
        <div className="sp-chips">
          {[["student", "I'm the student"], ["parent", "I'm a parent"]].map(([v, l]) => (
            <button key={v} type="button" className={`sp-chip ${role === v ? "is-on" : ""}`} aria-pressed={role === v} onClick={() => setRole(v)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="sp-field">
        <p>Year level</p>
        <div className="sp-chips">
          {YEARS.map((y) => (
            <button key={y} type="button" className={`sp-chip ${year === y ? "is-on" : ""}`} aria-pressed={year === y} onClick={() => setYear(y)}>{y}</button>
          ))}
        </div>
      </div>

      <div className="sp-field">
        <p>What&rsquo;s on the test?</p>
        <div className="sp-topics">
          {list.map((c) => (
            <label key={c.slug} className={`sp-topic ${chapters.includes(c.slug) ? "is-on" : ""}`}>
              <input type="checkbox" checked={chapters.includes(c.slug)} onChange={() => setChapters((a) => toggle(a, c.slug))} />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
        <small>Not sure? Check the test outline from school, or tick everything for an end-of-year exam.</small>
      </div>

      <div className="sp-field">
        <label htmlFor="sp-date">When&rsquo;s the exam?</label>
        <input id="sp-date" className="sp-input" type="date" min={plusDays(2)} max={plusDays(70)} value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
      </div>

      <div className="sp-field">
        <p>Which nights can {role === "parent" ? "they" : "you"} study?</p>
        <div className="sp-chips">
          {DAYS.map(([d, l]) => (
            <button key={d} type="button" className={`sp-chip ${weekdays.includes(d) ? "is-on" : ""}`} aria-pressed={weekdays.includes(d)} onClick={() => setWeekdays((a) => toggle(a, d))}>{l}</button>
          ))}
        </div>
        <small>About 30 to 45 minutes a night is plenty.</small>
      </div>

      <div className="sp-field">
        <label htmlFor="sp-email">Where should we send the plan?</label>
        <input id="sp-email" className="sp-input" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <small>We&rsquo;ll email a private link to the plan. It&rsquo;s how you get back to it.</small>
      </div>

      <label className="sp-optin">
        <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} />
        <span>Also send me free maths resources and Tuterly news, and give me 2 free worksheets a day. Unsubscribe any time.</span>
      </label>

      {error && <p className="sp-error" role="alert">{error}</p>}
      <div>
        <button type="submit" className="tb-btn tb-btn--primary" disabled={busy}>{busy ? "Building your plan…" : "Email me the plan"}</button>
      </div>
    </form>
  );
}
