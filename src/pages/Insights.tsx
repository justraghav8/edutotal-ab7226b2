import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";

const insightTypes = ["All", "Thought Leadership", "Case Study", "Whitepaper", "Blog", "Event"];

export default function Insights() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    loadInsights();
  }, []);

  async function loadInsights() {
    setLoading(true);
    let query = supabase
      .from("insights")
      .select("*")
      .eq("published", true)
      .order("publish_date", { ascending: false });

    if (selectedType !== "All") {
      query = query.eq("type", selectedType as any);
    }

    const { data } = await query;
    if (data) setInsights(data);
    setLoading(false);
  }

  useEffect(() => {
    loadInsights();
  }, [selectedType]);

  return (
    <MainLayout>
      <HeroSection
        title="Insights & Thought Leadership"
        subtitle="Latest trends, research, and best practices in education"
        ctaPrimaryText="Contact Us"
        ctaPrimaryLink="/contact"
      />

      {/* Type Filter */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {insightTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : insights.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No insights found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.map((insight) => (
                <Card key={insight.id} className="hover-lift flex flex-col">
                  {insight.cover_image_url && (
                    <img
                      src={insight.cover_image_url}
                      alt={insight.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{insight.type}</Badge>
                      {insight.publish_date && (
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(insight.publish_date), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{insight.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {insight.excerpt}
                    </CardDescription>
                    {insight.author && (
                      <p className="text-sm text-muted-foreground mt-2">By {insight.author}</p>
                    )}
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button asChild variant="ghost" size="sm" className="w-full justify-between">
                      <Link to={`/insights/${insight.slug}`}>
                        Read More
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
    </MainLayout>
  );
}
