import Link from "next/link";
import { notFound } from "next/navigation";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import MathMd from "@/components/maths/MathMd";
import "@/components/maths/maths.css";
import { getChapterPages, getChapterPage, chaptersForYear, chapterSamples, chapterWorksheets, chapterGeneratorHref } from "@/lib/chapter-pages";

// One practice test page per textbook chapter (Ryan, 8 Nov 2026). Chapter
// and subtopic names follow the Cambridge Essential Mathematics for the
// Victorian Curriculum contents; the questions are Tuterly's own.

export const dynamicParams = false;
export function generateStaticParams() {
  return getChapterPages().map((c) => ({ year: c.yearSlug, chapter: c.slug }));
}

const titleCase = (s) =>
  s.replace(/\w[^\s-]*/g, (w, i) => (i > 0 && /^(and|of|the|a|an|to|for|in|on|with|by|using)$/i.test(w) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1)));

function meta(c) {
  const subs = c.sections.slice(0, 4).map((s) => s.name.toLowerCase()).join(", ");
  return {
    title: `${c.yearLabel} ${titleCase(c.name)} Practice Test (Free, with Answers) | Tuterly`,
    description: `Free ${c.yearLabel} ${c.name.toLowerCase()} practice test with answers, covering ${subs} and more. Sample questions, then build a full printable exam on the chapter. Australian Curriculum.`,
  };
}

export async function generateMetadata({ params }) {
  const { year, chapter } = await params;
  const c = getChapterPage(year, chapter);
  if (!c) return {};
  return pageMetadata({ ...meta(c), path: c.path });
}

export default async function ChapterTestPage({ params }) {
  const { year, chapter } = await params;
  const c = getChapterPage(year, chapter);
  if (!c) notFound();
  const { title, description } = meta(c);
  const samples = chapterSamples(c);
  const sheets = chapterWorksheets(c);
  const others = chaptersForYear(c.yearSlug).filter((o) => o.slug !== c.slug);
  const isTen = c.fileYear === "Year 10A";
  const ext = c.sections.filter((s) => s.extension);
  const subList = c.sections.map((s) => s.name).join(", ");

  const faqs = [
    { q: `What’s in ${c.yearLabel} ${c.name}?`, a: `The chapter covers ${subList}.${ext.length ? ` The 10A extension topics are ${ext.map((s) => s.name).join(", ")}.` : ""}` },
    { q: "Does this follow our textbook?", a: "The topic names follow the chapters of the Cambridge Essential Mathematics for the Victorian Curriculum textbook used in most Victorian schools. The questions are Tuterly’s own, written for the Australian Curriculum. Tuterly isn’t affiliated with Cambridge University Press." },
    { q: "Is the practice test free?", a: "Yes. The sample questions on this page are free, and the exam generator builds a full printable exam on this chapter, free with your email, one exam a day." },
    { q: "Can I print it?", a: "Yes. Build the exam, then print it or save it as a PDF, with or without the answers." },
    { q: "Can it match my actual school test?", a: "Exam Zone in the Tuterly app can get closer: upload your test outline, past papers and teacher’s notes, and Tuterly writes practice exams in the style of your school’s test." },
  ];

  return (
    <GuideShell
      path={c.path}
      title={title}
      description={description}
      crumbs={[{ name: "Maths practice tests", path: "/maths-tests" }, { name: c.yearLabel, path: `/maths-tests#${c.yearSlug}` }, { name: c.name, path: c.path }]}
      eyebrow={`${c.yearLabel} maths practice test`}
      h1={`${c.yearLabel} ${c.name}: free practice test with answers`}
      lead={`Practice questions for every part of ${c.name.toLowerCase()}, with answers, then a full printable exam on the chapter in one click. Topic names follow the textbook most Victorian schools use.`}
      quickAnswer={`${c.yearLabel} ${c.name} covers ${c.sections.length} topics: ${subList}. Try the sample questions below, then build a full practice exam on any of them.`}
      toc={[
        ["covered", "What’s covered"],
        ["sample", "Sample questions"],
        ["build", "Build a full exam"],
        ...(sheets.length ? [["worksheets", "Worksheets"]] : []),
        ["faq", "FAQ"],
      ]}
      ctaTitle={`Predict the questions on your ${c.name.toLowerCase()} test`}
      ctaText="Upload your test outline, past papers and teacher’s notes. Exam Zone in the Tuterly app writes practice exams in your school’s style, before the real one."
      placement={`chapter_${c.yearSlug}`}
      faqs={faqs}
      faqTitle={`${c.yearLabel} ${c.name}: common questions`}
      showGuides={false}
      moreTitle="More maths help, Years 7 to 10"
      links={[
        { href: "/exam-generator", label: "Free maths exam generator" },
        { href: "/students#exam-zone", label: "How Tuterly predicts your exam" },
        { href: "/maths-tests", label: "All maths practice tests by topic" },
      ]}
      finalTitle="Got a test coming up on this chapter?"
      finalText="Exam Zone in the Tuterly app turns your test outline and past papers into practice exams in your school’s style, then fixes everything you miss. Built for the Australian Curriculum by Bayside Academics."
    >
      <section id="covered" className="tb-section" aria-labelledby="h-covered">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-covered" className="tb-h2 pg-h2">What this {c.yearLabel} practice test covers</h2>
          <p className="pg-intro">{c.sections.length} topics, in textbook order.{isTen && ext.length ? " Topics marked 10A are the extension topics for Year 10A." : ""}</p>
          <ul className="pg-checklist ct-subs">
            {c.sections.map((s) => (
              <li key={s.code}>
                {s.name}
                {s.extension && <span className="ct-tag">10A</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="sample" className="tb-section tb-section--card" aria-labelledby="h-sample">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-sample" className="tb-h2 pg-h2">Sample {c.name.toLowerCase()} questions with answers</h2>
          <p className="pg-intro">Try each one before you open the answer.</p>
          <ol className="mx-practice">
            {samples.map((q, i) => (
              <li key={i}>
                <p className="ct-qtopic">{q.section}</p>
                <MathMd md={q.question} />
                <details>
                  <summary>Show the answer</summary>
                  <MathMd md={q.solution ? q.solution : `**Answer:** ${q.answer}`} />
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="build" className="tb-section" aria-labelledby="h-build">
        <div className="tb-wrap pg-narrow">
          <div className="ct-build">
            <h2 id="h-build" className="tb-h2 pg-h2">Build a full {c.name.toLowerCase()} practice exam</h2>
            <p>Opens the free exam generator with every topic in this chapter ticked. Untick any you don’t need, then get a printable exam with marks, a suggested time and answers. Free with your email, one exam a day.</p>
            <div className="ct-build__btns">
              {isTen ? (
                <>
                  <Link href={chapterGeneratorHref(c, { standard: true })} className="tb-btn tb-btn--primary">Build a Year 10 exam</Link>
                  <Link href={chapterGeneratorHref(c)} className="tb-btn tb-btn--secondary">Build a Year 10A exam</Link>
                </>
              ) : (
                <Link href={chapterGeneratorHref(c)} className="tb-btn tb-btn--primary">Build my practice exam</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {sheets.length > 0 && (
        <section id="worksheets" className="tb-section tb-section--card" aria-labelledby="h-sheets">
          <div className="tb-wrap pg-narrow">
            <h2 id="h-sheets" className="tb-h2 pg-h2">Free worksheets for this chapter</h2>
            <p className="pg-intro">Worked examples and a free PDF with answers for each topic.</p>
            <ul className="pg-checklist">
              {sheets.map((p) => (
                <li key={p.slug}><Link href={`/worksheets/${p.slug}`}>{p.yearLevel} {p.topic.toLowerCase()} worksheet</Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="tb-section" aria-labelledby="h-others">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-others" className="tb-h2 pg-h2">Other {c.yearLabel} practice tests</h2>
          <ul className="ct-others">
            {others.map((o) => (
              <li key={o.slug}><Link href={o.path}>{o.name}</Link></li>
            ))}
          </ul>
          <p className="pg-small">Topic names follow the chapters of Cambridge Essential Mathematics for the Victorian Curriculum. Questions are Tuterly’s own. Tuterly isn’t affiliated with Cambridge University Press.</p>
        </div>
      </section>
    </GuideShell>
  );
}
