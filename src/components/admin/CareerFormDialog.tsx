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
  job_title: z.string().min(1, "Job title is required").max(200),
  description: z.string().min(1, "Description is required"),
  apply_email: z.string().email("Valid email is required"),
  location: z.string().optional(),
  published: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface CareerFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  career?: any;
}

export function CareerFormDialog({
  open,
  onClose,
  career,
}: CareerFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: "",
      description: "",
      apply_email: "",
      location: "",
      published: true,
    },
  });

  useEffect(() => {
    if (career) {
      form.reset({
        job_title: career.job_title || "",
        description: career.description || "",
        apply_email: career.apply_email || "",
        location: career.location || "",
        published: career.published ?? true,
      });
    } else {
      form.reset({
        job_title: "",
        description: "",
        apply_email: "",
        location: "",
        published: true,
      });
    }
  }, [career, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: any = {
        job_title: data.job_title,
        description: data.description,
        apply_email: data.apply_email,
        location: data.location || null,
        published: data.published,
      };

      if (career) {
        const { error } = await supabase
          .from("careers")
          .update(submitData)
          .eq("id", career.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Career opening updated successfully",
        });
      } else {
        const { error } = await supabase.from("careers").insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Career opening created successfully",
        });
      }

      onClose(true);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${career ? "update" : "create"} career opening`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {career ? "Edit Career Opening" : "Add Career Opening"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} rows={8} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Remote, New York, NY" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apply_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="careers@example.com" />
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
                {career ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
