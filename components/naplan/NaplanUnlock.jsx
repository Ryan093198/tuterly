"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// Shown on a paid NAPLAN practice test (Tests 2 to 5) when this browser
// doesn't have access yet. Years 3 and 5: buy the one-off NAPLAN Pass.
// Years 7 and 9: included with a Tuterly subscription. Anyone who has
// already paid asks for a sign-in link by email.
export default function NaplanUnlock({ year, testNo, pass, passPrice, sub, signedInAs }) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [linkEmail, setLinkEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function buy(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    trackEvent("naplan_pass_checkout", { year, test: testNo });
    try {
      const r = await fetch("/api/naplan/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ year, email, agreed }) });
      const d = await r.json();
      if (d.url) { window.location.href = d.url; return; }
      setErr(d.error || "Something went wrong. Try again.");
    } catch {
      setErr("Something went wrong. Try again.");
    }
    setBusy(false);
  }

  async function sendLink(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const r = await fetch("/api/naplan/signin", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ year, email: linkEmail }) });
      const d = await r.json();
      if (d.ok) setSent(true); else setErr(d.error || "Something went wrong. Try again.");
    } catch {
      setErr("Something went wrong. Try again.");
    }
    setBusy(false);
  }

  return (
    <div className="nu">
      <div className="nu-card">
        <p className="nu-lock" aria-hidden="true">🔒</p>
        {pass ? (
          <>
            <p className="nu-t">Practice Tests 2 to 5 come with the Year {year} NAPLAN Pass</p>
            <p className="nu-x">
              <strong>{passPrice} one-off</strong> for all four extra Year {year} tests: 80 more NAPLAN-style questions, built like the real online test, each marked instantly with a worked solution. No subscription.
            </p>
            <form className="nu-form" onSubmit={buy}>
              <label className="nu-label" htmlFor="nu-email">Your email (we&rsquo;ll send the receipt and your sign-in link here)</label>
              <input id="nu-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              <label className="nu-agree"><input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /> I agree to the <Link href="/terms">terms</Link></label>
              <button type="submit" className="nt-btn nt-btn--big" disabled={busy || !agreed}>Get the NAPLAN Pass ({passPrice})</button>
            </form>
          </>
        ) : (
          <>
            <p className="nu-t">Practice Tests 2 to 5 are included with Tuterly</p>
            <p className="nu-x">
              {sub.live
                ? <><strong>{sub.price} a month</strong> for unlimited practice tests on every Year {year} topic in the Tuterly app, plus all five NAPLAN-style tests here, each marked instantly with worked solutions.</>
                : <>The Tuterly app launches soon. Sign up early and these tests open with your subscription: unlimited practice tests on every Year {year} topic in the app, plus all five NAPLAN-style tests here.</>}
            </p>
            <Link href={sub.href} className="nt-btn nt-btn--big" onClick={() => trackEvent("naplan_sub_click", { year, test: testNo })}>{sub.label}</Link>
          </>
        )}
        {err && <p className="nu-err" role="alert">{err}</p>}
      </div>

      <div className="nu-card nu-card--quiet">
        <p className="nu-t2">Already have access?</p>
        {signedInAs && <p className="nu-x">{signedInAs} doesn&rsquo;t have access to the Year {year} tests yet. Use the email you paid with.</p>}
        {sent ? (
          <p className="nu-x" role="status">If that email has access, a sign-in link is on its way. Check your inbox (and spam) in a minute.</p>
        ) : (
          <form className="nu-form nu-form--row" onSubmit={sendLink}>
            <input type="email" required autoComplete="email" aria-label="Email you paid with" value={linkEmail} onChange={(e) => setLinkEmail(e.target.value)} placeholder="Email you paid with" />
            <button type="submit" className="nu-btn2" disabled={busy}>Email me a sign-in link</button>
          </form>
        )}
      </div>
    </div>
  );
}
