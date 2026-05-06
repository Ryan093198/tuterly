-- Tuterly Storage bucket setup.
-- Run this once in the Supabase SQL Editor (after schema.sql).

-- Private bucket for student resources (textbooks, term outlines, etc.)
insert into storage.buckets (id, name, public)
values ('resources', 'resources', false)
on conflict (id) do nothing;

-- Private bucket for session photos (working/notes captured during a session).
insert into storage.buckets (id, name, public)
values ('session-photos', 'session-photos', false)
on conflict (id) do nothing;

-- Note: we do NOT add object-level RLS here. All storage I/O goes through the
-- service-role client in server actions, which authenticates the user via
-- Supabase Auth and verifies that they're linked to the student before
-- uploading or generating signed URLs. Direct browser → Storage access for
-- this bucket is not used.
