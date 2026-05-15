"use client";

import { useState, useTransition } from "react";
import { deleteSession } from "@/app/dashboard/tutor/session/actions";

// Inline delete for the tutor activity list. Two-step confirm to keep
// destructive clicks from being a single misclick. Calls the same
// deleteSession server action used everywhere else, but passes
// redirect_to so the user lands back on the activity list rather than
// the student detail page.
export default function ActivityRowDelete({
  sessionId,
  sessionDate,
  studentName,
  returnHref,
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startDelete] = useTransition();
  const [error, setError] = useState(null);

  function handleDelete() {
    setError(null);
    startDelete(async () => {
      try {
        const fd = new FormData();
        fd.set("session_id", sessionId);
        if (returnHref) fd.set("redirect_to", returnHref);
        await deleteSession(fd);
      } catch (e) {
        setError(e.message || "Delete failed");
      }
    });
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-xs text-zinc-400 hover:text-red-500 transition whitespace-nowrap"
        aria-label={`Delete session with ${studentName} on ${sessionDate}`}
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="h-7 px-2.5 rounded-full bg-red-600 text-white text-xs font-medium disabled:opacity-50"
      >
        {pending ? "Deleting…" : "Confirm delete"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        disabled={pending}
        className="h-7 px-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs"
      >
        Cancel
      </button>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
}
