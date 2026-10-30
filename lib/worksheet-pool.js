import { createHash } from "node:crypto";
import { CHECK_SYSTEM, CHECK_TOOL, checkUserMessage } from "@/lib/worksheet-check-prompt";

// Checked worksheets, reused across visitors (supabase/migrations/
// 2026-10-30_worksheet_pool.sql).
//
// Every worksheet the generator writes is saved as 'pending'. A separate
// call (/api/worksheets/verify) has a second model solve all six questions
// independently; if every answer and every working agrees it becomes
// 'verified', otherwise 'rejected'. Only verified worksheets are reused,
// and never for someone who has already had that worksheet (matched by
// email and by connection).

export function topicKey(topicId, topicLabel) {
  return topicId ? `id:${topicId}` : `label:${String(topicLabel).trim().toLowerCase()}`;
}

export function viewerKeys({ email, ip, userId }) {
  const h = (s) => createHash("sha256").update(String(s)).digest("hex").slice(0, 32);
  const keys = [];
  if (email) keys.push("e:" + h(email.toLowerCase()));
  if (userId) keys.push("u:" + h(userId));
  if (ip) keys.push("i:" + h(ip));
  return keys;
}

// A verified worksheet this viewer hasn't had, least used first. null if none.
export async function pickFromPool(admin, { yearLevel, key, viewers }) {
  try {
    const { data: rows, error } = await admin
      .from("worksheet_pool")
      .select("id, content, served_count")
      .eq("year_level", yearLevel)
      .eq("topic_key", key)
      .eq("status", "verified")
      .order("served_count", { ascending: true })
      .limit(50);
    if (error || !rows?.length) return null;
    let seen = new Set();
    if (viewers.length) {
      const { data: served } = await admin
        .from("worksheet_pool_serves")
        .select("pool_id")
        .in("viewer", viewers)
        .in("pool_id", rows.map((r) => r.id));
      seen = new Set((served || []).map((s) => s.pool_id));
    }
    return rows.find((r) => !seen.has(r.id)) || null;
  } catch (e) {
    console.warn("[worksheet-pool] pick failed:", e?.message || e);
    return null;
  }
}

export async function recordServe(admin, poolId, viewers, servedCount = 0) {
  try {
    if (viewers.length) {
      await admin
        .from("worksheet_pool_serves")
        .upsert(viewers.map((v) => ({ pool_id: poolId, viewer: v })), { onConflict: "pool_id,viewer", ignoreDuplicates: true });
    }
    await admin.from("worksheet_pool").update({ served_count: servedCount + 1 }).eq("id", poolId);
  } catch (e) {
    console.warn("[worksheet-pool] serve record failed:", e?.message || e);
  }
}

// Save a fresh worksheet as pending. Returns its id (or null).
export async function saveToPool(admin, { yearLevel, key, topicLabel, content, viewers }) {
  try {
    const { data, error } = await admin
      .from("worksheet_pool")
      .insert({ year_level: yearLevel, topic_key: key, topic_label: topicLabel, content, status: "pending", served_count: 1 })
      .select("id")
      .single();
    if (error) {
      console.warn("[worksheet-pool] save failed:", error.message);
      return null;
    }
    if (viewers.length) {
      await admin.from("worksheet_pool_serves").insert(viewers.map((v) => ({ pool_id: data.id, viewer: v })));
    }
    return data.id;
  } catch (e) {
    console.warn("[worksheet-pool] save failed:", e?.message || e);
    return null;
  }
}

// Independent check by a second model call. Returns { pass, notes }.
export async function checkWorksheet(anthropic, { yearLevel, topicLabel, content }) {
  const m = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 6000,
    system: CHECK_SYSTEM,
    tools: [CHECK_TOOL],
    tool_choice: { type: "tool", name: "report_check" },
    messages: [{ role: "user", content: checkUserMessage({ yearLevel, topicLabel, content }) }],
  });
  const r = m.content.find((b) => b.type === "tool_use")?.input;
  if (r && typeof r.questions === "string") {
    try { r.questions = JSON.parse(r.questions); } catch { r.questions = null; }
  }
  if (!r || !Array.isArray(r.questions)) return { pass: false, notes: "checker returned nothing" };
  const bad = r.questions.filter((q) => !q.ok);
  const pass = r.questions.length === 6 && bad.length === 0 && r.structure_ok !== false;
  const notes = [
    r.structure_ok === false ? `Structure: ${r.structure_issue}` : null,
    ...bad.map((q) => `Q${q.n}: ${q.issue}`),
  ].filter(Boolean).join(" | ");
  return { pass, notes };
}
