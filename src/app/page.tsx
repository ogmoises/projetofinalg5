"use client";

import { useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CursosSection from "./components/Cursos";
import FAQSection from "./components/FAQSection";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  useEffect(() => {
    
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start bg-branco relative overflow-visible">
      <Navbar scrollToSection={scrollToSection} scrollToTop={scrollToTop} />
      
      <HeroSection />
      <CursosSection />

      
      <section id="sobre-nos" className="w-full py-20 bg-cinza-claro">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-preto">Sobre Nós</h2>
          <p className="text-lg text-preto/80 mt-4 max-w-2xl mx-auto">
            Conteúdo da seção Sobre Nós...
          </p>
        </div>
      </section>

      <FAQSection />
      
      <section id="contato" className="w-full py-20 bg-cinza-claro">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-preto">Contato</h2>
          <p className="text-lg text-preto/80 mt-4 max-w-2xl mx-auto">
            Entre em contato conosco...
          </p>
        </div>
      </section>

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 z-0">
        <Image 
          src="/4.png" 
          alt=""
          width={500} 
          height={500} 
        />
      </div>

      <div className="absolute bottom-0 right-0 z-0 w-full">
        <Image
          src="/5.png"
          alt=""
          width={1920}
          height={400}
          className="w-full" 
        />
      </div>
    </main>
  );
}