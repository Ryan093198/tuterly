"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  setFlagUnderstood,
  removeFlag,
} from "@/app/dashboard/student/flag-actions";
import MarkdownReport from "@/components/MarkdownReport";

export default function FlaggedQuestionCard({ flag, sessionHref, sourceHref }) {
  // sourceHref is the generic deep link to the flag's source (report or
  // resource); sessionHref is kept as an alias for back-compat with older
  // call sites that only handled report flags.
  const linkHref = sourceHref ?? sessionHref ?? null;
  const router = useRouter();
  const [understood, setUnderstood] = useState(!!flag.understood_at);
  const [pendingMark, startMarking] = useTransition();
  const [pendingRemove, startRemoving] = useTransition();
  const [error, setError] = useState(null);

  function handleToggleUnderstood() {
    setError(null);
    const next = !understood;
    startMarking(async () => {
      try {
        const fd = new FormData();
        fd.set("flag_id", flag.id);
        fd.set("understood", next ? "1" : "0");
        await setFlagUnderstood(fd);
        setUnderstood(next);
        router.refresh();
      } catch (e) {
        setError(e.message || "Couldn't save");
      }
    });
  }

  function handleRemove() {
    if (!confirm("Remove this flagged question from the list?")) return;
    setError(null);
    startRemoving(async () => {
      try {
        const fd = new FormData();
        fd.set("flag_id", flag.id);
        await removeFlag(fd);
        router.refresh();
      } catch (e) {
        setError(e.message || "Couldn't remove");
      }
    });
  }

  // Header label: prefer the new explicit source_label (from enrichFlag), fall
  // back to the legacy session-date heuristic.
  const sourceLabel =
    flag.source_label ||
    (flag.session_date
      ? `Session on ${new Date(flag.session_date).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`
      : "Session");

  const containerClass = understood
    ? "rounded-2xl border bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40 shadow-sm"
    : "rounded-2xl border bg-amber-50/40 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/40 shadow-sm";

  return (
    <div className={`${containerClass} p-5 sm:p-6 transition`}>
      <div className="flex items-center justify-between mb-3 text-xs text-muted gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {linkHref ? (
            <Link
              href={linkHref}
              className="hover:text-foreground transition"
            >
              {sourceLabel}
            </Link>
          ) : (
            <span>{sourceLabel}</span>
          )}
          {understood && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium">
              <CheckIcon size={11} />
              Understood
            </span>
          )}
        </div>
        <span>flagged {timeAgo(flag.flagged_at)}</span>
      </div>

      <div className={understood ? "opacity-70" : ""}>
        {flag.question ? (
          <MarkdownReport
            content={`${flag.question}\n\n<details><summary>Reveal worked solution</summary>\n\n${flag.solution}\n\n</details>`}
          />
        ) : (
          <p className="text-sm text-muted">
            Question content unavailable (the report may have been regenerated
            since the flag was set).
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={handleToggleUnderstood}
          disabled={pendingMark || pendingRemove}
          className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium transition disabled:opacity-50 ${
            understood
              ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200/70"
              : "bg-foreground text-background hover:opacity-90"
          }`}
        >
          {pendingMark ? (
            <Spinner size={12} />
          ) : understood ? (
            <CheckIcon size={12} />
          ) : null}
          {pendingMark
            ? "Saving…"
            : understood
              ? "Marked understood"
              : "Mark as understood"}
        </button>
        <button
          type="button"
          onClick={handleRemove}
          disabled={pendingMark || pendingRemove}
          className="text-xs text-muted hover:text-red-500 transition disabled:opacity-50"
        >
          {pendingRemove ? "Removing…" : "Remove"}
        </button>
        {error && <p className="text-xs text-red-500 ml-auto">{error}</p>}
      </div>
    </div>
  );
}

function CheckIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Spinner({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 1-9 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function timeAgo(iso) {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
