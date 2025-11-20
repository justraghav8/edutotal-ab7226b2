import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ServiceFormDialog } from "@/components/admin/ServiceFormDialog";

export default function ServicesAdmin() {
  const { toast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error loading services:", error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      loadServices();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setDialogOpen(true);
  };

  const handleDialogClose = (success?: boolean) => {
    setDialogOpen(false);
    setEditingService(null);
    if (success) {
      loadServices();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage consulting services</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service: any) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>
                  <Badge variant={service.published ? "default" : "secondary"}>
                    {service.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(service.id)}
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

      <ServiceFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        service={editingService}
      />
    </div>
  );
}

