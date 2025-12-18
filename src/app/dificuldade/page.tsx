"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SimpleNavbar from "../../components/ui/SimpleNavbar";
import { FaSeedling, FaFire, FaTrophy } from "react-icons/fa";
import { useState, useEffect } from "react";
import { api } from "@/trpc/react";

export default function DificuldadePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Pegar userId do sessionStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedLanguage = sessionStorage.getItem("selectedLanguageId");
    if (storedUserId) setUserId(parseInt(storedUserId));
    if (storedLanguage) setSelectedLanguage(storedLanguage);
  }, []);

  // Buscar estatísticas do usuário
  const { data: stats } = api.usuario.getStats.useQuery(
   { id: userId || 0 },
   { enabled: !!userId && userId > 0 }
 );


  const dificuldades = [
    {
      id: 1,
      nome: "Fácil",
      emoji: "🌱",
      icon: <FaSeedling />,
      cor: "verde",
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      textColor: "text-green-700",
      descricao: "Perfeito para iniciantes! Conceitos básicos e sintaxe fundamental.",
      exemplos: ["Variáveis", "Tipos de dados", "Operadores básicos", "Print/Output"],
      recomendado: "Iniciantes",
    },
    {
      id: 2,
      nome: "Médio",
      emoji: "🔥",
      icon: <FaFire />,
      cor: "amarelo",
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-700",
      descricao: "Desafios intermediários com lógica de programação e estruturas.",
      exemplos: ["Loops", "Condicionais", "Funções", "Arrays/Listas"],
      recomendado: "Intermediário",
    },
    {
      id: 3,
      nome: "Difícil",
      emoji: "🏆",
      icon: <FaTrophy />,
      cor: "roxo",
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      textColor: "text-purple-700",
      descricao: "Para experts! Algoritmos complexos e desafios avançados.",
      exemplos: ["Recursão", "OOP", "Algoritmos", "Estruturas de dados"],
      recomendado: "Avançado",
    },
  ];

  const handleSelectDificuldade = (dificuldadeId: number) => {
    if (!selectedLanguage) {
      alert("Por favor, selecione uma linguagem primeiro!");
      router.push("/linguagem");
      return;
    }
    
    // Salvar no sessionStorage
    sessionStorage.setItem("selectedDifficulty", dificuldadeId.toString());
    
    // Redirecionar para o quiz
    router.push(`/quiz?languageId=${selectedLanguage}&difficulty=${dificuldadeId}`);
  };

  // Calcular estatísticas por dificuldade (se houver dados)
  const getStatsForDifficulty = (diffId: number) => {
    if (!stats) return { total: 0, acertos: 0, taxa: 0 };
    
    // Aqui você pode filtrar as respostas por dificuldade se tiver essa info
    // Por enquanto, retorna dados gerais
    return {
      total: stats.totalRespostas,
      acertos: stats.acertos,
      taxa: stats.taxaAcerto,
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco via-roxo/5 to-verde/5">
      <SimpleNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-preto mb-4">
            Escolha seu <span className="text-roxo">Nível</span>
          </h1>
          <p className="text-xl text-preto/70 max-w-2xl mx-auto">
            Selecione a dificuldade ideal para o seu conhecimento atual
          </p>
          {!selectedLanguage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-yellow-100 border-2 border-yellow-500 rounded-2xl p-4 max-w-md mx-auto"
            >
              <p className="text-yellow-800 font-semibold">
                ⚠️ Você ainda não selecionou uma linguagem!
              </p>
              <button
                onClick={() => router.push("/linguagem")}
                className="mt-3 bg-yellow-500 text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition-colors"
              >
                Escolher Linguagem
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Cards de Dificuldade */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {dificuldades.map((dif, index) => {
            const difStats = getStatsForDifficulty(dif.id);
            
            return (
              <motion.div
                key={dif.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-4 ${dif.borderColor} transform transition-all hover:shadow-3xl`}>
                  {/* Header do Card */}
                  <div className={`bg-gradient-to-r ${dif.gradient} p-8 text-white text-center relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-9xl opacity-10">
                      {dif.emoji}
                    </div>
                    <div className="relative z-10">
                      <div className="text-7xl mb-4">{dif.emoji}</div>
                      <h2 className="text-4xl font-bold mb-2">{dif.nome}</h2>
                      <p className="text-sm opacity-90 font-semibold">
                        {dif.recomendado}
                      </p>
                    </div>
                  </div>

                  {/* Corpo do Card */}
                  <div className="p-6 space-y-6">
                    <p className="text-preto/80 text-center leading-relaxed">
                      {dif.descricao}
                    </p>

                    {/* Exemplos de Tópicos */}
                    <div>
                      <h3 className={`font-bold ${dif.textColor} mb-3 text-center`}>
                        Tópicos Incluídos:
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {dif.exemplos.map((ex, i) => (
                          <span
                            key={i}
                            className={`${dif.bgColor} ${dif.textColor} px-3 py-1 rounded-full text-xs font-semibold border ${dif.borderColor}`}
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Estatísticas (se usuário logado) */}
                    {userId && difStats.total > 0 && (
                      <div className={`${dif.bgColor} rounded-xl p-4 border ${dif.borderColor}`}>
                        <h4 className={`font-bold ${dif.textColor} text-sm mb-2 text-center`}>
                          Seu Desempenho
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div>
                            <div className={`font-bold ${dif.textColor}`}>{difStats.total}</div>
                            <div className="text-gray-600">Questões</div>
                          </div>
                          <div>
                            <div className={`font-bold ${dif.textColor}`}>{difStats.acertos}</div>
                            <div className="text-gray-600">Acertos</div>
                          </div>
                          <div>
                            <div className={`font-bold ${dif.textColor}`}>{difStats.taxa}%</div>
                            <div className="text-gray-600">Taxa</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botão */}
                    <button
                      onClick={() => handleSelectDificuldade(dif.id)}
                      className={`w-full bg-gradient-to-r ${dif.gradient} text-white font-bold py-4 rounded-2xl transform hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg`}
                    >
                      <span className="text-2xl">{dif.icon}</span>
                      Começar Nível {dif.nome}
                    </button>
                  </div>
                </div>

                {/* Badge de Recomendação */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  className={`absolute -top-4 -right-4 bg-gradient-to-r ${dif.gradient} text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-xl border-4 border-white`}
                >
                  {dif.icon}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Inferior */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-roxo to-verde rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Não sabe qual escolher?
          </h3>
          <p className="text-white/90 text-lg mb-6">
            Comece pelo Fácil e vá evoluindo! Você pode mudar a qualquer momento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleSelectDificuldade(1)}
              className="bg-white text-roxo font-bold py-3 px-8 rounded-full hover:bg-white/90 transform hover:scale-105 transition-all"
            >
              🌱 Começar pelo Básico
            </button>
            <button
              onClick={() => router.push("/niveis")}
              className="bg-white/20 backdrop-blur text-white font-bold py-3 px-8 rounded-full hover:bg-white/30 transform hover:scale-105 transition-all border-2 border-white"
            >
              Ver Meu Progresso
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}