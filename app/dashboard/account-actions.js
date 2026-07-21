"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

const SESSION_PHOTO_BUCKET = "session-photos";
const RESOURCE_BUCKET = "resources";

// Self-service account deletion. Works for any role; the cleanup that runs
// before the auth user is deleted depends on what the user owns.
//
// Cascade behaviour (per supabase/schema.sql):
//   - profiles cascades from auth.users
//   - tutor_students cascades from profiles
//   - sessions, ratings, resources, reports, session_photos, flagged_questions
//     all cascade from students
//   - sessions.tutor_id, resources.uploaded_by, invites.from_user_id,
//     subscriptions.user_id, students.parent_id, students.student_user_id,
//     flagged_questions.understood_by, session_photos.uploaded_by,
//     pending_email_changes.initiated_by are NOT cascaded — these need
//     explicit handling here.
export async function deleteAccount(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // Belt-and-braces: client UI requires typed confirmation, but the action
  // double-checks here in case the form is submitted some other way.
  const confirmEmail = (formData.get("confirm_email") || "").toString().trim();
  if (confirmEmail.toLowerCase() !== (user.email || "").toLowerCase()) {
    throw new Error("Confirmation email did not match.");
  }

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  const role = profile?.role || "parent";

  // Collect storage paths to remove BEFORE we cascade-delete the DB rows.
  const storageRemovals = { [SESSION_PHOTO_BUCKET]: [], [RESOURCE_BUCKET]: [] };

  if (role === "tutor" || role === "admin") {
    // Find every student owned by this tutor.
    const { data: links } = await admin
      .from("tutor_students")
      .select("student_id")
      .eq("tutor_id", user.id);
    const studentIds = (links ?? []).map((l) => l.student_id);

    if (studentIds.length) {
      // Stash storage paths from any rows that are about to cascade-delete.
      const [{ data: photos }, { data: resources }] = await Promise.all([
        admin
          .from("session_photos")
          .select("file_url, sessions!inner(student_id)")
          .in("sessions.student_id", studentIds),
        admin
          .from("resources")
          .select("file_url")
          .in("student_id", studentIds)
          .not("file_url", "is", null),
      ]);
      for (const p of photos ?? [])
        if (p.file_url) storageRemovals[SESSION_PHOTO_BUCKET].push(p.file_url);
      for (const r of resources ?? [])
        if (r.file_url) storageRemovals[RESOURCE_BUCKET].push(r.file_url);

      // Audit M2: scrub PII from the flat audit log (on delete set null keeps
      // the rows) before deleting the students.
      await admin
        .from("session_report_log")
        .update({ student_name: null, year_level: null, topics: null })
        .in("student_id", studentIds);

      // Hard-delete the students. Cascades sessions, ratings, resources,
      // reports, session_photos, flagged_questions.
      const { error: studentDelErr } = await admin
        .from("students")
        .delete()
        .in("id", studentIds);
      if (studentDelErr) throw studentDelErr;
    }
  } else if (role === "parent") {
    // Don't delete the children — the tutor still owns them. Just unlink.
    await admin
      .from("students")
      .update({ parent_id: null })
      .eq("parent_id", user.id);
  } else if (role === "student") {
    await admin
      .from("students")
      .update({ student_user_id: null })
      .eq("student_user_id", user.id);
  }

  // Cleanup that applies to every role.
  await admin.from("invites").delete().eq("from_user_id", user.id);
  // flagged_questions.understood_by has no cascade; null it out so the
  // FK doesn't block the delete.
  await admin
    .from("flagged_questions")
    .update({ understood_by: null })
    .eq("understood_by", user.id);
  // Subscriptions: hard-delete the row. Billing isn't live yet, so there's
  // no Stripe-side state to reconcile. When billing ships, this should
  // cancel the subscription via Stripe first.
  await admin.from("subscriptions").delete().eq("user_id", user.id);

  // Best-effort storage sweep. Failures here shouldn't block the deletion —
  // the worst case is orphaned blobs we can clean up in a separate sweeper.
  for (const [bucket, paths] of Object.entries(storageRemovals)) {
    if (paths.length === 0) continue;
    try {
      // remove() takes up to ~1000 paths per call.
      for (let i = 0; i < paths.length; i += 900) {
        await admin.storage.from(bucket).remove(paths.slice(i, i + 900));
      }
    } catch (e) {
      console.warn(`[deleteAccount] storage cleanup ${bucket}:`, e?.message || e);
    }
  }

  // Finally, delete the auth user. This cascades profiles + tutor_students +
  // api_rate_limits + pending_email_changes (user_id).
  const { error: deleteErr } = await admin.auth.admin.deleteUser(user.id);
  if (deleteErr) throw deleteErr;

  // Clear the cookie session in the browser.
  await supabase.auth.signOut();
  redirect("/");
}
