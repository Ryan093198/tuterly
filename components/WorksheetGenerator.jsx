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

export default function WorksheetGenerator({ topicsByYear, initialYearLevel, initialTopicId }) {
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailPending, setEmailPending] = useState(false);
  const [emailError, setEmailError] = useState(null);
  // Email-capture modal opens on first Generate click instead of
  // gating the whole page. Visitors get to browse year + topic +
  // difficulty before being asked to part with their address.
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [modalEmailInput, setModalEmailInput] = useState("");
  const [modalYearInput, setModalYearInput] = useState(initialYearLevel || "Year 7");

  const [yearLevel, setYearLevel] = useState(initialYearLevel || "Year 7");
  // Topic-specific landing pages preselect a curriculum code. We seed
  // topicId at mount and resolve its label from the dropdown source
  // once it's available so the picker reflects the preset.
  const [topicId, setTopicId] = useState(initialTopicId || "");
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
  // in the new year's curriculum). Skipped on the very first mount when
  // the parent landing page seeded an initialTopicId — otherwise the
  // preset would be wiped before the user ever sees it.
  const initialTopicIdRef = useRef(initialTopicId || null);
  useEffect(() => {
    if (initialTopicIdRef.current) {
      initialTopicIdRef.current = null;
      return;
    }
    setTopicId("");
    setTopicLabel("");
  }, [yearLevel]);

  // Resolve the preset topic's display label once the dropdown data
  // is available. Runs whenever the topic list for the active year
  // updates (e.g. on mount, or if topicsByYear changes).
  useEffect(() => {
    if (!topicId || topicLabel) return;
    const match = flatTopics.find((t) => t.id === topicId);
    if (match) setTopicLabel(match.label);
  }, [topicId, topicLabel, flatTopics]);

  // Submitted from the email-capture modal. Saves the address + child's
  // year level to the marketing list, mirrors them into local state +
  // localStorage, closes the modal, and continues straight to the
  // generation the user just clicked Generate to start.
  async function handleEmailModalSubmit(e) {
    e.preventDefault();
    setEmailError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalEmailInput)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailPending(true);
    try {
      const res = await fetch("/api/worksheets/email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: modalEmailInput,
          year_level: modalYearInput,
        }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) throw new Error(data?.error || "Could not save email.");
      try {
        window.localStorage.setItem(STORAGE_KEY, modalEmailInput);
      } catch {}
      setEmail(modalEmailInput);
      setEmailSaved(true);
      // Sync the form's year picker to whatever they confirmed in the
      // modal (might differ from the year they had open at the time).
      setYearLevel(modalYearInput);
      setEmailModalOpen(false);
      // Re-trigger the generation now that we have an email on file.
      // Pass an explicit year override since React state hasn't flushed
      // yet on the next line.
      handleGenerate(undefined, { yearLevelOverride: modalYearInput });
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

  async function handleGenerate(e, opts = {}) {
    if (e) e.preventDefault();
    setError(null);
    if (!topicLabel.trim()) {
      setError("Pick a topic.");
      return;
    }
    // First-time generators land on the email + year-level capture
    // modal instead of the generate endpoint. Pre-fill the modal with
    // the year they currently have selected.
    if (!emailSaved) {
      setModalEmailInput(email || "");
      setModalYearInput(yearLevel);
      setEmailError(null);
      setEmailModalOpen(true);
      return;
    }
    const effectiveYear = opts.yearLevelOverride || yearLevel;
    setGenerating(true);
    try {
      const res = await fetch("/api/worksheets/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          year_level: effectiveYear,
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
        yearLevel: data.year_level || effectiveYear,
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

      <FullTestUpsell onStart={() => setTrialPromptOpen(true)} />

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

      {emailModalOpen && (
        <EmailGateModal
          email={modalEmailInput}
          year={modalYearInput}
          pending={emailPending}
          error={emailError}
          onEmailChange={setModalEmailInput}
          onYearChange={setModalYearInput}
          onSubmit={handleEmailModalSubmit}
          onClose={() => {
            if (emailPending) return;
            setEmailModalOpen(false);
            setEmailError(null);
          }}
        />
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

function EmailGateModal({
  email,
  year,
  pending,
  error,
  onEmailChange,
  onYearChange,
  onSubmit,
  onClose,
}) {
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
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: c.white,
          borderRadius: 20,
          padding: 32,
          maxWidth: 440,
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
          One quick step
        </p>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 24,
            color: c.navy,
            lineHeight: 1.2,
            margin: "8px 0 8px",
          }}
        >
          Unlock your free worksheet
        </h2>
        <p style={{ color: c.textLight, fontSize: 14, lineHeight: 1.6, margin: "0 0 18px" }}>
          Drop your email and your child&apos;s year level. One free
          worksheet per day, no credit card needed.
        </p>

        <div style={{ display: "grid", gap: 14 }}>
          <label style={labelStyle}>
            <span>Your email</span>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="you@example.com"
              disabled={pending}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            <span>Child&apos;s year level</span>
            <select
              value={year}
              onChange={(e) => onYearChange(e.target.value)}
              disabled={pending}
              style={inputStyle}
            >
              {YEAR_LEVELS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <p
            style={{
              color: c.rose,
              fontSize: 13,
              margin: "12px 0 0",
              background: "#FFF1F2",
              padding: "8px 10px",
              borderRadius: 8,
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          style={{
            ...primaryButtonStyle,
            width: "100%",
            marginTop: 16,
            opacity: pending ? 0.7 : 1,
            cursor: pending ? "wait" : "pointer",
          }}
        >
          {pending ? "Saving…" : "Generate worksheet"}
        </button>
      </form>
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

function FullTestUpsell({ onStart }) {
  const points = [
    "25 questions across the whole topic: 5 consolidating, 15 standard, 5 advanced",
    "A printable test PDF, plus a separate answer key for marking",
    "Unlimited tests on any topic, for every child on your account",
  ];
  return (
    <div
      style={{
        marginTop: 20,
        background: c.tealPale,
        border: `1px solid ${c.tealLight}`,
        borderRadius: 20,
        padding: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 8,
        }}
      >
        <h2 style={{ ...h2Style, margin: 0 }}>Full practice test</h2>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: c.white,
            background: c.tealDark,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          Subscribers
        </span>
      </div>
      <p style={pMutedStyle}>
        Go beyond a worksheet with a full 25-question test covering a whole
        topic, ready to print and sit at home.
      </p>
      <ul
        style={{
          margin: "16px 0 20px",
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap: 8,
        }}
      >
        {points.map((line) => (
          <li
            key={line}
            style={{
              display: "flex",
              gap: 10,
              fontSize: 15,
              color: c.text,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: c.tealDark, fontWeight: 700 }}>&#10003;</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onStart} style={primaryButtonStyle}>
        Start your free trial to unlock
      </button>
      <p style={{ ...pMutedStyle, fontSize: 13, marginTop: 12 }}>
        Part of Tuterly, $29/month after a 7-day free trial. Cancel anytime.
      </p>
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
