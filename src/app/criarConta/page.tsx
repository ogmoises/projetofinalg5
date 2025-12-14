
"use client"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Link from "next/link"

export default function CriarConta () {
  return (
    <div className="min-h-screen flex flex-col items-center bg-branco p-6 pt- relative">    
      <div className="absolute top-6 right-8">
        <Link href="/login">
        <Button 
          variant="outline" 
          size="lg"
          className="h-14 text-md font-bold bg-white/90 backdrop-blur-sm text-verde border-white hover:bg-gray-50 hover:text-roxo shadow-md px-8"
        >
          Login
        </Button>
        </Link>
      </div>
      
      
      <h1 className="text-4xl font-bold text-preto mb-12 mt-10 text-center">Crie o seu perfil</h1>
      
      <form className="flex flex-col gap-2 w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-preto"></h3>
          <Input 
            variant="filled"
            placeholder="Nome de usuário" 
            className="h-15 text-lg px-4 bg-white/90 backdrop-blur-sm"
          />
        </div> 

        <div>
          <h3 className="text-lg font-semibold mb-3 text-preto"></h3>
          <Input 
            variant="filled"
            placeholder="E-mail" 
            className="h-15 text-lg px-4 bg-white/90 backdrop-blur-sm"
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
            />
            
           
          </div>
        </div>

        <Button 
          variant="outline" 
          size="xl" 
          className="w-full h-14 text-lg font-bold mt-15 bg-white/90 backdrop-blur-sm text-verde border-white hover:bg-gray-50 hover:text-roxo shadow-md"
        >
          ENTRAR
        </Button>
      </form>

      
      <div className="mt-20 w-full max-w-md px-4">
        <p className="text-sm text-center text-preto mb-6">
          Ao entrar no Codelingo, você concorda com os nossos <Link href="/termos" className="text-preto font-semibold hover:underline">Termos</Link> e <Link href="/privacidade" className="text-preto font-semibold hover:underline">Política do Privacidade</Link>.
        </p>
        
        <p className="text-xs text-center text-preto">
          Este site é protegido pela reCAPTCHA Enterprise. Aplicam-se a <Link href="https://policies.google.com/privacy" className="text-preto font-semibold hover:underline">Política do Privacidade</Link> e os <Link href="https://policies.google.com/terms" className="text-preto font-semibold hover:underline">Termos de Uso do Google</Link>.
        </p>
      </div>
    </div>
  )
}