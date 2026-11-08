import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import { CHAPTER_YEARS, chaptersForYear } from "@/lib/chapter-pages";
import { teacherChapterPath, chapterPrintables, chapterMindMap, PRINTABLE_EXAM_PATH } from "@/lib/teacher-resources";
import "@/components/maths/maths.css";
import "@/components/paper/paper.css";

// Hub for the teacher chapter pages (Ryan, 8 Nov 2026).
const PATH = "/teachers/resources";
const TITLE = "Free Maths Teaching Resources, Years 7 to 10: Worksheets and Tests | Tuterly";
const DESCRIPTION =
  "Free maths teaching resources for every Years 7 to 10 chapter: printable worksheets and topic tests with answers, printable exams, and auto-marked tests to share with your class. Victorian Curriculum.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "website" });

export default function TeacherResourcesHub() {
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "For teachers", path: "/teachers" }, { name: "Teaching resources", path: PATH }]}
      eyebrow="For teachers · Years 7 to 10"
      h1="Free maths teaching resources, Years 7 to 10"
      lead="Pick a year and chapter for printable worksheets and topic tests with answers, a revision mind map, a printable exam, or an auto-marked test you can share with your class."
      quickAnswer="Every chapter from Year 7 to Year 10 (and 10A) has its own page, named the same way as the textbook most Victorian schools use, with free printables and a one-click auto-marked test."
      toc={CHAPTER_YEARS.map((y) => [y.slug, y.label])}
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
    >
      {CHAPTER_YEARS.map((y, i) => (
        <section key={y.slug} id={y.slug} className={`tb-section${i % 2 ? " tb-section--card" : ""}`} aria-labelledby={`h-${y.slug}`}>
          <div className="tb-wrap">
            <h2 id={`h-${y.slug}`} className="tb-h2 pg-h2">{y.label} teaching resources</h2>
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
