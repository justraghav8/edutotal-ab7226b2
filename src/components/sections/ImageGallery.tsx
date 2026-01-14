import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  order_index: number;
}

export function ImageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("published", true)
        .order("order_index");

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error loading gallery images:", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-serif">Our Journey in Pictures</h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-4 md:px-[calc((100vw-1280px)/2+1rem)] pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 w-80 md:w-96 snap-start group"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-lg font-serif text-foreground mb-1 group-hover:text-accent transition-colors">
              {image.title}
            </h3>
            {image.caption && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {image.caption}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex justify-center gap-1 mt-6 md:hidden">
        {images.slice(0, Math.min(images.length, 5)).map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        ))}
      </div>
    </section>
  );
}
