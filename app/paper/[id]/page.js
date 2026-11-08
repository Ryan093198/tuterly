import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import PaperClient from "@/components/paper/PaperClient";
import { loadPaper, studentPaper, bumpPaper } from "@/lib/teacher-papers";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";
import "@/components/paper/paper.css";

// /paper/[id]: a Teacher Zone paper, shared by a teacher. Students answer
// online and it's marked when they submit. Private link, not indexed.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const row = await loadPaper(id);
  return {
    title: row ? `${row.title} | Tuterly` : "Practice test | Tuterly",
    description: row ? `${row.year_level} maths practice: ${row.question_count} questions, marked as soon as you finish.` : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function PaperPage({ params }) {
  const { id } = await params;
  const row = await loadPaper(id);
  if (row) await bumpPaper(id, "views");
  return (
    <div className="sh">
      <MarketingNav />
      {row ? (
        <PaperClient paper={studentPaper(row)} />
      ) : (
        <header className="sh-hero">
          <p className="sh-eyebrow">Practice test</p>
          <h1>We couldn&rsquo;t find this test</h1>
          <p className="sh-lead">Check the link your teacher sent, or ask them for a new one.</p>
        </header>
      )}
      <AppCtaBand placement="paper_page" title="Unlimited practice on every topic, Years 7 to 10." lead="Tuterly writes fresh questions on whatever you got wrong, with a worked solution for each one, all aligned to the Victorian Curriculum." />
      <MarketingFooter />
    </div>
  );
}
