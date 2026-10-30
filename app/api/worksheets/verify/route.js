import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/lib/supabase-admin";
import { checkWorksheet } from "@/lib/worksheet-pool";

export const runtime = "nodejs";
export const maxDuration = 60;

// Checks one pending worksheet in the pool (lib/worksheet-pool.js): a second
// model solves all six questions independently. Pass -> 'verified' (reused
// for other visitors), fail -> 'rejected' (never reused). Called by the
// generate route straight after it answers the visitor. Server only:
// needs CRON_SECRET. With no id, checks the oldest pending worksheet.
export async function POST(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body = {};
  try { body = await request.json(); } catch {}
  const admin = createAdminClient();
  let q = admin.from("worksheet_pool").select("id, year_level, topic_label, content").eq("status", "pending");
  q = body?.id ? q.eq("id", String(body.id)) : q.order("created_at", { ascending: true });
  const { data: rows, error } = await q.limit(1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const row = rows?.[0];
  if (!row) return NextResponse.json({ ok: true, checked: 0 });

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const { pass, notes } = await checkWorksheet(anthropic, {
      yearLevel: row.year_level,
      topicLabel: row.topic_label,
      content: row.content,
    });
    await admin
      .from("worksheet_pool")
      .update({ status: pass ? "verified" : "rejected", check_notes: notes || null, checked_at: new Date().toISOString() })
      .eq("id", row.id);
    return NextResponse.json({ ok: true, id: row.id, status: pass ? "verified" : "rejected" });
  } catch (e) {
    console.error("[worksheets/verify] check failed:", e?.message || e);
    return NextResponse.json({ error: "check failed" }, { status: 502 });
  }
}
