import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Slide {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string | null;
  type: string;
  excerpt: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  isLoading?: boolean;
}

export function HeroCarousel({ slides, isLoading = false }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-advance slides
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, slides.length]);

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <section className="relative min-h-[85vh] flex items-center bg-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-pulse">
            <div className="h-4 w-32 bg-background/20 rounded mb-4" />
            <div className="h-12 md:h-16 lg:h-20 w-3/4 bg-background/20 rounded mb-4" />
            <div className="h-12 md:h-16 lg:h-20 w-1/2 bg-background/20 rounded mb-6" />
            <div className="h-6 w-2/3 bg-background/10 rounded mb-8" />
            <div className="h-12 w-36 bg-background/20 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative min-h-[85vh] flex items-center bg-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-background leading-[1.1] mb-6"
            >
              Unlocking the Potential of Those Who Advance Education
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-background/70 max-w-2xl"
            >
              End-to-end consulting solutions for educational institutions and corporate learning
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Images with Sliding Animation */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          {currentSlide.cover_image_url ? (
            <img
              src={currentSlide.cover_image_url}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-foreground" />
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent mb-4">
                {currentSlide.type}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-background leading-[1.1] mb-6">
                {currentSlide.title}
              </h1>
              <p className="text-lg md:text-xl text-background/80 max-w-2xl mb-8 line-clamp-3">
                {currentSlide.excerpt}
              </p>
              <Button asChild size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground">
                <Link to={`/insights/${currentSlide.slug}`}>
                  Read More
                </Link>
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Arrow Controls */}
          <div className="absolute bottom-8 right-4 md:right-8 z-20 flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center text-background hover:bg-background/10 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-background/30 flex items-center justify-center text-background hover:bg-background/10 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-4 md:left-8 z-20 flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-accent" 
                    : "w-4 bg-background/40 hover:bg-background/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-8 right-4 md:right-8 z-20 text-background/60 font-mono text-sm">
            <span className="text-background font-medium">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            <span>{String(slides.length).padStart(2, '0')}</span>
          </div>
        </>
      )}
    </section>
  );
}
