import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadService();
    }
  }, [slug]);

  async function loadService() {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      setService(data);
      // Load related services from same category
      const { data: related } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .eq("category", data.category)
        .neq("id", data.id)
        .limit(3);
      if (related) setRelatedServices(related);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="text-white mb-6 hover:bg-white/10">
            <Link to="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
          <Badge className="mb-4 bg-white/20">{service.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{service.overview}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Approach */}
            {service.approach && service.approach.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Our Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.approach.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Key Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-accent">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Expertise Areas */}
            <Accordion type="single" collapsible className="w-full">
              {service.domestic_expertise && (
                <AccordionItem value="domestic">
                  <AccordionTrigger className="text-xl font-semibold">
                    Domestic Expertise
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    {service.domestic_expertise}
                  </AccordionContent>
                </AccordionItem>
              )}
              {service.international_expertise && (
                <AccordionItem value="international">
                  <AccordionTrigger className="text-xl font-semibold">
                    International Expertise
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed">
                    {service.international_expertise}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>

            {/* CTA */}
            <Card className="bg-gradient-accent text-white">
              <CardContent className="py-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Interested in this service?</h3>
                <p className="mb-6 text-white/90">Let's discuss how we can help you achieve your goals</p>
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((related) => (
                <Card key={related.id} className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-lg">{related.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/services/${related.slug}`}>
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
    </>
  );
}
