"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// Modal wrapping the lesson-plan generation flow. Lives behind a button on
// the per-student Resources panel for tutors. On success the resulting plan
// is auto-saved as a `lesson_plan` resource and we just refresh the page so
// the new row shows up.
export default function LessonPlanModal({
  open,
  onClose,
  student,
}) {
  const router = useRouter();
  const [weeks, setWeeks] = useState(10);
  const [subject, setSubject] = useState(student.subject || "maths");
  const [vceStudyDesign, setVceStudyDesign] = useState(
    (student.subjects && student.subjects[0]) || ""
  );
  const [topics, setTopics] = useState("");
  const [plannerFile, setPlannerFile] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  function closeAndReset() {
    setError(null);
    setPending(false);
    onClose();
  }

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const fd = new FormData();
      fd.set("student_id", student.id);
      fd.set("weeks", String(weeks));
      fd.set("subject", subject);
      if (vceStudyDesign) fd.set("vce_study_design", vceStudyDesign);
      if (topics.trim()) fd.set("topics", topics.trim());
      if (plannerFile) fd.set("planner_file", plannerFile);

      const res = await fetch("/api/lesson-plan", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Could not generate plan.");
      }
      closeAndReset();
      router.refresh();
    } catch (err) {
      setError(err.message || "Could not generate plan.");
    } finally {
      setPending(false);
    }
  }

  const vceOptions = student.subjects || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in-up"
        onClick={pending ? undefined : closeAndReset}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Generate a lesson plan
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Saved as a resource on {student.first_name}&apos;s profile.
            </p>
          </div>
          <button
            type="button"
            onClick={pending ? undefined : closeAndReset}
            disabled={pending}
            aria-label="Close"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:bg-surface-soft hover:text-foreground transition disabled:opacity-50"
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
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Number of weeks
            </span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={weeks}
                onChange={(e) => setWeeks(parseInt(e.target.value, 10))}
                disabled={pending}
                className="flex-1 accent-brand"
              />
              <span className="w-20 text-sm font-mono text-right">
                {weeks} {weeks === 1 ? "week" : "weeks"}
              </span>
            </div>
            <span className="block text-[11px] text-muted">
              Tutoring is once a week. Default is 1 term (10 weeks); up to 4
              terms (40 weeks).
            </span>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Subject
              </span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={pending}
                className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
              >
                <option value="maths">Maths</option>
                <option value="english">English</option>
              </select>
            </label>
            {vceOptions.length > 0 && subject === "maths" && (
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  VCE study design
                </span>
                <select
                  value={vceStudyDesign}
                  onChange={(e) => setVceStudyDesign(e.target.value)}
                  disabled={pending}
                  className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                >
                  <option value="">— Use year level —</option>
                  {vceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              School term planner (optional)
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.md"
              onChange={(e) => setPlannerFile(e.target.files?.[0] || null)}
              disabled={pending}
              className="block w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-brand-pale file:text-brand-foreground file:text-xs file:font-medium hover:file:bg-brand-pale/80 transition"
            />
            <span className="block text-[11px] text-muted">
              PDF or text. If supplied, the plan mirrors the school&apos;s
              progression.
            </span>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Topics to cover (optional)
            </span>
            <textarea
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              disabled={pending}
              rows={3}
              placeholder="e.g. Quadratic equations, exponentials, trigonometric identities"
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
            <span className="block text-[11px] text-muted">
              Used only if no school planner is uploaded. Leave blank to plan
              from the curriculum.
            </span>
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {pending && (
            <p className="text-xs text-muted bg-brand-pale/40 px-3 py-2 rounded-lg">
              Generating… this can take 20–40 seconds, especially for longer
              plans. Please don&apos;t close the window.
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="submit" variant="primary" disabled={pending}>
              {pending ? "Generating…" : "Generate plan"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={closeAndReset}
              disabled={pending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
