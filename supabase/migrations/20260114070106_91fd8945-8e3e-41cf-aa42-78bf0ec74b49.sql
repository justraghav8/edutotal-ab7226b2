-- Create gallery_images table for About page gallery
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Public can view published images
CREATE POLICY "Anyone can view published gallery images"
ON public.gallery_images
FOR SELECT
USING (published = true);

-- Admins can manage all gallery images
CREATE POLICY "Admins can manage gallery images"
ON public.gallery_images
FOR ALL
USING (is_admin(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_gallery_images_updated_at
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();