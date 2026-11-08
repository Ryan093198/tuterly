import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase-server";
import { trustedClientIp } from "@/lib/client-ip";
import { buildTeacherPaper, savePaper, paperPath, solutionsPath, TEACHER_PER_DAY } from "@/lib/teacher-papers";

export const runtime = "nodejs";

// Teacher Zone: build an auto-marked paper and save it for sharing.
// Up to 5 a day per teacher email. Schools share one connection, so the
// per-connection cap is higher (30), just to stop abuse.
const ENDPOINT = "teacher_paper";
const EMAIL_ENDPOINT = "teacher_paper_email";
const PER_IP = 30;

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 }); }
  const email = sanitizeEmail(body?.email);
  if (!email) return NextResponse.json({ need_signup: true }, { status: 402 });
  const year = String(body?.year || "");
  const slugs = Array.isArray(body?.topics) ? body.topics.map(String).slice(0, 60) : [];

  const paper = buildTeacherPaper({ year, slugs, count: body?.count, title: body?.title });
  if (!paper) return NextResponse.json({ error: "Pick a year and at least one topic." }, { status: 400 });

  const ip = trustedClientIp(request);
  if (!ip) return NextResponse.json({ error: "We couldn't check your connection. Try again shortly." }, { status: 400 });
  const admin = createAdminClient();

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
    const { count, error } = await admin.from("public_request_log").select("id", { count: "exact", head: true }).eq("endpoint", endpoint).eq("ip", key).gte("created_at", dayAgo);
    if (error) throw error;
    return count ?? 0;
  };

  let school = null;
  try {
    const { data: t } = await admin.from("teacher_signups").select("school").eq("email", email).maybeSingle();
    if (!t) return NextResponse.json({ need_signup: true }, { status: 402 });
    school = t.school;
    if (!unlimited) {
      const [byIp, byEmail] = await Promise.all([countSince(ENDPOINT, ip), countSince(EMAIL_ENDPOINT, emailKey)]);
      if (byEmail >= TEACHER_PER_DAY || byIp >= PER_IP) {
        return NextResponse.json(
          { limit: true, error: `That’s today’s ${TEACHER_PER_DAY} free papers. Your links keep working, and you can build more tomorrow.` },
          { status: 429 }
        );
      }
    }
    const saved = await savePaper({ paper, email, school });
    const { error: logErr } = await admin.from("public_request_log").insert([{ ip, endpoint: ENDPOINT }, { ip: emailKey, endpoint: EMAIL_ENDPOINT }]);
    if (logErr) console.warn("[teachers/paper] could not record:", logErr.message);
    return NextResponse.json({
      ok: true,
      id: saved.id,
      studentUrl: paperPath(saved.id),
      solutionsUrl: solutionsPath(saved.id, saved.solutionsToken),
      title: paper.title,
      year: paper.year,
      topics: paper.topics,
      questionCount: paper.questionCount,
      totalMarks: paper.totalMarks,
      minutes: paper.minutes,
    });
  } catch (e) {
    console.error("[teachers/paper]", e?.message || e);
    return NextResponse.json({ error: "Something went wrong. Try again in a moment." }, { status: 500 });
  }
}

function sanitizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toLowerCase();
  if (t.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return null;
  return t;
}
