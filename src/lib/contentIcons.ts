import { Target, Heart, TrendingUp, Globe, Globe2, Users, Award, Gem, Flame, Shield, Handshake, Sparkles, Lightbulb, GraduationCap, BookOpen, Building2, Star, CheckCircle2 } from "lucide-react";

export const CONTENT_ICONS: Record<string, any> = {
  Target, Heart, TrendingUp, Globe, Globe2, Users, Award, Gem, Flame, Shield, Handshake, Sparkles, Lightbulb, GraduationCap, BookOpen, Building2, Star, CheckCircle2,
};

export const iconFor = (name?: string, fallback: any = Award) => (name && CONTENT_ICONS[name]) || fallback;

/** Split a multi-line text value into trimmed, non-empty lines. */
export const lines = (value?: string) => (value || "").split("\n").map((l) => l.trim()).filter(Boolean);

/** "200+" -> { value: 200, suffix: "+" }; non-numeric values return null value. */
export function parseStat(raw?: string) {
  const m = (raw || "").trim().match(/^(\d+)(.*)$/);
  return m ? { value: Number(m[1]), suffix: m[2] } : { value: null as number | null, suffix: raw || "" };
}
