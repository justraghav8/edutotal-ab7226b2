import { useEffect } from "react";
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
import { Constants } from "@/integrations/supabase/types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  slug: z.string().min(1, "Slug is required").max(300),
  type: z.string().min(1, "Type is required"),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  body: z.string().min(1, "Body is required"),
  author: z.string().optional(),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface InsightFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  insight?: any;
}

export function InsightFormDialog({
  open,
  onClose,
  insight,
}: InsightFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      type: "",
      excerpt: "",
      body: "",
      author: "",
      cover_image_url: "",
      featured: false,
      published: true,
    },
  });

  useEffect(() => {
    if (insight) {
      form.reset({
        title: insight.title || "",
        slug: insight.slug || "",
        type: insight.type || "",
        excerpt: insight.excerpt || "",
        body: insight.body || "",
        author: insight.author || "",
        cover_image_url: insight.cover_image_url || "",
        featured: insight.featured ?? false,
        published: insight.published ?? true,
      });
    } else {
      form.reset({
        title: "",
        slug: "",
        type: "",
        excerpt: "",
        body: "",
        author: "",
        cover_image_url: "",
        featured: false,
        published: true,
      });
    }
  }, [insight, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: any = {
        title: data.title,
        slug: data.slug,
        type: data.type,
        excerpt: data.excerpt,
        body: data.body,
        author: data.author || null,
        cover_image_url: data.cover_image_url || null,
        featured: data.featured,
        published: data.published,
      };

      if (insight) {
        const { error } = await supabase
          .from("insights")
          .update(submitData)
          .eq("id", insight.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Insight updated successfully",
        });
      } else {
        const { error } = await supabase.from("insights").insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Insight created successfully",
        });
      }

      onClose(true);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${insight ? "update" : "create"} insight`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {insight ? "Edit Insight" : "Add Insight"}
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
                    <Input {...field} />
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
                    <Input {...field} placeholder="e.g., digital-transformation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Constants.public.Enums.insight_type.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured</FormLabel>
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
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button type="submit">
                {insight ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
