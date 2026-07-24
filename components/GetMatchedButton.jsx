"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestTutorMatch } from "@/app/dashboard/parent/match-actions";

const YEAR_LEVELS = [
  "Prep",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
];

// "Get matched with a tutor" button + modal for the parent dashboard.
// Sends a match request to the Tuterly team (via the requestTutorMatch server
// action → team inbox). If the parent has already added children, they can
// pick one; otherwise they enter the child's year level and subject directly.
//
// `variant`:
//   "primary"   — solid pill (onboarding hero)
//   "secondary" — outline pill
export default function GetMatchedButton({
  students = [],
  variant = "secondary",
  label = "Get matched with a tutor",
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [, startSubmit] = useTransition();
  const [pending, setPending] = useState(false);
  const [selectedId, setSelectedId] = useState(students[0]?.id || "");

  const selected = students.find((s) => s.id === selectedId) || null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function close() {
    if (pending) return;
    setOpen(false);
    setError(null);
    // Keep `done` so the button reflects the sent state after closing.
  }

  function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    startSubmit(async () => {
      try {
        const result = await requestTutorMatch(fd);
        if (result?.error) {
          setError(result.error);
          return;
        }
        setDone(true);
        setOpen(false);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Could not send your request.");
      } finally {
        setPending(false);
      }
    });
  }

  const btnClass =
    variant === "primary"
      ? "inline-flex items-center gap-2 px-5 h-11 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
      : "inline-flex items-center gap-2 px-4 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:border-brand/40 hover:bg-brand-pale/30 transition disabled:opacity-60";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={done}
        className={btnClass}
      >
        {done ? (
          <>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Request sent
          </>
        ) : (
          label
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="absolute inset-0 bg-black/50 animate-fade-in-up"
            aria-hidden="true"
          />
          <form
            onSubmit={onSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto animate-fade-in-up"
          >
            <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-900 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Get matched with a tutor
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Tell us a little about your child and we&apos;ll pair them
                  with a high-achieving tutor. We&apos;ll email you to arrange
                  a first session.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                disabled={pending}
                aria-label="Close"
                className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-muted hover:bg-surface-soft hover:text-foreground transition disabled:opacity-50"
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

            <div className="px-6 py-5 space-y-4">
              {students.length > 0 ? (
                <Field label="Which child?">
                  <select
                    name="student_id"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    disabled={pending}
                    className={inputClass}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.first_name} {s.last_name}
                        {s.year_level ? ` · ${s.year_level}` : ""}
                      </option>
                    ))}
                    <option value="">Someone else / not added yet</option>
                  </select>
                </Field>
              ) : null}

              {/* When no existing child is chosen, capture the essentials so the
                  team has something to match on. */}
              {(!selectedId || students.length === 0) && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Year level">
                    <select
                      name="child_year_level"
                      defaultValue="Year 7"
                      disabled={pending}
                      className={inputClass}
                    >
                      {YEAR_LEVELS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Subject">
                    <select
                      name="subject"
                      defaultValue="maths"
                      disabled={pending}
                      className={inputClass}
                    >
                      <option value="maths">Maths</option>
                      <option value="english">English</option>
                    </select>
                  </Field>
                </div>
              )}

              <Field label="Preferred days / times (optional)">
                <input
                  name="availability"
                  type="text"
                  placeholder="e.g. weekday evenings, Sunday mornings"
                  disabled={pending}
                  className={inputClass}
                />
              </Field>

              <Field label="Anything else? (optional)">
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Goals, exams coming up, areas they're finding tricky…"
                  disabled={pending}
                  className={`${inputClass} h-auto py-2 resize-none`}
                />
              </Field>

              {selected && (
                <p className="text-xs text-muted">
                  We&apos;ll match a tutor for{" "}
                  <span className="font-medium text-foreground">
                    {selected.first_name}
                  </span>
                  {selected.year_level ? ` (${selected.year_level})` : ""}.
                </p>
              )}

              {error && (
                <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center justify-center gap-2 px-5 h-10 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                >
                  {pending ? "Sending…" : "Request my match"}
                </button>
                <button
                  type="button"
                  onClick={close}
                  disabled={pending}
                  className="inline-flex items-center px-4 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:bg-surface-soft transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition";
