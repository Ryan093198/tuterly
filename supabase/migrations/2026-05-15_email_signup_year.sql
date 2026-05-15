-- Capture the child's year level alongside the email when a visitor
-- unlocks the public worksheet generator. Lets us segment the marketing
-- list by year level later (Year 7 parents get different content than
-- Year 10 parents).

alter table worksheet_email_signups
  add column if not exists year_level text;
