import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp, Copy, Pencil, Plus, Trash2, Upload, Eye, EyeOff } from "lucide-react";

type SlideRow = {
  id: string;
  eyebrow: string | null;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  cta_new_tab: boolean;
  cta2_text: string | null;
  cta2_link: string | null;
  cta2_new_tab: boolean;
  overlay_opacity: number;
  order_index: number;
  published: boolean;
};

const empty: Omit<SlideRow, "id" | "order_index"> = {
  eyebrow: "", title: "", subtitle: "", image_url: "",
  cta_text: "", cta_link: "", cta_new_tab: false,
  cta2_text: "", cta2_link: "", cta2_new_tab: false,
  overlay_opacity: 55, published: true,
};

export default function HomeSlides() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<SlideRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SlideRow> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("home_slides").select("*").order("order_index");
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    setSlides((data as SlideRow[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const clean = (v: string | null | undefined) => (v && v.trim() ? v.trim() : null);

  const save = async () => {
    if (!editing?.title?.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      eyebrow: clean(editing.eyebrow), title: editing.title.trim(), subtitle: clean(editing.subtitle),
      image_url: clean(editing.image_url),
      cta_text: clean(editing.cta_text), cta_link: clean(editing.cta_link), cta_new_tab: !!editing.cta_new_tab,
      cta2_text: clean(editing.cta2_text), cta2_link: clean(editing.cta2_link), cta2_new_tab: !!editing.cta2_new_tab,
      overlay_opacity: editing.overlay_opacity ?? 55, published: editing.published ?? true,
    };
    const res = editing.id
      ? await supabase.from("home_slides").update(payload).eq("id", editing.id)
      : await supabase.from("home_slides").insert({
          ...payload,
          order_index: slides.length ? Math.max(...slides.map((s) => s.order_index)) + 1 : 0,
        });
    setSaving(false);
    if (res.error) return toast({ title: "Error", description: res.error.message, variant: "destructive" });
    toast({ title: editing.id ? "Slide updated" : "Slide created" });
    setEditing(null);
    load();
  };

  const upload = async (file: File) => {
    setUploading(true);
    const path = `slides/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    setUploading(false);
    if (error) return toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    const { data } = supabase.storage.from("images").getPublicUrl(path);
    setEditing((e) => ({ ...e, image_url: data.publicUrl }));
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    [next[index], next[target]] = [next[target], next[index]];
    setSlides(next);
    const results = await Promise.all(
      next.map((s, i) => supabase.from("home_slides").update({ order_index: i }).eq("id", s.id)),
    );
    if (results.some((r) => r.error)) toast({ title: "Reorder failed", variant: "destructive" });
    load();
  };

  const togglePublished = async (s: SlideRow) => {
    const { error } = await supabase.from("home_slides").update({ published: !s.published }).eq("id", s.id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    load();
  };

  const duplicate = (s: SlideRow) => {
    const { id: _id, order_index: _o, ...rest } = s;
    setEditing({ ...rest, title: `${s.title} (copy)`, published: false });
  };

  const remove = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("home_slides").delete().eq("id", deleteId);
    setDeleteId(null);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Slide deleted" });
    load();
  };

  const set = (patch: Partial<SlideRow>) => setEditing((e) => ({ ...e, ...patch }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Homepage Slider</h1>
          <p className="text-muted-foreground">Create, edit, reorder, hide and delete the slides at the top of the homepage.</p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}><Plus className="h-4 w-4 mr-2" />Add Slide</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : slides.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">No slides yet. Click "Add Slide" to create one.</Card>
      ) : (
        <div className="space-y-3">
          {slides.map((s, i) => (
            <Card key={s.id} className={`p-4 flex items-center gap-4 ${s.published ? "" : "opacity-60"}`}>
              <div className="flex flex-col gap-1">
                <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" disabled={i === slides.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown className="h-4 w-4" /></Button>
              </div>
              <div className="w-40 h-24 rounded-md overflow-hidden bg-muted shrink-0">
                {s.image_url && <img src={s.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">#{i + 1}{s.eyebrow ? ` · ${s.eyebrow}` : ""}{!s.published && " · Hidden"}</div>
                <div className="font-semibold truncate">{s.title}</div>
                {s.subtitle && <div className="text-sm text-muted-foreground line-clamp-1">{s.subtitle}</div>}
                {s.cta_text && <div className="text-xs mt-1">Button: {s.cta_text} → {s.cta_link}</div>}
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => togglePublished(s)} aria-label={s.published ? "Hide" : "Show"}>
                  {s.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => duplicate(s)} aria-label="Duplicate"><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setEditing(s)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setDeleteId(s.id)} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit Slide" : "New Slide"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div>
                <Label>Image</Label>
                <div className="mt-2 rounded-md overflow-hidden bg-muted aspect-[16/6] relative">
                  {editing.image_url && <img src={editing.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input placeholder="Image URL (recommended 1920×1080)" value={editing.image_url || ""} onChange={(e) => set({ image_url: e.target.value })} />
                  <Button variant="outline" asChild disabled={uploading}>
                    <label className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />{uploading ? "Uploading…" : "Upload"}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
                    </label>
                  </Button>
                </div>
              </div>
              <div>
                <Label>Darkness over image: {editing.overlay_opacity ?? 55}%</Label>
                <Slider className="mt-3" min={0} max={90} step={5} value={[editing.overlay_opacity ?? 55]} onValueChange={([v]) => set({ overlay_opacity: v })} />
              </div>
              <div><Label>Small label above title</Label><Input value={editing.eyebrow || ""} onChange={(e) => set({ eyebrow: e.target.value })} placeholder="e.g. Case Study" /></div>
              <div><Label>Title *</Label><Input value={editing.title || ""} onChange={(e) => set({ title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea rows={3} value={editing.subtitle || ""} onChange={(e) => set({ subtitle: e.target.value })} /></div>

              {(["cta", "cta2"] as const).map((k, idx) => (
                <Card key={k} className="p-4 space-y-3">
                  <div className="font-medium">{idx === 0 ? "Main button" : "Second button (optional)"}</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Button text</Label><Input value={(editing[`${k}_text`] as string) || ""} onChange={(e) => set({ [`${k}_text`]: e.target.value })} placeholder="Read More" /></div>
                    <div><Label>Link</Label><Input value={(editing[`${k}_link`] as string) || ""} onChange={(e) => set({ [`${k}_link`]: e.target.value })} placeholder="/contact or https://…" /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={!!editing[`${k}_new_tab`]} onCheckedChange={(v) => set({ [`${k}_new_tab`]: v })} />
                    <Label>Open in new tab</Label>
                  </div>
                </Card>
              ))}

              <div className="flex items-center gap-2">
                <Switch checked={editing.published ?? true} onCheckedChange={(v) => set({ published: v })} />
                <Label>Show on homepage</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Slide"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this slide?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
