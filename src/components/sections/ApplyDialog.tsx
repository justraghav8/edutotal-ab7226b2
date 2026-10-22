import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(200),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(50).optional(),
  resume_url: z.string().trim().max(1000).refine((v) => !v || /^https?:\/\//i.test(v), "Link must start with http:// or https://").optional(),
  cover_letter: z.string().trim().max(5000).optional(),
});

interface Props {
  job: { id: string; job_title: string } | null;
  onClose: () => void;
  contactEmail: string;
}

export function ApplyDialog({ job, onClose, contactEmail }: Props) {
  const { toast } = useToast();
  const empty = { name: "", email: "", phone: "", resume_url: "", cover_letter: "" };
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const close = () => { setForm(empty); setDone(false); onClose(); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast({ title: parsed.error.issues[0].message, variant: "destructive" });
    setSending(true);
    const v = parsed.data;
    const { error } = await supabase.from("job_applications").insert({
      career_id: job.id, job_title: job.job_title, name: v.name, email: v.email,
      phone: v.phone || null, resume_url: v.resume_url || null, cover_letter: v.cover_letter || null,
    });
    setSending(false);
    if (error) return toast({ title: "Could not send application", description: `Please try again or email ${contactEmail}.`, variant: "destructive" });
    setDone(true);
  };

  return (
    <Dialog open={!!job} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="h-12 w-12 text-accent mx-auto" />
            <h3 className="text-2xl font-serif">Application received</h3>
            <p className="text-muted-foreground">Thank you for applying for {job?.job_title}. Our team will review your details and get back to you.</p>
            <Button onClick={close}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Apply for {job?.job_title}</DialogTitle>
              <DialogDescription>Share your details and our team will be in touch.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="ap-name">Full name *</Label><Input id="ap-name" required maxLength={200} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="ap-email">Email *</Label><Input id="ap-email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="ap-phone">Phone</Label><Input id="ap-phone" maxLength={50} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="ap-cv">Resume / CV link</Label><Input id="ap-cv" placeholder="Google Drive, Dropbox or LinkedIn link" maxLength={1000} value={form.resume_url} onChange={(e) => setForm({ ...form, resume_url: e.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="ap-cover">Why are you a good fit?</Label><Textarea id="ap-cover" rows={5} maxLength={5000} value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} /></div>
              <Button type="submit" className="w-full" size="lg" disabled={sending}>{sending ? "Sending…" : "Submit Application"}</Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
