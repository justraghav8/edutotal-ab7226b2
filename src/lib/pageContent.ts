import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "cards" | "toggle" | "image";
  help?: string;
  /** cards: hide icon picker when false */
  icons?: boolean;
  /** cards: custom labels for title/description */
  titleLabel?: string;
  descriptionLabel?: string;
};

const show = (key: string, label = "Show this section"): FieldDef => ({ key, label, type: "toggle" });
const t = (key: string, label: string, help?: string): FieldDef => ({ key, label, type: "text", help });
const ta = (key: string, label: string, help?: string): FieldDef => ({ key, label, type: "textarea", help });
const img = (key: string, label: string): FieldDef => ({ key, label, type: "image" });
const LINES = "One item per line";

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
    key: "home",
    label: "Homepage – About EduTotal",
    groups: [
      { title: "About section", fields: [
        show("about_show"),
        t("about_label", "Small label"),
        t("about_title", "Heading"),
        t("about_highlight", "Highlighted word(s) in heading", "Shown in green if it appears in the heading"),
        ta("about_text", "Main paragraph"),
        ta("about_text2", "Second paragraph"),
        t("about_button_text", "Button text (leave empty to hide)"),
        t("about_button_link", "Button link"),
      ] },
      { title: "Statistics", fields: [
        { key: "about_stats", label: "Stat boxes", type: "cards", titleLabel: "Number (e.g. 200+)", descriptionLabel: "Label" },
      ] },
    ],
  },
  {
    key: "about",
    label: "About Us",
    groups: [
      { title: "Tabs", fields: [
        t("mission_tab", "Mission tab label (leave empty to hide tab)"),
        t("motto_tab", "Motto tab label (leave empty to hide tab)"),
        t("values_tab", "Core values tab label (leave empty to hide tab)"),
      ] },
      { title: "Our Mission", fields: [
        t("mission_title", "Heading"),
        t("mission_highlight", "Highlighted word(s)"),
        ta("mission_text", "Text"),
        ta("mission_quote", "Quote (leave empty to hide)"),
      ] },
      { title: "Our Motto", fields: [
        t("motto_title", "Heading"),
        t("motto_highlight", "Highlighted word(s)"),
        img("motto_image", "Image"),
        { key: "motto_steps", label: "Motto points", type: "cards", icons: false },
      ] },
      { title: "Core Values", fields: [
        { key: "values", label: "Values", type: "cards" },
      ] },
      { title: "Foundation Pillars", fields: [
        show("pillars_show"),
        t("pillars_label", "Small label"),
        t("pillars_title", "Heading"),
        { key: "pillars", label: "Pillars", type: "cards" },
        ta("pillars_footer", "Closing line"),
      ] },
      { title: "Our Expertise", fields: [
        show("expertise_show"),
        t("expertise_label", "Small label"),
        t("expertise_title", "Heading"),
        t("domestic_label", "Left panel – small label"),
        t("domestic_title", "Left panel – heading"),
        ta("domestic_text", "Left panel – text"),
        ta("domestic_points", "Left panel – bullet points", LINES),
        img("domestic_image", "Left panel – image"),
        t("international_label", "Right panel – small label"),
        t("international_title", "Right panel – heading"),
        ta("international_text", "Right panel – text"),
        ta("international_points", "Right panel – bullet points", LINES),
        img("international_image", "Right panel – image"),
      ] },
      { title: "Photo gallery", fields: [show("gallery_show", "Show photo albums on this page")] },
      { title: "Our Philosophy", fields: [
        show("philosophy_show"),
        t("philosophy_title", "Heading"),
        ta("philosophy_text", "Text"),
      ] },
      cta("next", "Continue exploring section"),
    ],
  },
  {
    key: "contact",
    label: "Contact Us – Map",
    groups: [
      { title: "Map section", fields: [
        show("map_show", "Show the map section"),
        t("map_label", "Small label"),
        t("map_title", "Heading"),
        ta("map_address", "Address shown and used for the map", "Leave empty to use the address from Site Settings"),
        t("map_embed_url", "Custom map embed link (optional)", "Google Maps → Share → Embed a map → copy the src link. Leave empty to place the pin from the address."),
        t("map_directions_url", "Custom directions link (optional)", "Leave empty to build directions from the address"),
        t("map_button_text", "Directions button text (leave empty to hide)"),
        t("map_link_text", "Secondary link text (leave empty to hide)"),
      ] },
    ],
  },
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
  home: {
    about_show: true,
    about_label: "About EduTotal",
    about_title: "Transforming Education, Empowering Institutions",
    about_highlight: "Empowering",
    about_text: "EduTotal is a premier education consulting firm dedicated to helping institutions achieve excellence. With decades of combined experience, we provide strategic guidance, capacity building, and transformation services that drive measurable outcomes.",
    about_text2: "From regulatory compliance to digital transformation, our holistic approach ensures sustainable growth and lasting impact for educational organizations across India and beyond.",
    about_button_text: "Discover Our Story",
    about_button_link: "/about",
    about_stats: [
      { icon: "GraduationCap", title: "200+", description: "Institutions Served with Partner" },
      { icon: "Award", title: "25+", description: "Years of Excellence" },
      { icon: "Users", title: "50+", description: "Expert Consultants & Partners" },
      { icon: "Globe", title: "15+", description: "Countries Reached" },
    ],
  },
  about: {
    mission_tab: "Our Mission",
    motto_tab: "Our Motto",
    values_tab: "Our Core Values",
    mission_title: "Transforming Education Through Excellence",
    mission_highlight: "Excellence",
    mission_text: "EduTotal was created to provide Quality, Innovative and Internationally benchmarked framework for end-to-end solutions in the Indian Education sector. We take pride in adopting projects that bring quality change and revolution in the education environment.",
    mission_quote: "We are the trustworthy partners to progression for bringing an ethical and sustainable change in the educational environment.",
    motto_title: "Dream Big, Achieve Bigger",
    motto_highlight: "Achieve Bigger",
    motto_image: "",
    motto_steps: [
      { title: "You dream, we create", description: "Turning your vision into reality" },
      { title: "You desire, we build", description: "Constructing the foundations of success" },
      { title: "Sky is the limit", description: "No dream too big for imagination" },
    ],
    values: [
      { icon: "Target", title: "Knowledge Based Guidance", description: "Expert insights driving informed decision-making" },
      { icon: "Heart", title: "Honest Assistance", description: "Transparent support and communication" },
      { icon: "TrendingUp", title: "Prompt Response", description: "Quick and efficient service delivery" },
      { icon: "Globe", title: "Relevant Information", description: "Accurate, timely, and actionable intelligence" },
      { icon: "Users", title: "Proactive Approach", description: "Anticipating needs and delivering comprehensive solutions" },
      { icon: "Award", title: "Excellence", description: "Commitment to the highest standards" },
    ],
    pillars_show: true,
    pillars_label: "What We Stand For",
    pillars_title: "Foundation Pillars",
    pillars: [
      { icon: "Gem", title: "Value", description: "Delivering measurable impact and sustainable worth" },
      { icon: "Flame", title: "Passion", description: "Unwavering commitment to educational excellence" },
      { icon: "Shield", title: "Integrity", description: "Ethical practices and transparency in every engagement" },
      { icon: "Globe2", title: "Global", description: "International standards and worldwide perspective" },
      { icon: "Handshake", title: "Relationship", description: "Building lasting, meaningful partnerships" },
      { icon: "Sparkles", title: "Diversity", description: "Embracing varied approaches and inclusive solutions" },
    ],
    pillars_footer: "These pillars guide every decision we make and every partnership we build.",
    expertise_show: true,
    expertise_label: "What We Do Best",
    expertise_title: "Our Expertise",
    domestic_label: "India Focus",
    domestic_title: "Domestic Services",
    domestic_text: "For schools, Colleges, Universities that want to explore new geography within the country, we provide in-depth due diligence and realistic risk mapping.",
    domestic_points: "Multi-disciplinary learning frameworks\nApplied Skill & Vocational training\nSustainable institutional models",
    domestic_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    international_label: "Global Reach",
    international_title: "International Services",
    international_text: "We partner with finest schools around the world to help them expand in unknown territories with confidence and strategic clarity.",
    international_points: "Cross-border educational partnerships\nCreative sciences & technical areas\nManagement & leadership development",
    international_image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    gallery_show: true,
    philosophy_show: true,
    philosophy_title: "Our Philosophy",
    philosophy_text: "Learning by Doing is vital for student development. We help institutes in building strong relationships with corporates. Corporate culture exposure grooms students for future career challenges and makes them ready for corporate world.",
    next_show: true,
    next_title: "Meet the Team Behind EduTotal",
    next_text: "Get to know the leaders, advisors, and clients who make our vision a reality.",
    next_button_text: "Who We Are",
    next_button_link: "/who-we-are",
  },
  contact: {
    map_show: true,
    map_label: "New Delhi Office",
    map_title: "Find Us",
    map_address: "",
    map_embed_url: "",
    map_directions_url: "",
    map_button_text: "Click for Directions",
    map_link_text: "Open location in Google Maps",
  },
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

/** Render a heading with an optional highlighted phrase. Returns [before, highlight, after]. */
export function splitHighlight(title = "", highlight = ""): [string, string, string] {
  const i = highlight ? title.indexOf(highlight) : -1;
  return i < 0 ? [title, "", ""] : [title.slice(0, i), highlight, title.slice(i + highlight.length)];
}

export function isExternal(link?: string) {
  return !!link && /^https?:\/\//i.test(link);
}