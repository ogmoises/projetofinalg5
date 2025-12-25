"use client";
import { useState, useEffect } from "react";

type Props = {
  pergunta: string;
  codigoComLacuna: string;
  alternativas: string[];
  onResponder: (indice: number) => void;
};

export function CompletarCodigo({ pergunta, codigoComLacuna, alternativas, onResponder }: Props) {
  const [selecionado, setSelecionado] = useState<number | null>(null);

  // ✅ CORREÇÃO: Reset quando pergunta muda
  useEffect(() => {
    setSelecionado(null);
  }, [pergunta]);

  const codigoPreenchido = selecionado !== null 
    ? codigoComLacuna.replace("___", alternativas[selecionado])
    : codigoComLacuna;

  const handleSelect = (indice: number) => {
    setSelecionado(indice);
    onResponder(indice);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-preto">{pergunta}</h2>
      <div className="bg-gray-900 text-green-400 p-4 rounded-xl">
        <pre><code>{codigoPreenchido}</code></pre>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {alternativas.map((alt, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`p-3 rounded-xl border-2 font-mono font-bold transition-all ${
              selecionado === index
                ? "border-verde bg-verde/10"
                : "border-gray-300 hover:border-verde/50"
            }`}
          >
            {alt}
          </button>
        ))}
      </div>
    </div>
  );
}