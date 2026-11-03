-- Weekly Google Search Console snapshot, written by the Monday cron
-- (app/api/cron/search-console). One row per page and per search query for
-- the 7 days ending week_end. Aggregate search data only: no visitor data.

create table if not exists search_console_weekly (
  week_end date not null,
  dimension text not null check (dimension in ('page', 'query')),
  key text not null,
  clicks int not null default 0,
  impressions int not null default 0,
  ctr real,
  position real,
  created_at timestamptz not null default now(),
  primary key (week_end, dimension, key)
);

alter table search_console_weekly enable row level security;
-- No policies: only the service-role key (the cron) can read or write.
