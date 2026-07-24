"use client";

import { useState } from "react";
import Link from "next/link";
import AddChildButton from "@/components/AddChildButton";
import GetMatchedButton from "@/components/GetMatchedButton";

// Post-payment / new-account onboarding card for the parent dashboard.
// Shown when a parent lands here fresh after checkout (?welcome=pack |
// ?welcome=trial) or whenever they have no children yet. Walks them through
// the two things that actually get value flowing: add their child, then either
// get matched with a tutor or generate their first worksheet.
//
// Props:
//   welcomeType   "pack" | "trial" | null (drives the heading/emphasis)
//   hasChildren   whether a student record already exists
//   firstStudentId  id used for the "generate a worksheet" deep link
//   students      minimal student rows for the match modal's child picker
export default function OnboardingWelcome({
  welcomeType = null,
  hasChildren = false,
  firstStudentId = null,
  students = [],
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const heading =
    welcomeType === "pack"
      ? "You're all set — let's get your child started"
      : welcomeType === "trial"
        ? "Welcome to your free trial"
        : "Welcome to Tuterly";

  const subheading =
    welcomeType === "pack"
      ? "Your session credits are ready. Two quick steps and your child is up and running."
      : welcomeType === "trial"
        ? "Your software is unlocked. Add your child and generate their first worksheet in under a minute."
        : "A couple of quick steps to get the most out of Tuterly.";

  // Which step gets the solid/primary treatment.
  const worksheetPrimary = welcomeType === "trial";
  const matchPrimary = hasChildren && !worksheetPrimary;

  const worksheetHref = firstStudentId
    ? `/dashboard/parent/students/${firstStudentId}`
    : null;

  return (
    <div className="relative rounded-3xl border border-brand/20 bg-gradient-to-br from-brand-pale/50 to-card p-6 sm:p-7 mb-8">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:bg-surface-soft hover:text-foreground transition"
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

      <p className="text-[11px] uppercase tracking-wider text-brand font-semibold">
        Getting started
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight font-grotesk mt-1">
        {heading}
      </h2>
      <p className="text-sm text-muted mt-1.5 max-w-xl">{subheading}</p>

      <ol className="mt-6 space-y-4">
        {/* STEP 1 — Add your child */}
        <Step
          index={1}
          done={hasChildren}
          title="Add your child"
          description="Sets up their record so worksheets, lesson plans and reports are all in one place."
        >
          {!hasChildren && (
            <AddChildButton variant="primary" label="Add your child" />
          )}
        </Step>

        {/* STEP 2 — Get matched with a tutor */}
        <Step
          index={2}
          title="Get matched with a tutor"
          description="We'll pair your child with a high-achieving tutor and email you to arrange a first session."
        >
          <GetMatchedButton
            students={students}
            variant={matchPrimary ? "primary" : "secondary"}
          />
        </Step>

        {/* STEP 3 — Generate a worksheet */}
        <Step
          index={3}
          title="Generate their first worksheet"
          description="Instant, curriculum-aligned practice with worked solutions — as many as you like."
          locked={!hasChildren}
          lockedHint="Add your child first"
        >
          {hasChildren && worksheetHref && (
            <Link
              href={worksheetHref}
              className={
                worksheetPrimary
                  ? "inline-flex items-center gap-2 px-5 h-11 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
                  : "inline-flex items-center gap-2 px-4 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:border-brand/40 hover:bg-brand-pale/30 transition"
              }
            >
              Generate a worksheet
            </Link>
          )}
        </Step>
      </ol>
    </div>
  );
}

function Step({ index, title, description, done, locked, lockedHint, children }) {
  return (
    <li className="flex items-start gap-3.5">
      <span
        className={
          "mt-0.5 h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold " +
          (done
            ? "bg-brand text-white"
            : locked
              ? "bg-surface-soft text-muted border border-zinc-200 dark:border-zinc-800"
              : "bg-foreground text-background")
        }
      >
        {done ? (
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
        ) : (
          index
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className={
              "font-medium " +
              (done ? "text-muted line-through decoration-1" : "")
            }
          >
            {title}
          </p>
          {done && (
            <span className="text-[11px] font-medium text-brand">Done</span>
          )}
        </div>
        <p className="text-sm text-muted mt-0.5">{description}</p>
        {children && <div className="mt-2.5">{children}</div>}
        {locked && (
          <p className="text-xs text-muted mt-2 italic">{lockedHint}</p>
        )}
      </div>
    </li>
  );
}
