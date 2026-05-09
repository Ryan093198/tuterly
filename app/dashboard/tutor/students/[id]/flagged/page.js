import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EmptyState from "@/components/ui/EmptyState";
import FlaggedQuestionCard from "@/components/FlaggedQuestionCard";
import { enrichFlag } from "@/lib/flag-helpers";

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
      "id, student_id, report_id, resource_id, question_number, topic, flagged_at, understood_at, reports(id, content, sessions(id, date)), resources(id, name, content)"
    )
    .eq("student_id", id)
    .order("understood_at", { ascending: true, nullsFirst: true })
    .order("flagged_at", { ascending: false });

  const grouped = {};
  for (const raw of flags ?? []) {
    const topic = raw.topic || "Other";
    if (!grouped[topic]) grouped[topic] = [];
    grouped[topic].push(enrichFlag(raw));
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
                  <FlaggedQuestionCard
                    flag={item}
                    sourceHref={
                      item.session_id
                        ? `/dashboard/tutor/session/${item.session_id}`
                        : null
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}


