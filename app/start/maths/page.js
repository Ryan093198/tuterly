import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import StudyAppCTA from "@/components/StudyAppCTA";
import ResultsProof from "@/components/study/ResultsProof";
import LaunchPrice from "@/components/study/LaunchPrice";
import { GUARANTEE } from "@/lib/guarantee";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";

// Ad landing page (Google and Meta) for school maths, Years 7 to 10.
// One offer, one button. Not in the sitemap and not indexed: it repeats the
// home page for paid traffic. The button follows STUDY_APP.stage: early
// sign-up before launch, the free week at checkout once live.
export const metadata = {
  title: { absolute: "Tuterly: practise the questions their next maths test will ask" },
  description: "Years 7 to 10 maths. Every question your child gets wrong becomes fresh practice until it's mastered.",
  alternates: { canonical: `${SITE_URL}/start/maths` },
  robots: { index: false, follow: true },
};

const STEPS = [
  { t: "Snap it", b: "Your child snaps a question they got wrong, from homework, a textbook or a marked test." },
  { t: "Practise it", b: "They see the worked solution, then get fresh versions of the same idea until it's mastered." },
  { t: "Nail the test", b: "School tests ask the same kinds of question. The ones that tripped them up are already done." },
];

export default function StartMaths() {
  return (
    <div className="sh">
      <MarketingNav />
      <header className="sh-hero">
        <p className="sh-eyebrow">Years 7 to 10 maths · iPhone</p>
        <h1>The questions on their next test? They&rsquo;ll have practised them.</h1>
        <p className="sh-lead">
          Maths tests keep asking the same kinds of question. Tuterly turns every question your child gets wrong into fresh practice until it&rsquo;s mastered, so the ones that trip them up are done before test day.
        </p>
        <div id="get-app" style={{ maxWidth: 520, margin: "0 auto", textAlign: "left" }}>
          <StudyAppCTA variant="hero" placement="start_maths_hero" position="inline" slim />
        </div>
      </header>

      <section className="sh-sec sh-sec--paper" aria-labelledby="sm-how">
        <div className="sh-wrap">
          <h2 id="sm-how">How it works</h2>
          <div className="sh-tests">
            {STEPS.map((s, i) => (
              <div key={s.t} className="sh-box">
                <p className="sh-when">Step {i + 1}</p>
                <h3 className="sh-h3">{s.t}</h3>
                <p className="sh-p">{s.b}</p>
              </div>
            ))}
          </div>
          <p className="sh-p" style={{ marginTop: 20 }}>
            <strong>No wrong answers to snap yet?</strong> A Topic check is a short test on the topic they&rsquo;re learning, one question from each part of it. Anything they get wrong goes into their bank to drill until it&rsquo;s mastered. Do one a week or two into each new topic, and again before the test.
          </p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="sm-proof">
        <div className="sh-wrap sh-narrow">
          <h2 id="sm-proof">Does it work?</h2>
          <ResultsProof />
          <p className="sh-p" style={{ marginTop: 18 }}>
            <strong>Price:</strong> <LaunchPrice trial /> Cancel any time.
          </p>
          <p className="sh-p">
            <strong>Guarantee:</strong> {GUARANTEE.short} <Link href="/guarantee" className="sh-link">See the conditions</Link>.
          </p>
          <div style={{ marginTop: 20 }}>
            <StudyAppCTA variant="hero" placement="start_maths_final" position="final" slim />
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
