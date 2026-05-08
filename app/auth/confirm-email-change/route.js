import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// Confirms a tutor-initiated email change. The token was generated when the
// tutor requested the change and emailed to the NEW address. Visiting this
// link with a valid, unexpired token swaps the parent's auth identity to
// the new email; the trigger on auth.users mirrors the change to profiles.
export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const home = new URL("/", url.origin);

  if (!token) {
    home.searchParams.set("error", "missing-token");
    return NextResponse.redirect(home);
  }

  const admin = createAdminClient();

  const { data: pending } = await admin
    .from("pending_email_changes")
    .select("id, user_id, new_email, expires_at, consumed_at")
    .eq("token", token)
    .maybeSingle();

  if (!pending) {
    home.searchParams.set("error", "invalid-token");
    return NextResponse.redirect(home);
  }
  if (pending.consumed_at) {
    home.searchParams.set("error", "already-used");
    return NextResponse.redirect(home);
  }
  if (
    pending.expires_at &&
    new Date(pending.expires_at).getTime() < Date.now()
  ) {
    home.searchParams.set("error", "expired");
    return NextResponse.redirect(home);
  }

  // Update the auth identity. `email_confirm: true` skips Supabase's own
  // re-verification — the click on this link IS the verification.
  const { error } = await admin.auth.admin.updateUserById(pending.user_id, {
    email: pending.new_email,
    email_confirm: true,
  });
  if (error) {
    home.searchParams.set("error", "update-failed");
    return NextResponse.redirect(home);
  }

  await admin
    .from("pending_email_changes")
    .update({ consumed_at: new Date().toISOString() })
    .eq("id", pending.id);

  // Drop a marker query param so the landing page can show a "you're all
  // set, sign in with the new email" toast.
  const success = new URL("/", url.origin);
  success.searchParams.set("emailChanged", "1");
  return NextResponse.redirect(success);
}
