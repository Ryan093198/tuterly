"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@/components/brand";
import "./try-question.css";

// The "Try it" demo (home page and /try). Enter an email first (it joins
// the early sign-up list), then snap or upload one maths question (or type
// it) and get it back with a worked solution plus a fresh question on the
// same idea to try. 2 a day per email. API: /api/try-question.

const MathText = dynamic(() => import("./TryMath"), { ssr: false, loading: () => <p className="tq-muted">Loading…</p> });

const EMAIL_KEY = "tuterly:try_email";
const MAX_SIDE = 1600;

function readEmail() {
  try { return localStorage.getItem(EMAIL_KEY) || ""; } catch { return ""; }
}
const listeners = new Set();
function saveEmail(e) {
  try { localStorage.setItem(EMAIL_KEY, e); } catch {}
  listeners.forEach((l) => l());
}
function subscribe(l) {
  listeners.add(l);
  return () => listeners.delete(l);
}

// Shrink big phone photos before upload (JPEG, longest side 1600px).
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("We couldn’t open that photo here. Try a screenshot of it, or a JPG or PNG.")); };
    img.src = url;
  });
}

const STAGES = ["Reading your question…", "Working out the solution…", "Writing a fresh version…"];

export default function TryQuestion() {
  const [mode, setMode] = useState("photo"); // photo | type
  const [preview, setPreview] = useState(null);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | need_email | error
  const [stage, setStage] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("parent");
  const [gateBusy, setGateBusy] = useState(false);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const fileRef = useRef(null);
  const resultRef = useRef(null);
  const pending = useRef(null);
  const savedEmail = useSyncExternalStore(subscribe, readEmail, () => "");
  const unlocked = !!savedEmail && status !== "need_email";

  useEffect(() => {
    if (status !== "loading") return;
    const t = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 6000);
    return () => clearInterval(t);
  }, [status]);

  async function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError("");
    try { setPreview(await fileToDataUrl(f)); } catch (err) { setError(err.message); }
  }

  async function send(payload) {
    setStage(0);
    setStatus("loading");
    setError("");
    setResult(null);
    setChecked(false);
    setAnswer("");
    try {
      const res = await fetch("/api/try-question", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, email: readEmail() || undefined, company_website: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 402 && data.need_email) {
        pending.current = payload;
        setEmail((e) => e || readEmail());
        setStatus("need_email");
        return;
      }
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
      if (!data.ok) throw new Error(data.reason || "We couldn’t read a maths question there.");
      setResult(data);
      setPhoto(payload.image || null);
      setStatus("done");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (mode === "photo") {
      if (!preview) { setError("Add a photo of one question first."); return; }
      send({ image: preview });
    } else {
      if (typed.trim().length < 3) { setError("Type the question first."); return; }
      send({ text: typed.trim() });
    }
  }

  async function onUnlock(e) {
    e.preventDefault();
    setGateBusy(true);
    setError("");
    try {
      const res = await fetch("/api/study-waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, role, interest: "launch", placement: "try_demo", source_page: window.location.pathname, company_website: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Please check your email address.");
      saveEmail(email.trim().toLowerCase());
      setGateBusy(false);
      if (pending.current) {
        const p = pending.current;
        pending.current = null;
        send(p);
      } else {
        setStatus("idle");
      }
    } catch (err) {
      setGateBusy(false);
      setError(err.message);
    }
  }

  function reset() {
    setPreview(null);
    setTyped("");
    setResult(null);
    setStatus("idle");
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  const loading = status === "loading";

  return (
    <div className="tq">
      {unlocked && status !== "done" && (
        <form className="tq-card" onSubmit={onSubmit}>
          <div className="tq-tabs" role="tablist" aria-label="How to add the question">
            <button type="button" role="tab" aria-selected={mode === "photo"} className={mode === "photo" ? "is-on" : ""} onClick={() => setMode("photo")}>
              <Icon name="snap" size={18} /> Photo
            </button>
            <button type="button" role="tab" aria-selected={mode === "type"} className={mode === "type" ? "is-on" : ""} onClick={() => setMode("type")}>
              <Icon name="notes" size={18} /> Type it
            </button>
          </div>

          {mode === "photo" ? (
            <label className={`tq-drop ${preview ? "has-img" : ""}`}>
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} disabled={loading} />
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Your question" />
              ) : (
                <span className="tq-drop__hint">
                  <Icon name="snap" size={28} />
                  <strong>Take a photo or choose one</strong>
                  <span>One maths question, Years 7 to 10</span>
                </span>
              )}
            </label>
          ) : (
            <textarea
              className="tq-text"
              rows={4}
              maxLength={1200}
              placeholder="e.g. Solve 4 − 2x > 10"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={loading}
              aria-label="Type the maths question"
            />
          )}

          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="tq-hp" aria-hidden="true" />

          <button type="submit" className="tb-btn tb-btn--primary tq-go" disabled={loading}>
            {loading ? STAGES[stage] : "Generate"}
          </button>
          {preview && mode === "photo" && !loading && (
            <button type="button" className="tq-link" onClick={() => { setPreview(null); if (fileRef.current) fileRef.current.value = ""; }}>Use a different photo</button>
          )}
          <p className="tq-small">2 free questions a day. Photos are only used to read the question and aren’t saved (<a href="/privacy" className="tb-link">privacy</a>).</p>
          {error && <p className="tq-error" role="alert">{error}</p>}
        </form>
      )}

      {!unlocked && (
        <form className="tq-card tq-gate" onSubmit={onUnlock}>
          <h3 className="tb-h3">Try it free</h3>
          <p className="tq-muted">Enter your email to try 2 questions a day, free. You’ll also lock in Tuterly for $7.99 a week for life (50% off the $15.99 price) when it launches.</p>
          <div className="tq-gate__row">
            <input type="email" required className="tb-input" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Your email" autoComplete="email" />
            <select className="tb-input" value={role} onChange={(e) => setRole(e.target.value)} aria-label="I'm a">
              <option value="parent">I’m a parent</option>
              <option value="student">I’m a student</option>
            </select>
          </div>
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="tq-hp" aria-hidden="true" />
          <button type="submit" className="tb-btn tb-btn--primary tq-go" disabled={gateBusy}>{gateBusy ? "One moment…" : "Start"}</button>
          <p className="tq-small">We only use your email for Tuterly updates. See our <a href="/privacy" className="tb-link">privacy policy</a>.</p>
          {error && <p className="tq-error" role="alert">{error}</p>}
        </form>
      )}

      {status === "done" && result && (
        <div className="tq-result" ref={resultRef}>
          <div className="tq-card">
            <p className="tq-label">Your question{result.topic ? ` · ${result.topic}` : ""}</p>
            {photo && (
              // Their own photo, so any diagram in the question is still visible.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="The photo you uploaded" className="tq-photo" />
            )}
            <MathText md={result.question} />
            <details className="tq-sol">
              <summary>Show worked solution</summary>
              <MathText md={result.solution} />
            </details>
          </div>

          <div className="tq-card tq-card--fresh">
            <p className="tq-label tq-label--fresh">Now try a fresh version</p>
            <MathText md={result.new_question} />
            {result.what_changed && <MathText md={result.what_changed} inline />}
            {!checked ? (
              <form className="tq-answer" onSubmit={(e) => { e.preventDefault(); setChecked(true); }}>
                <input className="tb-input" placeholder="Your answer" value={answer} onChange={(e) => setAnswer(e.target.value)} aria-label="Your answer" />
                <button type="submit" className="tb-btn tb-btn--primary">Check</button>
              </form>
            ) : (
              <div className="tq-check">
                <p className="tq-check__line">
                  {answer.trim() ? <>You wrote <strong>{answer.trim()}</strong>. The answer is </> : <>The answer is </>}
                </p>
                <MathText md={result.new_answer} />
                <details className="tq-sol" open>
                  <summary>Worked solution</summary>
                  <MathText md={result.new_solution} />
                </details>
              </div>
            )}
          </div>

          <div className="tq-next">
            <p>
              <strong>In the app, every question they get wrong works like this,</strong> with fresh versions until it’s mastered.
            </p>
            <div className="tq-next__btns">
              <a href="#get-app" className="tb-btn tb-btn--primary">Sign up early for 50% off</a>
              <button type="button" className="tq-link" onClick={reset}>Try another question</button>
            </div>
            {typeof result.tries_left_today === "number" && (
              <p className="tq-small">
                {result.tries_left_today > 0
                  ? `${result.tries_left_today} more free ${result.tries_left_today === 1 ? "question" : "questions"} today.`
                  : "That’s your free questions for today. Come back tomorrow for 2 more."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
