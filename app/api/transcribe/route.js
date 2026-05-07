import { NextResponse } from "next/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { checkRateLimit } from "@/lib/rate-limit";

// Whisper hard limit. Roughly 30–90 min of compressed audio depending on bitrate.
const MAX_BYTES = 25 * 1024 * 1024;

const STRUCTURE_INSTRUCTIONS = `You convert a raw transcript of a tutoring session into concise dot-point notes a tutor would jot down. Output ONLY this structure with the exact bullet labels:

- Topics covered: <comma-separated topics actually worked on>
- How the student went: <2–3 phrases on confidence, engagement, accuracy>
- Areas of concern: <specific gaps or sticking points; "none" if not mentioned>
- Homework set: <exact tasks if mentioned; "none" if not>

RULES:
- Stick to what's in the transcript. Do not invent topics or homework.
- Plain text, no markdown, no headings, no LaTeX.
- Keep each bullet to one line where possible (short phrases, not paragraphs).
- Refer to the student by first name only if a name is clearly mentioned, otherwise say "the student".`;

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limit = await checkRateLimit(user.id, "transcribe", {
    perMinute: 2,
    perHour: 15,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.message },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
    return NextResponse.json({ error: "audio file required" }, { status: 400 });
  }
  if (!file.type?.startsWith("audio/")) {
    return NextResponse.json(
      { error: `expected audio file, got ${file.type || "unknown"}` },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      {
        error: `audio file is ${(file.size / 1024 / 1024).toFixed(1)}MB — max 25MB. Trim or compress before uploading.`,
      },
      { status: 413 }
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
  });

  const transcript = transcription.text?.trim() ?? "";
  if (!transcript) {
    return NextResponse.json({ notes: "", transcript: "" });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    system: [
      {
        type: "text",
        text: STRUCTURE_INSTRUCTIONS,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: `TRANSCRIPT:\n${transcript}` }],
  });

  const notes = message.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  return NextResponse.json({ notes, transcript });
}
