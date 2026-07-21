-- ============================================================================
-- P2 billing safety (audit H4 + L1 commission rounding). Makes the DORMANT
-- payment code correct and idempotent so it's a sound foundation when billing
-- is switched on. Nothing here turns billing on. Idempotent; run after the P0
-- and P1 migrations.
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────
-- Idempotency constraints so retries / double-clicks / webhook redeliveries
-- can never double-deduct, double-pay, or double-credit (H4).
-- ─────────────────────────────────────────────────────────────────────────

-- One payout per session.
create unique index if not exists tutor_payouts_session_unique
  on tutor_payouts (session_id);

-- One deduction per session (partial: only deduction rows are constrained).
create unique index if not exists credit_tx_session_deduction_unique
  on credit_transactions (session_id)
  where type = 'deduction';

-- One purchase ledger row per Stripe payment intent (dedup pack purchases).
create unique index if not exists credit_tx_payment_intent_unique
  on credit_transactions (stripe_payment_intent_id)
  where stripe_payment_intent_id is not null;

-- One invoice per Stripe payment intent.
create unique index if not exists invoices_payment_intent_unique
  on invoices (stripe_payment_intent_id)
  where stripe_payment_intent_id is not null;

-- ─────────────────────────────────────────────────────────────────────────
-- Global Stripe webhook event dedup. The webhook records each event id here
-- once; a redelivery of the same event id is recognised and short-circuited.
-- Service-role only (RLS on, no policies).
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists stripe_events (
  event_id text primary key,
  type text,
  received_at timestamptz not null default now()
);
alter table stripe_events enable row level security;

-- ─────────────────────────────────────────────────────────────────────────
-- Atomic credit mutations (H4: the JS read-modify-write could lose updates
-- when a purchase and a deduction raced). These do the check-and-change in one
-- statement so concurrent calls are safe and the balance can never go negative.
-- ─────────────────────────────────────────────────────────────────────────

-- Decrement one credit iff the parent has at least one. Returns the new
-- balance, or NULL when there was nothing to decrement (no row / zero balance).
create or replace function deduct_one_credit(p_parent_id uuid)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  new_remaining int;
begin
  update credits
     set credits_remaining = credits_remaining - 1,
         updated_at = now()
   where parent_id = p_parent_id
     and credits_remaining >= 1
  returning credits_remaining into new_remaining;
  return new_remaining;
end;
$$;

-- Add credits atomically (creates the row on first purchase). Returns the new
-- balance.
create or replace function add_credits(p_parent_id uuid, p_amount int, p_pack_size int)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  new_remaining int;
begin
  insert into credits (parent_id, credits_remaining, pack_size)
  values (p_parent_id, p_amount, coalesce(p_pack_size, 5))
  on conflict (parent_id) do update
    set credits_remaining = credits.credits_remaining + excluded.credits_remaining,
        pack_size = excluded.pack_size,
        updated_at = now()
  returning credits_remaining into new_remaining;
  return new_remaining;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- Subscription sync robustness (H4): give `plan` a default so the webhook can
-- UPSERT a subscription row even when a `customer.subscription.updated` event
-- arrives before `checkout.session.completed` (which is what carries user_id).
-- ─────────────────────────────────────────────────────────────────────────
alter table subscriptions alter column plan set default 'parent_monthly';

-- Referral-abuse guard support (H4): index to count a referrer's credited
-- referrals quickly for the per-referrer cap.
create index if not exists idx_referrals_referrer_status
  on referrals (referrer_id, status);
