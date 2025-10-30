"use client";

import { FaStar, FaHeart, FaMobileAlt, FaLaptop } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

const cursosData = [
  {
    id: 1,
    icon: (
      <div className="flex space-x-5 h-20 items-center -mt-10 mx-10">
        <Image src="/simbolo pyhton.png" alt="Python" width={40} height={40} />
        <Image src="/simbolo C++.png" alt="C++" width={40} height={40} />
      </div>
    ),
    title: "Muitas Linguagens",
    description: "Python, JavaScript, C++, C, Java e mais. Descubra trilhas para Front-end, Back-end e Mobile."
  },
  {
    id: 2,
    icon: (
      <div className="flex space-x-2 h-20 items-center text-verde text-3xl -mt-10">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaHeart />
      </div>
    ),
    title: "Aprendizado Gamificado",
    description: "Ganhe XP, suba de nível, complete desafios diários e desbloqueie conquistas. Errar faz parte!"
  },
  {
    id: 3,
    icon: (
      <div className="flex space-x-3 h-10 items-center text-verde text-4xl -mt-8">
        <FaMobileAlt />
        <FaLaptop />
      </div>
    ),
    title: "Pratique Onde Quiser",
    description: "Aulas rápidas no carro, celular ou computador. Seu progresso é sincronizado."
  }
];

export default function CursosSection() {
  return (
    <>
      <div className="w-full -mt-40">
        <Image 
          src="/5.png" 
          alt="" 
          width={1920} 
          height={1920} 
          className="w-full"
        />
      </div>

      <section id="cursos" className="w-full bg-branco pt-20 pb-48 lg:pt-12 lg:pb-64 relative overflow-visible">
        <div className="container mx-auto lg:px-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          > 
            <p className="text-roxo font-semibold text-xl lg:text-2xl">O que fazemos</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-preto mt-2 leading-tight">
              Aprenda Programação.
              <br />
              Do Básico ao Avançado.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
            {cursosData.map((curso, index) => (
              <motion.div
                key={curso.id}
                className="bg-branco border-2 border-roxo rounded-3xl p-16 flex flex-col items-center text-center shadow-lg h-full hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                {curso.icon}
                <h3 className="text-xl font-bold text-preto mt-2">{curso.title}</h3>
                <p className="text-preto/80 mt-8 text-lg">{curso.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}