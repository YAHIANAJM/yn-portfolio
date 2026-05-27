import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import SectionUrlTracker from "@/components/SectionUrlTracker";
import HeroSection from "@/components/HeroSection";
import TickerSection from "@/components/TickerSection";
import AboutSection from "@/components/AboutSection";
import FitsSection from "@/components/FitsSection";
import CodeSection from "@/components/CodeSection";
import BeyondSection from "@/components/BeyondSection";
import AgencySection from "@/components/AgencySection";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SectionUrlTracker />
      <Header floating />
      <main>
        <HeroSection />
        <TickerSection />
        <AboutSection />
        <FitsSection />
        <CodeSection />
        <BeyondSection />
        <AgencySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
