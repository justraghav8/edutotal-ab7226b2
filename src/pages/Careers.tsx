import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, Mail, Loader2 } from "lucide-react";

export default function Careers() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    loadCareers();
  }, []);

  async function loadCareers() {
    setLoading(true);
    const { data } = await supabase
      .from("careers")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (data) setCareers(data);
    setLoading(false);
  }

  return (
    <>
      <HeroSection
        title="Join Our Team"
        subtitle="Build your career in educational consulting and make a real impact"
        minimal
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Work With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Opportunities</CardTitle>
                  <CardDescription>
                    Continuous learning and professional development
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Impactful Work</CardTitle>
                  <CardDescription>
                    Transform education across institutions
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Global Exposure</CardTitle>
                  <CardDescription>
                    Work with international partners
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="openings" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Current Openings</h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-6">
                No open positions at the moment. Check back soon!
              </p>
              <p className="text-muted-foreground">
                You can still send us your resume at{" "}
                <a href="mailto:careers@edutotal.in" className="text-primary hover:underline">
                  careers@edutotal.in
                </a>
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {careers.map((job) => (
                <Card key={job.id} className="hover-lift cursor-pointer" onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.job_title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {job.location && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </Badge>
                          )}
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            Full Time
                          </Badge>
                        </div>
                      </div>
                      <Button variant={selectedJob?.id === job.id ? "default" : "outline"}>
                        {selectedJob?.id === job.id ? "Close" : "View Details"}
                      </Button>
                    </div>
                  </CardHeader>

                  {selectedJob?.id === job.id && (
                    <CardContent className="space-y-6 pt-6 border-t">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Description</h4>
                        <p className="text-muted-foreground">{job.description}</p>
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
                          <a href={`mailto:${job.apply_email}?subject=Application for ${job.job_title}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Apply Now
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
    </>
  );
}
