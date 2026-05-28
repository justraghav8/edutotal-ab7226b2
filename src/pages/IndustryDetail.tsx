import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Loader2, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/SafeImage";

export default function IndustryDetail() {
  const { slug } = useParams();
  const [industry, setIndustry] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadIndustry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function loadIndustry() {
    setLoading(true);
    const { data } = await supabase
      .from("industries")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      setIndustry(data);
      const { data: relations } = await supabase
        .from("industry_services")
        .select("service_id")
        .eq("industry_id", data.id);

      if (relations && relations.length > 0) {
        const serviceIds = relations.map((r) => r.service_id);
        const { data: servicesData } = await supabase
          .from("services")
          .select("*")
          .in("id", serviceIds)
          .eq("published", true);

        if (servicesData) setServices(servicesData);
      } else {
        setServices([]);
      }
    } else {
      setIndustry(null);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif mb-4">Industry Not Found</h1>
        <Button asChild>
          <Link to="/industries">View All Industries</Link>
        </Button>
      </div>
    );
  }

  const whatsHappening: string[] = Array.isArray(industry.whats_happening)
    ? industry.whats_happening
    : [];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <SafeImage
            src={industry.image_url}
            alt={industry.title}
            fallbackSeed={`industry-${industry.slug}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/40" />

        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-20 md:py-28">
          <Button
            asChild
            variant="ghost"
            className="text-background/80 hover:text-background hover:bg-background/10 mb-8 -ml-3"
          >
            <Link to="/industries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Industries
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-accent mb-5">
              Industry
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-5">
              {industry.title}
            </h1>
            {industry.tagline && (
              <p className="text-lg md:text-xl italic text-background/70 max-w-2xl">
                {industry.tagline}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-5"
          >
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Context
            </div>
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground">
              {industry.description}
            </p>
            {industry.content_box && industry.content_box !== industry.description && (
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line pt-2">
                {industry.content_box}
              </div>
            )}
          </motion.div>
        </div>
      </section>


      {/* WHAT'S HAPPENING */}
      {whatsHappening.length > 0 && (
        <section className="py-20 md:py-24 bg-secondary/40 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 max-w-2xl"
            >
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Market Signals
              </div>
              <h2 className="text-3xl md:text-4xl font-serif">What's Happening</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {whatsHappening.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-background p-8 flex gap-5 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <TrendingUp className="w-5 h-5 text-accent group-hover:text-accent-foreground" />
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed text-[15px]">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW EDUTOTAL SUPPORTS */}
      {industry.how_we_support && (
        <section className="py-20 md:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Our Role
              </div>
              <h2 className="text-3xl md:text-4xl font-serif mb-8 max-w-3xl">
                How EduTotal Supports
              </h2>
              <div className="grid md:grid-cols-12 gap-10 items-start">
                <div className="md:col-span-1 hidden md:block">
                  <div className="w-px h-full bg-accent mt-2" />
                </div>
                <div className="md:col-span-11 space-y-4">
                  {industry.how_we_support
                    .split(/\n+/)
                    .filter(Boolean)
                    .map((para: string, i: number) => (
                      <p
                        key={i}
                        className="text-lg leading-relaxed text-muted-foreground"
                      >
                        {para}
                      </p>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FOCUS AREAS (legacy support) */}
      {industry.focus_areas && industry.focus_areas.length > 0 && (
        <section className="py-16 bg-secondary/40">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-serif mb-8">Focus Areas</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industry.focus_areas.map((area: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      {services.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-serif mb-8">Relevant Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/services/${service.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-serif mb-5">
            Work with us in {industry.title.split(/[&,]/)[0].trim()}
          </h3>
          <p className="text-background/70 mb-10 text-lg">
            Let's discuss your specific needs and opportunities.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-background text-background hover:bg-background hover:text-foreground"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
