-- Where each email sign-up came from (Ryan, 9 Nov 2026).
--   source               the tool they first signed up through (worksheet_generator,
--                        exam_generator, mind_maps, weekly_signup); set once, never overwritten
--   source_page          the page path they were on at that first sign-up
--   weekly_opt_in_source where they last ticked the weekly worksheet email
--                        (e.g. worksheet_gate, worksheet_result, exam_limit)
-- Rows from before this change have nulls.
alter table public.worksheet_email_signups
  add column if not exists source text,
  add column if not exists source_page text,
  add column if not exists weekly_opt_in_source text;
