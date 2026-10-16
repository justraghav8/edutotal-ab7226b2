import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, ChevronLeft, ChevronRight, Images, MapPin, CalendarDays, ZoomIn } from "lucide-react";
import { buildSrcSet, optimizedImageUrl } from "@/lib/image";
import { albumPhotos, visibleAlbums } from "@/lib/galleryAlbums";
import type { Tables } from "@/integrations/supabase/types";

type Album = Tables<"gallery_albums">;
type Photo = Tables<"gallery_images">;
export function ImageGallery() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const active = albums.find(a => a.id === activeId);
  const selected = active ? albumPhotos(photos, active.id, true) : [];
  const current = lightbox === null ? null : selected[lightbox];
  async function load() {
    setLoading(true); setError(false);
    const [a, p] = await Promise.all([
      supabase.from("gallery_albums").select("*").eq("published", true).order("order_index").order("created_at"),
      supabase.from("gallery_images").select("*").eq("published", true).order("order_index").order("created_at"),
    ]);
    if (a.error || p.error) setError(true);
    setAlbums(visibleAlbums(a.data || [], p.data || [])); setPhotos(p.data || []); setLoading(false);
  }
  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox(i => i === null ? null : Math.min(i + 1, selected.length - 1));
      if (e.key === "ArrowLeft") setLightbox(i => i === null ? null : Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, selected.length]);
  if (loading) return <section className="py-20"><div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3].map(i => <div key={i} className="aspect-[4/3] rounded-md bg-muted animate-pulse" />)}</div></section>;
  if (error) return <section className="py-20 text-center"><p role="alert" className="text-muted-foreground mb-4">The gallery could not be loaded.</p><Button variant="outline" onClick={load}>Try again</Button></section>;
  if (!albums.length) return null;
  return <section id="gallery" className="py-20 bg-muted/30"><div className="container mx-auto px-4 md:px-6 lg:px-8">
    {active ? <>
      <Button variant="ghost" onClick={() => {setActiveId(null); setLightbox(null);}} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />All Albums</Button>
      <div className="mb-10 max-w-3xl"><h2 className="text-3xl md:text-4xl font-serif mb-3">{active.name}</h2>{active.description && <p className="text-muted-foreground leading-relaxed">{active.description}</p>}<div className="flex flex-wrap gap-5 mt-4 text-sm text-muted-foreground"><span>{selected.length} photos</span>{active.location && <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{active.location}</span>}{active.event_date && <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{new Date(`${active.event_date}T12:00:00`).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"})}</span>}</div></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{selected.map((photo,i) => <article key={photo.id} className="group"><Button variant="ghost" aria-label={`View photo: ${photo.title}`} className="relative w-full h-auto p-0 aspect-[4/3] overflow-hidden rounded-md" onClick={() => setLightbox(i)}><img src={optimizedImageUrl(photo.image_url, {width: 900})} srcSet={buildSrcSet(photo.image_url) || undefined} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={photo.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" /><span className="absolute bottom-3 right-3 p-2 bg-background/90 rounded-md"><ZoomIn className="h-4 w-4" /></span></Button><h3 className="text-lg font-serif mt-4">{photo.title}</h3>{photo.caption && <p className="text-sm text-muted-foreground mt-1">{photo.caption}</p>}</article>)}</div>
    </> : <>
      <h2 className="text-3xl md:text-4xl font-serif mb-10">Photo Albums</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{albums.map(album => {const entries = albumPhotos(photos, album.id, true); const cover = album.cover_image_url || entries[0]?.image_url; return <article key={album.id} className="group bg-card border border-border rounded-md overflow-hidden"><Button variant="ghost" aria-label={`Open album: ${album.name}`} className="block w-full h-auto p-0 aspect-[4/3] overflow-hidden rounded-none" onClick={() => setActiveId(album.id)}>{cover && <img src={optimizedImageUrl(cover, {width: 900})} srcSet={buildSrcSet(cover) || undefined} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={album.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />}</Button><div className="p-5"><h3 className="text-xl font-serif"><Button variant="link" onClick={() => setActiveId(album.id)} className="p-0 h-auto text-xl text-foreground whitespace-normal text-left justify-start">{album.name}</Button></h3>{album.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{album.description}</p>}<div className="flex items-center gap-2 text-sm text-accent mt-4"><Images className="h-4 w-4" />{entries.length} photos</div></div></article>;})}</div>
    </>}
  </div>
  <Dialog open={!!current} onOpenChange={open => !open && setLightbox(null)}><DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-5 md:p-8"><DialogTitle>{current?.title}</DialogTitle><DialogDescription>{current?.caption || active?.name}</DialogDescription>{current && <><img src={optimizedImageUrl(current.image_url, {width: 1920})} alt={current.title} className="w-full max-h-[70vh] object-contain" /><div className="flex justify-between items-center"><Button variant="outline" size="icon" aria-label="Previous photo" title="Previous photo" disabled={lightbox === 0} onClick={() => setLightbox(i => i === null ? null : Math.max(i-1,0))}><ChevronLeft className="h-5 w-5" /></Button><span className="text-sm text-muted-foreground">{(lightbox ?? 0)+1} / {selected.length}</span><Button variant="outline" size="icon" aria-label="Next photo" title="Next photo" disabled={lightbox === selected.length-1} onClick={() => setLightbox(i => i === null ? null : Math.min(i+1,selected.length-1))}><ChevronRight className="h-5 w-5" /></Button></div></>}</DialogContent></Dialog>
  </section>;
}
