"use client";

import { useState } from "react";
import AudioUpload from "@/components/AudioUpload";

export default function SessionNotesField({ name = "raw_notes", placeholder }) {
  const [notes, setNotes] = useState("");

  function handleAudioResult(generated) {
    setNotes((prev) => {
      const trimmed = (prev ?? "").trim();
      return trimmed ? `${trimmed}\n\n${generated}` : generated;
    });
  }

  return (
    <div className="space-y-2">
      <textarea
        name={name}
        rows={10}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent font-mono text-sm"
      />
      <p className="text-xs text-zinc-500">
        Dot points are fine — Claude turns these into the parent-facing report.
      </p>
      <AudioUpload onResult={handleAudioResult} />
    </div>
  );
}
