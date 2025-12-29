import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  videoUrl?: string;
  minimal?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  minimal = false,
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  if (minimal) {
    return (
      <section className="relative py-20 md:py-28 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Light gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />
        
        {/* Geometric accent shapes */}
        <motion.div 
          style={{ y }}
          className="absolute top-20 right-[10%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 800], [0, -50]) }}
          className="absolute bottom-20 left-[5%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-accent/5 blur-2xl"
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <motion.div 
        style={{ opacity, scale }} 
        className="container mx-auto px-4 py-20 md:py-32 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-accent mb-10"
          />
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8"
          >
            Welcome to EduTotal
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[1.05] mb-10 text-foreground"
          >
            {title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                className={`inline-block mr-[0.25em] ${word.toLowerCase() === 'education' ? 'text-accent' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-accent rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}