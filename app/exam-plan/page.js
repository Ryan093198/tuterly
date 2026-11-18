import { Caveat } from "next/font/google";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import ExamPlanFlow from "@/components/exam-plan/ExamPlanFlow";
import HeroPaper from "@/components/exam-plan/HeroPaper";
import { PhoneFrame } from "@/components/brand";
import { SITE_URL } from "@/lib/site";
import { appCta } from "@/lib/study-app";
import { PLAN_YEARS, topicChoices } from "@/lib/exam-plan";
import { getChapterPages } from "@/lib/chapter-pages";
import "katex/dist/katex.min.css";
import "@/components/exam-plan/exam-plan.css";

// The free exam plan, Years 7 to 10 (Ryan, 18 Nov 2026): where the UGC ads
// point. Upload a marked test, get a study plan to the exam date and a custom
// test on the questions you got wrong, free (one upload a day). It's a real
// Tuterly app account, so everything is waiting in the app.
const TITLE = "Free Maths Exam Study Plan and Revision Questions (Years 7 to 10) | Tuterly";
const DESCRIPTION =
  "Upload a marked maths test and get a free study plan to your exam date, plus a customised test on exactly the questions you got wrong, with worked solutions. For Years 7 to 10.";
const URL = `${SITE_URL}/exam-plan`;

// Handwriting for the pen marks and the arrow into the app.
const hand = Caveat({ subsets: ["latin"], weight: ["700"], variable: "--font-hand", display: "swap" });

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// What the free page does next to the app (TUTERLY_FEATURES.md, 29 Oct 2026).
const COMPARE = [
  ["Uploads", "One test a day", "Unlimited, and snap any question"],
  ["Questions", "Up to 10, once", "Unlimited, made fresh every time"],
  ["Your answers", "Worked solutions to read", "Checked, with a similar one until it's mastered"],
  ["Study notes and topic tests", null, "Any topic in your year, notes as a PDF"],
  ["Exam countdown and daily to-do", null, "Included"],
  ["Week in review for parents", null, "Included"],
];

const FAQS = [
  { q: "Is it really free?", a: "Yes. Your study plan and your customised test are free, with one upload a day. The Tuterly app is the paid version, with unlimited questions, notes and practice tests." },
  { q: "What can I upload?", a: "Any maths test you've done with the marking on it: a class test, a topic test, a practice exam or a past test. Photos of each page (up to 10) or one PDF." },
  { q: "What if I don't have a test to upload?", a: "Pick the topics on your exam instead: a whole chapter, or just the subtopics you need. You get the same day-by-day plan and a customised test on those topics." },
  { q: "What if my test isn't marked?", a: "Upload it anyway. You'll see every question we found, and you tick the ones you got wrong or weren't sure about." },
  { q: "Where do the test questions come from?", a: "From Tuterly's own bank of checked questions, written for the Victorian and Australian Curriculum and matched to the topics you got wrong. Your school's questions are never copied." },
  { q: "Who sees my test?", a: "Only you. The photos stay private to your account. We use them to find your weak spots and save the questions you got wrong to your Tuterly account." },
  { q: "Do I need the app?", a: "No. Everything works here in your browser. If you get the app later, sign in with the same email and your exam and mistakes are already there." },
];

export default function ExamPlanPage() {
  const cta = appCta();
  const appLabel = cta.live ? "Get Tuterly" : "Get early access to the app";
  const topics = Object.fromEntries(PLAN_YEARS.map((y) => [y, topicChoices(y)]));
  const chapterPath = Object.fromEntries(getChapterPages().map((c) => [`${c.year}|${c.chapter}`, c.path]));
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className={`epx ${hand.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MarketingNav />

      <section className="epx-top" aria-labelledby="epx-h1">
        <div className="epx-top__in">
          <div className="epx-copy">
            <p className="epx-kicker">Exam Zone · Free for Years 7 to 10</p>
            <h1 id="epx-h1">Upload your school tests. Get a customised exam plan and questions.</h1>
            <p className="epx-lead">
              We find exactly what you got wrong, plan your days to the exam, and make you a customised test on your weak spots, with worked solutions.
            </p>
            <ul className="epx-facts">
              <li>A plan to your exam date</li>
              <li>Questions based on your weaknesses</li>
              <li>Saved to your Tuterly app</li>
            </ul>
          </div>
          <div className="epx-visual">
            <HeroPaper />
          </div>
          <div className="epx-flow" id="start">
            <ExamPlanFlow cta={{ href: cta.href, label: appLabel }} topics={topics} />
          </div>
        </div>
      </section>

      <section className="epx-sec" aria-labelledby="epx-how">
        <div className="epx-wrap">
          <h2 id="epx-how" className="epx-h2">From your test to your exam in three steps</h2>
          <ol className="epx-steps">
            <li>
              <span className="epx-steps__n">1</span>
              <h3>Upload a marked test</h3>
              <p>A class test, practice exam or past test, with the marking on it. Photos of each page, or one PDF.</p>
            </li>
            <li>
              <span className="epx-steps__n">2</span>
              <h3>Check what we found</h3>
              <p>We read every question and the marking, and tick the ones you got wrong. Change anything we missed.</p>
            </li>
            <li>
              <span className="epx-steps__n">3</span>
              <h3>Get your plan and test</h3>
              <p>A day-by-day plan to your exam date and a customised test on exactly your weak spots. We email you the plan too.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="epx-sec epx-sec--app" aria-labelledby="epx-app">
        <div className="epx-wrap epx-app">
          <div className="epx-app__copy">
            <h2 id="epx-app" className="epx-h2">The plan is the start. The app is where it gets fixed.</h2>
            <p className="epx-p">
              Your account here is your Tuterly app account. Sign in with the same email and your exam and every question you got wrong are already waiting, ready to fix.
            </p>
<table className="epx-cmp">
              <thead>
                <tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col">Free here</th><th scope="col">Tuterly app</th></tr>
              </thead>
              <tbody>
                {COMPARE.map(([f, here, app]) => (
                  <tr key={f}>
                    <th scope="row">{f}</th>
                    <td className={here ? "" : "is-no"}>{here || "Not included"}</td>
                    <td>{app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href={cta.href} className="epx-btn epx-btn--ghost">{appLabel}</a>
          </div>
          <div className="epx-app__phone">
            <PhoneFrame src="/app-screens/flow-exam-zone/07-fix-what-you-missed.png" alt="The Tuterly app's Fix what you missed screen, listing the questions a student got wrong with Try again and Similar one buttons" width={270} sizes="(max-width: 899px) 62vw, 270px" />
          </div>
        </div>
      </section>

      <section className="epx-sec" aria-labelledby="epx-faq">
        <div className="epx-wrap epx-wrap--narrow">
          <h2 id="epx-faq" className="epx-h2">Questions</h2>
          <div className="epx-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="epx-sec epx-sec--topics" aria-labelledby="epx-topics">
        <div className="epx-wrap epx-wrap--narrow">
          <h2 id="epx-topics" className="epx-h2">What&rsquo;s on the Year 7 to 10 maths exam</h2>
          <p className="epx-p">
            Every topic you can build a study plan for, by year, following the Australian Curriculum (including the Victorian Curriculum 2.0). Open your year to see the chapters and subtopics your maths exam can cover.
          </p>
          <div className="epx-years">
            {PLAN_YEARS.map((y) => (
              <details key={y}>
                <summary>Year {y} maths exam topics</summary>
                <p className="epx-years__links">
                  <a href={`/maths-exam-preparation/year-${y}`}>How to prepare for the Year {y} maths exam</a>
                  <a href={`/worksheets/year-${y}`}>Year {y} maths worksheets</a>
                </p>
                {topics[y].map((ch) => (
                  <div key={ch.n} className="epx-years__ch">
                    <h3>
                      {chapterPath[`Year ${y}|${ch.n}`] ? (
                        <a href={chapterPath[`Year ${y}|${ch.n}`]}>Chapter {ch.n}: {ch.name}</a>
                      ) : (
                        <>Chapter {ch.n}: {ch.name}</>
                      )}
                    </h3>
                    <ul>
                      {ch.sections.map((sec) => <li key={sec.code}>{sec.code} {sec.name}</li>)}
                    </ul>
                  </div>
                ))}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="epx-end" aria-labelledby="epx-end">
        <div className="epx-wrap epx-end__in">
          <h2 id="epx-end">Your next test is coming. Know exactly what to fix.</h2>
          <a href="#start" className="epx-btn">Make my free plan</a>
          <p>Free. One upload a day. Years 7 to 10.</p>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
