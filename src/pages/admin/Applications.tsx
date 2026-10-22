import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Applications() {
  const { toast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data, error } = await supabase.from("job_applications").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load applications", description: error.message, variant: "destructive" });
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    const { error } = await supabase.from("job_applications").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    load();
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <p className="text-muted-foreground">Applications submitted through the Careers page</p>
      </div>
      <Card>
        <Table>
          <TableHeader><TableRow><TableHead>Position</TableHead><TableHead>Name</TableHead><TableHead>Contact</TableHead><TableHead>Resume</TableHead><TableHead>Message</TableHead><TableHead>Date</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {rows.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No applications yet.</TableCell></TableRow>}
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.job_title}</TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell><a className="text-primary hover:underline" href={`mailto:${r.email}`}>{r.email}</a>{r.phone && <div className="text-sm text-muted-foreground">{r.phone}</div>}</TableCell>
                <TableCell>{r.resume_url ? <a className="text-primary hover:underline" href={r.resume_url} target="_blank" rel="noopener noreferrer">Open</a> : "—"}</TableCell>
                <TableCell className="max-w-sm whitespace-pre-line text-sm">{r.cover_letter || "—"}</TableCell>
                <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                <TableCell><Button variant="ghost" size="icon" aria-label="Delete application" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
