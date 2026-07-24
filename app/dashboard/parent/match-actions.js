"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { sendMatchRequestEmail } from "@/lib/email";

// Parent-initiated "match me with a tutor" request from the dashboard
// onboarding. Follows the same email-as-record pattern as /api/enquiry — the
// team inbox is the system of record, so there's no DB table to migrate. A
// human reads the request and reaches out to arrange the match.
//
// Fields (all from the onboarding modal):
//   student_id      optional — the child this is for, if already added
//   child_name      optional — free-text when no student record exists yet
//   child_year_level, subject, availability, notes
const DEFAULT_TO = "admin@baysideacademics.com.au";

export async function requestTutorMatch(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const studentId = trimStr(formData.get("student_id"), 64) || null;
  let childName = trimStr(formData.get("child_name"), 120);
  let childYearLevel = trimStr(formData.get("child_year_level"), 40);
  let subject = trimStr(formData.get("subject"), 40);
  const availability = trimStr(formData.get("availability"), 500);
  const notes = trimStr(formData.get("notes"), 2000);

  // If they picked an existing child, trust the DB row over posted fields —
  // it can't be tampered with and saves the parent re-typing. RLS scopes the
  // read to their own students.
  if (studentId) {
    const { data: student } = await supabase
      .from("students")
      .select("first_name, last_name, year_level, subject")
      .eq("id", studentId)
      .eq("parent_id", user.id)
      .maybeSingle();
    if (student) {
      childName = `${student.first_name} ${student.last_name}`.trim();
      childYearLevel = student.year_level || childYearLevel;
      subject = student.subject || subject;
    }
  }

  // The team needs at least something to act on — a child reference or a note.
  if (!childName && !notes && !childYearLevel) {
    return { error: "Add your child's year level or a short note so we can match them." };
  }

  // Parent's name + email for the reply-to. Fall back to the auth email.
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .maybeSingle();
  const parentEmail = (profile?.email || user.email || "").toLowerCase().trim();
  const parentName = trimStr(profile?.full_name, 120);

  try {
    await sendMatchRequestEmail({
      to: process.env.ENQUIRY_TO_EMAIL || DEFAULT_TO,
      replyTo: parentEmail || undefined,
      parentName,
      parentEmail,
      childName,
      childYearLevel,
      subject,
      availability,
      notes,
      submittedByUserId: user.id,
    });
    return { ok: true };
  } catch (e) {
    console.error("[match-request] send failed:", e);
    return {
      error: "Could not send your request just now. Please try again in a moment.",
    };
  }
}

function trimStr(raw, max) {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, max);
}
