import { NextResponse } from "next/server";
import { buildDiagnostic, markDiagnostic } from "@/lib/diagnostic";
import { checkPublicRateLimit } from "@/lib/public-form-guard";

export const runtime = "nodejs";

// POST /api/diagnostic/mark  { year: "year-8", answers }
// Marks the free diagnostic test. Nothing about the student is stored.
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 }); }
  const d = buildDiagnostic(String(body?.year || ""));
  if (!d) return NextResponse.json({ error: "We couldn't find that test." }, { status: 404 });
  const rl = await checkPublicRateLimit(request, "diagnostic-mark", { perMinute: 10, perHour: 40, perDay: 120 });
  if (!rl.ok) return NextResponse.json({ error: "Too many tries. Please wait a minute and try again." }, { status: 429 });
  return NextResponse.json({ ok: true, ...markDiagnostic(d, body?.answers || {}) });
}
