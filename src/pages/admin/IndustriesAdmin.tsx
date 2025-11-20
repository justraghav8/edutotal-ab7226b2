import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function IndustriesAdmin() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from("industries")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setIndustries(data || []);
    } catch (error) {
      console.error("Error loading industries:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Industries</h1>
          <p className="text-muted-foreground">Manage industry sectors</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Industry
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {industries.map((industry: any) => (
            <div key={industry.id} className="border-b pb-4">
              <h3 className="font-semibold">{industry.title}</h3>
              <p className="text-sm text-muted-foreground">{industry.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
