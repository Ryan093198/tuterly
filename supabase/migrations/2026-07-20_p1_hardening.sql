-- ============================================================================
-- P1 hardening (audit remediation, second batch)
-- Covers: reports.session_id uniqueness (L1) and a public-form IP rate-limit
-- log for the unauthenticated contact / enquiry / tutor-application routes (H2).
-- Idempotent: safe to re-run. Run after 2026-07-20_p0_security_lockdown.sql.
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────
-- L1: enforce one report per session at the database. Both /api/generate and
-- updateReport do check-then-insert with no unique constraint, so two
-- concurrent generations could create two report rows (after which sendReport's
-- .single() lookup throws). payment-schema.sql also creates this index; the
-- guard makes it safe if that file hasn't been run in this environment.
-- ─────────────────────────────────────────────────────────────────────────
create unique index if not exists reports_session_id_unique
  on reports (session_id);

-- ─────────────────────────────────────────────────────────────────────────
-- H2: per-IP rate-limit log for the public (unauthenticated) forms. Written by
-- the service-role client from the route handlers; RLS enabled with no policies
-- so anon/auth roles can neither read nor write it. Cleaned up by the cron in
-- /api/cron/cleanup-rate-limits.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public_request_log (
  id bigserial primary key,
  ip text,
  endpoint text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_public_request_log_ip_endpoint_time
  on public_request_log (ip, endpoint, created_at desc);
create index if not exists idx_public_request_log_created
  on public_request_log (created_at);
alter table public_request_log enable row level security;
-- No policies: service-role only.
