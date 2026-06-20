import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className="relative py-28 md:py-36 bg-background overflow-hidden"
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

      <div className="container mx-auto px-4 relative z-10">
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

        {/* Slider Content - structured block */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-xl shadow-foreground/5 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <blockquote className="text-lg md:text-xl font-serif text-foreground/90 dark:text-white/90 leading-relaxed mb-8">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  {current.photo_url ? (
                    <img
                      src={current.photo_url}
                      alt={current.author}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/30"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-xl font-serif text-accent">
                        {current.author?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-base text-foreground dark:text-white">{current.author}</div>
                    {current.role && (
                      <div className="text-sm text-accent font-medium">{current.role}</div>
                    )}
                    {current.organization && (
                      <div className="text-xs text-muted-foreground dark:text-white/50">{current.organization}</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-foreground/20 dark:border-white/20 flex items-center justify-center text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white hover:border-foreground/40 dark:hover:border-white/40 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

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

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-foreground/20 dark:border-white/20 flex items-center justify-center text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white hover:border-foreground/40 dark:hover:border-white/40 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
