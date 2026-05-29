import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface HeroBanner {
  id: string;
  page_key: string;
  title: string | null;
  subtitle: string | null;
  background_image_url: string | null;
  cta_primary_text: string | null;
  cta_primary_link: string | null;
  cta_secondary_text: string | null;
  cta_secondary_link: string | null;
}

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  "who-we-are": "Who We Are",
  services: "Services",
  industries: "Industries",
  insights: "Insights",
  clients: "Clients",
  careers: "Careers",
  gallery: "Gallery",
  contact: "Contact",
};

const ALL_PAGE_KEYS = Object.keys(PAGE_LABELS);

export default function HeroBanners() {
  const { toast } = useToast();
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    setLoading(true);
    const { data, error } = await supabase.from("hero_banners").select("*");
    if (error) {
      toast({ title: "Error", description: "Failed to load hero banners", variant: "destructive" });
      setLoading(false);
      return;
    }
    const existing = (data || []) as HeroBanner[];
    // Ensure every known page has a banner row in memory (created on save if missing)
    const merged: HeroBanner[] = ALL_PAGE_KEYS.map((key) => {
      const found = existing.find((b) => b.page_key === key);
      return (
        found || {
          id: "",
          page_key: key,
          title: null,
          subtitle: null,
          background_image_url: null,
          cta_primary_text: null,
          cta_primary_link: null,
          cta_secondary_text: null,
          cta_secondary_link: null,
        }
      );
    });
    setBanners(merged);
    setLoading(false);
  }

  function update(pageKey: string, patch: Partial<HeroBanner>) {
    setBanners((prev) => prev.map((b) => (b.page_key === pageKey ? { ...b, ...patch } : b)));
  }

  async function save(banner: HeroBanner) {
    setSavingKey(banner.page_key);
    const payload: any = {
      page_key: banner.page_key,
      title: banner.title,
      subtitle: banner.subtitle,
      background_image_url: banner.background_image_url,
      cta_primary_text: banner.cta_primary_text,
      cta_primary_link: banner.cta_primary_link,
      cta_secondary_text: banner.cta_secondary_text,
      cta_secondary_link: banner.cta_secondary_link,
    };
    let error;
    if (banner.id) {
      ({ error } = await supabase.from("hero_banners").update(payload).eq("id", banner.id));
    } else {
      ({ error } = await supabase.from("hero_banners").insert(payload));
    }
    setSavingKey(null);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: `${PAGE_LABELS[banner.page_key]} hero updated.` });
    loadBanners();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hero Banners</h1>
        <p className="text-muted-foreground">
          Edit the title, subtitle, background image and CTAs shown at the top of each page.
        </p>
      </div>

      <div className="space-y-6">
        {banners.map((banner) => (
          <Card key={banner.page_key} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{PAGE_LABELS[banner.page_key]}</h2>
                <p className="text-xs text-muted-foreground">page_key: {banner.page_key}</p>
              </div>
              <Button onClick={() => save(banner)} disabled={savingKey === banner.page_key}>
                <Save className="h-4 w-4 mr-2" />
                {savingKey === banner.page_key ? "Saving..." : "Save"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Title</Label>
                <Input
                  value={banner.title || ""}
                  onChange={(e) => update(banner.page_key, { title: e.target.value })}
                  placeholder="Main heading shown in the hero"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Subtitle</Label>
                <Textarea
                  rows={2}
                  value={banner.subtitle || ""}
                  onChange={(e) => update(banner.page_key, { subtitle: e.target.value })}
                  placeholder="Supporting line shown beneath the title"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Background Image URL</Label>
                <Input
                  value={banner.background_image_url || ""}
                  onChange={(e) =>
                    update(banner.page_key, { background_image_url: e.target.value })
                  }
                  placeholder="Paste image URL from Image Library (1920x600 recommended)"
                />
                {banner.background_image_url && (
                  <img
                    src={banner.background_image_url}
                    alt=""
                    className="mt-2 h-24 w-full object-cover rounded border"
                  />
                )}
              </div>

              <div>
                <Label>Primary CTA Text</Label>
                <Input
                  value={banner.cta_primary_text || ""}
                  onChange={(e) => update(banner.page_key, { cta_primary_text: e.target.value })}
                />
              </div>
              <div>
                <Label>Primary CTA Link</Label>
                <Input
                  value={banner.cta_primary_link || ""}
                  onChange={(e) => update(banner.page_key, { cta_primary_link: e.target.value })}
                  placeholder="/services"
                />
              </div>
              <div>
                <Label>Secondary CTA Text</Label>
                <Input
                  value={banner.cta_secondary_text || ""}
                  onChange={(e) =>
                    update(banner.page_key, { cta_secondary_text: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Secondary CTA Link</Label>
                <Input
                  value={banner.cta_secondary_link || ""}
                  onChange={(e) =>
                    update(banner.page_key, { cta_secondary_link: e.target.value })
                  }
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
