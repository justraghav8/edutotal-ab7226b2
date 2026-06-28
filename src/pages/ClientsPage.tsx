import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/sections/HeroSection";
import { NextPageCTA } from "@/components/sections/NextPageCTA";
import { motion } from "framer-motion";

interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  description: string | null;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("clients")
        .select("*")
        .eq("published", true)
        .order("order_index");
      if (data) setClients(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <HeroSection
        title="Our Clients"
        subtitle="Institutions and organizations that trust EduTotal to drive transformation and excellence"
        minimal
        pageKey="clients"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent mb-4">
              <span className="w-8 h-px bg-accent" />
              Trusted Partners
              <span className="w-8 h-px bg-accent" />
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Institutions That Trust Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We are proud to work with leading educational institutions and organizations across the globe.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="aspect-[3/2] bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <ClientCard client={client} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <NextPageCTA
        headline="Explore Our Services"
        description="Discover how we help institutions achieve excellence across 10 domains"
        linkText="View Services"
        linkHref="/services"
        variant="inverted"
      />
    </>
  );
}

function ClientCard({ client }: { client: Client }) {
  const Wrapper: any = client.website ? "a" : "div";
  const wrapperProps = client.website
    ? { href: client.website, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative block aspect-[3/2] rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
    >
      {/* Logo layer */}
      <div className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
        {client.logo_url ? (
          <img
            src={client.logo_url}
            alt={client.name}
            className="max-h-16 w-auto object-contain opacity-70 grayscale transition-all duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const fallback = (e.currentTarget.nextElementSibling as HTMLElement | null);
              if (fallback) fallback.style.display = "block";
            }}
          />
        ) : null}
        <span
          className="text-sm font-semibold text-muted-foreground tracking-wide text-center leading-tight"
          style={{ display: client.logo_url ? "none" : "block" }}
        >
          {client.name}
        </span>
      </div>

      {/* Reveal layer */}
      <div className="absolute inset-0 flex flex-col justify-center p-5 bg-gradient-to-br from-foreground to-foreground/95 text-background opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <p className="text-sm font-serif font-semibold mb-2 leading-snug">{client.name}</p>
        {client.description && (
          <p className="text-xs leading-relaxed text-background/80 line-clamp-5">
            {client.description}
          </p>
        )}
        {client.website && (
          <span className="mt-3 text-[10px] uppercase tracking-[0.2em] text-accent">
            Visit Website →
          </span>
        )}
      </div>
    </Wrapper>
  );
}

