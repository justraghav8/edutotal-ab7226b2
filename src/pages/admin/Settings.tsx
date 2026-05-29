import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    tagline: "",
    logo_url: "",
    contact_email: "",
    contact_phone: "",
    contact_address: "",
    social_linkedin: "",
    social_twitter: "",
    social_facebook: "",
    social_instagram: "",
    social_youtube: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").single();
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
      const { error } = await supabase.from("site_settings").upsert(settings);
      if (error) throw error;
      toast({ title: "Success", description: "Settings saved successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const set = (key: string, value: string) => setSettings({ ...settings, [key]: value });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage your site configuration, branding, contact info, and social links</p>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Branding</h2>
        <div>
          <Label htmlFor="logo_url">Logo URL</Label>
          <Input id="logo_url" value={settings.logo_url || ""} onChange={(e) => set("logo_url", e.target.value)} placeholder="Paste image URL from Image Library" />
          <p className="text-xs text-muted-foreground mt-1">Used in header and footer. Falls back to the EduTotal wordmark if empty.</p>
        </div>
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" value={settings.tagline || ""} onChange={(e) => set("tagline", e.target.value)} />
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Contact</h2>
        <div>
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input id="contact_email" type="email" value={settings.contact_email || ""} onChange={(e) => set("contact_email", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input id="contact_phone" value={settings.contact_phone || ""} onChange={(e) => set("contact_phone", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="contact_address">Contact Address</Label>
          <Textarea id="contact_address" rows={3} value={settings.contact_address || ""} onChange={(e) => set("contact_address", e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Shown on the Contact page. Line breaks are preserved.</p>
        </div>
        <div>
          <Label htmlFor="business_hours">Business Hours</Label>
          <Textarea id="business_hours" rows={4} value={settings.business_hours || ""} onChange={(e) => set("business_hours", e.target.value)} placeholder={"Monday - Friday: 9:00 AM - 6:00 PM IST\nSaturday: 10:00 AM - 2:00 PM IST\nSunday: Closed"} />
          <p className="text-xs text-muted-foreground mt-1">Shown on the Contact page. One line per row.</p>
        </div>
        <div>
          <Label htmlFor="careers_email">Careers Email</Label>
          <Input id="careers_email" type="email" value={settings.careers_email || ""} onChange={(e) => set("careers_email", e.target.value)} placeholder="careers@edutotal.in" />
          <p className="text-xs text-muted-foreground mt-1">Used as the apply-by-email fallback on the Careers page.</p>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Social Media</h2>
        <p className="text-sm text-muted-foreground">Leave a field empty to hide that icon in the footer.</p>
        <div>
          <Label htmlFor="social_linkedin">LinkedIn URL</Label>
          <Input id="social_linkedin" value={settings.social_linkedin || ""} onChange={(e) => set("social_linkedin", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="social_twitter">Twitter / X URL</Label>
          <Input id="social_twitter" value={settings.social_twitter || ""} onChange={(e) => set("social_twitter", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="social_facebook">Facebook URL</Label>
          <Input id="social_facebook" value={settings.social_facebook || ""} onChange={(e) => set("social_facebook", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="social_instagram">Instagram URL</Label>
          <Input id="social_instagram" value={settings.social_instagram || ""} onChange={(e) => set("social_instagram", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="social_youtube">YouTube URL</Label>
          <Input id="social_youtube" value={settings.social_youtube || ""} onChange={(e) => set("social_youtube", e.target.value)} />
        </div>
      </Card>

      <Button onClick={handleSave} disabled={saving} size="lg">
        {saving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}
