"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  updateReport,
  sendReportToParent,
} from "@/app/dashboard/tutor/session/actions";
import MarkdownReport from "@/components/MarkdownReport";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

export default function ReportWorkbench({
  sessionId,
  initialContent,
  status,
  parentLinked,
  parentEmail,
}) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent ?? "");
  const [draft, setDraft] = useState(initialContent ?? "");
  const [editing, setEditing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [savingPending, startSaving] = useTransition();
  const [savedAt, setSavedAt] = useState(null);
  const [showSendPrompt, setShowSendPrompt] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const { content: generated } = await res.json();
      setContent(generated);
      setDraft(generated);
      setEditing(false);
      router.refresh();
      if (parentLinked) setShowSendPrompt(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSendNow() {
    setSending(true);
    setError(null);
    try {
      await sendReportToParent(sessionId);
      setShowSendPrompt(false);
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  function handleSave(markReady) {
    startSaving(async () => {
      const fd = new FormData();
      fd.set("session_id", sessionId);
      fd.set("content", draft);
      if (markReady) fd.set("mark_ready", "1");
      await updateReport(fd);
      setContent(draft);
      setEditing(false);
      setSavedAt(new Date());
      router.refresh();
    });
  }

  function handleCancel() {
    setDraft(content);
    setEditing(false);
  }

  if (!content) {
    return (
      <>
        <EmptyState
          icon={<SparklesIcon />}
          title="Generate the report"
          description="Claude turns your dot-point notes — and any photos of the working — into a parent-ready report in seconds."
          action={
            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? "Generating…" : "Generate report"}
            </Button>
          }
        />
        {error && <p className="text-sm text-red-500 mt-3 text-center">{error}</p>}
      </>
    );
  }

  if (editing) {
    return (
      <div className="space-y-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={22}
          className="w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            onClick={() => handleSave(false)}
            disabled={savingPending}
          >
            {savingPending ? "Saving…" : "Save changes"}
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={savingPending}>
            Cancel
          </Button>
          {draft !== content && (
            <span className="text-xs text-muted ml-auto">Unsaved changes</span>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card shadow-sm overflow-hidden">
        <div className="px-6 sm:px-9 py-7 sm:py-9">
          <MarkdownReport content={content} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setDraft(content);
            setEditing(true);
          }}
        >
          Edit
        </Button>
        <Button variant="ghost" onClick={handleGenerate} disabled={generating}>
          {generating ? "Regenerating…" : "Regenerate"}
        </Button>
        {savedAt && (
          <span className="text-xs text-muted ml-auto">
            Saved {savedAt.toLocaleTimeString()}
          </span>
        )}
        {status === "sent_to_parent" && !savedAt && (
          <span className="text-xs text-emerald-600 ml-auto font-medium">
            Emailed to parent
          </span>
        )}
        {status === "report_generated" && !savedAt && (
          <span className="text-xs text-muted ml-auto font-medium">
            Visible to parent
          </span>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {showSendPrompt && (
        <SendPromptDialog
          parentEmail={parentEmail}
          sending={sending}
          onSend={handleSendNow}
          onCancel={() => setShowSendPrompt(false)}
        />
      )}
    </div>
  );
}

function SendPromptDialog({ parentEmail, sending, onSend, onCancel }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up"
      onClick={(e) => {
        if (e.target === e.currentTarget && !sending) onCancel();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 space-y-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-brand-pale text-brand-dark flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 7.5L12 13l9-5.5" />
              <rect x="3" y="5.5" width="18" height="13" rx="2" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold tracking-tight">
              Report generated
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-medium text-foreground">{parentEmail || "The parent"}</span> can already see it in their dashboard. Want to email a PDF copy as well?
            </p>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Button
            variant="primary"
            onClick={onSend}
            disabled={sending}
            className="flex-1"
          >
            {sending ? "Sending…" : "Email now"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={sending}
            className="flex-1"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M19 14l.7 1.8L21.5 16.5l-1.8.7L19 19l-.7-1.8L16.5 16.5l1.8-.7L19 14z" />
    </svg>
  );
}
