"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

const VALID_ROLES = new Set(["parent", "tutor", "student"]);

// Sets the user's role exactly once, the first time they reach the dashboard
// without a role on their profile. If a role is already set we ignore the
// submit — it can't be used to switch roles after the fact.
export async function setInitialRole(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const role = (formData.get("role") || "").toString();
  if (!VALID_ROLES.has(role)) {
    throw new Error("Pick a role to continue.");
  }

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role, terms_accepted_at")
    .eq("id", user.id)
    .single();
  if (profile?.role) {
    // Role already set — no-op, just continue to the dashboard.
    redirect("/dashboard");
  }

  // Consent capture for the OAuth path (audit C7). Email signups record this
  // in signup metadata; Google/OAuth users don't carry it, so we stamp it here
  // when they pick their role (they ticked the consent box before OAuth). Only
  // set it if not already recorded, so we never overwrite an earlier timestamp.
  const patch = { role };
  if (!profile?.terms_accepted_at) {
    patch.terms_accepted_at = new Date().toISOString();
    patch.terms_version = "2026-07-20";
  }

  const { error } = await admin
    .from("profiles")
    .update(patch)
    .eq("id", user.id);
  if (error) throw error;

  redirect("/dashboard");
}
