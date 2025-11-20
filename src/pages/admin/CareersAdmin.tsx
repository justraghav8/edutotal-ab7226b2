import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CareerFormDialog } from "@/components/admin/CareerFormDialog";

export default function CareersAdmin() {
  const { toast } = useToast();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCareers(data || []);
    } catch (error) {
      console.error("Error loading careers:", error);
      toast({
        title: "Error",
        description: "Failed to load career openings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career opening?")) return;

    try {
      const { error } = await supabase.from("careers").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Career opening deleted successfully",
      });
      loadCareers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete career opening",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (career: any) => {
    setEditingCareer(career);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCareer(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (success?: boolean) => {
    setDialogOpen(false);
    setEditingCareer(null);
    if (success) {
      loadCareers();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Career Openings</h1>
          <p className="text-muted-foreground">Manage job postings</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Opening
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Apply Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {careers.map((career: any) => (
              <TableRow key={career.id}>
                <TableCell className="font-medium">{career.job_title}</TableCell>
                <TableCell>{career.location || "—"}</TableCell>
                <TableCell>{career.apply_email}</TableCell>
                <TableCell>
                  <Badge variant={career.published ? "default" : "secondary"}>
                    {career.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(career)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(career.id)}
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

      <CareerFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        career={editingCareer}
      />
    </div>
  );
}
