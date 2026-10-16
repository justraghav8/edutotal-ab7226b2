import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageFieldProps {
  value?: string;
  onChange: (v: string) => void;
  folder: string;
}

export function ImageField({ value, onChange, folder }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const upload = async (file: File) => {
    setUploading(true);
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      onChange(supabase.storage.from("images").getPublicUrl(path).data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Paste an image link or upload" />
        <Button type="button" variant="outline" asChild disabled={uploading}>
          <label className="cursor-pointer whitespace-nowrap">
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading…" : "Upload"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </label>
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} aria-label="Remove image">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {value && <img src={value} alt="Preview" className="h-28 rounded-md border object-cover" />}
    </div>
  );
}