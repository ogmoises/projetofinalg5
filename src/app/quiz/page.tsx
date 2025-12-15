"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/trpc/react";
import SimpleNavbar from "@/components/ui/SimpleNavbar";
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function QuizPage() {
  const router = useRouter();
  const [userId] = useState(1); // Simulando usuário logado
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { data: perguntas, isLoading } = api.pergunta.list.useQuery();
  const registrarResposta = api.usuario.registrarResposta.useMutation();

  // Seleciona 5 perguntas aleatórias
  const quizQuestions = perguntas ? perguntas.slice(0, 5) : [];

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

  if (quizQuestions.length === 0) {
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center bg-branco">
          <div className="text-center">
            <p className="text-2xl text-preto mb-4">Nenhuma pergunta disponível ainda.</p>
            <button
              onClick={() => router.push("/admin")}
              className="bg-roxo text-white px-8 py-3 rounded-full font-bold hover:bg-roxo/90"
            >
              Adicionar Perguntas
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

  const handleAnswer = async (alternativeId: number) => {
    if (isAnswered) return;

    setSelectedAnswer(alternativeId);
    setIsAnswered(true);

    const isCorrect = alternativeId === currentQuestion!.alt_correta;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Registra a resposta no banco
    await registrarResposta.mutateAsync({
      usuario_id: userId,
      perguntas_id: currentQuestion!.id,
      alt_selecionado: alternativeId,
      acertou: isCorrect,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
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
              <span className="font-bold">{quizQuestions.length}</span> perguntas
            </p>

            <div className="bg-gradient-to-r from-verde/20 to-roxo/20 rounded-2xl p-6 mb-8">
              <p className="text-6xl font-bold text-preto mb-2">{percentage.toFixed(0)}%</p>
              <p className="text-xl text-preto/70">Taxa de Acerto</p>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-verde text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-verde/90 transform hover:scale-105 transition-all"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => router.push("/niveis")}
                className="bg-roxo text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-roxo/90 transform hover:scale-105 transition-all"
              >
                Ver Progresso
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
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-preto/70 mb-2">
            <span>
              Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
            </span>
            <span>Pontuação: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-verde to-roxo rounded-full transition-all"
            />
          </div>
        </div>

        {/* Question Card */}
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
                  Dificuldade {currentQuestion!.dificuldade}
                </span>
                <span className="text-preto/50 text-lg">ID: {currentQuestion!.id}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-preto leading-tight">
                {currentQuestion!.pergunta}
              </h2>
            </div>

            {/* Alternatives */}
            <div className="space-y-4">
              {alternatives.map((alt) => {
                const isCorrect = alt.id === currentQuestion!.alt_correta;
                const isSelected = alt.id === selectedAnswer;
                const showFeedback = isAnswered;

                let buttonStyle = "bg-white border-2 border-gray-300 hover:border-roxo";
                if (showFeedback) {
                  if (isCorrect) {
                    buttonStyle = "bg-verde/20 border-4 border-verde";
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = "bg-red-500/20 border-4 border-red-500";
                  }
                }

                return (
                  <motion.button
                    key={alt.id}
                    onClick={() => handleAnswer(alt.id)}
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

            {/* Next Button */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-verde to-roxo text-white px-12 py-4 rounded-full font-bold text-xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center mx-auto space-x-3"
                >
                  <span>{currentQuestionIndex < quizQuestions.length - 1 ? "Próxima" : "Finalizar"}</span>
                  <FaArrowRight />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}