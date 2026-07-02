import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { format } from "date-fns";
import DOMPurify from "dompurify";

export default function InsightDetail() {
  const { slug } = useParams();
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadInsight();
    }
  }, [slug]);

  async function loadInsight() {
    setLoading(true);
    const { data } = await supabase
      .from("insights")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) setInsight(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!insight) {
    return (
      <>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Insight Not Found</h1>
          <Button asChild>
            <Link to="/insights">View All Insights</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <article className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/insights">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Link>
            </Button>

            <Badge className="mb-4">{insight.type}</Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{insight.title}</h1>

            <div className="flex flex-wrap gap-4 mb-8 text-muted-foreground">
              {insight.author && (
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {insight.author}
                </span>
              )}
              {insight.publish_date && (
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(insight.publish_date), "MMMM d, yyyy")}
                </span>
              )}
            </div>

            {insight.cover_image_url && (
              <img
                src={insight.cover_image_url}
                alt={insight.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8 font-medium">
                {insight.excerpt}
              </p>

              <div 
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(insight.body, {
                  ALLOWED_TAGS: ['p','br','strong','em','u','h1','h2','h3','h4','ul','ol','li','blockquote','a','img','code','pre','hr','span','div','table','thead','tbody','tfoot','tr','th','td','colgroup','col'],
                  ALLOWED_ATTR: ['href','src','alt','title','class','target','rel','colspan','rowspan','style','width','align'],
                  ALLOW_DATA_ATTR: false,
                }) }}
              />
            </div>

            <div className="mt-12 pt-12 border-t">
              <div className="bg-gradient-accent text-white rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Interested in learning more?</h3>
                <p className="mb-6 text-white/90">Get in touch with our team to discuss your needs</p>
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
