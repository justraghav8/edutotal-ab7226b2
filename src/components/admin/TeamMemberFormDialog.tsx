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
  name: z.string().min(1, "Name is required").max(100),
  designation: z.string().min(1, "Designation is required").max(200),
  biography: z.string().min(1, "Biography is required"),
  category: z.string().min(1, "Category is required"),
  photo_url: z.string().url().optional().or(z.literal("")),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  show_linkedin: z.boolean().default(true),
  show_email: z.boolean().default(true),
  published: z.boolean().default(true),
  order_index: z.number().default(0),
});

type FormData = z.infer<typeof formSchema>;

interface TeamMemberFormDialogProps {
  open: boolean;
  onClose: (success?: boolean) => void;
  member?: any;
}

export function TeamMemberFormDialog({
  open,
  onClose,
  member,
}: TeamMemberFormDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      designation: "",
      biography: "",
      category: "",
      photo_url: "",
      linkedin_url: "",
      email: "",
      show_linkedin: true,
      show_email: true,
      published: true,
      order_index: 0,
    },
  });

  useEffect(() => {
    if (member) {
      form.reset({
        name: member.name || "",
        designation: member.designation || "",
        biography: member.biography || "",
        category: member.category || "",
        photo_url: member.photo_url || "",
        linkedin_url: member.linkedin_url || "",
        email: member.email || "",
        show_linkedin: member.show_linkedin ?? true,
        show_email: member.show_email ?? true,
        published: member.published ?? true,
        order_index: member.order_index || 0,
      });
    } else {
      form.reset({
        name: "",
        designation: "",
        biography: "",
        category: "",
        photo_url: "",
        linkedin_url: "",
        email: "",
        show_linkedin: true,
        show_email: true,
        published: true,
        order_index: 0,
      });
    }
  }, [member, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const submitData: any = {
        name: data.name,
        designation: data.designation,
        biography: data.biography,
        category: data.category,
        photo_url: data.photo_url || null,
        linkedin_url: data.linkedin_url || null,
        email: data.email || null,
        show_linkedin: data.show_linkedin,
        show_email: data.show_email,
        published: data.published,
        order_index: data.order_index,
      };

      if (member) {
        const { error } = await supabase
          .from("team_members")
          .update(submitData)
          .eq("id", member.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      } else {
        const { error } = await supabase.from("team_members").insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Team member created successfully",
        });
      }

      onClose(true);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${member ? "update" : "create"} team member`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {member ? "Edit Team Member" : "Add Team Member"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Managing Director" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Constants.public.Enums.team_category.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
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
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={8} />
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
                    <Input {...field} type="url" placeholder="https://..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" placeholder="https://linkedin.com/in/..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="show_linkedin"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel className="text-sm">Show LinkedIn icon</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="show_email"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel className="text-sm">Show Email icon</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="name@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                {member ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}