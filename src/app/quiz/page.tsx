"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/trpc/react";
import SimpleNavbar from "@/components/ui/SimpleNavbar";
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaHome } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

interface Pergunta {
  id: number;
  pergunta: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
  alt_correta: number;
  dificuldade: number;
  linguagem_id?: number;
}

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estados do quiz
  const [userId, setUserId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Estados de progresso
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctInSession, setCorrectInSession] = useState(0);
  
  // NÚMERO FIXO DE QUESTÕES
  const TOTAL_QUESTIONS = 5;
  
  // Obter userId do sessionStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);
  
  // Obter parâmetros da URL
  const languageId = searchParams.get('languageId') || "1";
  const difficulty = searchParams.get('difficulty') || "1";
  
  // Buscar perguntas com tRPC
  const { data: perguntas, isLoading } = api.pergunta.list.useQuery();
  const registrarResposta = api.usuario.registrarResposta.useMutation();
  
  // Função para selecionar perguntas
  const getQuizQuestions = (): Pergunta[] => {
    if (!perguntas) return [];
    
    const languageIdNum = parseInt(languageId);
    const difficultyNum = parseInt(difficulty);
    
    const exactMatches = perguntas.filter((p: Pergunta) => 
      p.linguagem_id === languageIdNum && p.dificuldade === difficultyNum
    );
    
    if (exactMatches.length < TOTAL_QUESTIONS) {
      const sameLanguage = perguntas.filter((p: Pergunta) => 
        p.linguagem_id === languageIdNum
      );
      
      const combined = [...exactMatches];
      sameLanguage.forEach(p => {
        if (!combined.find(q => q.id === p.id) && combined.length < TOTAL_QUESTIONS) {
          combined.push(p);
        }
      });
      
      if (combined.length < TOTAL_QUESTIONS) {
        perguntas.forEach(p => {
          if (!combined.find(q => q.id === p.id) && combined.length < TOTAL_QUESTIONS) {
            combined.push(p);
          }
        });
      }
      
      return combined.slice(0, TOTAL_QUESTIONS);
    }
    
    return exactMatches.slice(0, TOTAL_QUESTIONS);
  };
  
  const quizQuestions = getQuizQuestions();
  
  // Resetar progresso quando mudar linguagem/dificuldade
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setQuestionsAnswered(0);
    setCorrectInSession(0);
  }, [languageId, difficulty]);
  
  if (isLoading || !perguntas) {
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center bg-branco">
          <div className="text-2xl text-roxo font-bold animate-pulse">Preparando quiz...</div>
        </div>
      </div>
    );
  }
  
  if (quizQuestions.length < TOTAL_QUESTIONS) {
    const needed = TOTAL_QUESTIONS - quizQuestions.length;
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center bg-branco">
          <div className="text-center">
            <p className="text-2xl text-preto mb-4">
              {quizQuestions.length === 0 
                ? "Nenhuma pergunta disponível." 
                : `Apenas ${quizQuestions.length} pergunta(s) disponível(is).`}
            </p>
            <p className="text-gray-500 mb-6">
              São necessárias {TOTAL_QUESTIONS} perguntas para o quiz.
              {needed > 0 && ` Faltam ${needed} pergunta(s).`}
            </p>
            <button
              onClick={() => router.push("/linguagem")}
              className="bg-roxo text-white px-8 py-3 rounded-full font-bold hover:bg-roxo/90"
            >
              Escolher Outra Linguagem
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const alternatives = [
    { id: 0, text: currentQuestion?.alternativa1 },
    { id: 1, text: currentQuestion?.alternativa2 },
    { id: 2, text: currentQuestion?.alternativa3 },
    { id: 3, text: currentQuestion?.alternativa4 },
  ];
  
  const handleAnswerSelect = (alternativeId: number) => {
    if (isAnswered) return;
    setSelectedAnswer(alternativeId);
  };
  
  const handleConfirmAnswer = async () => {
    if (!currentQuestion || selectedAnswer === null || !userId) return;
    
    setIsAnswered(true);
    
    try {
      const isCorrect = selectedAnswer === currentQuestion.alt_correta;
      
      await registrarResposta.mutateAsync({
        usuario_id: userId,
        perguntas_id: currentQuestion.id,
        alt_selecionado: selectedAnswer,
        acertou: isCorrect,
      });
      
      setQuestionsAnswered(prev => prev + 1);
      if (isCorrect) {
        setScore(score + 1);
        setCorrectInSession(prev => prev + 1);
      }
      
      // Aguardar 2 segundos antes de prosseguir
      setTimeout(() => {
        if (currentQuestionIndex >= quizQuestions.length - 1) {
          setQuizCompleted(true);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        }
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar resposta.");
      setIsAnswered(false);
    }
  };
  
  if (quizCompleted) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco to-verde/10">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl border-4 border-verde"
          >
            <FaTrophy className="text-8xl text-yellow-500 mx-auto mb-6 animate-bounce" />
            <h1 className="text-5xl font-bold text-preto mb-4">Quiz Completo! 🎉</h1>
            <p className="text-3xl text-preto/80 mb-8">
              Você acertou <span className="text-verde font-bold">{score}</span> de{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span> perguntas
            </p>
            <div className="bg-gradient-to-r from-verde/20 to-roxo/20 rounded-2xl p-6 mb-8">
              <p className="text-6xl font-bold text-preto mb-2">{percentage.toFixed(0)}%</p>
              <p className="text-xl text-preto/70">Taxa de Acerto</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/niveis")}
                className="bg-roxo text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-roxo/90 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <FaHome /> Voltar ao Menu
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-verde text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-verde/90 transform hover:scale-105 transition-all"
              >
                Jogar Novamente
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco to-roxo/5">
      <SimpleNavbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Barra de progresso */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-preto/70 mb-2">
            <span>Pergunta {currentQuestionIndex + 1} de {TOTAL_QUESTIONS}</span>
            <span>Pontuação: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
              className="h-full bg-gradient-to-r from-verde to-roxo rounded-full transition-all"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Acertos: {correctInSession}</span>
            <span>
              Precisão: {questionsAnswered > 0 
                ? Math.round((correctInSession / questionsAnswered) * 100) 
                : 0}%
            </span>
          </div>
        </div>
        
        {/* Card da pergunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-roxo"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-roxo/10 text-roxo px-6 py-2 rounded-full font-bold">
                  Dificuldade {currentQuestion.dificuldade}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-preto leading-tight">
                {currentQuestion.pergunta}
              </h2>
            </div>
            
            {/* Alternativas */}
            <div className="space-y-4">
              {alternatives.map((alt) => {
                const isCorrect = alt.id === currentQuestion.alt_correta;
                const isSelected = alt.id === selectedAnswer;
                const showFeedback = isAnswered;
                
                let buttonStyle = "bg-white border-2 border-gray-300 hover:border-roxo";
                
                if (showFeedback) {
                  if (isCorrect) {
                    buttonStyle = "bg-verde/20 border-4 border-verde";
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = "bg-red-500/20 border-4 border-red-500";
                  }
                } else if (isSelected) {
                  buttonStyle = "bg-roxo/10 border-2 border-roxo";
                }
                
                return (
                  <motion.button
                    key={alt.id}
                    onClick={() => handleAnswerSelect(alt.id)}
                    disabled={isAnswered}
                    whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                    whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                    className={`w-full p-6 rounded-2xl text-left font-semibold text-lg md:text-xl transition-all ${buttonStyle} ${
                      isAnswered ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-preto">{alt.text}</span>
                      {showFeedback && isCorrect && (
                        <FaCheckCircle className="text-3xl text-verde" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <FaTimesCircle className="text-3xl text-red-500" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Botão Confirmar */}
            {!isAnswered && selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={handleConfirmAnswer}
                  className="bg-gradient-to-r from-verde to-roxo text-white px-12 py-4 rounded-full font-bold text-xl hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  CONFIRMAR RESPOSTA
                </button>
              </motion.div>
            )}
            
            {/* Feedback após responder */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                {selectedAnswer === currentQuestion.alt_correta ? (
                  <div className="bg-verde/10 border-2 border-verde rounded-2xl p-6">
                    <FaCheckCircle className="text-5xl text-verde mx-auto mb-3" />
                    <p className="text-2xl font-bold text-verde">Correto! 🎉</p>
                    <p className="text-preto/70 mt-2">Próxima pergunta em instantes...</p>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border-2 border-red-500 rounded-2xl p-6">
                    <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-red-500">Incorreto</p>
                    <p className="text-preto/70 mt-2">Continue tentando!</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}