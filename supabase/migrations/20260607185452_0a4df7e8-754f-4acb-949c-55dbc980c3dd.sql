
-- Drop the previously created definer view; we'll protect email at the column level instead
DROP VIEW IF EXISTS public.team_members_public;

-- Restore public SELECT for published team members
CREATE POLICY "Anyone can view published team members"
ON public.team_members
FOR SELECT
USING (published = true);

-- Remove email column visibility for anonymous traffic
REVOKE SELECT ON public.team_members FROM anon;
GRANT SELECT (
  id, name, designation, biography, photo_url, category, order_index,
  published, linkedin_url, show_linkedin, show_email, created_at, updated_at
) ON public.team_members TO anon;

-- Authenticated users (admin UI) keep full access
GRANT SELECT ON public.team_members TO authenticated;
