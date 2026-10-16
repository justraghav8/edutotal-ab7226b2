export const cleanList = (v?: string[]) => (v || []).map((s) => s.trim()).filter(Boolean);

export function toList(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String);
  try {
    const p = JSON.parse(String(v));
    if (Array.isArray(p)) return p.map(String);
  } catch {
    /* not json */
  }
  return String(v).split("\n").filter(Boolean);
}

export function hasContentList(value: unknown) {
  return cleanList(toList(value)).length > 0;
}