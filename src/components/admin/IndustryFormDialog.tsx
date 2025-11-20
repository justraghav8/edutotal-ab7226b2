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
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  description: z.string().min(1, "Description is required"),
  icon_key: z.string().optional(),
  published: z.boolean().default(true),
  order_index: z.number().default(0),
});

type FormData = z.infer<typeof formSchema>;

interface IndustryFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  industry?: any;
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
      description: "",
      icon_key: "",
      published: true,
      order_index: 0,
    },
  });

  useEffect(() => {
    if (industry) {
      form.reset({
        title: industry.title || "",
        slug: industry.slug || "",
        description: industry.description || "",
        icon_key: industry.icon_key || "",
        published: industry.published ?? true,
        order_index: industry.order_index || 0,
      });
    } else {
      form.reset({
        title: "",
        slug: "",
        description: "",
        icon_key: "",
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
        description: data.description,
        icon_key: data.icon_key || null,
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
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
