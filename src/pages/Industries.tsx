import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { NextPageCTA } from "@/components/sections/NextPageCTA";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Loader2, 
  GraduationCap, 
  Building2, 
  Landmark, 
  Briefcase, 
  School, 
  BookOpen, 
  Microscope,
  Globe,
  Users,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

// Icon mapping for industries
const industryIcons: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap,
  "building": Building2,
  "landmark": Landmark,
  "briefcase": Briefcase,
  "school": School,
  "book-open": BookOpen,
  "microscope": Microscope,
  "globe": Globe,
  "users": Users,
  "award": Award,
};

// Default icons for industries based on index
const defaultIcons = [GraduationCap, Building2, Landmark, Briefcase, School, BookOpen, Microscope, Globe, Users, Award];

export default function Industries() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIndustries();
  }, []);

  async function loadIndustries() {
    setLoading(true);
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("published", true)
      .order("order_index");

    if (data) setIndustries(data);
    setLoading(false);
  }

  return (
    <>
      <HeroSection
        title="Industries We Serve"
        subtitle="Specialized expertise across education sectors"
        minimal
        pageKey="industries"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Sector Expertise</h2>
            <p className="text-muted-foreground text-lg">
              Deep industry knowledge combined with strategic consulting excellence
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : industries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No industries found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {industries.map((industry, index) => {
                const IconComponent = industry.icon_key 
                  ? industryIcons[industry.icon_key] || defaultIcons[index % defaultIcons.length]
                  : defaultIcons[index % defaultIcons.length];
                
                return (
                  <motion.article
                    key={industry.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-background p-8 group"
                  >
                    <Link to={`/industries/${industry.slug}`} className="block h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                        <IconComponent className="w-7 h-7 text-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <h3 className="text-xl font-serif mb-3 group-hover:text-accent transition-colors">
                        {industry.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                        {industry.description}
                      </p>
                      <span className="text-sm font-medium inline-flex items-center group-hover:text-accent transition-colors uppercase tracking-wider">
                        Explore <ArrowRight className="ml-2 h-3 w-3" />
                      </span>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Looking for Industry-Specific Solutions?
          </h2>
          <p className="text-lg text-background/70 mb-10">
            Our consultants bring deep sector expertise to every engagement
          </p>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-background text-background hover:bg-background hover:text-foreground"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </section>

      <NextPageCTA
        headline="Learn From Our Expertise"
        description="Access thought leadership, case studies, and industry insights."
        linkText="Read Insights"
        linkHref="/insights"
      />
    </>
  );
}