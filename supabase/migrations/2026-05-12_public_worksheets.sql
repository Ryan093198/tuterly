-- Public free-worksheet generator at /worksheets. Two tables:
--
-- worksheet_email_signups — marketing list. Captured once per browser
-- before the visitor can generate. Email is unique; re-submission updates
-- the last_seen_at timestamp rather than inserting a duplicate.
--
-- worksheet_generations — one row per successful generation. Drives the
-- per-IP daily rate limit (count rows in the last 24h matching the
-- request IP) and gives us a basic conversion-funnel record.
--
-- Both tables are write-only from the public API (no RLS policies =
-- locked from anon/auth role; only the service-role key in the route
-- handlers can read/write).

create table if not exists worksheet_email_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  ip text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (email)
);

create table if not exists worksheet_generations (
  id uuid primary key default gen_random_uuid(),
  ip text,
  email text,
  year_level text not null,
  topic_id text,
  topic_label text not null,
  question_count int not null default 10,
  created_at timestamptz not null default now()
);

create index if not exists worksheet_generations_ip_created_idx
  on worksheet_generations (ip, created_at desc);

alter table worksheet_email_signups enable row level security;
alter table worksheet_generations enable row level security;
-- No policies = both tables are inaccessible from anon/auth role. The
-- service-role key bypasses RLS, so the API routes can still write.
