import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EmptyState from "@/components/ui/EmptyState";
import FlaggedQuestionCard from "@/components/FlaggedQuestionCard";
import { enrichFlag } from "@/lib/flag-helpers";

export default async function StudentFlaggedQuestions() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: student } = await supabase
    .from("students")
    .select("id, first_name")
    .eq("student_user_id", user.id)
    .maybeSingle();
  if (!student) notFound();

  const { data: flags } = await supabase
    .from("flagged_questions")
    .select(
      "id, student_id, report_id, resource_id, question_number, topic, flagged_at, understood_at, reports(id, content, sessions(id, date)), resources(id, name, content)"
    )
    .eq("student_id", student.id)
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
          href="/dashboard/student"
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← Back to dashboard
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-2">
          Your flagged questions
        </h1>
        <p className="text-sm text-muted mt-1">
          Questions you've flagged for your tutor to revisit, grouped by topic.
        </p>
      </div>

      {(flags ?? []).length === 0 ? (
        <EmptyState
          title="Nothing flagged yet"
          description="When you click 'Flag with your tutor' on a practice question, it'll show up here."
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
                      item.report_id
                        ? `/dashboard/student/reports/${item.report_id}?flag=${item.question_number}`
                        : item.resource_id
                          ? `/dashboard/student?resource=${item.resource_id}&flag=${item.question_number}`
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


