import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import { STUDY_RESULTS } from "@/lib/study-results";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";

// How the Bayside Academics result on the home page was measured. Only the
// facts in lib/study-results.js; don't add numbers here that aren't backed
// by the records kept for that claim.
const TITLE = "Our Results: How We Measured Them | Tuterly";
const DESCRIPTION =
  "How Tuterly's Bayside Academics result was measured: whose marks, what counts as improved, and what the result does and doesn't show.";
const URL = `${SITE_URL}/results`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const ROWS = [
  ["Who", "100+ Bayside Academics students in Years 7 to 10, taught in person and online."],
  ["Which students", "Only students who used Tuterly at least once a week."],
  ["What we compared", "Each student's actual school test marks from before they started using Tuterly weekly, and after."],
  ["The result", "About 90% of them improved their school test marks."],
];

const LIMITS = [
  "These students also had tutoring at Bayside Academics, so the result shows what Tuterly plus good teaching achieved, not Tuterly on its own.",
  "It isn't a controlled trial. There was no comparison group of similar students who didn't use the app.",
  "School tests differ in topic and difficulty, so a higher mark on one test is a good sign, not a precise measure.",
  "Every student is different. We can't promise any one student the same result.",
];

export default function ResultsPage() {
  return (
    <div className="sh">
      <MarketingNav />
      <header className="sh-hero">
        <p className="sh-eyebrow">Our results</p>
        <h1>How we measured our results</h1>
        <p className="sh-lead">
          On our home page we say: <strong>{STUDY_RESULTS.headline}</strong>. Here is exactly what that means, and what it doesn&rsquo;t.
        </p>
      </header>

      <section className="sh-sec sh-sec--paper" aria-labelledby="r-how">
        <div className="sh-wrap sh-narrow">
          <h2 id="r-how">What we measured</h2>
          <dl className="sh-facts" style={{ gridTemplateColumns: "1fr" }}>
            {ROWS.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <p className="sh-small">{STUDY_RESULTS.finePrint}</p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="r-limits">
        <div className="sh-wrap sh-narrow">
          <h2 id="r-limits">What it doesn&rsquo;t show</h2>
          <p className="sh-p">We want parents to be able to trust our numbers, so here are the limits, plainly.</p>
          <ul className="sh-p" style={{ paddingLeft: 20, display: "grid", gap: 8 }}>
            {LIMITS.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <h3 className="sh-h3">Why weekly use</h3>
          <p className="sh-p">
            Tuterly works by turning the questions a student gets wrong into fresh practice until each one is mastered. That only helps if they keep coming back to it, which is why we report the result for students who used it at least once a week.
          </p>
          <h3 className="sh-h3">If it doesn&rsquo;t work for your child</h3>
          <p className="sh-p">
            We back it with a money-back guarantee if their results don&rsquo;t improve after 6 months of regular use. See the{" "}
            <Link href="/guarantee" className="sh-link">guarantee and its conditions</Link>.
          </p>
        </div>
      </section>

      <AppCtaBand placement="results_final" />
      <MarketingFooter />
    </div>
  );
}
