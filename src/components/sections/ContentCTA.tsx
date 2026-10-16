import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function ContentCTA({ content, prefix = "cta", title }: { content: Record<string, any>; prefix?: string; title?: string }) {
  if (content[`${prefix}_show`] === false) return null;
  const heading = title ?? content[`${prefix}_title`];
  const text = content[`${prefix}_text`];
  const link = content[`${prefix}_button_link`];
  const label = content[`${prefix}_button_text`];
  const safeLink = typeof link === "string" && (/^\/(?!\/)/.test(link) || /^https?:\/\//i.test(link));
  if (!heading && !text && !(safeLink && label)) return null;
  return <section className={prefix === "next" ? "py-20 bg-muted/30" : "py-20 bg-primary text-primary-foreground"}>
    <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-3xl">
      {heading && <h2 className="text-3xl md:text-4xl font-serif mb-4">{heading}</h2>}
      {text && <p className="text-lg mb-8 whitespace-pre-line">{text}</p>}
      {safeLink && label && <Button asChild size="lg" variant={prefix === "next" ? "default" : "outline"} className={prefix === "next" ? "" : "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"}>
        {/^https?:/.test(link) ? <a href={link} target="_blank" rel="noopener noreferrer">{label}<ArrowRight className="ml-2 h-4 w-4" /></a> : <Link to={link}>{label}<ArrowRight className="ml-2 h-4 w-4" /></Link>}
      </Button>}
    </div>
  </section>;
}