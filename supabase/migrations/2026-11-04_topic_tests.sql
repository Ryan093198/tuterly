-- Full topic tests emailed from the worksheet generator's free-limit box
-- (components/study/TopicTestOffer.jsx, app/api/topic-test/request).
--
-- topic_tests: one AI-written 25-question test (plus answer key) per
-- year level and curriculum topic. Written the first time a parent asks
-- for that topic, then reused for everyone, so each topic costs one
-- generation. Read by /topic-test/[id] through the service role only.
--
-- topic_test_requests: one row per request, so we can cap requests per
-- email and see what was sent.

create table if not exists public.topic_tests (
  id uuid primary key default gen_random_uuid(),
  year_level text not null,
  topic_id text not null,
  topic_label text not null,
  questions_md text,
  answers_md text,
  status text not null default 'pending' check (status in ('pending', 'ready', 'failed')),
  created_at timestamptz not null default now(),
  ready_at timestamptz,
  unique (year_level, topic_id)
);

create table if not exists public.topic_test_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  test_id uuid references public.topic_tests(id) on delete set null,
  year_level text,
  topic_id text,
  placement text,
  sent_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists topic_test_requests_email_idx
  on public.topic_test_requests (lower(email), created_at desc);

-- Service role only: no policies, so the anon and authenticated keys see nothing.
alter table public.topic_tests enable row level security;
alter table public.topic_test_requests enable row level security;
