import { createHash } from "node:crypto";
import { sectionQuestions } from "@/lib/exam-sections";
import { findWorksheetChapter } from "@/lib/worksheet-chapters";
import { bandSplit } from "@/lib/worksheet-structure";
import { FILL_SYSTEM, buildFillUserMessage, parseFillOutput } from "@/lib/worksheet-prompt";
import { findKatexErrors } from "@/lib/markdown-katex-validate";
import { sanitizeGenerated } from "@/lib/sanitize-generated";
import { checkWorksheet } from "@/lib/worksheet-pool";

// Years 7 to 10 chapter worksheets, built from our question bank first
// (Ryan, 17 Nov 2026):
//   1. Up to 3 questions per ticked subtopic, 10 at most.
//   2. Each slot takes a bank question this student hasn't had: one with a
//      full worked solution if there is one, else one with an answer only.
//      The bank is the checked questions in content/exam-sections (the same
//      ones the exam generator and practice tests use) plus the questions
//      the model has written for worksheets and a second model has checked
//      (table worksheet_bank_questions, status 'verified').
//   3. Only if a student has had every bank question on a subtopic does the
//      model write a new one. New questions are saved to
//      worksheet_bank_questions as 'pending'; a second model then solves
//      each one, and the ones that pass become part of the bank.
// Which questions each student has had is kept in worksheet_bank_serves
// (by hashed email, account and IP, the same keys as the worksheet pool).

const MODEL = "claude-sonnet-4-6";
const hash = (s) => createHash("sha1").update(String(s)).digest("hex").slice(0, 16);
const fileId = (q) => `f:${hash(q.question)}`;

function shuffle(a) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

// Rough difficulty, for putting the picked questions into bands: an
// extended-response question ranks above any short one; then longer
// questions with more working rank higher.
function weight(q) {
  const steps = (String(q.solution).match(/^\s*\d+\.\s/gm) || []).length;
  return (q.kind === "extended" ? 10000 : 0) + String(q.question).length + steps * 60;
}

/** How many questions each ticked subtopic gets: at most 3, `count` in all. */
export function planSlots(sections, count) {
  const k = sections.length;
  const per = new Map(sections.map((s) => [s.code, 0]));
  if (count >= k) {
    const base = Math.min(3, Math.floor(count / k));
    for (const s of sections) per.set(s.code, base);
    let left = count - base * k;
    for (const s of shuffle(sections)) {
      if (left <= 0) break;
      if (per.get(s.code) < 3) {
        per.set(s.code, per.get(s.code) + 1);
        left--;
      }
    }
  } else {
    // More subtopics than questions: spread them evenly through the chapter,
    // starting somewhere different each time.
    const step = k / count;
    const off = Math.random() * step;
    for (let i = 0; i < count; i++) per.set(sections[Math.min(k - 1, Math.floor(off + i * step))].code, 1);
  }
  return sections.flatMap((s) => Array.from({ length: per.get(s.code) }, () => s));
}

const renderCache = new Map();
function renders(q) {
  if (renderCache.has(q.id)) return renderCache.get(q.id);
  const ok = findKatexErrors(`${q.question}\n\n${q.solution || q.answer}`).length === 0;
  renderCache.set(q.id, ok);
  return ok;
}

async function dbQuestions(admin, bankYear, codes) {
  try {
    const { data } = await admin
      .from("worksheet_bank_questions")
      .select("id, section_code, kind, question, answer, solution")
      .eq("bank_year", bankYear)
      .eq("status", "verified")
      .in("section_code", codes)
      .limit(2000);
    return (data || []).map((r) => ({ id: `d:${r.id}`, code: r.section_code, kind: r.kind, question: r.question, answer: r.answer, solution: r.solution }));
  } catch {
    return [];
  }
}

async function seenSet(admin, viewers, ids) {
  if (!viewers.length || !ids.length) return new Set();
  const seen = new Set();
  // .in() lists go in the URL, so ask in chunks.
  for (let i = 0; i < ids.length; i += 150) {
    const { data } = await admin.from("worksheet_bank_serves").select("qid").in("viewer", viewers).in("qid", ids.slice(i, i + 150));
    for (const r of data || []) seen.add(r.qid);
  }
  return seen;
}

export async function recordBankServes(admin, viewers, ids) {
  if (!viewers.length || !ids.length) return;
  const rows = viewers.flatMap((v) => ids.map((qid) => ({ viewer: v, qid })));
  await admin.from("worksheet_bank_serves").upsert(rows, { onConflict: "viewer,qid", ignoreDuplicates: true });
}

/**
 * Pick the bank questions for a chapter worksheet. Returns
 * { chapter, picked: [{ section, q|null, avoid }] } where q is null for a
 * slot the model has to write.
 */
export async function pickFromBank(admin, { yearLevel, chapterNo, codes, count, viewers }) {
  const ch = findWorksheetChapter(yearLevel, chapterNo);
  const want = new Set(codes);
  const sections = ch.sections.filter((s) => want.has(s.code));
  const slots = planSlots(sections, count);

  const fromFiles = sections.flatMap((s) =>
    sectionQuestions(ch.fileYear, s.slug).map((q) => ({ id: fileId(q), code: s.code, kind: q.kind, question: q.question, answer: q.answer, solution: q.solution || "" })),
  );
  const fromDb = await dbQuestions(admin, ch.fileYear, sections.map((s) => s.code));
  // Skip the few bank questions whose maths doesn't render.
  const pool = [...fromFiles, ...fromDb].filter(renders);
  const seen = await seenSet(admin, viewers, pool.map((q) => q.id));

  // At most one extended-response question per subtopic, and no more than
  // the Extension band holds, so the sheet doesn't tilt hard.
  const extCap = bandSplit(count).extension[1] - bandSplit(count).extension[0] + 1;
  let extUsed = 0;
  const used = new Set();
  const picked = [];
  for (const s of sections) {
    const n = slots.filter((x) => x.code === s.code).length;
    if (!n) continue;
    const mine = pool.filter((q) => q.code === s.code);
    const fresh = mine.filter((q) => !seen.has(q.id));
    // Worked solution first, then answer only; random within each.
    const order = [...shuffle(fresh.filter((q) => q.solution)), ...shuffle(fresh.filter((q) => !q.solution))];
    let extHere = 0;
    for (let i = 0; i < n; i++) {
      const q =
        order.find((x) => !used.has(x.id) && (x.kind !== "extended" || (extHere < 1 && extUsed < extCap))) ||
        order.find((x) => !used.has(x.id));
      if (q) {
        used.add(q.id);
        if (q.kind === "extended") {
          extHere++;
          extUsed++;
        }
        picked.push({ section: s, q });
      } else {
        picked.push({ section: s, q: null, avoid: mine.filter((x) => seen.has(x.id)).map((x) => x.question) });
      }
    }
  }
  return { chapter: ch, picked, pool, used };
}

/** Bands for the picked questions (written ones count as their band). */
function arrange(picked, count) {
  const plan = bandSplit(count);
  const sizes = [plan.foundation, plan.standard, plan.extension].map(([a, b]) => b - a + 1);
  const ranked = [...picked].sort((a, b) => weight(a.q) - weight(b.q));
  const bands = [ranked.slice(0, sizes[0]), ranked.slice(sizes[0], sizes[0] + sizes[1]), ranked.slice(sizes[0] + sizes[1])];
  // Within a band, keep textbook order.
  const order = (x) => x.section.code.replace(/^(\d+)([A-Z]+)$/, (_, n, l) => `${n.padStart(2, "0")}${l}`);
  return bands.map((b) => b.sort((a, b2) => order(a).localeCompare(order(b2))));
}

const WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** The worksheet markdown, in the same layout as a written worksheet. */
export function assembleWorksheet({ yearLevel, chapterName, items }) {
  const count = items.length;
  const bands = arrange(items, count);
  const out = [
    `# ${yearLevel} Maths Practice - ${chapterName}`,
    "",
    `${WORDS[count] || count} question${count === 1 ? "" : "s"} from Foundation to Extension. Show your working, then check each worked solution.`,
    "",
  ];
  let n = 0;
  ["Foundation", "Standard", "Extension"].forEach((name, i) => {
    if (!bands[i].length) return;
    out.push(`## ${name}`, "");
    for (const it of bands[i]) {
      n++;
      const q = it.q;
      let sol = String(q.solution || "").trim();
      if (!sol) sol = `**Answer:** ${q.answer}`;
      else if (!/\*\*Answer/.test(sol)) sol += `\n\n**Answer:** ${q.answer}`;
      out.push(`**Question ${n}**`, "", String(q.question).trim(), "", `<details><summary>${q.solution ? "Reveal worked solution" : "Reveal answer"}</summary>`, "", sol, "", "</details>", "");
    }
  });
  return out.join("\n").trim() + "\n";
}

/**
 * Have the model write the slots the bank couldn't fill. Returns the new
 * questions (unchecked), one per slot it managed; slots it couldn't write
 * are dropped.
 */
export async function writeMissing(anthropic, { yearLevel, chapterName, gaps, count }) {
  if (!gaps.length) return [];
  const plan = bandSplit(count);
  // Ask for a spread of bands: written questions sit where the bank ran dry,
  // usually in the middle of the sheet.
  const bandFor = (i) => {
    const pos = Math.round(((i + 0.5) / gaps.length) * count);
    return pos <= plan.foundation[1] ? "Foundation" : pos <= plan.standard[1] ? "Standard" : "Extension";
  };
  const slots = gaps.map((g, i) => ({ section: g.section.name, band: bandFor(i), avoid: g.avoid }));
  const budget = 1500 + 500 * slots.length;
  const m = await anthropic.messages.create({
    model: MODEL,
    max_tokens: budget + 900 * slots.length,
    thinking: { type: "enabled", budget_tokens: budget },
    system: [{ type: "text", text: FILL_SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: buildFillUserMessage({ yearLevel, chapter: chapterName, slots }) }],
  });
  const text = m.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
  const got = parseFillOutput(sanitizeGenerated(text));
  const out = [];
  for (const g of got) {
    const gap = gaps[g.n - 1];
    if (!gap) continue;
    const md = `${g.question}\n\n${g.solution}`;
    if (findKatexErrors(md).length) continue;
    out.push({ gapIndex: g.n - 1, section: gap.section, band: slots[g.n - 1].band, q: { id: null, code: gap.section.code, kind: slots[g.n - 1].band === "Extension" ? "extended" : "short", question: g.question, answer: g.answer, solution: g.solution } });
  }
  return out;
}

/** Save model-written questions as pending; returns them with their ids. */
export async function saveWritten(admin, { bankYear, written }) {
  if (!written.length) return [];
  const { data, error } = await admin
    .from("worksheet_bank_questions")
    .insert(written.map((w) => ({ bank_year: bankYear, section_code: w.section.code, section_name: w.section.name, kind: w.q.kind, question: w.q.question, answer: w.q.answer, solution: w.q.solution })))
    .select("id");
  if (error) {
    console.warn("[worksheet-bank] save failed:", error.message);
    return [];
  }
  return (data || []).map((r, i) => ({ ...written[i], dbId: r.id }));
}

/**
 * Second-model check of newly written questions. Each one that is sound and
 * correct becomes 'verified' (part of the bank); the rest 'rejected'.
 */
export async function checkWritten(admin, anthropic, { yearLevel, chapterName, saved }) {
  if (!saved.length) return;
  const md = saved
    .map((w, i) => `**Question ${i + 1}**\n\n${w.q.question}\n\n<details><summary>Reveal worked solution</summary>\n\n${w.q.solution}\n\n</details>`)
    .join("\n\n");
  let result;
  try {
    result = await checkWorksheet(anthropic, { yearLevel, topicLabel: chapterName, content: md });
  } catch (e) {
    console.warn("[worksheet-bank] check failed:", e?.message || e);
    return;
  }
  const byN = new Map((result.questions || []).map((q) => [Number(q.n), q]));
  const now = new Date().toISOString();
  await Promise.all(
    saved.map((w, i) => {
      const r = byN.get(i + 1);
      const ok = !!r?.ok;
      return admin
        .from("worksheet_bank_questions")
        .update({ status: ok ? "verified" : "rejected", check_notes: r ? (ok ? null : r.issue || "failed check") : "not checked", checked_at: now })
        .eq("id", w.dbId);
    }),
  );
}
