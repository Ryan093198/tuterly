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

  const systemPrompt = `You are a blog writer for Tuterly, a Melbourne-based tutoring marketplace for parents. Write a blog post for the /learn section of the website.

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

CTA STRUCTURE (at the end):
- Naturally bridge to Tuterly at the "so what do I do?" moment.
- Mention the parent dashboard and session reports as value props.
- Mention targeted practice questions on the platform.
- Link to [Find a tutor near you](/tutoring) and [browse our tutor directory](/directory).
- End with a tutor recruitment line: *Are you a tutor in Melbourne? [See open positions](/tutor-jobs).*

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

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  let text = response.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("");

  // Strip markdown code fences if present
  text = text.replace(/^```(?:markdown|md)?\n/, "").replace(/\n```$/, "");

  // Safety: strip any em dashes that slipped through
  text = text.replace(/—/g, ".");

  return text.trim();
}
