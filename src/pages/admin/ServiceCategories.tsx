import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Loader2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ServiceCategory {
  id: string;
  category_key: string;
  label: string;
  display_name: string;
  description: string | null;
  icon_key: string | null;
  image_url: string | null;
  order_index: number;
  published: boolean;
}

const ICON_OPTIONS = [
  "Building2", "Users", "Briefcase", "Landmark", "Monitor",
  "ClipboardCheck", "MapPin", "CalendarDays", "Megaphone", "Globe",
];

export default function ServiceCategoriesAdmin() {
  const { toast } = useToast();
  const [items, setItems] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceCategory | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const [{ data: cats }, { data: svcs }] = await Promise.all([
      supabase.from("service_categories").select("*").order("order_index"),
      supabase.from("services").select("id, title, slug, category, published").order("order_index"),
    ]);
    setItems(cats || []);
    setServices(svcs || []);
    setLoading(false);
  }

  async function save() {
    if (!editing) return;
    const { id, ...payload } = editing;
    const { error } = await supabase
      .from("service_categories")
      .update(payload)
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved", description: "Category updated." });
    setEditing(null);
    load();
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Service Categories</h1>
        <p className="text-muted-foreground">
          Edit the 10 service category headings, descriptions, icons, and banner images shown on the Services page.
        </p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Label</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => {
              const related = services.filter((s) => s.category === c.category_key);
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-mono font-bold">{c.label}</TableCell>
                  <TableCell className="font-medium">{c.display_name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{c.icon_key || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{related.length}</Badge>
                  </TableCell>
                  <TableCell>{c.order_index}</TableCell>
                  <TableCell>
                    <Badge variant={c.published ? "default" : "secondary"}>
                      {c.published ? "Published" : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setEditing(c)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Label (A-J)</Label>
                  <Input
                    value={editing.label}
                    onChange={(e) => setEditing({ ...editing, label: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Order Index</Label>
                  <Input
                    type="number"
                    value={editing.order_index}
                    onChange={(e) => setEditing({ ...editing, order_index: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  value={editing.display_name}
                  onChange={(e) => setEditing({ ...editing, display_name: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Internal key (used to link services): <code>{editing.category_key}</code>
                </p>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={editing.icon_key || ""}
                  onChange={(e) => setEditing({ ...editing, icon_key: e.target.value })}
                >
                  <option value="">— None —</option>
                  {ICON_OPTIONS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Banner Image URL (optional)</Label>
                <Input
                  value={editing.image_url || ""}
                  placeholder="Paste image URL from Image Library"
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                />
                {editing.image_url && (
                  <img src={editing.image_url} alt="" className="mt-2 h-32 rounded object-cover" />
                )}
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label>Published</Label>
                <Switch
                  checked={editing.published}
                  onCheckedChange={(v) => setEditing({ ...editing, published: v })}
                />
              </div>

              <div className="space-y-2 rounded-lg border p-3 bg-muted/30">
                <Label>Related Services</Label>
                <div className="space-y-1">
                  {services
                    .filter((s) => s.category === editing.category_key)
                    .map((s) => (
                      <div key={s.id} className="flex items-center justify-between text-sm">
                        <span>{s.title}</span>
                        <Badge variant={s.published ? "default" : "secondary"} className="text-[10px]">
                          {s.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    ))}
                  {services.filter((s) => s.category === editing.category_key).length === 0 && (
                    <p className="text-xs text-muted-foreground">No services in this category yet.</p>
                  )}
                </div>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link to="/admin/services">
                    Manage Services <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={save}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
