import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("order_index");

    if (data) setServices(data);
    setLoading(false);
  }

  const categories = Array.from(new Set(services.map((s) => s.category)));
  const filteredServices = selectedCategory
    ? services.filter((s) => s.category === selectedCategory)
    : services;

  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="Comprehensive consulting solutions for educational excellence"
        ctaPrimaryText="Contact Us"
        ctaPrimaryLink="/contact"
      />

      {/* Category Filter */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All Services
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No services found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card key={service.id} className="hover-lift flex flex-col">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{service.category}</Badge>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {service.overview}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                      <Link to={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            We understand that every institution has unique needs. Let's discuss how we can create a tailored solution for you.
          </p>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
