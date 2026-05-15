// Build the recent-activity feed shown on the parent dashboard.
//
// Pulls four event sources in parallel and merges them into a single
// chronological stream:
//   - report:    a new report has been generated for a session
//   - flag:      the student or parent flagged a question for follow-up
//   - worksheet: a new AI-generated practice worksheet (category =
//                practice_questions, no file)
//   - resource:  any other resource the tutor added (notes, link, file)
//
// Each event normalises to { id, type, timestamp, studentId,
// studentName, title, meta, href, unread } so the UI can render rows
// without caring which table they came from.

const PER_SOURCE_LIMIT = 25;
const FEED_LIMIT = 30;

export async function fetchParentActivity(supabase, parentId, students) {
  const studentIds = students.map((s) => s.id);
  if (studentIds.length === 0) return [];

  const nameById = new Map(
    students.map((s) => [s.id, displayName(s)])
  );

  const [reportsRes, flagsRes, resourcesRes] = await Promise.all([
    supabase
      .from("reports")
      .select(
        "id, sent_at, parent_viewed_at, updated_at, created_at, sessions(student_id, date)"
      )
      .in("sessions.student_id", studentIds)
      .order("created_at", { ascending: false })
      .limit(PER_SOURCE_LIMIT),
    supabase
      .from("flagged_questions")
      .select(
        "id, student_id, report_id, resource_id, question_number, topic, flagged_at"
      )
      .in("student_id", studentIds)
      .order("flagged_at", { ascending: false })
      .limit(PER_SOURCE_LIMIT),
    supabase
      .from("resources")
      .select(
        "id, student_id, uploaded_by, name, category, file_url, created_at"
      )
      .in("student_id", studentIds)
      .order("created_at", { ascending: false })
      .limit(PER_SOURCE_LIMIT),
  ]);

  const events = [];

  for (const r of reportsRes.data ?? []) {
    const sid = r.sessions?.student_id;
    if (!sid || !nameById.has(sid)) continue;
    const sessionDate = r.sessions?.date;
    events.push({
      id: `report:${r.id}`,
      type: "report",
      timestamp: r.created_at,
      studentId: sid,
      studentName: nameById.get(sid),
      title: "New session report",
      meta: sessionDate ? `Session on ${formatShort(sessionDate)}` : null,
      href: `/dashboard/parent/reports/${r.id}`,
      unread: !r.parent_viewed_at || r.parent_viewed_at < r.updated_at,
    });
  }

  for (const f of flagsRes.data ?? []) {
    if (!nameById.has(f.student_id)) continue;
    const target =
      f.report_id != null
        ? `/dashboard/parent/students/${f.student_id}/flagged`
        : `/dashboard/parent/students/${f.student_id}/flagged`;
    events.push({
      id: `flag:${f.id}`,
      type: "flag",
      timestamp: f.flagged_at,
      studentId: f.student_id,
      studentName: nameById.get(f.student_id),
      title: "Question flagged for follow-up",
      meta: [f.topic || "Practice question", `Q${f.question_number}`]
        .filter(Boolean)
        .join(" · "),
      href: target,
    });
  }

  for (const r of resourcesRes.data ?? []) {
    if (!nameById.has(r.student_id)) continue;
    const isWorksheet = r.category === "practice_questions" && !r.file_url;
    const isParentUpload = r.uploaded_by === parentId;
    if (isParentUpload) continue; // Surfacing tutor activity, not the parent's own uploads.

    events.push({
      id: `resource:${r.id}`,
      type: isWorksheet ? "worksheet" : "resource",
      timestamp: r.created_at,
      studentId: r.student_id,
      studentName: nameById.get(r.student_id),
      title: isWorksheet ? "New practice worksheet" : "New resource added",
      meta: r.name || null,
      href: `/dashboard/parent/students/${r.student_id}`,
    });
  }

  events.sort((a, b) =>
    (b.timestamp || "").localeCompare(a.timestamp || "")
  );
  return events.slice(0, FEED_LIMIT);
}

function displayName(s) {
  return `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim() || "Your child";
}
function formatShort(iso) {
  const d = typeof iso === "string" ? new Date(iso + "T00:00:00") : iso;
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
