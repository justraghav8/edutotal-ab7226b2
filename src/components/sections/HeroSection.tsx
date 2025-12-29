import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  backgroundImage?: string;
  videoUrl?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimaryText = "Explore Services",
  ctaPrimaryLink = "/services",
  ctaSecondaryText = "Contact Us",
  ctaSecondaryLink = "/contact",
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 60]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  return (
    <section 
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('/images/hero-abstract-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div 
        style={{ y, opacity }} 
        className="container mx-auto px-4 py-20 md:py-32 relative z-10"
      >
        {/* BCG-style centered hero with elegant typography */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8"
          >
            Welcome to EduTotal
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg">
              <Link to={ctaPrimaryLink}>
                {ctaPrimaryText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={ctaSecondaryLink}>
                {ctaSecondaryText}
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}