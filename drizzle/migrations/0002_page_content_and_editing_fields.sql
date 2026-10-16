CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view page content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage page content" ON public.page_content FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER page_content_updated_at BEFORE UPDATE ON public.page_content FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.careers ADD COLUMN employment_type text DEFAULT 'Full Time';
ALTER TABLE public.careers ADD COLUMN order_index integer NOT NULL DEFAULT 0;
ALTER TABLE public.careers ADD COLUMN apply_url text;

GRANT SELECT ON public.industry_services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.industry_services TO authenticated;
GRANT ALL ON public.industry_services TO service_role;
CREATE POLICY "Admins can manage industry_services" ON public.industry_services FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));