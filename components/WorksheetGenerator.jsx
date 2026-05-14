"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MarkdownReport from "@/components/MarkdownReport";
import { readJsonOrFallback } from "@/lib/practice-client";

// Public worksheet generator at /worksheets. Three states drive the UI:
//   1. Email gate (no email in localStorage yet) — collect + POST to
//      /api/worksheets/email, set localStorage flag, advance.
//   2. Form — year + topic + Generate.
//   3. Result — rendered markdown + PDF + Regenerate + trial banner.
//
// Topic data is pre-rendered server-side (see app/worksheets/page.js)
// so the dropdown is instant.
const STORAGE_KEY = "tuterly:worksheet_email";

const YEAR_LEVELS = [
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
];

const c = {
  teal: "#0ABAB5",
  tealLight: "#2DD4BF",
  tealDark: "#0D9488",
  tealPale: "#F0FDFA",
  navy: "#0F172A",
  navyMid: "#1E293B",
  text: "#1E293B",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  border: "#E2E8F0",
  rose: "#F43F5E",
  amber: "#F59E0B",
};

export default function WorksheetGenerator({ topicsByYear }) {
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailPending, setEmailPending] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const [yearLevel, setYearLevel] = useState("Year 7");
  const [topicId, setTopicId] = useState("");
  const [topicLabel, setTopicLabel] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [worksheet, setWorksheet] = useState(null);
  const [trialPromptOpen, setTrialPromptOpen] = useState(false);
  const [trialPending, setTrialPending] = useState(false);
  const [trialError, setTrialError] = useState(null);
  const resultRef = useRef(null);

  // Hydrate email from localStorage on mount so returning visitors skip the gate.
  // Also stash a `?ref=` query param into localStorage so the referral code
  // survives email-gate detours and lands in the Stripe checkout body when
  // the visitor finally signs up.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEmail(saved);
        setEmailSaved(true);
      }
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref && /^[A-Za-z2-9]{6,12}$/.test(ref)) {
        window.localStorage.setItem("tuterly:ref", ref.toUpperCase());
      }
    } catch {
      // localStorage can throw in private-browsing / sandboxed contexts.
      // Fall back to in-memory state — the gate still works, just resets
      // on each visit.
    }
  }, []);

  // The public worksheet page is white-themed regardless of OS preference.
  // MarkdownReport uses Tailwind `dark:` variants that flip to light-grey
  // text under a `.dark` ancestor, so when a visitor's OS is in dark mode
  // (or they previously toggled dark mode in the dashboard) the worksheet
  // becomes unreadable on the white card. Strip `.dark` for the lifetime
  // of this component and restore it on unmount so the dashboard's theme
  // toggle still works normally elsewhere.
  useEffect(() => {
    const html = document.documentElement;
    const wasDark = html.classList.contains("dark");
    if (wasDark) html.classList.remove("dark");
    return () => {
      if (wasDark) html.classList.add("dark");
    };
  }, []);

  const yearGroups = topicsByYear[yearLevel] || [];

  // Flatten for the id→label lookup. Memoised because the user can flip
  // years without rebuilding the dropdown source on every render.
  const flatTopics = useMemo(
    () => yearGroups.flatMap((g) => g.topics),
    [yearGroups]
  );

  // When year changes, clear the picked topic (it likely doesn't exist
  // in the new year's curriculum).
  useEffect(() => {
    setTopicId("");
    setTopicLabel("");
  }, [yearLevel]);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setEmailError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailPending(true);
    try {
      const res = await fetch("/api/worksheets/email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) throw new Error(data?.error || "Could not save email.");
      try {
        window.localStorage.setItem(STORAGE_KEY, email);
      } catch {}
      setEmailSaved(true);
    } catch (err) {
      setEmailError(err.message || "Could not save email.");
    } finally {
      setEmailPending(false);
    }
  }

  function pickTopic(id) {
    setTopicId(id);
    const match = flatTopics.find((t) => t.id === id);
    setTopicLabel(match?.label || "");
  }

  async function handleGenerate(e) {
    if (e) e.preventDefault();
    setError(null);
    if (!topicLabel.trim()) {
      setError("Pick a topic.");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/worksheets/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          year_level: yearLevel,
          topic_id: topicId || undefined,
          topic_label: topicLabel,
          // Fresh seed each click so "Regenerate" returns different numbers.
          variant_seed: Math.random().toString(36).slice(2, 10),
        }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) {
        // Rate-limit response triggers the trial-signup modal instead
        // of a plain error toast. Anonymous + already-used-free-quota
        // visitors see the conversion prompt.
        if (res.status === 429 && data?.rate_limited) {
          setTrialPromptOpen(true);
          return;
        }
        throw new Error(data?.error || "Could not generate worksheet.");
      }
      setWorksheet({
        content: data.content,
        yearLevel: data.year_level || yearLevel,
        topicLabel: data.topic_label || topicLabel,
        topicId,
      });
      // Scroll the result into view on the next paint so the user sees
      // where the page jumped to instead of landing mid-form.
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      setError(err.message || "Could not generate worksheet.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleStartTrial() {
    setTrialError(null);
    setTrialPending(true);
    try {
      let ref = null;
      try {
        ref = window.localStorage.getItem("tuterly:ref");
      } catch {}
      const res = await fetch("/api/billing/checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, ref }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setTrialError(err.message || "Could not start checkout.");
      setTrialPending(false);
    }
  }

  async function handleDownloadPdf() {
    if (!worksheet) return;
    try {
      const res = await fetch("/api/worksheets/pdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          content: worksheet.content,
          year_level: worksheet.yearLevel,
          topic_label: worksheet.topicLabel,
        }),
      });
      if (!res.ok) {
        const data = await readJsonOrFallback(res);
        throw new Error(data?.error || "Could not render PDF.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const dispo = res.headers.get("content-disposition") || "";
      const m = dispo.match(/filename="([^"]+)"/);
      a.download = m?.[1] || "Tuterly-Worksheet.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Could not download PDF.");
    }
  }

  // --- Render ---

  if (!emailSaved) {
    return (
      <div style={cardStyle}>
        <h2 style={h2Style}>Get free, VCAA-aligned worksheets</h2>
        <p style={pMutedStyle}>Drop your email address for access!</p>
        <form onSubmit={handleEmailSubmit} style={{ marginTop: 20 }}>
          <label style={labelStyle}>
            <span>Your email</span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={emailPending}
              style={inputStyle}
            />
          </label>
          {emailError && <p style={errorTextStyle}>{emailError}</p>}
          <button
            type="submit"
            disabled={emailPending}
            style={primaryButtonStyle}
          >
            {emailPending ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={cardStyle}>
        <h2 style={h2Style}>Generate a free maths worksheet</h2>
        <p style={pMutedStyle}>
          10 questions — 4 Foundation, 4 Standard, 2 Extension — with full
          worked solutions, calibrated to the Victorian Curriculum.
        </p>

        <form onSubmit={handleGenerate} style={{ marginTop: 20, display: "grid", gap: 16 }}>
          <label style={labelStyle}>
            <span>Year level</span>
            <select
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              disabled={generating}
              style={inputStyle}
            >
              {YEAR_LEVELS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          <label style={labelStyle}>
            <span>Topic</span>
            <select
              value={topicId}
              onChange={(e) => pickTopic(e.target.value)}
              disabled={generating || yearGroups.length === 0}
              style={inputStyle}
            >
              <option value="">— Choose a topic —</option>
              {yearGroups.map((g) => (
                <optgroup key={g.strand} label={g.strand}>
                  {g.topics.map((t) => (
                    <option key={t.id} value={t.id} title={t.desc}>
                      {t.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          {error && <p style={errorTextStyle}>{error}</p>}

          {generating && (
            <p style={infoTextStyle}>
              Generating… usually 20–40 seconds. Don&apos;t close the tab.
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={generating || !topicLabel.trim()}
              style={primaryButtonStyle}
            >
              {generating ? "Generating…" : "Generate worksheet"}
            </button>
          </div>
        </form>
      </div>

      {worksheet && (
        <div ref={resultRef} style={{ marginTop: 28 }}>
          <TrialBanner />

          <div style={{ ...cardStyle, marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 13, color: c.textLight }}>
                {worksheet.yearLevel} · {worksheet.topicLabel}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  style={secondaryButtonStyle}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  disabled={generating}
                  style={secondaryButtonStyle}
                >
                  {generating ? "Generating…" : "Generate new questions"}
                </button>
              </div>
            </div>

            <div style={worksheetBodyStyle}>
              <MarkdownReport content={worksheet.content} />
            </div>
          </div>
        </div>
      )}

      {trialPromptOpen && (
        <TrialSignupModal
          onClose={() => {
            setTrialPromptOpen(false);
            setTrialError(null);
          }}
          onStart={handleStartTrial}
          pending={trialPending}
          error={trialError}
        />
      )}
    </div>
  );
}

function TrialSignupModal({ onClose, onStart, pending, error }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(15, 23, 42, 0.55)",
      }}
      onClick={pending ? undefined : onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: c.white,
          borderRadius: 20,
          padding: 32,
          maxWidth: 460,
          width: "100%",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.25)",
          border: `1px solid ${c.border}`,
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: c.teal,
            textTransform: "uppercase",
            letterSpacing: 2,
            margin: 0,
          }}
        >
          7-day free trial
        </p>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 26,
            color: c.navy,
            lineHeight: 1.2,
            margin: "8px 0 12px",
          }}
        >
          You&apos;ve used your free worksheet for today.
        </h2>
        <p style={{ color: c.textLight, fontSize: 15, lineHeight: 1.65, margin: "0 0 16px" }}>
          Start your free 7-day Tuterly trial for unlimited worksheets,
          lesson plans, and progress tracking for your child. Cancel any
          time before the trial ends and you won&apos;t be charged.
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: "0 0 20px",
            padding: 0,
            display: "grid",
            gap: 6,
            color: c.text,
            fontSize: 14,
          }}
        >
          {[
            "Unlimited VCAA-aligned practice worksheets",
            "Generate custom lesson plans, any topic or year level",
            "Session reports and progress tracking",
            "Full access to our directory of qualified Tutors",
            "$29 / month after the trial - cancel any time",
          ].map((t) => (
            <li key={t} style={{ display: "flex", gap: 10 }}>
              <span style={{ color: c.teal, fontWeight: 700 }}>✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        {error && (
          <p
            style={{
              color: c.rose,
              fontSize: 13,
              margin: "0 0 12px",
              background: "#FFF1F2",
              padding: "8px 10px",
              borderRadius: 8,
            }}
          >
            {error}
          </p>
        )}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onStart}
            disabled={pending}
            style={{
              ...primaryButtonStyle,
              flex: "1 1 auto",
              opacity: pending ? 0.7 : 1,
              cursor: pending ? "wait" : "pointer",
            }}
          >
            {pending ? "Starting…" : "Start free trial"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            style={{
              ...secondaryButtonStyle,
              flex: "0 0 auto",
            }}
          >
            Maybe later
          </button>
        </div>
        <p
          style={{
            color: c.textMuted,
            fontSize: 12,
            margin: "14px 0 0",
            textAlign: "center",
          }}
        >
          Powered by Stripe · card not charged during trial
        </p>
      </div>
    </div>
  );
}

function TrialBanner() {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${c.navy}, ${c.navyMid})`,
        color: c.white,
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ minWidth: 0, flex: "1 1 280px" }}>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: c.tealLight,
            textTransform: "uppercase",
            letterSpacing: 2,
            margin: 0,
          }}
        >
          Tuterly
        </p>
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            margin: "4px 0 6px",
            color: c.white,
          }}
        >
          Want worksheets like this after every tutoring session?
        </h3>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
          Tuterly gives parents detailed reports, weekly lesson plans and
          unlimited practice between sessions. Start a 7-day free trial.
        </p>
      </div>
      <a
        href="https://app.tuterly.com.au"
        style={{
          padding: "12px 22px",
          borderRadius: 10,
          background: c.tealLight,
          color: c.navy,
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Start 7-day free trial
      </a>
    </div>
  );
}

// --- Styles ---

const cardStyle = {
  background: c.white,
  border: `1px solid ${c.border}`,
  borderRadius: 20,
  padding: 32,
  boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
};

const h2Style = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 28,
  color: c.navy,
  margin: "0 0 8px",
};

const pMutedStyle = {
  color: c.textLight,
  fontSize: 15,
  lineHeight: 1.6,
  margin: 0,
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 13,
  fontWeight: 600,
  color: c.text,
};

const inputStyle = {
  width: "100%",
  height: 44,
  padding: "0 14px",
  borderRadius: 10,
  border: `1px solid ${c.border}`,
  background: c.white,
  fontSize: 15,
  color: c.text,
  outline: "none",
  fontFamily: "inherit",
};

const primaryButtonStyle = {
  padding: "12px 24px",
  borderRadius: 10,
  background: c.navy,
  color: c.white,
  fontSize: 15,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "9px 16px",
  borderRadius: 8,
  background: c.white,
  color: c.text,
  fontSize: 14,
  fontWeight: 600,
  border: `1px solid ${c.border}`,
  cursor: "pointer",
};

const errorTextStyle = {
  color: c.rose,
  fontSize: 14,
  margin: 0,
  background: "#FFF1F2",
  padding: "10px 12px",
  borderRadius: 8,
};

const infoTextStyle = {
  color: c.tealDark,
  fontSize: 13,
  margin: 0,
  background: c.tealPale,
  padding: "10px 12px",
  borderRadius: 8,
};

const worksheetBodyStyle = {
  borderTop: `1px solid ${c.border}`,
  paddingTop: 8,
};
