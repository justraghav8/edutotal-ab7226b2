CREATE TABLE public.home_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  eyebrow text,
  title text NOT NULL,
  subtitle text,
  image_url text,
  cta_text text,
  cta_link text,
  cta_new_tab boolean NOT NULL DEFAULT false,
  cta2_text text,
  cta2_link text,
  cta2_new_tab boolean NOT NULL DEFAULT false,
  overlay_opacity integer NOT NULL DEFAULT 55,
  order_index integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.home_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.home_slides TO authenticated;
GRANT ALL ON public.home_slides TO service_role;
ALTER TABLE public.home_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published home slides" ON public.home_slides FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage home slides" ON public.home_slides FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.home_slides FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
INSERT INTO public.home_slides (eyebrow, title, subtitle, image_url, cta_text, cta_link, order_index)
SELECT type::text, title, excerpt, cover_image_url, 'Read More', '/insights/' || slug, row_number() OVER (ORDER BY order_index, publish_date DESC) - 1
FROM (SELECT * FROM public.insights WHERE published = true ORDER BY order_index, publish_date DESC LIMIT 4) s;