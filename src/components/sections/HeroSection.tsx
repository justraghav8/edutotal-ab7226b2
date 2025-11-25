import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroEducationBg from "@/assets/hero-education-bg.jpg";

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
  backgroundImage,
  videoUrl,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Text */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-foreground">{title.split(' ').slice(0, 2).join(' ')}</span>{' '}
              <span className="text-primary">{title.split(' ').slice(2).join(' ')}</span>
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-blue rounded-xl h-14 px-8 text-lg"
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
                className="border-2 h-14 px-8 text-lg rounded-xl"
              >
                <Link to={ctaSecondaryLink}>{ctaSecondaryText}</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Overlapping Cards with Image */}
          <div className="relative lg:h-[600px] animate-slide-up">
            {/* Large Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              {videoUrl ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[500px] object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ) : backgroundImage ? (
                <img
                  src={backgroundImage}
                  alt="Hero"
                  className="w-full h-[500px] object-cover"
                />
              ) : (
                <img
                  src={heroEducationBg}
                  alt="Education"
                  className="w-full h-[500px] object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-8 right-8 bg-primary text-white p-6 rounded-2xl shadow-blue max-w-xs animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-sm leading-relaxed mb-4">
                {subtitle || "Delivering excellence in education consulting for over two decades"}
              </p>
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 rounded-lg"
              >
                <Link to={ctaPrimaryLink}>
                  {ctaPrimaryText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-primary/5 to-transparent -z-10" />
    </section>
  );
}
