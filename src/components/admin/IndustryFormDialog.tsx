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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  tagline: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  icon_key: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  content_box: z.string().optional(),
  whats_happening: z.string().optional(),
  how_we_support: z.string().optional(),
  published: z.boolean().default(true),
  order_index: z.number().default(0),
});

type FormData = z.infer<typeof formSchema>;

interface IndustryFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  industry?: any;
}

function arrayToLines(v: any): string {
  if (!v) return "";
  if (Array.isArray(v)) return v.join("\n");
  try {
    const parsed = JSON.parse(v);
    if (Array.isArray(parsed)) return parsed.join("\n");
  } catch {}
  return String(v);
}

function linesToArray(v?: string): string[] {
  if (!v) return [];
  return v
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function IndustryFormDialog({
  open,
  onClose,
  industry,
}: IndustryFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      tagline: "",
      description: "",
      icon_key: "",
      image_url: "",
      content_box: "",
      whats_happening: "",
      how_we_support: "",
      published: true,
      order_index: 0,
    },
  });

  useEffect(() => {
    if (industry) {
      form.reset({
        title: industry.title || "",
        slug: industry.slug || "",
        tagline: industry.tagline || "",
        description: industry.description || "",
        icon_key: industry.icon_key || "",
        image_url: industry.image_url || "",
        content_box: industry.content_box || "",
        whats_happening: arrayToLines(industry.whats_happening),
        how_we_support: industry.how_we_support || "",
        published: industry.published ?? true,
        order_index: industry.order_index || 0,
      });
    } else {
      form.reset({
        title: "",
        slug: "",
        tagline: "",
        description: "",
        icon_key: "",
        image_url: "",
        content_box: "",
        whats_happening: "",
        how_we_support: "",
        published: true,
        order_index: 0,
      });
    }
  }, [industry, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: any = {
        title: data.title,
        slug: data.slug,
        tagline: data.tagline || null,
        description: data.description,
        icon_key: data.icon_key || null,
        image_url: data.image_url || null,
        content_box: data.content_box || null,
        whats_happening: linesToArray(data.whats_happening),
        how_we_support: data.how_we_support || null,
        published: data.published,
        order_index: data.order_index,
      };

      if (industry) {
        const { error } = await supabase
          .from("industries")
          .update(submitData)
          .eq("id", industry.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Industry updated successfully",
        });
      } else {
        const { error } = await supabase.from("industries").insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Industry created successfully",
        });
      }

      onClose(true);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${industry ? "update" : "create"} industry`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {industry ? "Edit Industry" : "Add Industry"}
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
                    <Input {...field} placeholder="e.g., higher-education" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Short italic subhead under the title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description / Intro</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormDescription>
                    Shown on the listing card and as the intro on the detail page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whats_happening"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's Happening (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={8}
                      placeholder="One stat or insight per line"
                    />
                  </FormControl>
                  <FormDescription>
                    Add one bullet per line. Each line renders as a separate stat card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="how_we_support"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How EduTotal Supports (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content_box"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Content Box (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Optional extra long-form content"
                    />
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
                    <Input {...field} placeholder="e.g., graduation-cap" />
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
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
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
              <Button type="submit">
                {industry ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
