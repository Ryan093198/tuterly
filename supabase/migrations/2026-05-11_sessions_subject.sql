-- Adds an optional per-session subject so a tutor who teaches the same
-- student both maths and english doesn't need two `students` rows. The
-- report-generation route reads session.subject when set and falls back to
-- student.subject otherwise.

alter table sessions add column if not exists subject text;
alter table sessions drop constraint if exists sessions_subject_check;
alter table sessions add constraint sessions_subject_check
  check (subject is null or subject in ('maths', 'english'));
