import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import EmptyState from "@/components/ui/EmptyState";
import FlaggedQuestionCard from "@/components/FlaggedQuestionCard";
import { enrichFlag } from "@/lib/flag-helpers";

// Tutor-wide follow-up hub. Pulls every unresolved flag across every
// active student and groups by student so the tutor can prep next
// session: open the question, see the worked solution, mark it
// understood once they've walked the kid through it.
//
// "Unresolved" means understood_at IS NULL. Once flipped to understood
// the flag disappears from this view (but is still visible on the
// per-student flagged page).

export default async function TutorFlaggedHub() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: links } = await supabase
    .from("tutor_students")
    .select(
      "students(id, first_name, last_name)"
    )
    .eq("tutor_id", user.id)
    .eq("status", "active");

  const studentsById = new Map();
  for (const l of links ?? []) {
    const st = Array.isArray(l.students) ? l.students[0] : l.students;
    if (st) studentsById.set(st.id, st);
  }
  const studentIds = [...studentsById.keys()];

  let flags = [];
  if (studentIds.length > 0) {
    const { data } = await supabase
      .from("flagged_questions")
      .select(
        "id, student_id, report_id, resource_id, question_number, topic, flagged_at, understood_at, reports(id, content, sessions(id, date)), resources(id, name, content)"
      )
      .in("student_id", studentIds)
      .is("understood_at", null)
      .order("flagged_at", { ascending: false });
    flags = data ?? [];
  }

  // Group by student first, then by topic within each student.
  const byStudent = new Map();
  for (const raw of flags) {
    const enriched = enrichFlag(raw);
    const bucket =
      byStudent.get(raw.student_id) ?? { topics: new Map(), total: 0 };
    const topicKey = enriched.topic || "Other";
    const list = bucket.topics.get(topicKey) ?? [];
    list.push(enriched);
    bucket.topics.set(topicKey, list);
    bucket.total += 1;
    byStudent.set(raw.student_id, bucket);
  }

  const sections = [...byStudent.entries()]
    .map(([studentId, bucket]) => ({
      student: studentsById.get(studentId),
      total: bucket.total,
      topics: [...bucket.topics.entries()],
    }))
    .filter((s) => s.student)
    .sort((a, b) => b.total - a.total);

  const totalFlags = sections.reduce((acc, s) => acc + s.total, 0);

  return (
    <div className="px-4 sm:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <Link
          href="/dashboard/tutor"
          className="text-sm text-muted hover:text-foreground transition"
        >
          ← Dashboard
        </Link>
      </div>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight font-grotesk">
          Needs follow-up
        </h1>
        <p className="text-sm text-muted">
          {totalFlags === 0
            ? "Nothing flagged for follow-up right now."
            : `${totalFlags} question${totalFlags === 1 ? "" : "s"} flagged across ${sections.length} student${sections.length === 1 ? "" : "s"}. Mark each as understood once you've worked through it.`}
        </p>
      </header>

      {sections.length === 0 ? (
        <EmptyState
          title="All clear"
          description="When a student or parent flags a tricky question, it'll show up here grouped by student."
        />
      ) : (
        sections.map(({ student, total, topics }) => (
          <section key={student.id} className="space-y-4">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold tracking-tight font-grotesk">
                  {student.first_name} {student.last_name}{" "}
                  <span className="text-muted font-normal text-sm">
                    ({total} flag{total === 1 ? "" : "s"})
                  </span>
                </h2>
              </div>
              <Link
                href={`/dashboard/tutor/students/${student.id}/flagged`}
                className="text-xs text-brand font-medium hover:underline whitespace-nowrap"
              >
                View student →
              </Link>
            </div>

            {topics.map(([topic, items]) => (
              <div key={topic} className="space-y-3">
                <h3 className="text-[11px] uppercase tracking-wider text-muted font-medium">
                  {topic}{" "}
                  <span className="text-muted/70">
                    ({items.length} flag{items.length === 1 ? "" : "s"})
                  </span>
                </h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id}>
                      <FlaggedQuestionCard
                        flag={item}
                        sourceHref={
                          item.session_id
                            ? `/dashboard/tutor/session/${item.session_id}?flag=${item.question_number}`
                            : item.resource_id
                              ? `/dashboard/tutor/students/${student.id}?resource=${item.resource_id}&flag=${item.question_number}`
                              : null
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
}
