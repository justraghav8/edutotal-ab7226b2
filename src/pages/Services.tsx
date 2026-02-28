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

const categoryImages: Record<string, string> = {
  "Institution Development & Internationalisation": "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80",
  "Human Resources & Recruitment": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
  "Corporate Consulting, M&A & Regulation": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "Financial & Legal Services": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  "Digital Learning & Innovation": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  "Testing & Examination Services": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  "Educational Real Estate & Campus Development": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  "Conferences & Workshops": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  "Media, Branding & PR": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  "Country Office": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80",
};

const categoryDescriptions: Record<string, string> = {
  "Institution Development & Internationalisation": "Strategic guidance for institutions seeking global partnerships, accreditation, and academic excellence.",
  "Human Resources & Recruitment": "End-to-end talent solutions for educational institutions — from leadership search to faculty recruitment.",
  "Corporate Consulting, M&A & Regulation": "Expert advisory on mergers, acquisitions, regulatory compliance, and corporate structuring in education.",
  "Financial & Legal Services": "Comprehensive financial planning, legal counsel, and compliance services for educational entities.",
  "Digital Learning & Innovation": "Transforming education through technology — LMS, EdTech, and digital curriculum design.",
  "Testing & Examination Services": "Designing and managing assessments, entrance examinations, and evaluation frameworks.",
  "Educational Real Estate & Campus Development": "From site selection to campus master-planning, creating world-class learning environments.",
  "Conferences & Workshops": "Curating impactful events, summits, and professional development workshops for educators.",
  "Media, Branding & PR": "Building powerful institutional brands through strategic communications and media outreach.",
  "Country Office": "Establishing and managing international representative offices for global education outreach.",
};

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

  useEffect(() => {
    if (!loading && activeCategory) {
      setTimeout(() => scrollToCategory(activeCategory), 300);
    }
  }, [loading, activeCategory]);

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

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      Icon: categoryIcons[cat] || Briefcase,
      image: categoryImages[cat],
      description: categoryDescriptions[cat],
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
      <section className="py-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {grouped.map((g) => {
              const Icon = g.Icon;
              return (
                <button
                  key={g.category}
                  onClick={() => scrollToCategory(g.category)}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all whitespace-nowrap shrink-0"
                >
                  <Icon className="h-3 w-3" />
                  {g.category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services by Category - Visual Layout */}
      <section className="bg-background">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {grouped.map((g, groupIdx) => {
              const Icon = g.Icon;
              const isReversed = groupIdx % 2 !== 0;

              return (
                <div
                  key={g.category}
                  id={`cat-${g.category.replace(/[^a-zA-Z]/g, "")}`}
                  className={groupIdx % 2 === 0 ? "bg-background" : "bg-muted/30"}
                >
                  {/* Category Hero Banner */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[420px] ${isReversed ? "lg:direction-rtl" : ""}`}>
                    {/* Image Side */}
                    <motion.div
                      initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7 }}
                      className={`relative overflow-hidden ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                    >
                      <img
                        src={g.image}
                        alt={g.category}
                        className="w-full h-full object-cover min-h-[280px] lg:min-h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                      {/* Category Label Overlay */}
                      <div className="absolute bottom-6 left-6">
                        <span className="text-7xl font-serif font-bold text-white/20">
                          {g.label}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                      initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: 0.15 }}
                      className={`flex flex-col justify-center p-8 lg:p-16 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                          {g.label}. Category
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-serif mb-4 text-foreground">
                        {g.category}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                        {g.description}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{g.services.length}</span> specialized services
                      </div>
                    </motion.div>
                  </div>

                  {/* Services Cards */}
                  <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {g.services.map((service, idx) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: idx * 0.08 }}
                        >
                          <Link
                            to={`/services/${service.slug}`}
                            className="group block h-full relative overflow-hidden rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-lg"
                          >
                            {/* Card Image */}
                            {service.image_url && (
                              <div className="relative h-44 overflow-hidden">
                                <img
                                  src={service.image_url}
                                  alt={service.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                <span className="absolute top-3 left-3 text-xs font-mono bg-background/90 text-foreground px-2 py-0.5 rounded">
                                  {String(service.order_index).padStart(2, "0")}
                                </span>
                              </div>
                            )}
                            {!service.image_url && (
                              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-accent/10 via-muted to-accent/5 flex items-center justify-center">
                                <Icon className="h-16 w-16 text-accent/20" />
                                <span className="absolute top-3 left-3 text-xs font-mono text-muted-foreground">
                                  {String(service.order_index).padStart(2, "0")}
                                </span>
                              </div>
                            )}

                            {/* Card Content */}
                            <div className="p-5">
                              <h3 className="text-base font-serif mb-2 group-hover:text-accent transition-colors leading-snug">
                                {service.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                                {service.overview}
                              </p>
                              <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-accent translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                Explore
                                <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover:translate-x-1" />
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
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
