import { useEffect, useState } from "react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

export default function Index() {
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [servicesRes, testimonialsRes, clientsRes, insightsRes, heroSlidesRes] = await Promise.all([
      supabase.from("services").select("*").eq("published", true).order("order_index").limit(4),
      supabase.from("testimonials").select("*").eq("published", true).limit(3),
      supabase.from("clients").select("*").eq("published", true).order("order_index").limit(8),
      supabase.from("insights").select("*").eq("published", true).eq("featured", true).limit(3),
      supabase.from("insights").select("id, title, slug, cover_image_url, type, excerpt").eq("published", true).order("publish_date", { ascending: false }).limit(4),
    ]);

    if (servicesRes.data) setServices(servicesRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    if (insightsRes.data) setInsights(insightsRes.data);
    if (heroSlidesRes.data) setHeroSlides(heroSlidesRes.data);
  }

  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: "EduTotal Spotlight", section: "spotlight" },
    { name: "Services", section: "services" },
    { name: "Leadership", section: "leadership" },
    { name: "Impact Stories", section: "testimonials" },
  ];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 140; // Account for sticky header (64px) + tab bar (~76px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <HeroCarousel slides={heroSlides} />

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

      {/* EduTotal Spotlight - About Section with Counters */}
      <section id="spotlight" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: About EduTotal */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Transforming Education, Empowering Institutions
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                EduTotal is a premier education consulting firm dedicated to helping institutions achieve excellence. 
                With decades of combined experience, we provide strategic guidance, capacity building, and 
                transformation services that drive measurable outcomes.
              </p>
              <p className="text-muted-foreground mb-8">
                From regulatory compliance to digital transformation, our holistic approach ensures 
                sustainable growth and lasting impact for educational organizations across India and beyond.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Right: Achievement Counters */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "200+", label: "Institutions Served" },
                  { value: "25+", label: "Years of Excellence" },
                  { value: "50+", label: "Expert Consultants" },
                  { value: "15+", label: "Countries Reached" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-secondary p-8 rounded-lg text-center"
                  >
                    <div className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                Our Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                Guided by Vision, Driven by Expertise
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our leadership team comprises distinguished educators, industry veterans, and strategic thinkers 
                who bring decades of experience in higher education, corporate training, and institutional development. 
                Their collective wisdom shapes our approach and ensures excellence in every engagement.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link to="/who-we-are">
                  Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.length > 0 ? services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg aspect-[16/9]"
              >
                <Link to={`/services/${service.slug}`} className="block h-full">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={`/images/services/service-${index + 1}.jpg`}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <h3 className="text-xl md:text-2xl font-serif text-background mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-background/80 text-sm line-clamp-2 mb-4">
                      {service.overview}
                    </p>
                    <span className="text-sm font-medium inline-flex items-center text-background group-hover:text-accent transition-colors">
                      Learn More <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
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
                  className="group relative overflow-hidden rounded-lg aspect-[16/9]"
                >
                  <div className="absolute inset-0 bg-foreground/80" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <h3 className="text-xl md:text-2xl font-serif text-background mb-2">{title}</h3>
                    <p className="text-background/80 text-sm mb-4">
                      Strategic consulting excellence for educational institutions.
                    </p>
                    <span className="text-sm font-medium inline-flex items-center text-background">
                      Learn More <ArrowRight className="ml-2 h-3 w-3" />
                    </span>
                  </div>
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

      {/* Testimonials - Impact Stories */}
      <section id="testimonials" className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground">Impact Stories</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-px bg-border">
            {(testimonials.length > 0 ? testimonials : [
              { id: 1, quote: "EduTotal transformed our institution's strategic vision and helped us achieve NAAC A++ accreditation within two years.", author: "Dr. Rajesh Kumar", role: "Vice Chancellor", organization: "National University" },
              { id: 2, quote: "Their expertise in curriculum development and faculty training elevated our teaching standards to international benchmarks.", author: "Prof. Meera Sharma", role: "Director", organization: "Institute of Management" },
              { id: 3, quote: "A truly collaborative partner who understood our unique challenges and delivered measurable results.", author: "Dr. Anand Patel", role: "Registrar", organization: "Technical University" }
            ]).map((testimonial: any, index: number) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative p-10 lg:p-12 bg-background group"
              >
                {/* Large decorative quote */}
                <Quote className="absolute top-8 right-8 w-16 h-16 text-muted/30 rotate-180" />
                
                {/* Quote number */}
                <span className="text-7xl lg:text-8xl font-serif text-muted/20 absolute -top-4 left-8">
                  0{index + 1}
                </span>
                
                <div className="relative pt-12">
                  <blockquote className="text-xl lg:text-2xl font-serif leading-relaxed mb-10 text-foreground/90">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4">
                    {testimonial.photo_url ? (
                      <img 
                        src={testimonial.photo_url} 
                        alt={testimonial.author}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xl font-serif text-muted-foreground">
                          {testimonial.author?.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-lg text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}{testimonial.organization && ` · ${testimonial.organization}`}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover accent line */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      {clients.length > 0 && (
        <section id="clients" className="py-20 bg-background">
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