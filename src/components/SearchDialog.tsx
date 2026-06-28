import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Search, FileText, Briefcase, Building2, Loader2 } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  type: "service" | "insight" | "industry";
  excerpt?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TYPE_META: Record<
  SearchResult["type"],
  { label: string; icon: typeof Briefcase }
> = {
  service: { label: "Services", icon: Briefcase },
  insight: { label: "Insights", icon: FileText },
  industry: { label: "Industries", icon: Building2 },
};

const ORDER: SearchResult["type"][] = ["service", "insight", "industry"];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      const searchTerm = `%${query}%`;

      const [servicesRes, insightsRes, industriesRes] = await Promise.all([
        supabase
          .from("services")
          .select("id, title, slug, overview")
          .eq("published", true)
          .or(`title.ilike.${searchTerm},overview.ilike.${searchTerm}`)
          .limit(5),
        supabase
          .from("insights")
          .select("id, title, slug, excerpt")
          .eq("published", true)
          .or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm}`)
          .limit(5),
        supabase
          .from("industries")
          .select("id, title, slug, description")
          .eq("published", true)
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5),
      ]);

      const allResults: SearchResult[] = [
        ...(servicesRes.data || []).map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          type: "service" as const,
          excerpt: s.overview,
        })),
        ...(insightsRes.data || []).map((i) => ({
          id: i.id,
          title: i.title,
          slug: i.slug,
          type: "insight" as const,
          excerpt: i.excerpt,
        })),
        ...(industriesRes.data || []).map((ind) => ({
          id: ind.id,
          title: ind.title,
          slug: ind.slug,
          type: "industry" as const,
          excerpt: ind.description,
        })),
      ];

      setResults(allResults);
      setLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const getLink = (result: SearchResult) => {
    switch (result.type) {
      case "service":
        return `/services/${result.slug}`;
      case "insight":
        return `/insights/${result.slug}`;
      case "industry":
        return `/industries/${result.slug}`;
      default:
        return "/";
    }
  };

  const handleResultClick = () => {
    onOpenChange(false);
    setQuery("");
    setResults([]);
  };

  const grouped = ORDER.map((type) => ({
    type,
    items: results.filter((r) => r.type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl p-0 gap-0 overflow-hidden rounded-xl border-border bg-popover top-[10vh] translate-y-0 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-top-[10%]"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-accent" />
          <input
            placeholder="Search insights, services, or industries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            autoFocus
          />
          {loading && (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-muted-foreground" />
          )}
          <kbd className="mr-6 hidden sm:inline-flex h-6 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Esc
          </kbd>
        </div>

        {/* Results */}
        {grouped.length > 0 && (
          <div className="max-h-[480px] overflow-y-auto">
            {grouped.map((group, gIdx) => {
              const Icon = TYPE_META[group.type].icon;
              return (
                <div
                  key={group.type}
                  className={
                    gIdx > 0 ? "border-t border-border/60 p-3" : "p-3"
                  }
                >
                  <h3 className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {TYPE_META[group.type].label}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((result, idx) => (
                      <motion.div
                        key={`${result.type}-${result.id}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, delay: idx * 0.03 }}
                      >
                        <Link
                          to={getLink(result)}
                          onClick={handleResultClick}
                          className="group flex w-full items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/60"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <p
                              className={
                                "truncate text-foreground " +
                                (result.type === "insight"
                                  ? "font-serif italic"
                                  : "font-medium")
                              }
                            >
                              {result.title}
                            </p>
                            {result.excerpt && (
                              <p className="truncate text-xs text-muted-foreground">
                                {result.excerpt}
                              </p>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No results */}
        {query && !loading && results.length === 0 && (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-muted-foreground">
              No results found for{" "}
              <span className="text-foreground">"{query}"</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              Try a different keyword or browse the menu.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!query && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Start typing to search across the site.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Leadership", "Strategy", "Higher Education"].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-4 text-[11px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-muted-foreground">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-muted-foreground">
                ↵
              </kbd>
              Select
            </span>
          </div>
          {results.length > 0 && (
            <div className="text-[11px] font-semibold text-accent">
              {results.length} matching {results.length === 1 ? "result" : "results"}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
