// One-off migration: normalise existing `students.school` values to canonical
// names from the ACARA Australian Schools List.
//
// Usage:
//   1. Dry-run (writes a plan to scripts/school-migration-plan.json):
//        node scripts/migrate-school-names.js
//   2. Review the plan file. Each row has the current value, the proposed
//      canonical name, and a confidence label. Edit the file to remove or
//      change any mapping you don't want applied.
//   3. Apply the (possibly-edited) plan:
//        node scripts/migrate-school-names.js --apply
//
// Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in the environment (read
// from .env.local if present).

const fs = require("node:fs");
const path = require("node:path");

// Load .env.local manually so the script doesn't depend on dotenv.
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = process.env[m[1]] ?? m[2].replace(/^"|"$/g, "");
  }
}

const { createClient } = require("@supabase/supabase-js");
const schools = require("../lib/schools/australian-schools.json");

const PLAN_PATH = path.join(__dirname, "school-migration-plan.json");
const APPLY = process.argv.includes("--apply");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Set them in .env.local or the shell."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// Build a search index up-front.
const indexed = schools.map((s) => ({
  ...s,
  _name: s.name.toLowerCase(),
  _initials: s.name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .toLowerCase(),
}));

// Normalise an input string the way both sides of comparison should be.
function norm(s) {
  return (s || "").trim().toLowerCase().replace(/\s+/g, " ");
}

// Score a school against an input. Returns { school, score, confidence }.
// Higher is better. Confidence is "exact" / "high" / "medium" / "low".
function scoreMatch(input) {
  const q = norm(input);
  if (!q) return null;

  const candidates = [];
  for (const s of indexed) {
    let score = 0;
    if (s._name === q) score = 1000;
    else if (s._name.startsWith(q + " ")) score = 600;
    else if (s._name.startsWith(q)) score = 500;
    else if (s._name.includes(" " + q + " ")) score = 350;
    else if (s._name.includes(" " + q)) score = 300;
    else if (s._name.includes(q)) score = 200;
    else if (s._initials === q) score = 250; // BGS → Brighton Grammar School
    if (score > 0) candidates.push({ s, score });
  }

  if (!candidates.length) return null;
  candidates.sort((a, b) => b.score - a.score);
  const top = candidates[0];
  const second = candidates[1];

  // Confidence: exact = 1000; high = top wins clearly; medium = top wins by a bit; low = ambiguous.
  let confidence = "low";
  if (top.score >= 1000) confidence = "exact";
  else if (top.score >= 500 && (!second || top.score - second.score >= 200))
    confidence = "high";
  else if (top.score >= 300 && (!second || top.score - second.score >= 100))
    confidence = "medium";
  else confidence = "low";

  return { school: top.s, score: top.score, confidence };
}

async function buildPlan() {
  // Pull every student's school value (admin client bypasses RLS).
  const { data, error } = await supabase
    .from("students")
    .select("id, first_name, last_name, school")
    .not("school", "is", null);
  if (error) throw error;

  // Group by trimmed input so we only print each variant once for review.
  const byInput = new Map();
  for (const s of data) {
    const raw = (s.school || "").trim();
    if (!raw) continue;
    if (!byInput.has(raw)) byInput.set(raw, []);
    byInput.get(raw).push(s.id);
  }

  const plan = [];
  for (const [input, ids] of byInput) {
    const m = scoreMatch(input);
    plan.push({
      current: input,
      proposed: m?.school?.name ?? null,
      confidence: m?.confidence ?? "no-match",
      suburb: m?.school?.suburb ?? null,
      state: m?.school?.state ?? null,
      apply:
        m && (m.confidence === "exact" || m.confidence === "high") ? true : false,
      affectsStudentIds: ids,
    });
  }

  plan.sort((a, b) => a.current.localeCompare(b.current));
  return plan;
}

async function applyPlan() {
  if (!fs.existsSync(PLAN_PATH)) {
    console.error(
      `No plan at ${PLAN_PATH}. Run without --apply first to generate one, then review it.`
    );
    process.exit(1);
  }
  const plan = JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
  const toApply = plan.filter((p) => p.apply && p.proposed);
  if (!toApply.length) {
    console.log("Nothing flagged with apply=true. Edit the plan and re-run.");
    return;
  }

  console.log(`Applying ${toApply.length} mapping(s)…`);
  let total = 0;
  for (const row of toApply) {
    const { data, error } = await supabase
      .from("students")
      .update({ school: row.proposed })
      .eq("school", row.current)
      .select("id");
    if (error) {
      console.error(`  ✗ ${row.current} → ${row.proposed}:`, error.message);
      continue;
    }
    total += data?.length ?? 0;
    console.log(
      `  ✓ "${row.current}" → "${row.proposed}" (${data?.length ?? 0} rows)`
    );
  }
  console.log(`Done. Updated ${total} student row(s).`);
}

async function main() {
  if (APPLY) {
    await applyPlan();
    return;
  }
  const plan = await buildPlan();
  fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2));
  const stats = plan.reduce((acc, p) => {
    acc[p.confidence] = (acc[p.confidence] || 0) + 1;
    return acc;
  }, {});
  console.log(`Wrote ${plan.length} distinct input(s) to ${path.relative(process.cwd(), PLAN_PATH)}`);
  console.log("By confidence:", stats);
  console.log(
    `Review the plan, edit "apply": true/false on each row as needed, then run with --apply.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
