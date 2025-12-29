import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroEducationBg from "@/assets/hero-education-bg.jpg";
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
  backgroundImage,
  videoUrl
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 60]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  return (
    <section className="relative bg-background overflow-hidden">
      <motion.div 
        style={{ y, opacity }} 
        className="container mx-auto px-4 py-20 md:py-32"
      >
        {/* BCG-style centered hero with elegant typography */}
        <div className="max-w-4xl mx-auto text-center mb-16">
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
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* BCG-style horizontal card carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {/* Featured large card */}
          <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-start">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer">
              {videoUrl ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ) : backgroundImage ? (
                <img 
                  src={backgroundImage} 
                  alt="Hero" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <img 
                  src={heroEducationBg} 
                  alt="Education" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Card content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 bg-accent text-xs uppercase tracking-wider mb-3 rounded-sm">
                  Featured
                </span>
                <h3 className="text-xl font-serif mb-2">Strategic Excellence</h3>
                <p className="text-sm text-white/80 line-clamp-2">
                  Transforming educational institutions with innovative solutions
                </p>
              </div>
            </div>
          </div>

          {/* Secondary cards */}
          {[
            { title: "Institution Building", tag: "Services", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=500&fit=crop" },
            { title: "Corporate Solutions", tag: "Consulting", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
            { title: "Digital Transformation", tag: "Technology", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=500&fit=crop" },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="flex-shrink-0 w-[200px] md:w-[280px] snap-start"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="text-xs uppercase tracking-wider text-white/70 mb-1 block">
                    {card.tag}
                  </span>
                  <h4 className="text-base font-serif">{card.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-4 mt-8"
        >
          <button className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}