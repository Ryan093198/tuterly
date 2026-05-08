"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  sendInviteEmail,
  sendEmailChangeConfirmation,
  sendEmailChangeNotice,
} from "@/lib/email";

const VALID_ROLES = new Set(["parent", "student"]);

function normaliseEmail(raw) {
  return (raw || "").toString().trim().toLowerCase();
}

// Verify the calling tutor is linked to the student.
async function assertTutorOwns(studentId, userId) {
  const admin = createAdminClient();
  const { data: link } = await admin
    .from("tutor_students")
    .select("student_id")
    .eq("tutor_id", userId)
    .eq("student_id", studentId)
    .maybeSingle();
  if (!link) throw new Error("forbidden: tutor is not linked to this student");
}

// Cancel an existing pending invite (parent or student) and create a fresh
// one with the new email. Used when the recipient hasn't signed up yet.
export async function updateInviteEmail(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  const role = formData.get("role")?.toString() || "parent";
  const newEmail = normaliseEmail(formData.get("email"));
  if (!studentId || !newEmail) throw new Error("missing fields");
  if (!VALID_ROLES.has(role)) throw new Error(`invalid role: ${role}`);

  await assertTutorOwns(studentId, user.id);

  const admin = createAdminClient();

  // Mark any existing pending invites for this (student, role) as expired so
  // the latest one is the only live invite link.
  await admin
    .from("invites")
    .update({ status: "expired" })
    .eq("student_id", studentId)
    .eq("role", role)
    .eq("status", "pending");

  const { data: student } = await admin
    .from("students")
    .select("id, first_name, last_name")
    .eq("id", studentId)
    .single();
  if (!student) throw new Error("student not found");

  const { data: profile } = await admin
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: invite, error } = await admin
    .from("invites")
    .insert({
      from_user_id: user.id,
      to_email: newEmail,
      student_id: student.id,
      role,
    })
    .select("token")
    .single();
  if (error) throw error;

  try {
    await sendInviteEmail({
      to: newEmail,
      inviterName: profile?.full_name || "Your tutor",
      studentName: `${student.first_name} ${student.last_name}`,
      role,
      token: invite.token,
    });
  } catch (e) {
    console.warn(
      `[invite/${role}] resend after email update failed: ${e?.message || e}`
    );
  }

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
}

// Tutor-initiated email change for a parent who already has a Tuterly
// account. We don't flip the auth identity until the parent clicks a
// verification link sent to the new address.
export async function requestParentEmailChange(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  const newEmail = normaliseEmail(formData.get("email"));
  if (!studentId || !newEmail) throw new Error("missing fields");

  await assertTutorOwns(studentId, user.id);

  const admin = createAdminClient();

  const { data: student } = await admin
    .from("students")
    .select("id, first_name, last_name, parent_id")
    .eq("id", studentId)
    .single();
  if (!student) throw new Error("student not found");
  if (!student.parent_id) {
    throw new Error("no linked parent — use the invite flow instead");
  }

  const { data: parent } = await admin
    .from("profiles")
    .select("id, email, full_name")
    .eq("id", student.parent_id)
    .single();
  if (!parent) throw new Error("parent profile not found");

  if (parent.email && parent.email.toLowerCase() === newEmail) {
    throw new Error("new email matches the existing email");
  }

  // Reject if another user already has this email.
  const { data: collision } = await admin
    .from("profiles")
    .select("id")
    .eq("email", newEmail)
    .neq("id", parent.id)
    .maybeSingle();
  if (collision) {
    throw new Error("that email is already in use by another Tuterly account");
  }

  const { data: tutor } = await admin
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  // Invalidate any previous unfinished tokens for this user so only the most
  // recent confirmation link works.
  await admin
    .from("pending_email_changes")
    .update({ consumed_at: new Date().toISOString() })
    .eq("user_id", parent.id)
    .is("consumed_at", null);

  const { data: pending, error } = await admin
    .from("pending_email_changes")
    .insert({
      user_id: parent.id,
      new_email: newEmail,
      initiated_by: user.id,
    })
    .select("token")
    .single();
  if (error) throw error;

  try {
    await sendEmailChangeConfirmation({
      to: newEmail,
      parentName: parent.full_name,
      initiatorName: tutor?.full_name || "Your tutor",
      studentName: `${student.first_name} ${student.last_name}`,
      token: pending.token,
    });
  } catch (e) {
    console.warn(
      `[email-change] confirmation send failed: ${e?.message || e}`
    );
  }

  // Best-effort heads-up to the old address.
  if (parent.email) {
    try {
      await sendEmailChangeNotice({
        to: parent.email,
        parentName: parent.full_name,
        newEmail,
        initiatorName: tutor?.full_name || "Your tutor",
      });
    } catch (e) {
      console.warn(
        `[email-change] old-address notice failed: ${e?.message || e}`
      );
    }
  }

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
}

// Parent self-initiated email change uses Supabase Auth's standard flow
// (supabase.auth.updateUser) which is client-side. This server action only
// exists to refresh the dashboard after they confirm.
export async function noteParentEmailUpdated(formData) {
  revalidatePath("/dashboard/parent");
}
