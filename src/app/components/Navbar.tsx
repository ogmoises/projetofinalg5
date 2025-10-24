"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
}

const menuItems = [
  { label: "Cursos", id: "cursos" },
  { label: "Sobre Nós", id: "sobre-nos" },
  { label: "FAQ", id: "faq" },
  { label: "Contato", id: "contato" }
];

export default function Navbar({ scrollToSection, scrollToTop }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full bg-branco shadow-md z-50 fixed top-0 transition-all duration-300 ${
        isScrolled ? "py-2 shadow-lg" : "py-0"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={scrollToTop}
        >
          <Image 
            src="/logoNaybar.png" 
            alt="Logo do Codelingo" 
            width={80} 
            height={80} 
            className="py-0.5 -ml-20 lg:-ml-12"
          />
          <h1 className="text-verde text-5xl font-jersey tracking-wide -ml-4">
            CodeLingo
          </h1>
        </div>

        <div className="flex items-center space-x-8">
  {menuItems.map((item) => (
    <button
      key={item.id}
      onClick={() => scrollToSection(item.id)}
      className="text-verde-escuro text-xl font-semibold hover:text-roxo transition-colors duration-300 hover:scale-105 transform"
    >
      {item.label}
    </button>
  ))}
</div>
      </div>
    </motion.nav>
  );
}