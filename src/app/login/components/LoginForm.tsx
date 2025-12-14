"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Link from "next/link";

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function LoginForm({ onSuccess, redirectTo = "/linguagem" }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        identifier: formData.identifier,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email/nick ou senha incorretos. Tente novamente.");
      } else {
        
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(redirectTo);
          router.refresh(); 
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-preto"></h3>
        <Input 
          variant="filled"
          placeholder="E-mail ou nome de usuário" 
          className="h-15 text-lg px-4 bg-white/90 backdrop-blur-sm"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <h3 className="text-3xl h-0 font-semibold mb-3 text-preto"></h3>
        <div className="relative">
          <Input 
            variant="filled"
            type="password" 
            placeholder="Senha" 
            className="h-15 text-lg px-4 pr-32 bg-white/90 backdrop-blur-sm"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          
          <Link 
            href="/recuperar-senha"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-verde hover:text-roxo tracking-widest uppercase"
          >
            ESQUECEU?
          </Link>
        </div>
      </div>

      <Button 
        type="submit"
        variant="outline" 
        size="xl" 
        className="w-full h-14 text-lg font-bold mt-12 bg-white/90 backdrop-blur-sm text-verde border-white hover:bg-gray-50 hover:text-roxo shadow-md disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "ENTRANDO..." : "ENTRAR"}
      </Button>
    </form>
  );
}