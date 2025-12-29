import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left: Menu button + Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 hover:bg-muted rounded-sm transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          
          <Link to="/" className="flex items-center">
            <span className="text-xl font-serif font-bold tracking-tight">
              EduTotal
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.slice(0, 6).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground link-underline"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: Search + Login */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 hover:bg-muted rounded-sm transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile/Desktop Slide-out Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 pt-24">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-4 text-3xl md:text-4xl font-serif text-foreground hover:text-accent transition-colors border-b border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="hidden md:block">
                <div className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Featured</div>
                <div className="space-y-4">
                  <p className="text-lg font-serif">
                    Transforming education through strategic excellence and innovative solutions.
                  </p>
                  <Button asChild variant="outline" size="lg" onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}