"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";


const faqData = [
  {
    id: 1,
    pergunta: "Como funciona a plataforma CodeLingo?",
    resposta: "O CodeLingo é uma plataforma gamificada onde você aprende programação através de desafios interativos, conquistas e sistema de XP. Comece com conceitos básicos e avance para projetos complexos enquanto ganha recompensas e sobe de nível!"
  },
  {
    id: 2,
    pergunta: "Preciso ter experiência prévia em programação?",
    resposta: "Não! Nossa plataforma é perfeita para iniciantes. Começamos do zero, ensinando os conceitos mais básicos de forma gradual e intuitiva. Se você já tem experiência, pode pular para níveis mais avançados através do nosso teste de nivelamento."
  },
  {
    id: 3,
    pergunta: "Quais linguagens de programação são ensinadas?",
    resposta: "Oferecemos Python, JavaScript, C++, C, Java e muito mais! Temos trilhas especializadas para Front-end, Back-end, Mobile, Data Science e Games. Você pode aprender múltiplas linguagens simultaneamente."
  },
  {
    id: 4,
    pergunta: "Como funciona o sistema gamificado?",
    resposta: "Você ganha XP completando lições, resolve desafios diários, desbloqueia conquistas e sobe de nível. Temos rankings, medalhas e recompensas especiais. Aprender fica tão viciante quanto jogar!"
  },
  {
    id: 5,
    pergunta: "A plataforma é gratuita?",
    resposta: "Sim! Oferecemos um plano gratuito robusto com acesso a todas as linguagens básicas e centenas de exercícios. Temos também planos premium com recursos avançados, projetos exclusivos e mentorias personalizadas."
  },
  
  {
    id: 7,
    pergunta: "Há certificados ao completar os cursos?",
    resposta: "Sim! Ao concluir cada trilha de aprendizado, você recebe um certificado digital verificável que pode compartilhar no LinkedIn e adicionar ao seu currículo."
  },
  {
    id: 8,
    pergunta: "Como é o suporte para dúvidas?",
    resposta: "Oferecemos suporte através de chat integrado, fórum da comunidade e, para planos premium, mentorias ao vivo com programadores experientes. Nenhuma dúvida fica sem resposta!"
  }
];


const FAQItem = ({ pergunta, resposta, isOpen, onClick }: { 
  pergunta: string; 
  resposta: string; 
  isOpen: boolean; 
  onClick: () => void; 
}) => {
  return (
    <div className="border-2 border-roxo rounded-2xl mb-4 overflow-hidden hover:shadow-lg transition-shadow">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center bg-branco hover:bg-roxo/5 transition-colors"
        onClick={onClick}
      >
        <span className="font-nunito font-semibold text-lg text-preto">
          {pergunta}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-roxo"
        >
          <FaChevronDown />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-roxo/5 border-t border-roxo/20">
              <p className="text-preto/80 font-nunito text-lg leading-relaxed">
                {resposta}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente principal do FAQ
export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="w-full py-20 bg-branco relative overflow-hidden">
      {/* Elemento decorativo */}
      <div className="absolute top-0 left-0 z-0 opacity-50">
        <div className="w-64 h-64 bg-verde rounded-full -translate-x-32 -translate-y-32"></div>
      </div>
      
      <div className="absolute bottom-0 right-0 z-0 opacity-50">
        <div className="w-96 h-96 bg-roxo rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho do FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-preto mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-preto/70 font-nunito max-w-2xl mx-auto">
            Tire suas dúvidas sobre a plataforma CodeLingo. 
            <span className="text-roxo font-semibold"> Aprender programação</span> nunca foi tão fácil!
          </p>
        </motion.div>

        {/* Lista de FAQs */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              pergunta={item.pergunta}
              resposta={item.resposta}
              isOpen={openItem === item.id}
              onClick={() => toggleItem(item.id)}
            />
          ))}
        </motion.div>

        {/* CTA no final do FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-preto/80 mb-6 font-nunito">
            Ainda tem dúvidas?
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button className="bg-verde text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform hover:shadow-xl">
              Fale Conosco
            </button>
            <button className="border-2 border-roxo text-roxo font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-transform hover:bg-roxo/5">
              Ver Cursos
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}