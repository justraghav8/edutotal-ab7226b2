
CREATE TABLE public.service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_key text NOT NULL UNIQUE,
  label text NOT NULL,
  display_name text NOT NULL,
  description text,
  icon_key text,
  image_url text,
  order_index integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.service_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_categories TO authenticated;
GRANT ALL ON public.service_categories TO service_role;

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published service categories"
  ON public.service_categories FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage service categories"
  ON public.service_categories FOR ALL
  USING (is_admin(auth.uid()));

CREATE TRIGGER service_categories_updated_at
  BEFORE UPDATE ON public.service_categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

INSERT INTO public.service_categories (category_key, label, display_name, description, icon_key, order_index) VALUES
('Institution Development & Internationalisation', 'A', 'Institution Development & Internationalisation', 'Strategic guidance for institutions seeking global partnerships, accreditation, and academic excellence.', 'Building2', 1),
('Human Resources & Recruitment', 'B', 'Human Resources & Recruitment', 'End-to-end talent solutions for educational institutions — from leadership search to faculty recruitment.', 'Users', 2),
('Corporate Consulting, M&A & Regulation', 'C', 'Corporate Consulting, M&A & Regulation', 'Expert advisory on mergers, acquisitions, regulatory compliance, and corporate structuring in education.', 'Briefcase', 3),
('Financial & Legal Services', 'D', 'Financial & Legal Services', 'Comprehensive financial planning, legal counsel, and compliance services for educational entities.', 'Landmark', 4),
('Digital Learning & Innovation', 'E', 'Digital Learning & Innovation', 'Transforming education through technology — LMS, EdTech, and digital curriculum design.', 'Monitor', 5),
('Testing & Examination Services', 'F', 'Testing & Examination Services', 'Designing and managing assessments, entrance examinations, and evaluation frameworks.', 'ClipboardCheck', 6),
('Educational Real Estate & Campus Development', 'G', 'Educational Real Estate & Campus Development', 'From site selection to campus master-planning, creating world-class learning environments.', 'MapPin', 7),
('Conferences & Workshops', 'H', 'Conferences & Workshops', 'Curating impactful events, summits, and professional development workshops for educators.', 'CalendarDays', 8),
('Media, Branding & PR', 'I', 'Media, Branding & PR', 'Building powerful institutional brands through strategic communications and media outreach.', 'Megaphone', 9),
('Country Office', 'J', 'Country Office', 'Establishing and managing international representative offices for global education outreach.', 'Globe', 10);
