import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import StudyPlannerForm from "@/components/planner/StudyPlannerForm";
import { plannerChapters, PLANNER_YEARS } from "@/lib/study-plan";
import { SITE_URL } from "@/lib/site";
import { Eyebrow } from "@/components/brand";
import { BAYSIDE } from "@/lib/bayside";
import "@/components/state/state-hub.css";
import "@/components/brand/brand.css";
import "../worksheets/worksheets.css";
import "@/components/planner/planner.css";

// Free maths exam study planner (Ryan, 9 Nov 2026). "study planner" is
// about 3,600 searches a month (parent research, Nov 2026). The plan is
// emailed as a private link and opens on /plan/[id].

const PATH = "/study-planner";
const URL = `${SITE_URL}${PATH}`;
const TITLE = "Free Maths Exam Study Planner, Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "Make a free night-by-night maths exam study plan in a minute. Pick the year, the topics on the test and the exam date, and get a plan with practice questions, a full practice exam and a parent view.";

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const HOW = [
  { t: "Tell us about the test", b: "The year level, the topics on the test (as named in the textbook), the exam date, and which nights work." },
  { t: "Get the plan by email", b: "A private link to a night-by-night plan. Bigger topics get more nights, then there's a full practice exam and a final review night." },
  { t: "Tick off each night", b: "Every night says exactly what to do, with free worked examples, practice questions and practice tests. A parent with the same link sees the progress." },
];

const SAMPLE = [
  { d: "Night 1", t: "Pythagoras’ theorem and trigonometry", x: "Worked examples and practice questions, then the mind map. Snap anything you got wrong." },
  { d: "Night 2", t: "Pythagoras’ theorem and trigonometry", x: "A short practice test, timed, without notes. Mark it and redo what you lost marks on." },
  { d: "Second last night", t: "Full practice exam", x: "Every topic on the test, in exam conditions. Snap every question you lost marks on." },
  { d: "Night before", t: "Final review", x: "Redo the questions you snapped, read the formula sheet once, then an early night." },
];

const FAQS = [
  { q: "Is the study planner free?", a: "Yes. Fill it in and we’ll email you a private link to the plan. Everything the plan links to, the worked examples, practice questions, practice tests and formula sheets, is free too." },
  { q: "How many nights should a maths exam plan be?", a: "Two to three weeks is ideal for an end-of-year exam, with 30 to 45 minutes a night. For a topic test, one week is usually enough. The planner fits the plan to however many nights there are before the exam." },
  { q: "Which topics can I choose?", a: "The chapters for Years 7, 8, 9, 10 and 10A, named the way most Victorian textbooks name them. Tick the ones on the test outline, or tick them all for an end-of-year exam." },
  { q: "Can a parent and student use the same plan?", a: "Yes. Anyone with the link sees the same plan and the same ticks. There’s a parent view with a short check-in for each week, so you can help without needing to remember the maths." },
  { q: "Where does the Tuterly app come in?", a: "Each night ends with snapping the questions you got wrong. Tuterly shows the worked solution, then gives fresh questions on the same skill until it clicks, and the final night is redoing those questions. The plan works without the app, but the app is what makes the mistakes stick." },
  { q: "What if the exam date or topics change?", a: "Make a new plan. It only takes a minute, and the new link is emailed to you." },
];

export default function StudyPlannerPage() {
  const chaptersByYear = Object.fromEntries(PLANNER_YEARS.map((y) => [y, plannerChapters(y).map(({ slug, name }) => ({ slug, name }))]));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="sh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketingNav />

      <section className="tb ws-hero2" aria-labelledby="sp-title">
        <div className="tb-wrap ws-hero2__grid">
          <div>
            <Eyebrow>Free study planner · Years 7 to 10</Eyebrow>
            <h1 id="sp-title" className="tb-h1">
              A maths exam study plan, <span className="ws-hero2__accent">night by night.</span>
            </h1>
            <p className="tb-lead ws-hero2__lead">
              Pick the year, the topics on the test and the exam date. We&rsquo;ll email a plan that says exactly what to do each night, with free practice questions, a full practice exam and a final review.
            </p>
            <ul className="ws-hero2__ticks">
              <li>Fits the nights you have, with more time on bigger topics</li>
              <li>Every night links to free worked examples and practice tests</li>
              <li>A parent view, so you can see each night ticked off</li>
            </ul>
            <div className="ws-hero2__bayside">
              <p className="ws-hero2__bayside-t">Designed by senior educators at Bayside Academics</p>
              <p className="ws-hero2__bayside-x">{`${BAYSIDE.line.replace(/^Bayside Academics, a/, "A")}.`}</p>
            </div>
            <div className="ws-hero2__cta">
              <a href="#planner" className="tb-btn tb-btn--primary">Make my plan</a>
              <a href="#sample" className="ws-hero2__more">See what a plan looks like →</a>
            </div>
          </div>
          <div className="sh-box" id="sample" style={{ alignSelf: "center" }}>
            <p className="sh-when">A plan looks like this</p>
            <ol className="pl-nights" style={{ marginTop: 8 }}>
              {SAMPLE.map((s) => (
                <li key={s.d + s.t} className="pl-night" style={{ padding: "12px 14px" }}>
                  <span className="pl-night__date">{s.d}</span>
                  <p className="pl-night__title" style={{ fontSize: 16 }}>{s.t}</p>
                  <p className="sh-p" style={{ margin: "4px 0 0", fontSize: 14.5 }}>{s.x}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <main id="planner" className="sh-wrap" style={{ maxWidth: 820, scrollMarginTop: 90, paddingBottom: 40 }}>
        <h2 className="sp-h2">Make your plan</h2>
        <StudyPlannerForm chaptersByYear={chaptersByYear} />
      </main>

      <section className="sh-sec sh-sec--paper" aria-labelledby="sp-how">
        <div className="sh-wrap">
          <h2 id="sp-how">How it works</h2>
          <div className="sh-tests">
            {HOW.map((h, i) => (
              <div key={h.t} className="sh-box">
                <p className="sh-when">Step {i + 1}</p>
                <h3 className="sh-h3">{h.t}</h3>
                <p className="sh-p">{h.b}</p>
              </div>
            ))}
          </div>
          <p className="sh-small">
            Want to start tonight? Use the <Link href="/exam-generator" className="sh-link">free practice exam generator</Link> or the <Link href="/worksheets" className="sh-link">free worksheet generator</Link>.
          </p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="sp-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="sp-faq">Study planner questions</h2>
          <div className="sh-faqs">
            {FAQS.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppCtaBand placement="study_planner_final" title="The plan tells them what to practise. Tuterly makes it stick." lead="Snap any question they get wrong, see the worked solution, then fresh questions on the same skill until it's mastered. Years 7 to 10 maths." />
      <MarketingFooter />
    </div>
  );
}
