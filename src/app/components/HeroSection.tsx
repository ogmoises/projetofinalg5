"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="container mx-auto flex-1 flex items-center py-12 lg:py-24 z-10 mt-16 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/codelingo.png" 
            alt="Mascote Codelingo a programar" 
            width={1920} 
            height={1920} 
            priority
            className="max-w-full h-auto"
          />
        </motion.div>

        <div className="flex flex-col space-y-8 text-center lg:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-preto leading-tight"
          >
            Aprenda a programar
            <br />
            de um jeito <span className="text-roxo">gamificado</span>
            <br />
            e <span className="text-verde">divertido!</span>
          </motion.h2>

          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button className="bg-verde text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-transform hover:shadow-xl">
              Comece GRÁTIS
            </button>
            <button className="bg-roxo text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-transform hover:shadow-xl">
              Já tenho conta
            </button>
          </motion.div>

          <motion.div 
            className="flex space-x-4 items-end justify-center lg:justify-start pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Image src="/simbolo pyhton.png" alt="Python" width={40} height={40}/>
            <Image src="/simbolo javascript.png" alt="JavaScript" width={70} height={70} className="-translate-y-6"/>
            <Image src="/simbolo C++.png" alt="C++" width={40} height={40} />
            <Image src="/simbolo C.png" alt="C#" width={50} height={50} className="-translate-y-6"/>
          </motion.div>
        </div>
      </div>
    </section>
    
  );
}