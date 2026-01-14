import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { NextPageCTA } from "@/components/sections/NextPageCTA";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Linkedin, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  biography: string;
  photo_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  category: string;
  order_index: number;
}

interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
}

export default function WhoWeAre() {
  const [leadership, setLeadership] = useState<TeamMember[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [advisory, setAdvisory] = useState<TeamMember[]>([]);
  const [partners, setPartners] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Leadership", section: "leadership" },
    { name: "Team", section: "team" },
    { name: "Advisory Panel", section: "advisory" },
    { name: "Partners", section: "partners" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [leadershipRes, teamRes, advisoryRes, partnersRes] = await Promise.all([
      supabase
        .from("team_members")
        .select("*")
        .eq("published", true)
        .eq("category", "Leadership")
        .order("order_index"),
      supabase
        .from("team_members")
        .select("*")
        .eq("published", true)
        .eq("category", "Team")
        .order("order_index"),
      supabase
        .from("team_members")
        .select("*")
        .eq("published", true)
        .eq("category", "Advisory")
        .order("order_index"),
      supabase
        .from("clients")
        .select("*")
        .eq("published", true)
        .order("order_index"),
    ]);

    if (leadershipRes.data) setLeadership(leadershipRes.data);
    if (teamRes.data) setTeam(teamRes.data);
    if (advisoryRes.data) setAdvisory(advisoryRes.data);
    if (partnersRes.data) setPartners(partnersRes.data);
    setLoading(false);
  }

  const scrollToSection = (section: string, index: number) => {
    setActiveTab(index);
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <HeroSection
        title="Who We Are"
        subtitle="Meet the team driving educational transformation"
        minimal
        pageKey="who-we-are"
      />

      {/* Floating Tab Navigation */}
      <section className="py-8 border-b border-border bg-background sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => scrollToSection(tab.section, index)}
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

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Leadership Section - Large cards with detailed info */}
          <section id="leadership" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Leadership</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Visionary leaders guiding our mission to transform education
                </p>
              </motion.div>

              {leadership.length === 0 ? (
                <p className="text-center text-muted-foreground">No leadership members found.</p>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-24"
                >
                  {leadership.map((member, index) => (
                    <motion.div
                      key={member.id}
                      variants={itemVariants}
                      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                    >
                      {/* Large Image */}
                      <div className="w-full lg:w-2/5">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                          {member.photo_url ? (
                            <img
                              src={member.photo_url}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <span className="text-6xl font-bold text-primary/30">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Detailed Info */}
                      <div className="w-full lg:w-3/5 space-y-6">
                        <div>
                          <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                            {member.name}
                          </h3>
                          <p className="text-xl text-primary font-semibold">
                            {member.designation}
                          </p>
                        </div>
                        
                        <div className="prose prose-lg max-w-none text-muted-foreground">
                          <p className="leading-relaxed whitespace-pre-line">
                            {member.biography}
                          </p>
                        </div>

                        {/* Contact Links */}
                        <div className="flex gap-4 pt-4">
                          {member.linkedin_url && (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors"
                            >
                              <Linkedin className="h-5 w-5" />
                              <span>LinkedIn</span>
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg text-accent transition-colors"
                            >
                              <Mail className="h-5 w-5" />
                              <span>Email</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* Team Section - Grid with compact cards */}
          <section id="team" className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Team</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Dedicated professionals committed to educational excellence
                </p>
              </motion.div>

              {team.length === 0 ? (
                <p className="text-center text-muted-foreground">No team members found.</p>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {team.map((member) => (
                    <motion.div key={member.id} variants={itemVariants}>
                      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full bg-background">
                        <div className="relative aspect-square overflow-hidden">
                          {member.photo_url ? (
                            <img
                              src={member.photo_url}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                              <span className="text-4xl font-bold text-muted-foreground/30">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          {/* Overlay with links */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <div className="flex gap-3">
                              {member.linkedin_url && (
                                <a
                                  href={member.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="p-2 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors"
                                >
                                  <Mail className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold text-foreground mb-1">
                            {member.name}
                          </h3>
                          <p className="text-sm text-primary">
                            {member.designation}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* Advisory Panel Section - Image with extended bio */}
          <section id="advisory" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Advisory Panel</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Distinguished experts shaping our strategic direction
                </p>
              </motion.div>

              {advisory.length === 0 ? (
                <p className="text-center text-muted-foreground">No advisory panel members found.</p>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {advisory.map((member) => (
                    <motion.div key={member.id} variants={itemVariants}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="flex flex-col sm:flex-row h-full">
                          {/* Image */}
                          <div className="sm:w-2/5 aspect-square sm:aspect-auto">
                            {member.photo_url ? (
                              <img
                                src={member.photo_url}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                <span className="text-5xl font-bold text-primary/20">
                                  {member.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Content */}
                          <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-1">
                                {member.name}
                              </h3>
                              <p className="text-primary font-medium mb-4">
                                {member.designation}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                                {member.biography}
                              </p>
                            </div>
                            {/* Links */}
                            <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                              {member.linkedin_url && (
                                <a
                                  href={member.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <Linkedin className="h-5 w-5" />
                                </a>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="text-muted-foreground hover:text-accent transition-colors"
                                >
                                  <Mail className="h-5 w-5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          {/* Partners Section - Logo grid with hover effects */}
          <section id="partners" className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Partners</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Trusted by leading institutions and organizations worldwide
                </p>
              </motion.div>

              {partners.length === 0 ? (
                <p className="text-center text-muted-foreground">No partners found.</p>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                  {partners.map((partner) => (
                    <motion.div key={partner.id} variants={itemVariants}>
                      <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 aspect-[3/2] bg-background">
                        <CardContent className="p-6 h-full flex items-center justify-center">
                          {partner.logo_url ? (
                            <img
                              src={partner.logo_url}
                              alt={partner.name}
                              className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          ) : (
                            <span className="text-center font-semibold text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {partner.name}
                            </span>
                          )}
                        </CardContent>
                        
                        {/* Hover overlay with name and link */}
                        <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                          <span className="text-primary-foreground font-semibold text-center text-sm mb-2">
                            {partner.name}
                          </span>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Visit Website
                            </a>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>
        </>
      )}

      <NextPageCTA
        headline="Explore What We Offer"
        description="Discover our comprehensive range of consulting services tailored for education."
        linkText="View Services"
        linkHref="/services"
        variant="inverted"
      />
    </>
  );
}