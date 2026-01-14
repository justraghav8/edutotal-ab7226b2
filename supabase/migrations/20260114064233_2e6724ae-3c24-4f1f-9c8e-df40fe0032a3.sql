-- Add image_url column to services table for cover images
ALTER TABLE public.services
ADD COLUMN image_url text;