import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

// Click tracker for the weekly worksheet email: records the click, then
// redirects. Only redirects to paths on our own site (no open redirect).
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request, { params }) {
  const { id } = await params;
  const u = new URL(request.url).searchParams.get("u") || "/";
  const path = u.startsWith("/") && !u.startsWith("//") ? u : "/";
  if (UUID.test(id)) {
    try {
      const admin = createAdminClient();
      const { data } = await admin.from("weekly_email_sends").select("click_count, opened_at").eq("id", id).single();
      if (data) {
        const now = new Date().toISOString();
        await admin.from("weekly_email_sends").update({
          clicked_at: now,
          click_count: (data.click_count || 0) + 1,
          ...(data.opened_at ? {} : { opened_at: now }),
        }).eq("id", id);
      }
    } catch {}
  }
  return NextResponse.redirect(`${SITE_URL}${path}`, 302);
}
