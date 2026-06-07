
-- Replace public read access to team_members with a masked view
DROP POLICY IF EXISTS "Anyone can view published team members" ON public.team_members;

CREATE OR REPLACE VIEW public.team_members_public
WITH (security_invoker = false) AS
SELECT
  id,
  name,
  designation,
  biography,
  photo_url,
  category,
  order_index,
  published,
  linkedin_url,
  CASE WHEN show_email THEN email ELSE NULL END AS email,
  show_linkedin,
  show_email,
  created_at,
  updated_at
FROM public.team_members
WHERE published = true;

GRANT SELECT ON public.team_members_public TO anon, authenticated;
