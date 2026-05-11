-- Adds a per-student "viewed at" timestamp on reports so the student
-- dashboard can show a "New" badge until the student has opened the current
-- version (compared against reports.updated_at, which bumps on regen).
--
-- Mirrors the existing parent_viewed_at column + "Parents update view
-- timestamp" policy.

alter table reports add column if not exists student_viewed_at timestamptz;

drop policy if exists "Students update view timestamp" on reports;
create policy "Students update view timestamp" on reports for update using (
  session_id in (
    select s.id from sessions s join students st on s.student_id = st.id
    where st.student_user_id = auth.uid()
  )
) with check (
  session_id in (
    select s.id from sessions s join students st on s.student_id = st.id
    where st.student_user_id = auth.uid()
  )
);
