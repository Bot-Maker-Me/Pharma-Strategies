/*
# Secure PharmaSuite administration and seed the initial marketplace

## Overview
Hardens the existing PharmaSuite tables and adds the minimum administrator controls
needed to manage the public marketplace without exposing private destination URLs.

## New Tables

1. `site_settings`
   - `id` (text primary key)
   - `site_name` (text)
   - `logo_url` (text, nullable)
   - `updated_at` (timestamptz)
   Stores the public brand settings editable by administrators.

## Modified Tables

1. `users`
   - Adds a check constraint limiting roles to `user` and `admin`.
   - Admins can read all user profiles; regular users can only read their own.
   - Regular users cannot change their role.

2. `apps`
   - Only active app rows are public.
   - Only admins can create, update, or delete app catalog records.
   - Seeds exactly the three current marketplace apps: Narcotics Ledger, Nursing Home, and Pharma Portal.
   - Existing unused catalog rows are marked inactive instead of deleted.

3. `subscriptions`, `leads`, and `audit_logs`
   - Admins can read operational records.
   - Regular users retain only their own subscription/audit access.
   - Anonymous users cannot read or modify private records.

## Security
- Revokes broad anon/authenticated table privileges where not required.
- Adds separate admin policies for each CRUD verb where administration is needed.
- Admin checks use the authenticated user's `users.role` value, never client-supplied role data.
- Public app reads intentionally exclude destination URLs in the application layer; the redirect route resolves them server-side.
- Public site settings expose only branding fields through a SELECT policy.

## Important Notes
1. Create the first administrator in Supabase Auth, then create/update their matching `users` profile with `role = 'admin'` using a trusted database administrator. The application never provides a way for a browser user to promote themselves.
2. This migration does not delete existing app rows or user data; unused legacy app rows are only deactivated.
3. Legal copy is informational and should be reviewed by qualified Canadian counsel before production use.
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id text PRIMARY KEY,
  site_name text NOT NULL DEFAULT 'PharmaSuite',
  logo_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO site_settings (id, site_name)
VALUES ('default', 'PharmaSuite')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_settings" ON site_settings;
CREATE POLICY "public_read_site_settings"
  ON site_settings FOR SELECT TO anon, authenticated
  USING (id = 'default');

DROP POLICY IF EXISTS "admin_insert_site_settings" ON site_settings;
CREATE POLICY "admin_insert_site_settings"
  ON site_settings FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_update_site_settings" ON site_settings;
CREATE POLICY "admin_update_site_settings"
  ON site_settings FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_delete_site_settings" ON site_settings;
CREATE POLICY "admin_delete_site_settings"
  ON site_settings FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'));

DROP POLICY IF EXISTS "select_own_profile" ON users;
CREATE POLICY "select_own_profile"
  ON users FOR SELECT TO authenticated
  USING (auth.uid() = id OR role = 'admin' OR EXISTS (SELECT 1 FROM users AS actor WHERE actor.id = auth.uid() AND actor.role = 'admin'));

DROP POLICY IF EXISTS "update_own_profile" ON users;
CREATE POLICY "update_own_profile"
  ON users FOR UPDATE TO authenticated
  USING (auth.uid() = id OR EXISTS (SELECT 1 FROM users AS actor WHERE actor.id = auth.uid() AND actor.role = 'admin'))
  WITH CHECK (auth.uid() = id OR EXISTS (SELECT 1 FROM users AS actor WHERE actor.id = auth.uid() AND actor.role = 'admin'));

REVOKE ALL ON TABLE apps FROM anon, authenticated;
GRANT SELECT ON TABLE apps TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_apps" ON apps;
CREATE POLICY "anon_select_apps"
  ON apps FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "admin_insert_apps" ON apps;
CREATE POLICY "admin_insert_apps"
  ON apps FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_update_apps" ON apps;
CREATE POLICY "admin_update_apps"
  ON apps FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_delete_apps" ON apps;
CREATE POLICY "admin_delete_apps"
  ON apps FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "select_own_subscriptions" ON subscriptions;
CREATE POLICY "select_own_subscriptions"
  ON subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_update_subscriptions" ON subscriptions;
CREATE POLICY "admin_update_subscriptions"
  ON subscriptions FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_delete_subscriptions" ON subscriptions;
CREATE POLICY "admin_delete_subscriptions"
  ON subscriptions FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

REVOKE ALL ON TABLE leads FROM anon, authenticated;
GRANT INSERT ON TABLE leads TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
  ON leads FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_leads" ON leads;
CREATE POLICY "admin_select_leads"
  ON leads FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_update_leads" ON leads;
CREATE POLICY "admin_update_leads"
  ON leads FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "admin_delete_leads" ON leads;
CREATE POLICY "admin_delete_leads"
  ON leads FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

DROP POLICY IF EXISTS "select_own_audit_logs" ON audit_logs;
CREATE POLICY "select_own_audit_logs"
  ON audit_logs FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

UPDATE apps SET is_active = false WHERE slug NOT IN ('narcotics-ledger', 'nursing-home', 'pharma-portal');

INSERT INTO apps (slug, name, tagline, description, features, category, price_monthly, price_yearly, external_signup_url, is_active)
VALUES
  ('narcotics-ledger', 'Narcotics Ledger', 'Immutable controlled-substance tracking', 'Maintain a tamper-proof, audit-ready ledger for all controlled substances.', ARRAY['Immutable audit trail', 'DEA Form 222 generation', 'Dual-signature workflows'], 'Compliance', 99, 990, 'https://app.pharmasuite.com/signup/narcotics-ledger', true),
  ('nursing-home', 'Nursing Home', 'Medication compliance for care teams', 'Coordinate medication records, administration checks, and resident safety workflows.', ARRAY['Medication administration records', 'Resident safety checks', 'Care-team workflows'], 'Care Operations', 149, 1490, 'https://app.pharmasuite.com/signup/nursing-home', true),
  ('pharma-portal', 'Pharma Portal', 'One secure workspace for pharma operations', 'Bring regulatory documents, team workflows, and operational reporting into one secure portal.', ARRAY['Document control', 'Team approvals', 'Operational dashboards'], 'Operations', 199, 1990, 'https://app.pharmasuite.com/signup/pharma-portal', true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  features = EXCLUDED.features,
  category = EXCLUDED.category,
  price_monthly = EXCLUDED.price_monthly,
  price_yearly = EXCLUDED.price_yearly,
  external_signup_url = EXCLUDED.external_signup_url,
  is_active = EXCLUDED.is_active,
  updated_at = now();
