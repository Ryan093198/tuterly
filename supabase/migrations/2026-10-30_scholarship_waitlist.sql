-- Tuterly Scholarship waitlist, from the free numerical reasoning practice
-- pages (/scholarship-practice/...). Written by app/api/scholarship-waitlist
-- through the service-role client, after the honeypot + rate limit in
-- lib/public-form-guard.js. One row per email. confirmation_sent_at records
-- the one email we send; anything else sent to this list needs Ryan's OK.
-- RLS on with no policies: the browser can never read the list.

create table if not exists public.scholarship_waitlist (
  id                    uuid primary key default gen_random_uuid(),
  email                 text not null,
  role                  text not null default 'parent' check (role in ('parent', 'student', 'tutor')),
  child_year            smallint check (child_year between 3 and 8),
  test_provider         text check (test_provider in ('acer', 'edutest', 'aas', 'selective', 'not_sure')),
  practice_score        smallint check (practice_score between 0 and 10),
  practice_level        smallint check (practice_level between 5 and 7),
  source_page           text,
  confirmation_sent_at  timestamptz,
  created_at            timestamptz not null default now()
);

create unique index if not exists uq_scholarship_waitlist_email on public.scholarship_waitlist (lower(email));
create index if not exists idx_scholarship_waitlist_created on public.scholarship_waitlist (created_at desc);

alter table public.scholarship_waitlist enable row level security;
