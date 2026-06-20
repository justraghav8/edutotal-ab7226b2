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
  author: z.string().min(1, "Author name is required").max(100),
  quote: z.string().min(1, "Quote is required").max(1000),
  role: z.string().optional(),
  organization: z.string().optional(),
  photo_url: z.string().url().optional().or(z.literal("")),
  logo_url: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface TestimonialFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  testimonial?: any;
}

export function TestimonialFormDialog({
  open,
  onClose,
  testimonial,
}: TestimonialFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      quote: "",
      role: "",
      organization: "",
      photo_url: "",
      logo_url: "",
      published: true,
    },
  });

  useEffect(() => {
    if (testimonial) {
      form.reset({
        author: testimonial.author || "",
        quote: testimonial.quote || "",
        role: testimonial.role || "",
        organization: testimonial.organization || "",
        photo_url: testimonial.photo_url || "",
        logo_url: testimonial.logo_url || "",
        published: testimonial.published ?? true,
      });
    } else {
      form.reset({
        author: "",
        quote: "",
        role: "",
        organization: "",
        photo_url: "",
        logo_url: "",
        published: true,
      });
    }
  }, [testimonial, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: any = {
        author: data.author,
        quote: data.quote,
        role: data.role || null,
        organization: data.organization || null,
        photo_url: data.photo_url || null,
        logo_url: data.logo_url || null,
        published: data.published,
      };

      if (testimonial) {
        const { error } = await supabase
          .from("testimonials")
          .update(submitData)
          .eq("id", testimonial.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
      } else {
        const { error } = await supabase.from("testimonials").insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
      }

      onClose(true);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${testimonial ? "update" : "create"} testimonial`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., CEO" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
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
                {testimonial ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
