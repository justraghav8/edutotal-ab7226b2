import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  description?: string | null;
}

interface ClientLogosProps {
  clients: Client[];
}

export function ClientLogos({ clients }: ClientLogosProps) {
  if (clients.length === 0) return null;

  // Double the array for seamless infinite scroll
  const duplicated = [...clients, ...clients];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent mb-4">
            <span className="w-8 h-px bg-accent" />
            Trusted Partners
            <span className="w-8 h-px bg-accent" />
          </span>
          <h2 className="text-3xl md:text-4xl font-serif">
            Institutions That Trust Us
          </h2>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {duplicated.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 mx-3 md:mx-4"
            >
              <div className="group relative flex items-center justify-center h-28 md:h-40 w-auto">
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="h-full w-auto max-w-none object-contain opacity-100 grayscale transition-all duration-500 group-hover:blur-sm group-hover:opacity-40"
                  />
                ) : (
                  <span className="text-sm font-semibold text-muted-foreground tracking-wide text-center leading-tight">
                    {client.name}
                  </span>
                )}

                {client.logo_url && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="max-w-full rounded-lg bg-background/60 backdrop-blur-sm px-4 py-2 text-center">
                      <p className="text-base font-serif font-semibold leading-snug">
                        {client.name}
                      </p>
                      {client.description && (
                        <p className="text-xs leading-relaxed text-foreground/70 line-clamp-3 mt-1">
                          {client.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All button */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-12 text-center">
        <Button asChild variant="outline" size="lg" className="group">
          <Link to="/clients">
            View All Clients
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
