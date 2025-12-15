"use client";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import CursosSection from "./Cursos";
import FAQSection from "./FAQSection";
import SobreNosSection from "./SobreNos";
import ContatoSection from "./Contato";
import Footer from "./Footer";

export default function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-branco">
      <Navbar scrollToSection={scrollToSection} scrollToTop={scrollToTop} />
      <HeroSection />
      <CursosSection />
      <SobreNosSection />
      <FAQSection />
      <ContatoSection />
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
}