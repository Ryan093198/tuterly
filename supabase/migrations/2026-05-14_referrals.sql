-- Parent referral program. Each parent gets a unique shareable code on
-- their profile. When a friend signs up via that code (worksheet trial)
-- AND their child receives their first generated report, the original
-- parent earns a $20 credit applied to their next Stripe invoice.
--
-- We track the chain in a `referrals` row from the moment Stripe Checkout
-- completes for the referee, so we can show pending referrals in the
-- refer-a-friend UI before the credit fires.

alter table profiles add column if not exists referral_code text;
create unique index if not exists profiles_referral_code_idx
  on profiles (referral_code)
  where referral_code is not null;

create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references profiles(id) on delete cascade,
  referred_email text not null,
  referred_user_id uuid references profiles(id) on delete set null,
  status text not null default 'signed_up'
    check (status in ('signed_up', 'credited', 'cancelled')),
  credit_amount_cents int not null default 2000,
  credit_currency text not null default 'aud',
  stripe_balance_transaction_id text,
  credited_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists referrals_referrer_idx
  on referrals (referrer_id, created_at desc);
create index if not exists referrals_referred_user_idx
  on referrals (referred_user_id);
-- Anti-dup: a single referred user can only generate ONE credit per
-- referrer. The unique partial index lets us re-run webhook deliveries
-- safely.
create unique index if not exists referrals_referrer_referee_idx
  on referrals (referrer_id, referred_user_id)
  where referred_user_id is not null;

alter table referrals enable row level security;
-- No policies = service-role-only. The /dashboard/parent/refer page
-- queries via the user-scoped client but goes through an API route that
-- uses the admin client and filters by auth.uid() server-side.
