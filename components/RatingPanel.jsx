"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  extractSubtopics,
  detectOverallTopic,
  CONFIDENCE_LABELS,
  CONFIDENCE_COLORS,
} from "@/lib/rating";
import { saveRatings } from "@/app/dashboard/tutor/session/actions";

export default function RatingPanel({ sessionId, reportContent, initialRatings = [], initialTopic = "", subject = "maths" }) {
  const router = useRouter();

  const detected = useMemo(() => {
    const subs = extractSubtopics(reportContent);
    // Pass subject so an English report doesn't get tagged with maths
    // topics like "Geometry" because of incidental word matches.
    const topic = detectOverallTopic(reportContent, subject);
    return { subs, topic };
  }, [reportContent, subject]);

  const [overallTopic, setOverallTopic] = useState(initialTopic || detected.topic);
  const [subtopicRatings, setSubtopicRatings] = useState(() => {
    const map = {};
    for (const r of initialRatings) map[r.subtopic] = r.confidence;
    for (const sub of detected.subs) {
      if (map[sub] === undefined) map[sub] = 0;
    }
    return map;
  });
  const [manual, setManual] = useState("");
  const [pending, startSaving] = useTransition();
  const [savedAt, setSavedAt] = useState(null);

  function setRating(sub, value) {
    setSubtopicRatings((prev) => ({ ...prev, [sub]: value }));
  }

  function addManual() {
    const t = manual.trim();
    if (!t || subtopicRatings[t] !== undefined) return;
    setSubtopicRatings((prev) => ({ ...prev, [t]: 0 }));
    setManual("");
  }

  function removeSubtopic(sub) {
    setSubtopicRatings((prev) => {
      const next = { ...prev };
      delete next[sub];
      return next;
    });
  }

  const entries = Object.entries(subtopicRatings);
  const rated = entries.filter(([, v]) => v > 0);
  const allRated = entries.length > 0 && rated.length === entries.length;
  const avg = rated.length
    ? (rated.reduce((s, [, v]) => s + v, 0) / rated.length).toFixed(1)
    : null;

  function handleSave() {
    startSaving(async () => {
      await saveRatings({
        sessionId,
        overallTopic,
        ratings: entries.map(([subtopic, confidence]) => ({ subtopic, confidence })),
      });
      setSavedAt(new Date());
      router.refresh();
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-5 sm:p-6 space-y-5">
      <label className="block space-y-1.5">
        <span className="text-[11px] uppercase tracking-wider text-muted font-medium">
          Overall topic
        </span>
        <input
          type="text"
          value={overallTopic}
          onChange={(e) => setOverallTopic(e.target.value)}
          placeholder="e.g. Quadratic Expressions & Equations"
          className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
        />
      </label>

      {avg && (
        <div className="px-4 py-3 rounded-xl bg-surface-soft flex items-center justify-between">
          <span className="text-sm font-medium">
            Overall confidence: <span className="tabular-nums">{avg}/5</span>
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: CONFIDENCE_COLORS[Math.round(avg)] }}
          >
            {CONFIDENCE_LABELS[Math.round(avg)]}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-wider text-muted font-medium">
          Subtopics
        </div>
        {entries.length === 0 ? (
          <div className="p-4 text-sm text-muted rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
            No subtopics auto-detected. Add some below or skip ratings.
          </div>
        ) : (
          <ul className="space-y-2">
            {entries.map(([sub, rating]) => (
              <li
                key={sub}
                className="p-3.5 rounded-xl bg-surface-soft space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{sub}</span>
                  <button
                    type="button"
                    onClick={() => removeSubtopic(sub)}
                    className="text-xs text-muted hover:text-danger transition"
                    aria-label={`Remove ${sub}`}
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(sub, val)}
                      className="w-9 h-9 rounded-lg text-sm font-semibold transition"
                      style={{
                        background:
                          rating >= val ? CONFIDENCE_COLORS[val] : "transparent",
                        color: rating >= val ? "white" : "#a1a1aa",
                        boxShadow:
                          rating >= val
                            ? "0 1px 3px rgba(0,0,0,0.12)"
                            : "inset 0 0 0 1px #e4e4e7",
                      }}
                    >
                      {val}
                    </button>
                  ))}
                  <span
                    className="ml-2 text-xs font-semibold"
                    style={{
                      color:
                        rating > 0 ? CONFIDENCE_COLORS[rating] : "#a1a1aa",
                    }}
                  >
                    {CONFIDENCE_LABELS[rating] || "Not rated"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addManual())
          }
          placeholder="Add a subtopic to rate…"
          className="flex-1 h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
        />
        <button
          type="button"
          onClick={addManual}
          disabled={!manual.trim()}
          className="h-10 px-4 rounded-xl bg-surface-soft text-sm font-medium disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          + Add
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleSave}
          disabled={pending || !overallTopic.trim() || entries.length === 0}
          className="h-10 px-4 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-medium shadow-sm shadow-brand/20 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none transition"
        >
          {pending
            ? "Saving…"
            : allRated
              ? "Save ratings"
              : `Save ratings (${rated.length}/${entries.length})`}
        </button>
        {savedAt && (
          <span className="text-xs text-emerald-600 font-medium">
            Saved {savedAt.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
