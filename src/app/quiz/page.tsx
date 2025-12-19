"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import SimpleNavbar from "@/components/ui/SimpleNavbar";
import { MultiplaEscolha } from "@/components/exercicios/MultiplaEscolha";
import { CompletarCodigo } from "@/components/exercicios/CompletarCodigo";
import { EncontrarErro } from "@/components/exercicios/EncontrarErro";
import { VerdadeiroFalso } from "@/components/exercicios/VerdadeiroFalso";
import { motion } from "framer-motion";

export default function QuizPage() {
  const router = useRouter();
  const [linguagemId, setLinguagemId] = useState<number | null>(null);
  const [dificuldade, setDificuldade] = useState(1);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [questoesRespondidas, setQuestoesRespondidas] = useState<number[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const TOTAL_QUESTOES = 10;

  // Carregar dados do sessionStorage
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

  // Reset ao mudar de questão
  useEffect(() => {
    setRespostaSelecionada(null);
    setMostrarResultado(false);
  }, [questaoAtual]);

  // Query da questão
  const { data: questao, isLoading, refetch } = api.perguntas.buscarAleatoria.useQuery(
    { 
      linguagem_id: linguagemId || 0, 
      dificuldade 
    },
    { 
      enabled: linguagemId !== null && !quizFinalizado,
      retry: false
    }
  );

  const registrarResposta = api.usuario.registrarResposta.useMutation();

  const handleResponder = (indice: number) => {
    setRespostaSelecionada(indice);
  };

  const handleConfirmar = async () => {
    if (respostaSelecionada === null || !questao) return;

    const acertou = respostaSelecionada === questao.alt_correta;

    const userId = sessionStorage.getItem("userId");
    if (userId) {
      try {
        await registrarResposta.mutateAsync({
          usuario_id: parseInt(userId),
          perguntas_id: questao.id,
          alt_selecionado: respostaSelecionada,
          acertou,
        });
      } catch (error) {
        console.error("Erro ao registrar resposta:", error);
      }
    }

    if (acertou) {
      setAcertos(prev => prev + 1);
    }
    
    setQuestoesRespondidas(prev => [...prev, questao.id]);
    setMostrarResultado(true);
  };

  const handleProxima = () => {
    if (questaoAtual + 1 >= TOTAL_QUESTOES) {
      setQuizFinalizado(true);
      return;
    }
    
    // Limpa estado e avança
    setRespostaSelecionada(null);
    setMostrarResultado(false);
    setQuestaoAtual(prev => prev + 1);
    
    // Refetch da próxima questão
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const handleReiniciar = () => {
    setQuestoesRespondidas([]);
    setQuestaoAtual(0);
    setAcertos(0);
    setQuizFinalizado(false);
    setRespostaSelecionada(null);
    setMostrarResultado(false);
    refetch();
  };

  const handleVoltarNiveis = () => {
    router.push("/niveis");
  };

  // Loading inicial
  if (linguagemId === null || isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center bg-branco">
          <div className="text-center">
            <div className="text-2xl text-roxo font-bold animate-pulse mb-4">
              Carregando questão...
            </div>
            <div className="text-preto/60">
              {linguagemId === null ? "Verificando linguagem selecionada..." : "Buscando questões..."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sem questões disponíveis
  if (!questao && !isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center bg-branco">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-preto mb-4">
              Nenhuma questão encontrada
            </h2>
            <p className="text-preto/70 mb-6">
              Não há questões disponíveis para a linguagem e dificuldade selecionadas.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/linguagem")}
                className="w-full bg-roxo text-white px-6 py-3 rounded-full font-bold hover:bg-roxo/90"
              >
                Escolher Outra Linguagem
              </button>
              <button
                onClick={() => router.push("/dificuldade")}
                className="w-full bg-verde text-white px-6 py-3 rounded-full font-bold hover:bg-verde/90"
              >
                Mudar Dificuldade
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Resultado final
  if (quizFinalizado) {
    const porcentagem = Math.round((acertos / TOTAL_QUESTOES) * 100);
    const passou = porcentagem >= 70;

    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco to-verde/10">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl border-4 border-verde"
          >
            <div className="text-8xl mb-6 animate-bounce">
              {passou ? '🎉' : '😅'}
            </div>
            
            <h1 className="text-5xl font-bold text-preto mb-4">
              {passou ? 'Parabéns!' : 'Bom trabalho!'}
            </h1>
            
            <p className="text-3xl text-preto/80 mb-8">
              Você acertou {acertos} de {TOTAL_QUESTOES} questões
            </p>

            <div className="bg-gradient-to-r from-verde/20 to-roxo/20 rounded-2xl p-6 mb-8">
              <div className="text-6xl font-bold text-preto mb-2">
                {porcentagem}%
              </div>
              <p className="text-xl text-preto/70">Taxa de Acerto</p>
            </div>

            {passou ? (
              <div className="bg-verde/10 border-2 border-verde rounded-2xl p-4 mb-8">
                ✅ Excelente! Você domina esse conteúdo!
              </div>
            ) : (
              <div className="bg-yellow-100 border-2 border-yellow-500 rounded-2xl p-4 mb-8">
                💪 Continue praticando para melhorar!
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReiniciar}
                className="bg-verde text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-verde/90 transform hover:scale-105 transition-all"
              >
                Tentar Novamente
              </button>
              <button
                onClick={handleVoltarNiveis}
                className="bg-roxo text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-roxo/90 transform hover:scale-105 transition-all"
              >
                Voltar aos Níveis
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Parse das alternativas
  let alternativas: string[] = [];
  
  try {
    if (typeof questao?.alternativa === 'string') {
      alternativas = JSON.parse(questao.alternativa);
    } 
    else if (Array.isArray(questao?.alternativa)) {
      alternativas = questao.alternativa as string[];
    }
    else {
      alternativas = questao?.alternativa as any as string[];
    }
  } catch (error) {
    console.error("Erro ao processar alternativas:", error);
    alternativas = ["Erro ao carregar alternativas"];
  }

  // Render principal com a questão
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco to-roxo/5">
      <SimpleNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-preto/70 mb-2">
              <span>Questão {questaoAtual + 1} de {TOTAL_QUESTOES}</span>
              <span>Acertos: {acertos}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((questaoAtual + 1) / TOTAL_QUESTOES) * 100}%` }}
                className="h-full bg-gradient-to-r from-verde to-roxo rounded-full transition-all"
              />
            </div>
          </div>

          {/* Card da Questão */}
          <motion.div
            key={`${questaoAtual}-${questao?.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-roxo"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="bg-roxo/10 text-roxo px-4 py-2 rounded-full font-bold text-sm">
                {questao?.categoria || "Geral"}
              </span>
              <span className="bg-verde/10 text-verde px-4 py-2 rounded-full font-bold text-sm">
                {dificuldade === 1 ? "Fácil" : dificuldade === 2 ? "Médio" : "Difícil"}
              </span>
            </div>

            {/* Componente dinâmico baseado no tipo */}
            {(questao?.tipo === "multipla_escolha" || questao?.tipo === "output_codigo") && (
              <MultiplaEscolha
                key={`${questaoAtual}-${questao.id}`}
                pergunta={questao.pergunta}
                codigo={questao.codigo}
                alternativas={alternativas}
                onResponder={handleResponder}
              />
            )}

            {questao?.tipo === "completar_codigo" && (
              <CompletarCodigo
                key={`${questaoAtual}-${questao.id}`}
                pergunta={questao.pergunta}
                codigoComLacuna={questao.codigo || questao.pergunta}
                alternativas={alternativas}
                onResponder={handleResponder}
              />
            )}

            {questao?.tipo === "encontrar_erro" && (
              <EncontrarErro
                key={`${questaoAtual}-${questao.id}`}
                pergunta={questao.pergunta}
                codigo={questao.codigo || questao.pergunta}
                alternativas={alternativas}
                onResponder={handleResponder}
              />
            )}

            {questao?.tipo === "verdadeiro_falso" && (
              <VerdadeiroFalso
                key={`${questaoAtual}-${questao.id}`}
                pergunta={questao.pergunta}
                onResponder={(valor) => handleResponder(valor ? 0 : 1)}
              />
            )}

            {/* Resultado */}
            {mostrarResultado && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-6 rounded-2xl ${
                  respostaSelecionada === questao?.alt_correta
                    ? "bg-verde/10 border-2 border-verde"
                    : "bg-red-500/10 border-2 border-red-500"
                }`}
              >
                <p className="text-2xl font-bold mb-4">
                  {respostaSelecionada === questao?.alt_correta ? "🎉 Correto!" : "❌ Incorreto"}
                </p>

                {questao?.explicacao && (
                  <p className="text-preto/80 mb-4">{questao.explicacao}</p>
                )}

                {respostaSelecionada !== questao?.alt_correta && (
                  <div className="bg-white/50 rounded-xl p-4 mt-4">
                    <p className="font-semibold text-verde">
                      Resposta correta: {alternativas[questao?.alt_correta || 0]}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Botões */}
            <div className="mt-8 text-center">
              {!mostrarResultado ? (
                <button
                  onClick={handleConfirmar}
                  disabled={respostaSelecionada === null}
                  className="bg-gradient-to-r from-verde to-roxo text-white px-12 py-4 rounded-full font-bold text-xl hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar Resposta
                </button>
              ) : (
                <button
                  onClick={handleProxima}
                  className="bg-gradient-to-r from-verde to-roxo text-white px-12 py-4 rounded-full font-bold text-xl hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  {questaoAtual + 1 >= TOTAL_QUESTOES ? 'Ver Resultado Final 🎯' : 'Próxima Questão →'}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}