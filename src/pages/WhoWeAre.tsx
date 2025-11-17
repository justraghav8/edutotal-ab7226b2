import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function WhoWeAre() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [advisory, setAdvisory] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [teamRes, advisoryRes, clientsRes] = await Promise.all([
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
        .eq("category", "Advisory")
        .order("order_index"),
      supabase
        .from("clients")
        .select("*")
        .eq("published", true)
        .order("order_index"),
    ]);

    if (teamRes.data) setTeamMembers(teamRes.data);
    if (advisoryRes.data) setAdvisory(advisoryRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    setLoading(false);
  }

  return (
    <>
      <HeroSection
        title="Who We Are"
        subtitle="Meet the team driving educational transformation"
        ctaPrimaryText="Contact Us"
        ctaPrimaryLink="/contact"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="team" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="advisory">Advisory Panel</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Team */}
                <TabsContent value="team">
                  {teamMembers.length === 0 ? (
                    <p className="text-center text-muted-foreground">No team members found.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {teamMembers.map((member) => (
                        <Card key={member.id} className="hover-lift">
                          {member.photo_url && (
                            <img
                              src={member.photo_url}
                              alt={member.name}
                              className="w-full h-64 object-cover rounded-t-lg"
                            />
                          )}
                          <CardHeader>
                            <CardTitle className="text-xl">{member.name}</CardTitle>
                            <p className="text-sm text-primary font-medium">{member.designation}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-4">
                              {member.biography}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Advisory */}
                <TabsContent value="advisory">
                  {advisory.length === 0 ? (
                    <p className="text-center text-muted-foreground">No advisory panel members found.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {advisory.map((member) => (
                        <Card key={member.id} className="hover-lift">
                          {member.photo_url && (
                            <img
                              src={member.photo_url}
                              alt={member.name}
                              className="w-full h-64 object-cover rounded-t-lg"
                            />
                          )}
                          <CardHeader>
                            <CardTitle className="text-xl">{member.name}</CardTitle>
                            <p className="text-sm text-primary font-medium">{member.designation}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-4">
                              {member.biography}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Clients */}
                <TabsContent value="clients">
                  {clients.length === 0 ? (
                    <p className="text-center text-muted-foreground">No clients found.</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                      {clients.map((client) => (
                        <Card key={client.id} className="hover-lift flex items-center justify-center p-6">
                          {client.logo_url ? (
                            <img
                              src={client.logo_url}
                              alt={client.name}
                              className="max-h-20 object-contain"
                            />
                          ) : (
                            <span className="text-center font-medium text-sm">{client.name}</span>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </section>
    </>
  );
}
