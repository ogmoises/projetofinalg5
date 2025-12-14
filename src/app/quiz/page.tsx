"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmModal from "./components/ConfirmModal";

//====Estrutura das "Perguntas" que irão aparecer no front
interface Pergunta {
  id: number;
  pergunta: string;
  alternativa: string[];
  dificuldade: number;
  linguagem?: {
    nome: string;
  };
}

export default function PerguntaPage() {
  //=== ESTADOS PRINCIPAIS ===
  const [selected, setSelected] = useState<null | number>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Pergunta | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  
  //=== NOVOS ESTADOS PARA PROGRESSO DINÂMICO ===
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctInSession, setCorrectInSession] = useState(0);
  const TOTAL_QUESTIONS_PER_SESSION = 5; //5 perguntas por quiz
  
  const router = useRouter();
  
  // Obter parâmetros da URL (linguagem e dificuldade)
  const searchParams = useSearchParams();//Gancho para o Next escolher as perguntas
  const languageId = searchParams.get('languageId') || "1";
  const difficulty = searchParams.get('difficulty') || "1";

  // useEffect: Executa quando languageId ou difficulty mudam
  useEffect(() => {
    // Resetar progresso da sessão ao mudar linguagem ou dificuldade
    setCurrentQuestionNumber(1);
    setQuestionsAnswered(0);
    setCorrectInSession(0);
    fetchQuestion();
  }, [languageId, difficulty]);

  // Função para buscar pergunta da API com os filtros atuais
  async function fetchQuestion() {
    setIsLoadingQuestion(true);
    try {
      const response = await fetch(`/api/questions?languageId=${languageId}&difficulty=${difficulty}`);
      if (!response.ok) throw new Error("Erro ao buscar pergunta");
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao carregar pergunta");
    } finally {
      setIsLoadingQuestion(false);
    }
  }
  //Gerencia a seleção de alternativa
  function toggleOption(index: number) {
    setSelected((prev) => (prev === index ? null : index));
  }
  //valida se o usuario confirmou a esocolha
  function handleOpenConfirm() {
    if (selected === null) {
      alert("Selecione uma opção antes de enviar.");
      return;
    }
    setConfirmOpen(true);
  }

  // Função principal: processa envio da resposta
  async function handleConfirmSend() {
    if (!question || selected === null) return;
    
    setConfirmOpen(false);
    setLoading(true);

    try {
      //
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          selectedAlternative: selected,
          userId: 1, // TODO: Substituir pelo ID do usuário logado
          languageId: parseInt(languageId),
          difficulty: parseInt(difficulty)
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Erro no envio:", error);
        alert("Erro ao enviar a resposta. Tente novamente.");
        setLoading(false);
        return;
      }

      const result = await res.json();
      
      //=== ATUALIZA ESTATÍSTICAS DA SESSÃO ===
      setQuestionsAnswered(prev => prev + 1);
      if (result.isCorrect) {
        setCorrectInSession(prev => prev + 1);
      }
      
      // Mostrar resultado ao usuário
      if (result.isCorrect) {
        alert(`✅ Correto! +${result.pointsEarned} pontos`);
      } else {
        alert(`❌ Incorreto. A resposta certa era: Alternativa ${result.correctAlternative + 1}`);
      }

      // Aguarda 1.5 segundos e verifica se terminou o quiz
      setTimeout(() => {
        // === VERIFICA SE É A ÚLTIMA PERGUNTA (5ª) ===
        if (currentQuestionNumber >= TOTAL_QUESTIONS_PER_SESSION) {
          // === SESSÃO COMPLETA: REDIRECIONA PARA ESCOLHA DE LINGUAGEM ===
          
          // Mostra resumo da sessão
          const accuracy = questionsAnswered > 0 
            ? Math.round((correctInSession / questionsAnswered) * 100) 
            : 0;
          
          alert(`🎉 Quiz Completo!\nAcertos: ${correctInSession}/5\nPrecisão: ${accuracy}%\n\nRedirecionando para escolher novo quiz...`);
          
          // Redireciona após 1 segundo
          setTimeout(() => {
            router.push('/linguagem');
          }, 1000);
          
        } else {
          // === AINDA TEM PERGUNTAS: CONTINUA O QUIZ ===
          
          // Avança para próxima pergunta
          setCurrentQuestionNumber(prev => prev + 1);
          
          // Busca nova pergunta
          fetchQuestion();
          
          // Reseta seleção para próxima pergunta
          setSelected(null);
        }
      }, 1500);

    } catch (err) {
      console.error(err);
      alert("Erro de comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  //=== COMPONENTE DE BARRA DE PROGRESSO DINÂMICA ===
  const ProgressBar = () => {
    // Calcula porcentagem de progresso (ex: pergunta 3 de 5 = 60%)
    const progressPercentage = (currentQuestionNumber / TOTAL_QUESTIONS_PER_SESSION) * 100;
    
    // Calcula precisão (% de acertos)
    const accuracy = questionsAnswered > 0 
      ? Math.round((correctInSession / questionsAnswered) * 100) 
      : 0;

    return (
      <div className="mt-6 space-y-2">
        {/* Barra de progresso principal */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Informações do progresso */}
        <div className="flex justify-between text-sm">
          <div className="space-y-1">
            <p className="font-medium">
              Pergunta <span className="text-green-600">{currentQuestionNumber}</span> de {TOTAL_QUESTIONS_PER_SESSION}
            </p>
            <p className="text-xs text-gray-500">
              Sessão: {questionsAnswered} respondidas
            </p>
          </div>
          
          <div className="text-right space-y-1">
            <p className="font-medium">
              Precisão: <span className={accuracy >= 70 ? "text-green-600" : "text-yellow-600"}>
                {accuracy}%
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {correctInSession} corretas • {questionsAnswered - correctInSession} erradas
            </p>
          </div>
        </div>

        {/* Mensagem especial para última pergunta */}
        {currentQuestionNumber === TOTAL_QUESTIONS_PER_SESSION && (
          <div className="text-xs text-center pt-2 text-blue-600 font-medium">
            ⭐ Última pergunta! Boa sorte!
          </div>
        )}

        {/* Mensagem motivacional */}
        {questionsAnswered > 0 && currentQuestionNumber < TOTAL_QUESTIONS_PER_SESSION && (
          <div className="text-xs text-center pt-2">
            {accuracy === 100 ? "🎯 Perfeito! Continue assim!" :
             accuracy >= 80 ? "🌟 Excelente! Você está indo muito bem!" :
             accuracy >= 60 ? "👍 Bom trabalho! Quase lá!" :
             "💪 Continue praticando, você consegue!"}
          </div>
        )}
      </div>
    );
  };

  //=== ESTADOS DE CARREGAMENTO E ERRO ===
  if (isLoadingQuestion) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg">Carregando pergunta...</p>
        </div>
      </main>
    );
  }

  if (!question) {
    return (
      <main className="relative min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Pergunta não encontrada</h2>
          <p className="mb-6">Não há perguntas disponíveis para esta combinação de linguagem e dificuldade.</p>
          <button
            onClick={() => router.push('/escolha-linguagem')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full"
          >
            Voltar para escolha
          </button>
        </div>
      </main>
    );
  }

  //=== RENDERIZAÇÃO PRINCIPAL ===
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white p-6">
      {/* Logos */}
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
        
        <p className="text-lg mb-8 px-4">{question.pergunta}</p>

        {/* Alternativas */}
        <div className="grid grid-cols-2 gap-4">
          {Array.isArray(question.alternativa) && 
           question.alternativa.map((alt: string, index: number) => (
            <button
              key={index}
              onClick={() => toggleOption(index)}
              className={`w-full flex items-center justify-center rounded-lg border transition-colors text-lg
                ${selected === index ? "bg-green-500 text-white border-green-600" : "bg-gray-100 hover:bg-gray-200"}
                h-28 sm:h-32 md:h-36 p-4`}
            >
              <span className="truncate">{alt}</span>
            </button>
          ))}
        </div>

        {/* Dificuldade e Linguagem */}
        <div className="mt-8 text-sm text-gray-500 flex justify-center gap-6">
          <span>Dificuldade: {question.dificuldade}</span>
          <span>•</span>
          <span>Linguagem: {question.linguagem?.nome || "Geral"}</span>
        </div>

        {/* Barra de Progresso */}
        <ProgressBar />
      </div>

      {/* Botão Enviar */}
      <div className="fixed left-0 right-0 bottom-6 flex justify-center z-30">
        <button
          onClick={handleOpenConfirm}
          disabled={loading || selected === null}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
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