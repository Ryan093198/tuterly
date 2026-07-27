-- ATAR planner lead capture.
--
-- The /atar-planner tool has been collecting emails since launch and only
-- console.log-ing them (the TODO in app/atar-planner/actions.js). The page is
-- publicly linked from the sitemap, the marketing nav and /maindirectory, so
-- every lead it has ever captured exists nowhere but the Vercel logs.
--
-- Service-role only: RLS is enabled with NO policies, so the anon/authenticated
-- browser clients cannot read or write this table. The server action uses the
-- admin client, which bypasses RLS. Same posture as public_request_log.
--
-- Idempotent. Safe to re-run.

create table if not exists public.atar_planner_signups (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  course_ids  text[] not null default '{}',
  atar        numeric(5,2),
  aggregate   numeric(6,2),
  subjects    jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists idx_atar_planner_signups_email
  on public.atar_planner_signups (email);

create index if not exists idx_atar_planner_signups_created
  on public.atar_planner_signups (created_at desc);

alter table public.atar_planner_signups enable row level security;

-- Deliberately no policies. Default-deny: only the service role can touch this.

-- Belt and braces: revoke the implicit grants PostgREST relies on, so even a
-- future accidental policy cannot expose the table to the browser clients.
revoke all on public.atar_planner_signups from anon, authenticated;
