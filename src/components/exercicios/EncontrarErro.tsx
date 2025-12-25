"use client";
import { useState, useEffect } from "react";

type Props = {
  pergunta: string;
  codigo: string;
  alternativas: string[];
  onResponder: (indice: number) => void;
};

export function EncontrarErro({ pergunta, codigo, alternativas, onResponder }: Props) {
  const [selecionado, setSelecionado] = useState<number | null>(null);

  // ✅ CORREÇÃO: Reset quando pergunta muda
  useEffect(() => {
    setSelecionado(null);
  }, [pergunta]);
  
  // Proteção: se codigo estiver vazio, usa a pergunta
  const codigoParaMostrar = codigo || pergunta;
  const linhas = codigoParaMostrar.split('\n');

  const handleSelect = (indice: number) => {
    setSelecionado(indice);
    onResponder(indice);
  };

  return (
    <div className="space-y-6">
      {/* Só mostra a pergunta se for diferente do código */}
      {codigo && codigo !== pergunta && (
        <h2 className="text-2xl font-bold text-preto">{pergunta}</h2>
      )}
      
      <div className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto">
        <pre className="space-y-1">
          {linhas.map((linha, i) => (
            <div key={i} className="flex">
              <span className="text-gray-500 mr-4 select-none min-w-[2rem]">{i + 1}</span>
              <code>{linha}</code>
            </div>
          ))}
        </pre>
      </div>
      <div className="space-y-3">
        {alternativas.map((alt, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selecionado === index
                ? "border-red-500 bg-red-500/10 font-bold"
                : "border-gray-300 hover:border-red-500/50"
            }`}
          >
            {alt}
          </button>
        ))}
      </div>
    </div>
  );
}