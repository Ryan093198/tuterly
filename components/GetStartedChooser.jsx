"use client";

import { useState } from "react";
import { readJsonOrFallback } from "@/lib/practice-client";

// /get-started plan chooser. Three routes, one shared email field:
//   1. Buy session credits  → /api/billing/pack-checkout (anonymous; account
//      is created from the Stripe email after payment, credits + software
//      included, magic-link welcome).
//   2. Software free trial  → /api/billing/checkout-session (existing $29/mo
//      subscription with 7-day trial).
//   3. Get matched first    → marketing contact form (no payment yet).
const c = {
  navy: "#0B1220", ink: "#0F172A", slate: "#334155", slateLight: "#64748B",
  muted: "#94A3B8", line: "#E6EAF0", white: "#FFFFFF", cool: "#F7F9FC",
  teal: "#0D9488", tealDeep: "#0F766E", tealBright: "#14B8A6", tealPale: "#ECFDFB",
  amber: "#F59E0B", rose: "#E05B6D",
};
const sans = "'Inter','Helvetica Neue',Arial,sans-serif";

const emailValid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e || "").trim());

export default function GetStartedChooser({ packs = [] }) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(null); // "trial" | pack.id
  const [error, setError] = useState(null);

  async function go(url, action, extra) {
    setError(null);
    if (!emailValid(email)) {
      setError("Please enter a valid email so we can send your sign-in link.");
      return;
    }
    setPending(action);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), ...extra }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok || !data?.url) throw new Error(data?.error || "Could not start checkout.");
      window.location.href = data.url;
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setPending(null);
    }
  }

  const check = <path d="m5 12.5 4.5 4.5L19 7.5" />;
  const Check = ({ color = c.teal }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{check}</svg>
  );

  return (
    <div style={{ fontFamily: sans }}>
      {/* shared email */}
      <div style={{ maxWidth: 460, margin: "0 auto 34px" }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: c.slate, marginBottom: 8 }}>Your email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          style={{ width: "100%", height: 48, padding: "0 16px", borderRadius: 12, border: `1.5px solid ${c.line}`, fontSize: 15, fontFamily: sans, color: c.ink, outline: "none" }}
          onFocus={(e) => (e.target.style.borderColor = c.teal)}
          onBlur={(e) => (e.target.style.borderColor = c.line)}
        />
        <p style={{ fontSize: 12.5, color: c.muted, marginTop: 7 }}>We&apos;ll create your account and email a sign-in link after payment — no password to set up first.</p>
        {error && <p style={{ fontSize: 13, color: c.rose, marginTop: 10, fontWeight: 500 }}>{error}</p>}
      </div>

      {/* three options */}
      <div className="gs-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 20, alignItems: "start" }}>
        {/* BUY CREDITS — primary */}
        <div style={{ background: c.navy, borderRadius: 20, padding: "30px 28px", border: `1px solid ${c.navy}`, boxShadow: "0 24px 50px -22px rgba(11,18,32,0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <p style={{ fontSize: 14.5, fontWeight: 800, color: c.tealBright }}>Book a tutor</p>
            <span style={{ background: "rgba(20,184,166,0.16)", color: c.tealBright, borderRadius: 6, padding: "2px 8px", fontSize: 10.5, fontWeight: 700 }}>MOST POPULAR</span>
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 18 }}>
            Buy a pack of sessions and get matched with a high-achieving tutor. Reports, progress tracking, and the software are all included.
          </p>
          <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
            {packs.map((p) => (
              <div key={p.id} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 14.5, fontWeight: 700, color: "#fff" }}>{p.name} · {p.sessions} sessions</p>
                  <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>${Number(p.per_session ?? p.price / p.sessions).toFixed(0)} per session · software included</p>
                </div>
                <button
                  type="button"
                  onClick={() => go("/api/billing/pack-checkout", p.id, { pack_id: p.id })}
                  disabled={pending !== null}
                  style={{ flexShrink: 0, padding: "10px 16px", borderRadius: 10, border: "none", background: c.tealBright, color: c.navy, fontSize: 14, fontWeight: 800, cursor: "pointer", opacity: pending && pending !== p.id ? 0.5 : 1 }}
                >
                  {pending === p.id ? "…" : `$${Number(p.price).toFixed(0)}`}
                </button>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Credits never expire. Cancel anytime — no lock-in.</p>
        </div>

        {/* RIGHT COLUMN — trial + match */}
        <div style={{ display: "grid", gap: 20 }}>
          {/* SOFTWARE TRIAL */}
          <div style={{ background: c.white, borderRadius: 20, padding: "26px 26px", border: `1px solid ${c.line}` }}>
            <p style={{ fontSize: 14.5, fontWeight: 800, color: c.tealDeep, marginBottom: 6 }}>Just the software</p>
            <p style={{ fontSize: 14, color: c.slateLight, lineHeight: 1.6, marginBottom: 16 }}>
              Reports, progress tracking, and the practice generator to use with school work or your own tutor. <strong style={{ color: c.ink }}>$29/month</strong>, 7-day free trial.
            </p>
            <button
              type="button"
              onClick={() => go("/api/billing/checkout-session", "trial", {})}
              disabled={pending !== null}
              style={{ width: "100%", padding: "13px", borderRadius: 11, border: `1.5px solid ${c.line}`, background: c.white, color: c.ink, fontSize: 14.5, fontWeight: 700, cursor: "pointer", opacity: pending && pending !== "trial" ? 0.5 : 1 }}
            >
              {pending === "trial" ? "Redirecting…" : "Start 7-day free trial →"}
            </button>
          </div>

          {/* GET MATCHED */}
          <div style={{ background: c.cool, borderRadius: 20, padding: "26px 26px", border: `1px solid ${c.line}` }}>
            <p style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 6 }}>Not sure yet?</p>
            <p style={{ fontSize: 14, color: c.slateLight, lineHeight: 1.6, marginBottom: 16 }}>
              Prefer to meet a tutor before paying? Tell us your child&apos;s year level and subject and we&apos;ll match you first — pay once you&apos;re comfortable.
            </p>
            <a href="/parents#talk" style={{ display: "inline-block", fontSize: 14.5, fontWeight: 700, color: c.tealDeep, textDecoration: "none" }}>Get matched first →</a>
          </div>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: 13, color: c.muted, marginTop: 26 }}>
        Payments are secured by Stripe. <Check color={c.teal} /> Buying a pack includes full software access automatically.
      </p>

      <style>{`@media(max-width:760px){ .gs-grid{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}
