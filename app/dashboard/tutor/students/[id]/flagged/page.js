import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import MarkdownReport from "@/components/MarkdownReport";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";

export default async function FlaggedQuestionsPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ownership check.
  const { data: link } = await supabase
    .from("tutor_students")
    .select("student_id")
    .eq("tutor_id", user.id)
    .eq("student_id", id)
    .maybeSingle();
  if (!link) notFound();

  const { data: student } = await supabase
    .from("students")
    .select("id, first_name, last_name")
    .eq("id", id)
    .single();
  if (!student) notFound();

  const { data: flags } = await supabase
    .from("flagged_questions")
    .select(
      "id, report_id, question_number, topic, flagged_at, reports(id, content, sessions(id, date))"
    )
    .eq("student_id", id)
    .order("flagged_at", { ascending: false });

  const grouped = {};
  for (const flag of flags ?? []) {
    const topic = flag.topic || "Other";
    if (!grouped[topic]) grouped[topic] = [];
    const extracted = extractQuestion(
      flag.reports?.content ?? "",
      flag.question_number
    );
    grouped[topic].push({
      ...flag,
      question: extracted?.question,
      solution: extracted?.solution,
      session_id: flag.reports?.sessions?.id,
      session_date: flag.reports?.sessions?.date,
    });
  }

  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <Link
          href={`/dashboard/tutor/students/${id}`}
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← {student.first_name} {student.last_name}
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">
          Flagged questions
        </h1>
        <p className="text-sm text-muted mt-1">
          Practice questions {student.first_name} flagged for help, grouped by
          topic.
        </p>
      </div>

      {(flags ?? []).length === 0 ? (
        <EmptyState
          title="Nothing flagged yet"
          description={`${student.first_name} hasn't flagged any practice questions for follow-up.`}
        />
      ) : (
        Object.entries(grouped).map(([topic, items]) => (
          <section key={topic} className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-wider text-muted font-medium">
              {topic}{" "}
              <span className="text-muted/70">
                ({items.length} flag{items.length === 1 ? "" : "s"})
              </span>
            </h2>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id}>
                  <Card className="p-5 sm:p-6 border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10">
                    <div className="flex items-center justify-between mb-3 text-xs text-muted gap-2 flex-wrap">
                      {item.session_id ? (
                        <Link
                          href={`/dashboard/tutor/session/${item.session_id}`}
                          className="hover:text-foreground transition"
                        >
                          {item.session_date
                            ? `Session on ${new Date(
                                item.session_date
                              ).toLocaleDateString("en-AU", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}`
                            : "Session"}
                        </Link>
                      ) : (
                        <span>Session</span>
                      )}
                      <span>flagged {timeAgo(item.flagged_at)}</span>
                    </div>
                    {item.question ? (
                      <MarkdownReport
                        content={`${item.question}\n\n<details><summary>Reveal worked solution</summary>\n\n${item.solution}\n\n</details>`}
                      />
                    ) : (
                      <p className="text-sm text-muted">
                        Question content unavailable (the report may have been
                        regenerated since the flag was set).
                      </p>
                    )}
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

// Extract the Nth question's text + solution from the report markdown.
// Each question follows the pattern:
//   **Question N** [Difficulty]
//   ...question body...
//   <details>...solution...</details>
function extractQuestion(content, n) {
  if (!content || n < 1) return null;
  const detailsRe = /<details[^>]*>([\s\S]*?)<\/details>/g;
  let count = 0;
  let prevEnd = 0;
  let match;
  while ((match = detailsRe.exec(content)) !== null) {
    count++;
    if (count === n) {
      const slice = content.slice(prevEnd, match.index);
      // Trim to the last "**Question" marker so Q1 doesn't grab the whole
      // section preamble.
      const markerIdx = slice.lastIndexOf("**Question");
      const question =
        markerIdx >= 0 ? slice.slice(markerIdx).trim() : slice.trim();
      const solution = match[1]
        .replace(/^\s*<summary>[\s\S]*?<\/summary>\s*/i, "")
        .trim();
      return { question, solution };
    }
    prevEnd = detailsRe.lastIndex;
  }
  return null;
}

function timeAgo(iso) {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
