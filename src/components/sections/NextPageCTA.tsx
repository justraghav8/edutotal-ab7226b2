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
    <section className={`py-20 ${isInverted ? 'bg-neutral-900' : 'bg-muted/30'}`}>
      <div className="container mx-auto px-4">
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
