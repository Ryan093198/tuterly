import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { buildReportPrompt } from "@/lib/report-prompt";
import { signedPhotoUrl } from "@/app/dashboard/tutor/session/actions";
import { checkRateLimit } from "@/lib/rate-limit";
import { escapeProseDollars } from "@/lib/markdown-money-safety";

export const runtime = "nodejs";
// Reports with photos + LaTeX + Sonnet routinely take 30-50s. Was relying
// on the platform default which is too short for the slow path.
export const maxDuration = 60;

export async function POST(request) {
  try {
    return await handle(request);
  } catch (err) {
    // Without this, an unhandled exception (Anthropic call failure, DB
    // glitch, etc.) bubbles to Next's default HTML error page — the client
    // then fails to parse it as JSON and the tutor sees a cryptic
    // "Unexpected token" instead of the real cause.
    console.error("[generate] unhandled error:", err);
    const message =
      err?.message && typeof err.message === "string"
        ? err.message
        : "Report generator failed. Try again in a moment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handle(request) {
  const { session_id } = await request.json();
  if (!session_id) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limit = await checkRateLimit(user.id, "generate", {
    perMinute: 3,
    perHour: 30,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.message },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const { data: session } = await supabase
    .from("sessions")
    .select("id, date, duration_minutes, raw_notes, tutor_id, student_id, subject")
    .eq("id", session_id)
    .eq("tutor_id", user.id)
    .single();
  if (!session) {
    return NextResponse.json({ error: "session not found" }, { status: 404 });
  }

  const { data: studentRow } = await supabase
    .from("students")
    .select(
      "first_name, last_name, year_level, working_level, school, subject, subjects, goals, concerns, term_outline"
    )
    .eq("id", session.student_id)
    .single();

  // Sessions can override the student's curriculum framework so a tutor
  // teaching the same kid both subjects doesn't need duplicate student
  // records. Fall back to the student's subject when the session hasn't
  // picked one.
  const student = studentRow
    ? { ...studentRow, subject: session.subject || studentRow.subject }
    : studentRow;

  const { data: tutor } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const { data: resources } = await supabase
    .from("resources")
    .select("name, category, content, notes")
    .eq("student_id", session.student_id);

  const { data: photoRows } = await supabase
    .from("session_photos")
    .select("file_url")
    .eq("session_id", session_id)
    .order("created_at", { ascending: true });

  const photoUrls = (
    await Promise.all(
      (photoRows ?? []).map((p) => signedPhotoUrl(p.file_url))
    )
  ).filter(Boolean);

  const { system, user: userMessage } = buildReportPrompt({
    student,
    session,
    resources: resources ?? [],
    tutor,
  });

  const userContent = [
    ...photoUrls.map((url) => ({
      type: "image",
      source: { type: "url", url },
    })),
    { type: "text", text: userMessage },
  ];

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    system,
    messages: [{ role: "user", content: userContent }],
  });

  const content = escapeProseDollars(
    message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
  );

  const { data: existing } = await supabase
    .from("reports")
    .select("id")
    .eq("session_id", session_id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("reports")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase.from("reports").insert({ session_id, content });
  }

  await supabase
    .from("sessions")
    .update({ status: "report_generated" })
    .eq("id", session_id);

  return NextResponse.json({
    content,
    usage: message.usage,
  });
}
