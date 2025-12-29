import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "Services", href: "/services" },
  { name: "Industries", href: "/industries" },
  { name: "Insights", href: "/insights" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border/50">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-serif font-bold tracking-tight text-foreground">
            Edu<span className="text-accent">Total</span>
          </span>
        </Link>

        {/* Right: CTA + Menu button */}
        <div className="flex items-center gap-3">
          <Button 
            asChild 
            size="sm" 
            className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground rounded-none px-6"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
          
          <button
            type="button"
            className="relative w-10 h-10 flex items-center justify-center hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Full-screen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 right-0 bottom-0 top-16 z-50 bg-background"
          >
            <div className="container mx-auto px-4 py-12 h-full overflow-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Navigation Links */}
                <div className="space-y-0">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className="group flex items-center justify-between py-5 text-3xl md:text-4xl lg:text-5xl font-serif text-foreground hover:text-accent transition-colors border-b border-border/30"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Featured Section */}
                <motion.div 
                  className="hidden lg:flex flex-col justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="max-w-md">
                    <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest">
                      About Us
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-serif mb-6 leading-tight">
                      Transforming education through strategic excellence and innovative solutions.
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      We are the trustworthy partners to progression for bringing an ethical and sustainable 
                      change in the educational environment.
                    </p>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg" 
                      className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to="/about">Learn More</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}