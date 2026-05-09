"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  uploaderLabel,
} from "@/components/ResourcesPanel";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";
import ResourceViewer from "@/components/ResourceViewer";

export default function TutorResourcesIndex({
  resources,
  students,
  currentUserId,
}) {
  const [q, setQ] = useState("");
  const [studentId, setStudentId] = useState("all");
  const [category, setCategory] = useState("all");
  const [yearLevel, setYearLevel] = useState("all");
  const [school, setSchool] = useState("all");
  const [viewing, setViewing] = useState(null);

  const yearLevels = useMemo(
    () =>
      [...new Set(students.map((s) => s.year_level).filter(Boolean))].sort(),
    [students]
  );
  const schools = useMemo(
    () => [...new Set(students.map((s) => s.school).filter(Boolean))].sort(),
    [students]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return resources.filter((r) => {
      if (studentId !== "all" && r.student?.id !== studentId) return false;
      if (category !== "all" && r.category !== category) return false;
      if (yearLevel !== "all" && r.student?.year_level !== yearLevel)
        return false;
      if (school !== "all" && r.student?.school !== school) return false;
      if (needle) {
        const hay = [
          r.name,
          r.notes,
          r.student?.first_name,
          r.student?.last_name,
          CATEGORY_LABEL[r.category],
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [resources, q, studentId, category, yearLevel, school]);

  const filtersActive =
    q ||
    studentId !== "all" ||
    category !== "all" ||
    yearLevel !== "all" ||
    school !== "all";

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="relative">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by file name, notes, or student…"
            className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          />
          <SearchIcon />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <FilterSelect
            label="Student"
            value={studentId}
            onChange={setStudentId}
            options={[
              { id: "all", label: "All students" },
              ...students.map((s) => ({
                id: s.id,
                label: `${s.first_name} ${s.last_name}`,
              })),
            ]}
          />
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={[
              { id: "all", label: "All categories" },
              ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
            ]}
          />
          <FilterSelect
            label="Year"
            value={yearLevel}
            onChange={setYearLevel}
            disabled={yearLevels.length === 0}
            options={[
              { id: "all", label: "All years" },
              ...yearLevels.map((y) => ({ id: y, label: y })),
            ]}
          />
          <FilterSelect
            label="School"
            value={school}
            onChange={setSchool}
            disabled={schools.length === 0}
            options={[
              { id: "all", label: "All schools" },
              ...schools.map((s) => ({ id: s, label: s })),
            ]}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {filtered.length} of {resources.length}{" "}
          {resources.length === 1 ? "resource" : "resources"}
        </span>
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setStudentId("all");
              setCategory("all");
              setYearLevel("all");
              setSchool("all");
            }}
            className="hover:text-foreground transition"
          >
            Clear filters
          </button>
        )}
      </div>

      {resources.length === 0 ? (
        <EmptyState
          title="No resources yet"
          description="Resources you, your students, or their parents upload will appear here."
        />
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-sm text-muted">
            No resources match the current filters.
          </p>
        </Card>
      ) : (
        <ul className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card divide-y divide-zinc-100 dark:divide-zinc-900 overflow-hidden">
          {filtered.map((r) => (
            <ResourceRow
              key={r.id}
              resource={r}
              currentUserId={currentUserId}
              onView={() => setViewing(r)}
            />
          ))}
        </ul>
      )}

      <ResourceViewer
        open={!!viewing}
        onClose={() => setViewing(null)}
        resource={viewing}
      />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, disabled }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-10 px-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition disabled:opacity-50"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResourceRow({ resource, currentUserId, onView }) {
  const meta = [
    resource.student
      ? `${resource.student.first_name} ${resource.student.last_name}`
      : null,
    resource.student?.year_level,
    resource.student?.school,
  ].filter(Boolean);
  const by = uploaderLabel(resource.uploader, currentUserId);

  return (
    <li className="px-4 py-3 hover:bg-surface-soft transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {resource.signed_url ? (
              <a
                href={resource.signed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium truncate hover:text-brand transition"
              >
                {resource.name}
              </a>
            ) : resource.content && onView ? (
              <button
                type="button"
                onClick={onView}
                className="text-sm font-medium truncate hover:text-brand transition text-left"
              >
                {resource.name}
              </button>
            ) : (
              <span className="text-sm font-medium truncate">{resource.name}</span>
            )}
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-surface-soft text-muted font-medium border border-zinc-200 dark:border-zinc-800">
              {CATEGORY_LABEL[resource.category] ?? resource.category}
            </span>
            {!resource.file_url && (
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-brand-pale text-brand-foreground font-medium">
                Pasted
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-1 text-xs text-muted">
            {resource.student ? (
              <Link
                href={`/dashboard/tutor/students/${resource.student.id}`}
                className="hover:text-brand transition"
              >
                {resource.student.first_name} {resource.student.last_name}
              </Link>
            ) : null}
            {meta.slice(1).map((m, i) => (
              <span key={i}>· {m}</span>
            ))}
            {by && <span>· {by}</span>}
          </div>
          {resource.notes && (
            <p className="text-xs text-muted mt-1 leading-snug">
              {resource.notes}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

function SearchIcon() {
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
      aria-hidden="true"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
