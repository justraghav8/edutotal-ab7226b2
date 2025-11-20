import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function InsightsAdmin() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const { data, error } = await supabase
        .from("insights")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInsights(data || []);
    } catch (error) {
      console.error("Error loading insights:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Insights</h1>
          <p className="text-muted-foreground">Manage articles and publications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Insight
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {insights.map((insight: any) => (
            <div key={insight.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.excerpt}</p>
                </div>
                <Badge>{insight.type}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
