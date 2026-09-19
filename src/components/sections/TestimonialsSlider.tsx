import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildSrcSet, optimizedImageUrl } from "@/lib/image";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string | null;
  organization?: string | null;
  photo_url?: string | null;
  logo_url?: string | null;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = testimonials.length > 0 ? testimonials : [
    { id: "1", quote: "EduTotal transformed our institution's strategic vision and helped us achieve NAAC A++ accreditation within two years.", author: "Dr. Rajesh Kumar", role: "Vice Chancellor", organization: "National University" },
    { id: "2", quote: "Their expertise in curriculum development and faculty training elevated our teaching standards to international benchmarks.", author: "Prof. Meera Sharma", role: "Director", organization: "Institute of Management" },
    { id: "3", quote: "A truly collaborative partner who understood our unique challenges and delivered measurable results.", author: "Dr. Anand Patel", role: "Registrar", organization: "Technical University" },
  ];

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [next, items.length, isPaused]);

  const current = items[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative py-20 bg-background overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated glow background elements */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/20 dark:bg-accent/[0.12] blur-[120px] pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-primary/15 dark:bg-primary/[0.10] blur-[100px] pointer-events-none"
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/15 dark:bg-accent/[0.08] blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Decorative large quotation mark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <span className="text-[12rem] md:text-[18rem] font-serif leading-none text-foreground/[0.04] dark:text-white/[0.04]">
          "
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent mb-4">
            <span className="w-8 h-px bg-accent" />
            Testimonials
            <span className="w-8 h-px bg-accent" />
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground dark:text-white">Impact Stories</h2>
        </motion.div>

        {/* Slider Content - reviewer-forward editorial block */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-xl shadow-foreground/5 overflow-hidden"
            >
              <div className="p-7 md:p-10 lg:p-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 pb-8 md:pb-10 border-b border-border">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-accent/20" />
                  {current.photo_url ? (
                    <img
                        src={optimizedImageUrl(current.photo_url, { width: 256, quality: 88 })}
                        srcSet={buildSrcSet(current.photo_url, [128, 192, 256], 88)}
                        sizes="(min-width: 768px) 8rem, 7rem"
                      alt={`Portrait of ${current.author}`}
                      loading="lazy"
                      decoding="async"
                        className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover ring-4 ring-card shadow-lg"
                    />
                  ) : (
                      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl bg-accent/10 ring-4 ring-card shadow-lg flex items-center justify-center">
                        <span className="text-4xl font-serif text-accent">
                        {current.author?.charAt(0)}
                      </span>
                    </div>
                  )}
                  </div>

                  <div className="min-w-0 flex-1 text-center sm:text-left sm:pt-1">
                    <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {current.author}
                    </h3>
                    {current.role && (
                      <p className="mt-2 text-base md:text-lg text-accent font-semibold leading-snug">
                        {current.role}
                      </p>
                    )}
                    {current.organization && (
                      <div className="mt-3 inline-flex items-center border-l-2 border-accent bg-accent/10 px-3 py-2 text-sm md:text-base font-semibold text-foreground">
                        {current.organization}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative pt-8 md:pt-10 md:pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute top-5 left-0 font-serif text-7xl leading-none text-accent/20 select-none"
                  >
                    “
                  </span>
                  <blockquote className="relative text-lg md:text-xl lg:text-2xl font-serif text-foreground/90 leading-relaxed">
                    {current.quote}
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={prev}
              className="w-12 h-12 rounded-full text-muted-foreground hover:text-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-accent"
                      : "w-3 bg-foreground/20 hover:bg-foreground/40 dark:bg-white/25 dark:hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={next}
              className="w-12 h-12 rounded-full text-muted-foreground hover:text-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
