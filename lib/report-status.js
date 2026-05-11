// True if the parent hasn't seen the *current* version of the report.
// `parent_viewed_at` is touched on every parent view (see parent/reports/[id]),
// and `updated_at` is bumped whenever the tutor saves a new version, so a
// regen-after-view cycle correctly re-flags the report as unread.
export function isReportUnreadByParent(report) {
  if (!report) return false;
  if (!report.parent_viewed_at) return true;
  if (!report.updated_at) return false;
  return new Date(report.parent_viewed_at) < new Date(report.updated_at);
}
