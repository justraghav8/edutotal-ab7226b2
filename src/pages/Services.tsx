import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { NextPageCTA } from "@/components/sections/NextPageCTA";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Loader2, Building2, Users, Briefcase, Landmark, Monitor, ClipboardCheck, MapPin, CalendarDays, Megaphone, Globe } from "lucide-react";
import { motion } from "framer-motion";

const categoryIcons: Record<string, any> = {
  "Institution Development & Internationalisation": Building2,
  "Human Resources & Recruitment": Users,
  "Corporate Consulting, M&A & Regulation": Briefcase,
  "Financial & Legal Services": Landmark,
  "Digital Learning & Innovation": Monitor,
  "Testing & Examination Services": ClipboardCheck,
  "Educational Real Estate & Campus Development": MapPin,
  "Conferences & Workshops": CalendarDays,
  "Media, Branding & PR": Megaphone,
  "Country Office": Globe,
};

const categoryLabels: Record<string, string> = {
  "Institution Development & Internationalisation": "A",
  "Human Resources & Recruitment": "B",
  "Corporate Consulting, M&A & Regulation": "C",
  "Financial & Legal Services": "D",
  "Digital Learning & Innovation": "E",
  "Testing & Examination Services": "F",
  "Educational Real Estate & Campus Development": "G",
  "Conferences & Workshops": "H",
  "Media, Branding & PR": "I",
  "Country Office": "J",
};

// Ordered categories matching the document structure
const categoryOrder = [
  "Institution Development & Internationalisation",
  "Human Resources & Recruitment",
  "Corporate Consulting, M&A & Regulation",
  "Financial & Legal Services",
  "Digital Learning & Innovation",
  "Testing & Examination Services",
  "Educational Real Estate & Campus Development",
  "Conferences & Workshops",
  "Media, Branding & PR",
  "Country Office",
];

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (data) setServices(data);
    setLoading(false);
  }

  // Group services by category
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      Icon: categoryIcons[cat] || Briefcase,
      services: services.filter((s) => s.category === cat),
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
      <section className="py-6 border-b border-border bg-background sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {grouped.map((g) => {
              const Icon = g.Icon;
              return (
                <button
                  key={g.category}
                  onClick={() => scrollToCategory(g.category)}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-colors whitespace-nowrap shrink-0"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {g.category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-24">
              {grouped.map((g, groupIdx) => {
                const Icon = g.Icon;
                return (
                  <div
                    key={g.category}
                    id={`cat-${g.category.replace(/[^a-zA-Z]/g, "")}`}
                  >
                    {/* Category Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-4 mb-10"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">
                          {g.label}.
                        </span>
                        <h2 className="text-2xl md:text-3xl font-serif">
                          {g.category}
                        </h2>
                      </div>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {g.services.map((service, idx) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                          <Link
                            to={`/services/${service.slug}`}
                            className="group block h-full border border-border rounded-xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300 bg-card"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <span className="text-xs font-mono text-muted-foreground">
                                {String(service.order_index).padStart(2, "0")}
                              </span>
                            </div>
                            <h3 className="text-lg font-serif mb-3 group-hover:text-accent transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                              {service.overview}
                            </p>
                            <span className="text-sm font-medium inline-flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                              Learn More{" "}
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
