"use client";

import { useState, useTransition } from "react";
import { toggleFlag } from "@/app/dashboard/student/flag-actions";
import Spinner from "@/components/ui/Spinner";

export default function FlagQuestion({
  reportId,
  resourceId,
  questionNumber,
  topic,
  initial,
}) {
  const [flagged, setFlagged] = useState(!!initial);
  const [pending, startToggle] = useTransition();
  const [error, setError] = useState(null);

  function handleToggle() {
    setError(null);
    startToggle(async () => {
      const next = !flagged;
      try {
        const fd = new FormData();
        if (reportId) fd.set("report_id", reportId);
        if (resourceId) fd.set("resource_id", resourceId);
        fd.set("question_number", String(questionNumber));
        if (topic) fd.set("topic", topic);
        fd.set("on", next ? "1" : "0");
        await toggleFlag(fd);
        setFlagged(next);
      } catch (e) {
        setError(e.message || "Couldn't save");
      }
    });
  }

  return (
    <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        onClick={handleToggle}
        disabled={pending}
        className={`inline-flex items-center gap-1.5 text-xs font-medium transition disabled:opacity-50 ${
          flagged
            ? "text-amber-600 hover:text-amber-700"
            : "text-muted hover:text-foreground"
        }`}
      >
        {pending ? <Spinner size={13} /> : <FlagIcon filled={flagged} />}
        {pending
          ? "Saving…"
          : flagged
            ? "Flagged for your tutor, click to unflag"
            : "Still don't fully understand? Click here to flag with your tutor"}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function FlagIcon({ filled }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 22V4" />
      <path d="M4 4h13l-2 4 2 4H4" />
    </svg>
  );
}
