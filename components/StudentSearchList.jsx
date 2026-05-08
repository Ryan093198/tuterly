"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function StudentSearchList({ students }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => {
      const haystack = [
        s.first_name,
        s.last_name,
        `${s.first_name} ${s.last_name}`,
        s.school,
        s.year_level,
        s.working_level,
        ...(s.subjects ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [students, query]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
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
          placeholder="Search by name, school, or year level…"
          className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          aria-label="Search students"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-6 text-center">
          No students match "{query}".
        </p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <li key={s.id}>
              <Link
                href={`/dashboard/tutor/students/${s.id}`}
                className="group block h-full"
              >
                <Card className="h-full p-5 transition group-hover:border-brand/40 group-hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <Avatar name={`${s.first_name} ${s.last_name}`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold tracking-tight truncate">
                        {s.first_name} {s.last_name}
                      </div>
                      <div className="text-xs text-muted truncate mt-0.5">
                        {s.year_level}
                        {s.working_level && s.working_level !== s.year_level
                          ? ` · ${s.working_level}`
                          : ""}
                        {s.school ? ` · ${s.school}` : ""}
                      </div>
                    </div>
                  </div>
                  {s.subjects?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {s.subjects.map((subj) => (
                        <Badge key={subj} tone="brand">
                          {subj}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Avatar({ name }) {
  const initials = (name || "?")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="h-10 w-10 shrink-0 rounded-full bg-brand-pale text-brand-foreground flex items-center justify-center text-sm font-semibold">
      {initials}
    </div>
  );
}
