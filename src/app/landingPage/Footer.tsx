"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaGithub, FaDiscord, FaTwitter, FaHeart } from "react-icons/fa";

interface FooterProps {
  scrollToTop: () => void;
}

export default function Footer({ scrollToTop }: FooterProps) {
  const router = useRouter();

  const quickLinks = [
    { label: "Começar", href: "/linguagem" },
    { label: "Login", href: "/login" },
    { label: "Criar Conta", href: "/criarConta" },
    { label: "Níveis", href: "/niveis" },
  ];

  const resources = [
    { label: "Quiz", href: "/quiz" },
    { label: "Dificuldade", href: "/dificuldade" },
  ];

  return (
    <footer className="bg-preto text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={scrollToTop}
            >
              <Image 
                src="/logoNaybar.png" 
                alt="Logo do Codelingo" 
                width={60} 
                height={60}
              />
              <h1 className="text-verde text-4xl font-jersey tracking-wide -ml-2">
                CodeLingo
              </h1>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Aprenda programação de forma gamificada e divertida. 
              Do básico ao avançado, no seu ritmo!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-verde transition-colors text-2xl">
                <FaGithub />
              </a>
              <a href="#" className="text-white/70 hover:text-roxo transition-colors text-2xl">
                <FaDiscord />
              </a>
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors text-2xl">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-verde">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.href)}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-roxo">Recursos</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.href)}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Linguagens */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-500">Linguagens</h3>
            <div className="grid grid-cols-4 gap-3">
              {["Python", "JavaScript", "C++", "C", "Java", "Go", "PHP", "Ruby"].map((lang) => (
                <div
                  key={lang}
                  className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors cursor-pointer"
                  title={lang}
                >
                  <Image
                    src={`/${lang}.svg`}
                    alt={lang}
                    width={24}
                    height={24}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8"></div>

        {/* Copyright e créditos */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/50 text-sm">
            © 2024 CodeLingo. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center space-x-2 text-white/50 text-sm">
            <span>Feito com</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>para aprendizes de programação</span>
          </div>

          <div className="flex space-x-6 text-sm">
            <button className="text-white/50 hover:text-white transition-colors">
              Termos de Uso
            </button>
            <button className="text-white/50 hover:text-white transition-colors">
              Privacidade
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}