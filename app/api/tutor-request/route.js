import { NextResponse } from "next/server";
import { guardPublicForm } from "@/lib/public-form-guard";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  SOURCES,
  normaliseTutorRequest,
  validateTutorRequest,
} from "@/lib/tutor-request";

export const runtime = "nodejs";

// POST /api/tutor-request
//   "Want help from a local tutor?" form. Checks honeypot + rate limit +
//   fields, then forwards to Tuterly Match's feed-ingest with the shared
//   secret. The browser must never call feed-ingest directly.
//
//   Env (server only, never NEXT_PUBLIC_): FEED_INGEST_URL, FEED_INGEST_SECRET.

const GENERIC_ERROR = "Sorry, something went wrong. Please try again later.";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }

  const guard = await guardPublicForm(request, body, "tutor-request", {
    perMinute: 2,
    perHour: 5,
    perDay: 10,
  });
  if (guard.blocked) {
    if (guard.silent) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(guard.retryAfterSeconds) } }
    );
  }

  const errors = validateTutorRequest(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the form", errors }, { status: 400 });
  }
  const payload = normaliseTutorRequest(body);

  const url = process.env.FEED_INGEST_URL;
  const secret = process.env.FEED_INGEST_SECRET;
  if (!url || !secret) {
    console.error("[tutor-request] FEED_INGEST_URL / FEED_INGEST_SECRET not set");
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-feed-secret": secret },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (e) {
    console.error("[tutor-request] feed-ingest unreachable", e?.message || e);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  const out = await res.json().catch(() => ({}));
  if (res.status === 400) {
    return NextResponse.json(
      { error: "Please check the form", errors: out?.errors ?? {} },
      { status: 400 }
    );
  }
  if (!res.ok || out?.ok !== true) {
    // 401 / 503 etc: a setup problem on our side, not the parent's.
    console.error("[tutor-request] feed-ingest", res.status, out);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  // Funnel record. No phone number or child's name: the full request
  // lives in Tuterly Match. Best effort; never fail the parent's request.
  const source = SOURCES.includes(body?.source) ? body.source : "worksheet";
  try {
    const { error } = await createAdminClient().from("tutor_requests").insert({
      feed_enquiry_id: typeof out.id === "string" ? out.id : null,
      email: payload.email,
      year: payload.year,
      suburb: payload.suburb,
      source,
      centres: Number.isInteger(out.centres) ? out.centres : 0,
    });
    if (error) console.warn("[tutor-request] log failed", error.message);
  } catch (e) {
    console.warn("[tutor-request] log failed", e?.message || e);
  }

  // `centres` deliberately not returned: 0 is normal while few centres
  // are signed up, and the parent doesn't need to see it.
  return NextResponse.json({ ok: true });
}
