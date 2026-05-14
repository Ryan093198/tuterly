-- Fix "Database error saving new user" on Supabase signup.
--
-- Supabase tightened the SECURITY DEFINER search_path so functions no
-- longer implicitly resolve `profiles` to `public.profiles`. The two
-- auth triggers below worked historically but now throw `relation
-- "profiles" does not exist`, which Supabase surfaces to the client as
-- "Database error saving new user".
--
-- Fix: schema-qualify every table reference inside the function bodies
-- AND pin the search_path on the function itself so behaviour doesn't
-- depend on the caller's session settings.

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    nullif(new.raw_user_meta_data->>'role', '')
  );
  return new;
end;
$$;

create or replace function handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if old.email is distinct from new.email then
    update public.profiles
       set email = new.email,
           updated_at = now()
     where id = new.id;
  end if;
  return new;
end;
$$;
