"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PracticeModal from "@/components/PracticeModal";
import ResourceViewer from "@/components/ResourceViewer";
import {
  buildPracticeFlagOptions,
  regeneratePractice,
} from "@/lib/practice-client";

// Small entry card on the parent's per-child page. The actual generation
// flow lives in PracticeModal; the card just sells the feature and surfaces
// the kid's weak spots so the parent has a reason to click.
//
// Generated worksheets are stored as `practice_questions` resources, so they
// also appear in the Resources panel below — no need to duplicate that list
// here.
export default function PracticePanel({ student, weakTopics, topicGroups }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState(null);

  const hasWeak = weakTopics && weakTopics.length > 0;

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-5 sm:p-6 space-y-4">
      <div className="flex items-start gap-4 flex-wrap">
        <div className="h-10 w-10 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 5h8a2 2 0 0 1 2 2v13H9z" />
            <path d="M9 5a2 2 0 0 0-2 2v13" />
            <path d="M12 10h4M12 13h4M12 16h3" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold tracking-tight">
            Practice between sessions
          </h3>
          <p className="text-sm text-muted mt-1">
            Generate a printable worksheet on a topic{" "}
            {student.first_name} is working on. Up to 5 worksheets per day.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
        >
          New worksheet
        </button>
      </div>

      {hasWeak && (
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-muted font-medium">
            Suggested topics
          </p>
          <ul className="flex flex-wrap gap-2">
            {weakTopics.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="text-xs px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-brand/40 hover:bg-brand-pale/30 transition"
                  title={
                    s.source === "flag"
                      ? "From a question they flagged for help"
                      : `Last rated ${confidenceText(s.confidence)}`
                  }
                >
                  {s.subtopic || s.topic}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PracticeModal
        open={open}
        onClose={() => setOpen(false)}
        student={student}
        weakTopics={weakTopics}
        topicGroups={topicGroups}
        onGenerated={(resource) => {
          setViewing(resource);
          router.refresh();
        }}
      />

      <ResourceViewer
        key={viewing?.id || "none"}
        open={!!viewing}
        onClose={() => setViewing(null)}
        resource={viewing}
        flagOptions={buildPracticeFlagOptions(viewing)}
        onRegenerate={
          viewing?.category === "practice_questions"
            ? async () => {
                const fresh = await regeneratePractice(viewing, student.id);
                setViewing(fresh);
                router.refresh();
              }
            : null
        }
      />
    </div>
  );
}

const CONFIDENCE_TEXT = {
  1: "struggling",
  2: "needs work",
  3: "developing",
  4: "confident",
  5: "mastered",
};

function confidenceText(c) {
  return CONFIDENCE_TEXT[c] || "weak";
}
