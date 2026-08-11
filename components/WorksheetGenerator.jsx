"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
// Post-generation upsell. Fires on ENGAGEMENT (scrolled to the end of the
// worksheet, opened a worked solution, or downloaded the PDF) rather than the
// instant the worksheet paints - a modal thrown over the thing they just
// waited 30s for reads as bait-and-switch and gets dismissed reflexively.
const UPSELL_SESSION_KEY = "tuterly:worksheet_upsell_seen";
// Floor on how soon after generation the modal may appear, so a fast scroll
// or a stray toggle click cannot pre-empt them actually looking at it.
const UPSELL_MIN_DWELL_MS = 4000;

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
  teal: "#0D9488",
  tealLight: "#14B8A6",
  tealDark: "#0F766E",
  tealPale: "#ECFDFB",
  navy: "#0F172A",
  navyMid: "#1E293B",
  text: "#334155",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  border: "#E6EAF0",
  rose: "#F43F5E",
  amber: "#F59E0B",
};

export default function WorksheetGenerator({
  topicsByYear,
  initialYearLevel,
  initialTopicId,
  // Optional subset of year levels to offer (e.g. primary-only pages pass
  // Years 3-6). Defaults to the full Year 3-10 range.
  yearLevels,
}) {
  const years =
    Array.isArray(yearLevels) && yearLevels.length ? yearLevels : YEAR_LEVELS;
  const defaultYear =
    initialYearLevel && years.includes(initialYearLevel)
      ? initialYearLevel
      : years[0];
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailPending, setEmailPending] = useState(false);
  const [emailError, setEmailError] = useState(null);
  // Email-capture modal opens on first Generate click instead of
  // gating the whole page. Visitors get to browse year + topic +
  // difficulty before being asked to part with their address.
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [modalEmailInput, setModalEmailInput] = useState("");
  const [modalYearInput, setModalYearInput] = useState(defaultYear);

  const [yearLevel, setYearLevel] = useState(defaultYear);
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
  const [upsellOpen, setUpsellOpen] = useState(false);
  // Ref rather than state: the guard is read inside listeners that must not
  // re-subscribe when it flips.
  const upsellFiredRef = useRef(false);
  const worksheetShownAtRef = useRef(0);
  const upsellSentinelRef = useRef(null);
  // Mirrors "some other modal is open" into a ref. Kept out of the
  // maybeOpenUpsell dep list on purpose: if the callback changed identity
  // whenever a modal opened or closed, the observer effect below would
  // re-subscribe and drop any engagement during the gap.
  const upsellBlockedRef = useRef(false);
  // Pending delayed-open timer, so it can be cancelled and cannot outlive the
  // component or the state it was scheduled under.
  const upsellTimerRef = useRef(null);
  const resultRef = useRef(null);

  // Scroll to the generated worksheet once it actually paints. Keyed on
  // `worksheet` (not a rAF in the click handler) so the ref is attached by
  // the time we scroll - otherwise the result lands below the fold, hidden
  // under the upsell card, and parents think nothing happened.
  useEffect(() => {
    if (worksheet) {
      worksheetShownAtRef.current = Date.now();
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [worksheet]);

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

  // Single gate for every engagement signal. Once per browser session, never
  // stacked on top of another modal, and never before the dwell floor unless
  // the signal is high-intent (a PDF download).
  useEffect(() => {
    upsellBlockedRef.current = emailModalOpen || trialPromptOpen || generating;
  }, [emailModalOpen, trialPromptOpen, generating]);

  // Spends the once-per-session budget and opens the modal. Guards are
  // re-checked HERE rather than at schedule time, so a delayed open that is
  // no longer appropriate (another modal went up, a regenerate started) is
  // dropped without consuming the budget.
  const commitUpsell = useCallback(() => {
    if (upsellFiredRef.current) return;
    if (upsellBlockedRef.current) return;
    try {
      if (window.sessionStorage.getItem(UPSELL_SESSION_KEY)) {
        upsellFiredRef.current = true;
        return;
      }
      window.sessionStorage.setItem(UPSELL_SESSION_KEY, "1");
    } catch {}
    upsellFiredRef.current = true;
    setUpsellOpen(true);
  }, []);

  const cancelPendingUpsell = useCallback(() => {
    if (upsellTimerRef.current) {
      clearTimeout(upsellTimerRef.current);
      upsellTimerRef.current = null;
    }
  }, []);

  const maybeOpenUpsell = useCallback(
    ({ force = false, delayMs = 0 } = {}) => {
      if (upsellFiredRef.current) return;
      if (upsellBlockedRef.current) return;
      if (upsellTimerRef.current) return;
      if (!force && Date.now() - worksheetShownAtRef.current < UPSELL_MIN_DWELL_MS) {
        return;
      }
      if (delayMs > 0) {
        upsellTimerRef.current = setTimeout(() => {
          upsellTimerRef.current = null;
          commitUpsell();
        }, delayMs);
        return;
      }
      commitUpsell();
    },
    [commitUpsell]
  );

  useEffect(() => cancelPendingUpsell, [cancelPendingUpsell]);

  // Signal 1: they scrolled to the END of the worksheet.
  //
  // Only a not-visible -> visible TRANSITION counts. IntersectionObserver
  // always delivers an initial callback describing the current state, so
  // firing on any intersecting entry would trigger on short worksheets that
  // already fit the viewport, with no scrolling at all - the opposite of the
  // signal we want, and more likely now the worksheet is 6 questions rather
  // than 10. A sentinel that was on screen from the start proves nothing;
  // those parents reach the modal by opening a solution or downloading
  // instead, both of which are real engagement.
  useEffect(() => {
    if (!worksheet) return;
    if (typeof IntersectionObserver === "undefined") return;
    const el = upsellSentinelRef.current;
    if (!el) return;
    let seenOffScreen = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          seenOffScreen = true;
          return;
        }
        if (!seenOffScreen) return;
        // The transition IS the engagement signal, so never drop it just
        // because the dwell floor has not elapsed - defer it by whatever is
        // left instead. The deferred open re-checks every guard when it runs.
        const remaining =
          UPSELL_MIN_DWELL_MS - (Date.now() - worksheetShownAtRef.current);
        maybeOpenUpsell(
          remaining > 0 ? { force: true, delayMs: remaining } : {}
        );
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [worksheet, maybeOpenUpsell]);

  // Signal 2: they opened a worked solution. The `toggle` event does not
  // bubble, so listen in the capture phase on the result container.
  useEffect(() => {
    if (!worksheet) return;
    const el = resultRef.current;
    if (!el) return;
    const onToggle = (ev) => {
      const t = ev.target;
      if (t && t.tagName === "DETAILS" && t.open) maybeOpenUpsell();
    };
    el.addEventListener("toggle", onToggle, true);
    return () => el.removeEventListener("toggle", onToggle, true);
  }, [worksheet, maybeOpenUpsell]);

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
      cancelPendingUpsell();
      setUpsellOpen(false);
      setModalEmailInput(email || "");
      setModalYearInput(yearLevel);
      setEmailError(null);
      setEmailModalOpen(true);
      return;
    }
    const effectiveYear = opts.yearLevelOverride || yearLevel;
    // Regenerating behind an open (or about-to-open) upsell would scroll the
    // fresh worksheet in underneath the overlay.
    cancelPendingUpsell();
    setUpsellOpen(false);
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
      // Scrolling to the result is handled by an effect keyed on `worksheet`,
      // which runs after the result has painted.
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
      // Signal 3: downloading the PDF. Highest intent of the three, so it
      // skips the dwell floor - but it waits out the browser's own download
      // UI rather than painting on top of it.
      cancelPendingUpsell();
      maybeOpenUpsell({ force: true, delayMs: 1500 });
    } catch (err) {
      setError(err.message || "Could not download PDF.");
    }
  }

  // --- Render ---

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      <div style={cardStyle}>
        <h2 style={h2Style}>Generate a free maths worksheet</h2>
        <p style={pMutedStyle}>
          Six questions across Foundation, Standard and Extension, with full
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
              {years.map((y) => (
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
              <option value="">, Choose a topic, </option>
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
        <button
          type="button"
          onClick={() =>
            resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          style={readyPromptStyle}
        >
          Your worksheet is ready. Tap here to view it below ↓
        </button>
      )}

      {worksheet && (
        <div ref={resultRef} style={{ marginTop: 20 }}>
          <div style={{ ...cardStyle }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 10 }}>
              Your worksheet is ready
            </p>
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
            {/* Engagement sentinel: crossing this means they read to the end. */}
            <div ref={upsellSentinelRef} aria-hidden="true" style={{ height: 1 }} />
          </div>

          <TrialBanner />
        </div>
      )}

      <FullTestUpsell
        onStart={() => {
          cancelPendingUpsell();
          setUpsellOpen(false);
          setTrialPromptOpen(true);
        }}
      />

      {emailModalOpen && (
        <EmailGateModal
          email={modalEmailInput}
          year={modalYearInput}
          yearLevels={years}
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

      {upsellOpen && (
        <WorksheetUpsellModal
          onClose={() => {
            setUpsellOpen(false);
            setTrialError(null);
          }}
          onStart={handleStartTrial}
          pending={trialPending}
          error={trialError}
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
  yearLevels,
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
              {(yearLevels || YEAR_LEVELS).map((y) => (
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
  // Problem-first CTA, kept deliberately tight: name the gap, then the fix.
  // Feature-led copy buried the pitch, so this leads with the concern.
  const PROBLEM =
    "They come sorted by topic, so your child knows the method before they read the question.";
  const points = [
    "Unlimited questions on entire topics, mixed difficulty, VCAA aligned",
    "Printable test, plus a separate answer key for marking",
    "Any topic, any time, designed to mimic actual test questions",
  ];
  return (
    <div
      style={{
        marginTop: 20,
        background: c.tealPale,
        border: `1px solid ${c.tealLight}`,
        borderRadius: 20,
        padding: 28,
      }}
    >
      <h2 style={{ ...h2Style, margin: "0 0 10px" }}>
        Textbook questions won&apos;t lift a test mark.
      </h2>

      <p style={{ ...pMutedStyle, marginBottom: 12 }}>{PROBLEM}</p>

      <p
        style={{
          fontSize: 15.5,
          fontWeight: 600,
          color: c.navy,
          lineHeight: 1.6,
          margin: "0 0 16px",
        }}
      >
        That&apos;s where Tuterly comes in and closes the gap: unlimited
        questions, mixed up, under test conditions, including worded problems.
      </p>

      <ul
        style={{
          margin: "0 0 20px",
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
        Build their first test free &rarr;
      </button>
      <p style={{ ...pMutedStyle, fontSize: 13, marginTop: 12 }}>
        Free for 7 days, then $29/month. Cancel anytime.
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

function WorksheetUpsellModal({ onClose, onStart, pending, error }) {
  // Lock the page behind the overlay. Mount-scoped: `onClose` is an inline
  // arrow from the parent, so keying this on it would tear down and re-apply
  // the lock on every parent render.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !pending) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, pending]);

  const points = [
    "Unlimited worksheets on every topic, Year 3 to Year 10",
    "Test and exam style papers covering a whole topic, not one skill",
    "Fresh questions every time, so nothing gets memorised",
    "Fully worked solutions, plus a separate answer key for marking",
  ];
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="worksheet-upsell-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: c.white,
          borderRadius: 20,
          padding: 32,
          maxWidth: 470,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
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
          Keep going
        </p>
        <h2
          id="worksheet-upsell-title"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 26,
            color: c.navy,
            lineHeight: 1.2,
            margin: "8px 0 12px",
          }}
        >
          That&apos;s six questions on one topic.
        </h2>
        <p style={{ color: c.textLight, fontSize: 15, lineHeight: 1.65, margin: "0 0 16px" }}>
          A term of maths is forty. With Tuterly your child can generate
          unlimited worksheets on every topic in the curriculum, and sit full
          test style papers across a whole topic when an assessment is coming
          up.
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
          {points.map((t) => (
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
            {pending ? "Starting…" : "Start the 7-day free trial"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            style={{ ...secondaryButtonStyle, flex: "0 0 auto" }}
          >
            Not now
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
          $29 / month after the trial. Cancel any time before it ends and you
          won&apos;t be charged.
        </p>
      </div>
    </div>
  );
}

const readyPromptStyle = {
  display: "block",
  width: "100%",
  marginTop: 16,
  padding: "13px 16px",
  borderRadius: 12,
  border: "1px solid #0D9488",
  background: "#ECFDFB",
  color: "#0F766E",
  fontSize: 14.5,
  fontWeight: 600,
  cursor: "pointer",
  textAlign: "center",
};

const cardStyle = {
  background: c.white,
  border: `1px solid ${c.border}`,
  borderRadius: 20,
  padding: 32,
  boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
};

const h2Style = {
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontSize: 28,
  fontWeight: 800,
  letterSpacing: "-0.6px",
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
  padding: "14px 28px",
  borderRadius: 12,
  background: c.navy,
  color: c.white,
  fontSize: 15,
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(15,27,45,0.18)",
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
