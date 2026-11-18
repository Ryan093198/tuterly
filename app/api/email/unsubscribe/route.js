import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

// One-click unsubscribe for the weekly worksheet email. GET from the link
// in the email; POST from mail apps using List-Unsubscribe-Post (RFC 8058).
// Stops the weekly email and any other marketing email to that address,
// on both the worksheet list and the Exam Zone list (exam_signups).
const UUID = /^[0-9a-f-]{36}$/i;

async function unsubscribe(token) {
  if (!UUID.test(token || "")) return false;
  const admin = createAdminClient();
  const now = new Date().toISOString();
  let { error } = await admin
    .from("worksheet_email_signups")
    .update({ unsubscribed_at: now, weekly_opt_in: false, marketing_opt_in: false })
    .eq("unsub_token", token);
  // If the marketing_opt_in column is missing, still record the unsubscribe.
  if (error && /marketing_opt_in/.test(error.message || "")) {
    ({ error } = await admin
      .from("worksheet_email_signups")
      .update({ unsubscribed_at: now, weekly_opt_in: false })
      .eq("unsub_token", token));
  }
  // The Exam Zone list (exam_signups) uses its own tokens; one link stops both
  // lists for that address.
  const { data: ex } = await admin.from("exam_signups").update({ unsubscribed_at: now, marketing_opt_in: false }).eq("unsub_token", token).select("email");
  const exEmail = ex?.[0]?.email;
  if (exEmail) await admin.from("worksheet_email_signups").update({ unsubscribed_at: now, weekly_opt_in: false, marketing_opt_in: false }).eq("email", exEmail);
  const { data: ws } = await admin.from("worksheet_email_signups").select("email").eq("unsub_token", token).maybeSingle();
  if (ws?.email) await admin.from("exam_signups").update({ unsubscribed_at: now, marketing_opt_in: false }).eq("email", ws.email);
  return !error || !!exEmail;
}

export async function GET(request) {
  const ok = await unsubscribe(new URL(request.url).searchParams.get("t"));
  return NextResponse.redirect(`${SITE_URL}/unsubscribed${ok ? "" : "?error=1"}`, 302);
}

export async function POST(request) {
  const ok = await unsubscribe(new URL(request.url).searchParams.get("t"));
  return new NextResponse(null, { status: ok ? 200 : 400 });
}
