import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type FieldDef =
  | { key: string; label: string; type: "text" | "textarea"; help?: string }
  | { key: string; label: string; type: "cards"; help?: string }
  | { key: string; label: string; type: "toggle"; help?: string };

export interface PageDef {
  key: string;
  label: string;
  groups: { title: string; fields: FieldDef[] }[];
}

export interface CardItem {
  icon?: string;
  title: string;
  description: string;
}

const cta = (prefix: string, title: string): { title: string; fields: FieldDef[] } => ({
  title,
  fields: [
    { key: `${prefix}_show`, label: "Show this section", type: "toggle" },
    { key: `${prefix}_title`, label: "Heading", type: "text" },
    { key: `${prefix}_text`, label: "Text", type: "textarea" },
    { key: `${prefix}_button_text`, label: "Button text", type: "text" },
    { key: `${prefix}_button_link`, label: "Button link", type: "text", help: "e.g. /contact or https://…" },
  ],
});

export const PAGE_DEFS: PageDef[] = [
  {
    key: "services",
    label: "Services",
    groups: [
      { title: "Empty state", fields: [{ key: "empty_text", label: "Message when no services are published", type: "textarea" }] },
      cta("cta", "Custom solution section"),
      cta("next", "Continue exploring section"),
    ],
  },
  {
    key: "service_detail",
    label: "Service detail pages",
    groups: [
      {
        title: "Section headings",
        fields: [
          { key: "approach_title", label: "Approach heading", type: "text" },
          { key: "benefits_title", label: "Benefits heading", type: "text" },
          { key: "domestic_title", label: "Domestic expertise heading", type: "text" },
          { key: "international_title", label: "International expertise heading", type: "text" },
          { key: "related_title", label: "Related services heading", type: "text", help: "Use {category} to insert the category name" },
          { key: "back_text", label: "Back link text", type: "text" },
        ],
      },
      cta("cta", "Enquiry box"),
    ],
  },
  {
    key: "industries",
    label: "Industries",
    groups: [
      {
        title: "Intro",
        fields: [
          { key: "intro_title", label: "Heading", type: "text" },
          { key: "intro_text", label: "Text", type: "textarea" },
          { key: "services_button_text", label: "Services button text (leave empty to hide)", type: "text" },
          { key: "empty_text", label: "Message when no industries are published", type: "textarea" },
        ],
      },
      cta("cta", "Contact section"),
      cta("next", "Continue exploring section"),
    ],
  },
  {
    key: "industry_detail",
    label: "Industry detail pages",
    groups: [
      {
        title: "Section headings",
        fields: [
          { key: "eyebrow", label: "Small label above title", type: "text" },
          { key: "context_label", label: "Intro label", type: "text" },
          { key: "happening_label", label: "Market signals label", type: "text" },
          { key: "happening_title", label: "Market signals heading", type: "text" },
          { key: "support_label", label: "Our role label", type: "text" },
          { key: "support_title", label: "How we support heading", type: "text" },
          { key: "focus_title", label: "Focus areas heading", type: "text" },
          { key: "services_title", label: "Relevant services heading", type: "text" },
          { key: "others_title", label: "Other industries heading", type: "text" },
          { key: "back_text", label: "Back link text", type: "text" },
        ],
      },
      cta("cta", "Contact section"),
    ],
  },
  {
    key: "careers",
    label: "Careers",
    groups: [
      {
        title: "Why work with us",
        fields: [
          { key: "why_show", label: "Show this section", type: "toggle" },
          { key: "why_title", label: "Heading", type: "text" },
          { key: "why_text", label: "Text", type: "textarea" },
          { key: "why_cards", label: "Cards", type: "cards" },
        ],
      },
      {
        title: "Openings",
        fields: [
          { key: "openings_title", label: "Heading", type: "text" },
          { key: "apply_text", label: "Apply button text", type: "text" },
          { key: "empty_text", label: "Message when there are no openings", type: "textarea" },
          { key: "empty_resume_text", label: "Resume line (email is added after it)", type: "text" },
        ],
      },
      cta("next", "Continue exploring section"),
    ],
  },
];

export const PAGE_DEFAULTS: Record<string, Record<string, any>> = {
  services: {
    empty_text: "Our services are being updated. Please check back soon or contact us.",
    cta_show: true,
    cta_title: "Need a Custom Solution?",
    cta_text: "We understand that every institution has unique needs. Let's discuss how we can create a tailored solution for you.",
    cta_button_text: "Get In Touch",
    cta_button_link: "/contact",
    next_show: true,
    next_title: "See Who We Work With",
    next_text: "Explore the industries and sectors we serve with specialized expertise.",
    next_button_text: "View Industries",
    next_button_link: "/industries",
  },
  service_detail: {
    approach_title: "Our Approach",
    benefits_title: "Key Benefits",
    domestic_title: "Domestic Expertise — India",
    international_title: "International Expertise",
    related_title: "More in {category}",
    back_text: "All Services",
    cta_show: true,
    cta_title: "Interested in this service?",
    cta_text: "Let's discuss how we can help you achieve your goals",
    cta_button_text: "Contact Us",
    cta_button_link: "/contact",
  },
  industries: {
    intro_title: "Sector Expertise",
    intro_text: "Deep industry knowledge combined with strategic consulting excellence",
    services_button_text: "View Our Services",
    empty_text: "Industry information is being updated. Please check back soon.",
    cta_show: true,
    cta_title: "Looking for Industry-Specific Solutions?",
    cta_text: "Our consultants bring deep sector expertise to every engagement",
    cta_button_text: "Contact Us",
    cta_button_link: "/contact",
    next_show: true,
    next_title: "Learn From Our Expertise",
    next_text: "Access thought leadership, case studies, and industry insights.",
    next_button_text: "Read Insights",
    next_button_link: "/insights",
  },
  industry_detail: {
    eyebrow: "Industry",
    context_label: "Context",
    happening_label: "Market Signals",
    happening_title: "What's Happening",
    support_label: "Our Role",
    support_title: "How EduTotal Supports",
    focus_title: "Focus Areas",
    services_title: "Relevant Services",
    others_title: "Other Industries We Serve",
    back_text: "All Industries",
    cta_show: true,
    cta_title: "Work with us in {industry}",
    cta_text: "Let's discuss your specific needs and opportunities.",
    cta_button_text: "Contact Us",
    cta_button_link: "/contact",
  },
  careers: {
    why_show: true,
    why_title: "Why Work With Us?",
    why_text: "Join a team that's passionate about transforming education and building lasting impact",
    why_cards: [
      { icon: "TrendingUp", title: "Growth Opportunities", description: "Continuous learning and professional development with exposure to diverse projects" },
      { icon: "Lightbulb", title: "Impactful Work", description: "Transform education across institutions and shape the future of learning" },
      { icon: "Globe2", title: "Global Exposure", description: "Work with international partners from Europe, USA, and Asia Pacific" },
      { icon: "Users", title: "Collaborative Culture", description: "Join a team of passionate professionals committed to excellence" },
      { icon: "Heart", title: "Work-Life Balance", description: "Flexible work arrangements and a supportive environment" },
      { icon: "Award", title: "Recognition & Rewards", description: "Competitive compensation and performance-based incentives" },
    ],
    openings_title: "Current Openings",
    apply_text: "Apply Now",
    empty_text: "No open positions at the moment. Check back soon!",
    empty_resume_text: "You can still send us your resume at",
    next_show: true,
    next_title: "Ready to Start a Conversation?",
    next_text: "Whether you're interested in a position or our services, we'd love to hear from you.",
    next_button_text: "Contact Us",
    next_button_link: "/contact",
  },
};

/** Merge saved values over defaults; empty strings stay empty (so admins can hide text). */
export function mergeContent(pageKey: string, saved?: Record<string, any> | null) {
  return { ...(PAGE_DEFAULTS[pageKey] || {}), ...(saved || {}) };
}

export function usePageContent(pageKey: string) {
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    let active = true;
    supabase
      .from("page_content")
      .select("content")
      .eq("page_key", pageKey)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data?.content) setContent(data.content as any);
      });
    return () => {
      active = false;
    };
  }, [pageKey]);
  return content;
}

export function isExternal(link?: string) {
  return !!link && /^https?:\/\//i.test(link);
}