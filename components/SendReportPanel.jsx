"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendReport } from "@/app/dashboard/tutor/session/actions";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export default function SendReportPanel({
  sessionId,
  studentId,
  parent,
  student,
}) {
  return (
    <div className="space-y-3">
      <RecipientRow
        sessionId={sessionId}
        studentId={studentId}
        role="parent"
        recipient={parent}
      />
      <RecipientRow
        sessionId={sessionId}
        studentId={studentId}
        role="student"
        recipient={student}
      />
    </div>
  );
}

const ROLE_COPY = {
  parent: {
    inviteCta: "Invite a parent",
    initialEmptyHint:
      "The parent can already see this report in their dashboard.",
    initialEmptyTrailing: "to also email them a PDF copy.",
    initialHeading: "Email a PDF copy to the parent",
    initialButton: "Email parent now",
    resendButton: "Re-send to parent",
    linkedSuffix: ", they can already see this report in their dashboard.",
    pendingSuffix:
      ": invite hasn't been accepted yet, but the PDF will still arrive.",
  },
  student: {
    inviteCta: "Invite the student",
    initialEmptyHint:
      "Invite the student to give them their own dashboard,",
    initialEmptyTrailing: "or to email them a PDF copy of this report.",
    initialHeading: "Email a PDF copy to the student",
    initialButton: "Email student now",
    resendButton: "Re-send to student",
    linkedSuffix: ", they can already see this report in their dashboard.",
    pendingSuffix:
      ": invite hasn't been accepted yet, but the PDF will still arrive.",
  },
};

function RecipientRow({ sessionId, studentId, role, recipient }) {
  const router = useRouter();
  const [pending, startSending] = useTransition();
  const [error, setError] = useState(null);
  const copy = ROLE_COPY[role];

  function handleSend() {
    setError(null);
    startSending(async () => {
      try {
        const res = await sendReport(sessionId, role);
        if (res && !res.ok) {
          setError(res.error);
          return;
        }
        router.refresh();
      } catch (e) {
        setError(e.message);
      }
    });
  }

  if (!recipient?.email) {
    return (
      <div className="p-5 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-muted">
        {copy.initialEmptyHint}{" "}
        <Link
          href={`/dashboard/tutor/students/${studentId}`}
          className="underline text-foreground"
        >
          {copy.inviteCta}
        </Link>{" "}
        {copy.initialEmptyTrailing}
      </div>
    );
  }

  const sentAt = recipient.sentAt;

  return (
    <div className="rounded-2xl border border-brand/30 bg-brand-pale/40 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center shrink-0 shadow-sm shadow-brand/30">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 7.5L12 13l9-5.5" />
              <rect x="3" y="5.5" width="18" height="13" rx="2" />
            </svg>
          </div>
          <div className="min-w-0">
            {sentAt ? (
              <>
                <h3 className="text-base font-semibold text-brand-foreground inline-flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Emailed {role === "parent" ? "parent" : "student"}
                </h3>
                <p className="text-sm text-brand-foreground/80 mt-0.5">
                  Sent to{" "}
                  <span className="font-medium">{recipient.email}</span> on{" "}
                  {new Date(sentAt).toLocaleString("en-AU", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  .
                </p>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold text-brand-foreground">
                  {copy.initialHeading}
                </h3>
                <p className="text-sm text-brand-foreground/80 mt-0.5">
                  Send to <span className="font-medium">{recipient.email}</span>
                  {recipient.linked ? copy.linkedSuffix : copy.pendingSuffix}
                </p>
              </>
            )}
          </div>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSend}
          disabled={pending}
          className="shrink-0"
        >
          {pending && <Spinner />}
          {pending
            ? "Sending…"
            : sentAt
              ? copy.resendButton
              : copy.initialButton}
        </Button>
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-3" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
