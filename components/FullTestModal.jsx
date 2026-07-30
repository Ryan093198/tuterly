"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { readJsonOrFallback } from "@/lib/practice-client";
import { downloadFullTestPdf } from "@/lib/full-test-client";

// Modal for the subscriber-only "Full practice test" generator. Unlike the
// worksheet modal it covers a WHOLE topic in a fixed 25-question banded test
// (5 consolidating / 15 standard / 5 advanced) and, once generated, offers two
// printable PDFs: the test (questions only) and a separate answer key.
export default function FullTestModal({
  open,
  onClose,
  student,
  topicsBySubject,
  topicGroups,
  onGenerated,
}) {
  const router = useRouter();
  const [subject, setSubject] = useState(student.subject || "maths");
  const [topicId, setTopicId] = useState("");
  const [topicLabel, setTopicLabel] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [upgrade, setUpgrade] = useState(false);
  // Generation result: { test_md, answers_md, resource }
  const [result, setResult] = useState(null);
  const [downloadingPart, setDownloadingPart] = useState(null);

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

  if (!open) return null;

  function pickCurriculumTopic(id) {
    setTopicId(id);
    const match = flatTopics.find((t) => t.id === id);
    setTopicLabel(match?.label || "");
  }

  function close() {
    if (pending) return;
    setError(null);
    setResult(null);
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setUpgrade(false);
    if (!topicLabel.trim()) {
      setError("Pick a topic for the test.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/practice/full-test", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          student_id: student.id,
          subject,
          topic_id: topicId || undefined,
          topic_label: topicLabel.trim(),
        }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) {
        if (res.status === 402 || data?.need_upgrade) setUpgrade(true);
        throw new Error(data?.error || "Could not generate the test.");
      }
      setResult({
        test_md: data?.test_md || "",
        answers_md: data?.answers_md || "",
        resource: data?.resource || null,
      });
      router.refresh();
      if (data?.resource && onGenerated) onGenerated(data.resource);
    } catch (err) {
      setError(err.message || "Could not generate the test.");
    } finally {
      setPending(false);
    }
  }

  async function handleDownload(part) {
    if (!result) return;
    setError(null);
    setDownloadingPart(part);
    try {
      await downloadFullTestPdf({
        content: part === "answers" ? result.answers_md : result.test_md,
        part,
        studentName: `${student.first_name} ${student.last_name}`,
        yearLevel: student.working_level || student.year_level,
        topicLabel,
      });
    } catch (err) {
      setError(err.message || "Could not download the PDF.");
    } finally {
      setDownloadingPart(null);
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
              Generate a full practice test
            </h2>
            <p className="text-xs text-muted mt-0.5">
              25 questions across the whole topic, with a separate answer key.
              Saved to {student.first_name}&apos;s resources.
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

        {result ? (
          <div className="px-6 py-6 space-y-4">
            <div className="rounded-xl bg-brand-pale/50 border border-brand/20 px-4 py-3">
              <p className="text-sm font-medium text-foreground">
                Test ready for{" "}
                <span className="text-brand-foreground">{topicLabel}</span>.
              </p>
              <p className="text-xs text-muted mt-1">
                Two printable PDFs: give the test to {student.first_name}, keep
                the answer key for marking. Both are also saved in Resources.
              </p>
            </div>

            <div className="grid gap-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => handleDownload("test")}
                disabled={downloadingPart !== null}
              >
                {downloadingPart === "test"
                  ? "Preparing…"
                  : "Download practice test (PDF)"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDownload("answers")}
                disabled={downloadingPart !== null}
              >
                {downloadingPart === "answers"
                  ? "Preparing…"
                  : "Download answer key (PDF)"}
              </Button>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-1">
              <Button type="button" variant="ghost" onClick={close}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
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
                  }}
                  disabled={pending}
                  className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                >
                  <option value="maths">Maths</option>
                  <option value="english">English</option>
                </select>
              </label>
              <div className="block space-y-1.5">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Length
                </span>
                <div className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-surface-soft text-sm flex items-center text-muted">
                  25 questions (fixed)
                </div>
              </div>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Topic from the {labelForLevel(student)} curriculum
              </span>
              {activeTopicGroups.length > 0 ? (
                <select
                  value={topicId}
                  onChange={(e) => pickCurriculumTopic(e.target.value)}
                  disabled={pending}
                  className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                >
                  <option value="">— Choose a topic —</option>
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
                  placeholder="e.g. Fractions, decimals and percentages"
                  className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                />
              )}
              <span className="block text-[11px] text-muted">
                The test covers the whole topic: 5 consolidating, 15 standard and
                5 advanced questions.
              </span>
            </label>

            {topicLabel && (
              <p className="text-xs text-muted bg-surface-soft px-3 py-2 rounded-lg">
                Will generate a 25-question test on{" "}
                <span className="font-medium text-foreground">{topicLabel}</span>{" "}
                with a separate answer key.
              </p>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
                {error}
                {upgrade && (
                  <a
                    href="/get-started"
                    className="block mt-1.5 font-semibold text-brand underline"
                  >
                    Start free trial →
                  </a>
                )}
              </div>
            )}

            {pending && (
              <p className="text-xs text-muted bg-brand-pale/40 px-3 py-2 rounded-lg">
                Building the test… this one takes longer than a worksheet, around
                30–60 seconds. Don&apos;t close the window.
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={pending || !topicLabel.trim()}
              >
                {pending ? "Generating…" : "Generate full test"}
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
        )}
      </div>
    </div>
  );
}

function labelForLevel(student) {
  return student.working_level || student.year_level || "current";
}
