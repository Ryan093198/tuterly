"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendInviteEmail } from "@/lib/email";

export async function inviteParent(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  const toEmail = formData.get("email")?.toString().trim().toLowerCase();
  if (!studentId || !toEmail) throw new Error("missing fields");

  const { data: student } = await supabase
    .from("students")
    .select("id, first_name, last_name")
    .eq("id", studentId)
    .single();
  if (!student) throw new Error("student not found");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: invite, error } = await supabase
    .from("invites")
    .insert({
      from_user_id: user.id,
      to_email: toEmail,
      student_id: student.id,
      role: "parent",
    })
    .select("token")
    .single();
  if (error) throw error;

  try {
    await sendInviteEmail({
      to: toEmail,
      inviterName: profile?.full_name || "Your tutor",
      studentName: `${student.first_name} ${student.last_name}`,
      role: "parent",
      token: invite.token,
    });
  } catch (e) {
    // Don't roll back the invite — the row + token are already created and
    // the tutor can share the link manually. Log so it's visible in the dev
    // server output.
    console.warn(
      `[inviteParent] email send failed (${e?.statusCode || "?"}): ${e?.message || e}. ` +
        `Invite link: ${process.env.NEXT_PUBLIC_APP_URL || ""}/invite/${invite.token}`
    );
  }

  revalidatePath(`/dashboard/tutor/students/${student.id}`);
}

export async function resendInvite(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  if (!studentId) throw new Error("missing student_id");

  const { data: invite } = await supabase
    .from("invites")
    .select("token, to_email, role, student_id, students(first_name, last_name)")
    .eq("student_id", studentId)
    .eq("from_user_id", user.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!invite) throw new Error("no pending invite");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  // Surface the real error here so the tutor sees if Resend is still misconfigured.
  await sendInviteEmail({
    to: invite.to_email,
    inviterName: profile?.full_name || "Your tutor",
    studentName: `${invite.students.first_name} ${invite.students.last_name}`,
    role: invite.role,
    token: invite.token,
  });

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
}

export async function cancelInvite(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = formData.get("student_id");
  if (!studentId) throw new Error("missing student_id");

  // Service role: invites are protected by RLS but we're already auth-checked.
  const admin = createAdminClient();
  await admin
    .from("invites")
    .update({ status: "expired" })
    .eq("student_id", studentId)
    .eq("from_user_id", user.id)
    .eq("status", "pending");

  revalidatePath(`/dashboard/tutor/students/${studentId}`);
}
