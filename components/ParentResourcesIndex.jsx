"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PracticeModal from "@/components/PracticeModal";
import LessonPlanModal from "@/components/LessonPlanModal";
import ResourceViewer from "@/components/ResourceViewer";
import EmptyState from "@/components/ui/EmptyState";
import { CATEGORY_LABEL } from "@/components/ResourcesPanel";
import {
  buildPracticeFlagOptions,
  regeneratePractice,
} from "@/lib/practice-client";

// Aggregated resources view for the parent dashboard. Groups all the
// parent's students into collapsible sections so a parent with multiple
// kids isn't presented with one giant flat list. Each section has its
// own "New worksheet" and "New lesson plan" buttons that open the
// existing generator modals pre-filled with that student's context.
//
// Lives at /dashboard/parent/resources. The per-student page still
// embeds PracticePanel + ResourcesPanel for deep-dive views — this is
// the parent's home base for "what do I have, and let me make more".
export default function ParentResourcesIndex({ kids }) {
  const router = useRouter();
  const [practiceFor, setPracticeFor] = useState(null);
  const [lessonPlanFor, setLessonPlanFor] = useState(null);
  const [viewing, setViewing] = useState(null);

  if (!kids || kids.length === 0) {
    return (
      <EmptyState
        title="No children on your account yet"
        description="Add a child from the My children tab to start saving lesson plans and practice worksheets here."
      />
    );
  }

  return (
    <div className="space-y-10">
      {kids.map((kid) => (
        <section key={kid.student.id} className="space-y-4">
          <header className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                {kid.student.first_name} {kid.student.last_name}
              </h2>
              <p className="text-xs text-muted mt-0.5">
                {kid.student.working_level || kid.student.year_level} ·{" "}
                {kid.student.subject === "english" ? "English" : "Maths"} ·{" "}
                {kid.resources.length}{" "}
                {kid.resources.length === 1 ? "resource" : "resources"}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setPracticeFor(kid)}
                className="inline-flex items-center gap-2 px-3 h-9 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition"
              >
                New worksheet
              </button>
              <button
                type="button"
                onClick={() => setLessonPlanFor(kid)}
                className="inline-flex items-center gap-2 px-3 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:border-brand/40 hover:bg-brand-pale/30 transition"
              >
                New lesson plan
              </button>
            </div>
          </header>

          {kid.resources.length === 0 ? (
            <p className="text-sm text-muted bg-surface-soft border border-zinc-100 dark:border-zinc-900 rounded-xl px-4 py-3">
              No resources yet for {kid.student.first_name}. Generate a
              worksheet or lesson plan to get started.
            </p>
          ) : (
            <ul className="space-y-2">
              {kid.resources.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setViewing(r)}
                    className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card hover:border-brand/40 hover:bg-brand-pale/20 transition"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-[11px] text-muted mt-0.5">
                        {CATEGORY_LABEL[r.category] ?? r.category}
                        {r.notes ? ` · ${r.notes}` : ""}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <PracticeModal
        open={!!practiceFor}
        onClose={() => setPracticeFor(null)}
        student={practiceFor?.student}
        weakTopics={practiceFor?.weakTopics ?? []}
        topicGroups={practiceFor?.topicGroups ?? []}
        onGenerated={(resource) => {
          setViewing(resource);
          router.refresh();
        }}
      />

      <LessonPlanModal
        open={!!lessonPlanFor}
        onClose={() => setLessonPlanFor(null)}
        student={lessonPlanFor?.student}
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
                const fresh = await regeneratePractice(
                  viewing,
                  viewing.student_id
                );
                setViewing(fresh);
                router.refresh();
              }
            : null
        }
      />
    </div>
  );
}
