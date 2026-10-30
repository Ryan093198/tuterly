"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// Tuterly Scholarship waitlist for the /scholarship guide pages. Posts to
// the existing /api/scholarship-waitlist route (same fields the practice
// pages' WaitlistBox sends), so sign-ups land in scholarship_waitlist with
// the guide's path as source_page. Never the Years 7 to 10 app waitlist.
//
// variant: "hero" (compact, above the fold) | "band" (full, end of page)
export default function ScholarshipCTA({ sourcePage, variant = "band", defaultEntry = "", defaultTest = "", id = "sch-cta" }) {
  const [email, setEmail] = useState("");
  const [entry, setEntry] = useState(defaultEntry ? String(defaultEntry) : "");
  const [test, setTest] = useState(defaultTest);
  const [hp, setHp] = useState("");
  const [state, setState] = useState("idle"); // idle | busy | done | error
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/scholarship-waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          role: "parent",
          // Child's current year is one below the entry year.
          child_year: entry ? Number(entry) - 1 : null,
          test_provider: test || "not_sure",
          practice_score: null,
          practice_level: null,
          source_page: sourcePage,
          company_website: hp,
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d?.error || "Something went wrong. Try again.");
      setState("done");
      trackEvent("sch_guide_waitlist", { source: sourcePage, entry: entry || null, test: test || "not_sure", variant });
    } catch (err) {
      setMsg(err.message);
      setState("error");
    }
  }

  const hero = variant === "hero";

  return (
    <div className={`sg-cta ${hero ? "sg-cta--hero" : ""}`} id={id}>
      {state === "done" ? (
        <div aria-live="polite">
          <p className="sg-cta__title">You&rsquo;re on the Tuterly Scholarship list.</p>
          <p className="sg-cta__text">
            We&rsquo;ll email you when the diagnostic opens, with the launch price. In the meantime, the{" "}
            <Link href="/scholarship-practice">free practice questions</Link> are ready now.
          </p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p className="sg-cta__title">
            {hero ? "Find out where your child stands, before test day." : "Start with the free scholarship diagnostic."}
          </p>
          <p className="sg-cta__text">
            Tuterly Scholarship opens with a diagnostic for Year 5, 6 and 7 entry. <strong>The first 10 questions are free.</strong>{" "}
            Scholarship Pass then unlocks full worked solutions and follow-up practice on every question your child misses:{" "}
            <strong>launch special A$99 one-off per entry level</strong> (usual price A$198 from 1 April 2027). Join the list to hear when it opens.
          </p>
          <div className="sg-cta__row">
            <input
              type="email" required autoComplete="email" placeholder="Parent's email"
              value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Parent's email"
            />
            <select value={entry} onChange={(e) => setEntry(e.target.value)} aria-label="Entry year">
              <option value="">Entry year?</option>
              <option value="5">Year 5 entry</option>
              <option value="6">Year 6 entry</option>
              <option value="7">Year 7 entry</option>
            </select>
            <select value={test} onChange={(e) => setTest(e.target.value)} aria-label="Which test">
              <option value="">Which test?</option>
              <option value="acer">ACER</option>
              <option value="edutest">Edutest</option>
              <option value="aas">AAS</option>
              <option value="selective">Selective school test</option>
              <option value="not_sure">Not sure yet</option>
            </select>
            <button type="submit" className="tb-btn tb-btn--primary sg-cta__btn" disabled={state === "busy"}>
              {state === "busy" ? "One moment…" : "Join the Scholarship list"}
            </button>
          </div>
          <input
            type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)}
            className="sg-hp" aria-hidden="true" name="company_website"
          />
          {state === "error" && <p className="sg-cta__err" role="alert">{msg}</p>}
          <p className="sg-cta__small">
            One email when it opens, no spam. Want to start today? Try the{" "}
            <Link href="/scholarship-practice">free practice questions</Link>.
          </p>
        </form>
      )}
    </div>
  );
}
