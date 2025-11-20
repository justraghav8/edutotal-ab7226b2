import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ClientFormDialog } from "@/components/admin/ClientFormDialog";

export default function Clients() {
  const { toast } = useToast();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error loading clients:", error);
      toast({
        title: "Error",
        description: "Failed to load clients",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      const { error } = await supabase.from("clients").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Client deleted successfully",
      });
      loadClients();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete client",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (client: any) => {
    setEditingClient(client);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingClient(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (success?: boolean) => {
    setDialogOpen(false);
    setEditingClient(null);
    if (success) {
      loadClients();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage client logos</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client: any) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.website || "—"}</TableCell>
                <TableCell>
                  <Badge variant={client.published ? "default" : "secondary"}>
                    {client.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(client)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(client.id)}
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

      <ClientFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        client={editingClient}
      />
    </div>
  );
}
