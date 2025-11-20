import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CareersAdmin() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCareers(data || []);
    } catch (error) {
      console.error("Error loading careers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Career Openings</h1>
          <p className="text-muted-foreground">Manage job postings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Opening
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {careers.map((career: any) => (
            <div key={career.id} className="border-b pb-4">
              <h3 className="font-semibold">{career.job_title}</h3>
              <p className="text-sm text-muted-foreground">{career.location}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
