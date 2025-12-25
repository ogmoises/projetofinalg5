"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  pergunta: string;
  alternativas: string[];
  codigo?: string;
  onResponder: (indice: number) => void;
};

export function MultiplaEscolha({ pergunta, alternativas, codigo, onResponder }: Props) {
  const [selecionado, setSelecionado] = useState<number | null>(null);

  // ✅ CORREÇÃO: Reset quando pergunta muda
  useEffect(() => {
    setSelecionado(null);
  }, [pergunta]);

  const handleSelect = (indice: number) => {
    setSelecionado(indice);
    onResponder(indice);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-preto">{pergunta}</h2>
      {codigo && (
        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto">
          <code>{codigo}</code>
        </pre>
      )}
      <div className="space-y-3">
        {alternativas.map((alt, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(index)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selecionado === index
                ? "border-verde bg-verde/10 font-bold"
                : "border-gray-300 hover:border-verde/50"
            }`}
          >
            <span className="font-bold text-roxo mr-3">{String.fromCharCode(65 + index)}.</span>
            {alt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}