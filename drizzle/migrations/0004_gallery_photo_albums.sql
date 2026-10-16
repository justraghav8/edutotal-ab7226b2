CREATE TABLE public.gallery_albums (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 description text,
 location text,
 event_date date,
 cover_image_url text,
 order_index integer NOT NULL DEFAULT 0,
 published boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_albums TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_albums TO authenticated;
GRANT ALL ON public.gallery_albums TO service_role;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published albums" ON public.gallery_albums FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins can manage albums" ON public.gallery_albums FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER gallery_albums_updated_at BEFORE UPDATE ON public.gallery_albums FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
INSERT INTO public.gallery_albums (id, name, description) VALUES ('249951f6-d1fe-4a37-9654-927fda81ed48', 'Our Journey in Pictures', 'Moments, milestones, and memories from our journey');
ALTER TABLE public.gallery_images ADD COLUMN album_id uuid NOT NULL DEFAULT '249951f6-d1fe-4a37-9654-927fda81ed48' REFERENCES public.gallery_albums(id) ON DELETE RESTRICT;
CREATE INDEX gallery_images_album_order_idx ON public.gallery_images(album_id, order_index);
ALTER POLICY "Anyone can view published gallery images" ON public.gallery_images USING (published = true AND EXISTS (SELECT 1 FROM public.gallery_albums a WHERE a.id = album_id AND a.published = true));
CREATE OR REPLACE FUNCTION public.remove_gallery_album(album_to_remove uuid, destination_album uuid DEFAULT NULL) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
 IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Administrator access required'; END IF;
 PERFORM id FROM public.gallery_albums WHERE id = album_to_remove FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Album no longer exists'; END IF;
 IF destination_album IS NOT NULL THEN
  IF destination_album = album_to_remove THEN RAISE EXCEPTION 'Choose a different destination album'; END IF;
  PERFORM id FROM public.gallery_albums WHERE id = destination_album FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Destination album no longer exists'; END IF;
  UPDATE public.gallery_images SET album_id = destination_album WHERE album_id = album_to_remove;
 END IF;
 IF EXISTS (SELECT 1 FROM public.gallery_images WHERE album_id = album_to_remove) THEN RAISE EXCEPTION 'Move all photos to another album before deleting'; END IF;
 DELETE FROM public.gallery_albums WHERE id = album_to_remove;
END; $$;
REVOKE ALL ON FUNCTION public.remove_gallery_album(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_gallery_album(uuid, uuid) TO authenticated, service_role;