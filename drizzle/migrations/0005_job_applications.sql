CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid REFERENCES public.careers(id) ON DELETE SET NULL,
  job_title text NOT NULL,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 50),
  resume_url text CHECK (resume_url IS NULL OR char_length(resume_url) <= 1000),
  cover_letter text CHECK (cover_letter IS NULL OR char_length(cover_letter) <= 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.job_applications TO anon;
GRANT SELECT, INSERT, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit applications" ON public.job_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view applications" ON public.job_applications FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete applications" ON public.job_applications FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));