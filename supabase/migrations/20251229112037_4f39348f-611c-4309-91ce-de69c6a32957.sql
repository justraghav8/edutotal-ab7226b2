-- Add Team category to the enum
ALTER TYPE team_category ADD VALUE IF NOT EXISTS 'Team';

-- Add linkedin_url and email columns to team_members
ALTER TABLE public.team_members 
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS email TEXT;