/*
# Create PharmaSuite Core Tables

## Overview
Creates the five core tables for the PharmaSuite B2B compliance marketplace:
users, apps, subscriptions, leads, and audit_logs.

## New Tables

1. `users` — PharmaSuite user profiles (separate from auth.users)
   - `id` (uuid, PK, references auth.users)
   - `name` (text, not null)
   - `email` (text, unique, not null)
   - `company` (text, nullable)
   - `role` (text, default 'user')
   - `created_at` (timestamptz, default now())

2. `apps` — Catalog of subscribable compliance apps
   - `id` (uuid, PK)
   - `slug` (text, unique, not null) — matches config/apps.ts slug
   - `name` (text, not null)
   - `tagline` (text, not null)
   - `description` (text, not null)
   - `features` (text[], default '{}') — array of feature strings
   - `icon_url` (text, nullable)
   - `category` (text, not null)
   - `price_monthly` (integer, nullable) — in cents
   - `price_yearly` (integer, nullable) — in cents
   - `external_signup_url` (text, nullable)
   - `is_active` (boolean, default true)
   - `created_at` (timestamptz, default now())
   - `updated_at` (timestamptz, default now())

3. `subscriptions` — User subscriptions to apps
   - `id` (uuid, PK)
   - `user_id` (uuid, FK to users, not null)
   - `app_id` (uuid, FK to apps, not null)
   - `plan` (text, not null) — 'starter' | 'professional' | 'enterprise'
   - `status` (text, default 'active') — 'active' | 'cancelled' | 'past_due'
   - `start_date` (timestamptz, default now())
   - `end_date` (timestamptz, nullable)
   - `stripe_customer_id` (text, nullable)
   - `created_at` (timestamptz, default now())

4. `leads` — Contact form submissions
   - `id` (uuid, PK)
   - `name` (text, not null)
   - `email` (text, not null)
   - `company` (text, nullable)
   - `message` (text, not null)
   - `created_at` (timestamptz, default now())

5. `audit_logs` — Compliance audit trail
   - `id` (uuid, PK)
   - `user_id` (uuid, FK to users, nullable)
   - `action` (text, not null)
   - `metadata` (jsonb, default '{}')
   - `timestamp` (timestamptz, default now())

## Security
- RLS enabled on all tables.
- `users`: owner-scoped CRUD (authenticated users manage their own profile).
- `apps`: publicly readable (anon + authenticated SELECT), admin-only writes.
- `subscriptions`: owner-scoped CRUD.
- `leads`: public INSERT (contact form), no public read.
- `audit_logs`: owner-scoped SELECT only, no public INSERT/UPDATE/DELETE (server-side only via service role).

## Notes
- `users.id` references `auth.users(id)` with ON DELETE CASCADE so profiles are cleaned up when auth users are deleted.
- `subscriptions` has a unique constraint on (user_id, app_id) to prevent duplicate subscriptions.
- Indexes added on frequently-queried columns: email, slug, user_id, app_id.
- `leads` allows anonymous INSERT because the contact form is public (no auth required).
*/

-- ============================================================
-- 1. USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  company text,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON users;
CREATE POLICY "select_own_profile"
  ON users FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON users;
CREATE POLICY "insert_own_profile"
  ON users FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON users;
CREATE POLICY "update_own_profile"
  ON users FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON users;
CREATE POLICY "delete_own_profile"
  ON users FOR DELETE TO authenticated
  USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================================
-- 2. APPS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  icon_url text,
  category text NOT NULL,
  price_monthly integer,
  price_yearly integer,
  external_signup_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

-- Apps catalog is publicly readable
DROP POLICY IF EXISTS "anon_select_apps" ON apps;
CREATE POLICY "anon_select_apps"
  ON apps FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- No public write policies — apps are managed via service role / admin only

CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);
CREATE INDEX IF NOT EXISTS idx_apps_category ON apps(category);

-- ============================================================
-- 3. SUBSCRIPTIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  app_id uuid NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  plan text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz,
  stripe_customer_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uniq_user_app UNIQUE (user_id, app_id)
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_subscriptions" ON subscriptions;
CREATE POLICY "select_own_subscriptions"
  ON subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_subscriptions" ON subscriptions;
CREATE POLICY "insert_own_subscriptions"
  ON subscriptions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_subscriptions" ON subscriptions;
CREATE POLICY "update_own_subscriptions"
  ON subscriptions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_subscriptions" ON subscriptions;
CREATE POLICY "delete_own_subscriptions"
  ON subscriptions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_app_id ON subscriptions(app_id);

-- ============================================================
-- 4. LEADS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Leads can be inserted by anyone (public contact form)
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
  ON leads FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- No public read — leads are managed via service role / admin only

-- ============================================================
-- 5. AUDIT_LOGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  timestamp timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can read their own audit logs
DROP POLICY IF EXISTS "select_own_audit_logs" ON audit_logs;
CREATE POLICY "select_own_audit_logs"
  ON audit_logs FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- No public INSERT/UPDATE/DELETE — audit logs are created server-side via service role

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
