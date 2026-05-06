"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendReportToParent } from "@/app/dashboard/tutor/session/actions";
import Button from "@/components/ui/Button";

export default function SendToParentPanel({
  sessionId,
  studentId,
  parentLinked,
  sentAt,
}) {
  const router = useRouter();
  const [pending, startSending] = useTransition();
  const [error, setError] = useState(null);

  function handleSend() {
    setError(null);
    startSending(async () => {
      try {
        await sendReportToParent(sessionId);
        router.refresh();
      } catch (e) {
        setError(e.message);
      }
    });
  }

  if (!parentLinked) {
    return (
      <div className="p-5 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-muted">
        Link a parent on the{" "}
        <Link
          href={`/dashboard/tutor/students/${studentId}`}
          className="underline text-foreground"
        >
          student page
        </Link>{" "}
        before sending the report.
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card flex items-center justify-between gap-3 flex-wrap">
      <div className="text-sm">
        {sentAt ? (
          <>
            <div className="font-medium text-emerald-600 inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Sent to parent
            </div>
            <div className="text-xs text-muted mt-0.5">
              {new Date(sentAt).toLocaleString("en-AU", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>
          </>
        ) : (
          <>
            <div className="font-medium">Ready to send</div>
            <div className="text-xs text-muted mt-0.5">
              The parent will receive an email with a link and PDF copy.
            </div>
          </>
        )}
      </div>
      <Button variant="primary" onClick={handleSend} disabled={pending}>
        {pending ? "Sending…" : sentAt ? "Re-send" : "Send to parent"}
      </Button>
      {error && (
        <p className="text-xs text-red-500 w-full" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
