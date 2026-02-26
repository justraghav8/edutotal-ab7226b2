import { useEffect, useState, useRef } from "react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, GraduationCap, Users, Globe, Award } from "lucide-react";

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

export default function Index() {
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [servicesRes, testimonialsRes, clientsRes, insightsRes, heroSlidesRes] = await Promise.all([
      supabase.from("services").select("*").eq("published", true).order("order_index").limit(4),
      supabase.from("testimonials").select("*").eq("published", true).limit(10),
      supabase.from("clients").select("*").eq("published", true).order("order_index").limit(8),
      supabase.from("insights").select("*").eq("published", true).eq("featured", true).limit(3),
      supabase.from("insights").select("id, title, slug, cover_image_url, type, excerpt").eq("published", true).order("publish_date", { ascending: false }).limit(4),
    ]);

    if (servicesRes.data) setServices(servicesRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    if (insightsRes.data) setInsights(insightsRes.data);
    if (heroSlidesRes.data) setHeroSlides(heroSlidesRes.data);
    setHeroLoading(false);
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
      <HeroCarousel slides={heroSlides} isLoading={heroLoading} />

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

      {/* EduTotal Spotlight - Enhanced About Section */}
      <section id="spotlight" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: About EduTotal */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent mb-6"
              >
                <span className="w-8 h-px bg-accent" />
                About EduTotal
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">
                Transforming Education,{" "}
                <span className="text-accent">Empowering</span> Institutions
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
              <Button asChild size="lg" className="group">
                <Link to="/about">
                  Discover Our Story 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            {/* Right: Achievement Stats with Icons */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { value: 200, suffix: "+", label: "Institutions Served", icon: GraduationCap, color: "bg-accent/10 text-accent" },
                  { value: 25, suffix: "+", label: "Years of Excellence", icon: Award, color: "bg-primary/10 text-primary" },
                  { value: 50, suffix: "+", label: "Expert Consultants", icon: Users, color: "bg-accent/10 text-accent" },
                  { value: 15, suffix: "+", label: "Countries Reached", icon: Globe, color: "bg-primary/10 text-primary" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="relative bg-card border border-border p-6 md:p-8 rounded-xl group hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.color} mb-4`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    
                    {/* Value with animated counter */}
                    <div className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                    
                    {/* Decorative accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-accent rounded-b-xl"
                      initial={{ width: 0 }}
                      whileInView={{ width: "40%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
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

      {/* Testimonials - Impact Stories */}
      <TestimonialsSlider testimonials={testimonials} />

      {/* CTA Section - With Background Image */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/cta-background.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center max-w-3xl relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-background">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg text-background/80 mb-10">
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