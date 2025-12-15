"use client";

import { motion } from "framer-motion";
import { FaUsers, FaCertificate, FaGamepad } from "react-icons/fa";
import Image from "next/image";

export default function PorqueCodeLingoSection() {
  const beneficios = [
    {
      icon: <FaUsers className="text-6xl text-verde mb-4" />,
      titulo: "Comunidade Ativa",
      descricao: "Conecte-se com outros aprendizes, tire dúvidas e suba no ranking! Juntos aprendemos mais rápido.",
      imagem: "/correndo.svg", // Você pode criar essa imagem ou usar a do mascote
    },
    {
      icon: <FaCertificate className="text-6xl text-yellow-500 mb-4" />,
      titulo: "Certificados reconhecidos",
      descricao: "Conclua cursos e ganhe certificados válidos para completar seu currículo e impulsionar sua carreira.",
      imagem: "/certificado.svg",
    },
    {
      icon: <FaGamepad className="text-6xl text-roxo mb-4" />,
      titulo: "Mantenha a motivação",
      descricao: "Fica fácil criar o hábito de aprender programação com recursos que parecem de jogo e desafios divertidos.",
      imagem: "/metasDuo.svg",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-branco to-verde/5 relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute top-0 right-0 opacity-10">
        <div className="w-96 h-96 bg-roxo rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-roxo font-semibold text-xl lg:text-2xl mb-2">
            Por que escolher o CodeLingo?
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-preto">
            Aprenda de forma <span className="text-verde">diferente</span>
          </h2>
        </motion.div>

        {/* Grid de benefícios */}
        <div className="space-y-24 max-w-6xl mx-auto">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Conteúdo */}
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="flex justify-start">
                  {beneficio.icon}
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-verde">
                  {beneficio.titulo}
                </h3>
                <p className="text-lg lg:text-xl text-preto/80 leading-relaxed">
                  {beneficio.descricao}
                </p>
              </div>

              {/* Imagem */}
              <div
                className={`flex justify-center ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-verde/20">
                    <Image
                      src={beneficio.imagem}
                      alt={beneficio.titulo}
                      width={400}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  {/* Decoração flutuante */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-6 -right-6 bg-roxo text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-xl"
                  >
                    ✨
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-verde via-roxo to-verde bg-[length:200%_100%] animate-gradient rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Pronto para começar sua jornada?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Junte-se a milhares de desenvolvedores que já transformaram suas carreiras!
            </p>
            <button 
              onClick={() => window.location.href = '/linguagem'}
              className="bg-white text-verde font-bold py-4 px-12 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all hover:shadow-2xl"
            >
              Começar Agora - É GRÁTIS!
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}