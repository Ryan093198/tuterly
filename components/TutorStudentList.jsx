"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// Client-side filtered list. The server passes a flat `rows` array
// already shaped for display so this component stays purely
// presentational — no Supabase, no Map lookups.
//
// row = {
//   id, name, meta,
//   hasReport, reportDateLabel,  // for the "Report sent …" suffix
//   submitNotesHref,             // empty-state CTA
//   detailHref,                  // body link to student page
// }
export default function TutorStudentList({ rows }) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!trimmed) return rows;
    return rows.filter((r) => r.name.toLowerCase().includes(trimmed));
  }, [rows, trimmed]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        >
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
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${rows.length} student${rows.length === 1 ? "" : "s"}…`}
          aria-label="Search students"
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card pl-9 pr-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/40 transition"
        />
      </div>

      <ul className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card divide-y divide-zinc-100 dark:divide-zinc-900 max-h-[32rem] overflow-y-auto">
        {filtered.length === 0 ? (
          <li className="px-4 py-6 text-sm text-muted text-center">
            No students match &ldquo;{query}&rdquo;.
          </li>
        ) : (
          filtered.map((r) => (
            <li
              key={r.id}
              className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 hover:bg-surface-soft transition"
            >
              {r.hasReport ? (
                <span
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800"
                />
              )}
              <Link href={r.detailHref} className="min-w-0 flex-1 group">
                <p className="font-medium truncate group-hover:underline">
                  {r.name}
                </p>
                {r.meta && (
                  <p className="text-xs text-muted mt-0.5">{r.meta}</p>
                )}
              </Link>
              {r.hasReport ? (
                <span className="text-xs text-emerald-700 dark:text-emerald-400 whitespace-nowrap hidden sm:inline">
                  Report sent {r.reportDateLabel}
                </span>
              ) : (
                <Link
                  href={r.submitNotesHref}
                  className="text-xs font-medium text-brand whitespace-nowrap hover:underline"
                >
                  Submit notes →
                </Link>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
