import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContentCTA } from "@/components/sections/ContentCTA";
import { usePageContent } from "@/lib/pageContent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, Mail, Loader2, TrendingUp, Globe2, Lightbulb, Users, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

const cardIcons: Record<string, any> = { TrendingUp, Lightbulb, Globe2, Users, Heart, Award };

export default function Careers() {
  const content = usePageContent("careers");
  const whyWorkWithUs = (Array.isArray(content.why_cards) ? content.why_cards : []).filter((c: any) => c.title?.trim() || c.description?.trim());
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [careersEmail, setCareersEmail] = useState<string>("contact@edu-total.com");

  useEffect(() => {
    loadCareers();
    supabase
      .from("site_settings")
      .select("careers_email")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.careers_email) setCareersEmail(data.careers_email);
      });
  }, []);

  async function loadCareers() {
    setLoading(true);
    const { data } = await supabase
      .from("careers")
      .select("*")
      .eq("published", true)
      .order("order_index").order("created_at", { ascending: false });

    if (data) setCareers(data);
    setLoading(false);
  }

  return (
    <>
      <HeroSection
        title="Join Our Team"
        subtitle="Build your career in educational consulting and make a real impact"
        minimal
        pageKey="careers"
      />

      {content.why_show !== false && whyWorkWithUs.length > 0 && <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{content.why_title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content.why_text}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyWorkWithUs.map((item: any, index: number) => {
              const Icon = cardIcons[item.icon] || TrendingUp;
              return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center group hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                  <CardHeader className="pb-2">
                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ); })}
          </div>
        </div>
      </section>

      }
      <section id="openings" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.openings_title}</h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-6">
                {content.empty_text}
              </p>
              <p className="text-muted-foreground">
                {content.empty_resume_text}{" "}
                <a href={`mailto:${careersEmail}`} className="text-primary hover:underline">
                  {careersEmail}
                </a>
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {careers.map((job) => (
                <Card key={job.id} className="hover-lift">
                  <CardHeader>
                    <div className="flex flex-wrap gap-4 items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.job_title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {job.location && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </Badge>
                          )}
                          {job.employment_type && <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {job.employment_type}
                          </Badge>}
                        </div>
                      </div>
                      <Button aria-expanded={selectedJob?.id === job.id} onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)} variant={selectedJob?.id === job.id ? "default" : "outline"}>
                        {selectedJob?.id === job.id ? "Close" : "View Details"}
                      </Button>
                    </div>
                  </CardHeader>

                  {selectedJob?.id === job.id && (
                    <CardContent className="space-y-6 pt-6 border-t">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Description</h4>
                        <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                      </div>

                      {job.responsibilities && job.responsibilities.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-accent">•</span>
                                <span className="text-muted-foreground">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.qualifications && job.qualifications.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Qualifications</h4>
                          <ul className="space-y-2">
                            {job.qualifications.map((qual: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-accent">✓</span>
                                <span className="text-muted-foreground">{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-4">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                          <a href={job.apply_url || `mailto:${job.apply_email || careersEmail}?subject=${encodeURIComponent(`Application for ${job.job_title}`)}`} target={job.apply_url ? "_blank" : undefined} rel={job.apply_url ? "noopener noreferrer" : undefined}>
                            <Mail className="mr-2 h-4 w-4" />
                            {content.apply_text}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
            )}
        </div>
      </section>

      <ContentCTA content={content} prefix="next" />
    </>
  );
}
