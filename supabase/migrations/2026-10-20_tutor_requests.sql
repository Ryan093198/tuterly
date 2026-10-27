-- "Want help from a local tutor?" funnel (website project).
--
-- 1. tutor_requests: one row per request forwarded to Tuterly Match's
--    feed-ingest. Holds NO phone number or child's name; the full request
--    lives in Tuterly Match. Lets us see worksheet -> tutor request -> booked.
-- 2. Marketing consent on the worksheet email list (Spam Act). Only rows
--    with marketing_opt_in = true may be sent promotional email.

create table if not exists tutor_requests (
  id uuid primary key default gen_random_uuid(),
  feed_enquiry_id uuid,            -- id returned by feed-ingest
  email text not null,             -- to join with worksheet_email_signups
  year smallint,                   -- 0 = Prep, 1-12, 13 = University
  suburb text,
  source text not null default 'worksheet',  -- worksheet | suburb_page | parents_page
  centres int not null default 0,  -- how many centres it reached
  created_at timestamptz not null default now()
);
create index if not exists tutor_requests_created_at_idx on tutor_requests (created_at desc);
create index if not exists tutor_requests_email_idx on tutor_requests (email);
alter table tutor_requests enable row level security;  -- no policies: service role only

alter table worksheet_email_signups
  add column if not exists marketing_opt_in boolean not null default false,
  add column if not exists marketing_opt_in_at timestamptz;

-- Numbers to watch (run in the SQL editor):
--   Worksheet sign-ups vs tutor requests per week:
--     select date_trunc('week', first_seen_at) wk, count(*) from worksheet_email_signups group by 1 order by 1 desc;
--     select date_trunc('week', created_at) wk, count(*) from tutor_requests group by 1 order by 1 desc;
--   Requests by suburb (where to recruit centres):
--     select suburb, count(*) from tutor_requests group by 1 order by 2 desc;
--   Demand with no supply:
--     select suburb, year, created_at from tutor_requests where centres = 0 order by created_at desc;
