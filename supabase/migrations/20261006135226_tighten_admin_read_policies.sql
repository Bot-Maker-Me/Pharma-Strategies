/*
# Tighten administrator read policies

## Security changes
- Removes the accidental `role = admin` self-row condition that could expose administrator profiles to other authenticated users.
- Adds a dedicated administrator SELECT policy for all app rows, including inactive rows.
- Keeps regular users restricted to their own profile and active public app catalog.
*/

DROP POLICY IF EXISTS "select_own_profile" ON users;
CREATE POLICY "select_own_profile"
  ON users FOR SELECT TO authenticated
  USING (auth.uid() = id OR EXISTS (SELECT 1 FROM users AS actor WHERE actor.id = auth.uid() AND actor.role = 'admin'));

DROP POLICY IF EXISTS "admin_select_apps" ON apps;
CREATE POLICY "admin_select_apps"
  ON apps FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));
