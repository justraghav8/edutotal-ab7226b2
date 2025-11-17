import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Heart, Globe, Users, TrendingUp, Award } from "lucide-react";

const values = [
  { icon: Target, title: "Knowledge Based Guidance", description: "Expert insights driving informed decision-making" },
  { icon: Heart, title: "Honest Assistance", description: "Transparent support and communication" },
  { icon: TrendingUp, title: "Prompt Response", description: "Quick and efficient service delivery" },
  { icon: Globe, title: "Relevant Information", description: "Accurate, timely, and actionable intelligence" },
  { icon: Users, title: "Proactive Approach", description: "Anticipating needs and delivering comprehensive solutions" },
  { icon: Award, title: "Excellence", description: "Commitment to the highest standards" },
];

const pillars = [
  { title: "Value", description: "Delivering measurable impact and sustainable worth" },
  { title: "Passion", description: "Unwavering commitment to educational excellence" },
  { title: "Integrity", description: "Ethical practices and transparency in every engagement" },
  { title: "Global", description: "International standards and worldwide perspective" },
  { title: "Relationship", description: "Building lasting, meaningful partnerships" },
  { title: "Diversity", description: "Embracing varied approaches and inclusive solutions" },
];

export default function About() {
  return (
    <MainLayout>
      <HeroSection
        title="About EduTotal"
        subtitle="Your trusted partner in educational transformation"
        ctaPrimaryText="Our Services"
        ctaPrimaryLink="/services"
        ctaSecondaryText="Meet Our Team"
        ctaSecondaryLink="/who-we-are"
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

      {/* Foundation Pillars */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Foundation Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <Card key={index} className="text-center hover-lift border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
    </MainLayout>
  );
}
