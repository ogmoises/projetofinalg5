"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { api } from "@/trpc/react";

interface CadastroFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function CadastroForm({ 
  onSuccess, 
  redirectTo = "/login?registrado=true" 
}: CadastroFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nick: "",
    email: "",
    senha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  
  const criarUsuario = api.usuario.criar.useMutation({
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      setLoading(false);
      
      if (onSuccess) {
        onSuccess();
      } else {
        
        setTimeout(() => {
          router.push(redirectTo);
        }, 500);
      }
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    
    if (!formData.nick || !formData.email || !formData.senha) {
      setError("Todos os campos são obrigatórios");
      setLoading(false);
      return;
    }

    if (formData.nick.length < 3) {
      setError("O nome de usuário deve ter pelo menos 3 caracteres");
      setLoading(false);
      return;
    }

    if (formData.senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Por favor, insira um email válido");
      setLoading(false);
      return;
    }

    try {
      criarUsuario.mutate({
        email: formData.email,
        nick: formData.nick,
        senha: formData.senha,
      });
    } catch (error) {
      setError("Erro ao criar conta. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <>
      
      {successMessage && (
        <div className="w-full max-w-md mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          ✅ {successMessage}
        </div>
      )}
      
      {error && (
        <div className="w-full max-w-md mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          ❌ {error}
        </div>
      )}
      
      <form 
        className="flex flex-col gap-2 w-full max-w-md" 
        onSubmit={handleSubmit}
      >
        <div>
          <Input 
            variant="filled"
            placeholder="Nome de usuário" 
            className="h-15 text-lg px-4 bg-white/90 backdrop-blur-sm"
            name="nick"
            value={formData.nick}
            onChange={handleChange}
            required
            disabled={loading}
            minLength={3}
          />
          <p className="text-xs text-gray-500 mt-1 ml-1">
            Mínimo 3 caracteres. Este será seu nome no jogo.
          </p>
        </div> 

        <div>
          <Input 
            variant="filled"
            placeholder="E-mail" 
            className="h-15 text-lg px-4 bg-white/90 backdrop-blur-sm"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1 ml-1">
            Usaremos para login e recuperação de senha.
          </p>
        </div>

        <div>
          <div className="relative">
            <Input 
              variant="filled"
              type="password" 
              placeholder="Senha" 
              className="h-15 text-lg px-4 pr-32 bg-white/90 backdrop-blur-sm"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-1">
            Mínimo 6 caracteres. Use letras, números e símbolos para maior segurança.
          </p>
        </div>

        <Button 
          type="submit"
          variant="outline" 
          size="xl" 
          className="w-full h-14 text-lg font-bold mt-15 bg-white/90 backdrop-blur-sm text-verde border-white hover:bg-gray-50 hover:text-roxo shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
        </Button>
      </form>
    </>
  );
}