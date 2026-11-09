import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import StudyAppCTA from "@/components/StudyAppCTA";
import DemoVideo, { EXAM_ZONE_VIDEO } from "@/components/study/DemoVideo";
import ExamGenerator from "@/components/exam/ExamGenerator";
import { getExamCatalogue } from "@/lib/exam-bank";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import "@/components/brand/brand.css";
import "../worksheets/worksheets.css";
import { Eyebrow } from "@/components/brand";
import { BAYSIDE } from "@/lib/bayside";

const TITLE = "Free Maths Practice Exam Generator, Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "Make a free maths practice exam for Years 7 to 10A. Pick the year and topics and get a printable exam with marks, a suggested time and answers, with worked solutions for many questions. Australian Curriculum.";
const URL = `${SITE_URL}/exam-generator`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const HOW = [
  { t: "Pick the year and topics", b: "Tick a whole chapter, like Fractions and percentages, or pick the exact topics their next test covers, named as in their textbook." },
  { t: "Get an exam in exam format", b: "Up to 20 questions in short answer and extended response sections, with marks for each question and a suggested time." },
  { t: "Sit it, then mark it", b: "Print it or save it as a PDF, with or without answers. Every question has an answer, and many have a fully worked solution." },
];

// Free generator vs Exam Zone in the app. App facts from the student
// features doc (7 Nov 2026). Exam limits left off on purpose (Ryan, 8 Nov).
const COMPARE = [
  ["Where the questions come from", "Tuterly’s checked question bank for Years 7 to 10A", "Written from your own test outline, past papers and teacher’s notes"],
  ["Style", "A standard exam format", "Your school’s style, with a match meter showing how close it gets"],
  ["Marking", "You mark it with the answers", "Marked for you by topic, even handwritten answers from a photo"],
  ["After the exam", "Check the answers", "Fix what you missed, and re-sit with new questions"],
  ["Exam day", "Print it and sit it", "Countdown to the real exam, an optional timer, or print it on A4"],
];

const FAQS = [
  { q: "What’s the difference between this and the Tuterly app?", a: "This free generator builds an exam from Tuterly’s question bank on the topics you pick. Exam Zone in the Tuterly app goes further: upload the test outline, past papers and teacher’s notes, and Tuterly writes practice exams in the style of your school’s real test, marks them by topic and turns every miss into practice." },
  { q: "Is the practice exam generator free?", a: "Yes. Enter your email to unlock it and you can make one free practice exam a day, or two a day if you sign up for the free weekly worksheet email. It uses the same email as the free worksheet generator." },
  { q: "Where do the questions come from?", a: "From Tuterly’s topic pages and topic tests for Years 7 to 10A, sorted into the same topic names as the textbooks students use. Every answer was checked, and many questions come with a fully worked solution." },
  { q: "Which year levels and topics does it cover?", a: "Years 7, 8, 9 and 10, plus Year 10A extension topics, across number, algebra, measurement, space, statistics and probability, following the Australian Curriculum." },
  { q: "How long is each exam?", a: "Up to 20 questions. Pick one topic for a short topic test, or several for a mixed exam like an end-of-term or end-of-year test. Each exam shows its total marks and a suggested time." },
  { q: "What should my child do with the questions they get wrong?", a: "Check the answer (and the worked solution, where there is one), then practise that idea again. In the Tuterly app they can snap the question and get fresh questions on the same idea until it's mastered." },
];

export default function ExamGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <div className="sh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketingNav />
      {/* HERO (Ryan, 9 Nov 2026): same type and layout as /worksheets. */}
      <section className="tb ws-hero2" aria-labelledby="eg-title">
        <div className="tb-wrap ws-hero2__grid">
          <div>
            <Eyebrow>Free practice exam generator · Years 7 to 10</Eyebrow>
            <h1 id="eg-title" className="tb-h1">
              Free maths practice exam generator, <span className="ws-hero2__accent">Year&nbsp;7 to Year&nbsp;10.</span>
            </h1>
            <p className="tb-lead ws-hero2__lead">
              Pick the year and the topics on your next test, and get a printable practice exam with marks, a suggested time and answers to every question. Australian Curriculum, for every state.
            </p>
            <ul className="ws-hero2__ticks">
              <li>Up to 20 questions, in short answer and extended response sections</li>
              <li>Answers to every question, and worked solutions for many</li>
              <li>Free with your email: one exam a day, or two with our weekly worksheet email</li>
            </ul>
            <div className="ws-hero2__bayside">
              <p className="ws-hero2__bayside-t">Designed by senior educators at Bayside Academics</p>
              <p className="ws-hero2__bayside-x">
                {`${BAYSIDE.line.replace(/^Bayside Academics, a/, "A")}. For practice exams written from your own school's test outline and past papers, try Exam Zone in the Tuterly app.`}
              </p>
            </div>
            <div className="ws-hero2__cta">
              <a href="#build" className="tb-btn tb-btn--primary">Build my exam</a>
              <a href="#eg-app" className="ws-hero2__more">How it compares to Exam Zone →</a>
            </div>
          </div>
          <figure className="ws-hero2__visual">
            <div className="ws-hero2__blob" aria-hidden="true" />
            <DemoVideo width={300} placement="exam_generator_hero" priority video={EXAM_ZONE_VIDEO} />
            <figcaption className="ws-hero2__cap">
              <strong>Predict the questions on your maths exam.</strong> Exam Zone in the Tuterly app writes practice exams from your own test outline and past papers.{" "}
              <Link href="/students#exam-zone">See how it works</Link>
            </figcaption>
          </figure>
        </div>
      </section>
      <main id="build" className="sh-gen" style={{ maxWidth: 1000, scrollMarginTop: 90, paddingTop: 8 }}>
        <ExamGenerator catalogue={getExamCatalogue()} placement="exam_generator" />
      </main>

      <section className="sh-sec" aria-labelledby="eg-app">
        <div className="sh-wrap">
          <p className="sh-eyebrow">Exam Zone in the Tuterly app</p>
          <h2 id="eg-app">Want to predict what’s on your real exam?</h2>
          <p className="sh-p eg-app__lead">
            The free generator gives you a practice exam on the topics you pick. Exam Zone in the Tuterly app builds it from your actual test: upload the outline, past papers and your teacher’s notes, and Tuterly works out what’s on your test and how your school writes it, then writes practice exams in the same style, before the real one.
          </p>
          <div className="eg-cmp">
            <table>
              <thead>
                <tr><th scope="col"></th><th scope="col">Free exam generator</th><th scope="col" className="eg-cmp__app">Tuterly app: Exam Zone</th></tr>
              </thead>
              <tbody>
                {COMPARE.map(([k, free, app]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{free}</td><td className="eg-cmp__app">{app}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="eg-app__cta">
            <StudyAppCTA variant="box" placement="exam_generator_compare" heading="Sit your exam before your exam" sub="Exam Zone writes practice exams from your own test outline and past papers, then fixes everything you miss. Years 7 to 10 maths." />
          </div>
          <p className="sh-small">
            Students: see <Link href="/students#exam-zone" className="sh-link">how Tuterly predicts your maths exam</Link>.
          </p>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="eg-how">
        <div className="sh-wrap">
          <h2 id="eg-how">How it works</h2>
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
            Want a worksheet on one topic instead? Use the <Link href="/worksheets" className="sh-link">free worksheet generator</Link>.
            Primary years? Try a <Link href="/naplan" className="sh-link">NAPLAN-style numeracy test</Link>.
          </p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="eg-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="eg-faq">Practice exam questions</h2>
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

      <AppCtaBand placement="exam_generator_final" title="Sit your exam before your exam." lead="The free generator covers the topics. Exam Zone in the Tuterly app writes practice exams in the style of your school’s real test." />
      <MarketingFooter />
    </div>
  );
}
