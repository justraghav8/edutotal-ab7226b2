import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Building,
  Briefcase,
  Lightbulb
} from "lucide-react";

const valueProps = [
  {
    icon: Building,
    title: "Institution Building",
    description: "Creating world-class educational infrastructure",
  },
  {
    icon: Briefcase,
    title: "Corporate Solutions",
    description: "Strategic business consulting and M&A",
  },
  {
    icon: Lightbulb,
    title: "Digital Transformation",
    description: "Modern learning and technology integration",
  },
  {
    icon: Shield,
    title: "Regulatory Excellence",
    description: "Compliance and legal frameworks",
  },
];

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

  return (
    <>
      <HeroSection
        title="Transforming Education Through Strategic Excellence"
        subtitle="End-to-end consulting solutions for educational institutions and corporate learning"
        videoUrl="https://cdn.coverr.co/videos/coverr-students-studying-together-in-a-library-5298/1080p.mp4"
      />

      {/* Value Propositions */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Our success is <span className="text-primary">the result</span> of comprehensive educational excellence
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="text-center hover-lift border-none shadow-medium rounded-2xl bg-card transition-all duration-300 hover:shadow-blue">
                  <CardHeader className="pt-8">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary">
                      <prop.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{prop.title}</CardTitle>
                    <CardDescription className="text-base">{prop.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive consulting solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover-lift shadow-medium rounded-2xl border-none transition-all duration-300 hover:shadow-blue">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg mb-3">{service.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-base">
                      {service.overview}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                      <Link to={`/services/${service.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary-hover rounded-xl h-14 px-8 text-lg shadow-blue">
              <Link to="/services">View All Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "20", label: "years", sublabel: "Average consulting experience" },
              { value: "11", label: "directions", sublabel: "Legal support" },
              { value: "20", label: "years", sublabel: "Project international consulting experience" },
              { value: "500+", label: "projects", sublabel: "Successfully completed" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-6xl md:text-7xl font-bold mb-3">{stat.value}</div>
                <div className="text-white/90 text-lg">{stat.label}</div>
                <div className="text-white/70 text-sm mt-1">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      {clients.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Trusted By Leading Organizations
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {clients.map((client, index) => (
                <motion.div 
                  key={client.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all"
                >
                  {client.logo_url ? (
                    <img src={client.logo_url} alt={client.name} className="max-h-16 object-contain" />
                  ) : (
                    <span className="text-lg font-medium">{client.name}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Insights */}
      {insights.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
              <p className="text-lg text-muted-foreground">
                Thought leadership and industry perspectives
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="hover-lift">
                    {insight.cover_image_url && (
                      <img
                        src={insight.cover_image_url}
                        alt={insight.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <CardHeader>
                      <div className="text-sm text-muted-foreground mb-2">{insight.type}</div>
                      <CardTitle className="line-clamp-2">{insight.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {insight.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="ghost" size="sm">
                        <Link to={`/insights/${insight.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center mt-12"
            >
              <Button asChild size="lg">
                <Link to="/insights">View All Insights</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your educational goals
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 rounded-xl h-14 px-8 text-lg shadow-large">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
}
