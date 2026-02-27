
-- First, delete all existing services (we'll re-insert all 27)
DELETE FROM public.industry_services;
DELETE FROM public.services;

-- Rename existing enum values to match document structure
ALTER TYPE public.service_category RENAME VALUE 'Institution Development' TO 'Institution Development & Internationalisation';
ALTER TYPE public.service_category RENAME VALUE 'HR & Training' TO 'Human Resources & Recruitment';
ALTER TYPE public.service_category RENAME VALUE 'Corporate Consulting' TO 'Corporate Consulting, M&A & Regulation';
ALTER TYPE public.service_category RENAME VALUE 'Financial Services' TO 'Financial & Legal Services';
ALTER TYPE public.service_category RENAME VALUE 'Digital & Technology' TO 'Digital Learning & Innovation';
ALTER TYPE public.service_category RENAME VALUE 'Real Estate & Infrastructure' TO 'Educational Real Estate & Campus Development';
ALTER TYPE public.service_category RENAME VALUE 'Communication & Marketing' TO 'Media, Branding & PR';

-- Add new categories
ALTER TYPE public.service_category ADD VALUE IF NOT EXISTS 'Testing & Examination Services';
ALTER TYPE public.service_category ADD VALUE IF NOT EXISTS 'Conferences & Workshops';
ALTER TYPE public.service_category ADD VALUE IF NOT EXISTS 'Country Office';
