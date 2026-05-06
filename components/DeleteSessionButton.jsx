"use client";

import { useState, useTransition } from "react";
import { deleteSession } from "@/app/dashboard/tutor/session/actions";

export default function DeleteSessionButton({ sessionId, sessionDate }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startDelete] = useTransition();
  const [error, setError] = useState(null);

  function handleDelete() {
    setError(null);
    startDelete(async () => {
      try {
        const fd = new FormData();
        fd.set("session_id", sessionId);
        await deleteSession(fd);
        // Action redirects on success — won't reach here unless something threw.
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
        className="text-xs text-zinc-400 hover:text-red-500 transition"
      >
        Delete session
      </button>
    );
  }

  const dateLabel = sessionDate
    ? new Date(sessionDate).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "this session";

  return (
    <div className="space-y-2">
      <p className="text-xs text-zinc-500">
        Permanently delete the session from {dateLabel}, including its report,
        ratings, and any uploaded photos. This can't be undone.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="h-8 px-3 rounded-full bg-red-600 text-white text-xs font-medium disabled:opacity-50"
        >
          {pending ? "Deleting…" : "Delete permanently"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="h-8 px-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-medium"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
