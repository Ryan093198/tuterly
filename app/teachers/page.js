import Link from "next/link";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import TeacherBuilder from "@/components/paper/TeacherBuilder";
import { getExamCatalogue } from "@/lib/exam-bank";
import { TEACHER_RESOURCES_PATH, PRINTABLE_EXAM_PATH } from "@/lib/teacher-resources";
import { SITE_URL } from "@/lib/site";
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
    a: "Not yet. Each student sees their own mark and the worked solutions. A class results view is on the way.",
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
    a: "Yes. Every question's answer was checked by computing it, and every marking key was tested against right and wrong answers. If you spot an error, email us at admin@baysideacademics.com.au and we'll fix it.",
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

      <AppCtaBand placement="teachers_final" title="Unlimited practice for your students, at home." lead="The Tuterly app gives every student fresh questions on what they got wrong, with a worked solution for each one, aligned to the Victorian Curriculum." />
      <MarketingFooter />
    </div>
  );
}
