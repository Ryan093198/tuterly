"use client";

import { useState, useTransition } from "react";
import { deleteStudent } from "@/app/dashboard/tutor/students/actions";

export default function DeleteStudentButton({ studentId, studentName }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startDelete] = useTransition();
  const [error, setError] = useState(null);
  const [typed, setTyped] = useState("");

  function handleDelete() {
    setError(null);
    startDelete(async () => {
      try {
        const fd = new FormData();
        fd.set("student_id", studentId);
        await deleteStudent(fd);
        // Action redirects on success.
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
        Delete student
      </button>
    );
  }

  const confirmPhrase = (studentName || "").trim();
  const matchOk = typed.trim().toLowerCase() === confirmPhrase.toLowerCase();

  return (
    <div className="space-y-3 p-4 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/60 dark:bg-red-950/20">
      <p className="text-sm text-foreground">
        Permanently delete{" "}
        <span className="font-semibold">{studentName}</span>, including all
        sessions, reports, ratings, photos, and resources. This can't be undone.
      </p>
      <label className="block space-y-1">
        <span className="text-xs text-muted">
          Type the student's name to confirm
        </span>
        <input
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder={studentName}
          className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending || !matchOk}
          className="h-9 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {pending ? "Deleting…" : "Delete permanently"}
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setTyped("");
          }}
          disabled={pending}
          className="h-9 px-4 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-medium"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
