"use client";

import { useState } from "react";
import Link from "next/link";
import PaperClient from "@/components/paper/PaperClient";
import { trackEvent } from "@/lib/analytics";
import { appCta } from "@/lib/study-app";
import { STUDY_RESULTS } from "@/lib/study-results";
import "./diagnostic.css";

// The free diagnostic test (/maths-diagnostic-test/year-N): the Teacher Zone
// test screen, marked by /api/diagnostic/mark, with the chapter results, the
// parent report form and the app pitch after marking.
const PILL = { strong: "Strong", work: "Needs work", notyet: "Not yet" };

function ReportForm({ yearSlug, answers }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [notify, setNotify] = useState(false);
  const [hp, setHp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(null);

  async function send(e) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("Please enter a valid email address.");
    setBusy(true);
    try {
      const res = await fetch("/api/diagnostic/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ year: yearSlug, answers, email: email.trim(), name: name.trim(), notify, company_website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data?.error || "Something went wrong. Try again.");
      setSent(email.trim());
      trackEvent("diagnostic_report_sent", { year: yearSlug, notify });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="dg-report dg-full" role="status">
        <p className="dg-k">Report sent</p>
        <p className="dg-report__t">Check {sent}</p>
        <p className="dg-report__x">It&rsquo;s from learn@tuterly.com.au. If it isn&rsquo;t there in a few minutes, look in the spam or promotions folder.</p>
      </div>
    );
  }
  return (
    <form className="dg-report dg-full" onSubmit={send} noValidate>
      <p className="dg-k">For parents</p>
      <p className="dg-report__t">Get the full report by email</p>
      <p className="dg-report__x">Every chapter&rsquo;s result, what each weak topic leads to next year, and where to start. Free, and nothing to sign up for.</p>
      <div className="dg-report__row">
        <label className="dg-f">
          <span>Parent&rsquo;s email</span>
          <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="dg-f">
          <span>Student&rsquo;s first name <em>(optional)</em></span>
          <input autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <label className="dg-check">
        <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
        <span>Also email me when the Tuterly app launches</span>
      </label>
      <label className="dg-hp" aria-hidden="true">
        Company website
        <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </label>
      {error && <p className="dg-err" role="alert">{error}</p>}
      <button type="submit" className="tb-btn tb-btn--primary" disabled={busy}>{busy ? "Sending…" : "Email me the report"}</button>
      <p className="dg-fine">We only send this one email{notify ? ", plus one when the app launches" : ""}.</p>
    </form>
  );
}

function Pitch({ next }) {
  const cta = appCta();
  return (
    <div className="dg-pitch dg-full">
      <p className="dg-k dg-k--light">Get ready for {next}</p>
      <p className="dg-pitch__t">Gaps from this year come straight back next year.</p>
      <p className="dg-pitch__x">Each year of maths builds on the last. The best fix is a little practice every week on exactly the topics above, not cramming the week before a test.</p>
      <ul className="dg-pitch__list">
        <li><strong>Snap any question you got wrong</strong> here or on a school test, and get a worked solution in seconds.</li>
        <li><strong>Fresh practice on those topics</strong>, unlimited, until it sticks.</li>
        <li><strong>Every Years 7 to 10 topic</strong>, aligned to the Victorian Curriculum.</li>
      </ul>
      <p className="dg-pitch__proof">{STUDY_RESULTS.line}</p>
      <Link href={cta.href} className="tb-btn tb-btn--primary dg-pitch__btn" onClick={() => trackEvent("diagnostic_cta_click", { live: cta.live })}>
        {cta.live ? "Get Tuterly" : "Get early access to the Tuterly app"}
      </Link>
      <p className="dg-pitch__fine">{STUDY_RESULTS.finePrint}</p>
    </div>
  );
}

export default function DiagnosticClient({ paper, yearSlug, next }) {
  return (
    <PaperClient
      paper={paper}
      markUrl="/api/diagnostic/mark"
      markExtra={{ year: yearSlug }}
      eyebrow={`Free diagnostic test · for students in ${paper.year} now`}
      intro={
        <div className="dg-intro">
          <p><strong>Before you start:</strong> have a pen, paper and a calculator. Work each question out on paper, then type your answer in the box.</p>
          <p>If you haven&rsquo;t learned a topic yet, leave it blank. That&rsquo;s useful to know too. When you&rsquo;re done, press <strong>Mark my test</strong>.</p>
        </div>
      }
      renderResult={(result, answers) => (
        <>
          <div className="dg-chapters">
            <p className="dg-k">By chapter</p>
            <ul>
              {result.chapters.map((c) => (
                <li key={c.name}>
                  <span className="dg-chapters__n">{c.name}</span>
                  <span className={`dg-pill dg-pill--${c.status}`}>{PILL[c.status]}</span>
                </li>
              ))}
            </ul>
          </div>
          <ReportForm yearSlug={yearSlug} answers={answers} />
          <Pitch next={next} />
        </>
      )}
    />
  );
}
