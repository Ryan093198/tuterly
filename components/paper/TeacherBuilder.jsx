"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

// Teacher Zone builder (/teachers#teacher-zone). Same picker as the exam
// generator, but only questions that can be marked automatically, and the
// result is two links to share instead of a PDF. Sign-up (email and
// school) once per device; 5 papers a day, enforced by /api/teachers/paper.
const TEACHER_KEY = "tuterly:teacher";
const PAPERS_KEY = "tuterly:teacher_papers";
const LENGTHS = [5, 10, 15, 20];

const store = {
  get(k) { try { return window.localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { window.localStorage.setItem(k, v); } catch {} },
};

function CopyLink({ label, path, primary }) {
  const [copied, setCopied] = useState(false);
  const [full, setFull] = useState(path);
  useEffect(() => setFull(`${window.location.origin}${path}`), [path]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      const t = document.createElement("textarea");
      t.value = full;
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); } catch {}
      t.remove();
    }
    setCopied(true);
    trackEvent("teacher_copy_link", { which: primary ? "students" : "solutions" });
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div className={`tz-link ${primary ? "tz-link--primary" : ""}`}>
      <p className="tz-link__label">{label}</p>
      <div className="tz-link__row">
        <input readOnly value={full} onFocus={(e) => e.target.select()} aria-label={label} />
        <button type="button" className="eg-btn eg-btn--sm" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
        <a className="eg-linkbtn" href={path} target="_blank" rel="noopener">Open</a>
      </div>
    </div>
  );
}

export default function TeacherBuilder({ catalogue, initialYear = "Year 8" }) {
  // Only topics with auto-markable questions.
  const cat = useMemo(() => {
    const out = {};
    for (const [y, groups] of Object.entries(catalogue)) {
      const gs = groups.map((g) => ({ ...g, topics: g.topics.filter((t) => t.auto > 0) })).filter((g) => g.topics.length);
      if (gs.length) out[y] = gs;
    }
    return out;
  }, [catalogue]);
  const years = Object.keys(cat);
  const [year, setYear] = useState(years.includes(initialYear) ? initialYear : years[0]);
  const [picked, setPicked] = useState(() => new Set());
  const [count, setCount] = useState(10);
  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [gate, setGate] = useState(false);
  const [gEmail, setGEmail] = useState("");
  const [gSchool, setGSchool] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [made, setMade] = useState(null);
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    try {
      const t = JSON.parse(store.get(TEACHER_KEY) || "null");
      if (t?.email) setTeacher(t);
      setPapers(JSON.parse(store.get(PAPERS_KEY) || "[]"));
    } catch {}
  }, []);

  if (!years.length) {
    return <div className="eg-card"><p className="eg-lead">The Teacher Zone is being set up. Check back soon.</p></div>;
  }

  const groups = cat[year] || [];
  const allTopics = groups.flatMap((g) => g.topics);
  const chosen = allTopics.filter((t) => picked.has(t.slug));
  const available = chosen.reduce((s, t) => s + t.auto, 0);

  const toggle = (slug) => setPicked((p) => { const n = new Set(p); n.has(slug) ? n.delete(slug) : n.add(slug); return n; });
  function toggleGroup(g) {
    const all = g.topics.every((t) => picked.has(t.slug));
    setPicked((p) => { const n = new Set(p); for (const t of g.topics) all ? n.delete(t.slug) : n.add(t.slug); return n; });
  }

  async function build(t = teacher) {
    setError(null);
    if (!chosen.length) { setError("Tick at least one topic."); return; }
    if (!t?.email) { setGate(true); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/teachers/paper", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: t.email, year, topics: chosen.map((x) => x.slug), count, title }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 402 || data?.need_signup) { setGate(true); return; }
      if (!res.ok || !data.ok) throw new Error(data?.error || "Something went wrong. Try again.");
      setMade(data);
      const list = [{ id: data.id, title: data.title, year: data.year, studentUrl: data.studentUrl, solutionsUrl: data.solutionsUrl, at: Date.now() }, ...papers].slice(0, 30);
      setPapers(list);
      store.set(PAPERS_KEY, JSON.stringify(list));
      trackEvent("teacher_paper_create", { year, topics: chosen.length, questions: data.questionCount });
    } catch (e) {
      setError(e.message);
      if (/today/.test(e.message)) trackEvent("teacher_paper_limit", { year });
    } finally {
      setBusy(false);
    }
  }

  async function signup(e) {
    e.preventDefault();
    const email = gEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return; }
    if (gSchool.trim().length < 2) { setError("Enter your school's name."); return; }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/teachers/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, school: gSchool.trim(), marketing_opt_in: optIn }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not save your details. Try again.");
      const t = { email, school: gSchool.trim() };
      store.set(TEACHER_KEY, JSON.stringify(t));
      setTeacher(t);
      setGate(false);
      trackEvent("generate_lead", { lead_type: "teacher_signup", source: "teacher_zone" });
    } catch (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    setBusy(false);
    build({ email, school: gSchool.trim() });
  }

  return (
    <div className="eg tz">
      <div className="eg-card">
        <p className="eg-label" id="tz-year-l">1. Year level</p>
        <div className="eg-years" role="radiogroup" aria-labelledby="tz-year-l">
          {years.map((y) => (
            <button key={y} type="button" role="radio" aria-checked={y === year} className={`eg-chip ${y === year ? "is-on" : ""}`} onClick={() => { setYear(y); setPicked(new Set()); setMade(null); }}>
              {y}
            </button>
          ))}
        </div>

        <p className="eg-label">2. Topics</p>
        <div className="eg-groups">
          {groups.map((g) => {
            const on = g.topics.filter((t) => picked.has(t.slug)).length;
            return (
              <fieldset key={g.key} className="eg-group">
                <legend className="eg-group__legend">
                  <label className="eg-check eg-check--main">
                    <input type="checkbox" checked={on === g.topics.length} ref={(el) => { if (el) el.indeterminate = on > 0 && on < g.topics.length; }} onChange={() => toggleGroup(g)} />
                    <span>{g.name}</span>
                    <small>{on ? `${on} of ${g.topics.length}` : `${g.topics.length} topics`}</small>
                  </label>
                </legend>
                <div className="eg-subs">
                  {g.topics.map((t) => (
                    <label key={t.slug} className="eg-check">
                      <input type="checkbox" checked={picked.has(t.slug)} onChange={() => toggle(t.slug)} />
                      <span>{t.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>

        <div className="tz-opts">
          <div>
            <p className="eg-label" id="tz-len-l">3. Number of questions</p>
            <div className="eg-years" role="radiogroup" aria-labelledby="tz-len-l">
              {LENGTHS.map((n) => (
                <button key={n} type="button" role="radio" aria-checked={n === count} className={`eg-chip ${n === count ? "is-on" : ""}`} onClick={() => setCount(n)}>{n}</button>
              ))}
            </div>
          </div>
          <div className="tz-title">
            <label className="eg-label" htmlFor="tz-title">4. Title students see (optional)</label>
            <input id="tz-title" type="text" maxLength={70} placeholder={`e.g. 8B ${groups[0]?.name || "Fractions"} homework`} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>

        <div className="eg-bar">
          <p className="eg-bar__sum" aria-live="polite">
            {chosen.length
              ? <><strong>{chosen.length} topic{chosen.length === 1 ? "" : "s"}</strong> · {Math.min(count, available)} questions{available < count ? ` (all ${available} available)` : ""}</>
              : "Tick a chapter to include all of its topics, or pick them one by one."}
          </p>
          <button type="button" className="eg-btn" disabled={busy || !chosen.length} onClick={() => build()}>
            {busy ? "Building…" : "Create shareable test"}
          </button>
        </div>

        {gate && (
          <form className="eg-gate" onSubmit={signup}>
            <p className="eg-gate__title">Join the Teacher Zone (free)</p>
            <p className="eg-gate__text">Up to 5 auto-marked tests a day. We&rsquo;ll remember you on this device.</p>
            <div className="tz-gate__grid">
              <input type="email" required autoComplete="email" placeholder="Your school email" value={gEmail} onChange={(e) => setGEmail(e.target.value)} aria-label="Email" />
              <input type="text" required autoComplete="organization" placeholder="School name" value={gSchool} onChange={(e) => setGSchool(e.target.value)} aria-label="School" />
              <button type="submit" className="eg-btn" disabled={busy}>{busy ? "One moment…" : "Create my test"}</button>
            </div>
            <label className="eg-optin">
              <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} />
              <span>Email me when new teacher resources are added. Unsubscribe any time.</span>
            </label>
          </form>
        )}

        {error && <div className="eg-msg eg-msg--limit" role="alert"><p>{error}</p></div>}
        {teacher && !gate && <p className="tz-who">Signed in as {teacher.email}{teacher.school ? ` · ${teacher.school}` : ""}</p>}
      </div>

      {made && (
        <div className="tz-made" aria-live="polite">
          <p className="tz-made__t">Your test is ready: {made.title}</p>
          <p className="tz-made__x">{made.questionCount} questions · {made.totalMarks} marks · about {made.minutes} minutes. Students answer online and get their mark and the worked solutions as soon as they finish.</p>
          <CopyLink primary label="Link for students (questions, marked online)" path={made.studentUrl} />
          <CopyLink label="Answers and worked solutions (keep this one for you)" path={made.solutionsUrl} />
        </div>
      )}

      {papers.length > 0 && (
        <details className="tz-mine">
          <summary>Your tests on this device ({papers.length})</summary>
          <ul>
            {papers.map((p) => (
              <li key={p.id}>
                <span className="tz-mine__t">{p.title}</span>
                <span className="tz-mine__d">{new Date(p.at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}</span>
                <a href={p.studentUrl} target="_blank" rel="noopener">Student link</a>
                <a href={p.solutionsUrl} target="_blank" rel="noopener">Solutions</a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
