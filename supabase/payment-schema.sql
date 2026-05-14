-- Phase 1 of the payment + credit system. Paste this into the Supabase
-- SQL Editor and run once. Every statement is idempotent (IF NOT EXISTS,
-- drop-and-recreate where needed) so you can re-run it safely while the
-- spec evolves.
--
-- After running, the database has:
--   - credits           one row per parent, tracks their session balance
--   - credit_transactions    immutable ledger of every credit movement
--   - tutor_payouts     one row per session that owes a tutor money
--   - tutor_stripe_accounts  links tutors to their Stripe Connect account
--   - invoices          parent-facing receipts
--   - session_packs     configurable pricing tiers (5/10/20 packs)
--   - profiles.hourly_rate, profiles.stripe_customer_id    new columns
--   - sessions.parent_credit_deducted, sessions.tutor_payout_id
--
-- Auto-topup, Stripe Connect transfers, and weekly payout cron jobs are
-- deliberately NOT wired up yet. The schema makes the columns and tables
-- ready; routes call into them progressively.

-- ═══ CREDITS ═══
create table if not exists credits (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references profiles(id) on delete cascade,
  credits_remaining int not null default 0,
  pack_size int not null default 5,
  auto_topup boolean default true,
  stripe_payment_method_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (parent_id)
);

-- ═══ CREDIT TRANSACTIONS ═══
-- An append-only ledger. Positive `credits` for purchase / refund,
-- negative for deduction. We can rebuild the balance at any time by
-- summing this table for a parent — useful for audits and refund disputes.
create table if not exists credit_transactions (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references profiles(id),
  type text not null check (type in ('purchase', 'deduction', 'refund', 'adjustment')),
  credits int not null,
  session_id uuid references sessions(id),
  stripe_payment_intent_id text,
  notes text,
  created_at timestamptz default now()
);

-- ═══ TUTOR PAYOUTS ═══
create table if not exists tutor_payouts (
  id uuid primary key default uuid_generate_v4(),
  tutor_id uuid not null references profiles(id),
  session_id uuid not null references sessions(id),
  amount decimal(10,2) not null,
  commission decimal(10,2) not null,
  status text default 'pending' check (status in ('pending', 'approved', 'paid', 'failed')),
  payout_batch_id text,
  stripe_transfer_id text,
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- ═══ TUTOR STRIPE ACCOUNTS ═══
create table if not exists tutor_stripe_accounts (
  id uuid primary key default uuid_generate_v4(),
  tutor_id uuid not null references profiles(id) on delete cascade,
  stripe_account_id text not null,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  unique (tutor_id)
);

-- ═══ INVOICES ═══
create table if not exists invoices (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid not null references profiles(id),
  type text not null check (type in ('subscription', 'session_pack', 'refund')),
  amount decimal(10,2) not null,
  description text,
  stripe_invoice_id text,
  stripe_payment_intent_id text,
  pdf_url text,
  status text default 'paid' check (status in ('paid', 'pending', 'failed', 'refunded')),
  created_at timestamptz default now()
);

-- ═══ SESSION PACK PRICING ═══
create table if not exists session_packs (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  sessions int not null,
  price decimal(10,2) not null,
  per_session decimal(10,2) not null,
  savings decimal(10,2) default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- Seed the default packs (insert only when the table is empty so re-runs
-- don't duplicate rows or trip the no-op insert).
insert into session_packs (name, sessions, price, per_session, savings)
select * from (values
  ('Starter',  5,  350.00, 70.00,   0.00),
  ('Standard', 10, 670.00, 67.00,  30.00),
  ('Term',     20, 1280.00, 64.00, 120.00)
) as v(name, sessions, price, per_session, savings)
where not exists (select 1 from session_packs);

-- ═══ COLUMNS ON EXISTING TABLES ═══
alter table profiles add column if not exists hourly_rate decimal(10,2);
alter table profiles add column if not exists stripe_customer_id text;

alter table sessions add column if not exists parent_credit_deducted boolean default false;
alter table sessions add column if not exists tutor_payout_id uuid references tutor_payouts(id);

-- ═══ PHASE 4B: DUPLICATE REPORT PROTECTION (DB LEVEL) ═══
-- One report per session, enforced at the database. Existing reports
-- table already cascades on session delete, but didn't enforce 1-to-1.
create unique index if not exists reports_session_id_unique
  on reports (session_id);

-- ═══ INDEXES ═══
create index if not exists idx_credits_parent on credits(parent_id);
create index if not exists idx_credit_tx_parent on credit_transactions(parent_id);
create index if not exists idx_credit_tx_session on credit_transactions(session_id);
create index if not exists idx_tutor_payouts_tutor on tutor_payouts(tutor_id);
create index if not exists idx_tutor_payouts_status on tutor_payouts(status);
create index if not exists idx_tutor_payouts_batch on tutor_payouts(payout_batch_id);
create index if not exists idx_tutor_payouts_session on tutor_payouts(session_id);
create index if not exists idx_invoices_parent on invoices(parent_id);
create index if not exists idx_session_packs_active on session_packs(active);

-- ═══ RLS ═══
alter table credits enable row level security;
alter table credit_transactions enable row level security;
alter table tutor_payouts enable row level security;
alter table invoices enable row level security;
alter table tutor_stripe_accounts enable row level security;
alter table session_packs enable row level security;

drop policy if exists "Parents view own credits" on credits;
create policy "Parents view own credits" on credits
  for select using (parent_id = auth.uid());

drop policy if exists "Parents view own transactions" on credit_transactions;
create policy "Parents view own transactions" on credit_transactions
  for select using (parent_id = auth.uid());

drop policy if exists "Parents view own invoices" on invoices;
create policy "Parents view own invoices" on invoices
  for select using (parent_id = auth.uid());

drop policy if exists "Tutors view own payouts" on tutor_payouts;
create policy "Tutors view own payouts" on tutor_payouts
  for select using (tutor_id = auth.uid());

drop policy if exists "Tutors view own stripe account" on tutor_stripe_accounts;
create policy "Tutors view own stripe account" on tutor_stripe_accounts
  for select using (tutor_id = auth.uid());

-- session_packs is public catalogue data, readable by anyone signed in.
drop policy if exists "Anyone reads pack list" on session_packs;
create policy "Anyone reads pack list" on session_packs
  for select using (true);
