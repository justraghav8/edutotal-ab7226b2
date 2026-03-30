import { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { NextPageCTA } from "@/components/sections/NextPageCTA";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { Target, Heart, Globe, Users, TrendingUp, Award, Gem, Flame, Shield, Globe2, Handshake, Sparkles, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import missionImage2 from "@/assets/about-mission-2.jpg";

const values = [
  { icon: Target, title: "Knowledge Based Guidance", description: "Expert insights driving informed decision-making" },
  { icon: Heart, title: "Honest Assistance", description: "Transparent support and communication" },
  { icon: TrendingUp, title: "Prompt Response", description: "Quick and efficient service delivery" },
  { icon: Globe, title: "Relevant Information", description: "Accurate, timely, and actionable intelligence" },
  { icon: Users, title: "Proactive Approach", description: "Anticipating needs and delivering comprehensive solutions" },
  { icon: Award, title: "Excellence", description: "Commitment to the highest standards" },
];

const pillars = [
  { title: "Value", description: "Delivering measurable impact and sustainable worth", icon: Gem },
  { title: "Passion", description: "Unwavering commitment to educational excellence", icon: Flame },
  { title: "Integrity", description: "Ethical practices and transparency in every engagement", icon: Shield },
  { title: "Global", description: "International standards and worldwide perspective", icon: Globe2 },
  { title: "Relationship", description: "Building lasting, meaningful partnerships", icon: Handshake },
  { title: "Diversity", description: "Embracing varied approaches and inclusive solutions", icon: Sparkles },
];

const tabs = [
  { id: "mission", label: "Our Mission" },
  { id: "motto", label: "Our Motto" },
  { id: "values", label: "Our Core Values" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function MissionContent() {
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
        Transforming Education Through{" "}
        <span className="text-accent">Excellence</span>
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
        EduTotal was created to provide Quality, Innovative and Internationally benchmarked framework 
        for end-to-end solutions in the Indian Education sector. We take pride in adopting projects that 
        bring quality change and revolution in the education environment.
      </p>
      <div className="relative inline-block text-left pl-6 border-l-4 border-accent max-w-2xl">
        <Quote className="absolute -left-4 -top-2 w-8 h-8 text-accent/20" />
        <p className="text-xl font-serif italic text-foreground/80">
          "We are the trustworthy partners to progression for bringing an ethical and sustainable 
          change in the educational environment."
        </p>
      </div>
    </motion.div>
  );
}

function MottoContent() {
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
          src={missionImage2} 
          alt="Dreams and aspirations in education" 
          className="w-full h-auto rounded-sm shadow-large"
        />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-sm -z-10" />
        <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-accent/20 rounded-sm -z-10" />
      </div>

      <div>
        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
          Dream Big,{" "}
          <span className="text-accent">Achieve Bigger</span>
        </h2>
        <div className="space-y-6">
          {[
            { num: "1", title: "You dream, we create", desc: "Turning your vision into reality" },
            { num: "2", title: "You desire, we build", desc: "Constructing the foundations of success" },
            { num: "3", title: "Sky is the limit", desc: "No dream too big for imagination" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-accent font-serif text-xl">{item.num}</span>
              </div>
              <div>
                <p className="text-xl font-serif text-foreground">{item.title}</p>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CoreValuesContent() {
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
            const Icon = value.icon;
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
              const Icon = value.icon;
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
  const [activeTab, setActiveTab] = useState<TabId>("mission");

  return (
    <>
      <HeroSection
        title="About EduTotal"
        subtitle="Your trusted partner in educational transformation"
        minimal
        pageKey="about"
      />

      {/* Tabbed Section: Mission / Motto / Core Values */}
      <section className="py-24 lg:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex border border-border rounded-sm overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-8 py-4 text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
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
            {activeTab === "mission" && <MissionContent />}
            {activeTab === "motto" && <MottoContent />}
            {activeTab === "values" && <CoreValuesContent />}
          </AnimatePresence>
        </div>
      </section>

      {/* Foundation Pillars - Impressive Design */}
      <section className="py-32 bg-background overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground">Foundation Pillars</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 max-w-6xl mx-auto border border-border">
            {pillars.map((pillar, index) => (
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
                    <pillar.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
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
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-xl font-serif text-muted-foreground mt-20 max-w-2xl mx-auto"
          >
            These pillars guide every decision we make and every partnership we build.
          </motion.p>
        </div>
      </section>

      {/* Expertise Areas - Full Width Image Cards */}
      <section className="py-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-20 bg-background"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            What We Do Best
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">Our Expertise</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group min-h-[500px] lg:min-h-[600px] overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                <span className="text-sm uppercase tracking-[0.2em] text-accent mb-4 block font-medium">India Focus</span>
                <h3 className="text-3xl md:text-4xl font-serif mb-6 text-white">Domestic Services</h3>
                <div className="space-y-4 text-white/85 max-w-lg">
                  <p className="text-lg leading-relaxed">
                    For schools, Colleges, Universities that want to explore new geography within the country, 
                    we provide in-depth due diligence and realistic risk mapping.
                  </p>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Multi-disciplinary learning frameworks</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Applied Skill & Vocational training</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Sustainable institutional models</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group min-h-[500px] lg:min-h-[600px] overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                <span className="text-sm uppercase tracking-[0.2em] text-white/80 mb-4 block font-medium">Global Reach</span>
                <h3 className="text-3xl md:text-4xl font-serif mb-6">International Services</h3>
                <div className="space-y-4 text-white/80 max-w-lg">
                  <p className="text-lg leading-relaxed">
                    We partner with finest schools around the world to help them expand 
                    in unknown territories with confidence and strategic clarity.
                  </p>
                  <ul className="space-y-2 text-base">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white" />Cross-border educational partnerships</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white" />Creative sciences & technical areas</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white" />Management & leadership development</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ImageGallery />

      <section className="py-20 bg-gradient-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-xl leading-relaxed">
              Learning by Doing is vital for student development. We help institutes in building strong 
              relationships with corporates. Corporate culture exposure grooms students for future career 
              challenges and makes them ready for corporate world.
            </p>
          </div>
        </div>
      </section>

      <NextPageCTA
        headline="Meet the Team Behind EduTotal"
        description="Get to know the leaders, advisors, and clients who make our vision a reality."
        linkText="Who We Are"
        linkHref="/who-we-are"
      />
    </>
  );
}
