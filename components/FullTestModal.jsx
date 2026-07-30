"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { readJsonOrFallback } from "@/lib/practice-client";
import { downloadFullTestPdf } from "@/lib/full-test-client";

// Modal for the subscriber-only "Full practice test" generator. A full test
// covers a whole TOPIC AREA (strand) in a fixed 25-question banded test
// (5 consolidating / 15 standard / 5 advanced). Generation runs in two steps
// so each stays under the server's 60s limit: the questions come back first
// (the test is downloadable immediately), then the answer key follows.
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
  const [topicArea, setTopicArea] = useState("");
  // phase: idle | questions | answers | done
  const [phase, setPhase] = useState("idle");
  const [error, setError] = useState(null);
  const [upgrade, setUpgrade] = useState(false);
  const [answersError, setAnswersError] = useState(null);
  // { test_md, answers_md, resource }
  const [result, setResult] = useState(null);
  const [downloadingPart, setDownloadingPart] = useState(null);

  const strands = useMemo(() => {
    const groups =
      (topicsBySubject && Array.isArray(topicsBySubject[subject])
        ? topicsBySubject[subject]
        : topicGroups) || [];
    return groups.map((g) => g.strand).filter(Boolean);
  }, [topicsBySubject, topicGroups, subject]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const busy = phase === "questions" || phase === "answers";

  function close() {
    if (busy) return;
    setError(null);
    setAnswersError(null);
    setResult(null);
    setPhase("idle");
    onClose();
  }

  function friendlyError(res, data) {
    if (res.status === 402 || data?.need_upgrade) {
      setUpgrade(true);
      return (
        data?.error ||
        "Full practice tests need an active Tuterly plan. Please renew your subscription or top up a session pack to unlock them."
      );
    }
    if (res.status === 429) {
      return data?.error || "You've hit the limit for now. Try again a bit later.";
    }
    if (res.status === 504 || res.status >= 500 || !data) {
      return "The test is taking longer than usual to generate. Please try again in a moment.";
    }
    return data?.error || "Could not generate the test.";
  }

  async function generateAnswers(resourceId) {
    setPhase("answers");
    setAnswersError(null);
    try {
      const res = await fetch("/api/practice/full-test/answers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resource_id: resourceId }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) {
        setAnswersError(
          res.status === 504 || res.status >= 500 || !data
            ? "The answer key is taking longer than usual. You can retry it below."
            : data?.error || "Could not generate the answer key."
        );
        setPhase("done");
        return;
      }
      setResult((r) => (r ? { ...r, answers_md: data?.answers_md || "" } : r));
      setPhase("done");
      router.refresh();
    } catch {
      setAnswersError("The answer key didn't finish. You can retry it below.");
      setPhase("done");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setUpgrade(false);
    if (!topicArea.trim()) {
      setError("Pick a topic area for the test.");
      return;
    }
    setPhase("questions");
    try {
      const res = await fetch("/api/practice/full-test", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          student_id: student.id,
          subject,
          topic_label: topicArea.trim(),
        }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) {
        setError(friendlyError(res, data));
        setPhase("idle");
        return;
      }
      const resource = data?.resource || null;
      setResult({ test_md: data?.test_md || "", answers_md: "", resource });
      if (resource && onGenerated) onGenerated(resource);
      router.refresh();
      if (resource?.id) {
        await generateAnswers(resource.id);
      } else {
        setPhase("done");
      }
    } catch {
      setError("The test is taking longer than usual to generate. Please try again in a moment.");
      setPhase("idle");
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
        topicLabel: topicArea,
      });
    } catch (err) {
      setError(err.message || "Could not download the PDF.");
    } finally {
      setDownloadingPart(null);
    }
  }

  const answersReady = !!result?.answers_md;

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
              25 questions across a whole topic area, with a separate answer key.
              Saved to {student.first_name}&apos;s resources.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={busy}
            aria-label="Close"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:bg-surface-soft hover:text-foreground transition disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {result ? (
          <div className="px-6 py-6 space-y-4">
            <div className="rounded-xl bg-brand-pale/50 border border-brand/20 px-4 py-3">
              <p className="text-sm font-medium text-foreground">
                Test ready for{" "}
                <span className="text-brand-foreground">{topicArea}</span>.
              </p>
              <p className="text-xs text-muted mt-1">
                Give the test to {student.first_name}, keep the answer key for
                marking. Both are saved in Resources.
              </p>
            </div>

            <div className="grid gap-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => handleDownload("test")}
                disabled={downloadingPart !== null}
              >
                {downloadingPart === "test" && <Spinner />}
                {downloadingPart === "test" ? "Preparing…" : "Download practice test (PDF)"}
              </Button>

              {answersReady ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDownload("answers")}
                  disabled={downloadingPart !== null}
                >
                  {downloadingPart === "answers" && <Spinner />}
                  {downloadingPart === "answers" ? "Preparing…" : "Download answer key (PDF)"}
                </Button>
              ) : phase === "answers" ? (
                <div className="flex items-center gap-2 text-sm text-muted px-4 py-2.5 rounded-lg bg-surface-soft">
                  <Spinner />
                  Generating the answer key…
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => result?.resource?.id && generateAnswers(result.resource.id)}
                  disabled={!result?.resource?.id}
                >
                  Retry answer key
                </Button>
              )}
            </div>

            {answersError && !answersReady && (
              <div className="text-sm text-amber-700 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-lg">
                {answersError}
              </div>
            )}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-1">
              <Button type="button" variant="ghost" onClick={close} disabled={busy}>
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
                    setTopicArea("");
                  }}
                  disabled={busy}
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
                Topic area to test ({labelForLevel(student)})
              </span>
              {strands.length > 0 ? (
                <select
                  value={topicArea}
                  onChange={(e) => setTopicArea(e.target.value)}
                  disabled={busy}
                  className="w-full h-10 px-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                >
                  <option value="">— Choose a topic area —</option>
                  {strands.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={topicArea}
                  onChange={(e) => setTopicArea(e.target.value)}
                  disabled={busy}
                  placeholder="e.g. Algebra"
                  className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                />
              )}
              <span className="block text-[11px] text-muted">
                The test covers the whole area: 5 consolidating, 15 standard and
                5 advanced questions.
              </span>
            </label>

            {topicArea && !busy && (
              <p className="text-xs text-muted bg-surface-soft px-3 py-2 rounded-lg">
                Will generate a 25-question test on{" "}
                <span className="font-medium text-foreground">{topicArea}</span>{" "}
                with a separate answer key.
              </p>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">
                {error}
                {upgrade && (
                  <a href="/get-started" className="block mt-1.5 font-semibold text-brand underline">
                    Start free trial →
                  </a>
                )}
              </div>
            )}

            {phase === "questions" && (
              <div className="flex items-center gap-2 text-xs text-muted bg-brand-pale/40 px-3 py-2.5 rounded-lg">
                <Spinner />
                Building the test… this takes around 30–60 seconds. Don&apos;t
                close the window.
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button type="submit" variant="primary" disabled={busy || !topicArea.trim()}>
                {phase === "questions" && <Spinner />}
                {phase === "questions" ? "Generating…" : "Generate full test"}
              </Button>
              <Button type="button" variant="outline" onClick={close} disabled={busy}>
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
