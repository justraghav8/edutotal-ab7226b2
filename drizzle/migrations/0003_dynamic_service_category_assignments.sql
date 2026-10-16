ALTER TABLE public.services ADD COLUMN category_id uuid REFERENCES public.service_categories(id) ON DELETE RESTRICT;
UPDATE public.services s SET category_id = c.id FROM public.service_categories c WHERE s.category::text = c.category_key;
ALTER TABLE public.services ALTER COLUMN category SET DEFAULT 'Institution Development & Internationalisation'::public.service_category;
COMMENT ON COLUMN public.services.category IS 'DEPRECATED: replaced by category_id; retained for compatibility with older deployments';
CREATE INDEX services_category_id_idx ON public.services(category_id);
CREATE OR REPLACE FUNCTION public.remove_service_category(category_to_remove uuid, destination_category uuid DEFAULT NULL) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
 IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Administrator access required'; END IF;
 PERFORM id FROM public.service_categories WHERE id = category_to_remove FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Category no longer exists'; END IF;
 IF destination_category IS NOT NULL THEN
  IF destination_category = category_to_remove THEN RAISE EXCEPTION 'Choose a different destination category'; END IF;
  PERFORM id FROM public.service_categories WHERE id = destination_category FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Destination category no longer exists'; END IF;
  UPDATE public.services SET category_id = destination_category WHERE category_id = category_to_remove;
 END IF;
 IF EXISTS (SELECT 1 FROM public.services WHERE category_id = category_to_remove) THEN RAISE EXCEPTION 'Move all services to another category before deleting'; END IF;
 DELETE FROM public.service_categories WHERE id = category_to_remove;
END; $$;
REVOKE ALL ON FUNCTION public.remove_service_category(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_service_category(uuid, uuid) TO authenticated, service_role;