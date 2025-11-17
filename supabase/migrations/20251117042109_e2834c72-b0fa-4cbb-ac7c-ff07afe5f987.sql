-- Create enum types
CREATE TYPE service_category AS ENUM (
  'Institution Development',
  'HR & Training',
  'Corporate Consulting',
  'Financial Services',
  'Digital & Technology',
  'Real Estate & Infrastructure',
  'Communication & Marketing'
);

CREATE TYPE insight_type AS ENUM (
  'Thought Leadership',
  'Case Study',
  'Whitepaper',
  'Blog',
  'Event'
);

CREATE TYPE team_category AS ENUM (
  'Leadership',
  'Advisory',
  'Staff'
);

-- Site Settings Table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT,
  tagline TEXT NOT NULL DEFAULT 'Transforming Education Through Strategic Excellence',
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  social_linkedin TEXT,
  social_twitter TEXT,
  social_facebook TEXT,
  primary_color TEXT DEFAULT '#1F3AA2',
  accent_color TEXT DEFAULT '#29BA74',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Banners Table
CREATE TABLE public.hero_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  background_image_url TEXT,
  cta_primary_text TEXT,
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  overview TEXT NOT NULL,
  category service_category NOT NULL,
  icon_key TEXT,
  approach JSONB DEFAULT '[]'::jsonb,
  domestic_expertise TEXT,
  international_expertise TEXT,
  benefits JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Industries Table
CREATE TABLE public.industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  focus_areas JSONB DEFAULT '[]'::jsonb,
  icon_key TEXT,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Industry Services Junction Table
CREATE TABLE public.industry_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID NOT NULL REFERENCES public.industries(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  UNIQUE(industry_id, service_id)
);

-- Insights Table
CREATE TABLE public.insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type insight_type NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  author TEXT,
  publish_date DATE DEFAULT CURRENT_DATE,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  biography TEXT NOT NULL,
  photo_url TEXT,
  category team_category NOT NULL,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients Table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT,
  organization TEXT,
  photo_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Careers Table
CREATE TABLE public.careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  qualifications JSONB DEFAULT '[]'::jsonb,
  location TEXT,
  apply_email TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions Table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  service_interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Anyone can view published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Anyone can view published industries" ON public.industries FOR SELECT USING (published = true);
CREATE POLICY "Anyone can view industry_services" ON public.industry_services FOR SELECT USING (true);
CREATE POLICY "Anyone can view published insights" ON public.insights FOR SELECT USING (published = true);
CREATE POLICY "Anyone can view published team members" ON public.team_members FOR SELECT USING (published = true);
CREATE POLICY "Anyone can view published clients" ON public.clients FOR SELECT USING (published = true);
CREATE POLICY "Anyone can view published testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Anyone can view published careers" ON public.careers FOR SELECT USING (published = true);
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view hero banners" ON public.hero_banners FOR SELECT USING (true);

-- Allow anyone to submit contact forms
CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.hero_banners FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.industries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.insights FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.careers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default site settings
INSERT INTO public.site_settings (
  tagline,
  contact_email,
  contact_phone,
  contact_address
) VALUES (
  'Transforming Education Through Strategic Excellence',
  'info@edutotal.in',
  '+91 11 4132 8320',
  'E-7, Defence Colony, New Delhi - 110024, India'
);

-- Insert hero banners
INSERT INTO public.hero_banners (page_key, title, subtitle) VALUES
('home', 'Transforming Education Through Strategic Excellence', 'End-to-end consulting solutions for educational institutions and corporate learning'),
('about', 'About EduTotal', 'Your trusted partner in educational transformation'),
('services', 'Our Services', 'Comprehensive consulting solutions for educational excellence'),
('industries', 'Industries We Serve', 'Specialized expertise across education sectors'),
('insights', 'Insights & Thought Leadership', 'Latest trends, research, and best practices in education'),
('careers', 'Join Our Team', 'Build your career in educational consulting');
