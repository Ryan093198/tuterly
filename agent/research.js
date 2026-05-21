// Weekly competitor-intel agent. Fetches each competitor's sitemap,
// diffs against the previous snapshot, samples titles + meta
// descriptions from new pages, then asks Claude to produce a
// markdown intel report.
//
// Usage:
//   node agent/research.js                    # full run, commits snapshots + report
//   node agent/research.js --dry-run          # no writes, prints report to stdout
//   node agent/research.js --competitor=cluey # only run for one competitor
//
// Required env:
//   ANTHROPIC_API_KEY
//
// Outputs:
//   agent/snapshots/{slug}.json - latest URL set for diffing next run
//   agent/competitor-intel/YYYY-MM-DD.md - the weekly report

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { COMPETITORS } from "./competitors.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_DIR = path.join(__dirname, "snapshots");
const REPORTS_DIR = path.join(__dirname, "competitor-intel");
const USER_AGENT = "TuterlyResearchBot/1.0 (+https://www.tuterly.com.au)";
const FETCH_TIMEOUT_MS = 15000;
const MAX_NEW_PAGES_TO_INSPECT = 25;
const REQUEST_DELAY_MS = 500;

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const competitorFilter = args
  .find((a) => a.startsWith("--competitor="))
  ?.split("=")[1];

const today = new Date().toISOString().slice(0, 10);

main().catch((err) => {
  console.error("[research] fatal:", err);
  process.exit(1);
});

async function main() {
  await fs.mkdir(SNAPSHOTS_DIR, { recursive: true });
  await fs.mkdir(REPORTS_DIR, { recursive: true });

  const targets = competitorFilter
    ? COMPETITORS.filter((c) => c.slug === competitorFilter)
    : COMPETITORS;

  if (targets.length === 0) {
    console.error(`No competitors match "${competitorFilter}"`);
    process.exit(1);
  }

  const tuterlyUrls = await loadOurSitemap();

  const intel = [];
  for (const competitor of targets) {
    console.log(`[research] ${competitor.slug}: fetching sitemap...`);
    try {
      const result = await researchCompetitor(competitor);
      intel.push(result);
    } catch (err) {
      console.error(`[research] ${competitor.slug} failed:`, err.message);
      intel.push({
        competitor,
        error: err.message,
        urls: [],
        newUrls: [],
        removedUrls: [],
        newPageMeta: [],
      });
    }
  }

  console.log("[research] summarising with Claude...");
  const report = await summariseWithClaude({ intel, tuterlyUrls });

  if (isDryRun) {
    console.log("\n=== REPORT ===\n");
    console.log(report);
    return;
  }

  // Save snapshots (only for runs that actually succeeded)
  for (const entry of intel) {
    if (entry.error) continue;
    const snapshotPath = path.join(
      SNAPSHOTS_DIR,
      `${entry.competitor.slug}.json`
    );
    await fs.writeFile(
      snapshotPath,
      JSON.stringify(
        { capturedAt: today, urls: entry.urls.sort() },
        null,
        2
      ) + "\n"
    );
  }

  const reportPath = path.join(REPORTS_DIR, `${today}.md`);
  await fs.writeFile(reportPath, report + "\n");
  console.log(`[research] wrote ${reportPath}`);
}

// =====================================================================
// Per-competitor research
// =====================================================================
async function researchCompetitor(competitor) {
  const urls = await fetchSitemapUrls(competitor.sitemap);
  if (urls.length === 0) {
    throw new Error("Sitemap returned zero URLs");
  }

  const prev = await loadSnapshot(competitor.slug);
  const prevSet = new Set(prev?.urls ?? []);
  const newUrls = urls.filter((u) => !prevSet.has(u));
  const removedUrls = (prev?.urls ?? []).filter((u) => !urls.includes(u));

  // Sample new pages for title + meta description so the LLM has
  // concrete content to summarise. Limit to MAX so cost stays bounded.
  const sampleUrls = newUrls.slice(0, MAX_NEW_PAGES_TO_INSPECT);
  const newPageMeta = [];
  for (const url of sampleUrls) {
    try {
      const meta = await fetchPageMeta(url);
      newPageMeta.push({ url, ...meta });
    } catch (err) {
      newPageMeta.push({ url, error: err.message });
    }
    await sleep(REQUEST_DELAY_MS);
  }

  return {
    competitor,
    urls,
    newUrls,
    removedUrls,
    newPageMeta,
    isBaseline: !prev,
  };
}

// =====================================================================
// Network helpers
// =====================================================================
async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": USER_AGENT },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} on ${url}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchSitemapUrls(sitemapUrl) {
  const xml = await fetchWithTimeout(sitemapUrl);
  // Sitemap index? Recurse one level.
  if (/<sitemapindex/.test(xml)) {
    const childSitemaps = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1].trim()
    );
    const all = [];
    for (const child of childSitemaps) {
      try {
        const childUrls = await fetchSitemapUrls(child);
        all.push(...childUrls);
      } catch (err) {
        console.warn(`[research] skipping ${child}: ${err.message}`);
      }
    }
    return [...new Set(all)];
  }
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim()
  );
  return [...new Set(urls)];
}

async function fetchPageMeta(url) {
  const html = await fetchWithTimeout(url);
  const head = html.slice(0, 8000); // titles + meta tags live in head
  const title =
    head.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
  const description =
    head.match(
      /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i
    )?.[1]?.trim() ?? null;
  const ogTitle =
    head.match(
      /<meta\s+[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i
    )?.[1]?.trim() ?? null;
  return { title, description, ogTitle };
}

// =====================================================================
// Snapshot persistence
// =====================================================================
async function loadSnapshot(slug) {
  const filePath = path.join(SNAPSHOTS_DIR, `${slug}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return null;
    throw err;
  }
}

async function loadOurSitemap() {
  // Inline static list - the Next.js sitemap requires building the app
  // which is expensive for a research script. The agent uses this for
  // gap analysis ("they have X, we don't") so a periodic refresh of
  // this list is fine.
  return [
    "/parents",
    "/tutors",
    "/centres",
    "/worksheets",
    "/directory",
    "/learn",
    "/atar-planner",
    "/tutoring",
    "/cluey-alternative",
    "/tutor-doctor-alternative",
    "/best-tutoring-melbourne",
    "/tutoring-prices-melbourne",
    "/vce-tutoring",
    "/online-tutoring-melbourne",
    "/scholarship-test-prep",
    "/sample-report",
  ];
}

// =====================================================================
// Claude summarisation
// =====================================================================
async function summariseWithClaude({ intel, tuterlyUrls }) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return generateFallbackReport({ intel });
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const intelPayload = intel.map((entry) => ({
    name: entry.competitor.name,
    slug: entry.competitor.slug,
    homepage: entry.competitor.homepage,
    error: entry.error ?? null,
    isBaseline: entry.isBaseline ?? false,
    totalUrls: entry.urls.length,
    newCount: entry.newUrls.length,
    removedCount: entry.removedUrls.length,
    newPageSample: entry.newPageMeta.slice(0, 25),
    removedSample: entry.removedUrls.slice(0, 15),
  }));

  const systemPrompt = `You are a competitive-intelligence analyst for Tuterly, a Melbourne tutoring marketplace. Each week you review what direct competitors have published or changed on their websites and produce a focused intel report for the Tuterly founder.

Your report should:
- Lead with the single most strategically important observation
- Group findings per competitor, then a cross-competitor "patterns" section
- Be specific: name new topics, page types, pricing changes, positioning shifts
- Flag opportunities for Tuterly (topics they cover that we don't, angles we could improve on)
- Skip noise (theme tweaks, generic blog SEO posts, unchanged content)
- Use plain prose - no SEO jargon, no marketing fluff
- Keep total length under ~800 words

Do not invent details. Only report on what's in the data you're given. If a competitor errored, say so briefly and move on.`;

  const userPrompt = `Tuterly's own public site has these top-level paths (so you can spot topic gaps):
${tuterlyUrls.map((u) => "- " + u).join("\n")}

Competitor data for the week of ${today}:
${JSON.stringify(intelPayload, null, 2)}

Write the markdown intel report. Start with a top-level heading "# Tuterly competitor intel - ${today}".`;

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n");
  return text;
}

function generateFallbackReport({ intel }) {
  // Used when ANTHROPIC_API_KEY isn't set - useful for local smoke tests
  let out = `# Tuterly competitor intel - ${today}\n\n`;
  out += `_Generated without LLM (ANTHROPIC_API_KEY missing). Raw data only._\n\n`;
  for (const entry of intel) {
    out += `## ${entry.competitor.name}\n\n`;
    if (entry.error) {
      out += `Error: ${entry.error}\n\n`;
      continue;
    }
    if (entry.isBaseline) {
      out += `Baseline snapshot: ${entry.urls.length} URLs captured.\n\n`;
      continue;
    }
    out += `${entry.urls.length} URLs total, ${entry.newUrls.length} new, ${entry.removedUrls.length} removed.\n\n`;
    if (entry.newPageMeta.length > 0) {
      out += `### New pages\n\n`;
      for (const p of entry.newPageMeta) {
        out += `- [${p.title || p.url}](${p.url})${
          p.description ? `\n  ${p.description}` : ""
        }\n`;
      }
      out += "\n";
    }
  }
  return out;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
