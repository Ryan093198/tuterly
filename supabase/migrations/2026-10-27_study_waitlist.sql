-- Tuterly Study waitlist (pilot-stage "Get notified" / "Join the free pilot").
--
-- Written by app/api/study-waitlist/route.js through the service-role client,
-- after the honeypot + per-IP rate limit in lib/public-form-guard.js.
--
-- Access: RLS on, NO select/update/delete for anon or authenticated, so the
-- browser can never read the list. Inserts also go through the API route
-- (not straight from the browser with the anon key) so the spam guard can't
-- be skipped; that's the same posture as atar_planner_signups and
-- public_request_log.
--
-- One row per email (case-insensitive). A repeat signup is a no-op and never
-- triggers a second confirmation email. confirmation_sent_at records the one
-- email we send; anything else sent to this list needs Ryan's OK first.
--
-- Idempotent. Safe to re-run.

create table if not exists public.study_waitlist (
  id                    uuid primary key default gen_random_uuid(),
  email                 text not null,
  role                  text not null default 'parent'
                          check (role in ('parent', 'student', 'tutor')),
  year_level            smallint check (year_level between 7 and 10),
  interest              text not null default 'launch'
                          check (interest in ('launch', 'pilot', 'android')),
  source_page           text,
  placement             text,
  confirmation_sent_at  timestamptz,
  created_at            timestamptz not null default now()
);

create unique index if not exists uq_study_waitlist_email
  on public.study_waitlist (lower(email));

create index if not exists idx_study_waitlist_created
  on public.study_waitlist (created_at desc);

alter table public.study_waitlist enable row level security;

-- Deliberately no policies: default-deny for anon and authenticated.
revoke all on public.study_waitlist from anon, authenticated;
