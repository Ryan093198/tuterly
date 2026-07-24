import { createAdminClient } from "@/lib/supabase-admin";

// Software entitlement — the single source of truth for "is this a paying
// family?" A family has full (unlimited) access to the generators when they
// either have an active Tuterly subscription ($29/mo, incl. the 7-day trial)
// OR have purchased a session pack (software is included with packs). Anything
// else is a free account that gets a small daily taste of the generators.
//
// `parentUserId` is the paying parent's user id — the caller when a parent
// generates, or the student's linked parent when a student generates. Tutors
// are never gated at the call sites (generating for their students is part of
// the paid tutoring they deliver), so this is only consulted for parents /
// students.
export async function hasSoftwareAccess(parentUserId) {
  if (!parentUserId) return false;
  const admin = createAdminClient();

  // Active (or trialing) subscription unlocks everything.
  const { data: sub } = await admin
    .from("subscriptions")
    .select("status")
    .eq("user_id", parentUserId)
    .in("status", ["trialing", "active", "past_due", "trial"])
    .limit(1)
    .maybeSingle();
  if (sub) return true;

  // A credits row exists once they've bought at least one pack (software is
  // included with packs, and credits never expire), so its presence unlocks
  // the software even if the balance has since been used down.
  const { data: credits } = await admin
    .from("credits")
    .select("parent_id")
    .eq("parent_id", parentUserId)
    .limit(1)
    .maybeSingle();
  return !!credits;
}
