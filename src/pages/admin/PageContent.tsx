import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PAGE_DEFS, mergeContent, CardItem } from "@/lib/pageContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Plus, Save, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PageContent() {
  const [page, setPage] = useState("services");
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const { toast } = useToast();
  const def = PAGE_DEFS.find((p) => p.key === page);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase.from("page_content").select("content").eq("page_key", page).maybeSingle().then(({ data, error }) => {
      if (!active) return;
      if (error) toast({ title: "Could not load content", description: error.message, variant: "destructive" });
      setContent(mergeContent(page, data?.content as any));
      setLoading(false);
      setDirty(false);
    });
    return () => { active = false; };
  }, [page, toast]);

  const set = (key: string, value: any) => {
    setContent((c) => ({ ...c, [key]: value }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("page_content").upsert({ page_key: page, content }, { onConflict: "page_key" });
    setSaving(false);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    setDirty(false);
    toast({ title: "Page content saved" });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div><h1 className="text-3xl font-bold">Page Content</h1><p className="text-muted-foreground">Services, Industries and Careers section content</p></div>
        <Button onClick={save} disabled={loading || saving || !dirty}><Save className="h-4 w-4 mr-2" />{saving ? "Saving…" : "Save Changes"}</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={page} onValueChange={(value) => { if (!dirty || confirm("Discard unsaved changes?")) setPage(value); }}>
          <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
          <SelectContent>{PAGE_DEFS.map((p) => <SelectItem value={p.key} key={p.key}>{p.label}</SelectItem>)}</SelectContent>
        </Select>
        <Button variant="outline" asChild><Link to="/admin/hero-banners">Edit Page Banners</Link></Button>
        <Button variant="ghost" asChild><a target="_blank" rel="noopener noreferrer" href={`/${page.startsWith("service") ? "services" : page.startsWith("industr") ? "industries" : "careers"}`}>View Page</a></Button>
      </div>
      {loading ? <Loader2 className="animate-spin h-6 w-6" /> : def?.groups.map((group) => (
        <section key={group.title} className="border-t pt-6 space-y-4">
          <h2 className="text-xl font-semibold">{group.title}</h2>
          {group.fields.map((field) => {
            const id = `content-${field.key}`;
            if (field.type === "toggle") return <div key={id} className="flex items-center gap-3"><Switch id={id} checked={content[field.key] !== false} onCheckedChange={(v) => set(field.key, v)} /><Label htmlFor={id}>{field.label}</Label></div>;
            if (field.type === "cards") {
              const cards: CardItem[] = Array.isArray(content[field.key]) ? content[field.key] : [];
              return <div key={id} className="space-y-3"><Label>{field.label}</Label>
                {cards.length === 0 && <p className="text-sm text-muted-foreground">No cards. The section is hidden while empty.</p>}
                {cards.map((card, index) => <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Card {index + 1}</span><div className="flex">
                    {[-1, 1].map((d) => <Button key={d} variant="ghost" size="icon" disabled={index + d < 0 || index + d >= cards.length} aria-label={d < 0 ? "Move card up" : "Move card down"} onClick={() => { const next = [...cards]; [next[index], next[index + d]] = [next[index + d], next[index]]; set(field.key, next); }}>{d < 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}</Button>)}
                    <Button variant="ghost" size="icon" aria-label="Delete card" onClick={() => set(field.key, cards.filter((_, i) => i !== index))}><Trash2 className="h-4 w-4" /></Button>
                  </div></div>
                  <Label htmlFor={`${id}-${index}-title`}>Title</Label><Input id={`${id}-${index}-title`} value={card.title} onChange={(e) => set(field.key, cards.map((c, i) => i === index ? { ...c, title: e.target.value } : c))} />
                  <Label htmlFor={`${id}-${index}-description`}>Description</Label><Textarea id={`${id}-${index}-description`} value={card.description} onChange={(e) => set(field.key, cards.map((c, i) => i === index ? { ...c, description: e.target.value } : c))} />
                  <Label>Icon</Label><Select value={card.icon || "TrendingUp"} onValueChange={(v) => set(field.key, cards.map((c, i) => i === index ? { ...c, icon: v } : c))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["TrendingUp", "Lightbulb", "Globe2", "Users", "Heart", "Award"].map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
                </div>)}
                <Button variant="outline" onClick={() => set(field.key, [...cards, { icon: "TrendingUp", title: "", description: "" }])}><Plus className="mr-2 h-4 w-4" />Add Card</Button>
              </div>;
            }
            return <div key={id} className="space-y-2"><Label htmlFor={id}>{field.label}</Label>{field.type === "textarea" ? <Textarea id={id} value={content[field.key] ?? ""} onChange={(e) => set(field.key, e.target.value)} /> : <Input id={id} value={content[field.key] ?? ""} onChange={(e) => set(field.key, e.target.value)} />}{field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}</div>;
          })}
        </section>
      ))}
      <div className="border-t pt-4 flex justify-end"><Button disabled={!dirty || saving || loading} onClick={save}><Save className="h-4 w-4 mr-2" />{saving ? "Saving…" : "Save Changes"}</Button></div>
    </div>
  );
}