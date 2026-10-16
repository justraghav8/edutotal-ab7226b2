import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowUp, ArrowDown, Copy, Eye, EyeOff, Pencil, Plus, Trash2, Loader2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TableName = "services" | "industries" | "careers";
export function ContentManager({ table, title, singular, titleKey, Dialog }: {
  table: TableName;
  title: string;
  singular: string;
  titleKey: "title" | "job_title";
  Dialog: React.ComponentType<any>;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleting, setDeleting] = useState<any>(null);
  const [categories, setCategories] = useState<{id: string; display_name: string}[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { toast } = useToast();
  const load = async () => {
    const { data, error: e } = await supabase.from(table).select("*").order("order_index").order("created_at");
    if (e) setError(e.message);
    else { setItems(data || []); setError(""); }
    setLoading(false);
  };
  useEffect(() => { load(); }, [table]);
  useEffect(() => {
    if (table === "services") supabase.from("service_categories").select("id, display_name").order("order_index").then(({data}) => setCategories(data || []));
  }, [table]);
  const action = async (work: () => Promise<void>) => {
    setBusy(true);
    try { await work(); await load(); }
    catch (e: any) { toast({title: "Could not save change", description: e.message, variant: "destructive"}); }
    finally { setBusy(false); }
  };
  const update = async (id: string, payload: any) => {
    const { error } = await supabase.from(table).update(payload).eq("id", id);
    if (error) throw error;
  };
  const move = (item: any, direction: number) => action(async () => {
    const index = items.findIndex((x) => x.id === item.id);
    const dest = index + direction;
    if (dest < 0 || dest >= items.length) return;
    // Normalize ties so moving rows remains reliable even when existing order values match.
    const next = [...items];
    [next[index], next[dest]] = [next[dest], next[index]];
    for (let i = 0; i < next.length; i++) if (next[i].order_index !== i) await update(next[i].id, {order_index: i});
  });
  const duplicate = (item: any) => action(async () => {
    const { id, created_at, updated_at, ...copy } = item;
    copy[titleKey] = `${copy[titleKey]} (Copy)`;
    copy.published = false;
    copy.order_index = Math.max(-1, ...items.map((i) => i.order_index || 0)) + 1;
    if (copy.slug) copy.slug = `${copy.slug}-copy-${Date.now()}`;
    const { data, error } = await supabase.from(table).insert(copy).select("id").single();
    if (error) throw error;
    if (table === "industries") {
      const { data: links, error: e } = await supabase.from("industry_services").select("service_id").eq("industry_id", id);
      if (e) throw e;
      if (links?.length) {
        const { error: e2 } = await supabase.from("industry_services").insert(links.map((l) => ({industry_id: data.id, service_id: l.service_id})));
        if (e2) throw e2;
      }
    }
    toast({title: "Draft copy created"});
  });
  const categoryName = (id: string) => categories.find(c => c.id === id)?.display_name || "Unassigned";
  const shown = items.filter((i) => (!query || `${i[titleKey]} ${table === "services" ? categoryName(i.category_id) : ""} ${i.location || ""}`.toLowerCase().includes(query.toLowerCase())) && (status === "all" || i.published === (status === "published")) && (table !== "services" || categoryFilter === "all" || i.category_id === categoryFilter));
  const itemProp = table === "services" ? "service" : table === "industries" ? "industry" : "career";
  return <div className="space-y-6">
    {table === "services" && <div className="flex flex-wrap items-center gap-3"><Button asChild variant="outline"><Link to="/admin/service-categories">Service Categories</Link></Button><Select value={categoryFilter} onValueChange={setCategoryFilter}><SelectTrigger className="w-72" aria-label="Filter by category"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.display_name}</SelectItem>)}</SelectContent></Select></div>}
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">{title}</h1><p className="text-muted-foreground">{items.length} total · {items.filter((i) => i.published).length} published</p></div><div className="flex gap-2"><Button asChild variant="outline"><Link to="/admin/page-content">Page Content</Link></Button><Button onClick={() => {setEditing(null); setOpen(true);}}><Plus className="h-4 w-4 mr-2" />Add {singular}</Button></div></div>
    <div className="flex flex-wrap gap-3"><div className="relative flex-1 min-w-48"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label={`Search ${title}`} placeholder={`Search ${title.toLowerCase()}…`} value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" /></div><Select value={status} onValueChange={setStatus}><SelectTrigger className="w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Drafts</SelectItem></SelectContent></Select></div>
    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : error ? <div role="alert" className="text-destructive space-y-3"><p>{error}</p><Button variant="outline" onClick={load}>Retry</Button></div> : <div className="border rounded-md overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead>{table === "services" ? "Category" : table === "careers" ? "Location / Type" : "Description"}</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
      {shown.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-12 text-muted-foreground">{items.length ? "No matching results." : `No ${title.toLowerCase()} yet. Add your first ${singular.toLowerCase()}.`}</TableCell></TableRow>}
      {shown.map((item) => {const idx = items.findIndex((x) => x.id === item.id); return <TableRow key={item.id}>
        <TableCell className="font-medium max-w-sm">{item[titleKey]}</TableCell><TableCell className="max-w-xs truncate">{table === "services" ? categoryName(item.category_id) : table === "careers" ? [item.location, item.employment_type].filter(Boolean).join(" · ") : item.description}</TableCell><TableCell><Badge variant={item.published ? "default" : "secondary"}>{item.published ? "Published" : "Draft"}</Badge></TableCell>
        <TableCell><div className="flex justify-end gap-1">
          <Button title="Move up" aria-label="Move up" size="icon" variant="ghost" disabled={busy || idx === 0 || !!query || status !== "all"} onClick={() => move(item, -1)}><ArrowUp className="h-4 w-4" /></Button>
          <Button title="Move down" aria-label="Move down" size="icon" variant="ghost" disabled={busy || idx === items.length - 1 || !!query || status !== "all"} onClick={() => move(item, 1)}><ArrowDown className="h-4 w-4" /></Button>
          <Button title={item.published ? "Hide" : "Publish"} aria-label={item.published ? "Hide" : "Publish"} size="icon" variant="ghost" disabled={busy} onClick={() => action(() => update(item.id, {published: !item.published}))}>{item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
          <Button title="Duplicate" aria-label="Duplicate" size="icon" variant="ghost" disabled={busy} onClick={() => duplicate(item)}><Copy className="h-4 w-4" /></Button>
          <Button title="Edit" aria-label="Edit" size="icon" variant="ghost" disabled={busy} onClick={() => {setEditing(item); setOpen(true);}}><Pencil className="h-4 w-4" /></Button>
          <Button title="Delete" aria-label="Delete" size="icon" variant="ghost" disabled={busy} onClick={() => setDeleting(item)}><Trash2 className="h-4 w-4" /></Button>
        </div></TableCell>
      </TableRow>;})}
    </TableBody></Table></div>}
    <Dialog open={open} {...{[itemProp]: editing}} onClose={(success?: boolean) => {setOpen(false); setEditing(null); if (success) load();}} />
    <AlertDialog open={!!deleting} onOpenChange={(v) => !v && !busy && setDeleting(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {deleting?.[titleKey]}?</AlertDialogTitle><AlertDialogDescription>This permanently removes the content. Hide it instead if you may need it again.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel><AlertDialogAction disabled={busy} onClick={(e) => {e.preventDefault(); action(async () => {const {error} = await supabase.from(table).delete().eq("id", deleting.id); if (error) throw error; setDeleting(null);});}}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;
}