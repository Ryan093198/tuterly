import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import ExamGenerator from "@/components/exam/ExamGenerator";
import { getExamCatalogue } from "@/lib/exam-bank";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { STRANDS, strandOf } from "@/lib/year-hubs";
import { writtenTopicTest } from "@/lib/topic-test-files";
import { SITE_URL } from "@/lib/site";
import CopyBlurb from "@/components/study/CopyBlurb";
import "./exam-kit.css";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";

// End-of-year maths exams (Years 7 to 10): the seasonal page for Term 4
// exams, and the landing page for the end-of-year exam ads. A practice
// exam builder up top (email to unlock, so every use is a sign-up), then
// every topic test by year, a three-week revision plan and FAQs.
// State-neutral: schools set their own exam dates.

const TITLE = "End-of-Year Maths Exam Kit, Years 7 to 10 (Free) | Tuterly";
const DESCRIPTION =
  "Free end-of-year maths exam kit for Years 7 to 10: a practice exam with worked solutions, formula sheet and topic tests for each year, plus a study planner. No sign-up.";
const URL = `${SITE_URL}/end-of-year-maths-exams`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];

// The free exam kit (Ryan, 11 Nov 2026): the page schools and local press
// are pointed to, so every resource here is free with no sign-up except the
// custom exam builder further down.
const KIT = [
  { year: "Year 7", exam: "/maths-exam-preparation/year-7#practice-exam", sheet: "/formula-sheets/year-7-maths" },
  { year: "Year 8", exam: "/maths-exam-preparation/year-8#practice-exam", sheet: "/formula-sheets/year-8-maths" },
  { year: "Year 9", exam: "/maths-exam-preparation/year-9#practice-exam", sheet: "/formula-sheets/year-9-maths" },
  { year: "Year 10", exam: "/maths-exam-preparation/year-10#practice-exam", sheet: "/formula-sheets/year-10-maths" },
  { year: "Year 10A", exam: null, sheet: "/formula-sheets/year-10a-maths" },
];
const SHARE_TEXT =
  "Free maths revision for end-of-year exams: Tuterly, built by Brighton tutoring centre Bayside Academics, has a free practice exam with worked solutions, a formula sheet and topic tests for each of Years 7 to 10, plus a night-by-night study planner. All free and following the Australian Curriculum: tuterly.com.au/end-of-year-maths-exams";
const anchor = (y) => y.toLowerCase().replace(/\s+/g, "-");

// Topic pages that have a written test, grouped by strand.
function topicsFor(year) {
  const pages = WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year && writtenTopicTest(year, p.topicId));
  return STRANDS.map((s) => ({ name: s.name, items: pages.filter((p) => strandOf(p.topicId) === s.code) })).filter((g) => g.items.length);
}

const PLAN = [
  {
    when: "Week 1: find the gaps",
    text: "Have your child sit a practice exam on the year's topics under exam conditions: timed, no notes. Mark it with the answers and write down the topics where marks were lost. That list is the revision plan.",
  },
  {
    when: "Week 2: fix the gaps",
    text: "Take the two or three weakest topics and do a full topic test on each. Check every wrong answer against the answer key, then try a fresh question on the same idea a day later. Short sessions (30 to 40 minutes) on most days beat one long one.",
  },
  {
    when: "Week 3: practise like the real thing",
    text: "Sit a second mixed practice exam, timed. Redo every question that's still wrong the next day, without looking at the working first. In the last two days, only light review and a good night's sleep.",
  },
];

const FAQS = [
  {
    q: "When are end-of-year maths exams?",
    a: "Most secondary schools hold them in Term 4, usually from late October to early December. Dates vary between schools and states, so check your school's calendar or ask your child's maths teacher.",
  },
  {
    q: "What's on an end-of-year maths exam?",
    a: "Usually most of the year's topics: number and algebra, measurement and geometry, and statistics and probability. Schools choose the mix and the weighting, so ask the teacher whether a revision sheet or topic list is available.",
  },
  {
    q: "How long should my child revise for?",
    a: "Two to three weeks of short sessions on most days works well for an end-of-year exam, so every topic gets revisited at least twice. The three-week plan on this page is a good starting point.",
  },
  {
    q: "Are the practice exams and topic tests free?",
    a: "Yes. Enter your email to make a practice exam (one a day, free). Every topic test is free too: you'll see the first four questions on the topic page, and the full test with its answer key is emailed to you.",
  },
  {
    q: "Do they follow the Australian Curriculum?",
    a: "Yes. Every topic follows the Australian Curriculum for its year level, and every answer was worked out and then checked a second time, independently, before it was published.",
  },
  {
    q: "What should my child do with the questions they get wrong?",
    a: "That's where the real improvement is. Read the worked solution, then try a fresh question on the same idea a day or two later. The Tuterly app does this for you: snap the question they got wrong and it writes new ones on the same idea until it's mastered.",
  },
];

export default function EndOfYearMathsExamsPage() {
  const catalogue = getExamCatalogue();
  const byYear = YEARS.map((y) => ({ year: y, groups: topicsFor(y) })).filter((y) => y.groups.length);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Practice tests", item: `${SITE_URL}/practice-maths-tests-secondary` },
        { "@type": "ListItem", position: 3, name: "End-of-year maths exams", item: URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="sh">
      {schema.map((x, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
      ))}
      <MarketingNav />

      <nav aria-label="Breadcrumb" className="sh-crumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/practice-maths-tests-secondary">Practice tests</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">End-of-year exams</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">Years 7 to 10 · Australian Curriculum · Free</p>
        <h1>End-of-year maths exams: free practice for Years 7 to 10</h1>
        <p className="sh-lead">
          Find out what your child doesn&rsquo;t know before the exam does. Build a practice exam with answers, then fix the weak topics with a free test on each one.
        </p>
        <p className="ek-from">From the tutors at Bayside Academics in Brighton: over 2,000 students in 10 years, 5.0 rating on Google.</p>
        <dl className="sh-facts">
          <div><dt>Practice exams</dt><dd>Up to 20 questions, marks and a suggested time</dd></div>
          <div><dt>Topic tests</dt><dd>Every topic, 20 questions each, with answer keys</dd></div>
          <div><dt>Answers</dt><dd>Every answer checked twice</dd></div>
          <div><dt>Cost</dt><dd>Free</dd></div>
        </dl>
      </header>

      <section id="kit" className="sh-sec ek" aria-labelledby="ey-kit">
        <div className="sh-wrap">
          <h2 id="ey-kit">The free exam kit, by year</h2>
          <p className="sh-sub">Everything a student needs for the end-of-year maths exam, free and with no sign-up: a practice exam with worked solutions, the formula sheet and a test on every topic.</p>
          <div className="ek-grid">
            {KIT.map((k) => (
              <div key={k.year} className="ek-card">
                <p className="ek-card__y">{k.year}</p>
                <ul>
                  {k.exam && <li><Link href={k.exam}>Practice exam with answers</Link></li>}
                  <li><Link href={k.sheet}>Formula sheet</Link></li>
                  <li><a href={`#${anchor(k.year)}`}>Topic tests</a></li>
                </ul>
              </div>
            ))}
          </div>
          <p className="ek-also">
            Plus: a <Link href="/study-planner">study planner</Link> that maps revision night by night up to the exam, and{" "}
            <Link href="/method">the Tuterly Method</Link> for fixing the questions they get wrong.
          </p>

          <div className="ek-share" aria-labelledby="ek-share-h">
            <h3 id="ek-share-h">For schools and teachers: share the kit</h3>
            <p>
              You&rsquo;re welcome to share this page with students and families, in a newsletter, on the school website or on the LMS. Here&rsquo;s a blurb you can paste as it is:
            </p>
            <CopyBlurb text={SHARE_TEXT} />
            <p className="ek-share__more">
              Teachers can also print topic tests and exams for class from <Link href="/teachers">the teacher resources</Link>.
            </p>
          </div>
        </div>
      </section>

      <main id="practice-exam" className="sh-sec sh-sec--paper" aria-labelledby="ey-make">
        <div className="sh-wrap">
          <h2 id="ey-make">Make a custom practice exam</h2>
          <p className="sh-sub">Want an exam on just the topics your child&rsquo;s test covers? Pick the year and the topics. You&rsquo;ll get a printable exam with marks, a suggested time and answers.</p>
          <ExamGenerator catalogue={catalogue} initialYear="Year 8" placement="end_of_year_exam" />
        </div>
      </main>

      <section className="sh-sec" aria-labelledby="ey-topics">
        <div className="sh-wrap">
          <h2 id="ey-topics">Fix the weak topics: a test on every topic</h2>
          <p className="sh-sub">Every topic has a free 20-question test with an answer key. Open a topic to try the first four questions, then get the full test by email.</p>
          <nav className="sh-switch" aria-label="Jump to a year level" style={{ margin: "8px 0 24px" }}>
            <ul>
              {byYear.map(({ year }) => (
                <li key={year}><a href={`#${anchor(year)}`}>{year}</a></li>
              ))}
            </ul>
          </nav>
          {byYear.map(({ year, groups }) => (
            <div key={year} id={anchor(year)} style={{ scrollMarginTop: 80, marginBottom: 32 }}>
              <h3 className="sh-h3" style={{ fontSize: 22, margin: "0 0 4px" }}>{year} topic tests</h3>
              {year === "Year 10A" && <p className="sh-p">The extension topics, for students heading to the harder senior maths subjects.</p>}
              {groups.map((g) => (
                <div key={g.name} className="sh-group">
                  <div className="sh-group__head">
                    <h4 style={{ margin: 0 }}>{g.name}</h4>
                    <span>{g.items.length} {g.items.length === 1 ? "test" : "tests"}</span>
                  </div>
                  <div className="sh-grid">
                    {g.items.map((p) => (
                      <Link key={p.slug} href={`/worksheets/${p.slug}#topic-test`} className="sh-card">
                        <span className="sh-card__kicker">{year} test</span>
                        <span className="sh-card__name">{p.topic}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="ey-plan">
        <div className="sh-wrap">
          <h2 id="ey-plan">A three-week revision plan</h2>
          <p className="sh-sub">Start three weeks before the first exam. If you have less time, shorten each week but keep the order: find the gaps, fix them, then practise under exam conditions.</p>
          <div className="sh-tests">
            {PLAN.map((s) => (
              <div key={s.when} className="sh-box">
                <p className="sh-when">{s.when}</p>
                <p className="sh-p">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="sh-small">
            More help: <Link href="/parents/end-of-year-maths-report" className="sh-link">got the report? close the gaps before next year</Link>{" "}· <Link href="/parents/studied-but-failed-maths-test" className="sh-link">studied but still failed?</Link>{" "}· <Link href="/parents/preparing-for-maths-topic-tests" className="sh-link">how to prepare for a maths test</Link>{" "}· <Link href="/practice-maths-tests-secondary" className="sh-link">all practice tests</Link>
          </p>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="ey-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="ey-faq">End-of-year maths exam questions</h2>
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

      <AppCtaBand placement="end_of_year_exams_final" />
      <MarketingFooter />
    </div>
  );
}
