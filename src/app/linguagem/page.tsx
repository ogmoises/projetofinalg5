"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SimpleNavbar from "../../components/ui/SimpleNavbar";
import Image from "next/image";
import { FaCode, FaRocket, FaStar } from "react-icons/fa";
import { api } from "@/trpc/react";

export default function LinguagemPage() {
  const router = useRouter();
  
  // Buscar linguagens do banco
  const { data: linguagens, isLoading } = api.linguagens.list.useQuery();

  const linguagensConfig = [
    { nome: "Python", icon: "/Python.svg", cor: "blue", popular: true },
    { nome: "JavaScript", icon: "/JavaScript.svg", cor: "yellow", popular: true },
    { nome: "C++", icon: "/C++.svg", cor: "blue", popular: false },
    { nome: "C", icon: "/C.svg", cor: "blue", popular: false },
    { nome: "Java", icon: "/Java.svg", cor: "red", popular: true },
    { nome: "Go", icon: "/Go.svg", cor: "cyan", popular: false },
    { nome: "PHP", icon: "/PHP.svg", cor: "purple", popular: false },
    { nome: "Ruby", icon: "/Ruby.svg", cor: "red", popular: false },
    { nome: "SQL", icon: "/SQL.svg", cor: "orange", popular: false },
    { nome: "Swift", icon: "/Swift.svg", cor: "orange", popular: false },
    { nome: "Bash", icon: "/Bash.svg", cor: "green", popular: false },
    { nome: "Kotlin", icon: "/Kotlin.svg", cor: "purple", popular: false },
    { nome: "R", icon: "/R.svg", cor: "blue", popular: false },
    { nome: "Scala", icon: "/Scala.svg", cor: "red", popular: false },
    { nome: "Rust", icon: "/Rust.svg", cor: "orange", popular: false },
    { nome: "Lua", icon: "/Lua.svg", cor: "blue", popular: false },
  ];

  const handleSelectLanguage = (linguagemNome: string) => {
    // Encontrar o ID da linguagem no banco
    const linguagem = linguagens?.find(l => l.nome === linguagemNome);
    
    if (!linguagem) {
      alert("Linguagem não encontrada no banco de dados.");
      return;
    }

    // Salvar no sessionStorage
    sessionStorage.setItem("selectedLanguageId", linguagem.id.toString());
    sessionStorage.setItem("selectedLanguageName", linguagem.nome);

    // Redirecionar para escolher dificuldade
    router.push("/dificuldade");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <SimpleNavbar />
        <div className="flex-1 flex items-center justify-center bg-branco">
          <div className="text-2xl text-roxo font-bold animate-pulse">
            Carregando linguagens...
          </div>
        </div>
      </div>
    );
  }

  const linguagensPopulares = linguagensConfig.filter(l => l.popular);
  const outrasLinguagens = linguagensConfig.filter(l => !l.popular);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco via-verde/5 to-roxo/5">
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
            Escolha sua <span className="text-verde">Linguagem</span>
          </h1>
          <p className="text-xl text-preto/70 max-w-2xl mx-auto">
            Mais de 15 linguagens disponíveis para você dominar!
          </p>
        </motion.div>

        {/* Linguagens Populares */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaStar className="text-4xl text-yellow-500" />
            <h2 className="text-3xl font-bold text-preto">
              Mais Populares
            </h2>
            <FaStar className="text-4xl text-yellow-500" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {linguagensPopulares.map((lang, index) => {
              const linguagemDB = linguagens?.find(l => l.nome === lang.nome);
              const totalPerguntas = linguagemDB?._count?.perguntas || 0;

              return (
                <motion.div
                  key={lang.nome}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-verde hover:border-roxo transition-all cursor-pointer group">
                    {/* Badge Popular */}
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                      <FaStar /> Popular
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                      {/* Ícone */}
                      <div className="relative">
                        <div className="bg-gradient-to-br from-verde/20 to-roxo/20 rounded-3xl p-6 group-hover:scale-110 transition-transform">
                          <Image
                            src={lang.icon}
                            alt={lang.nome}
                            width={80}
                            height={80}
                            className="drop-shadow-lg"
                          />
                        </div>
                      </div>

                      {/* Nome */}
                      <h3 className="text-2xl font-bold text-preto group-hover:text-verde transition-colors">
                        {lang.nome}
                      </h3>

                      {/* Info */}
                      <div className="text-center space-y-2">
                        <p className="text-preto/70 font-semibold">
                          {totalPerguntas} questões disponíveis
                        </p>
                      </div>

                      {/* Botão */}
                      <button
                        onClick={() => handleSelectLanguage(lang.nome)}
                        className="w-full bg-gradient-to-r from-verde to-roxo text-white font-bold py-3 px-6 rounded-2xl transform group-hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <FaRocket />
                        Começar
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Outras Linguagens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaCode className="text-4xl text-roxo" />
            <h2 className="text-3xl font-bold text-preto">
              Todas as Linguagens
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {outrasLinguagens.map((lang, index) => {
              const linguagemDB = linguagens?.find(l => l.nome === lang.nome);
              const totalPerguntas = linguagemDB?._count?.perguntas || 0;

              return (
                <motion.div
                  key={lang.nome}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.6, duration: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <button
                    onClick={() => handleSelectLanguage(lang.nome)}
                    className="w-full bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 hover:border-roxo transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      {/* Ícone */}
                      <div className="bg-gray-50 rounded-xl p-3 group-hover:bg-roxo/10 transition-colors">
                        <Image
                          src={lang.icon}
                          alt={lang.nome}
                          width={50}
                          height={50}
                        />
                      </div>

                      {/* Nome */}
                      <h3 className="text-lg font-bold text-preto group-hover:text-roxo transition-colors">
                        {lang.nome}
                      </h3>

                      {/* Quantidade */}
                      <p className="text-xs text-preto/60 font-semibold">
                        {totalPerguntas} questões
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Inferior */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-verde via-roxo to-verde bg-[length:200%_100%] animate-gradient rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Não encontrou sua linguagem?
          </h3>
          <p className="text-white/90 text-lg mb-6">
            Estamos sempre adicionando novas linguagens! Sugestões? Entre em contato!
          </p>
          <button
            onClick={() => router.push("/#contato")}
            className="bg-white text-roxo font-bold py-3 px-8 rounded-full hover:bg-white/90 transform hover:scale-105 transition-all"
          >
            Enviar Sugestão
          </button>
        </motion.div>
      </main>
    </div>
  );
}