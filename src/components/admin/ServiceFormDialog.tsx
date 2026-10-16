import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ListEditor, cleanList, toList } from "@/components/admin/ListEditor";
import { ImageField } from "@/components/admin/ImageField";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  category_id: z.string().min(1, "Category is required"),
  overview: z.string(),
  image_url: z.string().optional(),
  domestic_expertise: z.string().optional(),
  international_expertise: z.string().optional(),
  icon_key: z.string().optional(),
  approach: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  order_index: z.number().default(0),
});

type FormData = z.infer<typeof formSchema>;

interface ServiceFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  service?: any;
  defaultCategoryId?: string;
}

export function ServiceFormDialog({
  open,
  onClose,
  service,
  defaultCategoryId,
}: ServiceFormDialogProps) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<{id: string; display_name: string; published: boolean}[]>([]);
  useEffect(() => {
    if (open) supabase.from("service_categories").select("id, display_name, published").order("order_index").then(({data, error}) => {
      if (error) toast({title: "Could not load categories", description: error.message, variant: "destructive"});
      setCategories(data || []);
    });
  }, [open, toast]);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      category_id: defaultCategoryId || "",
      overview: "",
      image_url: "",
      domestic_expertise: "",
      international_expertise: "",
      icon_key: "",
      approach: [],
      benefits: [],
      published: true,
      order_index: 0,
    },
  });

  useEffect(() => {
    if (service) {
      form.reset({
        title: service.title || "",
        slug: service.slug || "",
        category_id: service.category_id || "",
        overview: service.overview || "",
        image_url: service.image_url || "",
        domestic_expertise: service.domestic_expertise || "",
        international_expertise: service.international_expertise || "",
        icon_key: service.icon_key || "",
        approach: toList(service.approach),
        benefits: toList(service.benefits),
        published: service.published ?? true,
        order_index: service.order_index || 0,
      });
    } else {
      form.reset({
        title: "",
        slug: "",
        category_id: defaultCategoryId || "",
        overview: "",
        image_url: "",
        domestic_expertise: "",
        international_expertise: "",
        icon_key: "",
        approach: [],
        benefits: [],
        published: true,
        order_index: 0,
      });
    }
  }, [service, form, defaultCategoryId, open]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: any = {
        title: data.title,
        slug: data.slug,
        category_id: data.category_id,
        overview: data.overview,
        image_url: data.image_url || null,
        domestic_expertise: data.domestic_expertise || null,
        international_expertise: data.international_expertise || null,
        icon_key: data.icon_key || null,
        approach: cleanList(data.approach),
        benefits: cleanList(data.benefits),
        published: data.published,
        order_index: data.order_index,
      };

      if (service) {
        const { error } = await supabase
          .from("services")
          .update(submitData)
          .eq("id", service.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Service updated successfully",
        });
      } else {
        const { error } = await supabase.from("services").insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Service created successfully",
        });
      }

      onClose(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.code === "23505" ? "That slug is already used by another service." : `Failed to ${service ? "update" : "create"} service`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Add Service"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (!service && !form.getFieldState("slug").isDirty) {
                          form.setValue("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., strategic-planning" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.display_name}{cat.published ? "" : " (Hidden)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {categories.length === 0 && <p className="text-sm text-muted-foreground">Add a service category first in Service Categories.</p>}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image (Optional)</FormLabel>
                  <FormControl>
                    <ImageField value={field.value} onChange={field.onChange} folder="services" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="approach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Our Approach points</FormLabel>
                  <ListEditor value={field.value} onChange={field.onChange} addLabel="Add approach point" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Benefits</FormLabel>
                  <ListEditor value={field.value} onChange={field.onChange} addLabel="Add benefit" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domestic_expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domestic Expertise (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="international_expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>International Expertise (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Key (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., briefcase" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order_index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Index</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {service ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
