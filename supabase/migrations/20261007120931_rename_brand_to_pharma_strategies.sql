/*
# Rename the public brand to Pharma Strategies

## Overview
Updates the public site setting so the database-backed brand name matches the requested
Pharma Strategies identity.

## Modified Tables
- `site_settings`
  - Updates the default `site_name` from PharmaSuite to Pharma Strategies.

## Security
- No access rules change.
- Existing RLS policies remain active and continue to restrict site-setting edits to admins.

## Important Notes
1. Existing users, app records, subscriptions, inquiries, and destination URLs are untouched.
2. Static fallback labels are updated in the application separately so the public site stays
   correct even if the settings request is temporarily unavailable.
*/

UPDATE site_settings
SET site_name = 'Pharma Strategies', updated_at = now()
WHERE id = 'default';
