-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('images', 'images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']);

-- Allow anyone to view images (public bucket)
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated admins to upload images
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND public.is_admin(auth.uid()));

-- Allow authenticated admins to update images
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images' AND public.is_admin(auth.uid()));

-- Allow authenticated admins to delete images
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND public.is_admin(auth.uid()));