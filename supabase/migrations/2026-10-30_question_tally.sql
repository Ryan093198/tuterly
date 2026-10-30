-- Running total of practice questions the website writes, for the home
-- page counter (added to the app's own count from public_stats()).
-- worksheet_generations is cleared after 48 hours by the cleanup cron, so
-- it can't be summed for all time; this table keeps the running total.
-- Counts only: no question text, no emails, nothing about a visitor.
--
-- sources: 'worksheets' (free worksheet generator, 6 per sheet),
--          'try' (the fresh question from Try it free, 1 per try).

create table if not exists question_tally (
  source text primary key,
  total bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table question_tally enable row level security;
-- No policies: only the service-role key (API routes) can read or write.

create or replace function bump_question_tally(p_source text, p_n int)
returns void language sql security definer set search_path = public as $$
  insert into question_tally (source, total) values (p_source, greatest(p_n, 0))
  on conflict (source) do update
    set total = question_tally.total + excluded.total, updated_at = now();
$$;

revoke all on function bump_question_tally(text, int) from public, anon, authenticated;

-- Start the worksheet total from the generations still on record (each
-- sheet has 6 questions). Run once; later sheets are added as they happen.
insert into question_tally (source, total)
select 'worksheets', count(*) * 6 from worksheet_generations
on conflict (source) do nothing;
