import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HeroBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const { data, error } = await supabase
        .from("hero_banners")
        .select("*")
        .order("page_key");

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error("Error loading banners:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hero Banners</h1>
          <p className="text-muted-foreground">Manage page hero banners</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {banners.map((banner: any) => (
            <div key={banner.id} className="border-b pb-4">
              <h3 className="font-semibold">{banner.page_key}</h3>
              <p className="text-sm text-muted-foreground">{banner.title}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
