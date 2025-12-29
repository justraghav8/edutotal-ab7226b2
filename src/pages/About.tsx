import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, Globe, Users, TrendingUp, Award, Gem, Flame, Shield, Globe2, Handshake, Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";
import missionImage1 from "@/assets/about-mission-1.jpg";
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

export default function About() {
  return (
    <>
      <HeroSection
        title="About EduTotal"
        subtitle="Your trusted partner in educational transformation"
        minimal
      />

      {/* Mission & Motto Combined Section */}
      <section className="py-24 lg:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Mission Block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm uppercase tracking-[0.3em] text-accent mb-4 block font-medium">
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Transforming Education Through{" "}
                <span className="text-accent">Excellence</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                EduTotal was created to provide Quality, Innovative and Internationally benchmarked framework 
                for end-to-end solutions in the Indian Education sector. We take pride in adopting projects that 
                bring quality change and revolution in the education environment.
              </p>
              <div className="relative pl-6 border-l-4 border-accent">
                <Quote className="absolute -left-4 -top-2 w-8 h-8 text-accent/20" />
                <p className="text-xl font-serif italic text-foreground/80">
                  "We are the trustworthy partners to progression for bringing an ethical and sustainable 
                  change in the educational environment."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src={missionImage1} 
                  alt="Educational transformation and growth" 
                  className="w-full h-auto rounded-sm shadow-large"
                />
                {/* Decorative accent */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-sm -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent/20 rounded-sm -z-10" />
              </div>
            </motion.div>
          </div>

          {/* Motto Block - Reversed Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <img 
                  src={missionImage2} 
                  alt="Dreams and aspirations in education" 
                  className="w-full h-auto rounded-sm shadow-large"
                />
                {/* Decorative accent */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-sm -z-10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-accent/20 rounded-sm -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-sm uppercase tracking-[0.3em] text-accent mb-4 block font-medium">
                Our Motto
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Dream Big,{" "}
                <span className="text-accent">Achieve Bigger</span>
              </h2>
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-serif text-xl">1</span>
                  </div>
                  <div>
                    <p className="text-xl font-serif text-foreground">You dream, we create</p>
                    <p className="text-muted-foreground">Turning your vision into reality</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-serif text-xl">2</span>
                  </div>
                  <div>
                    <p className="text-xl font-serif text-foreground">You desire, we build</p>
                    <p className="text-muted-foreground">Constructing the foundations of success</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-serif text-xl">3</span>
                  </div>
                  <div>
                    <p className="text-xl font-serif text-foreground">Sky is the limit</p>
                    <p className="text-muted-foreground">No dream too big for imagination</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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

          {/* Pillars Grid */}
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
                {/* Hover background */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
                
                {/* Large number */}
                <span className="absolute top-6 right-8 text-7xl lg:text-8xl font-serif text-foreground/5 group-hover:text-accent/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                {/* Icon */}
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                    <pillar.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                  </div>
                </motion.div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-3xl lg:text-4xl font-serif mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {pillar.description}
                  </p>
                </div>
                
                {/* Bottom accent line */}
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

          {/* Bottom tagline */}
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

      {/* Expertise Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Domestic Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  For schools, Colleges, Universities that want to explore new geography within the country, 
                  we provide in-depth due diligence. Realistic risk mapping enabling bold concrete steps for 
                  successful sustainable model.
                </p>
                <p>
                  Special expertise on integrated multi-disciplinary learning with emphasis on applied 
                  Skill/Vocational training.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-accent">International Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  To ensure knowledge travels across, Edutotal provides services across borders. We partner 
                  with finest schools around the world to help them expand in unknown territories with confidence.
                </p>
                <p>
                  We have worked in creative sciences, technical areas, management and leadership development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Philosophy */}
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
    </>
  );
}
