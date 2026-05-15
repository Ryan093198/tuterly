import Link from "next/link";

const ICON_BY_TYPE = {
  report: ReportIcon,
  flag: FlagIcon,
  worksheet: WorksheetIcon,
  resource: ResourceIcon,
};

const TONE_BY_TYPE = {
  report: "bg-brand-pale text-brand-dark",
  flag: "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-300",
  worksheet:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
  resource:
    "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300",
};

export default function ParentActivityFeed({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card px-5 py-8 text-center">
        <p className="text-sm text-muted">
          No recent activity yet. New reports, flagged questions, and worksheets
          will appear here.
        </p>
      </div>
    );
  }
  return (
    <ul className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card divide-y divide-zinc-100 dark:divide-zinc-900 overflow-hidden">
      {events.map((e) => (
        <li key={e.id}>
          <Link
            href={e.href}
            className="flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4 hover:bg-surface-soft transition"
          >
            <span
              aria-hidden="true"
              className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${TONE_BY_TYPE[e.type] ?? TONE_BY_TYPE.resource}`}
            >
              {(ICON_BY_TYPE[e.type] ?? ResourceIcon)()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium truncate">{e.title}</p>
                {e.unread && (
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-brand-pale text-brand-foreground font-semibold">
                    New
                  </span>
                )}
              </div>
              <p className="text-xs text-muted mt-0.5 truncate">
                {e.studentName}
                {e.meta ? ` · ${e.meta}` : ""}
              </p>
            </div>
            <span className="text-xs text-muted whitespace-nowrap mt-1">
              {timeAgo(e.timestamp)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ReportIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h6" />
    </svg>
  );
}
function FlagIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21V4h12l-2 4 2 4H4" />
    </svg>
  );
}
function WorksheetIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}
function ResourceIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function timeAgo(iso) {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Date.now() - t;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.round(days / 365)}y`;
}
