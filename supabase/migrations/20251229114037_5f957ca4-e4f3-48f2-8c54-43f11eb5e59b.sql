-- Add tags column to insights table for categorization
ALTER TABLE public.insights 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}'::TEXT[];