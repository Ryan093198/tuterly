"use client";

import { useEffect } from "react";
import MarkdownReport from "@/components/MarkdownReport";
import { CATEGORY_LABEL } from "@/components/ResourcesPanel";

// Modal that renders the inline `content` of a resource as Markdown. Used
// for resources that don't have a downloadable file (lesson plans, pasted
// textbook contents, etc.) — these previously had no way to be opened from
// the resource list.
export default function ResourceViewer({ open, onClose, resource }) {
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
            <MarkdownReport content={resource.content} />
          ) : (
            <p className="text-sm text-muted">
              This resource has no inline content to display.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
