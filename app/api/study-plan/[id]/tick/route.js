import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// Ticks a night on a study plan on or off. Anyone with the private link can
// tick (student and parent share it).
export async function POST(request, { params }) {
  const { id } = await params;
  if (!/^[a-z2-9]{8,16}$/.test(String(id))) return NextResponse.json({ error: "not found" }, { status: 404 });
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }
  const key = String(body?.key || "");
  if (!/^n\d{1,3}$/.test(key)) return NextResponse.json({ error: "bad key" }, { status: 400 });
  const admin = createAdminClient();
  const { data, error } = await admin.from("study_plans").select("done, plan").eq("id", id).maybeSingle();
  if (error || !data) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (!data.plan?.nights?.some((n) => n.key === key)) return NextResponse.json({ error: "bad key" }, { status: 400 });
  const done = { ...(data.done || {}) };
  if (body?.done) done[key] = new Date().toISOString();
  else delete done[key];
  const { error: upErr } = await admin.from("study_plans").update({ done }).eq("id", id);
  if (upErr) return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
  return NextResponse.json({ ok: true, done });
}
