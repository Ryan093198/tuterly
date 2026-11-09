import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase-admin";
import { trustedClientIp } from "@/lib/client-ip";
import { recordSignupSource } from "@/lib/signup-source";
import { sendStudyPlanEmail } from "@/lib/email";
import { buildStudyPlan, validatePlanInput, formatPlanDate } from "@/lib/study-plan";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

// Creates a maths exam study plan and emails the private link (Ryan, 9 Nov
// 2026: the plan is sent by email and the link opens it on the site).
const PER_EMAIL_PER_DAY = 5;
const PER_IP_PER_DAY = 30;
const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";
const token = (n) => {
  const b = randomBytes(n);
  let s = "";
  for (let i = 0; i < n; i++) s += ALPHABET[b[i] % ALPHABET.length];
  return s;
};

function cleanEmail(raw) {
  const t = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) && t.length <= 254 ? t : null;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "expected json body" }, { status: 400 });
  }
  const email = cleanEmail(body?.email);
  if (!email) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  const role = body?.role === "parent" ? "parent" : "student";
  const input = validatePlanInput({ year: body?.year, examDate: body?.examDate, chapters: body?.chapters, weekdays: body?.weekdays });
  if (input.error) return NextResponse.json({ error: input.error }, { status: 400 });

  const admin = createAdminClient();
  const ip = trustedClientIp(request);
  const since = new Date(Date.now() - 86400000).toISOString();
  const [byEmail, byIp] = await Promise.all([
    admin.from("study_plans").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since),
    ip ? admin.from("study_plans").select("id", { count: "exact", head: true }).eq("ip", ip).gte("created_at", since) : Promise.resolve({ count: 0 }),
  ]);
  if ((byEmail.count ?? 0) >= PER_EMAIL_PER_DAY || (byIp.count ?? 0) >= PER_IP_PER_DAY) {
    return NextResponse.json({ error: "That's a lot of plans for one day. Check your inbox for the ones already sent, or try again tomorrow." }, { status: 429 });
  }

  const plan = buildStudyPlan(input);
  if (!plan.nights.length) return NextResponse.json({ error: "There aren't any study nights before that exam date. Try a later date." }, { status: 400 });

  let id = null;
  for (let attempt = 0; attempt < 4 && !id; attempt++) {
    const candidate = token(10);
    const { error } = await admin.from("study_plans").insert({
      id: candidate,
      email,
      role,
      year_level: input.year,
      exam_date: input.examDate,
      chapters: input.chapters,
      weekdays: input.weekdays,
      plan,
      ip,
    });
    if (!error) id = candidate;
    else if (!/duplicate key/i.test(error.message || "")) {
      console.error("[study-plan] insert failed:", error);
      return NextResponse.json({ error: "Could not save your plan. Try again." }, { status: 500 });
    }
  }
  if (!id) return NextResponse.json({ error: "Could not save your plan. Try again." }, { status: 500 });

  // On the email list too (same table as the worksheet generator), with
  // marketing consent only if ticked.
  const row = { email, ip, last_seen_at: new Date().toISOString(), year_level: input.year === "Year 10A" ? "Year 10A" : input.year };
  if (body?.marketing_opt_in === true) {
    Object.assign(row, { marketing_opt_in: true, marketing_opt_in_at: new Date().toISOString(), weekly_opt_in: true, weekly_opt_in_at: new Date().toISOString(), unsubscribed_at: null });
  }
  const { error: upErr } = await admin.from("worksheet_email_signups").upsert(row, { onConflict: "email" });
  if (upErr) console.warn("[study-plan] signup upsert failed:", upErr.message);
  await recordSignupSource(email, { source: "study_planner", page: "/study-planner", weekly: body?.marketing_opt_in === true, weeklySource: "study_planner" });

  const url = `${SITE_URL}/plan/${id}`;
  try {
    await sendStudyPlanEmail({ to: email, role, year: input.year, examDateLabel: formatPlanDate(input.examDate), nightsCount: plan.nights.length, url });
  } catch (e) {
    console.error("[study-plan] email failed:", e?.message || e);
    return NextResponse.json({ error: "Your plan is saved, but the email didn't send. Check the address and try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, nights: plan.nights.length });
}
