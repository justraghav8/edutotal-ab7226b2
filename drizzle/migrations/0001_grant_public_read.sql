GRANT SELECT ON public.team_members, public.careers, public.clients, public.gallery_images, public.hero_banners, public.industries, public.industry_services, public.insights, public.service_categories, public.services, public.site_settings, public.testimonials, public.home_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members, public.careers, public.clients, public.gallery_images, public.hero_banners, public.industries, public.insights, public.service_categories, public.services, public.site_settings, public.testimonials, public.home_slides TO authenticated;
GRANT SELECT ON public.industry_services TO authenticated;
GRANT INSERT ON public.contact_submissions TO anon;
GRANT SELECT, INSERT ON public.contact_submissions TO authenticated;