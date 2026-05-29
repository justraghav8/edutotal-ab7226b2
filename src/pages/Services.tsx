import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { NextPageCTA } from "@/components/sections/NextPageCTA";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Loader2, Building2, Users, Briefcase, Landmark, Monitor, ClipboardCheck, MapPin, CalendarDays, Megaphone, Globe } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  Building2, Users, Briefcase, Landmark, Monitor,
  ClipboardCheck, MapPin, CalendarDays, Megaphone, Globe,
};

// Fallback images for services without a custom image_url - using reliable Unsplash IDs
const defaultServiceImages = [
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
];

// Simple hash to get consistent but varied fallback per service
function getFallbackImage(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return defaultServiceImages[Math.abs(hash) % defaultServiceImages.length];
}

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!loading && activeCategory) {
      setTimeout(() => scrollToCategory(activeCategory), 300);
    }
  }, [loading, activeCategory]);

  async function loadAll() {
    setLoading(true);
    const [{ data: svc }, { data: cats }] = await Promise.all([
      supabase.from("services").select("*").eq("published", true).order("order_index"),
      supabase.from("service_categories").select("*").eq("published", true).order("order_index"),
    ]);
    setServices(svc || []);
    setCategories(cats || []);
    setLoading(false);
  }

  const grouped = categories
    .map((c) => ({
      category: c.category_key,
      label: c.label,
      displayName: c.display_name,
      Icon: iconMap[c.icon_key] || Briefcase,
      description: c.description,
      image_url: c.image_url,
      services: services.filter((s) => s.category === c.category_key),
    }))
    .filter((g) => g.services.length > 0);

  const scrollToCategory = (cat: string) => {
    const el = document.getElementById(`cat-${cat.replace(/[^a-zA-Z]/g, "")}`);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="An integrated portfolio of services across 10 domains to support every dimension of educational excellence"
        minimal
        pageKey="services"
      />

      {/* Category Navigation */}
      <section className="py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {grouped.map((g) => {
              const Icon = g.Icon;
              return (
                <button
                  key={g.category}
                  onClick={() => scrollToCategory(g.category)}
                  className="group/nav flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all whitespace-nowrap shrink-0"
                >
                  <Icon className="h-3 w-3" />
                  <span>{g.label}</span>
                  <span className="max-w-0 overflow-hidden group-hover/nav:max-w-[200px] transition-all duration-300 ease-out">
                    <span className="pl-0.5">{g.displayName}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="bg-background">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="divide-y divide-border">
            {grouped.map((g, groupIdx) => {
              const Icon = g.Icon;
              return (
                <div
                  key={g.category}
                  id={`cat-${g.category.replace(/[^a-zA-Z]/g, "")}`}
                  className="py-16 lg:py-20"
                >
                  <div className="container mx-auto px-4">
                    {/* Category Header — clean, no image */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5 }}
                      className="mb-10 max-w-3xl"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-serif font-bold text-accent/20">{g.label}</span>
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-serif mb-3 text-foreground">
                        {g.displayName}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {g.description}
                      </p>
                    </motion.div>

                    {/* Service Cards with images */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {g.services.map((service, idx) => {
                        const imgSrc = service.image_url || getFallbackImage(service.title);

                        return (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.4, delay: idx * 0.06 }}
                          >
                            <Link
                              to={`/services/${service.slug}`}
                              className="group block h-full rounded-xl overflow-hidden bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-lg"
                            >
                              {/* Image */}
                              <div className="relative h-44 overflow-hidden">
                                <img
                                  src={imgSrc}
                                  alt={service.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                <span className="absolute top-3 left-3 text-[10px] font-mono bg-background/90 text-foreground px-2 py-0.5 rounded">
                                  {g.label}{idx + 1}
                                </span>
                              </div>

                              {/* Content */}
                              <div className="p-5">
                                <h3 className="text-base font-serif mb-2 group-hover:text-accent transition-colors leading-snug">
                                  {service.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                  {service.overview}
                                </p>
                                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-accent mt-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                  Explore
                                  <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            We understand that every institution has unique needs. Let's discuss
            how we can create a tailored solution for you.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-background text-background hover:bg-background hover:text-foreground"
          >
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>

      <NextPageCTA
        headline="See Who We Work With"
        description="Explore the industries and sectors we serve with specialized expertise."
        linkText="View Industries"
        linkHref="/industries"
      />
    </>
  );
}
