"use client";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    
    router.push("/linguagem");
    router.refresh();
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-branco p-4 pt-25 relative">   
    
    <button
        onClick={handleBackToHome}
        className="absolute top-6 left-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors group"
        aria-label="Voltar para página inicial"
      >
        <svg 
          className="w-6 h-6 text-cinza group-hover:text-preto transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>

      <div className="absolute top-6 right-8">
        <Link href="/criarConta">
          <Button 
            variant="outline" 
            size="lg"
            className="h-14 text-md font-bold bg-white/90 backdrop-blur-sm text-verde border-white hover:bg-gray-50 hover:text-roxo shadow-md px-8"
          >
            Criar conta
          </Button>
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold text-preto mb-12 text-center">Entrar</h1>
      
      
      <LoginForm onSuccess={handleLoginSuccess} redirectTo="/linguagem" />
      
      <div className="mt-20 w-full max-w-md px-4">
        <p className="text-sm text-center text-preto mb-6">
          Ao entrar no Codelingo, você concorda com os nossos <Link href="/termos" className="text-preto font-semibold hover:underline">Termos</Link> e <Link href="/privacidade" className="text-preto font-semibold hover:underline">Política do Privacidade</Link>.
        </p>
        
        <p className="text-xs text-center text-preto">
          Este site é protegido pela reCAPTCHA Enterprise. Aplicam-se a <Link href="https://policies.google.com/privacy" className="text-preto font-semibold hover:underline">Política do Privacidade</Link> e os <Link href="https://policies.google.com/terms" className="text-preto font-semibold hover:underline">Termos de Uso do Google</Link>.
        </p>
      </div>
    </div>
  );
}