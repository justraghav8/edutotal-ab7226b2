-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Update RLS policies for all CMS tables to allow admin access
CREATE POLICY "Admins can manage hero_banners"
  ON public.hero_banners
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage services"
  ON public.services
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage industries"
  ON public.industries
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage insights"
  ON public.insights
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage team_members"
  ON public.team_members
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage clients"
  ON public.clients
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage careers"
  ON public.careers
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage site_settings"
  ON public.site_settings
  FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view contact_submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (public.is_admin(auth.uid()));