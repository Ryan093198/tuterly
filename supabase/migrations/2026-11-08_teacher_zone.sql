-- Teacher Zone (Ryan, 8 Nov 2026): teachers sign up with their email and
-- school, build up to 5 auto-marked papers a day from the question bank,
-- and share them by link. Students answer online at /paper/<id> and the
-- site marks them; /paper/<id>/solutions/<token> has the worked solutions.
--
-- teacher_signups: one row per teacher email.
-- shared_papers:   a snapshot of each paper, so a link never changes even
--                  when the question bank does. Holds the answers and
--                  marking keys, so it is read through the service role only.
-- paper_attempts:  one row per submitted attempt (score only, no names),
--                  for counts now and a class results view later.

create table if not exists public.teacher_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  school text,
  marketing_opt_in boolean not null default false,
  marketing_opt_in_at timestamptz,
  ip text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.shared_papers (
  id text primary key,
  solutions_token text not null,
  teacher_email text not null,
  school text,
  year_level text not null,
  title text not null,
  topics jsonb not null default '[]'::jsonb,
  paper jsonb not null,
  question_count int not null,
  total_marks int not null,
  minutes int not null,
  views int not null default 0,
  attempts int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists shared_papers_teacher_idx
  on public.shared_papers (lower(teacher_email), created_at desc);

create table if not exists public.paper_attempts (
  id uuid primary key default gen_random_uuid(),
  paper_id text not null references public.shared_papers(id) on delete cascade,
  score numeric not null,
  total int not null,
  correct int not null,
  questions int not null,
  created_at timestamptz not null default now()
);

create index if not exists paper_attempts_paper_idx on public.paper_attempts (paper_id, created_at desc);

-- Counters, bumped from the API without a read-modify-write race.
create or replace function public.bump_paper_counter(p_id text, p_field text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_field = 'views' then
    update shared_papers set views = views + 1 where id = p_id;
  elsif p_field = 'attempts' then
    update shared_papers set attempts = attempts + 1 where id = p_id;
  end if;
end $$;

revoke all on function public.bump_paper_counter(text, text) from public, anon, authenticated;

alter table public.teacher_signups enable row level security;
alter table public.shared_papers enable row level security;
alter table public.paper_attempts enable row level security;
-- Service role only: no policies, so the anon and authenticated keys see nothing.
