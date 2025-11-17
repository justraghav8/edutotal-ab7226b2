import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export default function IndustryDetail() {
  const { slug } = useParams();
  const [industry, setIndustry] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadIndustry();
    }
  }, [slug]);

  async function loadIndustry() {
    setLoading(true);
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      setIndustry(data);
      // Load related services
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
      }
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!industry) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Industry Not Found</h1>
          <Button asChild>
            <Link to="/industries">View All Industries</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="text-white mb-6 hover:bg-white/10">
            <Link to="/industries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Industries
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{industry.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{industry.description}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Focus Areas */}
            {industry.focus_areas && industry.focus_areas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Focus Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {industry.focus_areas.map((area: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-accent">•</span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Related Services */}
            {services.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Relevant Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <Card key={service.id} className="hover-lift">
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
            )}

            {/* CTA */}
            <Card className="bg-gradient-accent text-white">
              <CardContent className="py-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Work with us in {industry.title}</h3>
                <p className="mb-6 text-white/90">Let's discuss your specific needs and opportunities</p>
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
