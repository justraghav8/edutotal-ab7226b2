import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
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
    <MainLayout>
      <HeroSection
        title="Transforming Education Through Strategic Excellence"
        subtitle="End-to-end consulting solutions for educational institutions and corporate learning"
      />

      {/* Value Propositions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <Card key={index} className="text-center hover-lift border-none shadow-medium">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-accent">
                    <prop.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{prop.title}</CardTitle>
                  <CardDescription>{prop.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive consulting solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {service.overview}
                  </CardDescription>
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

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-5xl font-bold mb-2">20+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">Projects Completed</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-white/80">Clients Served</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-white/80">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      {clients.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted By Leading Organizations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                  {client.logo_url ? (
                    <img src={client.logo_url} alt={client.name} className="max-h-16 object-contain" />
                  ) : (
                    <span className="text-lg font-medium">{client.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Insights */}
      {insights.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
              <p className="text-lg text-muted-foreground">
                Thought leadership and industry perspectives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((insight) => (
                <Card key={insight.id} className="hover-lift">
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
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/insights">View All Insights</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your educational goals
          </p>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
