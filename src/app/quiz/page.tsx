// src/app/quiz/page.tsx  (ou app/quiz/[id]/page.tsx)
"use client";
import { useState } from "react";
import Image from "next/image";
// import useRouter se quiser navegar após enviar
import { useRouter } from "next/navigation";
import ConfirmModal from "./components/ConfirmModal"; // ajuste se não usa alias @/

export default function PerguntaPage() {
  const [selected, setSelected] = useState<null | number>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function toggleOption(index: number) {
    setSelected((prev) => (prev === index ? null : index));
  }

  // abre modal de confirmação
  function handleOpenConfirm() {
    if (selected === null) {
      alert("Selecione uma opção antes de enviar.");
      return;
    }
    setConfirmOpen(true);
  }

  // chamado quando usuário confirma (Siqm)
  async function handleConfirmSend() {
    setConfirmOpen(false);
    setLoading(true);

    try {
      // exemplo de envio ao backend; adapte a rota/payload conforme seu backend
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: 1, // ajuste dinamicamente se usar rotas /quiz/[id]
          selected,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        console.error("Erro no envio:", await res.text());
        alert("Erro ao enviar a resposta. Tente novamente.");
        setLoading(false);
        return;
      }

      // comportamento atual: mostrar alert (igual ao código original)
      alert(`Resposta enviada: opção ${selected}`);

      // opcional: navegar para próxima pergunta (exemplo)
      // router.push("/quiz/2"); // descomente e ajuste conforme seu fluxo
    } catch (err) {
      console.error(err);
      alert("Erro de comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white p-6">
      {/* Logos no topo */}
      <div className="absolute top-6 left-6 z-20">
        <Image src="/logoNaybar.png" alt="Logo esquerda" width={120} height={40} className="object-contain" priority />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <Image src="/logoNaybar.png" alt="Logo direita" width={120} height={40} className="object-contain" priority />
      </div>

        <div className="absolute bottom-6 right-6 z-20">
        <Image src="/logoNaybar.png" alt="Logo direita" width={120} height={40} className="object-contain" priority />
          </div>

        <div className="absolute bottom-6 left-6 z-20">
        <Image src="/logoNaybar.png" alt="Logo esquerda" width={120} height={40} className="object-contain" priority />
          </div>



      {/* Card principal */}
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl min-h-[60vh] text-center z-10 shadow-md mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">PERGUNTA</h1>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => toggleOption(1)}
            aria-pressed={selected === 1}
            className={`w-full flex items-center justify-center rounded-lg border transition-colors text-lg
              ${selected === 1 ? "bg-green-500 text-white" : "bg-gray-100"}
              h-28 sm:h-32 md:h-36`}
          >
            Resposta 1
          </button>

          <button
            onClick={() => toggleOption(2)}
            aria-pressed={selected === 2}
            className={`w-full flex items-center justify-center rounded-lg border transition-colors text-lg
              ${selected === 2 ? "bg-green-500 text-white" : "bg-gray-100"}
              h-28 sm:h-32 md:h-36`}
          >
            Resposta 2
          </button>

          <button
            onClick={() => toggleOption(3)}
            aria-pressed={selected === 3}
            className={`w-full flex items-center justify-center rounded-lg border transition-colors text-lg
              ${selected === 3 ? "bg-green-500 text-white" : "bg-gray-100"}
              h-28 sm:h-32 md:h-36`}
          >
            Resposta 3
          </button>

          <button
            onClick={() => toggleOption(4)}
            aria-pressed={selected === 4}
            className={`w-full flex items-center justify-center rounded-lg border transition-colors text-lg
              ${selected === 4 ? "bg-green-500 text-white" : "bg-gray-100"}
              h-28 sm:h-32 md:h-36`}
          >
            Resposta 4
          </button>
        </div>
      </div>

      {/* ENVIAR RESPOSTA - abre o modal */}
      <div className="fixed left-0 right-0 bottom-6 flex justify-center z-30">
        <button
          onClick={handleOpenConfirm}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg disabled:opacity-60"
        >
          {loading ? "Enviando..." : "ENVIAR RESPOSTA"}
        </button>
      </div>

      {/* Modal de confirmação */}
      <ConfirmModal
        open={confirmOpen}
        title="Tem certeza?"
        description="Sua resposta será enviada e não poderá ser alterada."
        onConfirm={handleConfirmSend}
        onCancel={() => setConfirmOpen(false)}
      />
    </main>
  );
}
