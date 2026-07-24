import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getCurriculumForStudent } from "@/lib/curriculum";
import { trustedClientIp } from "@/lib/client-ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { hasSoftwareAccess } from "@/lib/entitlements";
import {
  SYSTEM_INSTRUCTIONS,
  buildWorksheetUserMessage,
} from "@/lib/worksheet-prompt";
import {
  findKatexErrors,
  formatErrorsForRetry,
} from "@/lib/markdown-katex-validate";

export const runtime = "nodejs";
// 10 questions with worked solutions in LaTeX comfortably runs 30-50s on
// Sonnet — same shape as /api/practice. 60s is the Vercel cap for non-pro.
export const maxDuration = 60;

const ALLOWED_YEARS = new Set([
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
]);

// Per-IP daily cap. Signed-in users (any role) bypass it.
const DAILY_IP_LIMIT = Number(process.env.WORKSHEET_DAILY_IP_LIMIT) || 1;
// Signed-in free (non-subscribed, no pack) accounts get this many worksheets
// per week; a subscription or purchased pack unlocks unlimited. Anonymous
// visitors keep the public per-IP daily funnel (DAILY_IP_LIMIT) below.
const FREE_WORKSHEET_PER_WEEK = 1;

// If the first generation took longer than this, skip the validate-and-retry
// pass — a second Sonnet call on top would risk Vercel's 60s timeout. Leaves
// ~25s of headroom for the retry to finish if it does fire.
const RETRY_BUDGET_MS = 30_000;

export async function POST(request) {
  try {
    return await handle(request);
  } catch (err) {
    console.error("[worksheets/generate] unhandled error:", err);
    const message =
      err?.message && typeof err.message === "string"
        ? err.message
        : "Worksheet generator failed. Try again in a moment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handle(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const yearLevel = body?.year_level?.toString().trim();
  if (!yearLevel || !ALLOWED_YEARS.has(yearLevel)) {
    return NextResponse.json(
      { error: "Pick a year level between 3 and 10." },
      { status: 400 }
    );
  }
  const topicId = body?.topic_id?.toString().trim() || null;
  const topicLabel = body?.topic_label?.toString().trim();
  if (!topicLabel) {
    return NextResponse.json({ error: "Pick a topic." }, { status: 400 });
  }
  const email = sanitizeEmail(body?.email);

  const ip = trustedClientIp(request);

  // Signed-in visitors bypass the IP cap when they have an active trial
  // or paid subscription. Signed-in without an active subscription falls
  // back to the same 1/day IP cap as anonymous visitors — so the trial
  // upgrade is still the right call to action.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const admin = createAdminClient();

  let bypassCap = false;
  if (user) {
    // Comma-separated env var lets us hand out unlimited access for
    // testing or to specific accounts (eg. founder accounts) without
    // hardcoding emails in the repo. Case-insensitive match on the
    // signed-in user's email.
    const allowlist = (process.env.WORKSHEET_UNLIMITED_EMAILS || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const userEmail = user.email?.toLowerCase();
    if (userEmail && allowlist.includes(userEmail)) {
      bypassCap = true;
    } else {
      // Active subscription OR a purchased pack (software included) lifts the
      // 1/day free cap — same entitlement used by the practice + lesson-plan
      // generators, so all three stay consistent.
      bypassCap = await hasSoftwareAccess(user.id);
    }
  }

  // Audit C8: every signed-in caller is throttled even when they bypass the
  // free-tier IP cap. A $0 trial account previously had NO limit on this route
  // and could loop it to burn unbounded Anthropic credits. The subscription now
  // only lifts the once-a-day free cap; it never removes throttling.
  if (user) {
    const rl = await checkRateLimit(user.id, "worksheets", {
      perDay: 40,
      perHour: 20,
      perMinute: 5,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: rl.message, rate_limited: true },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      );
    }

    // Freemium gate for signed-in free accounts: one free worksheet per week.
    // A subscription or purchased pack (bypassCap) unlocks unlimited; anonymous
    // visitors keep the public per-IP daily funnel below.
    if (!bypassCap) {
      const wk = await checkRateLimit(user.id, "worksheet_free", {
        perWeek: FREE_WORKSHEET_PER_WEEK,
      });
      if (!wk.ok) {
        return NextResponse.json(
          {
            error:
              "You've used your free worksheet for this week. Start a free trial or buy a session pack to unlock unlimited worksheets.",
            need_upgrade: true,
          },
          { status: 402 }
        );
      }
    }
  }

  // Audit C8: anonymous callers must supply a captured email before we spend a
  // model call. This enforces the "enter your email to unlock" gate on the
  // server (it was previously client-side only) and keeps the cost bounded to
  // known leads plus the per-IP cap below.
  if (!user) {
    if (!email) {
      return NextResponse.json(
        { error: "Enter your email to unlock the free worksheet.", need_email: true },
        { status: 403 }
      );
    }
    const { data: known } = await admin
      .from("worksheet_email_signups")
      .select("email")
      .eq("email", email)
      .maybeSingle();
    if (!known) {
      return NextResponse.json(
        { error: "Enter your email to unlock the free worksheet.", need_email: true },
        { status: 403 }
      );
    }
  }

  if (!bypassCap) {
    if (!ip) {
      // No trustworthy IP means we can't rate-limit anonymous abuse; fail
      // closed rather than hand out an uncapped generation.
      return NextResponse.json(
        { error: "Could not verify your request. Please try again." },
        { status: 400 }
      );
    }
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count, error: countErr } = await admin
      .from("worksheet_generations")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", dayAgo);
    if (countErr) {
      console.warn("[worksheets/generate] rate-count failed:", countErr);
    }
    if ((count ?? 0) >= DAILY_IP_LIMIT) {
      return NextResponse.json(
        {
          error:
            "You've used your free worksheet for today. Start a 7-day trial for unlimited worksheets and tutor-quality reports.",
          rate_limited: true,
        },
        { status: 429 }
      );
    }
  }

  // Look up the VCAA descriptor so the prompt can pin difficulty to the
  // year-level standard. Topic id may not be present (free-text fallback);
  // in that case we pass just the human label.
  const lookup = getCurriculumForStudent(yearLevel, [yearLevel], "maths");
  let topicDescription = null;
  if (lookup && !lookup.isVCE && topicId) {
    for (const items of Object.values(lookup.curriculum)) {
      for (const item of items) {
        if (item.code === topicId) {
          topicDescription = item.desc;
          break;
        }
      }
      if (topicDescription) break;
    }
  }

  const variantSeed = body?.variant_seed?.toString().slice(0, 32) || null;

  // Reserve the generation BEFORE the model call (audit C8). Logging it only
  // after ~40s of generation left a wide window where a burst of concurrent
  // requests all read count=0 and all proceeded. Recording it up front makes
  // concurrent requests see the higher count and shrinks that race to a few ms.
  // (A fully atomic increment is the P1 follow-up.) If generation fails we
  // delete the reservation so a transient error doesn't consume the user's cap.
  let reservationId = null;
  {
    const { data: reservation, error: logErr } = await admin
      .from("worksheet_generations")
      .insert({
        ip,
        email,
        year_level: yearLevel,
        topic_id: topicId,
        topic_label: topicLabel,
        question_count: 10,
      })
      .select("id")
      .maybeSingle();
    if (logErr) {
      console.warn("[worksheets/generate] reservation insert failed:", logErr);
    } else {
      reservationId = reservation?.id ?? null;
    }
  }

  async function releaseReservation() {
    if (!reservationId) return;
    await admin.from("worksheet_generations").delete().eq("id", reservationId);
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const userMessage = buildWorksheetUserMessage({
    yearLevel,
    topicLabel,
    topicDescription,
    variantSeed,
  });
  const baseMessages = [{ role: "user", content: userMessage }];

  async function generateOnce(messages) {
    const m = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3500,
      system: [
        {
          type: "text",
          text: SYSTEM_INSTRUCTIONS,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });
    const t = m.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return { message: m, text: t };
  }

  const startedAt = Date.now();
  let worksheetMarkdown;
  try {
    ({ text: worksheetMarkdown } = await generateOnce(baseMessages));
  } catch (e) {
    await releaseReservation();
    throw e;
  }

  // Validate every math block via KaTeX. If anything won't render, the
  // user would see red error text or italicised prose, so we send the
  // bad output back to the model with the exact KaTeX errors and ask for
  // a single redo. Cheaper than serving broken content and forcing a
  // human-triggered regenerate.
  //
  // Skip the retry if the first call already used more than half the
  // function budget — a second 30-40s call on top would hit Vercel's
  // 60s maxDuration cap and the user would see a 504 with nothing
  // saved. Better to ship the slightly-broken first attempt.
  const katexErrors = findKatexErrors(worksheetMarkdown);
  const elapsedMs = Date.now() - startedAt;
  if (katexErrors.length > 0 && elapsedMs < RETRY_BUDGET_MS) {
    console.warn(
      "[worksheets] katex errors, retrying:",
      katexErrors.length,
      "elapsed:",
      elapsedMs
    );
    try {
      const retry = await generateOnce([
        ...baseMessages,
        { role: "assistant", content: worksheetMarkdown },
        { role: "user", content: formatErrorsForRetry(katexErrors) },
      ]);
      if (retry.text) worksheetMarkdown = retry.text;
    } catch (e) {
      // Keep the (valid-enough) first attempt if the retry call fails.
      console.warn("[worksheets] katex retry failed:", e?.message || e);
    }
  } else if (katexErrors.length > 0) {
    console.warn(
      "[worksheets] katex errors but skipping retry — elapsed",
      elapsedMs,
      "exceeds budget",
      RETRY_BUDGET_MS
    );
  }

  if (!worksheetMarkdown) {
    await releaseReservation();
    return NextResponse.json(
      { error: "Generation returned no content. Please try again." },
      { status: 502 }
    );
  }

  // The generation was reserved (logged) before the model call — see above —
  // so there's nothing to log here on success.

  return NextResponse.json({
    content: worksheetMarkdown,
    year_level: yearLevel,
    topic_label: topicLabel,
  });
}

function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  if (t.length > 254) return null;
  return t;
}
