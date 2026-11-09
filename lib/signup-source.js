import { createAdminClient } from "@/lib/supabase-admin";

// Records where an email sign-up came from (Ryan, 9 Nov 2026; columns in
// supabase/migrations/2026-11-09_signup_source.sql). The first source and
// page are kept, never overwritten; the weekly email source is the latest
// place they ticked it. Best effort: a failure here never fails the sign-up.

const TAG = /^[a-z0-9_]{1,40}$/;
const clean = (v) => (typeof v === "string" && TAG.test(v) ? v : null);
const cleanPage = (v) =>
  typeof v === "string" && v.startsWith("/") ? v.slice(0, 200).replace(/[^\w\-/.]/g, "") : null;

export async function recordSignupSource(email, { source, page, weeklySource, weekly } = {}) {
  const src = clean(source);
  const pg = cleanPage(page);
  const wk = weekly ? clean(weeklySource) : null;
  if (!email || (!src && !wk)) return;
  try {
    const admin = createAdminClient();
    if (src) {
      await admin
        .from("worksheet_email_signups")
        .update({ source: src, ...(pg ? { source_page: pg } : {}) })
        .eq("email", email)
        .is("source", null);
    }
    if (wk) {
      await admin.from("worksheet_email_signups").update({ weekly_opt_in_source: wk }).eq("email", email);
    }
  } catch (e) {
    console.warn("[signup-source] not recorded:", e?.message || e);
  }
}
