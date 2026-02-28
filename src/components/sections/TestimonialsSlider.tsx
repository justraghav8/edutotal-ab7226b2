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
      className="relative py-24 md:py-32 bg-neutral-900 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative large quotation mark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <span className="text-[12rem] md:text-[18rem] font-serif leading-none text-white/[0.04]">
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
          <h2 className="text-3xl md:text-4xl font-serif text-white">Impact Stories</h2>
        </motion.div>

        {/* Slider Content */}
        <div className="max-w-4xl mx-auto min-h-[280px] md:min-h-[320px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center w-full"
            >
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-white/90 leading-relaxed mb-10">
                "{current.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                {current.photo_url ? (
                  <img
                    src={current.photo_url}
                    alt={current.author}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xl font-serif text-white/70">
                      {current.author?.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="text-left">
                  <div className="font-medium text-lg text-white">{current.author}</div>
                  <div className="text-sm text-white/50">
                    {current.role}
                    {current.organization && ` · ${current.organization}`}
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
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
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
                      : "w-3 bg-white/25 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
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
