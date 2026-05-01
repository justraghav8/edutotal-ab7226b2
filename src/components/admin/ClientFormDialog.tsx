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
  name: z.string().min(1, "Name is required").max(200),
  website: z.string().url().optional().or(z.literal("")),
  logo_url: z.string().url().optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal("")),
  published: z.boolean().default(true),
  order_index: z.number().default(0),
});

type FormData = z.infer<typeof formSchema>;

interface ClientFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  client?: any;
}

export function ClientFormDialog({
  open,
  onClose,
  client,
}: ClientFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      website: "",
      logo_url: "",
      description: "",
      published: true,
      order_index: 0,
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        name: client.name || "",
        website: client.website || "",
        logo_url: client.logo_url || "",
        description: client.description || "",
        published: client.published ?? true,
        order_index: client.order_index || 0,
      });
    } else {
      form.reset({
        name: "",
        website: "",
        logo_url: "",
        description: "",
        published: true,
        order_index: 0,
      });
    }
  }, [client, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: any = {
        name: data.name,
        website: data.website || null,
        logo_url: data.logo_url || null,
        description: data.description || null,
        published: data.published,
        order_index: data.order_index,
      };

      if (client) {
        const { error } = await supabase
          .from("clients")
          .update(submitData)
          .eq("id", client.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Client updated successfully",
        });
      } else {
        const { error } = await supabase.from("clients").insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Client created successfully",
        });
      }

      onClose(true);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${client ? "update" : "create"} client`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {client ? "Edit Client" : "Add Client"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
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
                  <FormLabel>Description (3-4 lines, shown on hover)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} placeholder="Brief description of work done with this client" />
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
                {client ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
