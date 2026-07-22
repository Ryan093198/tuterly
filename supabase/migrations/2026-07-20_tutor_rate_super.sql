-- ============================================================================
-- Tutor pay model: $35 base wage + superannuation on top (managed marketplace).
-- Replaces the old "$60 minus 15% commission" placeholder. Idempotent.
-- ============================================================================

-- Track super separately from the wage so the payout row records both the
-- amount owed to the tutor and the super owed to their fund.
alter table tutor_payouts
  add column if not exists super_amount decimal(10,2) not null default 0;

-- $35 is the default/floor rate; each tutor's profiles.hourly_rate can be set
-- higher to reward standout tutors. Existing tutors with no rate set inherit
-- the $35 default.
alter table profiles alter column hourly_rate set default 35;
update profiles set hourly_rate = 35 where role = 'tutor' and hourly_rate is null;
