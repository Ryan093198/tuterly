import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import { CtaBand } from "@/components/brand";
import { Md } from "@/lib/md-html";
import { getWorkedExamples } from "@/lib/worked-examples";
import "katex/dist/katex.min.css";
import "@/components/study/worked-examples.css";
import TeacherBuilder from "@/components/paper/TeacherBuilder";
import { getExamCatalogue } from "@/lib/exam-bank";
import { TEACHER_RESOURCES_PATH, PRINTABLE_EXAM_PATH } from "@/lib/teacher-resources";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";
import "@/components/paper/paper.css";

// For teachers: the Teacher Zone (auto-marked tests shared by link). Since
// 8 Nov 2026 (Ryan: "the page is way too long") the printable sheets, topic
// tests and the paper exam builder live on their own pages under
// /teachers/resources and /teachers/printable-exam (lib/teacher-resources.js).

const TITLE = "Free Auto-Marked Maths Tests for Teachers | Tuterly";
const DESCRIPTION =
  "Build a Years 7 to 10 maths test on any topic, share one link, and every student is marked automatically with a worked solution for every question. Free for teachers, up to 5 tests a day. Victorian Curriculum.";
const URL = `${SITE_URL}/teachers`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { images: ["/og-tuterly.png"], title: TITLE, description: DESCRIPTION, url: URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const MORE = [
  { href: TEACHER_RESOURCES_PATH, k: "By chapter", n: "Teaching resources for every chapter, Years 7 to 10", x: "Printable practice sheets, full topic tests with answer keys and ready-made auto-marked tests." },
  { href: PRINTABLE_EXAM_PATH, k: "Paper", n: "Printable practice exam builder", x: "A PDF exam with marks and a suggested time, including questions that need working or explanations." },
  { href: "/naplan", k: "Years 7 and 9", n: "NAPLAN numeracy practice tests", x: "Online and printable tests in the 2027 format." },
  { href: "/formula-sheets", k: "Printable", n: "Formula sheets, Years 7 to 10", x: "One page per year level." },
  { href: "/worksheets", k: "Generator", n: "Worksheet generator", x: "Any topic, any number of questions." },
  { href: "/mind-maps", k: "Printable", n: "Revision mind maps by year", x: "Every topic on one page." },
];

// Tuterly for Teachers: class marking, piloting at Bayside Academics since
// Nov 2026 (~/tuterly-marking). Facts only: no time-saved or accuracy claims.
const TFT_FEATURES = [
  { n: "Scan the class set", x: "Send the scans straight from your school copier to your class's own Tuterly email address, or upload a PDF." },
  { n: "Every page matched", x: "Tuterly recognises the test and matches each page to the right student." },
  { n: "Marked, then checked", x: "Every answer is marked twice, with a separate blind check. Anything it isn't sure about is flagged for you." },
  { n: "You approve every mark", x: "One decision at a time: the student's answer next to the correct one, with big Right and Wrong buttons. It works on a phone." },
  { n: "What to reteach", x: "A class summary after each test, with the topics to reteach by chapter and results for every student." },
  { n: "Revision packs before exams", x: "Chapter summaries, practice weighted to what the class missed, a practice exam, and a page for each student on their 3 weakest topics." },
  { n: "Results students can use", x: "Students get a marked-up copy of their paper, and the questions they missed go into their Tuterly app to practise." },
  { n: "Classes and teachers", x: "Each teacher sees their own classes, and a head of department can see them all." },
];
// Two ways to reach out, each with a short email ready to send.
const mail = (subject, body) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const TFT_DEMO = mail("Tuterly for Teachers: book a demo", "Hi Tuterly team,\n\nI'd like a demo of Tuterly for Teachers.\n\nName:\nSchool:\nYear levels I teach:\nBest time to talk:\n\nThanks");
const TFT_ACCOUNT = mail("Tuterly for Teachers: teacher account", "Hi Tuterly team,\n\nI'd like to set up a teacher account for my own classes.\n\nName:\nSchool:\nYear levels and number of classes:\n\nThanks");
function TftButtons({ light = false }) {
  return (
    <p className="tz-hero-btns tft-btns">
      <a href={TFT_DEMO} className="tb-btn tb-btn--primary">Book a demo</a>
      <a href={TFT_ACCOUNT} className={`tb-btn tb-btn--secondary${light ? " tft-btn--light" : ""}`}>Ask about a teacher account</a>
    </p>
  );
}
// The example sheet: real questions from the site's checked Year 8 topic
// pages (content/worked-examples), so teachers can open each topic and see
// the questions and worked solutions a student would get.
const SHEET = [
  { slug: "year-8-linear-equations", topic: "Solving linear equations", mark: "Lost 4 marks", count: "3 questions", pick: [0, 1, 2] },
  { slug: "year-8-exponents", topic: "Index laws", mark: "Lost 3 marks", count: "3 questions", pick: [0, 1, 2] },
  { slug: "year-8-pythagoras", topic: "Pythagoras’ theorem", mark: "Lost 2 marks", count: "3 questions", pick: [0, 1, 2] },
  { slug: "year-8-rates", topic: "Ratios and rates", mark: "Full marks", count: "1 extension question", pick: [2], ok: true },
];
function sheetTopics() {
  return SHEET.map((s) => {
    const w = getWorkedExamples(s.slug);
    return { ...s, questions: w ? s.pick.map((i) => w.examples[i]).filter(Boolean) : [] };
  });
}

// How each student gets their own practice (revision sheets and exam packs).
const TFT_PER_STUDENT = [
  { n: "1", t: "Mark the class test", x: "Every question marked, so Tuterly knows exactly which ones each student lost marks on." },
  { n: "2", t: "Find each student's weak topics", x: "Grouped by textbook section, from the questions they got wrong." },
  { n: "3", t: "Practice made for each student", x: "Fresh questions on their weak topics, with worked solutions. Topics they aced get a harder extension question instead." },
];

const FAQS = [
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
    a: "Not in the free Teacher Zone: each student sees their own mark and the worked solutions. Tuterly for Teachers, for paper tests marked from a scan, gives you results for the whole class and every student. Email learn@tuterly.com.au to set it up.",
  },
  {
    q: "Is the Teacher Zone free? Do students need an account?",
    a: "Yes, it's free, up to 5 tests a day. Sign up once with your email and school. Students don't need an account or an email: they just open the link.",
  },
  {
    q: "Which curriculum do they follow?",
    a: "The Australian Curriculum v9 for Years 7 to 10, including the 10A extension topics. The Victorian Curriculum 2.0 follows the same content. Schools sequence topics differently, so check each test against your scope and sequence.",
  },
  {
    q: "Are the answers checked?",
    a: "Yes. Every question's answer was checked by computing it, and every marking key was tested against right and wrong answers. If you spot an error, email us at learn@tuterly.com.au and we'll fix it.",
  },
  {
    q: "What is Tuterly?",
    a: "Tuterly is a maths study app for Years 7 to 10 students, built by Bayside Academics, a Melbourne tutoring business. Students snap questions they got wrong and get a detailed worked solution and fresh practice until it sticks. The Teacher Zone and the teaching resources are free whether or not your students use it.",
  },
];

export default function TeachersPage() {
  const catalogue = getExamCatalogue();

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
          Pick the topics, share one link with your class, and each student gets their mark and a worked solution for every question the moment they finish.
        </p>
        <p className="tz-hero-btns">
          <a href="#teacher-zone" className="tb-btn tb-btn--primary">Create a test</a>
          <Link href={TEACHER_RESOURCES_PATH} className="tb-btn tb-btn--secondary">Printable resources</Link>
        </p>
        <div className="tft-banner">
          <p className="tft-banner__k">New · Tuterly for Teachers</p>
          <p className="tft-banner__t">We mark your class&rsquo;s paper tests, then make practice for each student on the topics they&rsquo;re weakest in.</p>
          <p className="tz-hero-btns tft-btns">
            <a href={TFT_DEMO} className="tb-btn tb-btn--primary">Book a demo</a>
            <Link href="/teachers/how-it-works" className="tb-btn tb-btn--secondary">See how it works</Link>
          </p>
        </div>
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

      <section id="tuterly-for-teachers" className="sh-sec sh-sec--paper tft" aria-labelledby="t-tft">
        <div className="sh-wrap">
          <p className="sh-eyebrow">Tuterly for Teachers · Class marking</p>
          <h2 id="t-tft">Mark the class test. Every student gets practice made for them.</h2>
          <p className="sh-lead tft-lead">
            Your class sits the test on paper as usual. Scan the class set, and Tuterly marks every answer, flags anything it isn&rsquo;t sure about, and shows you what to reteach. Then it writes practice for each student on the exact topics they lost marks in. Nothing reaches students until you approve it.
          </p>
          <TftButtons />

          <Link href="/teachers/how-it-works" className="tft-howlink">
            <img src="/teachers/demo/archie-brown-pythagoras.jpg" alt="" className="tft-howlink__img" />
            <span className="tft-howlink__copy">
              <span className="tft-howlink__k">See it step by step</span>
              <span className="tft-howlink__t">Follow one real class test from the copier to every student&rsquo;s phone</span>
              <span className="tft-howlink__go">See how it works →</span>
            </span>
          </Link>

          <div className="tft-each">
            <div>
              <h3 className="tft-each__title">Practice for every student, not one worksheet for the whole class</h3>
              <ol className="tft-steps">
                {TFT_PER_STUDENT.map((s) => (
                  <li key={s.n}><span className="tft-steps__n" aria-hidden="true">{s.n}</span><span><strong>{s.t}.</strong> {s.x}</span></li>
                ))}
              </ol>
              <p className="sh-p tft-each__note">Print each student&rsquo;s sheet, or let it go to their Tuterly app, where the questions they missed become practice until they&rsquo;ve mastered them.</p>
            </div>
            <div className="tft-sheet" aria-label="Example of one student's practice sheet">
              <p className="tft-sheet__k">Example · one student&rsquo;s sheet</p>
              <p className="tft-sheet__name">Year 8 · Term 3 topic test</p>
              <p className="tft-sheet__hint">Tap a topic to see the questions.</p>
              <div className="tft-sheet__list">
                {sheetTopics().map((s) => (
                  <details key={s.slug} className="tft-topic">
                    <summary>
                      <span className="tft-topic__main">
                        <span className="tft-topic__name">{s.topic}</span>
                        <span className="tft-topic__tags">
                          <span className={`tft-tag ${s.ok ? "tft-tag--ok" : "tft-tag--miss"}`}>{s.mark}</span>
                          <span className="tft-tag">{s.count}</span>
                        </span>
                      </span>
                      <span className="tft-topic__chev" aria-hidden="true">›</span>
                    </summary>
                    <ol className="tft-topic__qs">
                      {s.questions.map((q, i) => (
                        <li key={i} className="tft-q">
                          <p className="tft-q__n">{s.ok ? "Extension question" : `Question ${i + 1}`}</p>
                          <Md className="wx-md" tableClass="wx-table" md={q.question} />
                          <details className="wx-sol">
                            <summary>Show worked solution</summary>
                            <Md className="wx-md" tableClass="wx-table" md={q.solution} />
                          </details>
                        </li>
                      ))}
                    </ol>
                  </details>
                ))}
              </div>
              <p className="tft-sheet__foot">Real questions from our Year 8 bank, each with a worked solution. The student next to them gets a different sheet.</p>
            </div>
          </div>
          <div className="tft-grid">
            {TFT_FEATURES.map((f) => (
              <div key={f.n} className="sh-box tft-card">
                <h3 className="sh-h3">{f.n}</h3>
                <p className="sh-p">{f.x}</p>
              </div>
            ))}
          </div>
          <div className="tft-cta">
            <p className="tft-cta__title">Set it up in your school, or get a teacher account.</p>
            <p className="sh-p">
              It&rsquo;s running now at Bayside Academics in Melbourne, and we&rsquo;re setting up schools one at a time. Book a demo and we&rsquo;ll show you a class set marked from start to finish, whether it&rsquo;s for your whole department or just your own classes.
            </p>
            <TftButtons />
            <p className="sh-p tft-cta__or">Or email us any time: <a href={`mailto:${CONTACT_EMAIL}`} className="tft-cta__mail">{CONTACT_EMAIL}</a></p>
          </div>
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="t-more">
        <div className="sh-wrap">
          <h2 id="t-more">More free teaching resources</h2>
          <div className="sh-grid">
            {MORE.map((m) => (
              <Link key={m.href} href={m.href} className="sh-card">
                <span className="sh-card__kicker">{m.k}</span>
                <span className="sh-card__name">{m.n}</span>
                <span className="sh-card__meta">{m.x}</span>
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
              <details key={f.q} className="sh-box tz-faq">
                <summary><h3 className="sh-h3">{f.q}</h3></summary>
                <p className="sh-p">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        id="teachers-tft-final"
        title="Want practice made for every student in your class?"
        lead="Tuterly for Teachers marks your paper tests and writes each student their own practice on their weakest topics. Book a demo, or ask about an account for your own classes."
      >
        <TftButtons light />
      </CtaBand>

      <AppCtaBand placement="teachers_final" title="Unlimited practice for your students, at home." lead="The Tuterly app gives every student fresh questions on what they got wrong, with a worked solution for each one, aligned to the Victorian Curriculum." />
      <MarketingFooter />
    </div>
  );
}
