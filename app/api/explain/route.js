import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { checkRateLimit } from "@/lib/rate-limit";

const MATHS_INSTRUCTIONS = `You are a maths tutor assistant. A student is studying a specific topic and needs help understanding one subtopic. Produce EXACTLY this markdown structure:

## What is [SUBTOPIC]?
A clear 3-4 sentence explanation that the student would understand. Use simple language matched to their year level.

## Practice Questions
Provide 4 practice questions with FULL worked solutions. Label each as [Foundation], [Standard], or [Extension].

MATH FORMATTING RULES (the output renders Markdown with KaTeX):
- USE LaTeX inside dollar-sign delimiters when notation matters: $...$ for inline, $$...$$ for display math on its own line.
- Use \\frac{a}{b}, \\sqrt{x}, \\sqrt[3]{x}, x^{2}, x_{1}, \\sin, \\cos, \\tan, \\theta, \\pi, \\times, \\div, \\le, \\ge, \\ne, \\approx, \\pm.
- Examples: $\\frac{12}{18} = \\frac{2}{3}$, $\\sqrt{50} = 5\\sqrt{2}$, $\\sin 30° = \\frac{1}{2}$, $x^2 + 5x + 6 = (x+2)(x+3)$.
- Verify every LaTeX expression is balanced (matching {}, ^{}, \\frac{}{}). Mismatched braces will break the page.
- Put each line of working on its own line. Each step can be its own $$...$$ block, or you can use sequential $...$ inlines.
- Plain Unicode (½, x², √2, ×, ÷, ≈, π, θ) is fine for short standalone references outside math blocks.

NEVER REFERENCE TEXTBOOK CHAPTERS, SECTIONS, OR PAGE NUMBERS:
- Do NOT cite "§7D", "Chapter 6", "p.56", "Section 4.2", or any specific textbook locator. Recommend topics generically ("review the relevant section of your textbook on the sine rule") — never invent a section number.

CRITICAL: Every calculation must be 100% correct. Verify each step. If unsure, use simpler numbers.
Keep the total response under 500 words.`;

const ENGLISH_INSTRUCTIONS = `You are an English tutor assistant. A student is studying a specific topic and needs help understanding one subtopic. Produce EXACTLY this markdown structure:

## What is [SUBTOPIC]?
A clear 3-4 sentence explanation that the student would understand. Use simple language matched to their year level. Where helpful, give one short illustrative example sentence or quotation, clearly marked as an example.

## Practice Tasks
Provide 4 practice tasks with sample answers. Label each as [Foundation], [Standard], or [Extension]. Tasks may be writing prompts, grammar/punctuation exercises, comprehension questions, vocabulary tasks, or short analytical responses.

For each task, give a model answer or annotated example in the worked-solution block. Sample answers are exemplars — make it clear they are not the only correct response.

CRITICAL TEXTUAL ACCURACY:
- NEVER fabricate quotations from named texts. If you give an example sentence, write your own — don't claim it's from a specific book unless you're certain of the exact wording.
- NEVER invent character names, plot details, or scene/chapter references for texts you can't verify.
- For grammar examples: double-check your "correct" sentences are actually correct.

FORMATTING:
- Use ordinary punctuation. No LaTeX or other markup.
- Italicise terminology (*metaphor*, *anaphora*) for clarity.
- Use blockquotes (>) for any text excerpts longer than a sentence.

NEVER REFERENCE TEXTBOOK CHAPTERS OR PAGE NUMBERS:
- Do NOT cite specific page numbers, chapter numbers, or Act/Scene/Line references. Describe the moment generically.

Keep the total response under 500 words.`;

export async function POST(request) {
  const { topic, subtopic, year_level, subject } = await request.json();
  const subj = subject === "english" ? "english" : "maths";
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
        text: subj === "english" ? ENGLISH_INSTRUCTIONS : MATHS_INSTRUCTIONS,
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
