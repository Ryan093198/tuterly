import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

// Admin access is gated by a server-side email allowlist (audit C6), NOT by the
// profiles.role column — role is user-influenced at signup and is not a
// trustworthy admin signal. Set ADMIN_EMAILS in the environment to a
// comma-separated list, e.g. ADMIN_EMAILS="ryan@baysideacademics.com.au,ops@...".
//
// This env var is read only on the server; it is never exposed to the client.

export function adminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email) {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

// For server components / server actions: returns the signed-in admin user or
// redirects away. Never leaks whether the route exists to non-admins.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");
  if (!isAdminEmail(user.email)) redirect("/dashboard");
  return user;
}
