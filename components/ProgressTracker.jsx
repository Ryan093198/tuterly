"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MarkdownReport from "@/components/MarkdownReport";
import { CONFIDENCE_LABELS, CONFIDENCE_COLORS } from "@/lib/rating";

export default function ProgressTracker({
  student,
  ratings,
  flaggedCount = 0,
  flaggedHref = null,
}) {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [drill, setDrill] = useState(null); // { topic, subtopic }
  const [drillContent, setDrillContent] = useState(null);
  const [drillLoading, setDrillLoading] = useState(false);
  const [drillError, setDrillError] = useState(null);

  const { topicMap, sessionsTracked, overallAvg, latestAvg } = useMemo(
    () => groupRatings(ratings ?? []),
    [ratings]
  );

  async function loadDrillDown(topic, subtopic) {
    setDrill({ topic, subtopic });
    setDrillContent(null);
    setDrillError(null);
    setDrillLoading(true);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          topic,
          subtopic,
          year_level: student.working_level || student.year_level,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const { content } = await res.json();
      setDrillContent(content);
    } catch (e) {
      setDrillError(e.message);
    } finally {
      setDrillLoading(false);
    }
  }

  if (!ratings || ratings.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm font-medium">No progress data yet</p>
        <p className="text-xs text-zinc-500 mt-1">
          Progress tracking starts after the first session with confidence
          ratings recorded.
        </p>
      </div>
    );
  }

  if (drill) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => {
            setDrill(null);
            setDrillContent(null);
            setDrillError(null);
          }}
          className="text-sm text-zinc-500 hover:text-foreground"
        >
          ← Back to progress
        </button>
        <div className="p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold tracking-tight">{drill.subtopic}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Practice for {student.first_name} · {drill.topic}
          </p>
          <div className="mt-5">
            {drillLoading && (
              <p className="text-sm text-zinc-500">
                Generating practice questions…
              </p>
            )}
            {drillError && (
              <p className="text-sm text-red-500">{drillError}</p>
            )}
            {drillContent && <MarkdownReport content={drillContent} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <SummaryCard label="Sessions tracked" value={sessionsTracked} />
        <SummaryCard
          label="Latest session"
          value={latestAvg != null ? `${latestAvg}/5` : "—"}
          color={
            latestAvg != null ? CONFIDENCE_COLORS[Math.round(latestAvg)] : null
          }
        />
        <SummaryCard
          label="Flagged questions"
          value={flaggedCount}
          color={flaggedCount > 0 ? "#d97706" : null}
          href={flaggedHref}
        />
      </div>

      <ul className="space-y-2">
        {Object.entries(topicMap).map(([topicName, topicData]) => {
          const subtopicEntries = Object.entries(topicData.subtopics);
          const topicAvg = subtopicEntries.length
            ? avg(
                subtopicEntries.map(
                  ([, dps]) => dps[dps.length - 1].confidence
                )
              )
            : null;
          const isExpanded = expandedTopic === topicName;

          return (
            <li key={topicName}>
              <div
                className={`rounded-xl border transition ${
                  isExpanded
                    ? "border-zinc-400 dark:border-zinc-600"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedTopic(isExpanded ? null : topicName)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition rounded-xl"
                >
                  <div>
                    <h3 className="font-medium">{topicName}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {subtopicEntries.length} subtopic
                      {subtopicEntries.length !== 1 ? "s" : ""} ·{" "}
                      {topicData.sessions.size} session
                      {topicData.sessions.size !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {topicAvg != null && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-[width]"
                            style={{
                              width: `${(topicAvg / 5) * 100}%`,
                              background: CONFIDENCE_COLORS[Math.round(topicAvg)],
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-semibold tabular-nums"
                          style={{
                            color: CONFIDENCE_COLORS[Math.round(topicAvg)],
                          }}
                        >
                          {topicAvg}/5
                        </span>
                      </div>
                    )}
                    <span
                      className="text-zinc-400 transition-transform"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                      }}
                    >
                      ▾
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 space-y-2">
                    {subtopicEntries.map(([subtopicName, dataPoints]) => (
                      <SubtopicRow
                        key={subtopicName}
                        subtopic={subtopicName}
                        dataPoints={dataPoints}
                        onClick={() => loadDrillDown(topicName, subtopicName)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SubtopicRow({ subtopic, dataPoints, onClick }) {
  const latest = dataPoints[dataPoints.length - 1];
  const first = dataPoints[0];
  const trend = dataPoints.length > 1 ? latest.confidence - first.confidence : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-left"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{subtopic}</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Click for explanation & practice →
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {trend !== 0 && (
            <span
              className="text-xs font-semibold"
              style={{ color: trend > 0 ? "#2D8A56" : "#C53030" }}
            >
              {trend > 0 ? "↑" : "↓"}
              {Math.abs(trend)}
            </span>
          )}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((v) => (
              <div
                key={v}
                className="w-1.5 h-1.5 rounded-sm"
                style={{
                  background:
                    latest.confidence >= v
                      ? CONFIDENCE_COLORS[v]
                      : "#e4e4e7",
                }}
              />
            ))}
          </div>
          <span
            className="text-[11px] font-semibold whitespace-nowrap"
            style={{ color: CONFIDENCE_COLORS[latest.confidence] }}
          >
            {CONFIDENCE_LABELS[latest.confidence]}
          </span>
        </div>
      </div>
    </button>
  );
}

function SummaryCard({ label, value, color, href }) {
  const inner = (
    <>
      <p className="text-[10px] uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p
        className="text-2xl font-semibold mt-1 tabular-nums"
        style={color ? { color } : undefined}
      >
        {value}
      </p>
    </>
  );
  const className =
    "block p-3 sm:p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center transition" +
    (href ? " hover:border-brand/40 hover:shadow-sm cursor-pointer" : "");
  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}

function avg(nums) {
  if (!nums.length) return null;
  return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
}

function groupRatings(ratings) {
  // Each rating: { topic, subtopic, confidence, session_date }
  const sorted = [...ratings].sort((a, b) =>
    a.session_date.localeCompare(b.session_date)
  );

  const topicMap = {};
  for (const r of sorted) {
    const topic = r.topic || "General";
    const sub = r.subtopic || "General";
    if (!topicMap[topic]) {
      topicMap[topic] = { subtopics: {}, sessions: new Set() };
    }
    topicMap[topic].sessions.add(r.session_date);
    if (!topicMap[topic].subtopics[sub]) {
      topicMap[topic].subtopics[sub] = [];
    }
    topicMap[topic].subtopics[sub].push({
      date: r.session_date,
      confidence: r.confidence,
    });
  }

  const sessionsTracked = new Set(sorted.map((r) => r.session_date)).size;
  const allConf = sorted.map((r) => r.confidence);
  const overallAvg = allConf.length ? avg(allConf) : null;

  const latestSessionDate = sorted.length
    ? sorted[sorted.length - 1].session_date
    : null;
  const latestRatings = latestSessionDate
    ? sorted.filter((r) => r.session_date === latestSessionDate)
    : [];
  const latestAvg = latestRatings.length
    ? avg(latestRatings.map((r) => r.confidence))
    : null;

  return { topicMap, sessionsTracked, overallAvg, latestAvg };
}
