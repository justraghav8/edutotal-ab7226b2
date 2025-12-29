import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, Globe, Users, TrendingUp, Award, Gem, Flame, Shield, Globe2, Handshake, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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

      {/* Mission & Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Edu Total was created to provide Quality, Innovative and Internationally benchmarked framework 
              for end-to-end solution in Indian Education sector. We take pride in adopting projects that 
              bring quality change and revolution in the education environment. We are the pioneers in 
              bringing new types of education model to the society providing excellence through our actions.
            </p>
            <div className="bg-gradient-accent text-white rounded-2xl p-8 shadow-large">
              <p className="text-xl font-semibold italic">
                "We are the trustworthy partners to progression for bringing an ethical and sustainable 
                change in the educational environment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Motto */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Motto</h2>
            <p className="text-xl leading-relaxed">
              "You dream, we create; you desire, we build. You dream for small; we help you make it big; 
              You dream for big, sky is the limit for imagination."
            </p>
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
