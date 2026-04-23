import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Divider */}
      <div className="container-custom">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
      </div>

      <AboutSection />

      <div className="container-custom">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
      </div>

      <ContactSection />
    </>
  );
}
