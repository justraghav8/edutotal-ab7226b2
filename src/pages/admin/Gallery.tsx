import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  order_index: number;
  published: boolean;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    image_url: "",
    published: true,
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error loading images:", error);
      toast.error("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (image?: GalleryImage) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        title: image.title,
        caption: image.caption || "",
        image_url: image.image_url,
        published: image.published,
      });
    } else {
      setEditingImage(null);
      setFormData({
        title: "",
        caption: "",
        image_url: "",
        published: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingImage) {
        const { error } = await supabase
          .from("gallery_images")
          .update({
            title: formData.title,
            caption: formData.caption || null,
            image_url: formData.image_url,
            published: formData.published,
          })
          .eq("id", editingImage.id);

        if (error) throw error;
        toast.success("Image updated successfully");
      } else {
        const maxOrder = images.length > 0 
          ? Math.max(...images.map(i => i.order_index)) + 1 
          : 0;
        
        const { error } = await supabase
          .from("gallery_images")
          .insert({
            title: formData.title,
            caption: formData.caption || null,
            image_url: formData.image_url,
            published: formData.published,
            order_index: maxOrder,
          });

        if (error) throw error;
        toast.success("Image added successfully");
      }

      setDialogOpen(false);
      loadImages();
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to save image");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Image deleted successfully");
      loadImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from("gallery_images")
        .update({ published })
        .eq("id", id);

      if (error) throw error;
      loadImages();
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Manage About page image gallery</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? "Edit Image" : "Add New Image"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  required
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg mt-2"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingImage ? "Update" : "Add"} Image
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {images.length === 0 ? (
        <Card className="p-12 text-center">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No gallery images yet</h3>
          <p className="text-muted-foreground mb-4">
            Add images to display in the About page gallery
          </p>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Image
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => openDialog(image)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {!image.published && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Draft
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{image.title}</h3>
                    {image.caption && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {image.caption}
                      </p>
                    )}
                  </div>
                  <Switch
                    checked={image.published}
                    onCheckedChange={(checked) => togglePublished(image.id, checked)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
