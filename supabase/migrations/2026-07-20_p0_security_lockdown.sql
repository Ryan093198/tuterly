-- ============================================================================
-- P0 security lockdown (pre-public-launch audit remediation)
-- Covers audit findings C1, C3, C4, C5, and L1 (students UPDATE WITH CHECK).
-- Idempotent: safe to re-run.
--
-- Run this in the Supabase SQL editor AFTER schema.sql / payment-schema.sql.
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────
-- New profile columns: approval gate (C5) + consent capture (C7).
-- ─────────────────────────────────────────────────────────────────────────
alter table profiles add column if not exists approved boolean not null default false;
alter table profiles add column if not exists terms_accepted_at timestamptz;
alter table profiles add column if not exists terms_version text;

-- Grandfather existing tutors so the current pilot isn't locked out the
-- moment this ships. NEW tutor signups start unapproved and must be approved
-- in the admin dashboard. Review this list after deploy and revoke any tutor
-- you don't actually want live:  update profiles set approved=false where ...
update profiles set approved = true where role = 'tutor' and approved is distinct from true;
-- Parents/students/admins don't need approval; approved is only ever checked
-- on the tutor student-creation path. Mark them approved for cleanliness.
update profiles set approved = true where role in ('parent', 'student', 'admin') and approved is distinct from true;

-- ─────────────────────────────────────────────────────────────────────────
-- C4: signup role must be an allow-listed value. The previous trigger copied
-- raw_user_meta_data->>'role' straight through (only nullif on empty), so a
-- crafted signUp({ data: { role: 'admin' }}) self-provisioned an admin.
-- Now anything not in (parent,tutor,student) becomes NULL → onboarding picker.
-- Also captures Terms/Privacy consent (C7) passed in signup metadata.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, email, full_name, role, terms_accepted_at, terms_version)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    case
      when new.raw_user_meta_data->>'role' in ('parent', 'tutor', 'student')
        then new.raw_user_meta_data->>'role'
      else null
    end,
    case
      when (new.raw_user_meta_data->>'terms_accepted') = 'true' then now()
      else null
    end,
    nullif(new.raw_user_meta_data->>'terms_version', '')
  );
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- C3: stop users escalating their own privileges via a direct profiles UPDATE.
-- The "Users can update own profile" RLS policy has no column restriction, so
-- a browser call could set role='admin' or hourly_rate=100000. This BEFORE
-- UPDATE trigger pins the privileged columns to their previous values whenever
-- the update is a self-service update made through a user JWT.
--
-- Service-role writes (the admin client used by onboarding, webhooks, invite
-- acceptance, and the new admin dashboard) run with auth.uid() = NULL and are
-- intentionally NOT constrained — that's how legitimate role/approval changes
-- still happen. `email` is deliberately left mutable so the auth email-sync
-- trigger keeps working.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if auth.uid() is not null and auth.uid() = new.id then
    new.role             := old.role;
    new.approved         := old.approved;
    new.hourly_rate      := old.hourly_rate;
    new.stripe_customer_id := old.stripe_customer_id;
    new.referral_code    := old.referral_code;
    new.org_id           := old.org_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_profile_privesc on profiles;
create trigger trg_prevent_profile_privesc
  before update on profiles
  for each row execute function prevent_profile_privilege_escalation();

-- ─────────────────────────────────────────────────────────────────────────
-- C1: a signed-in user could self-link to ANY student and then read/write
-- that child's records, because the tutor_students INSERT/UPDATE policies
-- only checked tutor_id = auth.uid() and never verified a relationship to the
-- student. All legitimate links are created server-side with the service-role
-- client (invite acceptance + the createStudent server action), so we remove
-- the public write policies entirely. SELECT ("Tutors view own links") stays,
-- so ownership reads still work.
-- ─────────────────────────────────────────────────────────────────────────
drop policy if exists "Tutors create own links" on tutor_students;
drop policy if exists "Tutors update own links" on tutor_students;

-- C1/C5: remove the permissive tutor-facing students INSERT policy. Tutors now
-- create students only via the createStudent server action, which verifies the
-- caller is an APPROVED tutor and inserts with the service-role client. Parents
-- keep their own insert policy (parent_id = auth.uid()).
drop policy if exists "Tutors can add students" on students;

-- L1: the tutor students UPDATE policy had a USING clause but no WITH CHECK, so
-- a linked tutor could rewrite parent_id / student_user_id and hijack ownership.
-- Recreate it with a matching WITH CHECK.
drop policy if exists "Tutors update linked students" on students;
create policy "Tutors update linked students" on students for update
  using (
    id in (select student_id from tutor_students where tutor_id = auth.uid())
  )
  with check (
    id in (select student_id from tutor_students where tutor_id = auth.uid())
  );

-- ─────────────────────────────────────────────────────────────────────────
-- C5: persist tutor applications so the team can vet them in the admin
-- dashboard, instead of the application only ever being an email. Written by
-- the public /api/tutor-application route via the service-role client; RLS is
-- enabled with no policies so anon/auth roles can't read or write it.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists tutor_applications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subjects text,
  year_levels text,
  experience text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  linked_user_id uuid references profiles(id),
  created_at timestamptz default now()
);
create index if not exists idx_tutor_applications_status
  on tutor_applications (status, created_at desc);
create index if not exists idx_tutor_applications_email
  on tutor_applications (lower(email));
alter table tutor_applications enable row level security;
-- No policies: service-role only.
