import Link from "next/link";
import { notFound } from "next/navigation";
import GuideShell from "@/components/parent-guides/GuideShell";
import { getChapterPages, chaptersForYear } from "@/lib/chapter-pages";
import { SHEET_QUESTIONS } from "@/lib/topic-test-files";
import {
  getTeacherChapter, teacherChapterPath, chapterPrintables, teacherZoneHref, printableExamHref,
  CLASS_USES, TEACHER_RESOURCES_PATH, chapterMindMap,
} from "@/lib/teacher-resources";
import "@/components/maths/maths.css";
import "@/components/paper/paper.css";

// One teaching-resources page per textbook chapter, Years 7 to 10 (Ryan,
// 8 Nov 2026). Chapter names follow Cambridge Essential Mathematics for the
// Victorian Curriculum; the resources are Tuterly's own.
export const dynamicParams = false;
export function generateStaticParams() {
  return getChapterPages().map((c) => ({ year: c.yearSlug, chapter: c.slug }));
}

const titleCase = (s) =>
  s.replace(/\w[^\s-]*/g, (w, i) => (i > 0 && /^(and|of|the|a|an|to|for|in|on|with|by|using)$/i.test(w) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1)));

function meta(c) {
  const subs = c.sections.slice(0, 3).map((s) => s.name.toLowerCase()).join(", ");
  return {
    title: `${c.yearLabel} ${titleCase(c.name)} Teaching Resources: Worksheets and Tests | Tuterly`,
    description: `Free ${c.yearLabel} ${c.name.toLowerCase()} teaching resources: printable worksheets and topic tests with answers, a revision mind map, and an auto-marked test to share with your class. Covers ${subs} and more.`,
  };
}

export async function generateMetadata({ params }) {
  const { year, chapter } = await params;
  const c = getTeacherChapter(year, chapter);
  if (!c) return {};
  const { title, description } = meta(c);
  const url = `https://www.tuterly.com.au${teacherChapterPath(c)}`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { title, description, url, images: ["/og-tuterly.png"] } };
}

export default async function TeacherChapterPage({ params }) {
  const { year, chapter } = await params;
  const c = getTeacherChapter(year, chapter);
  if (!c) notFound();
  const { title, description } = meta(c);
  const path = teacherChapterPath(c);
  const sheets = chapterPrintables(c);
  const map = chapterMindMap(c);
  const isTen = c.fileYear === "Year 10A";
  const ext = c.sections.filter((s) => s.extension);
  const others = chaptersForYear(c.yearSlug).filter((o) => o.slug !== c.slug);
  const name = c.name.toLowerCase();

  const faqs = [
    { q: `What does ${c.yearLabel} ${c.name} cover?`, a: `${c.sections.map((s) => s.name).join(", ")}.${ext.length ? ` The 10A extension topics are ${ext.map((s) => s.name).join(", ")}.` : ""}` },
    { q: "How does the auto-marked test work?", a: "Open the Teacher Zone with this chapter's topics already ticked, choose how many questions and create the test. You get a link for students, who type their answers and see their mark and a worked solution for every question as soon as they finish, and a second link with all the answers for you. Free, up to 5 tests a day." },
    { q: "Can I print these for my class?", a: "Yes. The practice sheets, topic tests and printable exams are free to print, copy and share with your students. Please don't sell them or republish them as your own." },
    { q: "Does this follow our textbook?", a: "The chapter and topic names follow Cambridge Essential Mathematics for the Victorian Curriculum, the textbook most Victorian schools use. The questions are Tuterly's own. Tuterly isn't affiliated with Cambridge University Press." },
  ];

  return (
    <GuideShell
      path={path}
      title={title}
      description={description}
      crumbs={[{ name: "For teachers", path: "/teachers" }, { name: "Teaching resources", path: TEACHER_RESOURCES_PATH }, { name: `${c.yearLabel} ${c.name}`, path }]}
      eyebrow={`${c.yearLabel} maths · Teaching resources`}
      h1={`${c.yearLabel} ${c.name}: free teaching resources`}
      lead={`Printable worksheets and topic tests with answers for every part of ${name}, and an auto-marked test you can share with your class in one link.`}
      quickAnswerAt="bottom"
      quickAnswer={`${c.yearLabel} ${c.name} covers ${c.sections.length} topics. Set an auto-marked test on any of them in two minutes, print a practice exam, or download a practice sheet with answers for each topic.`}
      toc={[
        ["set", "Set it for your class"],
        ["covered", "What's covered"],
        ...(sheets.length ? [["printables", "Worksheets and tests"]] : []),
        ...(map ? [["mind-map", "Revision mind map"]] : []),
        ["ideas", "Ideas for class"],
        ["faq", "FAQ"],
      ]}
      ctaTitle="Practice at home for your students"
      ctaText="The Tuterly app gives each student fresh questions on what they got wrong, with a worked solution for every one, aligned to the Victorian Curriculum."
      placement={`teacher_chapter_${c.yearSlug}`}
      faqs={faqs}
      faqTitle="Common questions"
      showGuides={false}
      moreTitle="More for teachers"
      links={[
        { href: "/teachers", label: "Teacher Zone: auto-marked tests" },
        { href: TEACHER_RESOURCES_PATH, label: "Teaching resources for every chapter" },
        { href: c.path, label: `${c.yearLabel} ${c.name} practice test for students` },
      ]}
      finalTitle="Want your students practising at home too?"
      finalText="The Tuterly app gives each student fresh questions on what they got wrong, with a worked solution for every one, aligned to the Victorian Curriculum. Built by Bayside Academics in Melbourne."
    >
      <section id="set" className="tb-section" aria-labelledby="h-set">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-set" className="tb-h2 pg-h2">Set {name} for your class</h2>
          <div className="tr-actions">
            <div className="tr-action tr-action--main">
              <p className="tr-action__t">Auto-marked test, shared by link</p>
              <p className="tr-action__x">Opens the Teacher Zone with every topic in this chapter ticked. Students are marked as soon as they finish, with worked solutions.</p>
              {isTen ? (
                <span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Link href={teacherZoneHref(c, { standard: true })} className="tb-btn tb-btn--primary">Year 10 test</Link>
                  <Link href={teacherZoneHref(c)} className="tb-btn tb-btn--secondary">Year 10A test</Link>
                </span>
              ) : (
                <Link href={teacherZoneHref(c)} className="tb-btn tb-btn--primary">Create a test</Link>
              )}
            </div>
            <div className="tr-action">
              <p className="tr-action__t">Printable practice exam</p>
              <p className="tr-action__x">A PDF with marks, a suggested time and answers, including questions that need working or an explanation.</p>
              {isTen ? (
                <span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Link href={printableExamHref(c, { standard: true })} className="tb-btn tb-btn--secondary">Year 10 exam</Link>
                  <Link href={printableExamHref(c)} className="tb-btn tb-btn--secondary">Year 10A exam</Link>
                </span>
              ) : (
                <Link href={printableExamHref(c)} className="tb-btn tb-btn--secondary">Build an exam</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="covered" className="tb-section tb-section--card" aria-labelledby="h-covered">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-covered" className="tb-h2 pg-h2">What {c.yearLabel} {c.name} covers</h2>
          <p className="pg-intro">{c.sections.length} topics, in textbook order.{isTen && ext.length ? " Topics marked 10A are the extension topics." : ""}</p>
          <ul className="tr-subs">
            {c.sections.map((s) => (
              <li key={s.code}>{s.name}{s.extension && <span className="tr-tag">10A</span>}</li>
            ))}
          </ul>
        </div>
      </section>

      {sheets.length > 0 && (
        <section id="printables" className="tb-section" aria-labelledby="h-print">
          <div className="tb-wrap pg-narrow">
            <h2 id="h-print" className="tb-h2 pg-h2">Printable worksheets and topic tests</h2>
            <p className="pg-intro">Each practice sheet is a free PDF ({SHEET_QUESTIONS} questions, answers on the last page). The full 20-question test with an answer key is emailed to you.</p>
            <ul className="tr-sheets">
              {sheets.map((p) => (
                <li key={p.slug}>
                  <span className="tr-sheets__name">{p.yearLevel} {p.topic}</span>
                  <a href={`/worksheets/${p.slug}/practice-questions.pdf`}>Practice sheet (PDF)</a>
                  <Link href={`/worksheets/${p.slug}#topic-test`}>Full test</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {map && (
        <section id="mind-map" className="tb-section tb-section--card" aria-labelledby="h-map">
          <div className="tb-wrap pg-narrow">
            <h2 id="h-map" className="tb-h2 pg-h2">Revision mind map</h2>
            <div className="tr-map">
              <Link href={map.path} className="tr-map__img" aria-label={`${c.yearLabel} ${map.title} mind map`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={map.preview} alt={`${c.yearLabel} ${map.title} revision mind map`} width={720} height={509} loading="lazy" />
              </Link>
              <div>
                <p className="tr-action__t">{c.yearLabel} {map.title}: the whole chapter on one page</p>
                <p className="tr-action__x">{map.summary} A worked example for each topic, ready to print on A4 for revision or to put on the board.</p>
                <Link href={map.path} className="tb-btn tb-btn--secondary">View and download (PDF)</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="ideas" className="tb-section" aria-labelledby="h-ideas">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-ideas" className="tb-h2 pg-h2">Ideas for using them in class</h2>
          <div className="tr-uses">
            {CLASS_USES.map((u) => (
              <div key={u.t}><strong>{u.t}</strong><p>{u.x}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section tb-section--card" aria-labelledby="h-others">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-others" className="tb-h2 pg-h2">Other {c.yearLabel} chapters</h2>
          <ul className="ct-others">
            {others.map((o) => (
              <li key={o.slug}><Link href={teacherChapterPath(o)}>{o.name}</Link></li>
            ))}
          </ul>
          <p className="pg-small">Chapter and topic names follow Cambridge Essential Mathematics for the Victorian Curriculum. Questions are Tuterly&rsquo;s own. Tuterly isn&rsquo;t affiliated with Cambridge University Press.</p>
        </div>
      </section>
    </GuideShell>
  );
}
