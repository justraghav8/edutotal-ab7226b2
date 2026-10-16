import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, Edit, Eye, EyeOff, Loader2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ImageField } from "@/components/admin/ImageField";
import { ServiceFormDialog } from "@/components/admin/ServiceFormDialog";
import { servicesInCategory } from "@/lib/serviceCategories";
import type { Tables } from "@/integrations/supabase/types";

type Category = Tables<"service_categories">;
type Service = Tables<"services">;
const ICON_OPTIONS = ["Building2", "Users", "Briefcase", "Landmark", "Monitor", "ClipboardCheck", "MapPin", "CalendarDays", "Megaphone", "Globe"];

export default function ServiceCategoriesAdmin() {
  const { toast } = useToast();
  const [items, setItems] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const [managing, setManaging] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [destination, setDestination] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [serviceQuery, setServiceQuery] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  async function load() {
    const [cats, svcs] = await Promise.all([
      supabase.from("service_categories").select("*").order("order_index").order("created_at"),
      supabase.from("services").select("*").order("order_index"),
    ]);
    setError(cats.error?.message || svcs.error?.message || "");
    if (cats.data) setItems(cats.data);
    if (svcs.data) setServices(svcs.data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  async function action(work: () => Promise<void>) {
    setBusy(true);
    try { await work(); await load(); }
    catch (e: unknown) { toast({title: "Could not save change", description: e instanceof Error ? e.message : String(e), variant: "destructive"}); }
    finally { setBusy(false); }
  }
  async function update(id: string, payload: Partial<Category>) {
    const { error } = await supabase.from("service_categories").update(payload).eq("id", id);
    if (error) throw error;
  }
  function add() {
    setEditing({id: "", category_key: `category-${crypto.randomUUID()}`, display_name: "", label: "", description: "", image_url: "", icon_key: "Briefcase", order_index: Math.max(-1, ...items.map(c => c.order_index)) + 1, published: true, created_at: null, updated_at: null});
  }
  function move(category: Category, direction: number) {
    action(async () => {
      const next = [...items];
      const from = next.findIndex(c => c.id === category.id);
      const to = from + direction;
      if (to < 0 || to >= next.length) return;
      [next[from], next[to]] = [next[to], next[from]];
      for (let i = 0; i < next.length; i++) if (next[i].order_index !== i) await update(next[i].id, {order_index: i});
    });
  }
  function save() {
    if (!editing || !editing.display_name.trim()) return;
    const current = editing;
    action(async () => {
      const payload = {category_key: current.category_key, display_name: current.display_name.trim(), label: current.label.trim(), description: current.description?.trim() || null, image_url: current.image_url || null, icon_key: current.icon_key, order_index: current.order_index, published: current.published};
      if (current.id) await update(current.id, payload);
      else { const {error} = await supabase.from("service_categories").insert(payload); if (error) throw error; }
      setEditing(null);
      toast({title: current.id ? "Category updated" : "Category created"});
    });
  }
  function openServices(category: Category) { setManaging(category); setSelected([]); setServiceQuery(""); }
  const shown = items.filter(c => `${c.label} ${c.display_name}`.toLowerCase().includes(query.toLowerCase()));
  const related = managing ? servicesInCategory(services, managing.id) : [];
  const available = managing ? services.filter(s => s.category_id !== managing.id && s.title.toLowerCase().includes(serviceQuery.toLowerCase())) : [];
  const deleteCount = deleting ? servicesInCategory(services, deleting.id).length : 0;

  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">Service Categories</h1><p className="text-muted-foreground">{items.length} categories · {items.filter(c => c.published).length} published</p></div><div className="flex gap-2"><Button asChild variant="outline"><Link to="/admin/services">All Services</Link></Button><Button onClick={add}><Plus className="h-4 w-4 mr-2" />Add Category</Button></div></div>
    <Input aria-label="Search categories" placeholder="Search categories…" value={query} onChange={e => setQuery(e.target.value)} />
    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : error ? <div role="alert"><p className="text-destructive">{error}</p><Button variant="outline" onClick={load}>Retry</Button></div> : <div className="border rounded-md overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Label</TableHead><TableHead>Category</TableHead><TableHead>Services</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
      {shown.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">{items.length ? "No matching categories." : "No categories yet."}</TableCell></TableRow>}
      {shown.map(c => {const index = items.findIndex(x => x.id === c.id); return <TableRow key={c.id}><TableCell>{c.label || "—"}</TableCell><TableCell className="font-medium">{c.display_name}</TableCell><TableCell><Button variant="outline" size="sm" onClick={() => openServices(c)}>{servicesInCategory(services, c.id).length} services</Button></TableCell><TableCell><Badge variant={c.published ? "default" : "secondary"}>{c.published ? "Published" : "Hidden"}</Badge></TableCell><TableCell><div className="flex justify-end gap-1">
        <Button variant="ghost" size="icon" aria-label="Move up" title="Move up" disabled={busy || index === 0 || !!query} onClick={() => move(c, -1)}><ArrowUp className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" aria-label="Move down" title="Move down" disabled={busy || index === items.length - 1 || !!query} onClick={() => move(c, 1)}><ArrowDown className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" aria-label={c.published ? "Hide" : "Publish"} title={c.published ? "Hide" : "Publish"} disabled={busy} onClick={() => action(() => update(c.id, {published: !c.published}))}>{c.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
        <Button variant="ghost" size="icon" aria-label="Edit category" title="Edit category" disabled={busy} onClick={() => setEditing(c)}><Edit className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" aria-label="Delete category" title="Delete category" disabled={busy} onClick={() => {setDeleting(c); setDestination("");}}><Trash2 className="h-4 w-4" /></Button>
      </div></TableCell></TableRow>;})}
    </TableBody></Table></div>}

    <Dialog open={!!editing} onOpenChange={v => !v && !busy && setEditing(null)}><DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{editing?.id ? "Edit Category" : "Add Category"}</DialogTitle></DialogHeader>{editing && <form className="space-y-4" onSubmit={e => {e.preventDefault(); save();}}>
      <div className="space-y-2"><Label htmlFor="category-name">Display Name</Label><Input id="category-name" required maxLength={200} value={editing.display_name} onChange={e => setEditing({...editing, display_name: e.target.value})} /></div>
      <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="category-label">Label</Label><Input id="category-label" maxLength={30} value={editing.label} onChange={e => setEditing({...editing, label: e.target.value})} /></div><div className="space-y-2"><Label htmlFor="category-order">Order</Label><Input id="category-order" type="number" value={editing.order_index} onChange={e => setEditing({...editing, order_index: Number(e.target.value) || 0})} /></div></div>
      <div className="space-y-2"><Label htmlFor="category-description">Description</Label><Textarea id="category-description" value={editing.description || ""} onChange={e => setEditing({...editing, description: e.target.value})} /></div>
      <div className="space-y-2"><Label>Icon</Label><Select value={editing.icon_key || "none"} onValueChange={v => setEditing({...editing, icon_key: v === "none" ? null : v})}><SelectTrigger aria-label="Icon"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem>{ICON_OPTIONS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
      <div className="space-y-2"><Label>Banner Image</Label><ImageField value={editing.image_url || ""} onChange={v => setEditing({...editing, image_url: v})} folder="service-categories" /></div>
      <div className="flex items-center justify-between border rounded-md p-3"><Label htmlFor="category-published">Published</Label><Switch id="category-published" checked={editing.published} onCheckedChange={v => setEditing({...editing, published: v})} /></div>
      <div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={busy} onClick={() => setEditing(null)}>Cancel</Button><Button type="submit" disabled={busy || !editing.display_name.trim()}>{busy ? "Saving…" : "Save Category"}</Button></div>
    </form>}</DialogContent></Dialog>

    <Dialog open={!!managing && !serviceOpen} onOpenChange={v => !v && !busy && setManaging(null)}><DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Services in {managing?.display_name}</DialogTitle><DialogDescription>Moving a service preserves its content and publication status.</DialogDescription></DialogHeader>
      <Button onClick={() => {setEditingService(null); setServiceOpen(true);}}><Plus className="h-4 w-4 mr-2" />Add Service</Button>
      <div className="divide-y divide-border">{related.length === 0 && <p className="py-4 text-muted-foreground">No services in this category yet.</p>}{related.map(s => <div key={s.id} className="flex flex-wrap items-center gap-3 py-3"><span className="flex-1 font-medium">{s.title}</span><Badge variant={s.published ? "default" : "secondary"}>{s.published ? "Published" : "Draft"}</Badge><Button variant="ghost" size="icon" aria-label={`Edit ${s.title}`} title="Edit service" onClick={() => {setEditingService(s); setServiceOpen(true);}}><Edit className="h-4 w-4" /></Button><Select value="" onValueChange={id => action(async () => {const {error} = await supabase.from("services").update({category_id: id}).eq("id", s.id); if (error) throw error;})}><SelectTrigger aria-label={`Move ${s.title}`} className="w-48"><SelectValue placeholder="Move to category" /></SelectTrigger><SelectContent>{items.filter(c => c.id !== managing?.id).map(c => <SelectItem key={c.id} value={c.id}>{c.display_name}</SelectItem>)}</SelectContent></Select></div>)}</div>
      <h3 className="font-semibold">Add Existing Services</h3><Input aria-label="Search available services" placeholder="Search available services…" value={serviceQuery} onChange={e => setServiceQuery(e.target.value)} />
      <div className="max-h-64 overflow-y-auto divide-y divide-border">{available.length === 0 && <p className="py-4 text-muted-foreground">No available services.</p>}{available.map(s => <label key={s.id} className="flex items-center gap-3 py-3"><input type="checkbox" checked={selected.includes(s.id)} onChange={e => setSelected(e.target.checked ? [...selected, s.id] : selected.filter(id => id !== s.id))} /><span className="flex-1"><span className="block">{s.title}</span><span className="text-xs text-muted-foreground">{items.find(c => c.id === s.category_id)?.display_name || "Unassigned"}</span></span><Badge variant={s.published ? "default" : "secondary"}>{s.published ? "Published" : "Draft"}</Badge></label>)}</div>
      <div className="flex justify-end gap-2"><Button variant="outline" disabled={busy} onClick={() => setManaging(null)}>Done</Button><Button disabled={busy || !selected.length} onClick={() => action(async () => {if (!managing) return; const {error} = await supabase.from("services").update({category_id: managing.id}).in("id", selected); if (error) throw error; setSelected([]); toast({title: "Services moved"});})}>Move Selected ({selected.length})</Button></div>
    </DialogContent></Dialog>
    <ServiceFormDialog open={serviceOpen} service={editingService} defaultCategoryId={managing?.id} onClose={success => {setServiceOpen(false); setEditingService(null); if (success) load();}} />

    <Dialog open={!!deleting} onOpenChange={v => !v && !busy && setDeleting(null)}><DialogContent><DialogHeader><DialogTitle>Delete {deleting?.display_name}?</DialogTitle><DialogDescription>{deleteCount ? `${deleteCount} services must be moved to another category. Their content will not be deleted.` : "This permanently removes the empty category."}</DialogDescription></DialogHeader>{deleteCount > 0 && <Select value={destination} onValueChange={setDestination}><SelectTrigger aria-label="Destination category"><SelectValue placeholder="Choose destination category" /></SelectTrigger><SelectContent>{items.filter(c => c.id !== deleting?.id).map(c => <SelectItem key={c.id} value={c.id}>{c.display_name}</SelectItem>)}</SelectContent></Select>}{deleteCount > 0 && items.length < 2 && <p role="alert" className="text-destructive">Create another category before removing this one.</p>}<div className="flex justify-end gap-2"><Button variant="outline" disabled={busy} onClick={() => setDeleting(null)}>Cancel</Button><Button variant="destructive" disabled={busy || (deleteCount > 0 && !destination)} onClick={() => action(async () => {if (!deleting) return; const {error} = await supabase.rpc("remove_service_category", {category_to_remove: deleting.id, destination_category: destination || undefined}); if (error) throw error; setDeleting(null); toast({title: "Category removed"});})}>{busy ? "Removing…" : "Delete Category"}</Button></div></DialogContent></Dialog>
  </div>;
}
