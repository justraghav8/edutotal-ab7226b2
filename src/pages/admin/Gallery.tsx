import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, ArrowLeft, Eye, EyeOff, Images, Loader2 } from "lucide-react";
import { ImageField } from "@/components/admin/ImageField";
import { albumPhotos } from "@/lib/galleryAlbums";
import type { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Album = Tables<"gallery_albums">;
type Photo = Tables<"gallery_images">;
type AlbumDraft = {id?: string; name: string; description: string; location: string; event_date: string; cover_image_url: string; order_index: number; published: boolean};
type PhotoDraft = {id?: string; album_id: string; title: string; caption: string; image_url: string; order_index: number; published: boolean};
export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [albumDraft, setAlbumDraft] = useState<AlbumDraft | null>(null);
  const [photoDraft, setPhotoDraft] = useState<PhotoDraft | null>(null);
  const [deleting, setDeleting] = useState<{type: "album" | "photo"; id: string; name: string} | null>(null);
  const [destination, setDestination] = useState("");
  const active = albums.find(a => a.id === activeId);
  const selected = active ? albumPhotos(photos, active.id) : [];
  async function load() {
    const [a,p] = await Promise.all([supabase.from("gallery_albums").select("*").order("order_index").order("created_at"), supabase.from("gallery_images").select("*").order("order_index").order("created_at")]);
    setError(a.error?.message || p.error?.message || "");
    if (a.data) setAlbums(a.data); if (p.data) setPhotos(p.data); setLoading(false);
  }
  useEffect(() => {load();}, []);
  async function action(work: () => Promise<void>) {
    setBusy(true);
    try { await work(); await load(); }
    catch(e: unknown) {toast.error(e instanceof Error ? e.message : String(e));}
    finally {setBusy(false);}
  }
  async function update(type: "album" | "photo", id: string, payload: {order_index?: number; published?: boolean}) {
    const {error} = type === "album" ? await supabase.from("gallery_albums").update(payload).eq("id",id) : await supabase.from("gallery_images").update(payload).eq("id",id);
    if (error) throw error;
  }
  function reorder(type: "album" | "photo", id: string, direction: number) {
    action(async () => {
      const list = [...(type === "album" ? albums : selected)]; const from = list.findIndex(i => i.id === id); const to = from + direction;
      if (to < 0 || to >= list.length) return;
      [list[from],list[to]] = [list[to],list[from]];
      for (let i=0; i<list.length; i++) if (list[i].order_index !== i) await update(type,list[i].id,{order_index:i});
    });
  }
  function editAlbum(a?: Album) {
    setAlbumDraft(a ? {id:a.id,name:a.name,description:a.description || "",location:a.location || "",event_date:a.event_date || "",cover_image_url:a.cover_image_url || "",order_index:a.order_index,published:a.published} : {name:"",description:"",location:"",event_date:"",cover_image_url:"",order_index:Math.max(-1,...albums.map(a=>a.order_index))+1,published:true});
  }
  function editPhoto(p?: Photo) {
    if (!active && !p) return;
    setPhotoDraft(p ? {id:p.id,album_id:p.album_id,title:p.title,caption:p.caption || "",image_url:p.image_url,order_index:p.order_index || 0,published:p.published ?? true} : {album_id:active?.id || "",title:"",caption:"",image_url:"",order_index:Math.max(-1,...selected.map(p=>p.order_index || 0))+1,published:true});
  }
  function saveAlbum() {
    if (!albumDraft || !albumDraft.name.trim()) return;
    const draft=albumDraft;
    action(async () => {
      const payload={name:draft.name.trim(),description:draft.description.trim() || null,location:draft.location.trim() || null,event_date:draft.event_date || null,cover_image_url:draft.cover_image_url || null,order_index:draft.order_index,published:draft.published};
      const {error}=draft.id ? await supabase.from("gallery_albums").update(payload).eq("id",draft.id) : await supabase.from("gallery_albums").insert(payload);
      if(error) throw error; setAlbumDraft(null); toast.success("Album saved");
    });
  }
  function savePhoto() {
    if (!photoDraft || !photoDraft.album_id || !photoDraft.title.trim() || !photoDraft.image_url.trim()) return;
    const draft=photoDraft;
    action(async () => {
      const payload={album_id:draft.album_id,title:draft.title.trim(),caption:draft.caption.trim() || null,image_url:draft.image_url.trim(),order_index:draft.order_index,published:draft.published};
      const {error}=draft.id ? await supabase.from("gallery_images").update(payload).eq("id",draft.id) : await supabase.from("gallery_images").insert(payload);
      if(error) throw error; setPhotoDraft(null); toast.success("Photo saved");
    });
  }
  const deleteCount = deleting?.type === "album" ? albumPhotos(photos,deleting.id).length : 0;
  const shownAlbums=albums.filter(a=>`${a.name} ${a.description || ""}`.toLowerCase().includes(query.toLowerCase()));
  const shownPhotos=selected.filter(p=>`${p.title} ${p.caption || ""}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6">
    <div className="flex flex-wrap justify-between items-center gap-4"><div>{active && <Button variant="ghost" onClick={()=>{setActiveId(null);setQuery("");}} className="mb-3"><ArrowLeft className="h-4 w-4 mr-2" />All Albums</Button>}<h1 className="text-3xl font-bold">{active?.name || "Gallery Albums"}</h1><p className="text-muted-foreground">{active ? `${selected.length} photos` : `${albums.length} albums · ${photos.length} photos`}</p></div><div className="flex gap-2">{active ? <><Button variant="outline" onClick={()=>editAlbum(active)}>Edit Album</Button><Button onClick={()=>editPhoto()}><Plus className="h-4 w-4 mr-2" />Add Photo</Button></> : <Button onClick={()=>editAlbum()}><Plus className="h-4 w-4 mr-2" />Add Album</Button>}</div></div>
    <Input aria-label={active ? "Search photos" : "Search albums"} placeholder={active ? "Search photos…" : "Search albums…"} value={query} onChange={e=>setQuery(e.target.value)} />
    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : error ? <div role="alert"><p className="text-destructive">{error}</p><Button variant="outline" onClick={load}>Retry</Button></div> : active ? <>
      {shownPhotos.length===0 && <p className="text-muted-foreground py-12 text-center">{selected.length ? "No matching photos." : "No photos in this album yet."}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{shownPhotos.map(p=>{const index=selected.findIndex(i=>i.id===p.id);return <article key={p.id} className="border border-border rounded-md overflow-hidden" aria-label={`Photo: ${p.title}`}><img src={p.image_url} alt={p.title} className="w-full aspect-[4/3] object-cover" loading="lazy" /><div className="p-4"><h2 className="text-lg font-medium">{p.title}</h2>{p.caption && <p className="text-sm text-muted-foreground mt-1">{p.caption}</p>}<Badge variant={p.published ? "default":"secondary"} className="mt-3">{p.published ? "Published":"Hidden"}</Badge><div className="flex flex-wrap gap-1 mt-3">
        <Button size="icon" variant="ghost" aria-label="Move photo up" title="Move photo up" disabled={busy || index===0 || !!query} onClick={()=>reorder("photo",p.id,-1)}><ArrowUp className="h-4 w-4" /></Button><Button size="icon" variant="ghost" aria-label="Move photo down" title="Move photo down" disabled={busy || index===selected.length-1 || !!query} onClick={()=>reorder("photo",p.id,1)}><ArrowDown className="h-4 w-4" /></Button><Button size="icon" variant="ghost" aria-label={p.published ? "Hide photo":"Publish photo"} title={p.published ? "Hide photo":"Publish photo"} disabled={busy} onClick={()=>action(()=>update("photo",p.id,{published:!p.published}))}>{p.published ? <EyeOff className="h-4 w-4" />:<Eye className="h-4 w-4" />}</Button><Button size="icon" variant="ghost" aria-label="Edit photo" title="Edit photo" onClick={()=>editPhoto(p)}><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" aria-label="Delete photo" title="Delete photo" onClick={()=>{setDeleting({type:"photo",id:p.id,name:p.title});setDestination("");}}><Trash2 className="h-4 w-4" /></Button>
      </div></div></article>;})}</div>
    </> : <>
      {shownAlbums.length===0 && <p className="text-center py-12 text-muted-foreground">{albums.length ? "No matching albums." : "No albums yet."}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{shownAlbums.map(a=>{const entries=albumPhotos(photos,a.id);const cover=a.cover_image_url || entries[0]?.image_url;const index=albums.findIndex(i=>i.id===a.id);return <article key={a.id} className="border border-border rounded-md overflow-hidden" aria-label={`Album: ${a.name}`}><Button variant="ghost" className="w-full h-auto p-0 aspect-[4/3] rounded-none bg-muted" aria-label={`Open album: ${a.name}`} onClick={()=>{setActiveId(a.id);setQuery("");}}>{cover ? <img src={cover} alt={a.name} className="w-full h-full object-cover" loading="lazy" />:<Images className="h-12 w-12 text-muted-foreground" />}</Button><div className="p-4"><h2 className="text-xl font-medium">{a.name}</h2>{a.description && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{a.description}</p>}<p className="text-sm text-muted-foreground mt-2">{entries.length} photos{a.location ? ` · ${a.location}`:""}</p><Badge variant={a.published ? "default":"secondary"} className="mt-3">{a.published ? "Published":"Hidden"}</Badge><div className="flex gap-1 mt-3"><Button size="icon" variant="ghost" aria-label="Move album up" title="Move album up" disabled={busy || index===0 || !!query} onClick={()=>reorder("album",a.id,-1)}><ArrowUp className="h-4 w-4" /></Button><Button size="icon" variant="ghost" aria-label="Move album down" title="Move album down" disabled={busy || index===albums.length-1 || !!query} onClick={()=>reorder("album",a.id,1)}><ArrowDown className="h-4 w-4" /></Button><Button size="icon" variant="ghost" aria-label={a.published ? "Hide album":"Publish album"} title={a.published ? "Hide album":"Publish album"} disabled={busy} onClick={()=>action(()=>update("album",a.id,{published:!a.published}))}>{a.published ? <EyeOff className="h-4 w-4" />:<Eye className="h-4 w-4" />}</Button><Button size="icon" variant="ghost" aria-label="Edit album" title="Edit album" onClick={()=>editAlbum(a)}><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" aria-label="Delete album" title="Delete album" onClick={()=>{setDeleting({type:"album",id:a.id,name:a.name});setDestination("");}}><Trash2 className="h-4 w-4" /></Button></div></div></article>;})}</div>
    </>}

    <Dialog open={!!albumDraft} onOpenChange={v=>!v && !busy && setAlbumDraft(null)}><DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{albumDraft?.id ? "Edit Album":"Add Album"}</DialogTitle></DialogHeader>{albumDraft && <form className="space-y-4" onSubmit={e=>{e.preventDefault();saveAlbum();}}><div className="space-y-2"><Label htmlFor="album-name">Album Name</Label><Input id="album-name" required maxLength={200} value={albumDraft.name} onChange={e=>setAlbumDraft({...albumDraft,name:e.target.value})} /></div><div className="space-y-2"><Label htmlFor="album-description">Description</Label><Textarea id="album-description" value={albumDraft.description} onChange={e=>setAlbumDraft({...albumDraft,description:e.target.value})} /></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="album-location">Location</Label><Input id="album-location" value={albumDraft.location} onChange={e=>setAlbumDraft({...albumDraft,location:e.target.value})} /></div><div className="space-y-2"><Label htmlFor="album-date">Event Date</Label><Input id="album-date" type="date" value={albumDraft.event_date} onChange={e=>setAlbumDraft({...albumDraft,event_date:e.target.value})} /></div></div><div className="space-y-2"><Label htmlFor="album-order">Order</Label><Input id="album-order" type="number" value={albumDraft.order_index} onChange={e=>setAlbumDraft({...albumDraft,order_index:Number(e.target.value)||0})} /></div><div className="space-y-2"><Label>Cover Image</Label><ImageField value={albumDraft.cover_image_url} onChange={v=>setAlbumDraft({...albumDraft,cover_image_url:v})} folder="gallery/covers" /></div><div className="flex justify-between items-center"><Label htmlFor="album-published">Published</Label><Switch id="album-published" checked={albumDraft.published} onCheckedChange={v=>setAlbumDraft({...albumDraft,published:v})} /></div><div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={busy} onClick={()=>setAlbumDraft(null)}>Cancel</Button><Button type="submit" disabled={busy || !albumDraft.name.trim()}>{busy ? "Saving…":"Save Album"}</Button></div></form>}</DialogContent></Dialog>

    <Dialog open={!!photoDraft} onOpenChange={v=>!v && !busy && setPhotoDraft(null)}><DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{photoDraft?.id ? "Edit Photo":"Add Photo"}</DialogTitle></DialogHeader>{photoDraft && <form className="space-y-4" onSubmit={e=>{e.preventDefault();savePhoto();}}><div className="space-y-2"><Label htmlFor="photo-title">Title</Label><Input id="photo-title" required value={photoDraft.title} onChange={e=>setPhotoDraft({...photoDraft,title:e.target.value})} /></div><div className="space-y-2"><Label htmlFor="photo-caption">Caption</Label><Textarea id="photo-caption" value={photoDraft.caption} onChange={e=>setPhotoDraft({...photoDraft,caption:e.target.value})} /></div><div className="space-y-2"><Label>Album</Label><Select value={photoDraft.album_id} onValueChange={v=>setPhotoDraft({...photoDraft,album_id:v,order_index:Math.max(-1,...albumPhotos(photos,v).map(p=>p.order_index || 0))+1})}><SelectTrigger aria-label="Photo album"><SelectValue /></SelectTrigger><SelectContent>{albums.map(a=><SelectItem key={a.id} value={a.id}>{a.name}{a.published ? "":" (Hidden)"}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Photo Image</Label><ImageField value={photoDraft.image_url} onChange={v=>setPhotoDraft({...photoDraft,image_url:v})} folder={`gallery/${photoDraft.album_id}`} /></div><div className="space-y-2"><Label htmlFor="photo-order">Order</Label><Input id="photo-order" type="number" value={photoDraft.order_index} onChange={e=>setPhotoDraft({...photoDraft,order_index:Number(e.target.value)||0})} /></div><div className="flex justify-between items-center"><Label htmlFor="photo-published">Published</Label><Switch id="photo-published" checked={photoDraft.published} onCheckedChange={v=>setPhotoDraft({...photoDraft,published:v})} /></div><div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={busy} onClick={()=>setPhotoDraft(null)}>Cancel</Button><Button type="submit" disabled={busy || !photoDraft.title.trim() || !photoDraft.image_url.trim() || !photoDraft.album_id}>{busy ? "Saving…":"Save Photo"}</Button></div></form>}</DialogContent></Dialog>

    <Dialog open={!!deleting} onOpenChange={v=>!v && !busy && setDeleting(null)}><DialogContent><DialogHeader><DialogTitle>Delete {deleting?.name}?</DialogTitle><DialogDescription>{deleteCount ? `${deleteCount} photos must be moved to another album. The photos will not be deleted.` : deleting?.type==="photo" ? "Remove this photo from the gallery. The original image remains in the Image Library." : "This permanently removes the empty album."}</DialogDescription></DialogHeader>{deleteCount>0 && <Select value={destination} onValueChange={setDestination}><SelectTrigger aria-label="Destination album"><SelectValue placeholder="Choose destination album" /></SelectTrigger><SelectContent>{albums.filter(a=>a.id!==deleting?.id).map(a=><SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent></Select>}{deleteCount>0 && albums.length<2 && <p className="text-destructive">Create another album before removing this one.</p>}<div className="flex justify-end gap-2"><Button variant="outline" disabled={busy} onClick={()=>setDeleting(null)}>Cancel</Button><Button variant="destructive" disabled={busy || (deleteCount>0 && !destination)} onClick={()=>action(async()=>{if(!deleting)return;if(deleting.type==="album"){const {error}=await supabase.rpc("remove_gallery_album",{album_to_remove:deleting.id,destination_album:destination || undefined});if(error)throw error;if(activeId===deleting.id)setActiveId(null);}else{const {error}=await supabase.from("gallery_images").delete().eq("id",deleting.id);if(error)throw error;}setDeleting(null);toast.success("Removed");})}>{busy ? "Removing…":deleting?.type==="album" ? "Delete Album":"Delete Photo"}</Button></div></DialogContent></Dialog>
  </div>;
}
