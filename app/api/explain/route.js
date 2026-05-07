import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { checkRateLimit } from "@/lib/rate-limit";

const STATIC_INSTRUCTIONS = `You are a maths tutor assistant. A student is studying a specific topic and needs help understanding one subtopic. Produce EXACTLY this markdown structure:

## What is [SUBTOPIC]?
A clear 3-4 sentence explanation that the student would understand. Use simple language matched to their year level.

## Practice Questions
Provide 4 practice questions with FULL worked solutions. Label each as [Foundation], [Standard], or [Extension].

MATH FORMATTING RULES (the output renders as Markdown, not LaTeX):
- Do NOT use LaTeX, MathJax, or KaTeX. Do NOT use \\frac, \\sin, \\sqrt, \\cdot, or any \\... commands.
- Do NOT wrap math in $...$ or $$...$$ delimiters.
- Write equations in plain text using ordinary symbols: "b / sin(75°) = 10 / sin(40°)", "x² + 5x + 6", "√2", "sin(75°)", "×".
- Put each line of working on its own line.

NEVER REFERENCE TEXTBOOK CHAPTERS, SECTIONS, OR PAGE NUMBERS:
- Do NOT cite "§7D", "Chapter 6", "p.56", "Section 4.2", or any specific textbook locator. Recommend topics generically ("review the relevant section of your textbook on the sine rule") — never invent a section number.

CRITICAL: Every calculation must be 100% correct. Verify each step. If unsure, use simpler numbers.
Keep the total response under 500 words.`;

export async function POST(request) {
  const { topic, subtopic, year_level } = await request.json();
  if (!topic || !subtopic) {
    return NextResponse.json(
      { error: "topic and subtopic required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limit = await checkRateLimit(user.id, "explain", {
    perMinute: 6,
    perHour: 60,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.message },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const userMessage = `Topic: ${topic}
Subtopic: ${subtopic}${year_level ? `\nStudent's year level: ${year_level}` : ""}

Write the explanation and practice questions for "${subtopic}" within the broader topic of "${topic}".`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: [
      {
        type: "text",
        text: STATIC_INSTRUCTIONS,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userMessage }],
  });

  const content = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  return NextResponse.json({ content, usage: message.usage });
}
