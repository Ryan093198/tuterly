import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

// Open pixel for the weekly worksheet email. Records the first open only.
// Apple Mail preloads images, so opens are a rough signal; clicks are the
// reliable one.
const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(_request, { params }) {
  const { id } = await params;
  if (UUID.test(id)) {
    try {
      await createAdminClient().from("weekly_email_sends").update({ opened_at: new Date().toISOString() }).eq("id", id).is("opened_at", null);
    } catch {}
  }
  return new Response(GIF, { headers: { "content-type": "image/gif", "cache-control": "no-store, max-age=0" } });
}
