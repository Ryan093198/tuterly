import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase-server";
import { trustedClientIp } from "@/lib/client-ip";
import { buildExam } from "@/lib/exam-bank";

export const runtime = "nodejs";

// Free practice exam (/exam-generator). Built from the checked questions
// on the topic pages, so there's no AI call. Behind the same email gate
// as the worksheet generator (worksheet_email_signups), and one exam a
// day per email and per connection, counted in public_request_log.
const ENDPOINT = "exam";
const EMAIL_ENDPOINT = "exam_email";
const PER_DAY = 1;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 });
  }
  const year = String(body?.year || "");
  const slugs = Array.isArray(body?.topics) ? body.topics.map(String).slice(0, 40) : [];
  const email = sanitizeEmail(body?.email);
  if (!email) return NextResponse.json({ need_email: true }, { status: 402 });

  const exam = buildExam({ year, slugs, seed: Math.floor(Math.random() * 2 ** 31) });
  if (!exam) return NextResponse.json({ error: "Pick a year and at least one topic." }, { status: 400 });

  const ip = trustedClientIp(request);
  if (!ip) return NextResponse.json({ error: "We couldn't check your connection. Try again shortly." }, { status: 400 });

  const admin = createAdminClient();

  // Founder and test accounts (same list as the worksheet generator).
  let unlimited = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const allow = (process.env.WORKSHEET_UNLIMITED_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    unlimited = !!(user?.email && allow.includes(user.email.toLowerCase()));
  } catch {}

  const emailKey = "e:" + createHash("sha256").update(email).digest("hex").slice(0, 40);
  const dayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const countSince = async (endpoint, key) => {
    const { count, error } = await admin
      .from("public_request_log")
      .select("id", { count: "exact", head: true })
      .eq("endpoint", endpoint)
      .eq("ip", key)
      .gte("created_at", dayAgo);
    if (error) throw error;
    return count ?? 0;
  };

  try {
    const { data: signup } = await admin.from("worksheet_email_signups").select("id").eq("email", email).limit(1);
    if (!signup?.length) return NextResponse.json({ need_email: true }, { status: 402 });
    if (!unlimited) {
      const [byIp, byEmail] = await Promise.all([countSince(ENDPOINT, ip), countSince(EMAIL_ENDPOINT, emailKey)]);
      if (byIp >= PER_DAY || byEmail >= PER_DAY) {
        return NextResponse.json(
          { limit: true, error: "That’s your free practice exam for today. Come back tomorrow for another, or sign up early for the Tuterly app to practise as much as you like." },
          { status: 429 }
        );
      }
    }
    const { error: logErr } = await admin.from("public_request_log").insert([{ ip, endpoint: ENDPOINT }, { ip: emailKey, endpoint: EMAIL_ENDPOINT }]);
    if (logErr) console.warn("[exam] could not record the exam:", logErr.message);
  } catch (e) {
    console.error("[exam] limiter error:", e?.message || e);
    return NextResponse.json({ error: "Something went wrong. Try again in a moment." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, exam });
}

function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (t.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  return t;
}
