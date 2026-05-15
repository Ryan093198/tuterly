"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";

const ALLOWED_YEARS = new Set([
  "Prep",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
]);

// Parent-initiated student creation. Lets a parent set up their own
// child record before any tutor has invited them, so they can start
// using the worksheet + lesson plan generators standalone via the
// Resources tab. The "Parents can add students" RLS policy on the
// students table allows the user-scoped insert as long as parent_id is
// set to auth.uid().
export async function createMyChild(formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const firstName = (formData.get("first_name") || "").toString().trim();
  const lastName = (formData.get("last_name") || "").toString().trim();
  const yearLevel = (formData.get("year_level") || "").toString().trim();
  const subjectRaw = (formData.get("subject") || "").toString().trim();
  const school = (formData.get("school") || "").toString().trim() || null;

  if (!firstName) return { error: "First name is required." };
  if (!lastName) return { error: "Last name is required." };
  if (!ALLOWED_YEARS.has(yearLevel)) return { error: "Pick a year level." };
  const subject = subjectRaw === "english" ? "english" : "maths";

  // Generate id client-side — RLS doesn't grant SELECT on a freshly-
  // inserted row before the parent_id link materialises, so .select()
  // after .insert() can return null.
  const studentId = randomUUID();

  const { error } = await supabase.from("students").insert({
    id: studentId,
    first_name: firstName,
    last_name: lastName,
    year_level: yearLevel,
    subject,
    school,
    parent_id: user.id,
  });
  if (error) return { error: error.message || "Could not add child." };

  // Refresh both the My-children dashboard and the aggregate Resources
  // tab so the new kid shows up everywhere immediately.
  revalidatePath("/dashboard/parent");
  revalidatePath("/dashboard/parent/resources");
  return { ok: true, student_id: studentId };
}
