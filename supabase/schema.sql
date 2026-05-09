-- Tuterly database schema
-- Paste this into the Supabase SQL Editor for the `tuterly` project (Singapore region).

create extension if not exists "uuid-ossp";

-- ═══ PROFILES ═══
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role text not null check (role in ('parent', 'tutor', 'admin')),
  avatar_url text,
  phone text,
  org_id uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ═══ ORGANISATIONS ═══
create table organisations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  primary_color text default '#00C2E0',
  owner_id uuid references profiles(id),
  plan text default 'trial' check (plan in ('trial', 'starter', 'pro', 'enterprise')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

alter table profiles add constraint fk_org foreign key (org_id) references organisations(id);

-- ═══ STUDENTS ═══
create table students (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  year_level text not null,
  school text,
  subjects text[] default '{}',
  goals text,
  concerns text,
  term_outline text,
  parent_id uuid references profiles(id),
  org_id uuid references organisations(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ═══ TUTOR-STUDENT LINKS ═══
create table tutor_students (
  id uuid primary key default uuid_generate_v4(),
  tutor_id uuid not null references profiles(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  status text default 'active' check (status in ('active', 'paused', 'ended')),
  created_at timestamptz default now(),
  unique(tutor_id, student_id)
);

-- ═══ SESSIONS ═══
create table sessions (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  tutor_id uuid not null references profiles(id),
  date date not null default current_date,
  duration_minutes int default 60,
  raw_notes text,
  status text default 'pending' check (status in ('pending', 'notes_added', 'report_generated', 'sent_to_parent')),
  created_at timestamptz default now()
);

-- ═══ REPORTS ═══
create table reports (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  content text not null,
  sent_at timestamptz,
  student_sent_at timestamptz,
  parent_viewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ═══ RATINGS ═══
create table ratings (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  topic text not null,
  subtopic text not null,
  confidence int not null check (confidence between 1 and 5),
  created_at timestamptz default now()
);

-- ═══ RESOURCES ═══
create table resources (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  uploaded_by uuid not null references profiles(id),
  name text not null,
  category text not null,
  content text,
  file_url text,
  notes text,
  created_at timestamptz default now()
);

-- ═══ INVITES ═══
create table invites (
  id uuid primary key default uuid_generate_v4(),
  from_user_id uuid not null references profiles(id),
  to_email text not null,
  student_id uuid references students(id),
  role text not null check (role in ('parent', 'tutor')),
  token text not null unique default encode(gen_random_bytes(32), 'hex'),
  status text default 'pending' check (status in ('pending', 'accepted', 'expired')),
  created_at timestamptz default now(),
  expires_at timestamptz default now() + interval '7 days'
);

-- ═══ SUBSCRIPTIONS ═══
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id),
  plan text not null check (plan in ('parent_monthly', 'tutor_monthly', 'business_monthly')),
  stripe_subscription_id text,
  status text default 'trial' check (status in ('trial', 'active', 'cancelled', 'expired')),
  trial_ends_at timestamptz default now() + interval '14 days',
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- ═══ INDEXES ═══
create index idx_students_parent on students(parent_id);
create index idx_students_org on students(org_id);
create index idx_sessions_student on sessions(student_id);
create index idx_sessions_tutor on sessions(tutor_id);
create index idx_sessions_date on sessions(date desc);
create index idx_reports_session on reports(session_id);
create index idx_ratings_student on ratings(student_id);
create index idx_tutor_students_tutor on tutor_students(tutor_id);
create index idx_tutor_students_student on tutor_students(student_id);
create index idx_invites_token on invites(token);
create index idx_invites_email on invites(to_email);

-- ═══ ROW LEVEL SECURITY ═══
alter table profiles enable row level security;
alter table students enable row level security;
alter table sessions enable row level security;
alter table reports enable row level security;
alter table ratings enable row level security;
alter table resources enable row level security;
alter table invites enable row level security;
alter table tutor_students enable row level security;
alter table organisations enable row level security;
alter table subscriptions enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Parents see own students" on students for select using (parent_id = auth.uid());
create policy "Parents can add students" on students for insert with check (parent_id = auth.uid());

create policy "Tutors see linked students" on students for select using (
  id in (select student_id from tutor_students where tutor_id = auth.uid())
);

create policy "Tutors see own sessions" on sessions for select using (tutor_id = auth.uid());
create policy "Tutors add sessions" on sessions for insert with check (tutor_id = auth.uid());

create policy "Parents see student sessions" on sessions for select using (
  student_id in (select id from students where parent_id = auth.uid())
);

create policy "View reports" on reports for select using (
  session_id in (
    select id from sessions where tutor_id = auth.uid()
    union
    select s.id from sessions s join students st on s.student_id = st.id where st.parent_id = auth.uid()
  )
);

-- ─── Tutor flow policies (needed once tutors start adding students/sessions) ───

-- Tutors can create students they own; tutor_students link is created in the same transaction.
create policy "Tutors can add students" on students for insert with check (
  parent_id is null or parent_id = auth.uid()
);

create policy "Tutors update linked students" on students for update using (
  id in (select student_id from tutor_students where tutor_id = auth.uid())
);

-- tutor_students: tutors manage their own links.
create policy "Tutors view own links" on tutor_students for select using (tutor_id = auth.uid());
create policy "Tutors create own links" on tutor_students for insert with check (tutor_id = auth.uid());
create policy "Tutors update own links" on tutor_students for update using (tutor_id = auth.uid());

-- Reports: tutor can write/update for their own sessions.
create policy "Tutors insert reports" on reports for insert with check (
  session_id in (select id from sessions where tutor_id = auth.uid())
);
create policy "Tutors update reports" on reports for update using (
  session_id in (select id from sessions where tutor_id = auth.uid())
);

-- Ratings: tutor can add ratings for their own sessions.
create policy "Tutors insert ratings" on ratings for insert with check (
  session_id in (select id from sessions where tutor_id = auth.uid())
);
create policy "Tutors view ratings" on ratings for select using (
  session_id in (select id from sessions where tutor_id = auth.uid())
  or student_id in (select id from students where parent_id = auth.uid())
);

-- Resources: tutor or parent can add resources for a student they're linked to.
create policy "Add resources for own students" on resources for insert with check (
  uploaded_by = auth.uid() and (
    student_id in (select id from students where parent_id = auth.uid())
    or student_id in (select student_id from tutor_students where tutor_id = auth.uid())
  )
);
create policy "View resources for own students" on resources for select using (
  student_id in (select id from students where parent_id = auth.uid())
  or student_id in (select student_id from tutor_students where tutor_id = auth.uid())
);

-- Sessions: tutor can update their own sessions (status transitions, raw_notes edits).
create policy "Tutors update own sessions" on sessions for update using (tutor_id = auth.uid());

-- Reports: parents can UPDATE their own report rows (specifically parent_viewed_at).
create policy "Parents update view timestamp" on reports for update using (
  session_id in (
    select s.id from sessions s join students st on s.student_id = st.id
    where st.parent_id = auth.uid()
  )
) with check (
  session_id in (
    select s.id from sessions s join students st on s.student_id = st.id
    where st.parent_id = auth.uid()
  )
);

-- Invites: tutor sees + creates their own invites. Acceptance is done with the
-- service-role client (bypasses RLS) so we don't need a public-token policy.
create policy "Tutors view own invites" on invites for select using (from_user_id = auth.uid());
create policy "Tutors create invites" on invites for insert with check (from_user_id = auth.uid());

-- Profiles: allow inserting your own row (for tutor-flow when org_id is set, etc.)
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- ─── Student working level (curriculum level being taught, vs school year) ───
alter table students add column if not exists working_level text;

-- ─── Student role + per-student account ───
-- A student can have their own Tuterly account so they see their own reports,
-- progress, and can upload resources. Optional — many students will only ever
-- exist as a `students` row managed by the tutor.
alter table profiles drop constraint if exists profiles_role_check;
alter table profiles add constraint profiles_role_check
  check (role in ('parent', 'tutor', 'admin', 'student'));

alter table invites drop constraint if exists invites_role_check;
alter table invites add constraint invites_role_check
  check (role in ('parent', 'tutor', 'student'));

alter table students add column if not exists student_user_id uuid references profiles(id);
create index if not exists idx_students_student_user on students(student_user_id);

alter table reports add column if not exists student_sent_at timestamptz;

-- ─── Flagged questions on practice worksheets ────────────────────────
-- Originally flagged_questions only tracked questions on session reports.
-- Practice worksheets (saved as `resources` rows with category=
-- 'practice_questions') now use the same flag flow: parents/students click
-- the same flag button, tutors see them in the same flagged-questions list.
-- One of report_id / resource_id is set; never both, never neither.
alter table flagged_questions alter column report_id drop not null;
alter table flagged_questions add column if not exists resource_id uuid
  references resources(id) on delete cascade;
alter table flagged_questions drop constraint if exists flagged_questions_source_check;
alter table flagged_questions add constraint flagged_questions_source_check
  check ((report_id is not null) <> (resource_id is not null));
create unique index if not exists flagged_questions_resource_unique
  on flagged_questions (student_id, resource_id, question_number)
  where resource_id is not null;
create index if not exists idx_flagged_questions_resource on flagged_questions(resource_id);

-- Resources can carry generator-specific metadata (e.g. the topic_id /
-- difficulty / question_count of a practice worksheet) so a "Regenerate"
-- button can replay the exact same parameters without parsing the markdown.
alter table resources add column if not exists metadata jsonb not null default '{}'::jsonb;

drop policy if exists "Students view own record" on students;
create policy "Students view own record" on students for select using (
  student_user_id = auth.uid()
);

drop policy if exists "Students view own sessions" on sessions;
create policy "Students view own sessions" on sessions for select using (
  student_id in (select id from students where student_user_id = auth.uid())
);

drop policy if exists "Students view own reports" on reports;
create policy "Students view own reports" on reports for select using (
  session_id in (
    select s.id from sessions s join students st on s.student_id = st.id
    where st.student_user_id = auth.uid()
  )
);

drop policy if exists "Students view own ratings" on ratings;
create policy "Students view own ratings" on ratings for select using (
  student_id in (select id from students where student_user_id = auth.uid())
);

drop policy if exists "Students view own resources" on resources;
create policy "Students view own resources" on resources for select using (
  student_id in (select id from students where student_user_id = auth.uid())
);

drop policy if exists "Students add own resources" on resources;
create policy "Students add own resources" on resources for insert with check (
  uploaded_by = auth.uid()
  and student_id in (select id from students where student_user_id = auth.uid())
);

drop policy if exists "Students view own session photos" on session_photos;
create policy "Students view own session photos" on session_photos for select using (
  session_id in (
    select s.id from sessions s join students st on s.student_id = st.id
    where st.student_user_id = auth.uid()
  )
);

-- ─── Flagged questions (student marks ones they want help with) ───
create table if not exists flagged_questions (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  report_id uuid not null references reports(id) on delete cascade,
  question_number int not null,
  topic text,
  flagged_at timestamptz default now(),
  unique(student_id, report_id, question_number)
);
create index if not exists idx_flagged_questions_student on flagged_questions(student_id);
create index if not exists idx_flagged_questions_report on flagged_questions(report_id);
alter table flagged_questions enable row level security;

alter table flagged_questions add column if not exists understood_at timestamptz;
alter table flagged_questions add column if not exists understood_by uuid references profiles(id);

-- ─── Student subject (curriculum framework) ───────────────────────────
-- Discriminates which VCAA framework drives the report prompt and progress
-- view. Distinct from `subjects text[]` (used to record VCE study designs
-- like 'VCE Maths Methods'). Defaults to 'maths' to keep existing rows
-- working until they're explicitly switched.
alter table students add column if not exists subject text default 'maths';
alter table students drop constraint if exists students_subject_check;
alter table students add constraint students_subject_check
  check (subject in ('maths', 'english'));

-- ─── API rate limit log ───────────────────────────────────────────────
-- Simple rolling-window rate limit table. Server actions / API routes log
-- calls here and check the count against a per-user-per-endpoint limit.
-- Cleaned up periodically; nothing depends on it surviving.
create table if not exists api_rate_limits (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null,
  called_at timestamptz default now()
);
create index if not exists idx_api_rate_limits_user_endpoint_time
  on api_rate_limits(user_id, endpoint, called_at desc);
alter table api_rate_limits enable row level security;
-- No SELECT policy — only the service-role admin client touches this table.

drop policy if exists "Students manage own flags" on flagged_questions;
drop policy if exists "Parents view own student flags" on flagged_questions;
drop policy if exists "Parents and students manage flags" on flagged_questions;
drop policy if exists "Tutors view linked student flags" on flagged_questions;
drop policy if exists "Tutors manage linked student flags" on flagged_questions;

create policy "Parents and students manage flags" on flagged_questions for all
  using (
    student_id in (select id from students where student_user_id = auth.uid())
    or student_id in (select id from students where parent_id = auth.uid())
  )
  with check (
    student_id in (select id from students where student_user_id = auth.uid())
    or student_id in (select id from students where parent_id = auth.uid())
  );

create policy "Tutors manage linked student flags" on flagged_questions for all
  using (student_id in (select student_id from tutor_students where tutor_id = auth.uid()))
  with check (student_id in (select student_id from tutor_students where tutor_id = auth.uid()));

-- ─── Session photos (working/notes uploads) ───
create table if not exists session_photos (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  uploaded_by uuid not null references profiles(id),
  file_url text not null,
  caption text,
  created_at timestamptz default now()
);

create index if not exists idx_session_photos_session on session_photos(session_id);

alter table session_photos enable row level security;

drop policy if exists "Tutors view session photos" on session_photos;
drop policy if exists "Tutors add session photos" on session_photos;
drop policy if exists "Tutors delete session photos" on session_photos;
drop policy if exists "Parents view student session photos" on session_photos;

create policy "Tutors view session photos" on session_photos for select using (
  session_id in (select id from sessions where tutor_id = auth.uid())
);
create policy "Tutors add session photos" on session_photos for insert with check (
  session_id in (select id from sessions where tutor_id = auth.uid())
  and uploaded_by = auth.uid()
);
create policy "Tutors delete session photos" on session_photos for delete using (
  session_id in (select id from sessions where tutor_id = auth.uid())
);
create policy "Parents view student session photos" on session_photos for select using (
  session_id in (
    select s.id from sessions s join students st on s.student_id = st.id
    where st.parent_id = auth.uid()
  )
);

-- ═══ AUTO-CREATE PROFILE ON SIGNUP ═══
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'parent')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ═══ SYNC PROFILE EMAIL WHEN AUTH EMAIL CHANGES ═══
-- After a parent confirms a verified email change (either self-initiated via
-- supabase.auth.updateUser, or tutor-initiated via the admin-API path), the
-- profiles row should reflect the new address so report emails and the UI
-- stay in sync.
create or replace function handle_user_email_change()
returns trigger as $$
begin
  if old.email is distinct from new.email then
    update profiles
       set email = new.email,
           updated_at = now()
     where id = new.id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_email_changed on auth.users;
create trigger on_auth_user_email_changed
  after update on auth.users
  for each row execute function handle_user_email_change();

-- ═══ PENDING EMAIL CHANGES (TUTOR-INITIATED) ═══
-- When a tutor changes a signed-up parent's email, we don't want to flip the
-- auth identity silently. We create a one-time token, email it to the NEW
-- address, and only swap the auth email after the parent clicks through.
create table if not exists pending_email_changes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  new_email text not null,
  initiated_by uuid not null references profiles(id),
  token text not null unique default encode(gen_random_bytes(32), 'hex'),
  expires_at timestamptz default now() + interval '24 hours',
  consumed_at timestamptz,
  created_at timestamptz default now()
);
create index if not exists idx_pending_email_changes_token on pending_email_changes(token);
create index if not exists idx_pending_email_changes_user on pending_email_changes(user_id);
alter table pending_email_changes enable row level security;
-- No SELECT policy — only the service-role admin client touches this table.

-- ─── Resource lookups for the centralised tutor index ───
-- The /dashboard/tutor/resources page lists every resource across all the
-- tutor's linked students, ordered by recency. This index covers that path.
create index if not exists idx_resources_student_created
  on resources(student_id, created_at desc);
create index if not exists idx_resources_uploaded_by on resources(uploaded_by);

-- ─── First-time-sign-in role picker ───
-- The previous trigger defaulted role to 'parent' when raw_user_meta_data
-- carried no role, which silently mislabelled anyone who clicked "Continue
-- with Google" without first choosing a role. Now: role stays NULL on those
-- signups, the proxy redirects them to /onboarding/role, and the picker
-- writes the chosen role.
alter table profiles alter column role drop not null;

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    nullif(new.raw_user_meta_data->>'role', '')
  );
  return new;
end;
$$ language plpgsql security definer;
