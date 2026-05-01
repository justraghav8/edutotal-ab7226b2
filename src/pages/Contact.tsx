import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { NextPageCTA } from "@/components/sections/NextPageCTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service_interest: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact_submissions").insert([formData]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your message has been sent. We'll get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        service_interest: "",
      });
    }
    setLoading(false);
  }

  return (
    <>
      <HeroSection
        title="Get In Touch"
        subtitle="Let's discuss how we can help transform your educational institution"
        minimal
        pageKey="contact"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <Input
                      id="service"
                      value={formData.service_interest}
                      onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                      placeholder="e.g., Institution Building, M&A"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("E-7, Defence Colony, New Delhi - 110024, India")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group hover:text-primary transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        E-7, Defence Colony<br />
                        New Delhi - 110024<br />
                        India
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+911141328320"
                    className="flex items-start gap-4 group hover:text-primary transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">
                        +91 11 4132 8320
                      </span>
                    </div>
                  </a>

                  <a
                    href="mailto:info@edutotal.in"
                    className="flex items-start gap-4 group hover:text-primary transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">
                        info@edutotal.in
                      </span>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-gradient-hero text-white">
                <CardContent className="py-8">
                  <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                  <div className="space-y-2 text-white/90">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <NextPageCTA
        headline="Explore Our Services"
        description="See how our comprehensive solutions can transform your institution."
        linkText="View Services"
        linkHref="/services"
        variant="inverted"
      />
    </>
  );
}
