"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createMyChild } from "@/app/dashboard/parent/student-actions";
import SchoolAutocomplete from "@/components/SchoolAutocomplete";

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

// "Add child" button + modal for the parent dashboard. Lets a parent
// set up their own student record before any tutor has invited them,
// so they can start using the worksheet + lesson plan generators
// straight away. Submission goes through the createMyChild server
// action which writes to students with parent_id = auth.uid().
//
// `variant`:
//   "primary" — solid black pill (used in the empty-state hero)
//   "secondary" — outline pill (used next to the page header)
export default function AddChildButton({ variant = "secondary", label = "Add child" }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [, startSubmit] = useTransition();
  const [pending, setPending] = useState(false);

  // Lock body scroll while the modal is open.
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
  }

  function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    startSubmit(async () => {
      try {
        const result = await createMyChild(fd);
        if (result?.error) {
          setError(result.error);
          return;
        }
        setOpen(false);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Could not add child.");
      } finally {
        setPending(false);
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === "primary"
            ? "inline-flex items-center gap-2 px-5 h-11 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
            : "inline-flex items-center gap-2 px-4 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:border-brand/40 hover:bg-brand-pale/30 transition"
        }
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/50 animate-fade-in-up" aria-hidden="true" />
          <form
            onSubmit={onSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto animate-fade-in-up"
          >
            <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-900 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Add your child
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  We&apos;ll set up their resource library and unlock the
                  worksheet + lesson plan generators.
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
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name">
                  <input
                    name="first_name"
                    type="text"
                    required
                    autoFocus
                    disabled={pending}
                    className={inputClass}
                  />
                </Field>
                <Field label="Last name">
                  <input
                    name="last_name"
                    type="text"
                    required
                    disabled={pending}
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Year level">
                  <select
                    name="year_level"
                    required
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
                <Field label="Main subject">
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
              {/* Same ACARA-backed school typeahead the tutor flow uses, so
                  the school field stays consistent across both create paths
                  and a parent's typed value matches what tutors search. */}
              <SchoolAutocomplete
                name="school"
                label="School (optional)"
                placeholder="Start typing a school name…"
                inputHeight="h-10"
              />
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
                  {pending ? "Adding…" : "Add child"}
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
