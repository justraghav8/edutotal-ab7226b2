import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Index() {
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [servicesRes, testimonialsRes, clientsRes, insightsRes] = await Promise.all([
      supabase.from("services").select("*").eq("published", true).order("order_index").limit(4),
      supabase.from("testimonials").select("*").eq("published", true).limit(3),
      supabase.from("clients").select("*").eq("published", true).order("order_index").limit(8),
      supabase.from("insights").select("*").eq("published", true).eq("featured", true).limit(3),
    ]);

    if (servicesRes.data) setServices(servicesRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    if (insightsRes.data) setInsights(insightsRes.data);
  }

  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: "EduTotal Spotlight", section: "spotlight" },
    { name: "Consulting", section: "services" },
    { name: "Education", section: "insights" },
    { name: "Impact Stories", section: "stats" },
  ];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <HeroSection
        title="Unlocking the Potential of Those Who Advance Education"
        subtitle="End-to-end consulting solutions for educational institutions and corporate learning"
      />

      {/* BCG-style Tab Navigation */}
      <section className="py-8 border-b border-border bg-background sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(index);
                  scrollToSection(tab.section);
                }}
                className={`text-sm uppercase tracking-wider pb-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === index 
                    ? "border-foreground text-foreground" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights - BCG Editorial Style */}
      <section id="spotlight" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Latest Thinking</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Insights and perspectives shaping the future of education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.length > 0 ? insights.map((insight, index) => (
              <motion.article
                key={insight.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/insights/${insight.slug}`}>
                  {insight.cover_image_url && (
                    <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
                      <img
                        src={insight.cover_image_url}
                        alt={insight.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    {insight.type}
                  </span>
                  <h3 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {insight.excerpt}
                  </p>
                </Link>
              </motion.article>
            )) : (
              // Placeholder cards
              [1, 2, 3].map((i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="aspect-[4/3] bg-muted rounded-sm mb-4" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Article
                  </span>
                  <h3 className="text-xl font-serif mb-2">
                    Educational Excellence Framework
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    Strategic approaches to transforming educational outcomes.
                  </p>
                </motion.article>
              ))
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/insights">
                View All Insights <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services - Clean Grid */}
      <section id="services" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Comprehensive consulting solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.length > 0 ? services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-8 group"
              >
                <Link to={`/services/${service.slug}`} className="block h-full">
                  <h3 className="text-lg font-serif mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {service.overview}
                  </p>
                  <span className="text-sm font-medium inline-flex items-center group-hover:text-accent transition-colors">
                    Learn More <ArrowRight className="ml-2 h-3 w-3" />
                  </span>
                </Link>
              </motion.div>
            )) : (
              ["Institution Building", "Corporate Solutions", "Digital Transformation", "Regulatory Excellence"].map((title, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background p-8"
                >
                  <h3 className="text-lg font-serif mb-3">{title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Strategic consulting excellence for educational institutions.
                  </p>
                  <span className="text-sm font-medium inline-flex items-center">
                    Learn More <ArrowRight className="ml-2 h-3 w-3" />
                  </span>
                </motion.div>
              ))
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats - Minimal Typography Focus */}
      <section id="stats" className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "20+", label: "Years Experience" },
              { value: "500+", label: "Projects Completed" },
              { value: "50+", label: "Expert Consultants" },
              { value: "15+", label: "Countries Served" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-serif mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      {clients.length > 0 && (
        <section id="insights" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-serif text-center mb-12"
            >
              Trusted By Leading Organizations
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {clients.map((client, index) => (
                <motion.div 
                  key={client.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all"
                >
                  {client.logo_url ? (
                    <img src={client.logo_url} alt={client.name} className="max-h-12 object-contain" />
                  ) : (
                    <span className="text-lg font-medium text-muted-foreground">{client.name}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Minimal & Elegant */}
      <section className="py-24 bg-foreground text-background">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg text-background/70 mb-10">
            Let's discuss how we can help you achieve your educational goals
          </p>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-background text-background hover:bg-background hover:text-foreground"
          >
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
}