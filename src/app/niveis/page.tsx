"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "@/trpc/react";
import SimpleNavbar from "@/components/ui/SimpleNavbar";
import Image from "next/image";
import { FaTrophy, FaFire, FaStar, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function NiveisPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(1); // Simulando usuário logado

  const { data: stats, isLoading } = api.usuario.getStats.useQuery({ id: userId });

  // Calcular nível baseado na pontuação
  const calcularNivel = (pontos: number) => {
    return Math.floor(pontos / 100) + 1;
  };

  // Calcular XP para próximo nível
  const calcularXPProximoNivel = (pontos: number) => {
    const nivel = calcularNivel(pontos);
    const xpNecessario = nivel * 100;
    const xpAtual = pontos % 100;
    return { xpAtual, xpNecessario };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center bg-branco">
          <div className="text-2xl text-roxo font-bold animate-pulse">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const nivel = calcularNivel(stats.usuario.pontuacao);
  const { xpAtual, xpNecessario } = calcularXPProximoNivel(stats.usuario.pontuacao);
  const progressoNivel = (xpAtual / xpNecessario) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco to-roxo/5">
      <SimpleNavbar />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header do Usuário */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 border-2 border-roxo"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-verde to-roxo rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {stats.usuario.nick.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-verde text-white rounded-full w-10 h-10 flex items-center justify-center font-bold border-4 border-white">
                  {nivel}
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-preto">{stats.usuario.nick}</h1>
                <p className="text-lg text-preto/70">Nível {nivel} • {stats.usuario.pontuacao} XP</p>
              </div>
            </div>

            <div className="flex space-x-6">
              <div className="text-center">
                <FaTrophy className="text-4xl text-verde mx-auto mb-2" />
                <p className="text-2xl font-bold text-preto">{stats.acertos}</p>
                <p className="text-sm text-preto/70">Acertos</p>
              </div>
              <div className="text-center">
                <FaFire className="text-4xl text-roxo mx-auto mb-2" />
                <p className="text-2xl font-bold text-preto">{stats.totalRespostas}</p>
                <p className="text-sm text-preto/70">Desafios</p>
              </div>
              <div className="text-center">
                <FaStar className="text-4xl text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-preto">{stats.taxaAcerto}%</p>
                <p className="text-sm text-preto/70">Taxa</p>
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-preto/70 mb-2">
              <span>Nível {nivel}</span>
              <span>Nível {nivel + 1}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressoNivel}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-verde to-roxo rounded-full"
              />
            </div>
            <p className="text-center text-sm text-preto/70 mt-2">
              {xpAtual} / {xpNecessario} XP
            </p>
          </div>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Progresso por Linguagem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg p-6 border-2 border-roxo/20"
          >
            <h2 className="text-2xl font-bold text-preto mb-4 flex items-center">
              <FaStar className="text-verde mr-3" />
              Progresso por Linguagem
            </h2>
            <div className="space-y-4">
              {Object.entries(stats.progressoPorLinguagem).length > 0 ? (
                Object.entries(stats.progressoPorLinguagem).map(([linguagem, data]) => {
                  const progresso = (data.acertos / data.total) * 100;
                  return (
                    <div key={linguagem} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={`/${linguagem}.svg`}
                            alt={linguagem}
                            width={40}
                            height={40}
                          />
                          <span className="font-semibold text-preto">{linguagem}</span>
                        </div>
                        <span className="text-sm text-preto/70">
                          {data.acertos}/{data.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-full bg-verde rounded-full transition-all"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-preto/70 text-center py-8">
                  Nenhuma linguagem praticada ainda. Comece agora! 🚀
                </p>
              )}
            </div>
          </motion.div>

          {/* Próximos Desafios */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-lg p-6 border-2 border-roxo/20"
          >
            <h2 className="text-2xl font-bold text-preto mb-4 flex items-center">
              <FaFire className="text-roxo mr-3" />
              Próximos Desafios
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/linguagem")}
                className="w-full bg-gradient-to-r from-verde to-verde/80 hover:from-verde/90 hover:to-verde/70 text-white rounded-2xl p-4 flex items-center justify-between transition-all transform hover:scale-105"
              >
                <div className="text-left">
                  <p className="font-bold text-lg">Nova Linguagem</p>
                  <p className="text-sm opacity-90">Escolha uma linguagem para praticar</p>
                </div>
                <FaChevronRight className="text-2xl" />
              </button>

              <button
                onClick={() => router.push("/quiz")}
                className="w-full bg-gradient-to-r from-roxo to-roxo/80 hover:from-roxo/90 hover:to-roxo/70 text-white rounded-2xl p-4 flex items-center justify-between transition-all transform hover:scale-105"
              >
                <div className="text-left">
                  <p className="font-bold text-lg">Quiz Rápido</p>
                  <p className="text-sm opacity-90">Teste seus conhecimentos agora</p>
                </div>
                <FaChevronRight className="text-2xl" />
              </button>

              <button
                onClick={() => router.push("/dificuldade")}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white rounded-2xl p-4 flex items-center justify-between transition-all transform hover:scale-105"
              >
                <div className="text-left">
                  <p className="font-bold text-lg">Ajustar Nível</p>
                  <p className="text-sm opacity-90">Escolha a dificuldade ideal</p>
                </div>
                <FaChevronRight className="text-2xl" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Conquistas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-lg p-6 border-2 border-roxo/20"
        >
          <h2 className="text-2xl font-bold text-preto mb-4 flex items-center">
            <FaTrophy className="text-yellow-500 mr-3" />
            Conquistas Desbloqueadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.totalRespostas >= 1 && (
              <div className="bg-gradient-to-br from-verde/20 to-verde/5 rounded-xl p-4 text-center border-2 border-verde">
                <div className="text-4xl mb-2">🎯</div>
                <p className="font-bold text-preto">Primeira Resposta</p>
                <p className="text-xs text-preto/70">Deu o primeiro passo!</p>
              </div>
            )}
            {stats.acertos >= 5 && (
              <div className="bg-gradient-to-br from-roxo/20 to-roxo/5 rounded-xl p-4 text-center border-2 border-roxo">
                <div className="text-4xl mb-2">⭐</div>
                <p className="font-bold text-preto">5 Acertos</p>
                <p className="text-xs text-preto/70">Está pegando o jeito!</p>
              </div>
            )}
            {stats.acertos >= 10 && (
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl p-4 text-center border-2 border-yellow-500">
                <div className="text-4xl mb-2">🔥</div>
                <p className="font-bold text-preto">10 Acertos</p>
                <p className="text-xs text-preto/70">Está em chamas!</p>
              </div>
            )}
            {stats.taxaAcerto >= 70 && (
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-4 text-center border-2 border-blue-500">
                <div className="text-4xl mb-2">🎓</div>
                <p className="font-bold text-preto">Expert</p>
                <p className="text-xs text-preto/70">70%+ de acertos</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}