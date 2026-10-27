// Automated blog writer for Tuterly. Reads competitor snapshots and
// existing blog posts, identifies a content gap, and writes one
// original blog post in content/learn/.
//
// Usage:
//   node agent/blog-writer.js              # write + commit a post
//   node agent/blog-writer.js --dry-run    # print to stdout, no writes
//
// Required env:
//   ANTHROPIC_API_KEY
//
// Outputs:
//   content/learn/{slug}.md - the new blog post
//   agent/topics-written.json - registry of topics already covered

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { COMPETITORS } from "./competitors.js";
import { STUDY_APP_TOPICS } from "./study-topics.js";
import { STUDY_APP } from "../lib/study-app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content", "learn");
const SNAPSHOTS_DIR = path.join(__dirname, "snapshots");
const TOPICS_FILE = path.join(__dirname, "topics-written.json");

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");

const today = new Date().toISOString().slice(0, 10);

main().catch((err) => {
  console.error("[blog-writer] fatal:", err);
  process.exit(1);
});

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[blog-writer] ANTHROPIC_API_KEY is required");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // 1. Gather context
  console.log("[blog-writer] gathering context...");
  const existingPosts = await loadExistingPosts();
  const competitorContent = await loadCompetitorSnapshots();
  const topicsWritten = await loadTopicsWritten();

  // 2. Ask Claude to pick a topic
  console.log("[blog-writer] picking topic...");
  const topic = await pickTopic(client, {
    existingPosts,
    competitorContent,
    topicsWritten,
  });

  if (!topic) {
    console.log("[blog-writer] no suitable topic found. Skipping.");
    return;
  }

  console.log(`[blog-writer] topic: "${topic.title}"`);
  console.log(`[blog-writer] slug: ${topic.slug}`);

  // 3. Check for duplicate slug
  const slugPath = path.join(CONTENT_DIR, `${topic.slug}.md`);
  try {
    await fs.access(slugPath);
    console.log(`[blog-writer] slug "${topic.slug}" already exists. Skipping.`);
    return;
  } catch {
    // Good - file doesn't exist
  }

  // 4. Write the post
  console.log("[blog-writer] writing post...");
  const post = await writePost(client, topic, existingPosts);
  if (!post) {
    console.log("[blog-writer] post failed the claims check twice. Not publishing.");
    return;
  }

  if (isDryRun) {
    console.log("\n=== POST ===\n");
    console.log(post);
    return;
  }

  // 5. Save the post
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(slugPath, post + "\n");
  console.log(`[blog-writer] wrote ${slugPath}`);

  // 6. Update topics registry
  topicsWritten.push({
    date: today,
    slug: topic.slug,
    title: topic.title,
    audience: topic.audience,
    angle: topic.angle,
  });
  await fs.writeFile(TOPICS_FILE, JSON.stringify(topicsWritten, null, 2) + "\n");
  console.log(`[blog-writer] updated topics registry`);
}

// =====================================================================
// Context loaders
// =====================================================================
async function loadExistingPosts() {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const posts = [];
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
      const frontmatter = parseFrontmatter(raw);
      posts.push({
        slug: file.replace(".md", ""),
        title: frontmatter.title || file,
        description: frontmatter.description || "",
        audience: frontmatter.audience || "",
        date: frontmatter.date || "",
      });
    }
    return posts;
  } catch {
    return [];
  }
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split("\n");
  const obj = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    obj[key] = val;
  }
  return obj;
}

async function loadCompetitorSnapshots() {
  const results = [];
  for (const competitor of COMPETITORS) {
    const filePath = path.join(SNAPSHOTS_DIR, `${competitor.slug}.json`);
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(raw);
      // Extract blog-like URLs (paths containing /blog/, /article/, /learn/, /resources/, etc.)
      const blogUrls = (data.urls || []).filter((url) =>
        /\/(blog|article|learn|resource|news|guide|tip|advice|insight|post)\b/i.test(url)
      );
      results.push({
        name: competitor.name,
        slug: competitor.slug,
        totalUrls: (data.urls || []).length,
        blogUrls: blogUrls.slice(0, 100), // cap to keep prompt manageable
      });
    } catch {
      results.push({
        name: competitor.name,
        slug: competitor.slug,
        totalUrls: 0,
        blogUrls: [],
      });
    }
  }
  return results;
}

async function loadTopicsWritten() {
  try {
    const raw = await fs.readFile(TOPICS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// =====================================================================
// Topic selection
// =====================================================================
async function pickTopic(client, { existingPosts, competitorContent, topicsWritten }) {
  const systemPrompt = `You are a content strategist for Tuterly, a Melbourne-based tutoring marketplace. Your job is to identify the single best blog topic to write next.

You will be given:
- The list of blog posts Tuterly has already published
- Topics that have already been written by this automated system (do NOT repeat these)
- Blog URLs from competitor tutoring sites in Australia

Pick a topic that:
1. Competitors are covering but Tuterly isn't yet (content gap)
2. A Melbourne parent would actually search for on Google
3. Hasn't been written already (check both existing posts and the topics-written registry)
4. Is specific and actionable, not generic ("Year 8 maths: algebra fundamentals" not "Why maths matters")
5. Covers the Victorian/Australian curriculum context
6. Where it fits, prefer Years 7 to 10 maths topics where the natural next step for a parent is "have them practise the questions they got wrong". A list of priority ideas is included below; pick one of these when it beats the competitor gaps.

Return your response as JSON with these fields:
- title: The blog post title (clear, parent-facing, no clickbait)
- slug: URL-safe slug (lowercase, hyphens, no special chars)
- description: One-line meta description for SEO (under 160 chars)
- audience: Who this is for (e.g. "Year 7-10 parents", "VCE students", "Primary parents")
- angle: 2-3 sentences on the specific angle and why this topic matters now
- competitor_inspiration: Which competitor URL(s) inspired this choice

If no good topic exists (all gaps are already covered), return {"skip": true}.`;

  const userPrompt = `Existing Tuterly blog posts:
${existingPosts.map((p) => `- "${p.title}" (${p.audience}) [${p.slug}]`).join("\n")}

Topics already written by automated system (DO NOT REPEAT):
${topicsWritten.length > 0 ? topicsWritten.map((t) => `- "${t.title}" [${t.slug}] (${t.date})`).join("\n") : "None yet."}

Competitor blog content:
${competitorContent
  .map(
    (c) =>
      `### ${c.name} (${c.totalUrls} total pages, ${c.blogUrls.length} blog URLs)\n${
        c.blogUrls.length > 0
          ? c.blogUrls.map((u) => `- ${u}`).join("\n")
          : "No blog URLs detected."
      }`
  )
  .join("\n\n")}

Priority topic ideas (Years 7 to 10 maths, pick one if it is the best option and not already covered):
${STUDY_APP_TOPICS.map((t) => `- ${t}`).join("\n")}

Pick the single best topic to write next. Return JSON only.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("");

  // Extract JSON from response (might be wrapped in ```json blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("[blog-writer] couldn't parse topic response:", text);
    return null;
  }

  const topic = JSON.parse(jsonMatch[0]);
  if (topic.skip) return null;
  return topic;
}

// =====================================================================
// Tuterly Study facts + CTA (single source: lib/study-app.js)
// =====================================================================
const STUDY_APP_FACTS_BLOCK = `- An iPhone app for Years 7 to 10 maths (Victorian Curriculum 2.0), made by Bayside Academics. No Android version yet.
- A student snaps a photo of a question they got wrong. It is saved with a full worked solution, hidden behind "Show solution" so they can try again first.
- Straight away the app makes a similar question on the same concept that is genuinely different, not the same question with the numbers changed, with its own worked solution. Each generated question is solved a second time by an independent check.
- Each question goes To fix, then Learning, then Mastered: a star for each similar question right, mastered at three stars (or "I've got it"). Then they can try a harder one. A Practice tab has Test any topic (a short test on any topic in their year), Fix my mistakes, Study notes (a one-page revision sheet) and a weekly review. Students can upload a whole test. XP, stars, a weekly streak and weekly goals.
- Wrong answers get "Explain this": a short explanation of the step that went wrong.
- Parents link with a code and see a weekly summary and test scores, not their child's photos. Tutors can link too and set snap goals.
- Price: a 1-week free trial, then $7.99 a week. Carefully designed by Australian educators at Bayside Academics, one of the leading tutoring companies in Melbourne; topics follow the Victorian Curriculum 2.0. Students can also upload a whole school test (photos, a PDF or a Word document); the app finds each question, automatically stores the ones marked wrong and writes a fresh question on each.
- ${STUDY_APP.stage === "live" ? "It is free to download on the App Store." : "It is not on the App Store yet: say it is coming soon to the App Store. Never say it can be downloaded now."}`;

const STUDY_APP_CTA_BLOCK = `## Turn the questions they get wrong into practice

Got some of these wrong? Snap them in [{{STUDY_APP}}](/) and get a fresh version to practise until they're mastered. It works alongside a tutor or on its own.`;

// Claims a post must not make. Checked after writing; one retry with the
// problems listed, then the post is dropped rather than published.
function findClaimProblems(text) {
  const body = text.replace(/^---[\s\S]*?---/, "");
  const problems = [];
  const checks = [
    [/\d+(\.\d+)?\s?%|\bper ?cent\b/i, "uses a percentage"],
    [/guarantee/i, "uses 'guarantee'"],
    [/more effective|most effective|proven to/i, "makes an effectiveness claim"],
    [/(improve|boost|lift|raise)s? (their |your child's |)(marks|grades|results|atar|scores)/i, "promises better marks or results"],
    [/\b\d[\d,]*\+? (students|families|parents|downloads|users)\b/i, "states a count of students/families/users"],
    [/—/, "contains an em dash"],
  ];
  for (const [re, label] of checks) {
    const m = body.match(re);
    if (m) problems.push(`${label}: "${m[0]}"`);
  }
  return problems;
}

// =====================================================================
// Post writing
// =====================================================================
async function writePost(client, topic, existingPosts) {
  // Read two existing posts in full as style examples
  const exampleSlugs = existingPosts.slice(0, 2).map((p) => p.slug);
  const examples = [];
  for (const slug of exampleSlugs) {
    try {
      const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf-8");
      examples.push(raw);
    } catch {
      // skip
    }
  }

  const systemPrompt = `You are a blog writer for Tuterly, a Melbourne-based tutoring and learning company (part of Bayside Academics) whose main product is the ${STUDY_APP.name} app. Write a blog post for the /learn section of the website.

STRICT STYLE RULES:
- Write for Australian parents. Warm, direct, knowledgeable tone.
- NEVER use em dashes. Use full stops, commas, or rewrite the sentence.
- Lean persuasive but not salesy. You're a knowledgeable friend, not a marketer.
- Include both angles: struggling students AND extension/enrichment for high performers.
- Reference the Victorian/Australian curriculum specifically where relevant.
- Use ## for section headings. No H1 (that comes from the title).
- Keep paragraphs short. 2-4 sentences max.
- Total length: 600-900 words (not including frontmatter).
- DO NOT paraphrase or copy competitor content. Write entirely original material.
- DO NOT include any em dashes (the character —). This is critical.

FACTS AND HONESTY (Australian Consumer Law applies to this content):
- NEVER invent statistics, percentages, survey results, study findings, school names, results or quotes. If you are not certain a figure comes from a named official source (VCAA, ACARA, the NAPLAN national report), describe it in words instead of giving a number.
- Do not promise better marks, grades, ATARs or results, and do not say any product or service is "more effective" than another.
- Do not cite research unless you link the real source.

ABOUT ${STUDY_APP.name.toUpperCase()} (the only facts you may state about the app):
${STUDY_APP_FACTS_BLOCK}

CTA STRUCTURE (at the end):
- Bridge naturally at the "so what do I do?" moment.
- For posts about Years 7 to 10 maths, end with this exact block (keep {{STUDY_APP}} as written; the site fills in the name):

${STUDY_APP_CTA_BLOCK}

- For other posts (English, science, primary, VCE), end without a call to action of your own; the site adds the app card. The only call to action on the site is the ${STUDY_APP.name} app.
- Never link to /directory, /find-a-tutor, /get-started, /tutor-jobs, /worksheets or /practice-maths-tests-primary, and never offer free worksheets, printable tests or a test builder: they are no longer on the site.

FRONTMATTER FORMAT:
---
title: "..."
description: "..."
date: "${today}"
audience: "..."
published: true
---`;

  const userPrompt = `Here are two existing Tuterly blog posts for tone reference:

${examples.map((e, i) => `=== EXAMPLE ${i + 1} ===\n${e}`).join("\n\n")}

Now write a new post on this topic:
Title: ${topic.title}
Slug: ${topic.slug}
Description: ${topic.description}
Audience: ${topic.audience}
Angle: ${topic.angle}

Write the complete markdown file including frontmatter. Return ONLY the markdown, no commentary.`;

  const messages = [{ role: "user", content: userPrompt }];
  for (let attempt = 1; attempt <= 2; attempt++) {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: systemPrompt,
      messages,
    });

    let text = response.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("");

    // Strip markdown code fences if present
    text = text.replace(/^```(?:markdown|md)?\n/, "").replace(/\n```$/, "");

    // Safety: strip any em dashes that slipped through
    text = text.replace(/—/g, ".");
    text = text.trim();

    const problems = findClaimProblems(text);
    if (problems.length === 0) return text;
    console.warn(`[blog-writer] attempt ${attempt} failed the claims check:`, problems);
    messages.push(
      { role: "assistant", content: text },
      {
        role: "user",
        content: `Rewrite the whole post fixing these problems. Remove the claims rather than rewording them into similar claims:\n${problems.map((p) => `- ${p}`).join("\n")}\n\nReturn ONLY the markdown.`,
      }
    );
  }
  return null;
}
