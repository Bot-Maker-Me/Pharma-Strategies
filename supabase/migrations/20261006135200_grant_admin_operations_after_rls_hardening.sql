/*
# Complete admin table privileges after RLS hardening

## Overview
Restores only the table-level privileges required for authenticated administrators.
RLS policies remain the enforcement boundary: ordinary authenticated users still
cannot use these operations because the policies require users.role = 'admin'.

## Changes
- `apps`: authenticated INSERT, UPDATE, DELETE restored for admin policies.
- `leads`: authenticated SELECT, UPDATE, DELETE restored for admin policies.
- `subscriptions`: authenticated SELECT, UPDATE, DELETE restored for owner/admin policies.
- `users`: authenticated SELECT and UPDATE retained for owner/admin policies.
- `site_settings`: authenticated CRUD restored for admin policies.

## Security
No anon write/read privileges are added beyond public lead INSERT and active app/site
settings SELECT. No role or ownership check is moved into the browser.
*/

GRANT INSERT, UPDATE, DELETE ON TABLE apps TO authenticated;
GRANT SELECT, UPDATE, DELETE ON TABLE leads TO authenticated;
GRANT SELECT, UPDATE, DELETE ON TABLE subscriptions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE site_settings TO authenticated;
