import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import ExamGenerator from "@/components/exam/ExamGenerator";
import TeacherBuilder from "@/components/paper/TeacherBuilder";
import { getExamCatalogue } from "@/lib/exam-bank";
import { WORKSHEET_LANDING_PAGES } from "@/lib/worksheet-landing-pages";
import { STRANDS, strandOf } from "@/lib/year-hubs";
import { writtenTopicTest, SHEET_QUESTIONS } from "@/lib/topic-test-files";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";
import "@/components/paper/paper.css";

// For teachers: free Years 7 to 10 maths resources for class use. The
// Tutero playbook's link engine (Nov 2026): a page teachers share and
// schools link to. Printable practice sheets (ungated PDFs), full topic
// tests (emailed), the practice exam builder, and the other free tools.

const TITLE = "Free Auto-Marked Maths Tests for Teachers, Years 7 to 10 | Tuterly Teacher Zone";
const DESCRIPTION =
  "Build a Years 7 to 10 maths test on any topic, share one link, and every student is marked automatically with worked solutions. Plus free printable practice sheets and topic tests. Victorian and Australian Curriculum.";
const URL = `${SITE_URL}/teachers`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];
const anchor = (y) => y.toLowerCase().replace(/\s+/g, "-");

function topicsFor(year) {
  const pages = WORKSHEET_LANDING_PAGES.filter((p) => p.yearLevel === year && writtenTopicTest(year, p.topicId));
  return STRANDS.map((s) => ({ name: s.name, items: pages.filter((p) => strandOf(p.topicId) === s.code) })).filter((g) => g.items.length);
}

const USES = [
  { t: "Warm-up", x: "Questions 1 to 4 of each test are the basics. Put one or two on the board to start the lesson." },
  { t: "Exit ticket", x: "Two questions from the practice sheet at the end of a lesson show who has it and who needs another go." },
  { t: "Homework with answers", x: "The practice sheet has the answers on the last page. Print the questions only, or include the answers so students can self-mark." },
  { t: "Topic test revision", x: "The full 20-question test runs from the basics to harder problems. A week before the real test, it shows students where their gaps are." },
  { t: "Mixed revision", x: "The practice exam builder mixes several topics with marks and a suggested time, for end-of-term and end-of-year revision." },
  { t: "Extension", x: "The last section of each full test (questions 17 to 20) has multi-step and problem-solving questions for students who finish early." },
];

const MORE = [
  { href: "/worksheets", k: "Generator", n: "Worksheet generator: any topic, any number of questions" },
  { href: "/formula-sheets", k: "Printable", n: "Formula sheets, Years 7 to 10" },
  { href: "/mind-maps", k: "Printable", n: "Revision mind maps by year" },
  { href: "/naplan", k: "Years 7 and 9", n: "NAPLAN numeracy practice tests" },
  { href: "/end-of-year-maths-exams", k: "Term 4", n: "End-of-year exam practice" },
  { href: "/years", k: "Overview", n: "Topic maps for Years 7 to 10" },
];

const FAQS = [
  {
    q: "Can I print these and use them with my class?",
    a: "Yes. The practice sheets, topic tests and practice exams are free to print, copy and share with your students, in class or as homework. Please don't sell them or republish them as your own.",
  },
  {
    q: "How does the Teacher Zone work?",
    a: "Pick a year level and the topics, choose how many questions, and create the test. You get two links: one for students, which opens the questions on Tuterly, and one with the answers and worked solutions for you. Students type their answers, press Mark my test, and see their mark and a worked solution for every question straight away.",
  },
  {
    q: "How are students' answers marked?",
    a: "Automatically. Teacher Zone tests only use questions with a single answer a computer can check: a number, a fraction, a list of values or an algebraic expression. Equivalent answers count, so 0.75, 3/4 and 75/100 are all marked right, and a factorise question needs the answer in factorised form. Questions that need an explanation stay in the printable tests.",
  },
  {
    q: "Can I see my students' results?",
    a: "Not yet. Each student sees their own mark and the worked solutions. A class results view is on the way.",
  },
  {
    q: "Is the Teacher Zone free? Do students need an account?",
    a: "Yes, it's free, up to 5 tests a day. Sign up once with your email and school. Students don't need an account or an email: they just open the link.",
  },
  {
    q: "Do I need an account for the printables?",
    a: "No. The printable practice sheets download straight away, with no login or email. The full 20-question topic tests and the practice exam builder ask for an email so we can send you the file.",
  },
  {
    q: "Which curriculum do they follow?",
    a: "The Australian Curriculum v9 for Years 7 to 10, including the 10A extension topics. The Victorian Curriculum 2.0 follows the same content. Schools sequence topics differently, so check each test against your scope and sequence.",
  },
  {
    q: "Are the answers checked?",
    a: "Yes. Every test was written and then checked a second time, independently, before it was published. If you spot an error, email us at admin@baysideacademics.com.au and we'll fix it.",
  },
  {
    q: "What's in each full topic test?",
    a: "Twenty questions in three sections: the basics (questions 1 to 4), core skills (5 to 16) and harder multi-step problems (17 to 20), with a full answer key. The free practice sheet is the first ten.",
  },
  {
    q: "What is Tuterly?",
    a: "Tuterly is a maths study app for Years 7 to 10 students, built by Bayside Academics, a Melbourne tutoring business. Students snap questions they got wrong and get a detailed worked solution and fresh practice until it sticks. The resources on this page are free whether or not your students use it.",
  },
];

export default function TeachersPage() {
  const catalogue = getExamCatalogue();
  const byYear = YEARS.map((y) => ({ year: y, groups: topicsFor(y) })).filter((y) => y.groups.length);
  const topicCount = byYear.reduce((n, y) => n + y.groups.reduce((m, g) => m + g.items.length, 0), 0);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "For teachers", item: URL },
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
          <li aria-current="page">For teachers</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">Teacher Zone · Years 7 to 10 · Free</p>
        <h1>Set a maths test in two minutes. Every student marked automatically.</h1>
        <p className="sh-lead">
          Pick the topics, share one link with your class, and each student gets their mark and a worked solution for every question the moment they finish. Plus free printable practice sheets and topic tests for {topicCount} topics.
        </p>
        <p className="tz-hero-btns">
          <a href="#teacher-zone" className="tb-btn tb-btn--primary">Create a test</a>
          <a href="#sheets" className="tb-btn tb-btn--secondary">Printable sheets</a>
        </p>
        <dl className="sh-facts">
          <div><dt>Marking</dt><dd>Automatic, with a worked solution for every question</dd></div>
          <div><dt>Students</dt><dd>No account or email needed, works on any phone</dd></div>
          <div><dt>Topics</dt><dd>Named like the textbook chapters most Victorian schools use</dd></div>
          <div><dt>Cost</dt><dd>Free, up to 5 tests a day</dd></div>
        </dl>
      </header>

      <section id="teacher-zone" className="sh-sec tz-sec" aria-labelledby="t-zone">
        <div className="sh-wrap">
          <h2 id="t-zone">Teacher Zone: build a test and share it</h2>
          <ol className="tz-steps">
            <li><strong>Pick the topics.</strong> Year level, chapters and topics, and how many questions.</li>
            <li><strong>Share one link.</strong> Post it on your class page or Compass. Keep the second link, with the worked solutions, for yourself.</li>
            <li><strong>Students are marked instantly.</strong> They type their answers and get their mark and a worked solution for every question.</li>
          </ol>
          <TeacherBuilder catalogue={catalogue} initialYear="Year 8" />
        </div>
      </section>

      <main id="sheets" className="sh-sec sh-sec--paper" aria-labelledby="t-sheets">
        <div className="sh-wrap">
          <h2 id="t-sheets">Printable practice sheets and topic tests</h2>
          <p className="sh-sub">
            Each topic has a free printable PDF ({SHEET_QUESTIONS} questions, answers on the last page) and a full 20-question test with an answer key, which we email to you.
          </p>
          <nav className="sh-switch" aria-label="Jump to a year level" style={{ margin: "8px 0 24px" }}>
            <ul>
              {byYear.map(({ year }) => (
                <li key={year}><a href={`#${anchor(year)}`}>{year}</a></li>
              ))}
            </ul>
          </nav>
          {byYear.map(({ year, groups }) => (
            <div key={year} id={anchor(year)} style={{ scrollMarginTop: 80, marginBottom: 32 }}>
              <h3 className="sh-h3" style={{ fontSize: 22, margin: "0 0 4px" }}>{year}</h3>
              {year === "Year 10A" && <p className="sh-p">Extension topics, for students heading to the harder senior maths subjects.</p>}
              {groups.map((g) => (
                <div key={g.name} className="sh-group">
                  <div className="sh-group__head">
                    <h4 style={{ margin: 0 }}>{g.name}</h4>
                    <span>{g.items.length} {g.items.length === 1 ? "topic" : "topics"}</span>
                  </div>
                  <div className="sh-grid">
                    {g.items.map((p) => (
                      <div key={p.slug} className="sh-card">
                        <span className="sh-card__name">{p.topic}</span>
                        <span style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 8, fontSize: 14 }}>
                          <a href={`/worksheets/${p.slug}/practice-questions.pdf`} className="sh-link">Practice sheet (PDF)</a>
                          <Link href={`/worksheets/${p.slug}#topic-test`} className="sh-link">Full test</Link>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <section className="sh-sec" aria-labelledby="t-exam">
        <div className="sh-wrap">
          <h2 id="t-exam">Build a printable practice exam</h2>
          <p className="sh-sub">Prefer paper? Pick a year and the topics you&rsquo;ve covered for a printable exam with marks, a suggested time and answers, including the questions that need working or an explanation.</p>
          <ExamGenerator catalogue={catalogue} initialYear="Year 8" placement="teachers_exam" />
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="t-uses">
        <div className="sh-wrap">
          <h2 id="t-uses">Ways to use them in class</h2>
          <div className="sh-tests">
            {USES.map((u) => (
              <div key={u.t} className="sh-box">
                <p className="sh-when">{u.t}</p>
                <p className="sh-p">{u.x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="t-more">
        <div className="sh-wrap">
          <h2 id="t-more">More free resources</h2>
          <div className="sh-grid">
            {MORE.map((m) => (
              <Link key={m.href} href={m.href} className="sh-card">
                <span className="sh-card__kicker">{m.k}</span>
                <span className="sh-card__name">{m.n}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="t-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="t-faq">Questions from teachers</h2>
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

      <AppCtaBand placement="teachers_final" title="Unlimited practice for your students, at home." lead="The Tuterly app gives every student fresh questions on what they got wrong, with a worked solution for each one, aligned to the Victorian Curriculum." />
      <MarketingFooter />
    </div>
  );
}
