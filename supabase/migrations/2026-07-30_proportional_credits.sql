-- ============================================================================
-- Proportional credits: 1 credit = 1 HOUR of tutoring.
--
-- Before: sending a report deducted a flat 1 credit regardless of session
-- length, while the tutor was paid by the hour - so a 2-hour session charged
-- the parent 1 credit but paid the tutor for 2 hours, collapsing the margin.
--
-- After: a session deducts credits in proportion to its duration
--   30m -> 0.5   45m -> 0.75   60m -> 1   90m -> 1.5   120m -> 2
-- so what the parent pays tracks the tutor's hourly cost at any length.
--
-- Safe to run while billing is off (no balances are deducted yet). Idempotent.
-- ============================================================================

-- 1) Balance + ledger hold fractional hours now.
alter table credits
  alter column credits_remaining type numeric(8,2) using credits_remaining::numeric;
alter table credit_transactions
  alter column credits type numeric(8,2) using credits::numeric;

-- 2) Proportional atomic deduction (replaces the flat deduct_one_credit).
--    Decrements iff the parent has at least p_amount; returns the new balance,
--    or NULL when there isn't enough - so the caller blocks the send and never
--    lets the balance go negative.
create or replace function deduct_credits(p_parent_id uuid, p_amount numeric)
returns numeric
language plpgsql
security definer
set search_path = public
as $$
declare
  new_remaining numeric;
begin
  if p_amount is null or p_amount <= 0 then
    select credits_remaining into new_remaining
      from credits where parent_id = p_parent_id;
    return new_remaining;
  end if;
  update credits
     set credits_remaining = credits_remaining - p_amount,
         updated_at = now()
   where parent_id = p_parent_id
     and credits_remaining >= p_amount
  returning credits_remaining into new_remaining;
  return new_remaining;
end;
$$;

-- 3) add_credits accepts fractional amounts. Packs still add whole hours (a
--    10-session pack = 10 credits = 10 hours); the billing rollback path can
--    re-credit a fractional amount. The old integer signature is dropped and
--    recreated as numeric; existing integer callers cast implicitly.
drop function if exists add_credits(uuid, int, int);
create or replace function add_credits(p_parent_id uuid, p_amount numeric, p_pack_size int)
returns numeric
language plpgsql
security definer
set search_path = public
as $$
declare
  new_remaining numeric;
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
