"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import SimpleNavbar from "@/components/ui/SimpleNavbar";
import { MultiplaEscolha } from "@/components/exercicios/MultiplaEscolha";
import { CompletarCodigo } from "@/components/exercicios/CompletarCodigo";
import { EncontrarErro } from "@/components/exercicios/EncontrarErro";
import { VerdadeiroFalso } from "@/components/exercicios/VerdadeiroFalso";

export default function QuizPage() {
  const router = useRouter();
  const [linguagemId, setLinguagemId] = useState<number | null>(null);
  const [dificuldade, setDificuldade] = useState<number>(1);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  useEffect(() => {
    const langId = sessionStorage.getItem("selectedLanguageId");
    const diff = sessionStorage.getItem("selectedDifficulty");
    
    if (!langId) {
      router.push("/linguagem");
      return;
    }
    
    setLinguagemId(parseInt(langId));
    setDificuldade(diff ? parseInt(diff) : 1);
  }, [router]);

  const { data: questao, isLoading, refetch } = api.perguntas.buscarAleatoria.useQuery(
    { linguagem_id: linguagemId!, dificuldade },
    { enabled: !!linguagemId }
  );

  const registrarResposta = api.usuario.registrarResposta.useMutation();

  const handleResponder = (indice: number) => {
    setRespostaSelecionada(indice);
  };

  const handleConfirmar = async () => {
    if (respostaSelecionada === null || !questao) return;

    const acertou = respostaSelecionada === questao.alt_correta;

    // Registra no banco
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      await registrarResposta.mutateAsync({
        usuario_id: parseInt(userId),
        perguntas_id: questao.id,
        alt_selecionado: respostaSelecionada,
        acertou,
      });
    }

    setMostrarResultado(true);
  };

  const handleProxima = () => {
    setRespostaSelecionada(null);
    setMostrarResultado(false);
    refetch();
  };

  if (isLoading || !questao) {
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-2xl font-bold text-roxo animate-pulse">
            Carregando questão...
          </div>
        </div>
      </div>
    );
  }

  const alternativas = questao.alternativa as string[];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco to-roxo/5">
      <SimpleNavbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border-2 border-roxo/20">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="bg-roxo text-white px-4 py-2 rounded-full font-bold">
              {questao.categoria || "Geral"}
            </span>
            <span className={`px-4 py-2 rounded-full font-bold ${
              dificuldade === 1 ? "bg-green-100 text-green-700" :
              dificuldade === 2 ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"
            }`}>
              {dificuldade === 1 ? "Fácil" : dificuldade === 2 ? "Médio" : "Difícil"}
            </span>
          </div>

          {/* Componente dinâmico baseado no tipo */}
          {questao.tipo === "multipla_escolha" && (
            <MultiplaEscolha
              pergunta={questao.pergunta}
              alternativas={alternativas}
              codigo={questao.codigo || undefined}
              onResponder={handleResponder}
            />
          )}

          {questao.tipo === "completar_codigo" && (
            <CompletarCodigo
              pergunta={questao.pergunta}
              codigoComLacuna={questao.codigo!}
              alternativas={alternativas}
              onResponder={handleResponder}
            />
          )}

          {questao.tipo === "encontrar_erro" && (
            <EncontrarErro
              pergunta={questao.pergunta}
              codigo={questao.codigo!}
              alternativas={alternativas}
              onResponder={handleResponder}
            />
          )}

          {questao.tipo === "verdadeiro_falso" && (
            <VerdadeiroFalso
              pergunta={questao.pergunta}
              onResponder={(valor) => handleResponder(valor ? 0 : 1)}
            />
          )}

          {/* Resultado */}
          {mostrarResultado && (
            <div className={`mt-6 p-6 rounded-2xl ${
              respostaSelecionada === questao.alt_correta
                ? "bg-green-100 border-2 border-green-500"
                : "bg-red-100 border-2 border-red-500"
            }`}>
              <p className="text-2xl font-bold mb-2">
                {respostaSelecionada === questao.alt_correta ? "🎉 Correto!" : "❌ Incorreto"}
              </p>
              {questao.explicacao && (
                <p className="text-gray-700">{questao.explicacao}</p>
              )}
            </div>
          )}

          {/* Botões */}
          <div className="mt-8 flex gap-4">
            {!mostrarResultado ? (
              <button
                onClick={handleConfirmar}
                disabled={respostaSelecionada === null}
                className="flex-1 bg-verde text-white font-bold py-4 rounded-xl disabled:opacity-50"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleProxima}
                className="flex-1 bg-roxo text-white font-bold py-4 rounded-xl"
              >
                Próxima Questão →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}