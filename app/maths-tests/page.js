import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import "@/components/maths/maths.css";
import { CHAPTER_YEARS, chaptersForYear } from "@/lib/chapter-pages";

// Hub for the chapter practice test pages, Years 7 to 10.
const PATH = "/maths-tests";
const TITLE = "Free Maths Practice Tests by Topic, Years 7 to 10 (with Answers) | Tuterly";
const DESCRIPTION =
  "Free maths practice tests for every chapter of Years 7, 8, 9 and 10 (and 10A), with sample questions, answers and a printable practice exam builder. Topics follow the textbook most Victorian schools use.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "website" });

export default function MathsTestsHub() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "Maths practice tests", path: PATH }]}
      eyebrow="Practice tests by topic"
      h1="Free maths practice tests by topic, Years 7 to 10"
      lead="Pick the year and the chapter your next test covers. Each page has the topics it covers, sample questions with answers, and a free printable practice exam in one click."
      quickAnswer="Every chapter from Year 7 to Year 10 (and 10A) has its own free practice test page, named the same way as the textbook most Victorian schools use. Each one covers every topic in the chapter, with sample questions, answers and a full printable exam."
      toc={CHAPTER_YEARS.map((y) => [y.slug, y.label])}
      ctaTitle="Predict the questions on your maths exam"
      ctaText="Upload your test outline, past papers and teacher’s notes. Exam Zone in the Tuterly app writes practice exams in your school’s style, before the real one."
      placement="maths_tests_hub"
      faqs={[
        { q: "Which textbook do the topic names follow?", a: "The chapter names follow Cambridge Essential Mathematics for the Victorian Curriculum, used in most Victorian schools. The questions are Tuterly’s own. Tuterly isn’t affiliated with Cambridge University Press." },
        { q: "Are the practice tests free?", a: "Yes. Every page has free sample questions with answers, and the exam generator builds a full printable exam on any chapter, free with your email, one exam a day." },
        { q: "What about Year 10A?", a: "Year 10A covers everything in Year 10 plus extension topics. The Year 10 pages list both, with the 10A topics marked, and you can build either a Year 10 or a Year 10A exam." },
      ]}
      faqTitle="Practice tests: common questions"
      showGuides={false}
      moreTitle="More maths help, Years 7 to 10"
      pageType="CollectionPage"
    >
      {CHAPTER_YEARS.map((y, i) => (
        <section key={y.slug} id={y.slug} className={`tb-section${i % 2 ? " tb-section--card" : ""}`} aria-labelledby={`h-${y.slug}`}>
          <div className="tb-wrap">
            <h2 id={`h-${y.slug}`} className="tb-h2 pg-h2">{y.label} maths practice tests</h2>
            <div className="ct-grid">
              {chaptersForYear(y.slug).map((c) => (
                <Link key={c.slug} href={c.path} className="ct-card">
                  <span className="ct-card__t">{c.name}</span>
                  <span className="ct-card__x">{c.sections.length} topics · sample questions with answers</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="tb-section" aria-label="About the topic names">
        <div className="tb-wrap pg-narrow">
          <p className="pg-small">Topic names follow the chapters of Cambridge Essential Mathematics for the Victorian Curriculum. Questions are Tuterly’s own. Tuterly isn’t affiliated with Cambridge University Press.</p>
        </div>
      </section>
    </GuideShell>
  );
}
