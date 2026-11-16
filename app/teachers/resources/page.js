import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { CHAPTER_YEARS, chaptersForYear } from "@/lib/chapter-pages";
import { teacherChapterPath, chapterPrintables, chapterMindMap, teacherZoneHref, printableExamHref, PRINTABLE_EXAM_PATH } from "@/lib/teacher-resources";
import TopicFinder from "@/components/teachers/TopicFinder";
import "@/components/maths/maths.css";
import "@/components/paper/paper.css";

// Hub for the teacher chapter pages (Ryan, 8 Nov 2026).
const PATH = "/teachers/resources";
const TITLE = "Free Maths Teaching Resources, Years 7 to 10: Worksheets and Tests | Tuterly";
const DESCRIPTION =
  "Free maths teaching resources for every Years 7 to 10 chapter: printable worksheets and topic tests with answers, printable exams, and auto-marked tests to share with your class. Victorian Curriculum.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "website" });

// Everything the finder needs, built here so the client gets plain data.
function finderData() {
  return CHAPTER_YEARS.flatMap((y) =>
    chaptersForYear(y.slug).map((c) => {
      const isTen = c.fileYear === "Year 10A";
      const map = chapterMindMap(c);
      return {
        key: `${c.yearSlug}/${c.slug}`,
        yearSlug: c.yearSlug,
        yearLabel: c.yearLabel,
        name: c.name,
        path: teacherChapterPath(c),
        topics: c.sections.map((s) => s.name),
        zone: isTen
          ? [{ href: teacherZoneHref(c, { standard: true }), label: "Year 10 auto-marked test" }, { href: teacherZoneHref(c), label: "Year 10A auto-marked test" }]
          : [{ href: teacherZoneHref(c), label: "Auto-marked test" }],
        exam: isTen
          ? [{ href: printableExamHref(c, { standard: true }), label: "Year 10 printable exam" }, { href: printableExamHref(c), label: "Year 10A printable exam" }]
          : [{ href: printableExamHref(c), label: "Printable exam" }],
        map: map?.path || null,
        sheets: chapterPrintables(c).map((p) => ({
          label: `${p.yearLevel} ${p.topic}`,
          pdf: `/worksheets/${p.slug}/practice-questions.pdf`,
          test: `/worksheets/${p.slug}#topic-test`,
        })),
      };
    }),
  );
}

export default function TeacherResourcesHub() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "For teachers", path: "/teachers" }, { name: "Teaching resources", path: PATH }]}
      eyebrow="For teachers · Years 7 to 10"
      h1="Free maths teaching resources"
      lead="Years 7 to 10, every chapter. Pick a year and chapter, or search a topic: an auto-marked test to share, a printable exam, practice sheets with answers and a revision mind map."
      ctaTitle="Practice at home for your students"
      ctaText="The Tuterly app gives each student fresh questions on what they got wrong, with a worked solution for every one, aligned to the Victorian Curriculum."
      placement="teacher_resources_hub"
      faqs={[
        { q: "Are these free to use in class?", a: "Yes. Print, copy and share them with your students. Please don't sell them or republish them as your own." },
        { q: "Which textbook do the chapter names follow?", a: "Cambridge Essential Mathematics for the Victorian Curriculum, used in most Victorian schools. The questions are Tuterly's own. Tuterly isn't affiliated with Cambridge University Press." },
        { q: "Can I mix topics from different chapters?", a: "Yes. The Teacher Zone and the printable exam builder both let you tick any topics for a year level." },
      ]}
      faqTitle="Common questions"
      showGuides={false}
      moreTitle="More for teachers"
      links={[
        { href: "/teachers", label: "Teacher Zone: auto-marked tests" },
        { href: PRINTABLE_EXAM_PATH, label: "Printable practice exam builder" },
        { href: "/naplan", label: "NAPLAN numeracy practice tests" },
      ]}
      pageType="CollectionPage"
      heroTool={<TopicFinder years={CHAPTER_YEARS.map((y) => ({ slug: y.slug, label: y.slug === "year-10" ? "Year 10/10A" : y.label }))} chapters={finderData()} />}
    >
      {CHAPTER_YEARS.map((y, i) => (
        <section key={y.slug} id={y.slug} className={`tb-section${i % 2 ? " tb-section--card" : ""}`} aria-labelledby={`h-${y.slug}`}>
          <div className="tb-wrap">
            <h2 id={`h-${y.slug}`} className="tb-h2 pg-h2">All {y.label} chapters</h2>
            <div className="ct-grid">
              {chaptersForYear(y.slug).map((c) => {
                const n = chapterPrintables(c).length;
                return (
                  <Link key={c.slug} href={teacherChapterPath(c)} className="ct-card">
                    <span className="ct-card__t">{c.name}</span>
                    <span className="ct-card__x">{c.sections.length} topics{n ? ` · ${n} printable worksheet${n === 1 ? "" : "s"}` : ""}{chapterMindMap(c) ? " · mind map" : ""} · auto-marked tests</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}
      <section className="tb-section" aria-label="About the chapter names">
        <div className="tb-wrap pg-narrow">
          <p className="pg-small">Chapter names follow Cambridge Essential Mathematics for the Victorian Curriculum. Questions are Tuterly&rsquo;s own. Tuterly isn&rsquo;t affiliated with Cambridge University Press.</p>
        </div>
      </section>
    </GuideShell>
  );
}
