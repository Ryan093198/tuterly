"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { readJsonOrFallback } from "@/lib/practice-client";

// Modal that drives the parent practice-worksheet generator. Two paths:
//   - one-click "weak topic" chips (pre-filled from ratings + flags)
//   - explicit dropdown of curriculum topics for the kid's level
// The UI deliberately keeps both paths visible at once — the chips don't
// hide the dropdown — so a parent who isn't sure if "Solving quadratics" is
// really the right thing for tonight can pick something else.
export default function PracticeModal({
  open,
  onClose,
  student,
  weakTopics,
  // Either topicsBySubject ({ maths, english }) or the legacy single
  // topicGroups prop. topicsBySubject is preferred so the topic
  // dropdown can swap when the parent toggles subject inside the
  // modal — without it, a maths student switching to english would
  // still see maths topics (the original bug).
  topicsBySubject,
  topicGroups,
  onGenerated,
  // When the parent jumps in from a suggested-practice chip on the
  // dashboard, prefill the topic/subtopic so they can hit Generate
  // without picking it again. Only honoured when the modal opens.
  initialTopic,
  initialSubtopic,
}) {
  const router = useRouter();
  const [subject, setSubject] = useState(student.subject || "maths");
  const [topicId, setTopicId] = useState("");
  // Initialize from the dashboard-handoff props so the modal opens
  // pre-filled when the parent arrives via a "Suggested practice"
  // chip. The parent forces a fresh component instance per chip via
  // `key`, so these initializers run again on each fresh nav.
  const [topicLabel, setTopicLabel] = useState(initialTopic || "");
  const [subtopic, setSubtopic] = useState(initialSubtopic || "");
  const [questionCount, setQuestionCount] = useState(8);
  const [difficulty, setDifficulty] = useState("core");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [upgrade, setUpgrade] = useState(false);

  // Re-derive the visible topic groups whenever the subject changes.
  // topicsBySubject is the canonical source; fall back to the legacy
  // topicGroups prop so existing callers don't break before they're
  // migrated.
  const activeTopicGroups = useMemo(() => {
    if (topicsBySubject && Array.isArray(topicsBySubject[subject])) {
      return topicsBySubject[subject];
    }
    return topicGroups ?? [];
  }, [topicsBySubject, topicGroups, subject]);

  const flatTopics = useMemo(
    () => activeTopicGroups.flatMap((g) => g.topics),
    [activeTopicGroups]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);


  // Clear the picked topic on subject swap — the old topicId belongs to
  // the previous subject's curriculum so leaving it selected sends the
  // wrong descriptor to the API.
  useEffect(() => {
    setTopicId("");
    setTopicLabel("");
  }, [subject]);

  if (!open) return null;

  function pickWeakTopic(suggestion) {
    setTopicId("");
    setTopicLabel(suggestion.topic);
    setSubtopic(suggestion.subtopic || "");
  }

  function pickCurriculumTopic(id) {
    setTopicId(id);
    const match = flatTopics.find((t) => t.id === id);
    setTopicLabel(match?.label || "");
    setSubtopic("");
  }

  function close() {
    if (pending) return;
    setError(null);
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setUpgrade(false);
    if (!topicLabel.trim()) {
      setError("Pick a topic to practise.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/practice", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          student_id: student.id,
          subject,
          topic_id: topicId || undefined,
          topic_label: topicLabel.trim(),
          subtopic: subtopic.trim() || undefined,
          question_count: questionCount,
          difficulty,
        }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) {
        if (res.status === 402 || data?.need_upgrade) setUpgrade(true);
        throw new Error(data?.error || "Could not generate worksheet.");
      }
      onClose();
      router.refresh();
      if (data?.resource && onGenerated) onGenerated(data.resource);
    } catch (err) {
      setError(err.message || "Could not generate worksheet.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in-up"
        onClick={close}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Generate a practice worksheet
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Saved to {student.first_name}&apos;s resources, ready to print.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={pending}
            aria-label="Close"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:bg-surface-soft hover:text-foreground transition disabled:opacity-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {weakTopics?.length > 0 && (
            <div className="space-y-2">
              <span className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Suggested from {student.first_name}&apos;s recent sessions
              </span>
              <div className="flex flex-wrap gap-2">
                {weakTopics.map((s, idx) => {
                  const active =
                    !topicId &&
                    topicLabel === s.topic &&
                    (subtopic || "") === (s.subtopic || "");
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => pickWeakTopic(s)}
                      disabled={pending}
                      className={`text-left text-xs px-3 py-2 rounded-xl border transition ${
                        active
                          ? "border-brand bg-brand-pale text-brand-foreground"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-brand/40 hover:bg-brand-pale/30"
                      }`}
                    >
                      <span className="block font-medium">
                        {s.subtopic || s.topic}
                      </span>
                      <span className="block text-[10px] text-muted mt-0.5">
                        {s.source === "flag"
                          ? "From a question they flagged for help"
                          : `Last rated ${confidenceLabel(s.confidence)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Subject
              </span>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setTopicId("");
                  setTopicLabel("");
                  setSubtopic("");
                }}
                disabled={pending}
                className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
              >
                <option value="maths">Maths</option>
                <option value="english">English</option>
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Number of questions
              </span>
              <input
                type="number"
                min={3}
                max={15}
                step={1}
                value={questionCount}
                onChange={(e) =>
                  setQuestionCount(parseInt(e.target.value, 10) || 8)
                }
                disabled={pending}
                className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
              />
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Or pick a topic from the {labelForLevel(student)} curriculum
            </span>
            {activeTopicGroups.length > 0 ? (
              <select
                value={topicId}
                onChange={(e) => pickCurriculumTopic(e.target.value)}
                disabled={pending}
                className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
              >
                <option value="">, Choose a topic, </option>
                {activeTopicGroups.map((g) => (
                  <optgroup key={g.strand} label={g.strand}>
                    {g.topics.map((t) => (
                      <option key={t.id} value={t.id} title={t.desc}>
                        {t.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={topicLabel}
                onChange={(e) => {
                  setTopicId("");
                  setTopicLabel(e.target.value);
                }}
                disabled={pending}
                placeholder="e.g. Long division"
                className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
              />
            )}
            {activeTopicGroups.length > 0 && (
              <span className="block text-[11px] text-muted">
                Don&apos;t see what you&apos;re after? Type it in the
                &quot;Focus&quot; box below.
              </span>
            )}
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Specific focus (optional)
            </span>
            <input
              type="text"
              value={subtopic}
              onChange={(e) => setSubtopic(e.target.value)}
              disabled={pending}
              placeholder="e.g. Word problems involving fractions"
              className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
            <span className="block text-[11px] text-muted">
              Narrows the worksheet to a specific angle of the topic.
            </span>
          </label>

          <fieldset className="space-y-1.5">
            <legend className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Difficulty
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "review", label: "Review", desc: "Confidence-builder" },
                { id: "core", label: "Core", desc: "Normal mix" },
                { id: "stretch", label: "Stretch", desc: "Push them" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setDifficulty(opt.id)}
                  disabled={pending}
                  className={`px-2 py-2 rounded-xl border text-xs transition ${
                    difficulty === opt.id
                      ? "border-brand bg-brand-pale text-brand-foreground"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-brand/40"
                  }`}
                >
                  <span className="block font-medium">{opt.label}</span>
                  <span className="block text-[10px] text-muted mt-0.5">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          {topicLabel && (
            <p className="text-xs text-muted bg-surface-soft px-3 py-2 rounded-lg">
              Will generate a {questionCount}-question worksheet on{" "}
              <span className="font-medium text-foreground">
                {subtopic ? `${subtopic} (${topicLabel})` : topicLabel}
              </span>
              .
            </p>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
              {error}
              {upgrade && (
                <a href="/get-started" className="block mt-1.5 font-semibold text-brand underline">
                  See plans →
                </a>
              )}
            </div>
          )}

          {pending && (
            <p className="text-xs text-muted bg-brand-pale/40 px-3 py-2 rounded-lg">
              Generating… usually 10–20 seconds. Don&apos;t close the window.
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="submit" variant="primary" disabled={pending || !topicLabel.trim()}>
              {pending ? "Generating…" : "Generate worksheet"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={close}
              disabled={pending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function labelForLevel(student) {
  return student.working_level || student.year_level || "current";
}

const CONFIDENCE_TEXT = {
  1: "Struggling",
  2: "Needs work",
  3: "Developing",
  4: "Confident",
  5: "Mastered",
};

function confidenceLabel(c) {
  return CONFIDENCE_TEXT[c] || "weak";
}
