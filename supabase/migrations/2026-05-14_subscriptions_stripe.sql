-- Wire the existing subscriptions table up for Stripe.
--
-- Adds stripe_customer_id (we previously only stored the subscription id,
-- but we need the customer to update billing details / cancel later),
-- aligns the status check with Stripe's actual subscription status values
-- (`trialing` not `trial`, `canceled` US spelling, plus `past_due` /
-- `unpaid` / `incomplete*` so the webhook can write whatever Stripe sends),
-- makes user_id nullable so the webhook can insert a row before the
-- Supabase auth user is fully provisioned, and unique-indexes the Stripe
-- subscription id so duplicate webhook deliveries upsert cleanly.

alter table subscriptions add column if not exists stripe_customer_id text;
alter table subscriptions alter column user_id drop not null;

alter table subscriptions drop constraint if exists subscriptions_status_check;
alter table subscriptions add constraint subscriptions_status_check
  check (status in (
    'trialing', 'active', 'past_due', 'canceled', 'unpaid',
    'incomplete', 'incomplete_expired',
    -- legacy values kept so existing rows don't violate the check.
    'trial', 'cancelled', 'expired'
  ));

-- A plain unique constraint (not a partial index) so Supabase JS
-- upsert({ onConflict: "stripe_subscription_id" }) works correctly.
alter table subscriptions
  add constraint subscriptions_stripe_subscription_id_key
  unique (stripe_subscription_id);
create index if not exists subscriptions_user_idx
  on subscriptions (user_id);
create index if not exists subscriptions_customer_idx
  on subscriptions (stripe_customer_id);
