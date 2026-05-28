ALTER TABLE public.industries 
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS whats_happening jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS how_we_support text;