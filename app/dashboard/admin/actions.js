"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin";

// All admin mutations re-check admin status server-side via requireAdmin()
// before touching anything (audit C6). Never trust the caller's role.

// Approve a tutor application: mark the application approved and, if a profile
// already exists for that email, promote it to an approved tutor. If they
// haven't signed up yet, the approval is recorded and applied when they do
// (their profile is matched by email at approval time on a later run, or you
// can re-approve once they've signed up).
export async function approveApplication(formData) {
  await requireAdmin();
  const appId = formData.get("application_id")?.toString();
  if (!appId) throw new Error("application_id required");

  const admin = createAdminClient();

  const { data: application } = await admin
    .from("tutor_applications")
    .select("id, email")
    .eq("id", appId)
    .single();
  if (!application) throw new Error("application not found");

  // Match an existing profile by email (case-insensitive).
  const { data: profile } = await admin
    .from("profiles")
    .select("id")
    .ilike("email", application.email)
    .maybeSingle();

  if (profile) {
    const { error: profErr } = await admin
      .from("profiles")
      .update({ role: "tutor", approved: true })
      .eq("id", profile.id);
    if (profErr) throw profErr;
  }

  const { error } = await admin
    .from("tutor_applications")
    .update({
      status: "approved",
      reviewed_at: new Date().toISOString(),
      linked_user_id: profile?.id ?? null,
    })
    .eq("id", appId);
  if (error) throw error;

  revalidatePath("/dashboard/admin");
}

export async function rejectApplication(formData) {
  await requireAdmin();
  const appId = formData.get("application_id")?.toString();
  if (!appId) throw new Error("application_id required");

  const admin = createAdminClient();
  const { error } = await admin
    .from("tutor_applications")
    .update({ status: "rejected", reviewed_at: new Date().toISOString() })
    .eq("id", appId);
  if (error) throw error;

  revalidatePath("/dashboard/admin");
}

// Suspend / reinstate a tutor. We use the `approved` flag as the live gate:
// an unapproved tutor cannot create students (enforced in createStudent).
export async function setTutorApproval(formData) {
  await requireAdmin();
  const tutorId = formData.get("tutor_id")?.toString();
  const approved = formData.get("approved") === "true";
  if (!tutorId) throw new Error("tutor_id required");

  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ approved })
    .eq("id", tutorId)
    .eq("role", "tutor");
  if (error) throw error;

  revalidatePath("/dashboard/admin");
}
