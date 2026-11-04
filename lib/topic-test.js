import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/lib/supabase-admin";
import { getTopicGroupsForLevel } from "@/lib/curriculum-topics";
import { writtenTopicTest } from "@/lib/topic-test-files";
export { writtenTopicTest };
import {
  SYSTEM_INSTRUCTIONS_FULL_TEST_QUESTIONS,
  SYSTEM_INSTRUCTIONS_FULL_TEST_ANSWERS,
  buildFullTestQuestionsMessage,
  buildFullTestAnswersMessage,
} from "@/lib/full-test-prompt";
import { sanitizeArtifacts } from "@/lib/sanitize-generated";
import { findKatexErrors } from "@/lib/markdown-katex-validate";

// Full topic tests for the worksheet generator's free-limit box. A parent
// who has used today's free worksheet can ask for a full test on the topic
// they just picked; it's emailed as a link to /topic-test/[id].
//
// Tests are 20 questions in three bands (4 easier, 12 on level, 4 harder)
// with a compact answer key. Where they come from, in order:
//   1. content/topic-tests/<year>/<topic_id>.json: written ahead of time and
//      checked (every answer confirmed with code, scripts/check-topic-tests.mjs).
//      Copied into topic_tests the first time it's asked for, so the email
//      link (/topic-test/[id]) works the same way.
//   2. Fallback for a topic with no file yet: written by AI at request time
//      (a shorter version of the app's paid full practice test,
//      lib/full-test-prompt.js), then saved and reused.

export const TOPIC_TEST_QUESTIONS = 20;

// The full-test prompts, cut down from 25 questions to 20.
const swaps = (text) =>
  text
    .replace("around 45-60 minutes", "around 30-35 minutes")
    .replace("(Questions 1-5)", "(Questions 1-4)")
    .replace("(Questions 6-20)", "(Questions 5-16)")
    .replace("**Question 6**", "**Question 5**")
    .replace("(Questions 21-25)", "(Questions 17-20)")
    .replace("**Question 21**", "**Question 17**")
    .replace("EXACTLY 25 questions: 5 in Section A, 15 in Section B, 5 in Section C, numbered 1-25", "EXACTLY 20 questions: 4 in Section A, 12 in Section B, 4 in Section C, numbered 1-20")
    .replaceAll("the 25 questions", "the 20 questions")
    .replaceAll("exact 25 questions", "exact 20 questions")
    .replaceAll("all 25 questions", "all 20 questions")
    .replace("ALL 25 questions, numbered 1-25", "ALL 20 questions, numbered 1-20")
    .replace("Produce a 25-question full practice test covering this whole topic area: 5 consolidating, 15 standard, 5 advanced.", "Produce a 20-question practice test covering this whole topic: 4 consolidating, 12 standard, 4 advanced.");
const Q_SYSTEM = swaps(SYSTEM_INSTRUCTIONS_FULL_TEST_QUESTIONS);
const A_SYSTEM = swaps(SYSTEM_INSTRUCTIONS_FULL_TEST_ANSWERS);

// How many questions a saved test has (tests written before the switch to
// 20 questions have 25, and are kept as they are).
export const questionCount = (md) => (String(md || "").match(/^\*\*Question \d+\*\*/gm) || []).length || TOPIC_TEST_QUESTIONS;

export const TOPIC_TEST_YEARS = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 10A"];


const MODEL = "claude-sonnet-4-6";
// The answer key is where a wrong answer would hurt, so it gets thinking
// time to work each question out first (the worksheet generator found the
// same: far fewer wrong answers with thinking on).
const ANSWER_THINKING = 4000;
// A row stuck in "pending" longer than this is treated as a failed run.
const STALE_MS = 5.5 * 60_000; // just past the 300s function limit

// The topic as the worksheet picker shows it, or null if the id isn't a
// real topic for that year. The label and description always come from
// here, never from the request, so nothing a visitor types reaches the prompt.
export function resolveTopic(yearLevel, topicId) {
  if (!TOPIC_TEST_YEARS.includes(yearLevel) || typeof topicId !== "string") return null;
  for (const g of getTopicGroupsForLevel(yearLevel, "maths", [yearLevel])) {
    const t = g.topics.find((x) => x.id === topicId);
    if (t) return { yearLevel, topicId, label: t.label, desc: t.desc, strand: g.strand };
  }
  return null;
}

function textOf(message) {
  return message.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
}

// Whole job (both halves, any retries) has to finish inside the request's
// 300s limit, so a retry only happens if there's clearly time for it.
const QUESTIONS_RETRY_BEFORE_MS = 90_000;
const ANSWERS_RETRY_BEFORE_MS = 150_000;

async function writeTest(topic, { savedQuestions, onQuestions } = {}) {
  const started = Date.now();
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const ask = async ({ system, user, maxTokens, thinking }) => {
    const m = await anthropic.messages.create({
      model: MODEL,
      max_tokens: maxTokens + (thinking || 0),
      ...(thinking ? { thinking: { type: "enabled", budget_tokens: thinking } } : {}),
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: user }],
    });
    return sanitizeArtifacts(textOf(m));
  };

  // Questions: reuse ones saved by an earlier run that didn't finish.
  let questions = savedQuestions || "";
  while (!questions || (findKatexErrors(questions).length && Date.now() - started < QUESTIONS_RETRY_BEFORE_MS)) {
    questions = await ask({
      system: Q_SYSTEM,
      user: swaps(buildFullTestQuestionsMessage({
        studentName: "Any student in this year level (a general practice test)",
        yearLevel: topic.yearLevel,
        subject: "maths",
        levelLabel: topic.yearLevel,
        topicLabel: topic.label,
        topicDescription: topic.desc,
      })),
      maxTokens: 4000,
    });
    if (!questions) throw new Error("empty test");
    if (Date.now() - started >= QUESTIONS_RETRY_BEFORE_MS) break;
  }
  if (!savedQuestions) await onQuestions?.(questions);

  const answersStarted = Date.now();
  let answers = "";
  while (!answers || (findKatexErrors(answers).length && Date.now() - started < ANSWERS_RETRY_BEFORE_MS)) {
    answers = await ask({
      system: A_SYSTEM,
      user: buildFullTestAnswersMessage({
        topicLabel: topic.label,
        levelLabel: topic.yearLevel,
        subject: "maths",
        questionsMarkdown: questions,
      }),
      maxTokens: 4000,
      thinking: ANSWER_THINKING,
    });
    if (!answers) throw new Error("empty answer key");
    if (Date.now() - started >= ANSWERS_RETRY_BEFORE_MS) break;
  }
  console.log(`[topic-test] ${topic.yearLevel} ${topic.label}: questions ${answersStarted - started}ms, answers ${Date.now() - answersStarted}ms`);
  return { questions, answers };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Returns the ready topic_tests row, writing it first if needed. Safe to
// call twice at once for the same topic: the unique (year_level, topic_id)
// row means only one caller writes, and the other waits for it.
export async function getOrCreateTopicTest(topic) {
  const admin = createAdminClient();
  const key = { year_level: topic.yearLevel, topic_id: topic.topicId };

  // A written-ahead test wins over anything AI-written for the same topic.
  const written = writtenTopicTest(topic.yearLevel, topic.topicId);
  if (written) {
    const fields = { topic_label: topic.label, questions_md: written.questions_md, answers_md: written.answers_md, status: "ready", ready_at: new Date().toISOString() };
    const { data: row } = await admin.from("topic_tests").select("*").match(key).maybeSingle();
    if (row && row.status === "ready" && row.questions_md === written.questions_md && row.answers_md === written.answers_md) return row;
    const { data: saved, error } = row
      ? await admin.from("topic_tests").update(fields).eq("id", row.id).select("*").single()
      : await admin.from("topic_tests").insert({ ...key, ...fields }).select("*").single();
    if (!error && saved) return saved;
    // Lost an insert race: someone else just saved it.
    const { data: again } = await admin.from("topic_tests").select("*").match(key).maybeSingle();
    if (again?.status === "ready") return again;
  }

  for (let attempt = 0; attempt < 40; attempt++) {
    const { data: row } = await admin.from("topic_tests").select("*").match(key).maybeSingle();
    if (row?.status === "ready") return row;

    const stale = row && (row.status === "failed" || Date.now() - new Date(row.created_at).getTime() > STALE_MS);
    if (row && !stale) {
      await sleep(6000); // someone else is writing it
      continue;
    }

    // Claim the topic: a fresh insert, or take over a failed/stale row.
    let claimed = null;
    const savedQuestions = row?.questions_md || null;
    if (!row) {
      const { data, error } = await admin
        .from("topic_tests")
        .insert({ ...key, topic_label: topic.label })
        .select("id")
        .single();
      if (error) continue; // lost the race, loop and wait
      claimed = data.id;
    } else {
      const { data } = await admin
        .from("topic_tests")
        .update({ status: "pending", created_at: new Date().toISOString() })
        .eq("id", row.id)
        .eq("created_at", row.created_at)
        .select("id")
        .maybeSingle();
      if (!data) continue;
      claimed = data.id;
    }

    try {
      const { questions, answers } = await writeTest(topic, {
        savedQuestions,
        onQuestions: (q) => admin.from("topic_tests").update({ questions_md: q }).eq("id", claimed),
      });
      const { data: done } = await admin
        .from("topic_tests")
        .update({ questions_md: questions, answers_md: answers, status: "ready", ready_at: new Date().toISOString() })
        .eq("id", claimed)
        .select("*")
        .single();
      return done;
    } catch (err) {
      await admin.from("topic_tests").update({ status: "failed" }).eq("id", claimed);
      throw err;
    }
  }
  throw new Error("timed out waiting for the topic test");
}

export async function getTopicTest(id) {
  if (!/^[0-9a-f-]{36}$/i.test(id || "")) return null;
  const admin = createAdminClient();
  const { data } = await admin.from("topic_tests").select("*").eq("id", id).maybeSingle();
  return data || null;
}

// Writes (or reuses) the test for one topic_test_requests row and emails it.
// Used straight after a request, and by sweepStuckRequests for any request
// whose run was cut off before it could send.
export async function processTopicTestRequest(reqRow, { sendEmail }) {
  const admin = createAdminClient();
  const topic = resolveTopic(reqRow.year_level, reqRow.topic_id);
  if (!topic) {
    await admin.from("topic_test_requests").update({ error: "unknown topic" }).eq("id", reqRow.id);
    return;
  }
  try {
    const test = await getOrCreateTopicTest(topic);
    const { data: wl } = await admin
      .from("study_waitlist")
      .select("id, confirmation_sent_at")
      .eq("email", reqRow.email)
      .maybeSingle();
    const newOnWaitlist = !!wl && !wl.confirmation_sent_at;
    await sendEmail({ to: reqRow.email, test, newOnWaitlist });
    await admin.from("topic_test_requests").update({ test_id: test.id, sent_at: new Date().toISOString(), error: null }).eq("id", reqRow.id);
    if (newOnWaitlist) {
      // The test email doubles as the waitlist confirmation.
      await admin.from("study_waitlist").update({ confirmation_sent_at: new Date().toISOString() }).eq("id", wl.id).is("confirmation_sent_at", null);
    }
  } catch (err) {
    console.error("[topic-test] failed", err?.message || err);
    await admin.from("topic_test_requests").update({ error: String(err?.message || err).slice(0, 300) }).eq("id", reqRow.id);
  }
}

// Requests from the last two days that never sent and never recorded an
// error: their run was cut off (the function hit its time limit). Picked up
// by the next request and by the daily cleanup cron.
export async function sweepStuckRequests({ sendEmail, exceptId, limit = 3 }) {
  const admin = createAdminClient();
  const { data: stuck } = await admin
    .from("topic_test_requests")
    .select("id, email, year_level, topic_id")
    .is("sent_at", null)
    .is("error", null)
    .lt("created_at", new Date(Date.now() - STALE_MS).toISOString())
    .gt("created_at", new Date(Date.now() - 2 * 86_400_000).toISOString())
    .order("created_at")
    .limit(limit);
  for (const r of stuck || []) {
    if (r.id === exceptId) continue;
    await processTopicTestRequest(r, { sendEmail });
  }
  return (stuck || []).length;
}

// Every topic for a year level, with whether its test is written yet.
// Used by /api/topic-test/prewrite to write a year's tests in advance.
export async function yearTopicStatus(yearLevel) {
  if (!TOPIC_TEST_YEARS.includes(yearLevel)) return null;
  const admin = createAdminClient();
  const { data: rows } = await admin
    .from("topic_tests")
    .select("topic_id, status, created_at")
    .eq("year_level", yearLevel);
  const byId = Object.fromEntries((rows || []).map((r) => [r.topic_id, r]));
  const topics = getTopicGroupsForLevel(yearLevel, "maths", [yearLevel]).flatMap((g) => g.topics.map((t) => resolveTopic(yearLevel, t.id)));
  return topics.map((t) => {
    const r = byId[t.topicId];
    const done = r?.status === "ready" || !!writtenTopicTest(yearLevel, t.topicId);
    const writing = r?.status === "pending" && Date.now() - new Date(r.created_at).getTime() < STALE_MS;
    const failed = r?.status === "failed";
    return { topic: t, done, writing, failed };
  });
}
