"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// Standalone sign-up for the weekly worksheet email. Saves through the same
// route as the worksheet generator (/api/worksheets/email), with weekly and
// marketing consent: the form's only purpose is the weekly email, and the
// consent wording sits right under the button (Spam Act: express consent).
import { WEEKLY_EMAIL_LIVE } from "@/components/study/WeeklyOptIn";

export default function WeeklySignup({ yearLevel, placement }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | busy | done | error
  const [msg, setMsg] = useState("");

  // Hidden while the weekly worksheet email is paused (9 Nov 2026).
  if (!WEEKLY_EMAIL_LIVE) return null;

  async function submit(e) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/worksheets/email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, year_level: yearLevel, marketing_opt_in: true, weekly_opt_in: true, source: "weekly_signup", source_page: typeof window !== "undefined" ? window.location.pathname : null, weekly_source: String(placement || "weekly_signup").replace(/[^a-z0-9_]/gi, "_").toLowerCase().slice(0, 40) }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d?.error || "Something went wrong. Try again.");
      setState("done");
      trackEvent("generate_lead", { lead_type: "weekly_worksheet", source: placement });
    } catch (err) {
      setMsg(err.message);
      setState("error");
    }
  }

  const box = { background: "var(--brand-soft)", borderRadius: 16, padding: "20px 22px", maxWidth: 640, margin: "0 auto" };
  if (state === "done") {
    return (
      <div style={box}>
        <p style={{ fontWeight: 800, fontSize: 17, margin: "0 0 4px" }}>You&rsquo;re in.</p>
        <p style={{ margin: 0, lineHeight: 1.6 }}>Your first free {yearLevel} worksheet arrives next Monday evening.</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={box}>
      <p style={{ fontWeight: 800, fontSize: 17, margin: "0 0 4px" }}>A free {yearLevel} worksheet every Monday</p>
      <p style={{ margin: "0 0 12px", lineHeight: 1.6, color: "var(--muted)" }}>Three questions on one topic each week, with answers and a full worksheet one click away.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input type="email" required autoComplete="email" placeholder="Parent's email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email"
          style={{ flex: "1 1 220px", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 16 }} />
        <button type="submit" disabled={state === "busy"}
          style={{ padding: "12px 18px", borderRadius: 10, border: 0, background: "var(--brand)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          {state === "busy" ? "One moment…" : "Send me the worksheets"}
        </button>
      </div>
      <p style={{ marginTop: 10, marginBottom: 0, fontSize: 13, lineHeight: 1.5, color: "var(--muted)" }}>
        By signing up you&rsquo;ll get a free worksheet for your child&rsquo;s year each week, plus Tuterly news. Unsubscribe any time with one click.
      </p>
      {state === "error" && <p role="alert" style={{ color: "#b91c1c", margin: "8px 0 0", fontSize: 14 }}>{msg}</p>}
    </form>
  );
}
