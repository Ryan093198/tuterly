"use client";

import { useRef, useState } from "react";

const MAX_BYTES = 25 * 1024 * 1024;

export default function AudioUpload({ onResult }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  function handlePick(e) {
    setError(null);
    setDone(false);
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      return;
    }
    if (!f.type.startsWith("audio/")) {
      setError("Pick an audio file (mp3, m4a, wav, webm, etc).");
      setFile(null);
      return;
    }
    if (f.size > MAX_BYTES) {
      setError(
        `That's ${(f.size / 1024 / 1024).toFixed(1)}MB — max 25MB. Trim or compress before uploading.`
      );
      setFile(null);
      return;
    }
    setFile(f);
  }

  async function handleGenerate() {
    if (!file) return;
    setPending(true);
    setError(null);
    setDone(false);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/transcribe", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const { notes } = await res.json();
      if (!notes) throw new Error("No speech detected in the audio.");
      onResult?.(notes);
      setDone(true);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (e) {
      setError(e.message || "Failed to transcribe");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-surface-soft p-4 space-y-2.5">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-brand-pale text-brand-dark flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" />
            <path d="M12 18v3" />
          </svg>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <p className="text-sm font-medium">Generate notes from audio</p>
            <p className="text-xs text-muted mt-0.5">
              Tuterly turns your lesson recordings into detailed summaries.
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="audio/*"
            onChange={handlePick}
            className="block text-xs file:h-8 file:px-3 file:rounded-lg file:border file:border-zinc-200 dark:file:border-zinc-800 file:bg-card file:text-xs file:font-medium file:mr-2 file:cursor-pointer hover:file:bg-surface-soft"
          />
        </div>
      </div>
      {file && (
        <div className="flex items-center justify-between gap-2 text-xs text-muted pl-12">
          <span className="truncate">
            {file.name} · {(file.size / 1024 / 1024).toFixed(1)}MB
          </span>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={pending}
            className="h-8 px-3 rounded-full bg-brand hover:bg-brand-dark text-white text-xs font-medium shadow-sm shadow-brand/20 disabled:opacity-50 transition shrink-0"
          >
            {pending ? "Transcribing…" : "Generate notes"}
          </button>
        </div>
      )}
      {error && <p className="text-xs text-red-500 pl-12">{error}</p>}
      {done && (
        <p className="text-xs text-emerald-600 font-medium pl-12">
          Notes generated and inserted above.
        </p>
      )}
    </div>
  );
}
