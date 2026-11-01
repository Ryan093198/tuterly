import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import ScholarshipCTA from "@/components/scholarship-guides/ScholarshipCTA";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import "@/components/scholarship-guides/guides.css";

// Ad landing page (Google and Meta) for Tuterly Scholarship. One offer.
// Not indexed. Before launch the button joins the Scholarship list; once
// the app is live it becomes the Scholarship Pass at checkout
// (components/scholarship/PassOffer.jsx).
export const metadata = {
  title: { absolute: "Tuterly Scholarship: find their weak question types, then drill them" },
  description: "Numerical reasoning practice for Year 5, 6 and 7 entry scholarship and selective tests (ACER, Edutest, AAS).",
  alternates: { canonical: `${SITE_URL}/start/scholarship` },
  robots: { index: false, follow: true },
};

const STEPS = [
  { t: "Diagnostic", b: "A 40-question Numerical Reasoning diagnostic in the app. The first 10 questions are free." },
  { t: "Their weak spots", b: "Every question they miss goes into their own practice bank, with a worked solution." },
  { t: "Drill until mastered", b: "Fresh versions of each question type until it's easy, with progress parents can see." },
];

export default function StartScholarship() {
  return (
    <div className="sh">
      <MarketingNav />
      <header className="sh-hero">
        <p className="sh-eyebrow">Scholarship and selective-entry prep · Years 4 to 6</p>
        <h1>Scholarship tests reuse the same question types. Find their weak ones, then drill them.</h1>
        <p className="sh-lead">
          For Year 5, 6 and 7 entry tests from ACER, Edutest and AAS. Built by the tutors at Bayside Academics in Melbourne.
        </p>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "left" }}>
          <ScholarshipCTA sourcePage="/start/scholarship" variant="hero" id="start-sch-hero" />
        </div>
        <p className="sh-small">
          Want to see the questions first? <Link href="/scholarship-practice" className="sh-link">Try 10 free practice questions</Link>.
        </p>
      </header>

      <section className="sh-sec sh-sec--paper" aria-labelledby="ss-how">
        <div className="sh-wrap">
          <h2 id="ss-how">How it works</h2>
          <div className="sh-tests">
            {STEPS.map((s, i) => (
              <div key={s.t} className="sh-box">
                <p className="sh-when">Step {i + 1}</p>
                <h3 className="sh-h3">{s.t}</h3>
                <p className="sh-p">{s.b}</p>
              </div>
            ))}
          </div>
          <p className="sh-small">
            Practice for ACER, Edutest and AAS-style numerical reasoning. Tuterly isn&rsquo;t affiliated with or endorsed by any test provider.
          </p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="ss-cta">
        <div className="sh-wrap sh-narrow">
          <h2 id="ss-cta">Start before the summer holidays</h2>
          <p className="sh-p">Many scholarship and selective tests are held in the first half of the year, so the summer break is a good time to find and fix weak spots.</p>
          <ScholarshipCTA sourcePage="/start/scholarship" variant="band" id="start-sch-final" />
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
