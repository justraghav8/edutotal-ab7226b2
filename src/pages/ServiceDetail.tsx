import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) loadService();
  }, [slug]);

  async function loadService() {
    setLoading(true);
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      setService(data);
      const [{ data: related }, { data: cat }] = await Promise.all([
        supabase
          .from("services")
          .select("*")
          .eq("published", true)
          .eq("category", data.category)
          .neq("id", data.id)
          .order("order_index")
          .limit(4),
        supabase
          .from("service_categories")
          .select("*")
          .eq("category_key", data.category)
          .maybeSingle(),
      ]);
      if (related) setRelatedServices(related);
      if (cat) setCategory(cat);
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

  if (!service) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-serif mb-4">Service Not Found</h1>
        <Button asChild>
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground py-20 overflow-hidden">
        {category?.image_url && (
          <>
            <img
              src={category.image_url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
          </>
        )}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Services
          </Link>
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent mb-4"
            >
              <span className="w-8 h-px bg-accent" />
              {category?.display_name || service.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-primary-foreground/80 leading-relaxed max-w-3xl"
            >
              {service.overview}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Approach / What We Do */}
            {service.approach && service.approach.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif mb-8">
                  Our Approach
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.approach.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent/30 transition-colors"
                    >
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Benefits / Key Outcomes */}
            {service.benefits && service.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif mb-8">
                  Key Benefits
                </h2>
                <div className="bg-secondary rounded-xl p-8">
                  <ul className="space-y-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Expertise Areas */}
            {(service.domestic_expertise || service.international_expertise) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {service.domestic_expertise && (
                  <div className="border border-border rounded-xl p-6">
                    <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      Domestic Expertise — India
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.domestic_expertise}
                    </p>
                  </div>
                )}
                {service.international_expertise && (
                  <div className="border border-border rounded-xl p-6">
                    <h3 className="text-lg font-serif mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      International Expertise
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.international_expertise}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-primary text-primary-foreground rounded-xl p-10 text-center"
            >
              <h3 className="text-2xl font-serif mb-4">
                Interested in this service?
              </h3>
              <p className="mb-6 text-primary-foreground/80">
                Let's discuss how we can help you achieve your goals
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-serif mb-8">
              More in {service.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedServices.map((related) => (
                <Link
                  key={related.id}
                  to={`/services/${related.slug}`}
                  className="group block border border-border rounded-xl p-5 bg-card hover:border-accent/40 hover:shadow-md transition-all"
                >
                  <h3 className="text-base font-serif mb-2 group-hover:text-accent transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {related.overview}
                  </p>
                  <span className="text-xs font-medium inline-flex items-center text-accent">
                    Learn More{" "}
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
