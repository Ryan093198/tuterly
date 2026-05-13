-- Flat, denormalised audit row written every time a session report is
-- generated. The data is also reachable via joins on
-- sessions / profiles / students / ratings, but having it in one row
-- makes browsing in Supabase Table Editor trivial and survives later
-- edits to the source records (tutor name change, student rename,
-- session delete, etc).

create table if not exists session_report_log (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete set null,
  report_id uuid references reports(id) on delete set null,
  tutor_id uuid references profiles(id),
  tutor_name text,
  student_id uuid references students(id) on delete set null,
  student_name text,
  year_level text,
  subject text,
  session_date date,
  duration_minutes int,
  topics text,
  generated_at timestamptz not null default now()
);

create index if not exists session_report_log_generated_idx
  on session_report_log (generated_at desc);
create index if not exists session_report_log_tutor_idx
  on session_report_log (tutor_id, generated_at desc);

alter table session_report_log enable row level security;
-- No policies = anon/auth role can't read or write. The /api/generate
-- route writes via the service-role client (which bypasses RLS), and
-- the table is browsed through the Supabase dashboard.
