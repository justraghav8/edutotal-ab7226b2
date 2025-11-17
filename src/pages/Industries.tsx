import { useEffect, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

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
        ctaPrimaryText="View Services"
        ctaPrimaryLink="/services"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : industries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No industries found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => (
                <Card key={industry.id} className="hover-lift flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{industry.title}</CardTitle>
                    <CardDescription>{industry.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                      <Link to={`/industries/${industry.slug}`}>
                        View Details
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
    </>
  );
}
