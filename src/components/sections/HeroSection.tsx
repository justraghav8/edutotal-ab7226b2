import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimaryText = "Explore Services",
  ctaPrimaryLink = "/services",
  ctaSecondaryText = "Contact Us",
  ctaSecondaryLink = "/contact",
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-hero py-24 md:py-32"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(135deg, rgba(31, 58, 162, 0.95), rgba(31, 58, 162, 0.85)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center text-white animate-fade-in">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-8 text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-balance">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent-hover text-white"
            >
              <Link to={ctaPrimaryLink}>
                {ctaPrimaryText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Link to={ctaSecondaryLink}>{ctaSecondaryText}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
    </section>
  );
}
