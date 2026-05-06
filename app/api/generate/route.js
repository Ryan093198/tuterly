import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { buildReportPrompt } from "@/lib/report-prompt";
import { signedPhotoUrl } from "@/app/dashboard/tutor/session/actions";

export async function POST(request) {
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

  const { data: session } = await supabase
    .from("sessions")
    .select("id, date, duration_minutes, raw_notes, tutor_id, student_id")
    .eq("id", session_id)
    .eq("tutor_id", user.id)
    .single();
  if (!session) {
    return NextResponse.json({ error: "session not found" }, { status: 404 });
  }

  const { data: student } = await supabase
    .from("students")
    .select(
      "first_name, last_name, year_level, working_level, school, subjects, goals, concerns, term_outline"
    )
    .eq("id", session.student_id)
    .single();

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
    max_tokens: 2500,
    system,
    messages: [{ role: "user", content: userContent }],
  });

  const content = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

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
