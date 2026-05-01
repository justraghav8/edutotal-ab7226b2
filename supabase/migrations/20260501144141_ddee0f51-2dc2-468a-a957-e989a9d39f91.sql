
ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS show_linkedin boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS show_email boolean DEFAULT true;

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS logo_url text;

ALTER TABLE public.industries
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS content_box text;

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS description text;

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS social_instagram text,
  ADD COLUMN IF NOT EXISTS social_youtube text,
  ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '[]'::jsonb;
