"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// The free weekly worksheet email offer (Ryan, 9 Nov 2026), shared by the
// worksheet generator and the exam generator: a tick box in the email gate
// (unticked by default, Spam Act) and a one-tap card after the result or at
// the daily limit. Subscribers get two free worksheets and two free exams a
// day (app/api/worksheets/generate, app/api/exam/generate).

// Set once this browser has signed up, so the card isn't shown again.
export const WEEKLY_STORAGE_KEY = "tuterly:worksheet_weekly";
// The weekly email itself only goes to these years (lib/weekly-email.js).
const WEEKLY_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

const c = { teal: "var(--brand-text)", navy: "var(--foreground)", textLight: "var(--muted)", rose: "var(--danger)" };
const primaryButtonStyle = {
  padding: "14px 28px",
  borderRadius: 12,
  background: "var(--foreground)",
  color: "var(--card)",
  fontSize: 15,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(15,27,45,0.18)",
};
const errorTextStyle = { color: c.rose, fontSize: 14, margin: 0, background: "#FFF1F2", padding: "10px 12px", borderRadius: 8 };

export function isWeeklySubscribedHere() {
  try { return !!window.localStorage.getItem(WEEKLY_STORAGE_KEY); } catch { return false; }
}
export function markWeeklySubscribedHere() {
  try { window.localStorage.setItem(WEEKLY_STORAGE_KEY, "1"); } catch {}
}

// The tick box in an email gate.
export function WeeklyOptInBox({ yearLevel, checked, onChange, disabled, kind = "worksheet" }) {
  const offer = weeklyOffer(yearLevel, kind);
  return (
    <label
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        cursor: "pointer",
        padding: "14px 14px 14px 12px",
        borderRadius: 14,
        border: `2px solid ${checked ? "var(--brand)" : "var(--brand-soft)"}`,
        background: "var(--brand-pale, var(--brand-soft))",
        textAlign: "left",
      }}
    >
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{ width: 20, height: 20, margin: "1px 0 0", flex: "none", accentColor: "var(--brand)" }}
      />
      <span style={{ display: "grid", gap: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: c.navy, lineHeight: 1.35 }}>{offer.title}</span>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: c.textLight, lineHeight: 1.5 }}>
          {offer.points.join(". ")}. {offer.fine}
        </span>
      </span>
    </label>
  );
}

const WEEKLY_YEAR_SET = new Set(WEEKLY_YEARS);

// What ticking the weekly email gets them, worded for their year. The
// weekly email itself only goes to Years 7 to 10A (lib/weekly-email.js);
// every subscriber gets two worksheets a day.
// kind: "worksheet" or "exam" (what the extra daily allowance is for).
export function weeklyOffer(yearLevel, kind = "worksheet") {
  const weekly = WEEKLY_YEAR_SET.has(yearLevel);
  const extra = kind === "exam" ? "2 free practice exams a day here, instead of 1" : "2 free worksheets a day here, instead of 1";
  return {
    weekly,
    title: weekly
      ? `Get a new ${yearLevel} worksheet every Monday`
      : kind === "exam" ? "Get 2 free practice exams a day" : "Get 2 free worksheets a day",
    points: weekly
      ? [
          "Fully worked solutions, a different topic each week",
          extra,
        ]
      : [extra, "New free maths resources by email"],
    fine: "Free. Includes occasional Tuterly news. Unsubscribe any time from any email.",
  };
}

// The second ask, under a finished worksheet or at the daily limit. One
// tap is the consent: the button says exactly what they're signing up for.
export function WeeklyOptInCard({ email, yearLevel, placement, onSubscribed, kind = "worksheet", style }) {
  const [state, setState] = useState("idle"); // idle | pending | done | error
  const offer = weeklyOffer(yearLevel, kind);
  const unit = kind === "exam" ? "practice exams" : "worksheets";
  const atLimit = placement === "limit";

  async function subscribe() {
    if (!email) return;
    setState("pending");
    try {
      const res = await fetch("/api/worksheets/email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, year_level: yearLevel, marketing_opt_in: true, weekly_opt_in: true }),
      });
      if (!res.ok) throw new Error();
      markWeeklySubscribedHere();
      setState("done");
      trackEvent("weekly_opt_in", { source: placement, year: yearLevel, kind });
      onSubscribed?.();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div style={{ ...weeklyCardStyle, ...style }} role="status">
        <p style={weeklyTitleStyle}>You&rsquo;re in.</p>
        <p style={weeklyFineStyle}>
          {offer.weekly
            ? `Your first ${yearLevel} worksheet arrives on Monday evening. You can now make 2 ${unit} a day here.`
            : `You can now make 2 ${unit} a day here.`}
        </p>
      </div>
    );
  }

  return (
    <div style={{ ...weeklyCardStyle, ...style }}>
      <p style={weeklyKickerStyle}>{atLimit ? "Want another one today?" : "Free, every week"}</p>
      <p style={weeklyTitleStyle}>{offer.title}</p>
      <ul style={weeklyListStyle}>
        {offer.points.map((p) => (
          <li key={p} style={weeklyItemStyle}>
            <span aria-hidden="true" style={weeklyTickStyle}>✓</span>
            {p}
          </li>
        ))}
      </ul>
      <button type="button" onClick={subscribe} disabled={state === "pending" || !email} style={{ ...primaryButtonStyle, marginTop: 14, opacity: state === "pending" ? 0.7 : 1 }}>
        {state === "pending" ? "Saving…" : atLimit ? "Sign me up and unlock it" : offer.weekly ? "Yes, send them to me" : "Yes, sign me up"}
      </button>
      {state === "error" && <p style={{ ...errorTextStyle, marginTop: 10 }}>That didn&rsquo;t work. Try again.</p>}
      <p style={{ ...weeklyFineStyle, marginTop: 10 }}>
        {email ? <>Sending to {email}. </> : null}
        {offer.fine}
      </p>
    </div>
  );
}

// Weekly worksheet email card (Ryan, 9 Nov 2026).
const weeklyCardStyle = {
  marginTop: 20,
  padding: "18px 18px 16px",
  borderRadius: 18,
  border: "2px solid var(--brand-soft)",
  background: "var(--brand-pale, var(--brand-soft))",
};
const weeklyKickerStyle = {
  margin: 0,
  fontSize: 12.5,
  fontWeight: 800,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: c.teal,
};
const weeklyTitleStyle = { margin: "6px 0 0", fontSize: 19, fontWeight: 900, color: c.navy, lineHeight: 1.3 };
const weeklyListStyle = { listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 6 };
const weeklyItemStyle = { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, fontWeight: 700, color: c.navy, lineHeight: 1.45 };
const weeklyTickStyle = {
  flex: "none",
  width: 20,
  height: 20,
  marginTop: 1,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "var(--brand)",
  color: "var(--on-brand, #fff)",
  fontSize: 11,
  fontWeight: 900,
};
const weeklyFineStyle = { margin: "6px 0 0", fontSize: 13, fontWeight: 600, color: c.textLight, lineHeight: 1.5 };
