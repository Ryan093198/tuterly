"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSessionNotes } from "@/app/dashboard/tutor/session/actions";
import AudioUpload from "@/components/AudioUpload";
import Button from "@/components/ui/Button";

export default function NotesEditor({ sessionId, initialNotes }) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [pending, startSaving] = useTransition();
  const [savedAt, setSavedAt] = useState(null);
  const [error, setError] = useState(null);

  const dirty = (notes ?? "") !== (initialNotes ?? "");

  function handleSave() {
    startSaving(async () => {
      try {
        const fd = new FormData();
        fd.set("session_id", sessionId);
        fd.set("raw_notes", notes);
        await updateSessionNotes(fd);
        setSavedAt(new Date());
        setError(null);
        router.refresh();
      } catch (e) {
        setError(e.message || "Save failed");
      }
    });
  }

  function handleAudioResult(generated) {
    setNotes((prev) => {
      const trimmed = (prev ?? "").trim();
      return trimmed ? `${trimmed}\n\n${generated}` : generated;
    });
  }

  return (
    <div className="space-y-3">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Dot points of what you covered, how the student went, homework, etc."
        className="w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-surface-soft font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={pending || !dirty}
        >
          {pending ? "Saving…" : "Save notes"}
        </Button>
        {dirty && !pending && (
          <span className="text-xs text-muted">Unsaved changes</span>
        )}
        {savedAt && !dirty && (
          <span className="text-xs text-emerald-600 font-medium">
            Saved {savedAt.toLocaleTimeString()}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <AudioUpload onResult={handleAudioResult} />
    </div>
  );
}
