import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InsightFormDialog } from "@/components/admin/InsightFormDialog";

export default function InsightsAdmin() {
  const { toast } = useToast();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const { data, error } = await supabase
        .from("insights")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInsights(data || []);
    } catch (error) {
      console.error("Error loading insights:", error);
      toast({
        title: "Error",
        description: "Failed to load insights",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this insight?")) return;

    try {
      const { error } = await supabase.from("insights").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Insight deleted successfully",
      });
      loadInsights();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete insight",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (insight: any) => {
    setEditingInsight(insight);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingInsight(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (success?: boolean) => {
    setDialogOpen(false);
    setEditingInsight(null);
    if (success) {
      loadInsights();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Insights</h1>
          <p className="text-muted-foreground">Manage articles and publications</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Insight
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insights.map((insight: any) => (
              <TableRow key={insight.id}>
                <TableCell className="font-medium">{insight.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{insight.type}</Badge>
                </TableCell>
                <TableCell>{insight.author || "—"}</TableCell>
                <TableCell>
                  <Badge variant={insight.published ? "default" : "secondary"}>
                    {insight.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(insight)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(insight.id)}
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

      <InsightFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        insight={editingInsight}
      />
    </div>
  );
}
