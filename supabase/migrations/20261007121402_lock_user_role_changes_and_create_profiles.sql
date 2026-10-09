/*
# Lock user roles and create profiles safely

## Overview
Prevents browser users from inserting or changing privileged profile fields while
still creating a normal profile automatically when a Supabase Auth account is made.
This supports secure administrator provisioning through Supabase Auth plus a trusted
profile update, without exposing a service-role credential in the application.

## Modified Tables
- `users`
  - Removes anon and authenticated table-wide write access.
  - Allows authenticated users to update only `name`, `email`, and `company`.
  - Keeps role changes outside browser-granted column privileges.

## New Database Function and Trigger
- `public.handle_new_user()` creates a `users` profile with role `user` after a new
  Auth account is created.
- The function uses a fixed search path and is callable only by the Auth trigger.

## Security
- A normal signed-in user cannot self-promote to `admin`.
- Anonymous users cannot read or write profiles.
- The existing administrator policies continue to govern administrator reads.
- The Auth trigger copies only a display name and email into the profile; it never
  reads mutable metadata for authorization.

## Important Notes
1. The first administrator must be created through Supabase Auth and then assigned
   `role = 'admin'` by a trusted project administrator.
2. Existing profiles are not deleted or changed by this migration.
3. This migration intentionally removes direct profile insertion from the browser;
   new profiles are created by the Auth trigger instead.
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'name', ''), split_part(NEW.email, '@', 1)),
    NEW.email,
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

REVOKE ALL ON TABLE users FROM anon, authenticated;
GRANT SELECT ON TABLE users TO authenticated;
GRANT UPDATE (name, email, company) ON TABLE users TO authenticated;
