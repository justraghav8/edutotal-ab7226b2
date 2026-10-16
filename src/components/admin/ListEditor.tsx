import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

interface ListEditorProps {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

export function ListEditor({ value, onChange, placeholder, addLabel = "Add item" }: ListEditorProps) {
  const items = value || [];
  const set = (i: number, v: string) => onChange(items.map((x, idx) => (idx === i ? v : x)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground border border-dashed rounded-md p-3">
          Nothing added yet. This section is hidden on the website while empty.
        </p>
      )}
      {items.map((item, i) => (
        <div key={i} className="flex gap-1.5 items-center">
          <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}</span>
          <Input value={item} placeholder={placeholder} onChange={(e) => set(i, e.target.value)} />
          <Button type="button" variant="ghost" size="icon" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down">
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(items.filter((_, idx) => idx !== i))} aria-label="Remove">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
        <Plus className="h-4 w-4 mr-1" /> {addLabel}
      </Button>
    </div>
  );
}

export const cleanList = (v?: string[]) => (v || []).map((s) => s.trim()).filter(Boolean);

export function toList(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String);
  try {
    const p = JSON.parse(v);
    if (Array.isArray(p)) return p.map(String);
  } catch {
    /* not json */
  }
  return String(v).split("\n").filter(Boolean);
}