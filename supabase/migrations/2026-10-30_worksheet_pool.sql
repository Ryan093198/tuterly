-- Checked worksheets, reused across visitors (lib/worksheet-pool.js).
-- Each fresh worksheet is saved as 'pending'; /api/worksheets/verify has a
-- second model solve every question, then marks it 'verified' (reused for
-- other visitors) or 'rejected' (never reused). worksheet_pool_serves
-- records who has had which worksheet (hashed email, account and
-- connection keys, never the raw values) so nobody gets the same one twice.

create table if not exists worksheet_pool (
  id uuid primary key default gen_random_uuid(),
  year_level text not null,
  topic_key text not null,
  topic_label text not null,
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  check_notes text,
  served_count int not null default 0,
  created_at timestamptz not null default now(),
  checked_at timestamptz
);
create index if not exists worksheet_pool_lookup_idx on worksheet_pool (year_level, topic_key, status, served_count);

create table if not exists worksheet_pool_serves (
  pool_id uuid not null references worksheet_pool (id) on delete cascade,
  viewer text not null,
  created_at timestamptz not null default now(),
  primary key (pool_id, viewer)
);
create index if not exists worksheet_pool_serves_viewer_idx on worksheet_pool_serves (viewer);

alter table worksheet_pool enable row level security;
alter table worksheet_pool_serves enable row level security;
-- No policies: only the service-role key (API routes) can read or write.
