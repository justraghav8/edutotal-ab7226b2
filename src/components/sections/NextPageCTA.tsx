import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface NextPageCTAProps {
  headline: string;
  description: string;
  linkText: string;
  linkHref: string;
  variant?: "default" | "inverted";
}

export function NextPageCTA({ 
  headline, 
  description, 
  linkText, 
  linkHref, 
  variant = "default" 
}: NextPageCTAProps) {
  const isInverted = variant === "inverted";
  
  return (
    <section className={`relative overflow-hidden py-20 ${isInverted ? 'bg-neutral-900' : 'bg-muted/30'}`}>
      {/* Geometric watermark */}
      <svg
        aria-hidden="true"
        className={`pointer-events-none absolute -right-20 -bottom-20 w-[480px] h-[480px] ${isInverted ? 'text-white/[0.04]' : 'text-foreground/[0.05]'}`}
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" />
        <path d="M10 100 L190 100 M100 10 L100 190" stroke="currentColor" strokeWidth="0.5" />
        <path d="M30 30 L170 170 M170 30 L30 170" stroke="currentColor" strokeWidth="0.3" />
      </svg>
      <svg
        aria-hidden="true"
        className={`pointer-events-none absolute -left-16 -top-16 w-72 h-72 ${isInverted ? 'text-accent/10' : 'text-accent/15'}`}
        viewBox="0 0 100 100"
        fill="none"
      >
        <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.4" />
        <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.4" />
        <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.4" />
      </svg>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${isInverted ? 'text-white' : 'text-foreground'}`}>
            <div className="text-center md:text-left">
              <span className={`text-sm uppercase tracking-[0.2em] mb-2 block ${isInverted ? 'text-white/60' : 'text-muted-foreground'}`}>
                Continue Exploring
              </span>
              <h2 className="text-2xl md:text-3xl font-serif mb-2">{headline}</h2>
              <p className={`${isInverted ? 'text-white/70' : 'text-muted-foreground'}`}>
                {description}
              </p>
            </div>
            
            <Button 
              asChild 
              size="lg" 
              variant={isInverted ? "outline" : "default"}
              className={`group min-w-[200px] relative overflow-hidden ${
                isInverted 
                  ? 'border-white/30 text-white hover:bg-white hover:text-black' 
                  : ''
              }`}
            >
              <Link to={linkHref}>
                <span className="relative z-10 flex items-center gap-2">
                  {linkText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
