"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import QuinnWorking from "@/components/brand/QuinnWorking";
import { trackEvent } from "@/lib/analytics";

// The free exam plan (Ryan, 18 Nov 2026). Signs the student in to their
// Tuterly app account (the app's own Supabase project), uploads one marked
// test a day, lets them check what was found, then shows the study plan and
// a custom test from our bank. Server side: app/api/exam-plan/*.

const APP_URL = "https://iuiqiqtthmpvtxmirdam.supabase.co";
const APP_KEY = "sb_publishable_ZYFGIG5b3L8SnnidBGjyFQ_Laie64Fo";
const YEARS = [7, 8, 9, 10];
const MAX_PAGES = 10;

let client = null;
function app() {
  if (!client) {
    client = createClient(APP_URL, APP_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "tuterly-app-auth", detectSessionInUrl: false },
    });
  }
  return client;
}

const uuid = () =>
  (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)));

// A photo as a JPEG at most 2000px on its long side (the app takes .jpg pages).
async function toJpeg(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("unreadable"));
      i.src = url;
    });
    const scale = Math.min(1, 2000 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    return await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("unreadable"))), "image/jpeg", 0.85));
  } finally {
    URL.revokeObjectURL(url);
  }
}

const plain = (md) => String(md || "").replace(/\$+/g, "").replace(/\\[a-zA-Z]+/g, " ").replace(/[{}]/g, "").replace(/\s+/g, " ").trim();

async function api(path, token, body) {
  const r = await fetch(path, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  let d = null;
  try { d = await r.json(); } catch {}
  if (!r.ok) {
    const e = new Error(d?.error || "Something went wrong. Try again.");
    e.limit = !!d?.limit;
    throw e;
  }
  return d;
}

export default function ExamPlanFlow({ cta }) {
  const [step, setStep] = useState("loading"); // loading | email | code | profile | upload | reading | review | building | results
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [year, setYear] = useState("");
  const [files, setFiles] = useState([]);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [limit, setLimit] = useState(false);
  const [usedToday, setUsedToday] = useState(false);
  const [run, setRun] = useState(null); // { run_id, paper_id }
  const [items, setItems] = useState([]);
  const [ticked, setTicked] = useState(new Set());
  const [result, setResult] = useState(null);
  const [shown, setShown] = useState(new Set());
  const pollRef = useRef(null);
  const topRef = useRef(null);

  const token = session?.access_token;
  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Where to start: signed in? set up? a plan already made?
  useEffect(() => {
    let off = false;
    (async () => {
      const { data } = await app().auth.getSession();
      if (off) return;
      if (!data.session) return setStep("email");
      setSession(data.session);
      await afterSignIn(data.session);
    })();
    const { data: sub } = app().auth.onAuthStateChange((_e, s) => setSession(s));
    return () => {
      off = true;
      sub.subscription.unsubscribe();
      clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function afterSignIn(s) {
    const { data: prof } = await app().from("profiles").select("role, year_level, first_name").eq("id", s.user.id).maybeSingle();
    if (!prof) return setStep("profile");
    if (prof.role !== "student" || !YEARS.includes(prof.year_level)) {
      setErr("The free exam plan is for students in Years 7 to 10. This account isn't set up as one.");
      return setStep("upload");
    }
    setYear(String(prof.year_level));
    setFirstName(prof.first_name || "");
    try {
      const d = await api("/api/exam-plan/latest", s.access_token);
      setUsedToday(!!d.used_today);
      if (d.run?.status === "built" && d.used_today) {
        setResult(d.run);
        return setStep("results");
      }
      if (d.run?.status === "uploaded" && d.used_today) {
        setRun({ run_id: d.run.run_id, paper_id: d.run.paper_id });
        return startPolling(d.run.paper_id);
      }
    } catch {}
    setStep("upload");
  }

  async function sendCode(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const { error } = await app().auth.signInWithOtp({ email: email.trim().toLowerCase(), options: { shouldCreateUser: true } });
    setBusy(false);
    if (error) return setErr(error.message.includes("rate") ? "Too many tries. Wait a minute, then try again." : "We couldn't send a code to that email. Check it and try again.");
    trackEvent("exam_plan_code_sent", {});
    setStep("code");
  }

  async function checkCode(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const { data, error } = await app().auth.verifyOtp({ email: email.trim().toLowerCase(), token: code.trim(), type: "email" });
    setBusy(false);
    if (error || !data.session) return setErr("That code didn't work. Check the latest email and try again.");
    setSession(data.session);
    trackEvent("generate_lead", { lead_type: "exam_plan" });
    await afterSignIn(data.session);
  }

  async function saveProfile(e) {
    e.preventDefault();
    setErr("");
    if (!firstName.trim() || !year) return setErr("Add your first name and year.");
    setBusy(true);
    const { error } = await app().from("profiles").insert({ id: session.user.id, role: "student", first_name: firstName.trim().slice(0, 40), year_level: Number(year) });
    setBusy(false);
    if (error) return setErr("We couldn't set up your account. Try again.");
    setStep("upload");
  }

  function pickFiles(list) {
    setErr("");
    const arr = [...list];
    const doc = arr.find((f) => /pdf$|wordprocessingml/.test(f.type) || /\.(pdf|docx)$/i.test(f.name));
    if (doc) return setFiles([doc]);
    const imgs = arr.filter((f) => f.type.startsWith("image/") || /\.(jpe?g|png|heic|webp)$/i.test(f.name)).slice(0, MAX_PAGES);
    if (!imgs.length) return setErr("Add photos of your test, or one PDF.");
    setFiles(imgs);
  }

  async function upload(e) {
    e.preventDefault();
    if (!files.length) return setErr("Add your test first.");
    setErr("");
    setBusy(true);
    try {
      const uid = session.user.id;
      const paperId = uuid();
      const paths = [];
      const single = files.length === 1 && /\.(pdf|docx)$/i.test(files[0].name);
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        let blob = f;
        let ext = "jpg";
        let type = "image/jpeg";
        if (single) {
          ext = /\.docx$/i.test(f.name) ? "docx" : "pdf";
          type = ext === "pdf" ? "application/pdf" : f.type;
        } else {
          try {
            blob = await toJpeg(f);
          } catch {
            throw new Error(`We couldn't open ${f.name}. Use a JPG or PNG photo, or a PDF.`);
          }
        }
        const path = `${uid}/papers/${paperId}/page-${i + 1}.${ext}`;
        const { error } = await app().storage.from("question-photos").upload(path, blob, { contentType: type, upsert: true });
        if (error) throw new Error("Upload failed. Check your connection and try again.");
        paths.push(path);
      }
      const d = await api("/api/exam-plan/start", session.access_token, { paper_id: paperId, page_paths: paths });
      trackEvent("exam_plan_upload", { pages: paths.length });
      setRun({ run_id: d.run_id, paper_id: paperId });
      setUsedToday(true);
      startPolling(paperId);
    } catch (e2) {
      setErr(e2.message);
      setLimit(!!e2.limit);
    }
    setBusy(false);
  }

  function startPolling(paperId) {
    setStep("reading");
    scrollTop();
    const started = Date.now();
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const { data } = await app().from("papers").select("status, items, processing_error").eq("id", paperId).maybeSingle();
      if (data?.status === "review") {
        clearInterval(pollRef.current);
        const its = Array.isArray(data.items) ? data.items : [];
        setItems(its);
        setTicked(new Set(its.filter((i) => i.suggested).map((i) => i.index)));
        setStep("review");
        scrollTop();
      } else if (data?.status === "failed" || (data?.processing_error && data?.status !== "processing") || Date.now() - started > 5 * 60 * 1000) {
        clearInterval(pollRef.current);
        setErr(data?.processing_error || "We couldn't read that test. Try clearer photos of each page, flat and in good light. This try didn't use up your free upload.");
        setUsedToday(false);
        setStep("upload");
      }
    }, 3000);
  }

  async function build() {
    if (!ticked.size) return setErr("Tick at least one question you got wrong.");
    setErr("");
    setStep("building");
    scrollTop();
    try {
      const d = await api("/api/exam-plan/build", session.access_token, {
        run_id: run.run_id,
        selected: [...ticked],
        exam_date: examDate || null,
        exam_name: examName || null,
      });
      trackEvent("exam_plan_built", { weak: d.weak?.length || 0 });
      setResult(d);
      setStep("results");
      scrollTop();
    } catch (e) {
      setErr(e.message);
      setStep("review");
    }
  }

  async function signOut() {
    await app().auth.signOut();
    setSession(null);
    setResult(null);
    setStep("email");
  }

  const wrongCount = useMemo(() => items.filter((i) => i.suggested).length, [items]);

  return (
    <div className="ep" ref={topRef}>
      {step === "loading" && <div className="ep-card"><p className="ep-muted">Loading…</p></div>}

      {step === "email" && (
        <form className="ep-card" onSubmit={sendCode}>
          <p className="ep-step">Step 1 of 3</p>
          <h2 className="ep-h">Make your free account</h2>
          <p className="ep-muted">Your email, and we&rsquo;ll send a 6-digit code. It&rsquo;s the same account as the Tuterly app.</p>
          <input className="ep-input" type="email" required autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Your email" />
          <button className="ep-btn" disabled={busy}>{busy ? "Sending…" : "Send my code"}</button>
          <p className="ep-small">Free. For Years 7 to 10. By continuing you agree to the <Link href="/terms">terms</Link> and <Link href="/privacy">privacy policy</Link>.</p>
          {err && <p className="ep-err" role="alert">{err}</p>}
        </form>
      )}

      {step === "code" && (
        <form className="ep-card" onSubmit={checkCode}>
          <p className="ep-step">Step 1 of 3</p>
          <h2 className="ep-h">Check your email</h2>
          <p className="ep-muted">We sent a 6-digit code to <strong>{email}</strong>.</p>
          <input className="ep-input ep-input--code" inputMode="numeric" autoComplete="one-time-code" maxLength={8} placeholder="123456" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} aria-label="6-digit code" />
          <button className="ep-btn" disabled={busy || code.length < 6}>{busy ? "Checking…" : "Continue"}</button>
          <p className="ep-small"><button type="button" className="ep-link" onClick={() => { setCode(""); setStep("email"); }}>Use a different email</button></p>
          {err && <p className="ep-err" role="alert">{err}</p>}
        </form>
      )}

      {step === "profile" && (
        <form className="ep-card" onSubmit={saveProfile}>
          <p className="ep-step">Step 1 of 3</p>
          <h2 className="ep-h">Nearly there</h2>
          <label className="ep-label">First name<input className="ep-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" /></label>
          <span className="ep-label">Year level</span>
          <div className="ep-years" role="radiogroup" aria-label="Year level">
            {YEARS.map((y) => (
              <button type="button" key={y} role="radio" aria-checked={year === String(y)} className={year === String(y) ? "is-on" : ""} onClick={() => setYear(String(y))}>Year {y}</button>
            ))}
          </div>
          <button className="ep-btn" disabled={busy}>{busy ? "Saving…" : "Continue"}</button>
          {err && <p className="ep-err" role="alert">{err}</p>}
        </form>
      )}

      {step === "upload" && (
        <form className="ep-card" onSubmit={upload}>
          <p className="ep-step">Step 2 of 3</p>
          <h2 className="ep-h">Upload a marked test</h2>
          <p className="ep-muted">A class test, practice exam or past test you&rsquo;ve done, with the teacher&rsquo;s marking. Photos of each page (up to {MAX_PAGES}), or one PDF.</p>
          <label className="ep-drop">
            <input type="file" accept="image/*,.pdf,.docx,application/pdf" multiple onChange={(e) => pickFiles(e.target.files || [])} />
            <span className="ep-drop__t">{files.length ? `${files.length} ${files.length === 1 ? "file" : "pages"} ready` : "Take photos or choose files"}</span>
            {files.length > 0 && <span className="ep-drop__x">{files.map((f) => f.name).join(", ")}</span>}
          </label>
          <div className="ep-row">
            <label className="ep-label">Which exam is it for? <span className="ep-opt">(optional)</span><input className="ep-input" maxLength={60} placeholder="e.g. Term 4 exam" value={examName} onChange={(e) => setExamName(e.target.value)} /></label>
            <label className="ep-label">Exam date <span className="ep-opt">(optional)</span><input className="ep-input" type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} /></label>
          </div>
          <button className="ep-btn" disabled={busy || !files.length || usedToday}>{busy ? "Uploading…" : "Find my weak spots"}</button>
          {usedToday && !err && <p className="ep-note">You&rsquo;ve used today&rsquo;s free upload. Come back tomorrow for another, or get Tuterly for unlimited.</p>}
          <p className="ep-small">One free upload a day. We read the questions and the marking to find your weak spots; the photos stay private to your account.</p>
          {err && <p className="ep-err" role="alert">{err}</p>}
          {limit && cta && <p className="ep-small"><a href={cta.href} className="ep-link">{cta.label}</a></p>}
          {session && <p className="ep-small ep-who">Signed in as {session.user.email}. <button type="button" className="ep-link" onClick={signOut}>Sign out</button></p>}
        </form>
      )}

      {step === "reading" && (
        <div className="ep-card">
          <QuinnWorking
            title="Reading your test"
            note="Usually about a minute. You can keep this tab open while it works."
            seconds={60}
            steps={["Reading each page", "Finding every question", "Checking the marking", "Matching questions to your textbook topics"]}
          />
        </div>
      )}

      {step === "review" && (
        <div className="ep-card">
          <p className="ep-step">Step 3 of 3</p>
          <h2 className="ep-h">{wrongCount ? `We found ${items.length} questions. You got ${wrongCount} wrong.` : `We found ${items.length} questions.`}</h2>
          <p className="ep-muted">
            {wrongCount
              ? "Tick the ones you got wrong or weren't sure about. We've ticked the ones marked wrong."
              : "We couldn't see any marking, so tick the ones you got wrong or weren't sure about, or the topics you want to practise."}
          </p>
          <ul className="ep-items">
            {items.map((it) => (
              <li key={it.index}>
                <label className={ticked.has(it.index) ? "is-on" : ""}>
                  <input
                    type="checkbox"
                    checked={ticked.has(it.index)}
                    onChange={() => setTicked((prev) => { const n = new Set(prev); n.has(it.index) ? n.delete(it.index) : n.add(it.index); return n; })}
                  />
                  <span className="ep-items__l">Q{it.label}</span>
                  <span className="ep-items__q">{plain(it.question_md).slice(0, 110)}{plain(it.question_md).length > 110 ? "…" : ""}</span>
                  {it.mark && it.mark !== "unmarked" && <span className={`ep-mark ep-mark--${it.mark}`}>{it.mark === "partial" ? "Part marks" : it.mark === "wrong" ? "Wrong" : "Right"}</span>}
                </label>
              </li>
            ))}
          </ul>
          <button className="ep-btn" onClick={build} disabled={!ticked.size}>Make my plan and test</button>
          {err && <p className="ep-err" role="alert">{err}</p>}
        </div>
      )}

      {step === "building" && (
        <div className="ep-card">
          <QuinnWorking title="Building your plan" note="A few seconds." seconds={8} steps={["Finding your weak topics", "Planning your days to the exam", "Picking questions for your test"]} />
        </div>
      )}

      {step === "results" && result && (
        <Results result={result} cta={cta} shown={shown} setShown={setShown} />
      )}
    </div>
  );
}

function Results({ result, cta, shown, setShown }) {
  const { plan, weak, test, exam_name: examName, added } = result;
  return (
    <div className="ep-results">
      <div className="ep-card">
        <p className="ep-step">Your plan</p>
        <h2 className="ep-h">
          {plan?.exam_date ? `${plan.days_left} day${plan.days_left === 1 ? "" : "s"} until ${examName || "your exam"}` : `Your next 7 days`}
        </h2>
        <p className="ep-muted">Built from the questions you got wrong. We&rsquo;ve emailed you a copy.</p>
        <h3 className="ep-h3">Your weak spots</h3>
        <ul className="ep-weak">
          {(weak || []).map((w) => (
            <li key={w.code}><Link href={w.path}>{w.code} {w.name}</Link>{w.wrong > 1 && <span className="ep-muted"> ({w.wrong} wrong)</span>}</li>
          ))}
        </ul>
        <h3 className="ep-h3">Day by day</h3>
        <ol className="ep-days">
          {(plan?.days || []).map((d) => (
            <li key={d.date} className={`ep-day ep-day--${d.kind}`}>
              <span className="ep-day__d">{d.label}</span>
              <span className="ep-day__t">{d.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="ep-card">
        <p className="ep-step">Your custom test</p>
        <h2 className="ep-h">{test?.length || 0} question{test?.length === 1 ? "" : "s"} on your weak spots</h2>
        <p className="ep-muted">Work each one out on paper, then check the answer.</p>
        <ol className="ep-test">
          {(test || []).map((q) => (
            <li key={q.n} className="ep-q">
              <p className="ep-q__meta">Question {q.n} · {q.code} {q.section}</p>
              <div className="ep-q__body" dangerouslySetInnerHTML={{ __html: q.question_html }} />
              {shown.has(q.n) ? (
                <div className="ep-q__ans" dangerouslySetInnerHTML={{ __html: q.solution_html || q.answer_html }} />
              ) : (
                <button type="button" className="ep-reveal" onClick={() => setShown((p) => new Set(p).add(q.n))}>{q.solution_html ? "Show the worked solution" : "Show the answer"}</button>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="ep-card ep-card--cta">
        <h2 className="ep-h">Keep going until every weak spot is fixed</h2>
        <p className="ep-muted">
          {added ? `Your exam and ${added} question${added === 1 ? "" : "s"} you got wrong are already saved in the Tuterly app. ` : "Your exam is already saved in the Tuterly app. "}
          Sign in with the same email to pick up where you left off.
        </p>
        <ul className="ep-perks">
          <li>Unlimited questions on your weak spots, made fresh every time</li>
          <li>Practise any time, with worked solutions for every question</li>
          <li>Unlimited notes and practice tests before your exam</li>
        </ul>
        {cta && <a href={cta.href} className="ep-btn ep-btn--cta">{cta.label}</a>}
        <p className="ep-small">You get one free upload a day here. Come back tomorrow to add another test.</p>
      </div>
    </div>
  );
}
