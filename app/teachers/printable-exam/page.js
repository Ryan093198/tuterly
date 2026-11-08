import Link from "next/link";
import GuideShell from "@/components/parent-guides/GuideShell";
import { pageMetadata } from "@/lib/parent-guides";
import ExamGenerator from "@/components/exam/ExamGenerator";
import { getExamCatalogue } from "@/lib/exam-bank";
import { CLASS_USES, TEACHER_RESOURCES_PATH } from "@/lib/teacher-resources";
import "@/components/exam/exam.css";
import "@/components/paper/paper.css";

// The paper practice exam builder for teachers (moved off /teachers,
// 8 Nov 2026). Same generator as /exam-generator.
const PATH = "/teachers/printable-exam";
const TITLE = "Printable Maths Practice Exam Builder for Teachers, Years 7 to 10 | Tuterly";
const DESCRIPTION =
  "Build a printable Years 7 to 10 maths exam from the topics you've taught, with marks, a suggested time and answers. Free for teachers. Topics follow the textbook most Victorian schools use.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "website" });

export default function PrintableExamPage() {
  const catalogue = getExamCatalogue();
  return (
    <GuideShell
      path={PATH}
      title={TITLE}
      description={DESCRIPTION}
      crumbs={[{ name: "For teachers", path: "/teachers" }, { name: "Printable practice exam", path: PATH }]}
      eyebrow="For teachers · Printable"
      h1="Build a printable maths practice exam"
      lead="Pick a year and the topics you've taught. You get a printable exam with marks, a suggested time and answers, including the questions that need working or an explanation."
      quickAnswer="Prefer students to sit it online and be marked automatically? Use the Teacher Zone instead: one link, instant marks and worked solutions."
      toc={[["build", "Build an exam"], ["ideas", "Ideas for class"], ["faq", "FAQ"]]}
      ctaTitle="Practice at home for your students"
      ctaText="The Tuterly app gives each student fresh questions on what they got wrong, with a worked solution for every one, aligned to the Victorian Curriculum."
      placement="teacher_printable_exam"
      faqs={[
        { q: "What's the difference between this and the Teacher Zone?", a: "This builds a paper exam you print and mark, and it can include questions that need working or an explanation. The Teacher Zone builds an online test from questions a computer can mark: students open a link, type their answers and see their mark and worked solutions straight away." },
        { q: "Is it free?", a: "Yes. Enter your email once to unlock it." },
        { q: "Can I print it without the answers?", a: "Yes. Print the questions on their own, or with the answers at the end." },
      ]}
      faqTitle="Common questions"
      showGuides={false}
      moreTitle="More for teachers"
      links={[
        { href: "/teachers", label: "Teacher Zone: auto-marked tests" },
        { href: TEACHER_RESOURCES_PATH, label: "Teaching resources for every chapter" },
      ]}
    >
      <section id="build" className="tb-section" aria-label="Exam builder">
        <div className="tb-wrap">
          <ExamGenerator catalogue={catalogue} initialYear="Year 8" placement="teachers_printable_exam" />
        </div>
      </section>
      <section id="ideas" className="tb-section tb-section--card" aria-labelledby="h-ideas">
        <div className="tb-wrap pg-narrow">
          <h2 id="h-ideas" className="tb-h2 pg-h2">Ideas for using it in class</h2>
          <div className="tr-uses">
            {CLASS_USES.map((u) => (
              <div key={u.t}><strong>{u.t}</strong><p>{u.x}</p></div>
            ))}
          </div>
          <p className="pg-small" style={{ marginTop: 14 }}>Looking for a single topic? <Link href={TEACHER_RESOURCES_PATH}>Browse resources by chapter</Link>.</p>
        </div>
      </section>
    </GuideShell>
  );
}
