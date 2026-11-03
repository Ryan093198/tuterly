import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import ExamGenerator from "@/components/exam/ExamGenerator";
import { getExamCatalogue } from "@/lib/exam-bank";
import { YEAR_TESTS, TEST_YEARS, sampleTest } from "@/lib/year-tests";
import { SITE_URL } from "@/lib/site";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";
import "./year-test.css";

export function yearTestMetadata(n) {
  const t = YEAR_TESTS[n];
  const url = `${SITE_URL}/year-${n}-maths-test`;
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: { canonical: url },
    openGraph: { images: ["/og-tuterly.png"], title: t.title, description: t.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

function Md({ children }) {
  return (
    <div className="eg-md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {children || ""}
      </ReactMarkdown>
    </div>
  );
}

export default function YearTest({ n }) {
  const t = YEAR_TESTS[n];
  const year = `Year ${n}`;
  const url = `${SITE_URL}/year-${n}-maths-test`;
  const questions = sampleTest(n);
  const catalogue = getExamCatalogue();
  const genCatalogue = Object.fromEntries(
    Object.entries(catalogue).filter(([y]) => y === year || (String(n) === "10" && y === "Year 10A"))
  );

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Practice tests", item: `${SITE_URL}/practice-maths-tests-secondary` },
        { "@type": "ListItem", position: 3, name: `${year} maths test`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: `${year} maths test`,
      educationalLevel: year,
      about: { "@type": "Thing", name: "Mathematics" },
      hasPart: questions.map((q) => ({
        "@type": "Question",
        eduQuestionType: "Short answer",
        text: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="sh yt">
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
          <li aria-current="page">{year}</li>
        </ol>
      </nav>

      <header className="sh-hero">
        <p className="sh-eyebrow">{year} maths · Australian Curriculum</p>
        <h1>{t.h1}</h1>
        <p className="sh-lead">{t.lead}</p>
        <p className="yt-jump"><a href="#make-test">Make a full {year} practice test ↓</a></p>
      </header>

      <main className="sh-wrap yt-test" aria-labelledby="yt-sample">
        <h2 id="yt-sample">{year} sample test</h2>
        <p className="sh-sub">{questions.length} questions, one from each of {questions.length} topics. Work them out on paper, then open each answer to mark it.</p>
        <ol className="yt-list">
          {questions.map((q) => (
            <li key={q.n} className="yt-q">
              <div className="yt-q__head">
                <span className="yt-q__num">Question {q.n}</span>
                <Link href={`/worksheets/${q.slug}`} className="yt-q__topic">{q.topic}</Link>
              </div>
              <Md>{q.question}</Md>
              <details className="yt-ans">
                <summary>Show the answer and working</summary>
                <div className="yt-ans__answer"><strong>Answer:</strong> <Md>{q.answer}</Md></div>
                <Md>{q.solution}</Md>
                <p className="yt-ans__more"><Link href={`/worksheets/${q.slug}`}>More {q.topic.toLowerCase()} practice →</Link></p>
              </details>
            </li>
          ))}
        </ol>
      </main>

      <section id="make-test" className="sh-sec sh-sec--paper" aria-labelledby="yt-make">
        <div className="sh-wrap">
          <h2 id="yt-make">Make a full {year} practice test</h2>
          <p className="sh-sub">Tick the topics on your child&rsquo;s next test and get up to 20 questions in exam format, with marks, a suggested time and worked solutions.</p>
          <ExamGenerator catalogue={genCatalogue} initialYear={year} placement={`year_${n}_test`} />
        </div>
      </section>

      <section className="sh-sec" aria-labelledby="yt-about">
        <div className="sh-wrap sh-cols">
          <div>
            <h2 id="yt-about">What&rsquo;s on a {year} maths test</h2>
            {t.whatsOn.map((p, i) => <p key={i} className="sh-p">{p}</p>)}
          </div>
          <div className="sh-side">
            <div className="sh-box">
              <h3 className="sh-h3">Practise one topic</h3>
              <p className="sh-p">Worksheets for every {year} topic, with worked solutions.</p>
              <p className="sh-p"><Link href={`/worksheets/year-${n}`} className="sh-link">{year} maths worksheets →</Link></p>
            </div>
            {t.naplan && (
              <div className="sh-box">
                <h3 className="sh-h3">NAPLAN</h3>
                <p className="sh-p"><Link href="/naplan" className="sh-link">Free NAPLAN-style numeracy test →</Link></p>
              </div>
            )}
            <div className="sh-box">
              <h3 className="sh-h3">For {year} students</h3>
              <p className="sh-p"><Link href={`/students/year-${n}`} className="sh-link">How to get better marks in {year} maths →</Link></p>
            </div>
          </div>
        </div>
      </section>

      <section className="sh-sec sh-sec--paper" aria-labelledby="yt-faq">
        <div className="sh-wrap sh-narrow">
          <h2 id="yt-faq">{year} maths test questions</h2>
          <div className="sh-faqs">
            {t.faqs.map((f) => (
              <div key={f.q} className="sh-box">
                <h3 className="sh-h3">{f.q}</h3>
                <p className="sh-p">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="sh-switch" aria-label="Maths tests by year level">
        <p className="sh-switch__title">Another year level?</p>
        <ul>
          {TEST_YEARS.map((y) => (
            <li key={y}>
              <Link href={`/year-${y}-maths-test`} aria-current={y === String(n) ? "page" : undefined} className={y === String(n) ? "is-current" : ""}>
                Year {y}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <AppCtaBand placement={`year_${n}_test_final`} />
      <MarketingFooter />
    </div>
  );
}
