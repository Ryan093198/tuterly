import Link from "next/link";
import { timingSafeEqual } from "node:crypto";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import AppCtaBand from "@/components/study/AppCtaBand";
import MathMd from "@/components/maths/MathMd";
import PrintButton from "@/components/paper/PrintButton";
import { loadPaper, paperPath } from "@/lib/teacher-papers";
import "@/components/state/state-hub.css";
import "@/components/exam/exam.css";
import "@/components/paper/paper.css";

// /paper/[id]/solutions/[token]: answers and worked solutions for a
// Teacher Zone paper. The token is separate from the paper id, so the
// student link doesn't lead to the answers. Not indexed.
export const dynamic = "force-dynamic";
export const metadata = { title: "Answers and worked solutions | Tuterly", robots: { index: false, follow: false } };

function tokenOk(a, b) {
  const x = Buffer.from(String(a || "")), y = Buffer.from(String(b || ""));
  return x.length === y.length && timingSafeEqual(x, y);
}

export default async function SolutionsPage({ params }) {
  const { id, token } = await params;
  const row = await loadPaper(id);
  const ok = row && tokenOk(row.solutions_token, token);
  const qs = ok ? row.paper.sections.flatMap((s) => s.questions) : [];
  return (
    <div className="sh">
      <MarketingNav />
      <header className="sh-hero pp-hero">
        <p className="sh-eyebrow">{ok ? `${row.year_level} maths · Answers and worked solutions` : "Answers"}</p>
        <h1>{ok ? row.title : "We couldn’t find these answers"}</h1>
        {ok ? (
          <>
            <p className="sh-lead"><strong>Topics:</strong> {row.topics.join(", ")}</p>
            <p className="pp-meta">{row.question_count} questions · {row.total_marks} marks · about {row.minutes} minutes</p>
            <div className="pp-hero__btns">
              <Link href={paperPath(row.id)} className="tb-btn tb-btn--secondary">Open the student paper</Link>
              <PrintButton />
            </div>
          </>
        ) : (
          <p className="sh-lead">Check the link, or ask whoever sent it for a new one.</p>
        )}
      </header>
      {ok && (
        <main className="sh-wrap pp-sols">
          <ol className="pp-sol-list">
            {qs.map((q) => (
              <li key={q.n} className="pp-sol">
                <div className="eg-q__head">
                  <span className="eg-q__n">Question {q.n}</span>
                  <span className="eg-q__marks">{q.marks} mark{q.marks === 1 ? "" : "s"}</span>
                </div>
                <p className="pp-sol__topic">{q.topic}</p>
                <MathMd md={q.question} />
                <div className="pp-sol__ans"><strong>Answer:</strong> <MathMd md={q.answer} /></div>
                {q.solution ? (
                  <div className="pp-sol__work">
                    <p className="pp-sol__label">Worked solution</p>
                    <MathMd md={q.solution} />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="pp-teacher">
            <p className="pp-teacher__t">Teachers: build your own auto-marked papers</p>
            <p>Pick a year and the topics, share one link with your class, and every student gets their mark and worked solutions as soon as they finish. Free, up to 5 papers a day.</p>
            <Link href="/teachers#teacher-zone" className="tb-btn tb-btn--primary">Open the Teacher Zone</Link>
          </div>
        </main>
      )}
      <AppCtaBand placement="paper_solutions" title="Unlimited practice on every topic, Years 7 to 10." lead="Tuterly writes fresh questions on whatever a student got wrong, with a worked solution for each one, all aligned to the Victorian Curriculum." />
      <MarketingFooter />
    </div>
  );
}
