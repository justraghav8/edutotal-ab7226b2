import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { Quote } from "lucide-react";
import { usePageContent, mergeContent, splitHighlight } from "@/lib/pageContent";
import { iconFor, lines } from "@/lib/contentIcons";
import { ContentCTA } from "@/components/sections/ContentCTA";
import { motion, AnimatePresence } from "framer-motion";
import missionImage2 from "@/assets/about-mission-2.jpg";

type C = Record<string, any>;
const hasText = (c: any) => c?.title?.trim() || c?.description?.trim();

function Heading({ title, highlight }: { title: string; highlight?: string }) {
  const [a, h, b] = splitHighlight(title, highlight);
  return <>{a}{h && <span className="text-accent">{h}</span>}{b}</>;
}

type TabId = "mission" | "motto" | "values";

function MissionContent({ c }: { c: C }) {
  return (
    <motion.div
      key="mission"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto text-center"
    >
      <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
        <Heading title={c.mission_title} highlight={c.mission_highlight} />
      </h2>
      {c.mission_text && <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto whitespace-pre-line">
        {c.mission_text}
      </p>}
      {c.mission_quote && <div className="relative inline-block text-left pl-6 border-l-4 border-accent max-w-2xl">
        <Quote className="absolute -left-4 -top-2 w-8 h-8 text-accent/20" />
        <p className="text-xl font-serif italic text-foreground/80">
          "{c.mission_quote}"
        </p>
      </div>}
    </motion.div>
  );
}

function MottoContent({ c }: { c: C }) {
  const steps = (Array.isArray(c.motto_steps) ? c.motto_steps : []).filter(hasText);
  const image = c.motto_image || missionImage2;
  return (
    <motion.div
      key="motto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto"
    >
      <div className="relative">
        <img 
          src={image} 
          alt={c.motto_title || "Our motto"} 
          className="w-full h-auto rounded-sm shadow-large"
        />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-sm -z-10" />
        <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-accent/20 rounded-sm -z-10" />
      </div>

      <div>
        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
          <Heading title={c.motto_title} highlight={c.motto_highlight} />
        </h2>
        <div className="space-y-6">
          {steps.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-accent font-serif text-xl">{i + 1}</span>
              </div>
              <div>
                <p className="text-xl font-serif text-foreground">{item.title}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CoreValuesContent({ values }: { values: any[] }) {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <motion.div
      key="values"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Interactive hexagonal / bento layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Value selector list */}
        <div className="lg:col-span-4 space-y-2">
          {values.map((value, index) => {
            const Icon = iconFor(value.icon);
            const isActive = activeValue === index;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveValue(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`w-full text-left p-5 rounded-sm transition-all duration-300 flex items-center gap-4 group ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-large"
                    : "bg-card hover:bg-muted border border-border"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  isActive ? "bg-accent-foreground/20" : "bg-accent/10"
                }`}>
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? "text-accent-foreground" : "text-accent"
                  }`} />
                </div>
                <span className={`font-medium text-base transition-colors duration-300 ${
                  isActive ? "text-accent-foreground" : "text-foreground"
                }`}>
                  {value.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Active value detail */}
        <div className="lg:col-span-8 relative">
          <AnimatePresence mode="wait">
            {values.map((value, index) => {
              if (index !== activeValue) return null;
              const Icon = iconFor(value.icon);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card border border-border rounded-sm p-10 lg:p-16 min-h-[400px] flex flex-col justify-center relative overflow-hidden"
                >
                  {/* Large background number */}
                  <span className="absolute top-6 right-8 text-[12rem] font-serif text-foreground/[0.03] leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-8"
                    >
                      <Icon className="w-10 h-10 text-accent" />
                    </motion.div>

                    <h3 className="text-3xl lg:text-4xl font-serif mb-4 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                      {value.description}
                    </p>

                    {/* Accent bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 60 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-1 bg-accent mt-8 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const c = mergeContent("about", usePageContent("about"));
  const values = (Array.isArray(c.values) ? c.values : []).filter(hasText);
  const pillars = (Array.isArray(c.pillars) ? c.pillars : []).filter(hasText);
  const tabs = ([
    { id: "mission", label: c.mission_tab },
    { id: "motto", label: c.motto_tab },
    { id: "values", label: values.length ? c.values_tab : "" },
  ] as { id: TabId; label: string }[]).filter((t) => t.label?.trim());
  const [selectedTab, setActiveTab] = useState<TabId>("mission");
  const activeTab = tabs.some((t) => t.id === selectedTab) ? selectedTab : tabs[0]?.id;
  const panels = [
    { key: "domestic", dot: "bg-accent" },
    { key: "international", dot: "bg-white" },
  ].filter((p) => c[`${p.key}_title`] || c[`${p.key}_text`]);

  return (
    <>
      <HeroSection
        title="About EduTotal"
        subtitle="Your trusted partner in educational transformation"
        minimal
        pageKey="about"
      />

      {/* Tabbed Section: Mission / Motto / Core Values */}
      {tabs.length > 0 && <section className="pt-16 pb-24 lg:pt-20 lg:pb-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }} className="grid w-full min-w-0 sm:inline-flex sm:w-auto border border-border rounded-sm overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative min-w-0 px-2 sm:px-8 py-4 text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.2em] font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "mission" && <MissionContent c={c} />}
            {activeTab === "motto" && <MottoContent c={c} />}
            {activeTab === "values" && <CoreValuesContent values={values} />}
          </AnimatePresence>
        </div>
      </section>}

      {/* Foundation Pillars - Impressive Design */}
      {c.pillars_show !== false && pillars.length > 0 && <section className="py-32 bg-background overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              {c.pillars_label}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground">{c.pillars_title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 max-w-6xl mx-auto border border-border">
            {pillars.map((pillar: any, index: number) => { const PillarIcon = iconFor(pillar.icon); return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-10 lg:p-12 border-b border-r border-border last:border-r-0 md:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(3)]:border-r-0 lg:[&:nth-child(4)]:border-b-0 lg:[&:nth-child(5)]:border-b-0 lg:[&:nth-child(6)]:border-b-0 md:[&:nth-child(5)]:border-b-0 md:[&:nth-child(6)]:border-b-0"
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
                <span className="absolute top-6 right-8 text-7xl lg:text-8xl font-serif text-foreground/5 group-hover:text-accent/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                    <PillarIcon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                  </div>
                </motion.div>
                <div className="relative">
                  <h3 className="text-3xl lg:text-4xl font-serif mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {pillar.description}
                  </p>
                </div>
                <motion.div 
                  className="absolute bottom-0 left-10 h-0.5 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                />
              </motion.div>
            ); })}
          </div>

          {c.pillars_footer && <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-xl font-serif text-muted-foreground mt-20 max-w-2xl mx-auto"
          >
            {c.pillars_footer}
          </motion.p>}
        </div>
      </section>}

      {/* Expertise Areas - Full Width Image Cards */}
      {c.expertise_show !== false && panels.length > 0 && <section className="py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-20 bg-background"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block">{c.expertise_label}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">{c.expertise_title}</h2>
        </motion.div>

        <div className={`grid grid-cols-1 ${panels.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {panels.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group min-h-[500px] lg:min-h-[600px] overflow-hidden bg-foreground"
            >
              {c[`${p.key}_image`] && <img
                src={c[`${p.key}_image`]}
                alt={c[`${p.key}_title`] || ""}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
              <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                  {c[`${p.key}_label`] && <span className="text-sm uppercase tracking-[0.2em] text-accent mb-4 block font-medium">{c[`${p.key}_label`]}</span>}
                  <h3 className="text-3xl md:text-4xl font-serif mb-6 text-white">{c[`${p.key}_title`]}</h3>
                  <div className="space-y-4 text-white/85 max-w-lg">
                    {c[`${p.key}_text`] && <p className="text-lg leading-relaxed whitespace-pre-line">{c[`${p.key}_text`]}</p>}
                    {lines(c[`${p.key}_points`]).length > 0 && <ul className="space-y-2 text-base">
                      {lines(c[`${p.key}_points`]).map((pt) => <li key={pt} className="flex items-center gap-3"><span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />{pt}</li>)}
                    </ul>}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>}

      {c.gallery_show !== false && <ImageGallery />}

      {c.philosophy_show !== false && (c.philosophy_title || c.philosophy_text) && <section className="py-20 bg-gradient-accent text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {c.philosophy_title && <h2 className="text-3xl md:text-4xl font-bold mb-6">{c.philosophy_title}</h2>}
            {c.philosophy_text && <p className="text-xl leading-relaxed whitespace-pre-line">{c.philosophy_text}</p>}
          </div>
        </div>
      </section>}

      <ContentCTA content={c} prefix="next" />
    </>
  );
}
