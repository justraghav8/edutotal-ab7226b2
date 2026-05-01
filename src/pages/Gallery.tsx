import { HeroSection } from "@/components/sections/HeroSection";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { NextPageCTA } from "@/components/sections/NextPageCTA";

export default function Gallery() {
  return (
    <>
      <HeroSection
        title="Image Gallery"
        subtitle="Moments, milestones, and memories from our journey"
        minimal
        pageKey="gallery"
      />

      <ImageGallery />

      <NextPageCTA
        headline="Discover Our Story"
        description="Learn more about the people and purpose behind EduTotal."
        linkText="About Us"
        linkHref="/about"
      />
    </>
  );
}
