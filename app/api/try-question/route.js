import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/lib/supabase-admin";
import { trustedClientIp } from "@/lib/client-ip";
import { isHoneypotTripped } from "@/lib/public-form-guard";
import { sanitizeGenerated } from "@/lib/sanitize-generated";
import { findKatexErrors } from "@/lib/markdown-katex-validate";
import { TRY_SYSTEM, TRY_TOOL, CHECK_SYSTEM, CHECK_TOOL } from "@/lib/try-question-prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

// POST /api/try-question
//   The home page "Try it" demo. One maths question (a photo or typed)
//   in; the question as read, a worked solution, and one reworked question
//   with its own solution out.
//
// Cost and abuse limits (public_request_log, endpoint "try_question"):
//   - First try per IP per 24 hours: no email needed.
//   - After that: an email that is already on study_waitlist (the client
//     signs it up through /api/study-waitlist first) unlocks EXTRA more.
//   - At most 2 a minute per IP, and a site-wide daily cap.
// Photos are sent to the model to read the question and are never stored.

const ENDPOINT = "try_question";
const FREE_TRIES = 1;
const EXTRA_WITH_EMAIL = Number(process.env.TRY_EXTRA_WITH_EMAIL) || 3;
const SITE_DAILY_CAP = Number(process.env.TRY_SITE_DAILY_CAP) || 300;
const MAX_IMAGE_CHARS = 7_000_000; // ~5 MB of base64
const MAX_TEXT = 1200;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const dashes = (s) => (typeof s === "string" ? s.replace(/\s*[–—]\s*/g, ", ") : s);
const clean = (s) => dashes(sanitizeGenerated(String(s || "").trim()));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Something went wrong reading that. Try again." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Something went wrong reading that. Try again." }, { status: 400 });
  }
  if (isHoneypotTripped(body)) return NextResponse.json({ ok: false, reason: "Try again in a moment." });

  // Input: a data URL image, or typed text.
  let image = null;
  if (typeof body.image === "string" && body.image.startsWith("data:")) {
    const m = body.image.match(/^data:([a-z/+-]+);base64,([A-Za-z0-9+/=]+)$/);
    if (!m || !IMAGE_TYPES.has(m[1])) {
      return NextResponse.json({ error: "Please use a JPG or PNG photo." }, { status: 400 });
    }
    if (m[2].length > MAX_IMAGE_CHARS) {
      return NextResponse.json({ error: "That photo is too large. Try a smaller one." }, { status: 400 });
    }
    image = { media_type: m[1], data: m[2] };
  }
  const text = typeof body.text === "string" ? body.text.trim().slice(0, MAX_TEXT) : "";
  if (!image && !text) {
    return NextResponse.json({ error: "Add a photo of a question, or type one in." }, { status: 400 });
  }

  const ip = trustedClientIp(request) || (process.env.NODE_ENV !== "production" ? "local-dev" : null);
  if (!ip) {
    return NextResponse.json({ error: "We couldn't check your connection. Try again shortly." }, { status: 400 });
  }

  const admin = createAdminClient();
  const dayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const minAgo = new Date(Date.now() - 60 * 1000).toISOString();
  const countSince = async (since, byIp) => {
    let q = admin.from("public_request_log").select("id", { count: "exact", head: true }).eq("endpoint", ENDPOINT).gte("created_at", since);
    if (byIp) q = q.eq("ip", ip);
    const { count, error } = await q;
    if (error) throw error;
    return count ?? 0;
  };

  let usedToday;
  try {
    const [siteToday, ipToday, ipMinute] = await Promise.all([countSince(dayAgo, false), countSince(dayAgo, true), countSince(minAgo, true)]);
    if (siteToday >= SITE_DAILY_CAP) {
      return NextResponse.json({ error: "Lots of people are trying this right now. Please try again tomorrow." }, { status: 503 });
    }
    if (ipMinute >= 2) {
      return NextResponse.json({ error: "One at a time, please. Try again in a minute." }, { status: 429 });
    }
    usedToday = ipToday;
  } catch (e) {
    console.error("[try-question] limiter error:", e?.message || e);
    return NextResponse.json({ error: "Something went wrong. Try again in a moment." }, { status: 500 });
  }

  if (usedToday >= FREE_TRIES) {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    let onList = false;
    if (email) {
      const pattern = email.replace(/[\\%_]/g, (c) => `\\${c}`);
      const { data } = await admin.from("study_waitlist").select("id").ilike("email", pattern).limit(1);
      onList = !!(data && data.length);
    }
    if (!onList) {
      return NextResponse.json({ need_email: true }, { status: 402 });
    }
    if (usedToday >= FREE_TRIES + EXTRA_WITH_EMAIL) {
      return NextResponse.json(
        { limit: true, error: "That’s all the free tries for today. Come back tomorrow, or sign up early for the app to practise as many as you like." },
        { status: 429 }
      );
    }
  }

  // Reserve this try before the model call so parallel requests can't
  // skip the limit; released if the call fails.
  const { data: reserved } = await admin.from("public_request_log").insert({ ip, endpoint: ENDPOINT }).select("id").single();
  const release = async () => {
    if (reserved?.id) await admin.from("public_request_log").delete().eq("id", reserved.id);
  };

  const content = [];
  if (image) content.push({ type: "image", source: { type: "base64", media_type: image.media_type, data: image.data } });
  content.push({ type: "text", text: text ? `The question (typed by the visitor):\n${text}` : "The question is in the photo." });

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const callTool = async (system, tool, messages, maxTokens) => {
    const m = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      tools: [tool],
      tool_choice: { type: "tool", name: tool.name },
      messages,
    });
    const block = m.content.find((b) => b.type === "tool_use");
    return block ? block.input : null;
  };
  const generate = (messages) => callTool(TRY_SYSTEM, TRY_TOOL, messages, 2500);
  // Solve the new question again, independently, and compare answers.
  const check = (o) =>
    callTool(CHECK_SYSTEM, CHECK_TOOL, [{ role: "user", content: `Question:\n${o.new_question}\n\nProposed answer: ${o.new_answer}` }], 1200);
  const latexOk = (o) => findKatexErrors([o.question, o.solution, o.new_question, o.new_solution].join("\n\n")).length === 0;

  let out;
  let verified = false;
  try {
    const started = Date.now();
    const first = [{ role: "user", content }];
    out = await generate(first);
    if (out?.ok && out.new_question) {
      const c = await check(out);
      verified = !!(c?.matches && c?.question_ok) && latexOk(out);
      // One redo with the checker's note, if there's time (60s function cap).
      if (!verified && Date.now() - started < 28_000) {
        const note = c && !(c.matches && c.question_ok)
          ? `A checker solved your new question and got ${c.my_answer}. ${c.problem || ""}`
          : "Some of the LaTeX would not render.";
        const again = await generate([
          ...first,
          { role: "assistant", content: [{ type: "text", text: "Here is my answer." }] },
          { role: "user", content: `${note} Please write a different new question (same rules) and call the tool again.` },
        ]);
        if (again?.ok && again.new_question && Date.now() - started < 48_000) {
          const c2 = await check(again);
          if (c2?.matches && c2?.question_ok && latexOk(again)) {
            out = again;
            verified = true;
          }
        }
      }
    }
  } catch (e) {
    await release();
    console.error("[try-question] model error:", e?.message || e);
    return NextResponse.json({ error: "We couldn’t work on that one just now. Try again in a moment." }, { status: 502 });
  }

  if (out?.ok && out.new_question && !verified) {
    // Never show a fresh question we couldn't double-check, and don't
    // count it against their tries.
    await release();
    return NextResponse.json({
      ok: false,
      reason: "We couldn’t write a fresh version we were sure of this time. Try again, or try a different question.",
    });
  }

  if (!out || !out.ok || !out.new_question) {
    await release(); // not maths or unreadable: doesn't use up a try
    return NextResponse.json({
      ok: false,
      reason: dashes(out?.reason) || "We couldn’t read a maths question there. Try a clearer photo of one question, or type it in.",
    });
  }

  return NextResponse.json({
    ok: true,
    topic: clean(out.topic),
    question: clean(out.question),
    solution: clean(out.solution),
    answer: clean(out.answer),
    new_question: clean(out.new_question),
    what_changed: clean(out.what_changed),
    new_solution: clean(out.new_solution),
    new_answer: clean(out.new_answer),
    tries_left_today: Math.max(0, (usedToday >= FREE_TRIES ? FREE_TRIES + EXTRA_WITH_EMAIL : FREE_TRIES) - usedToday - 1),
  });
}
