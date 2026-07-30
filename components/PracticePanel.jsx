"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PracticeModal from "@/components/PracticeModal";
import FullTestModal from "@/components/FullTestModal";
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
//
// `hasFullTestAccess` gates the subscriber-only "Full practice test" button:
// it's only rendered for paying/trial families (and always for tutors), so a
// free family never sees the feature at all.
export default function PracticePanel({
  student,
  weakTopics,
  topicGroups,
  topicsBySubject,
  hasFullTestAccess = false,
  // When the parent arrives here from a suggested-practice chip on
  // the dashboard ({ topic, subtopic } via query params), auto-open
  // the modal pre-filled so they can click Generate without picking
  // the topic again.
  initialPracticeTopic,
}) {
  const router = useRouter();
  // Derive the initial open state from the prop so we don't have to
  // run an effect to reopen on chip arrival. The parent forces a fresh
  // component instance per chip click via `key`, so this runs again
  // when the parent navigates between different practice topics.
  const [open, setOpen] = useState(!!initialPracticeTopic?.topic);
  const [fullTestOpen, setFullTestOpen] = useState(false);
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
            {hasFullTestAccess
              ? " Or build a full 25-question practice test on a whole topic, with a separate answer key."
              : ""}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
          >
            New worksheet
          </button>
          {hasFullTestAccess && (
            <button
              type="button"
              onClick={() => setFullTestOpen(true)}
              className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-brand text-brand text-sm font-medium hover:bg-brand-pale/40 transition"
            >
              Full practice test
            </button>
          )}
        </div>
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
        topicsBySubject={topicsBySubject}
        initialTopic={initialPracticeTopic?.topic}
        initialSubtopic={initialPracticeTopic?.subtopic}
        onGenerated={(resource) => {
          setViewing(resource);
          router.refresh();
        }}
      />

      {hasFullTestAccess && (
        <FullTestModal
          open={fullTestOpen}
          onClose={() => setFullTestOpen(false)}
          student={student}
          topicGroups={topicGroups}
          topicsBySubject={topicsBySubject}
          onGenerated={() => {
            router.refresh();
          }}
        />
      )}

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
