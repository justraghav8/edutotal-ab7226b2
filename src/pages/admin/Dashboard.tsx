import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Briefcase, 
  Building2, 
  Newspaper, 
  Users, 
  MessageSquare, 
  ShieldCheck,
  Mail
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    industries: 0,
    insights: 0,
    team: 0,
    clients: 0,
    testimonials: 0,
    careers: 0,
    contacts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [services, industries, insights, team, clients, testimonials, careers, contacts] = 
      await Promise.all([
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("industries").select("*", { count: "exact", head: true }),
        supabase.from("insights").select("*", { count: "exact", head: true }),
        supabase.from("team_members").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("careers").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
      ]);

    setStats({
      services: services.count || 0,
      industries: industries.count || 0,
      insights: insights.count || 0,
      team: team.count || 0,
      clients: clients.count || 0,
      testimonials: testimonials.count || 0,
      careers: careers.count || 0,
      contacts: contacts.count || 0,
    });
  };

  const statCards = [
    { icon: Briefcase, label: "Services", value: stats.services, color: "text-blue-600" },
    { icon: Building2, label: "Industries", value: stats.industries, color: "text-green-600" },
    { icon: Newspaper, label: "Insights", value: stats.insights, color: "text-purple-600" },
    { icon: Users, label: "Team Members", value: stats.team, color: "text-orange-600" },
    { icon: ShieldCheck, label: "Clients", value: stats.clients, color: "text-cyan-600" },
    { icon: MessageSquare, label: "Testimonials", value: stats.testimonials, color: "text-pink-600" },
    { icon: Briefcase, label: "Career Openings", value: stats.careers, color: "text-indigo-600" },
    { icon: Mail, label: "Contact Forms", value: stats.contacts, color: "text-red-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
