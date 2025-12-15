"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaRocket, FaUsers, FaLightbulb } from "react-icons/fa";

export default function SobreNosSection() {
  const stats = [
    { icon: <FaUsers className="text-5xl text-verde" />, value: "10.000+", label: "Alunos" },
    { icon: <FaRocket className="text-5xl text-roxo" />, value: "15+", label: "Linguagens" },
    { icon: <FaLightbulb className="text-5xl text-yellow-500" />, value: "500+", label: "Exercícios" },
  ];

  return (
    <section id="sobre-nos" className="py-20 bg-gradient-to-b from-branco to-roxo/5 relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute top-10 right-10 opacity-10">
        <div className="w-64 h-64 bg-verde rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <div className="w-96 h-96 bg-roxo rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-preto mb-4">
            Sobre Nós
          </h2>
          <p className="text-xl text-preto/70 max-w-3xl mx-auto">
            Somos uma plataforma dedicada a tornar o aprendizado de programação 
            <span className="text-roxo font-semibold"> divertido, gamificado</span> e 
            <span className="text-verde font-semibold"> acessível para todos!</span>
          </p>
        </motion.div>

        {/* Grid de conteúdo */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-preto">
              Nossa Missão
            </h3>
            <p className="text-lg text-preto/80 leading-relaxed">
              Transformar o aprendizado de programação em uma experiência envolvente 
              e acessível. Acreditamos que todos podem aprender a programar quando 
              o processo é divertido e gamificado.
            </p>
            <p className="text-lg text-preto/80 leading-relaxed">
              Com o CodeLingo, você não apenas aprende - você joga, conquista, 
              evolui e se torna um programador de verdade!
            </p>
            
            <div className="flex space-x-4 pt-4">
              <div className="bg-verde/10 border-2 border-verde rounded-2xl p-4 flex-1">
                <div className="text-3xl font-bold text-verde mb-1">100%</div>
                <div className="text-sm text-preto/70">Gratuito</div>
              </div>
              <div className="bg-roxo/10 border-2 border-roxo rounded-2xl p-4 flex-1">
                <div className="text-3xl font-bold text-roxo mb-1">24/7</div>
                <div className="text-sm text-preto/70">Disponível</div>
              </div>
              <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-2xl p-4 flex-1">
                <div className="text-3xl font-bold text-yellow-500 mb-1">∞</div>
                <div className="text-sm text-preto/70">Tentativas</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <Image 
                src="/codelingo.png" 
                alt="Mascote CodeLingo" 
                width={500} 
                height={500}
                className="drop-shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-verde text-white rounded-full w-24 h-24 flex items-center justify-center text-center text-sm font-bold shadow-xl">
                Aprenda
                <br />
                Agora!
              </div>
            </div>
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl p-8 text-center shadow-lg border-2 border-preto/5"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-preto mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-preto/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}