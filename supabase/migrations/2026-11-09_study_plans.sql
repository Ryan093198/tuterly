-- Maths exam study planner (Ryan, 9 Nov 2026). A student or parent fills in
-- the planner on /study-planner; the plan is saved here and emailed as a
-- private link (/plan/<id>). `done` holds the nights ticked off, shared by
-- everyone with the link. Service role only (RLS on, no policies).
create table if not exists public.study_plans (
  id text primary key,
  email text not null,
  role text not null check (role in ('student', 'parent')),
  year_level text not null,
  exam_date date not null,
  chapters text[] not null default '{}',
  weekdays int[] not null default '{}',
  plan jsonb not null,
  done jsonb not null default '{}'::jsonb,
  ip text,
  created_at timestamptz not null default now(),
  last_opened_at timestamptz,
  opens int not null default 0
);
create index if not exists study_plans_email_idx on public.study_plans (email, created_at desc);
create index if not exists study_plans_ip_idx on public.study_plans (ip, created_at desc);
alter table public.study_plans enable row level security;
