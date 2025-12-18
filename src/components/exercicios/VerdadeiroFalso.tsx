"use client";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type Props = {
  pergunta: string;
  onResponder: (ehVerdadeiro: boolean) => void;
};

export function VerdadeiroFalso({ pergunta, onResponder }: Props) {
  const [selecionado, setSelecionado] = useState<boolean | null>(null);

  const handleSelect = (valor: boolean) => {
    setSelecionado(valor);
    onResponder(valor);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-preto text-center">{pergunta}</h2>

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleSelect(true)}
          className={`p-8 rounded-2xl border-4 transition-all ${
            selecionado === true
              ? "border-green-500 bg-green-500/10 scale-105"
              : "border-gray-300 hover:border-green-500/50"
          }`}
        >
          <FaCheck className="text-6xl text-green-500 mx-auto mb-3" />
          <p className="text-2xl font-bold">Verdadeiro</p>
        </button>

        <button
          onClick={() => handleSelect(false)}
          className={`p-8 rounded-2xl border-4 transition-all ${
            selecionado === false
              ? "border-red-500 bg-red-500/10 scale-105"
              : "border-gray-300 hover:border-red-500/50"
          }`}
        >
          <FaTimes className="text-6xl text-red-500 mx-auto mb-3" />
          <p className="text-2xl font-bold">Falso</p>
        </button>
      </div>
    </div>
  );
}