"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SimpleNavbar from "@/components/ui/SimpleNavbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const login = api.usuario.login.useQuery(
    { email, senha },
    { enabled: false }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const result = await login.refetch();
      
      if (result.data) {
        // Salva o ID do usuário no sessionStorage (temporário)
        sessionStorage.setItem("userId", result.data.id.toString());
        sessionStorage.setItem("userNick", result.data.nick);
        
        // Redireciona para níveis
        router.push("/niveis");
      } else {
        setErro("Email ou senha incorretos!");
      }
    } catch (error) {
      setErro("Email ou senha incorretos!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-branco to-roxo/5">
      <SimpleNavbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex justify-center"
          >
            <Image
              src="/codelingo.png"
              alt="CodeLingo Mascote"
              width={500}
              height={500}
              className="drop-shadow-2xl"
            />
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-roxo/20"
          >
            <h1 className="text-4xl font-bold text-preto mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-lg text-preto/70 mb-8">
              Continue sua jornada de aprendizado
            </p>

            {erro && (
              <div className="bg-red-500/10 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl mb-6">
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-preto mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-verde focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-preto mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-verde focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-verde to-verde/80 hover:from-verde/90 hover:to-verde/70 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-preto/70">
                Não tem uma conta?{" "}
                <button
                  onClick={() => router.push("/criarConta")}
                  className="text-roxo font-bold hover:underline"
                >
                  Criar conta grátis
                </button>
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/landingPage")}
                className="text-verde font-semibold hover:underline"
              >
                ← Voltar para home
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}