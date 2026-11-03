-- Weekly worksheet email (4 Nov 2026). People who tick "Email me a free
-- worksheet for my child's year each week" on the worksheet or exam
-- generator get one email every Monday: a topic from their child's year,
-- three questions, a link to the full worksheet, and the Tuterly app.
--
-- Consent (Spam Act 2003): only rows with weekly_opt_in = true and no
-- unsubscribed_at are ever emailed. Every email has a one-click
-- unsubscribe link (unsub_token) and List-Unsubscribe headers.

alter table worksheet_email_signups
  add column if not exists weekly_opt_in boolean not null default false,
  add column if not exists weekly_opt_in_at timestamptz,
  add column if not exists unsubscribed_at timestamptz,
  add column if not exists unsub_token uuid not null default gen_random_uuid(),
  add column if not exists last_weekly_sent_at timestamptz;

create unique index if not exists worksheet_email_signups_unsub_token_idx
  on worksheet_email_signups (unsub_token);

-- One row per email sent: which topic, and whether it was opened and
-- clicked, so we can see which emails people engage with.
create table if not exists weekly_email_sends (
  id uuid primary key default gen_random_uuid(),
  signup_id uuid not null references worksheet_email_signups (id) on delete cascade,
  week date not null,
  year_level text not null,
  topic_slug text not null,
  resend_id text,
  sent_at timestamptz not null default now(),
  opened_at timestamptz,
  clicked_at timestamptz,
  click_count int not null default 0,
  unique (signup_id, week)
);

create index if not exists weekly_email_sends_week_idx on weekly_email_sends (week);

alter table weekly_email_sends enable row level security;
-- No policies: only the service-role key (the cron and tracking routes) can read or write.
