import { createAdminClient } from "@/lib/supabase-admin";
import { signedUrlFor } from "@/app/dashboard/resource-actions";

// Profiles RLS only exposes auth.uid()'s own row, so we use the admin client
// to look up uploader names for resources contributed by other people in the
// same student triangle (tutor/parent/student). Only `full_name` and `role`
// are read - no email or other PII.
export async function enrichResources(rawResources) {
  if (!rawResources?.length) return [];

  const ids = [...new Set(rawResources.map((r) => r.uploaded_by).filter(Boolean))];
  let byId = new Map();
  if (ids.length) {
    const admin = createAdminClient();
    const { data } = await admin
      .from("profiles")
      .select("id, full_name, role")
      .in("id", ids);
    byId = new Map((data ?? []).map((p) => [p.id, p]));
  }

  return Promise.all(
    rawResources.map(async (r) => ({
      ...r,
      signed_url: r.file_url ? await signedUrlFor(r.file_url) : null,
      uploader: byId.get(r.uploaded_by) ?? null,
    }))
  );
}
