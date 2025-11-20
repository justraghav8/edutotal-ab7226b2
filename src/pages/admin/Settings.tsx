import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    tagline: "",
    contact_email: "",
    contact_phone: "",
    contact_address: "",
    social_linkedin: "",
    social_twitter: "",
    social_facebook: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert(settings);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage your site configuration</p>
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input
            id="contact_email"
            type="email"
            value={settings.contact_email || ""}
            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input
            id="contact_phone"
            value={settings.contact_phone || ""}
            onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="contact_address">Contact Address</Label>
          <Input
            id="contact_address"
            value={settings.contact_address || ""}
            onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="social_linkedin">LinkedIn URL</Label>
          <Input
            id="social_linkedin"
            value={settings.social_linkedin || ""}
            onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="social_twitter">Twitter URL</Label>
          <Input
            id="social_twitter"
            value={settings.social_twitter || ""}
            onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="social_facebook">Facebook URL</Label>
          <Input
            id="social_facebook"
            value={settings.social_facebook || ""}
            onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </Card>
    </div>
  );
}
