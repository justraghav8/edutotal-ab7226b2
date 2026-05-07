import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Settings {
  logo_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  social_linkedin: string | null;
  social_twitter: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_youtube: string | null;
  social_links: any;
}

export function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select(
        "logo_url,contact_email,contact_phone,contact_address,social_linkedin,social_twitter,social_facebook,social_instagram,social_youtube,social_links",
      )
      .maybeSingle()
      .then(({ data }) => {
        if (data) setSettings(data as Settings);
      });
  }, []);

  const email = settings?.contact_email || "info@edutotal.in";
  const phone = settings?.contact_phone || "+91 11 4132 8320";
  const address = settings?.contact_address || "E-7, Defence Colony, New Delhi - 110024, India";
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const socialLinks: { url: string | null | undefined; Icon: any; label: string }[] = [
    { url: settings?.social_linkedin, Icon: Linkedin, label: "LinkedIn" },
    { url: settings?.social_twitter, Icon: Twitter, label: "Twitter" },
    { url: settings?.social_facebook, Icon: Facebook, label: "Facebook" },
    { url: settings?.social_instagram, Icon: Instagram, label: "Instagram" },
    { url: settings?.social_youtube, Icon: Youtube, label: "YouTube" },
  ];

  // Future-proof: include any extra social_links rows
  const extraLinks = Array.isArray(settings?.social_links)
    ? (settings!.social_links as Array<{ platform: string; url: string; enabled?: boolean }>).filter(
        (l) => l && l.url && l.enabled !== false,
      )
    : [];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <Link to="/" className="inline-flex items-center mb-4">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="EduTotal" className="h-10 w-auto object-contain" />
              ) : (
                <span className="text-2xl font-serif font-bold tracking-tight text-foreground">
                  Edu<span className="text-accent">Total</span>
                </span>
              )}
            </Link>
            <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.services")}</Link></li>
              <li><Link to="/industries" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.industries")}</Link></li>
              <li><Link to="/insights" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.insights")}</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.gallery")}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("footer.services")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Institution Development</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Corporate Consulting</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Digital Transformation</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.careers")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{address}</span>
                </a>
              </li>
              <li>
                <a href={phoneHref} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3 flex-wrap">
              {socialLinks.map(({ url, Icon, label }) =>
                url ? (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ) : null,
              )}
              {extraLinks.map((link, i) => (
                <a
                  key={`extra-${i}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EduTotal. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
