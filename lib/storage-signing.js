import { createAdminClient } from "@/lib/supabase-admin";

// Signed-URL helpers for the private storage buckets.
//
// SECURITY (audit C2): these used to be exported from "use server" modules,
// which registered them as callable server-action endpoints — so anyone could
// POST an arbitrary object path and get back a signed URL to another student's
// private files. They now live in this plain server-side module and are NOT
// server actions, so there is no callable endpoint to abuse.
//
// Every caller is already an authorised server context (a server component or
// API route) that loaded the file_url from a row it fetched through the
// RLS-protected client — i.e. the access check has already happened before the
// path reaches here. Do NOT re-export these from a "use server" file. For extra
// hardening you can `npm i server-only` and add `import "server-only"` at the
// top so an accidental client import fails the build.

const SIGNED_URL_TTL_SECONDS = 3600;

export async function signedUrlForResource(filePath) {
  if (!filePath) return null;
  const admin = createAdminClient();
  const { data } = await admin.storage
    .from("resources")
    .createSignedUrl(filePath, SIGNED_URL_TTL_SECONDS);
  return data?.signedUrl ?? null;
}

export async function signedUrlForPhoto(filePath) {
  if (!filePath) return null;
  const admin = createAdminClient();
  const { data } = await admin.storage
    .from("session-photos")
    .createSignedUrl(filePath, SIGNED_URL_TTL_SECONDS);
  return data?.signedUrl ?? null;
}
