import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IndustryFormDialog } from "@/components/admin/IndustryFormDialog";

export default function IndustriesAdmin() {
  const { toast } = useToast();
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState(null);

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from("industries")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setIndustries(data || []);
    } catch (error) {
      console.error("Error loading industries:", error);
      toast({
        title: "Error",
        description: "Failed to load industries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this industry?")) return;

    try {
      const { error } = await supabase.from("industries").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Industry deleted successfully",
      });
      loadIndustries();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete industry",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (industry: any) => {
    setEditingIndustry(industry);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingIndustry(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (success?: boolean) => {
    setDialogOpen(false);
    setEditingIndustry(null);
    if (success) {
      loadIndustries();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Industries</h1>
          <p className="text-muted-foreground">Manage industry sectors</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Industry
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {industries.map((industry: any) => (
              <TableRow key={industry.id}>
                <TableCell className="font-medium">{industry.title}</TableCell>
                <TableCell className="max-w-md truncate">
                  {industry.description}
                </TableCell>
                <TableCell>
                  <Badge variant={industry.published ? "default" : "secondary"}>
                    {industry.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(industry)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(industry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <IndustryFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        industry={editingIndustry}
      />
    </div>
  );
}
