"use client";

import { useEffect, useState } from "react";
import MarkdownReport from "@/components/MarkdownReport";
import { CATEGORY_LABEL } from "@/components/ResourcesPanel";
import { emailLessonPlanToParent } from "@/app/dashboard/lesson-plan-actions";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { splitFullTest, ANSWER_KEY_SENTINEL } from "@/lib/full-test-split";
import { downloadFullTestPdf } from "@/lib/full-test-client";

// Modal that renders the inline `content` of a resource as Markdown. Used
// for resources that don't have a downloadable file (lesson plans, pasted
// textbook contents, etc.) — these previously had no way to be opened from
// the resource list.
//
// flagOptions / onRegenerate are practice-worksheet specific:
//   - flagOptions: { resourceId, topic, flaggedSet } — passed straight to
//     MarkdownReport so every <details> block gets a flag button.
//   - onRegenerate: async () => void — when present, a "Regenerate
//     questions" button is shown in the footer; the parent owns the API
//     call and the post-success swap.
export default function ResourceViewer({
  open,
  onClose,
  resource,
  canEmailToParent = false,
  flagOptions = null,
  onRegenerate = null,
  // Question number to scroll to once the modal mounts — only honoured for
  // the resource the deep link points at, the parent panel clears it when
  // the user opens a different resource.
  autoFlag = null,
}) {
  const [emailing, setEmailing] = useState(false);
  const [emailMsg, setEmailMsg] = useState(null);
  const [regenerating, setRegenerating] = useState(false);
  const [regenError, setRegenError] = useState(null);
  const [downloadingPart, setDownloadingPart] = useState(null);
  const [downloadError, setDownloadError] = useState(null);

  async function handleDownloadTestPart(part) {
    if (!resource?.content) return;
    setDownloadError(null);
    setDownloadingPart(part);
    try {
      const { test, answers } = splitFullTest(resource.content);
      await downloadFullTestPdf({
        content: part === "answers" ? answers : test,
        part,
        studentName: "",
        yearLevel: resource?.metadata?.level || "",
        topicLabel: resource?.metadata?.topic_label || "",
      });
    } catch (e) {
      setDownloadError(e?.message || "Could not download the PDF.");
    } finally {
      setDownloadingPart(null);
    }
  }

  async function handleEmail() {
    if (!resource) return;
    setEmailing(true);
    setEmailMsg(null);
    try {
      const fd = new FormData();
      fd.set("resource_id", resource.id);
      const res = await emailLessonPlanToParent(fd);
      setEmailMsg({
        ok: true,
        text: `Sent to ${res?.recipientEmail || "parent"}.`,
      });
    } catch (e) {
      setEmailMsg({ ok: false, text: e?.message || "Could not send email." });
    } finally {
      setEmailing(false);
    }
  }

  async function handleRegenerate() {
    if (!onRegenerate) return;
    setRegenError(null);
    setRegenerating(true);
    try {
      await onRegenerate();
    } catch (e) {
      setRegenError(e?.message || "Couldn't regenerate.");
    } finally {
      setRegenerating(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !autoFlag) return;
    // The modal mounts MarkdownReport synchronously, but layout still needs a
    // tick before scrollIntoView lands on the right element — defer one frame.
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(`question-${autoFlag}`);
      if (!el) return;
      if (el.tagName === "DETAILS") el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [open, autoFlag, resource?.id]);

  // (Reset of email state across opens is handled by the parent passing a
  // fresh `key` per resource — see ResourcesPanel.)

  if (!open || !resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in-up"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-3xl bg-card rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-h-[90vh] flex flex-col animate-fade-in-up">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted font-medium">
              {CATEGORY_LABEL[resource.category] ?? resource.category}
            </p>
            <h2 className="text-base font-semibold tracking-tight truncate mt-0.5">
              {resource.name}
            </h2>
            {resource.notes && (
              <p className="text-xs text-muted mt-1 leading-snug">
                {resource.notes}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-muted hover:bg-surface-soft hover:text-foreground transition"
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
        <div className="overflow-y-auto px-6 py-5">
          {resource.content ? (
            <MarkdownReport
              content={resource.content}
              flagOptions={flagOptions}
            />
          ) : (
            <p className="text-sm text-muted">
              This resource has no inline content to display.
            </p>
          )}
        </div>

        {onRegenerate && (
          <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center gap-3 flex-wrap bg-surface-soft/50">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={regenerating}
            >
              {regenerating && <Spinner />}
              {regenerating ? "Regenerating…" : "Regenerate questions"}
            </Button>
            <span className="text-xs text-muted">
              {regenError ? (
                <span className="text-red-600">{regenError}</span>
              ) : (
                "Same topic, fresh questions. Counts toward your daily limit."
              )}
            </span>
          </div>
        )}

        {resource.category === "practice_test" && (
          <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center gap-3 flex-wrap bg-surface-soft/50">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => handleDownloadTestPart("test")}
              disabled={downloadingPart !== null}
            >
              {downloadingPart === "test" && <Spinner />}
              {downloadingPart === "test" ? "Preparing…" : "Download test (PDF)"}
            </Button>
            {(resource.content || "").includes(ANSWER_KEY_SENTINEL) && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDownloadTestPart("answers")}
                disabled={downloadingPart !== null}
              >
                {downloadingPart === "answers" && <Spinner />}
                {downloadingPart === "answers" ? "Preparing…" : "Download answer key (PDF)"}
              </Button>
            )}
            <span className="text-xs text-muted">
              {downloadError ? (
                <span className="text-red-600">{downloadError}</span>
              ) : (
                "Test for the student, answer key for marking."
              )}
            </span>
          </div>
        )}

        {canEmailToParent && resource.category === "lesson_plan" && (
          <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center gap-3 flex-wrap bg-surface-soft/50">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleEmail}
              disabled={emailing}
            >
              {emailing ? "Sending…" : "Email PDF to parent"}
            </Button>
            {emailMsg && (
              <span
                className={`text-xs ${
                  emailMsg.ok ? "text-green-700 dark:text-green-400" : "text-red-600"
                }`}
              >
                {emailMsg.text}
              </span>
            )}
            {!emailMsg && (
              <span className="text-xs text-muted">
                Sends a PDF to the linked parent with a link back to this plan.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
