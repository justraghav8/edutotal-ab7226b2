import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

  const getIcon = (type: string) => {
    switch (type) {
      case "service":
        return <Briefcase className="h-4 w-4 text-muted-foreground" />;
      case "insight":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case "industry":
        return <Building2 className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

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

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleResultClick = () => {
    onOpenChange(false);
    setQuery("");
    setResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input
            placeholder="Search services, insights, industries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-lg py-6"
            autoFocus
          />
          {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </div>

        {results.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto py-2">
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                to={getLink(result)}
                onClick={handleResultClick}
                className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="mt-1">{getIcon(result.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground truncate">
                      {result.title}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
                      {getTypeLabel(result.type)}
                    </span>
                  </div>
                  {result.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                      {result.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {query && !loading && results.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No results found for "{query}"
          </div>
        )}

        {!query && (
          <div className="py-12 text-center text-muted-foreground">
            Start typing to search...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}