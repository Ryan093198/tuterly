// True if the parent hasn't seen the *current* version of the report.
// `parent_viewed_at` is touched on every parent view (see parent/reports/[id]),
// and `updated_at` is bumped whenever the tutor saves a new version, so a
// regen-after-view cycle correctly re-flags the report as unread.
export function isReportUnreadByParent(report) {
  return isUnread(report?.parent_viewed_at, report?.updated_at);
}

// Same logic, scoped to the student account. `student_viewed_at` is touched
// on every student view (see student/reports/[id]).
export function isReportUnreadByStudent(report) {
  return isUnread(report?.student_viewed_at, report?.updated_at);
}

function isUnread(viewedAt, updatedAt) {
  if (!updatedAt) return false;
  if (!viewedAt) return true;
  return new Date(viewedAt) < new Date(updatedAt);
}
