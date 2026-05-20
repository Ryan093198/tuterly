"use server";

// Server action stub for the ATAR planner email capture. Persists
// the lead so we can email back the user's plan + study-planning
// nudges through the year. For v1 we log to the server console; a
// follow-up commit should write to a Supabase atar_planner_signups
// table - see the comment at the bottom of this file for the table
// schema.

export async function savePlannerLead({ email, courseIds, atar, aggregate, subjects }) {
  if (!email || !email.includes("@")) {
    throw new Error("Valid email required.");
  }

  // TODO: write to Supabase. Suggested schema (run as a migration):
  //
  //   create table public.atar_planner_signups (
  //     id uuid primary key default gen_random_uuid(),
  //     email text not null,
  //     course_ids text[] not null default '{}',
  //     atar numeric(5,2),
  //     aggregate numeric(6,2),
  //     subjects jsonb not null default '[]'::jsonb,
  //     created_at timestamptz not null default now()
  //   );
  //   create index on public.atar_planner_signups (email);
  //   alter table public.atar_planner_signups enable row level security;
  //   -- service role only; the server action runs with the admin client
  //
  // Then in this function:
  //   const admin = createAdminClient();
  //   await admin.from("atar_planner_signups").insert({
  //     email, course_ids: courseIds ?? [], atar, aggregate, subjects,
  //   });

  console.log("[atar-planner] lead", {
    email,
    courseIds: courseIds ?? [],
    atar,
    aggregate,
    subjectCount: subjects?.length ?? 0,
  });

  return { ok: true };
}
